import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: { type: String, required: true }, // Add this field
  form: { type: String, required: true }, // Frontend uses "grade"
  parentName: { type: String, required: true }, // Rename from guardianName
  contact: { type: String, required: true }, // Rename from contactNumber
  email: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);
