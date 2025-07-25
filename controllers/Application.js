import Application from '../models/Application.js';

// Create application
export const createApplication = async (req, res) => {
  try {
    const { fullName, dateOfBirth, form, parentName, contact, email } = req.body;

    // Simple validation
    if (!fullName || !dateOfBirth || !form || !parentName || !contact || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const application = new Application({
      fullName,
      dateOfBirth,
      form,
      parentName,
      contact,
      email
    });

    await application.save();
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all applications
export const getApplications = async (req, res) => {
  try {
    const apps = await Application.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete application by ID
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Application.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
