import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import connectDB from './connect.js';
import mongoose from 'mongoose';

// Used for environment variables
dotenv.config();

const app = express();

morgan('combined');

// Use middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 5001, () => {
  connectDB();
  console.log(`Back-end server listening on port ${process.env.PORT}`);
});
