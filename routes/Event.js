import express from 'express';
import { createEvent, getEvents, deleteEvent } from '../../controllers/website/Event.js';

const router = express.Router();

router.post('/', createEvent);   // POST /events
router.get('/', getEvents);      // GET /events
router.delete("/:id", deleteEvent); // ✅ DELETE route for events


export default router;
