import Result from "../../models/sports/Result.js";
import Fixture from '../../models/sports/Fixture.js'; 

// ➕ Add a new result
export const addResult = async (req, res) => {
  try {
    const { fixtureId, result, score } = req.body;

    // Find the fixture
    const fixture = await Fixture.findById(fixtureId);
    if (!fixture) {
      return res.status(404).json({ message: 'Fixture not found' });
    }

    // Check if result already exists for fixture (prevent duplicate entries)
    const existingResult = await Result.findOne({ fixtureId });
    if (existingResult) {
      return res.status(400).json({ message: 'Result already exists for this fixture' });
    }

    const newResult = new Result({
      fixtureId,
      result,
      score,
      name: fixture.name,
      opponent: fixture.opponent,
      venue: fixture.venue,
      time: fixture.time,
      description: fixture.description,
      date: fixture.date
    });

    await newResult.save();
    res.status(201).json(newResult);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error adding result', error: error.message });
  }
};

// 🛠 Update an existing result
export const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Result.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Result not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating result', error: error.message });
  }
};

// ❌ Delete a result
export const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    await Result.findByIdAndDelete(id);
    res.json({ message: 'Result deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting result', error: error.message });
  }
};

// 📋 Get all results
export const getResults = async (req, res) => {
  try {
    const results = await Result.find().sort({ date: 1 }); 
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching results', error: error.message });
  }
};
