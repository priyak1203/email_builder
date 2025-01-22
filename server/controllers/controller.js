import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync, readFileSync } from 'fs';
import cloudinary from 'cloudinary';
import { formatImage } from '../middlewares/multer.js';

// create __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

// Get Email Layout
export const getEmailLayout = (req, res) => {
  res.sendFile(path.resolve(__dirname, '../layouts', 'sampleLayout.html'));
};

// Upload Image
export const uploadImage = async (req, res) => {
  let imageUrl = null;
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file, {
      folder: 'emailBuilder',
    });

    imageUrl = response.secure_url;
  }

  res.json({ imageUrl });
};

// UploadImageConfig
export const uploadEmailConfig = (req, res) => {
  const emailConfig = req.body;
  writeFileSync('emailConfig.json', JSON.stringify(emailConfig));
  res.json({ message: 'configuration saved successfully' });
};

export const renderAndDownloadTemplate = () => {};
