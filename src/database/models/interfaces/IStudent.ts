import mongoose from 'mongoose';

export default interface IClassroom extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  socket_id: string;
  joined_at: string;
}
