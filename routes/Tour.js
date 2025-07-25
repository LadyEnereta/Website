import express from 'express';
import {
  createTourBooking,
  getTourBookings,
  deleteTourBooking
} from '../controllers/Tour.js';

const router = express.Router();

router.post('/', createTourBooking);         // POST /tour-bookings
router.get('/', getTourBookings);            // GET /tour-bookings
router.delete('/:id', deleteTourBooking);    // DELETE /tour-bookings/:id

export default router;
