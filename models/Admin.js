import mongoose from 'mongoose';

const adminUserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpiry: Date
}, { timestamps: true });

export default mongoose.model('AdminUser', adminUserSchema);
