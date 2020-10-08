import mongoose from 'mongoose';

const ConnectionLog = new mongoose.Schema({
  connect: Boolean,
  student: String,
  created_at: String
});

export default ConnectionLog;
