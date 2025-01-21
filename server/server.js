import express from 'express';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { writeFileSync, readFileSync } from 'fs';
import upload from './middlewares/multer.js';
import ejs from 'ejs';

dotenv.config();

const app = express();

// create __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

// middlewares
app.use(cors());
app.use(express.json());
app.use('/resource', express.static(path.resolve(__dirname, './uploads')));
// app.use(express.static(path.resolve(__dirname, './uploads'))); - this works
// app.use(express.static('./uploads')); - this works

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/getEmailLayout', (req, res) => {
  res.sendFile(path.resolve(__dirname, './layouts', 'sampleLayout.html'));
});

app.post('/uploadImage', upload.single('logoImg'), (req, res) => {
  const imageUrl = `/resource/${req.file.filename}`;
  const newImageUrl = path.join(
    __dirname,
    `/public/uploads/${req.file.filename}`
  );

  res.json({ imageUrl, newImageUrl });
});

app.post('/uploadEmailConfig', (req, res) => {
  const emailConfig = req.body;
  writeFileSync('emailConfig.json', JSON.stringify(emailConfig));

  res.json({ message: 'configuration saved successfully' });
});

app.get('/downloadTemplate', (req, res) => {
  const result = readFileSync('emailConfig.json', 'utf-8');
  const finalResult = JSON.parse(result);

  const sampleInput = {
    title: 'Sample Title',
    content: 'Sample Content Here',
    footer: 'Footer text Sample',
    imageUrl:
      'https://images.freeimages.com/images/large-previews/56d/peacock-1169961.jpg?fmt=webp&h=350',
  };

  const layoutHTML = readFileSync(
    path.resolve(__dirname, './layouts', 'layout.html'),
    'utf-8'
  );
  console.log(layoutHTML);

  const renderHTML = ejs.render(layoutHTML, finalResult);
  console.log(renderHTML);

  res.send(renderHTML);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
