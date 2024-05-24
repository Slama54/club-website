import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create,deletegallery,getgallerys, updategallery, } from '../controllers/gallery.controller.js';


const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getgallerys', getgallerys)
router.delete('/deletegallery/:galleryId/:userId',verifyToken, deletegallery)
router.put('/updategallery/:galleryId/:userId',verifyToken, updategallery)


export default router;