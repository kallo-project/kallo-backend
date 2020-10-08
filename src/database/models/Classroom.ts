import mongoose from 'mongoose';
import { ConnectionLog, Log, Student } from './schemas';
import IClassroom from '../models/interfaces/IClassroom';

export default mongoose.model<IClassroom>(
  'Classroom',
  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    teacher_socket: String,
    class_code: String,
    limited_students: Boolean,
    max_students: Number,
    restricted_access: Boolean,
    allowed_sites: Array,
    test_mode: Boolean,
    connection_logs: [ConnectionLog],
    logs: [Log],
    students: [Student]
  })
);
