import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import cloudinary from 'cloudinary';
import { formatImage } from '../middlewares/multer.js';
import layoutConfig from '../models/layoutConfig.js';
import ejs from 'ejs';

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
export const uploadEmailConfig = async (req, res) => {
  const emailConfig = req.body;
  const response = await layoutConfig.create(emailConfig);
  res.json({ message: 'configuration saved successfully' });
};

export const renderAndDownloadTemplate = async (req, res) => {
  const config = await layoutConfig.find({}).sort({ createdAt: -1 }).limit(1);
  const { title, content, footer, imageUrl } = config[0];
  const emailData = {
    title,
    content,
    footer,
    imageUrl,
  };

  const layoutHTML = readFileSync(
    path.resolve(__dirname, '../layouts', 'layout.html'),
    'utf-8'
  );

  const renderHTML = ejs.render(layoutHTML, emailData);

  res.send(renderHTML);
};
