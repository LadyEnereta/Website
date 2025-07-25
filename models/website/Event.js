import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
