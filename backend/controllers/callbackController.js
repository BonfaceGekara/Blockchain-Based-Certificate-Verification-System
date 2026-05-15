// controllers/callbackController.js
import Payment from '../models/Payment.js';
import { performVerification } from '../services/performVerification.js';

export const handleCallback = async (req, res) => {

    console.log('M-Pesa callback received');
    
    try {
        const { Body } = req.body;
        const { stkCallback } = Body;
        
        const checkoutRequestID = stkCallback.CheckoutRequestID;
        const resultCode = stkCallback.ResultCode;
        const resultDesc = stkCallback.ResultDesc;
        
        const payment = await Payment.findOne({ 
            transactionNo: checkoutRequestID 
        });
        
        if (!payment) {
            console.log('Payment not found');
            return res.json({ ResultCode: 1, ResultDesc: 'Payment not found' });
        }
        
        if (resultCode === 0) {
            // SUCCESS
            const metadata = stkCallback.CallbackMetadata.Item;
            const receiptNo = metadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
            
            payment.status = 'complete';
            payment.receiptNo = receiptNo;
            payment.paymentDate = new Date();
            await payment.save();
            
            const response = await performVerification(
                payment.certificateNo,
                payment.verifierId,
                payment.phoneNumber,
                payment._id
            );
            
        } else {
            // FAILED
            payment.status = 'failed';
            await payment.save();

            const response = await performVerification(
                payment.certificateNo,
                payment.verifierId,
                payment.phoneNumber,
                payment._id
            );
        }
        
        res.json({ ResultCode: 0, ResultDesc: 'Success' });
        
    } catch (error) {
        console.error('Callback error:', error);
        res.json({ ResultCode: 1, ResultDesc: 'Error' });
    }
};