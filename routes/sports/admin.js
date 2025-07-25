// 📁 routes/admin.js
import express from 'express';
import { protect } from '../../middleware/auth.js';
import { allowRoles } from '../../middleware/allowRoles.js';

const adminRouter = express.Router();

adminRouter.get('/admin-dashboard', protect, (req, res) => {
  res.json({ message: `Welcome ${req.admin.username}` });
});

adminRouter.post('/admin-only-action', protect, allowRoles('sports_director'), (req, res) => {
  res.json({ message: 'Director-only action successful' });
});

export default adminRouter;
