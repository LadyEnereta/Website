import express from 'express';
import { subscribe, getAllSubscribers } from '../../controllers/website/Newsletter.js';

const router = express.Router();
router.post('/', subscribe);
router.get('/', getAllSubscribers);

export default router;
