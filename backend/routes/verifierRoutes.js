import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import {  deleteVerification, getAllVerifications, getDashboardDetails, getVerificationById } from '../controllers/verifierControllers.js';
import { deleteModel } from 'mongoose';

const router = express.Router();

router.get('/dashboard', verifyToken, getDashboardDetails);

router.get('/verifications', verifyToken, getAllVerifications);

router.get('/verification/:id', verifyToken, getVerificationById);

router.delete('/verifications/:id', verifyToken, deleteVerification);

export default router;