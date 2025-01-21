import express from 'express';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { writeFileSync } from 'fs';
import router from './router/router.js';

dotenv.config();

const app = express();

// create __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/getEmailLayout', (req, res) => {
  res.sendFile(path.resolve(__dirname, './layouts', 'sampleLayout.html'));
});

app.post('/uploadEmailConfig', (req, res) => {
  const emailConfig = req.body;
  writeFileSync('emailConfig.json', JSON.stringify(emailConfig));
  res.json({ message: 'configuration saved successfully' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
