// #region Import modules
import socketIO from 'socket.io';
import { getClassroom } from '../database/functions';
// #endregion

export default async (socket: socketIO.Socket, data: string) => {
  // #region Variables
  const { class_id, student_id, tabs } = JSON.parse(data);
  const classroom = await getClassroom({ _id: class_id });
  // #endregion

  if (classroom) {
    const index = classroom.students.map((i) => i._id).indexOf(student_id);
    if (index !== -1) socket.to(classroom.teacher_socket).emit('student-tabs', JSON.stringify({ tabs: tabs }));
  }
};
