import mongoose, { Document, Types } from 'mongoose';
import { IConnectionLog, ILog, IStudent } from './';

export default interface IClassroom extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  teacher_socket: string;
  class_code: string;
  limited_students: boolean;
  max_students: number;
  restricted_access: boolean;
  allowed_sites: string[];
  test_mode: boolean;
  connection_logs: Types.DocumentArray<IConnectionLog>;
  logs: Types.DocumentArray<ILog>;
  students: Types.DocumentArray<IStudent>;
}
