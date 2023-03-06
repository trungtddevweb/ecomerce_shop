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

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

// Use middlewares
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public', options))
// app.use("/uploads", express.static(path.join(__dirname, 'uploads')));


app.use('/api', routes)

app.listen(process.env.PORT || 5001, () => {
  connectDB();
  console.log(`Back-end server listening on port ${process.env.PORT}`);
});
