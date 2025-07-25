import express from 'express';
import { createApplication, getApplications, deleteApplication } from '../../controllers/website/Application.js';

const router = express.Router();

router.post('/', createApplication);   // Submit new application
router.get('/', getApplications);      // Fetch all applications
router.delete("/:id", deleteApplication); // 🔥 Add this line


export default router;
