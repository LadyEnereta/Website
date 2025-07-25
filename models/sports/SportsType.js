import mongoose from 'mongoose';

const sportTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
}, { timestamps: true });

const SportType = mongoose.model('SportType', sportTypeSchema);
export default SportType;
