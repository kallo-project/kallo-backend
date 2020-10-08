import mongoose from 'mongoose';

const Student = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  socket_id: String,
  joined_at: String
});

export default Student;
