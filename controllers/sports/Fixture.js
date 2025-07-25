import Fixture from "../../models/sports/Fixture.js";

export const getAllFixtures = async (req, res) => {
  try {
    const fixtures = await Fixture.find().sort({ date: 1 });
    res.json(fixtures);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fixtures', error: error.message });
  }
};

export const addFixture = async (req, res) => {
  try {
    const { name, date, opponent, venue, time, description } = req.body;
    const fixture = new Fixture({ name, date, opponent, venue, time, description });
    await fixture.save();
    res.status(201).json(fixture);
  } catch (error) {
    res.status(400).json({ message: 'Error adding fixture', error: error.message });
  }
};

export const updateFixture = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFixture = await Fixture.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedFixture) return res.status(404).json({ message: 'Fixture not found' });
    res.json(updatedFixture);
  } catch (error) {
    res.status(400).json({ message: 'Error updating fixture', error: error.message });
  }
};

export const deleteFixture = async (req, res) => {
  try {
    const { id } = req.params;
    await Fixture.findByIdAndDelete(id);
    res.json({ message: 'Fixture deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting fixture', error: error.message });
  }
};

export const getSports = async (req, res) => {
  try {
    const futureOnly = req.query.futureOnly === 'true';
    const query = futureOnly ? { date: { $gte: new Date() } } : {};

    const sports = await Fixture.find(query).sort({ date: 1 });
    res.json(sports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sports', error: error.message });
  }
};

