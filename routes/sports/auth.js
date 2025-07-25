// 📁 routes/auth.js
import express from 'express';
import {
  login,
  register,
  verifyAdmin,
  resetPassword
} from '../../controllers/sports/auth.js';

const authRouter = express.Router();

// Auth routes
authRouter.post('/login', login);                  // POST /auth/login
authRouter.post('/register', register);            // POST /auth/register
authRouter.post('/verify-admin', verifyAdmin);     // POST /auth/verify-admin
authRouter.post('/reset-password', resetPassword); // POST /auth/reset-password

export default authRouter;