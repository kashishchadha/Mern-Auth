import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
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
app.use(cookieParser());
app.use(express.json()); 


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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});