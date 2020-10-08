// #region Import modules
import socketIO from 'socket.io';
import mongoose from 'mongoose';

import { getClassroom } from '../database/functions';
// #endregion

export default async (socket: socketIO.Socket, data: string) => {
  // #region Declare variables
  const { name, code } = JSON.parse(data);

  const response = (accepted: boolean, message: string) =>
    socket.emit('join-response', JSON.stringify({ accepted: accepted, message: message }));
  // #endregion

  // #region Validate variables
  if (typeof name !== 'string' || typeof code !== 'string')
    return response(false, 'Client corrupted! Please try again or reinstall the student extension.');
  else if (name.trim().length === 0 || name.split(' ').length < 2) return response(false, 'Invalid name provided!');
  // #endregion

  try {
    // #region Get classroom and verify client
    const classroom = await getClassroom({ class_code: code });

    if (!classroom) return response(false, 'Invalid class code!');
    else if (classroom.students.map((i) => i.name).includes(name))
      return response(false, 'Student already exists! Please use another name.');
    else if (classroom.limited_students && classroom.students.length >= classroom.max_students)
      return response(false, 'Classroom is full!');
    // #endregion

    // #region Push values and update database
    const now = new Date().toLocaleString();
    const studentObj = { _id: mongoose.Types.ObjectId(), name: name, socket_id: socket.id, joined_at: now };

    classroom.students.push(studentObj);
    classroom.connection_logs.push({ connect: true, student: name, created_at: now });

    await classroom.save();
    // #endregion

    // #region Finalize
    socket
      .to(classroom.teacher_socket)
      .emit('student-join', { id: studentObj._id, name: studentObj.name, joined_at: studentObj.joined_at });

    response(
      true,
      JSON.stringify({
        student_id: studentObj._id,
        class_id: classroom._id,
        name: classroom.name,
        restricted_access: classroom.restricted_access,
        allowed_sites: classroom.allowed_sites,
        test_mode: classroom.test_mode
      })
    );
    // #region
  } catch (e) {
    response(false, `Internal server error: ${e.message}`);
  }
};
