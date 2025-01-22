import express from 'express';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cloudinary from 'cloudinary';
import cors from 'cors';
import { writeFileSync, readFileSync } from 'fs';
import ejs from 'ejs';
import router from './router/router.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// setup cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// create __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

// middlewares
app.use(cors());
app.use(express.json());
app.use('/resource', express.static(path.resolve(__dirname, './uploads')));

// routes
app.use('', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/downloadTemplate', (req, res) => {
  // const result = readFileSync('emailConfig.json', 'utf-8');
  // const finalResult = JSON.parse(result);
  // const layoutHTML = readFileSync(
  //   path.resolve(__dirname, './layouts', 'layout.html'),
  //   'utf-8'
  // );
  // console.log(layoutHTML);
  // const renderHTML = ejs.render(layoutHTML, finalResult);
  // console.log(renderHTML);
  // res.send(renderHTML);
});

const PORT = process.env.PORT || 3000;

try {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log(`Connected to DB`));
  app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
} catch (error) {
  console.log(error);
  process.exit(1);
}
