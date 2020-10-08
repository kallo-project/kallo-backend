import mongoose from 'mongoose';

export default interface IConnectionLog extends mongoose.Document {
  connect: boolean;
  student: string;
  created_at: string;
}
