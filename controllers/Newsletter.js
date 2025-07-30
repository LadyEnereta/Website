import Newsletter from '../models/Newsletter.js';

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const subscription = new Newsletter({ email });
    await subscription.save();

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};
export const getAllSubscribers = async (req, res) => {
  try {
    const emails = await Newsletter.find().sort({ createdAt: -1 });
    res.json(emails);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
};

export const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Subscriber.findByIdAndDelete(id); // assuming Mongoose
    if (!deleted) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    res.status(200).json({ message: "Subscriber deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subscriber", error });
  }
};
