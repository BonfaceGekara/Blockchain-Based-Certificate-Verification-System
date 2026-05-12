import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        verifierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        certificateNo: {
            type: String
        },

        amount: {
            type: Number,
            required: true,
            default: 1
        },

        status: {
            type: String,
            enum: ["complete", "failed"],
            default: "failed"
        },

        transactionNo: {
            type: String,
            default: null
        },

        receiptNo: String,

        paymentDate: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;