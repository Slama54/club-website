import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletecalendarPrive, getcalendarPrives } from '../controllers/calendarPrive.controller.js';



const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getcalendarPrive',verifyToken, getcalendarPrives)
router.delete('/deletecalendarPrive/:calendarPriveId/:userId',verifyToken, deletecalendarPrive)


export default router;