import express from 'express';
import { register, login, forgotPassword, resetPassword } from '../controllers/Admin.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
