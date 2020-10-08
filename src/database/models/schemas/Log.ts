import mongoose from 'mongoose';

const Log = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  message: String,
  created_at: String
});

export default Log;
