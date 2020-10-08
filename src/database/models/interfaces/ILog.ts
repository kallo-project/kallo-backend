import mongoose from 'mongoose';

export default interface ILog extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  message: string;
  created_at: string;
}
