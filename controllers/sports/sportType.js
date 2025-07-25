// 📁 controllers/sportTypes.js

import SportType from "../../models/sports/SportsType.js";

// Add a new sport type (e.g., Soccer (Boys), Swimming)
export const addSportType = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Sport name is required." });
    }

    // Check if sport already exists
    const existingSport = await SportType.findOne({ name: name.trim() });
    if (existingSport) {
      return res.status(400).json({ message: "Sport already exists." });
    }

    // Create new sport
    const sportType = new SportType({ name: name.trim() });
    await sportType.save();

    res.status(201).json({ message: "Sport type added successfully!", sportType });
  } catch (error) {
    res.status(500).json({ message: 'Error adding sport type', error: error.message });
  }
};

// (Optional) Get all sport types
export const getSportTypes = async (req, res) => {
  try {
    const sports = await SportType.find().sort('name');
    res.json(sports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sport types', error: error.message });
  }
};


// 🛠 New: Update a sport type
export const updateSportType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updated = await SportType.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Sport not found" });
    }

    res.json({ message: "Sport updated successfully!", updated });
  } catch (error) {
    res.status(400).json({ message: "Error updating sport", error: error.message });
  }
};

// 🛠 New: Delete a sport type
export const deleteSportType = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await SportType.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Sport not found" });
    }

    res.json({ message: "Sport deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting sport", error: error.message });
  }
};