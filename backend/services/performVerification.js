import Certificate from '../models/Certificate.js';
import Verification from '../models/Verification.js';
import { verifyCertificateHash } from '../blockchain/blockchainService.ts';
import crypto  from 'crypto';
import Payment from '../models/Payment.js';

export const performVerification = async (certificateNumber, verifierId, phoneNumber, paymentId = null) => {

    let newLog;

    try {

        const payment = await Payment.findById(paymentId);
        
        if (!payment || payment.status !== 'complete') {
            return {
                success: false,
                message: 'Payment not found or incomplete. Please complete payment first.'
            };
        }

        //verification log
        newLog = await Verification.create({
            verifierId: verifierId,
            searchedNumber: certificateNumber,
            paymentId: paymentId
        });

        const cert = await Certificate.findOne({ certificateNumber });

        if (!cert) {
            newLog.failureReason = 'Invalid certificate number';
            newLog.result = 'invalid';
            newLog.status = 'complete';
            await newLog.save();
            return {
                message: 'Invalid certificate number provided!',
            };
        }

        //check payment and update result as missing payment

        if (cert.status === 'revoked') {
            newLog.result = 'revoked';
            newLog.holder = cert.fullname;
            newLog.status = 'complete';
            await newLog.save();
            return {
                message: 'This certificate has been revoked!',
            };
        }

        //blockchain verification
        const hashData = cert.fullname + cert.programme + cert.award + cert.graduationDate.toISOString() + cert.certificateNumber;

        const generatedHash = generateHash(hashData);

        const blockchainHash = await verifyCertificateHash(certificateNumber, generatedHash);

        if (!blockchainHash) {
            newLog.result = 'invalid';
            newLog.failureReason = 'Blockchain record error!';
            newLog.status = 'complete';
            await newLog.save();

            return {
                message: 'Verification integrity check failed!'
            };
        }

        newLog.certificateId = cert._id;
        newLog.holder = cert.fullname;
        newLog.result = 'valid';
        newLog.status = 'complete';
        await newLog.save();

        return {
            message: 'Certificate verified successfully!',
            cert
        };

    } catch (err) {
        console.log(err);
        if (newLog) {
            newLog.status = 'failed';
            newLog.failureReason = 'Internal server error';
            await newLog.save();
        }
        return {
            'message': 'Server error!'
        };
    }
};

function generateHash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
};