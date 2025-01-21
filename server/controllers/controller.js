import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// create __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

export const uploadImage = (req, res) => {
  const imageUrl = `/public/uploads/${req.file.filename}`;
  const newImageUrl = path.join(
    __dirname,
    `/public/uploads/${req.file.filename}`
  );
  res.json({ imageUrl, newImageUrl });
};
