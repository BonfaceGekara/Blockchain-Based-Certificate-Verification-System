import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import verifierRoutes from './routes/verifierRoutes.js';
import mpesaRoutes from './routes/mpesaRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/verifier', verifierRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', mpesaRoutes);

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL)
    .then(
        () => {
            app.listen(port);
            console.log('MongoDB connected!');
        }
    )
    .catch(
        (err) => {
            console.log(err);
        }
    );