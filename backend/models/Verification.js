import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema(
    {
        verifierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        searchedNumber: {
            type: String,
            required: true
        },

        paymentNumber: {
            type: String,
            required: true
        },

        certificateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Certificate',
            default: null
        },

        holder: {
            type: String,
            default: null
        },

        paymentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payment',
            default: null
        },

        status: {
            type: String,
            enum: ['complete', 'failed', 'processing'],
            default: 'processing'
        },

        result: {
            type: String,
            enum: ['valid','invalid','revoked'],
            default: null
        },

        failureReason: {
            type: String,
            default: null
        }

    },
    {
        timestamps: true
    }
);

export default mongoose.model('Verification', verificationSchema);