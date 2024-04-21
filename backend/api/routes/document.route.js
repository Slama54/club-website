import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createdocument, deletedocument, getdocuments, updatedocument } from '../controllers/document.controller.js';



const router = express.Router();

router.post('/create', verifyToken, createdocument)
router.get('/getdocuments', getdocuments)
router.delete('/deletedocument/:documentId/:userId',verifyToken, deletedocument)
router.put('/updatedocument/:documentId/:userId',verifyToken, updatedocument)


export default router;