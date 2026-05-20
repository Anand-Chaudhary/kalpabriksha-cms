import { Router } from 'express';
import * as galleryServices from '../services/gallery.service'
import * as middleware from '../middlewares/auth.middleware';

const router = Router()

router.get('/', middleware.authMiddleware, galleryServices.getImages)

export default router;