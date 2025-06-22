import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
  }).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
const app=express();
const port=3000;

app.use('/', userRoutes);  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});