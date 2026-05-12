import Certificate from '../models/Certificate.js';
import User from '../models/User.js';
import crypto from 'crypto';
import { storeCertificateHash } from '../blockchain/blockchainService.ts';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(201).json(users);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to get users!'
        });
    }
}

export const getAllCerts = async (req, res) => {
    try {
        const certs = await Certificate.find();
        res.status(201).json(certs);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to get certificates!'
        });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json({
            user
        })
    } catch (err) {
        return res.status(500).json({
            message: 'Server error!'
        });
    }
}

export const getCertificate = async (req, res) => {
    try {
        const { id } = req.params;

        const certificate = await Certificate.findById(id);

        if (!certificate) {
            return res.status(404).json({
                message: "Certificate not found"
            });
        }

        res.status(200).json(certificate);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error"
        });
    }
};

export const addCertificate = async (req, res) => {
    try {
        let { certificateNumber, surname, firstname, lastname, programme, award, graduationDate } = req.body;

        const existingCertificate = await Certificate.findOne({ certificateNumber });
        if (existingCertificate) {
            return res.status(404).json({
                message: 'A certificate with the number already exists!'
            });
        }

        graduationDate = new Date(graduationDate).toISOString()
        console.log(graduationDate);

        const fullname = `${surname} ${firstname} ${lastname || ''}`.trim();

        const hashData = fullname + programme + award + graduationDate + certificateNumber;
        console.log(hashData);
        const hash = await generateHash(hashData);
        console.log(hash);

        const certificate = await Certificate.create({
            certificateNumber,
            fullname,
            surname,
            firstname,
            lastname,
            programme,
            award,
            graduationDate,
            status: 'issued'
        });

        const blockchainResult = await storeCertificateHash(certificate._id.toString(), certificateNumber, hash);

        console.log(blockchainResult);

        if (!blockchainResult.success) {
            return res.status(500).json({
                message: "Blockchain storage failed!"
            });
        }

        res.status(201).json({
            message: 'Certificate created successfully!',
            certificate
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server error!'
        });
    }
}

export const toggleUserActivation = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }

        if (user._id.toString() === req.user.id) {
            return res.status(400).json({
                message: 'You cannot deactivate yourself!'
            })
        }

        user.isActive = !user.isActive;
        await user.save();

        res.json({
            message: 'User status updated!'
        })

    } catch (err) {
        res.status(500).json({
            message: 'Update failed!'
        })
    }
}

export const editUser = async (req, res) => {
    try {
        const { email, phone } = req.body;

        const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
        if (existingUser) {
            return res.status(400).json({
                message: 'Email already in use!'
            })
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { email, phone },
            { returnDocument: 'after' }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server error!'
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }

        if (user._id.toString() === req.user.id) {
            return res.status(400).json({
                message: 'You cannot delete yourself!'
            })
        }

        await user.deleteOne();

        res.json({
            message: 'User deleted successfully!'
        })

    } catch (err) {
        res.status(500).json({
            message: 'Delete failed!'
        })
    }
}

export const revokeCertificate = async (req, res) => {
    try {
        const { id } = req.params;

        const certificate = await Certificate.findById(id);

        if (!certificate) {
            return res.status(404).json({
                message: "Certificate not found"
            });
        }

        certificate.status = "revoked";

        await certificate.save();

        res.status(200).json({
            message: "Certificate revoked successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error"
        });
    }
};

export const deleteCertificate = async (req, res) => {
    try {
        const { id } = req.params;

        const certificate = await Certificate.findById(id);

        if (!certificate) {
            return res.status(404).json({
                message: "Certificate not found"
            });
        }

        await Certificate.findByIdAndDelete(id);

        res.status(200).json({
            message: "Certificate deleted successfully"
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
}