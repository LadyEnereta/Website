import Event from "../models/Event.js";

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const { name, date, description } = req.body;

    if (!name || !date || !description) {
      return res.status(400).json({ message: "Name, date, and venue are required" });
    }

    const event = new Event({ name, date, description });
    await event.save();

    res.status(201).json({ message: "Event created successfully", event });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to retrieve events" });
  }
};

// Delete a specific event by ID
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to delete event" });
  }
};
