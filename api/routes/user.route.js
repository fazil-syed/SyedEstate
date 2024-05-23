
import express from 'express';
import { updateUserInfo } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.post('/update/:id',verifyToken,updateUserInfo)

export default router