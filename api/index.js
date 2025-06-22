import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.router.js';

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
const app = express();
const port = 3000;

app.use(express.json()); // <-- Add this line

app.use('/', userRoutes);
app.use('/api/auth', authRoutes);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});