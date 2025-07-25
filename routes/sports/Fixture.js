import express from 'express';
import { getAllFixtures, addFixture, updateFixture, deleteFixture, getSports } from '../../controllers/sports/Fixture.js';
import { protect } from '../../middleware/auth.js';

const router = express.Router();

router.get('/', getAllFixtures); // ✅ Load all fixtures
router.post('/', protect, addFixture); // ✅ Add fixture
router.put('/:id', protect, updateFixture); // ✅ Update fixture
router.delete('/:id', protect, deleteFixture); // ✅ Delete fixture
router.get('/sports', getSports); // ✅ Separate route for sports (optional)

export default router;
