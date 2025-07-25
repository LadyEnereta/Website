import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Website-related routes
import applicationRoutes from './routes/website/Application.js';
import tourRoutes from './routes/website/Tour.js';
import newsletterRoutes from './routes/website/Newsletter.js';
import contactRoutes from './routes/website/Contact.js';
import adminRoutes from './routes/website/Admin.js';
import eventRoutes from './routes/website/Event.js';


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

// Sports routes
app.use('/api/fixtures', fixtureRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sport-types', sportTypeRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/academic', academicRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
