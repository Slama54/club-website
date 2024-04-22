import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletechampion, getchampions, updatechampion } from '../controllers/champion.controller.js';



const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getchampions', getchampions)
router.delete('/deletechampion/:championId/:userId',verifyToken, deletechampion)
router.put('/updatechampion/:championId/:userId',verifyToken, updatechampion)


export default router;