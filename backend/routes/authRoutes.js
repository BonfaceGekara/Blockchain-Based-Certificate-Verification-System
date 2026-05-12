import express from 'express';
import { register, login, logout, forgotPass, getUser, verifyAccount, resendVerificationCode, resetPassword } from '../controllers/authController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-code', verifyAccount);
router.post('/resend-code', resendVerificationCode);
router.post('/forgot', forgotPass);
router.post('/reset-password', resetPassword);
router.get('/me', verifyToken, getUser);

export default router;