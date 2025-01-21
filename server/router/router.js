import { Router } from 'express';
import upload from '../middlewares/multer.js';
import { uploadImage } from '../controllers/controller.js';

const router = Router();

router.post('/uploadImage', upload.single('logoImg'), uploadImage);

export default router;
