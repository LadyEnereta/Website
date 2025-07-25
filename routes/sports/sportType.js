import express from 'express';
import { addSportType, getSportTypes, updateSportType, deleteSportType } from '../../controllers/sports/sportType.js';
import { protect } from '../../middleware/auth.js';

const router = express.Router();

// Add a new sport type
router.post('/', protect, addSportType);

// Get all sport types
router.get('/', getSportTypes);

// 🛠 New routes:
router.put('/:id', protect, updateSportType);
router.delete('/:id', protect, deleteSportType);

export default router;
