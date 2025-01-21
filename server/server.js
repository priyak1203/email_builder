import express from 'express';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

dotenv.config();

const app = express();

// create __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

// middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/getEmailLayout', (req, res) => {
  res.sendFile(path.resolve(__dirname, './layouts', 'sampleLayout.html'));
});

app.post('/uploadEmailConfig', (req, res) => {
  console.log(req.body);
  res.send('Upload Email Config');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
