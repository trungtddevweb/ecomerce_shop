import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import multer from 'multer'
import helmet from 'helmet'
import connectDB from './connect.js';
import routes from './routes/index.js'
import cors from 'cors'
import fs from 'fs'
import path from 'path';
// Used for environment variables
dotenv.config();

const __dirname = path.resolve()

const app = express();
morgan('combined');

// Use middlewares
app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets/")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("avatar"), function (req, res) {
  let fileType = req.file.mimetype.split("/")[1]
  const fileName = req.file.filename
  let newFileName = fileName + "." + fileType

  fs.rename(`./public/assets/${fileName}`, `./public/assets/${newFileName}`, () => {
    res.status(200).json({ message: "Success!" });
  })

});

app.use('/api', routes)

app.listen(process.env.PORT || 5001, () => {
  connectDB();
  console.log(`Back-end server listening on port ${process.env.PORT}`);
});
