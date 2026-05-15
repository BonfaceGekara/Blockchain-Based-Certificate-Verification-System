import Certificate from '../models/Certificate.js';
import Verification from '../models/Verification.js';
import crypto from 'crypto';
import Payment from '../models/Payment.js';

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

export const deleteVerification = async (req, res) => {
    try {
        const { id } = req.params;
        const verifierId = req.user.id;

        const verification = await Verification.findById(id);

        if (!verification) {
            return res.status(404).json({
                success: false,
                message: 'Verification record not found'
            });
        }

        if (verification.verifierId.toString() !== verifierId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to delete this record'
            });
        }

        await Verification.findByIdAndDelete(id);

        res.json({
            success: true,
            message: 'Verification record deleted successfully'
        });

    } catch (error) {
        console.error('Delete verification error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

function generateHash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
};