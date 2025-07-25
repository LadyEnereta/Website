import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
  }
}, { timestamps: true });

export default mongoose.model('Newsletter', newsletterSchema);
