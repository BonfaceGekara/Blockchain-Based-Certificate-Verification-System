import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'verifier'
    },
    isActive: {
        type: Boolean,
        default: false
    },
    verificationCode: String,
    codeExpires: Date
}, { timestamps: true });

export default mongoose.model('User', userSchema);