import express from "express";
import { initiatePayment, mpesaCallback } from "../controllers/paymentController.js";

const router = express.Router();

router.post('/initiate', initiatePayment);
router.post('/callback', mpesaCallback);
router.get('/callback', (req, res) => {
    res.send('Callback working!');
});

export default router;