import mongoose from 'mongoose';

const fixtureSchema = new mongoose.Schema({
  name: { type: String, required: true },          // Sport type
  date: { type: Date, required: true },             // Match date
  opponent: { type: String, required: true },       // Opponent
  venue: { type: String, required: true },         // Actual venue name,
  time: { type: String, required: true },           // Match time
  description: { type: String, enum: ['Tournament', 'Friendly', 'League'], required: true } // Type of match
}, {
  timestamps: true,
});

const Fixture = mongoose.model('Fixture', fixtureSchema);
export default Fixture;
