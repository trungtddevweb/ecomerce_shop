import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import connectDB from './connect.js';
import routes from './routes/index.js'
import cors from 'cors'

// Used for environment variables
dotenv.config();

const app = express();

morgan('combined');

// Use middlewares
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', routes)

app.listen(process.env.PORT || 5001, () => {
  connectDB();
  console.log(`Back-end server listening on port ${process.env.PORT}`);
});
