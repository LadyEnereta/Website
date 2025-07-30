import express from 'express';
import { subscribe, getAllSubscribers, deleteSubscriber } from '../controllers/Newsletter.js';

const router = express.Router();

router.post('/', subscribe);
router.get('/', getAllSubscribers);
router.delete('/:id', deleteSubscriber); // ✅ NEW DELETE route

export default router;
