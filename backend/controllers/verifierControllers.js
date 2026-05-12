import Certificate from '../models/Certificate.js';
import Verification from '../models/Verification.js';
import { verifyCertificateHash } from '../blockchain/blockchainService.ts';
import crypto from 'crypto';
import Payment from '../models/Payment.js';
import { stkPush } from '../services/mpesaService.js';

export const verifyCert = async (req, res) => {

    let newLog;

    try {

        const { certificateNumber, phone } = req.body;

        //verification log
        newLog = await Verification.create({
            verifierId: req.user.id,
            searchedNumber: certificateNumber,
            paymentNumber: phone,
        });

        //payment starts here


        const stkResponse = await stkPush(
            phone, 1, certificateNumber, 'Verification Purpose'
        );

        console.log(stkPush);



        const cert = await Certificate.findOne({ certificateNumber });

        if (!cert) {
            newLog.failureReason = 'Invalid certificate number';
            newLog.result = 'invalid';
            newLog.status = 'complete';
            await newLog.save();
            return res.status(200).json({
                message: 'Invalid certificate number provided!',
            });
        }

        if (cert.status === 'revoked') {
            newLog.result = 'revoked';
            newLog.holder = cert.fullname;
            newLog.status = 'complete';
            await newLog.save();
            return res.status(200).json({
                message: 'This certificate has been revoked!',
            });
        }

        //blockchain verification
        const hashData = cert.fullname + cert.programme + cert.award + cert.graduationDate.toISOString() + cert.certificateNumber;

        const generatedHash = generateHash(hashData);

        const blockchainHash = await verifyCertificateHash( certificateNumber, generatedHash );

        if(!blockchainHash) {
            newLog.result = 'invalid';
            newLog.failureReason = 'Blockchain record error!';
            newLog.status = 'complete';
            await newLog.save();

            return res.status(200).json({
                message: 'Verification integrity check failed!'
            });
        }

        newLog.certificateId = cert._id;
        newLog.holder = cert.fullname;
        newLog.result = 'valid';
        newLog.status = 'complete';
        await newLog.save();

        return res.status(200).json({
            message: 'Certificate verified successfully!',
            cert
        });

    } catch (err) {
        console.log(err);
        if (newLog) {
            newLog.status = 'failed';
            newLog.failureReason = 'Internal server error';
            await newLog.save();
        }
        res.status(500).json({
            'message': 'Server error!'
        });
    }
};

export const getDashboardDetails = async (req, res) => {
    try {
        const verifierId = req.user.id;

        const verifications = await Verification.find({ verifierId })
            .sort({ createdAt: -1 })
            .limit(4);

        const totalVerifications = await Verification.countDocuments({ verifierId });

        const recentChecks = await Verification.countDocuments({
            verifierId,
            createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        });

        const totalPayments = 0;

        res.json({
            stats: {
                totalVerifications,
                recentChecks,
                totalPayments
            },
            verifications
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllVerifications = async (req, res) => {
    const verifierId = req.user.id;
    try {
        const verifications = await Verification.find({ verifierId }).sort({ createdAt: -1 })
        res.json({
            message: "Verifications found!",
            verifications
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error!" });
    }
}

export const getVerificationById = async (req, res) => {
    try {
        const { id } = req.params;

        const verification = await Verification.findById(id)
            .populate("certificateId")
            .populate("verifierId", "name email");

        if (!verification) {
            return res.status(404).json({
                message: "Verification not found"
            });
        }

        if (verification.verifierId._id.toString() !== req.user.id) {
            return res.status(404).json({
                message: "Verification does not exist!"
            });
        }

        res.status(200).json({
            verification
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error"
        });
    }
};

function generateHash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
};