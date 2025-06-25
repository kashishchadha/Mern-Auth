import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

dotenv.config();
import path from 'path';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.router.js';
import cookieParser from 'cookie-parser';
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
const app = express();

const port = 3000;
app.use(cors({
  origin: 'https://mern-auth-22gn.onrender.com', // Adjust this to your frontend's URL
  credentials: true // Allow cookies to be sent
}));
app.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.json());

app.use(express.static(path.join(__dirname, '../basic/dist')));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);


//error handling middleware
app.use((err, req, res, next) => {
 const statusCode = err.statusCode || 500;
 const message = err.message || 'Internal Server Error';
 res.status(statusCode).json({
     status: 'error',
     statusCode,
     message
 });
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../basic/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});