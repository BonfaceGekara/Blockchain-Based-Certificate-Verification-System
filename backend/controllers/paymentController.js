import Payment from "../models/Payment.js";
import Certificate from "../models/Certificate.js";
import { stkPush } from "../services/mpesaService.js";

export const initiatePayment = async (req, res) => {

    try {

        const { certificateNumber, phone } = req.body;
        const amount = 1;

        const formattedPhone = phone.startsWith("0")
            ? "254" + phone.slice(1)
            : phone;

        const stk = await stkPush(
            formattedPhone,
            amount || 1,
            certificateNumber,
            "Certificate Payment"
        );

        const payment = await Payment.create({
            verifierId: req.user.id,
            certificateNo: certificateNumber,
            amount: amount || 1,
            status: "pending",
            transactionNo: stk.CheckoutRequestID,
            paymentDate: new Date()
        });

        return res.status(200).json({
            message: "STK sent to phone",
            payment
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Payment initiation failed"
        });
    }
};

export const mpesaCallback = async (req, res) => {

    try {

        const result = req.body?.Body?.stkCallback;

        const checkoutId = result?.CheckoutRequestID;
        const success = result?.ResultCode === 0;

        const metadata = result?.CallbackMetadata?.Item || [];

        const receipt = metadata.find(
            item => item.Name === "MpesaReceiptNumber"
        )?.Value;

        await Payment.findOneAndUpdate(
            { transactionNo: checkoutId },
            {
                status: success ? "complete" : "failed",
                receiptNumber: receipt || null,
                paymentDate: new Date()
            }
        );

        return res.json({ ResultCode: 0 });

    } catch (err) {
        console.log(err);
        return res.json({ ResultCode: 1 });
    }
};