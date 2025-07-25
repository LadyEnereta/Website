import AcademicEvent from "../../models/sports/AcademicEvent.js";

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await AcademicEvent.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Academic Events', error: error.message });
  }
};

// Add a new event
export const createEvent = async (req, res) => {
  const { title, date } = req.body;
  try {
    const event = new AcademicEvent({ title, date });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: 'Error adding new Academic Event', error: error.message });
  }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
  try {
    await AcademicEvent.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting an Academic Event', error: error.message});
  }
};
