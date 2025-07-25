import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  fixtureId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fixture', required: true },
  result: { type: String, enum: ['Win', 'Draw', 'Lose'], required: true },
  score: { type: String, required: true },
  name: { type: String, required: true },
  opponent: { type: String, required: true },
  venue: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true }
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);
export default Result;
