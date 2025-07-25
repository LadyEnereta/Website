import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String
}, { timestamps: true });

export default mongoose.model('Tour', tourSchema);
