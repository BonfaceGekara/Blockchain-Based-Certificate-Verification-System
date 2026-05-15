import axios from 'axios';
import { generatePassword } from '../utils/password.js';
import Payment from '../models/Payment.js';

export const initiatePayment = async (req, res) => {

    try {
       
        const { phone, amount, certificateNumber } = req.body;

        // Format phone number (ensure it starts with 254)
        let formattedPhone = phone.toString().replace(/\D/g, '');
        if (formattedPhone.startsWith('0')) {
            formattedPhone = '254' + formattedPhone.substring(1);
        } else if (formattedPhone.startsWith('254')) {
            formattedPhone = formattedPhone;
        } else {
            return res.status(400).json({ error: "Invalid phone number format. Use 07XX or 2547XX" });
        }
        
        // Validate amount
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }
        
        const { password, timestamp } = generatePassword();
        
        const requestBody = {
            BusinessShortCode: process.env.MPESA_SHORTCODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: Math.round(amount),
            PartyA: formattedPhone,
            PartyB: process.env.MPESA_SHORTCODE,
            PhoneNumber: formattedPhone,
            CallBackURL: process.env.CALLBACK_URL,
            AccountReference: 'Payment',
            TransactionDesc: "Certificate Verification Payment"
        };

        const response = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${req.access_token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        if (response.data.ResponseCode === "0") {
            
            const newPayment = new Payment({
                verifierId: req.user.id || 'N/A',
                certificateNo: certificateNumber,
                amount: Math.round(amount),
                status: 'pending',
                transactionNo: response.data.CheckoutRequestID,
                receiptNo: null,
                paymentDate: null
            });

            await newPayment.save();
            
            res.json({
                success: true,
                message: "STK Push sent successfully",
                checkoutRequestID: response.data.CheckoutRequestID,
                customerMessage: response.data.CustomerMessage
            });
        } else {
            throw new Error(response.data.ResponseDescription);
        }
        
    } catch (error) {
        console.error('Payment initiation failed:', error.response?.data || error.message);
        res.status(500).json({
            error: "Payment initiation failed",
            details: error.response?.data || error.message
        });
    }
};