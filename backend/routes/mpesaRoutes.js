import express from "express";
import { initiatePayment } from "../controllers/paymentController.js";

import verifyToken from "../middleware/verifyToken.js";
import { generateToken } from "../middleware/auth.js";
import { handleCallback } from "../controllers/callbackController.js";


const router = express.Router();

router.post('/initiate', generateToken, verifyToken, initiatePayment);
router.post('/callback', handleCallback);
router.get('/callback', (req,res)=> {
    res.send('hello')
})

export default router;