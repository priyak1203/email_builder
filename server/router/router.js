import { Router } from 'express';
import {
  getEmailLayout,
  uploadEmailConfig,
  uploadImage,
} from '../controllers/controller.js';
import upload from '../middlewares/multer.js';

const router = Router();

router.get('/getEmailLayout', getEmailLayout);
router.post('/uploadImage', upload.single('logoImg'), uploadImage);
router.post('/uploadEmailConfig', uploadEmailConfig);

export default router;
