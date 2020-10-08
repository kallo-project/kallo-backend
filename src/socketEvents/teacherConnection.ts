import socketIO from 'socket.io';
import { getClassroom } from '../database/functions';

export default async (socket: socketIO.Socket, id: string) => {
  const classroom = await getClassroom({ _id: id });

  if (classroom) {
    classroom.teacher_socket = socket.id;
    await classroom.save();
    socket.to(id);
  }
};
