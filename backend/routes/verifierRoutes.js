import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { getAllVerifications, getDashboardDetails, getVerificationById, verifyCert } from '../controllers/verifierControllers.js';

const router = express.Router();

router.get('/dashboard', verifyToken, getDashboardDetails);

router.post('/verify', verifyToken, verifyCert);

router.get('/verifications', verifyToken, getAllVerifications);

router.get('/verification/:id', verifyToken, getVerificationById);

export default router;