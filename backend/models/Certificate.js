import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    certificateNumber: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    programme: {
        type: String,
        required: true
    },
    award: {
        type: String,
        required: true
    },
    graduationDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['issued','revoked'],
        default: 'issued'
    }
},{timestamps: true});

export default mongoose.model('Certificate', certificateSchema);