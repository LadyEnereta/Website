// 📁 controllers/auth.js
import Admin from "../../models/sports/Admin.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Password validation helper
const validatePassword = (password) => {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }
};

// ✅ Register Admin
export const register = async (req, res) => {
  const { identificationId, username, password, role } = req.body;

  try {
    // Validate input format
    if (!/^[A-Z]{3}\d{3}$/.test(identificationId)) {
      return res.status(400).json({ 
        message: 'Admin ID must be 3 uppercase letters followed by 3 numbers (e.g., ABC123)' 
      });
    }

    // Validate password
    validatePassword(password);

    // Check for existing admin
    const existingAdmin = await Admin.findOne({ 
      $or: [{ username }, { identificationId }] 
    });

    if (existingAdmin) {
      return res.status(409).json({
        message: existingAdmin.username === username
          ? 'Username already exists'
          : 'Admin ID already registered'
      });
    }

    // Create new admin
    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = new Admin({
      identificationId,
      username,
      password: hashedPassword,
      role
    });

    await admin.save();

    res.status(201).json({ 
      success: true,
      message: 'Admin registered successfully',
      data: {
        id: admin._id,
        role: admin.role
      }
    });

  } catch (err) {
    const statusCode = err.message.includes('validation failed') ? 400 : 500;
    res.status(statusCode).json({ 
      success: false,
      message: err.message || 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// ✅ Login Admin
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        role: admin.role,
        identificationId: admin.identificationId
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' } // Increased from 1h to 8h for better UX
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: admin._id,
          username: admin.username,
          role: admin.role,
          identificationId: admin.identificationId
        }
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// ✅ Verify Admin ID for Password Reset
export const verifyAdmin = async (req, res) => {
  const { identificationId } = req.body;

  try {
    const admin = await Admin.findOne({ identificationId });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin ID not found'
      });
    }

    // Generate and store reset token (simplified example)
    const resetToken = jwt.sign(
      { id: admin._id },
      process.env.JWT_RESET_SECRET,
      { expiresIn: '15m' }
    );

    res.json({
      success: true,
      message: 'Admin ID verified',
      data: {
        resetToken,
        email: admin.username // Assuming username is email
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Verification failed',
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// ✅ Reset Admin Password
export const resetPassword = async (req, res) => {
  const { identificationId, newPassword, resetToken } = req.body;

  try {
    // Verify reset token
    let decoded;
    try {
      decoded = jwt.verify(resetToken, process.env.JWT_RESET_SECRET);
    } catch (tokenErr) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Find admin
    const admin = await Admin.findOne({ 
      _id: decoded.id,
      identificationId 
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Validate new password
    validatePassword(newPassword);

    // Update password
    admin.password = await bcrypt.hash(newPassword, 12);
    await admin.save();

    res.json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Password reset failed',
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};