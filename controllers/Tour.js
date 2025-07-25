import Tour from '../models/Tour.js'; // Adjust path if needed

// @desc    Create a new tour booking
// @route   POST /tour-bookings
// @access  Public
export const createTourBooking = async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;

    const newBooking = new Tour({ fullName, email, phone });
    const savedBooking = await newBooking.save();

    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get all tour bookings
// @route   GET /tour-bookings
// @access  Public
export const getTourBookings = async (req, res) => {
  try {
    const bookings = await Tour.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve bookings', error: err.message });
  }
};

// @desc    Delete a tour booking by ID
// @route   DELETE /tour-bookings/:id
// @access  Public
export const deleteTourBooking = async (req, res) => {
  try {
    const booking = await Tour.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete booking', error: err.message });
  }
};
