import Tour from '../../models/website/Tour.js';

// Create a new tour booking
export const createTourBooking = async (req, res) => {
  try {
    const { fullName, email, phone} = req.body;

    if (!fullName || !email || !phone ) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    const tour = new Tour({ fullName, email, phone });
    await tour.save();

    res.status(201).json({ message: "Tour booked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};

// Get all tour bookings
export const getTourBookings = async (req, res) => {
  try {
    const bookings = await Tour.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to fetch tour bookings" });
  }
};

// Delete a tour booking
export const deleteTourBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Tour.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to delete booking" });
  }
};
