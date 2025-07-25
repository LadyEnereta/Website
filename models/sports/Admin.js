// 📁 models/Admin.js
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  identificationId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {  // Add this new field
    type: String, 
    required: true,
    enum: ['sports_director', 'sports_coach', 'academic_admin']
  }
}, { timestamps: true });

export default mongoose.model('Admin', adminSchema);
