import { Router } from 'express';
import * as galleryServices from '../services/gallery.service';
import * as middleware from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

router.get('/', galleryServices.GetImages);

router.post(
  '/',
  middleware.authMiddleware,
  upload.single('image'),
  galleryServices.UploadImage
);

export default router;