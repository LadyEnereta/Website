import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Website-related routes
import applicationRoutes from './routes/Application.js';
import tourRoutes from './routes/Tour.js';
import newsletterRoutes from './routes/Newsletter.js';
import contactRoutes from './routes/Contact.js';
import adminRoutes from './routes/Admin.js';
import eventRoutes from './routes/Event.js';


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Website routes
app.use('/api/applications', applicationRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
