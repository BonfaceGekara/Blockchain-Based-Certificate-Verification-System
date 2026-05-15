import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from "../utils/sendEmail.js";

export const register = async (req, res) => {

    const { email, name, phone, password } = req.body;

    try {

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).json({
                message: 'User already registered!'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = await User.create({
            email, name, phone, password: hashedPassword,role: "user",verificationCode,codeExpires: Date.now() + 10 * 60 * 1000
        });

        const result = await newUser.save();

        await sendEmail(
            email,
            'Verify your account!',
            `<h2>Email Verification</h2>

            <p>Hello ${name},</p>

            <p>Your verification code is:</p>

            <h1>${verificationCode}</h1>

            <p>
              This code expires in 10 minutes.
            </p>`
        );

        res.status(201).json({
            message: 'Success! Check your email to verify your account!',
            email: result.email
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server error!'
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isUser = await User.findOne({ email });

        if (!isUser) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }

        if (!isUser.isActive) {
            return res.status(403).json({
                message: "Account activation required!",
                requiresActivation: true,
                email: isUser.email
            });
        }

        const passwordMatch = await bcrypt.compare(password, isUser.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Invalid credentials!'
            });
        }
        const token = jwt.sign(
            { email: isUser.email, id: isUser._id, role: isUser.role, name: isUser.name, phone: isUser.phone },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({
            user: {
                id: isUser._id, email: isUser.email, role: isUser.role
            },
            message: 'Login successful!'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Server error!'
        });
    }
};

export const verifyAccount = async (req, res) => {

    try {

        const { email, code } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.isActive) {
            return res.status(400).json({
                message: "Account already activated"
            });
        }

        if (user.verificationCode !== code) {
            return res.status(400).json({
                message: "Invalid verification code"
            });
        }

        if (user.codeExpires < new Date()) {
            return res.status(400).json({
                message: "Verification code expired!"
            });
        }

        user.isActive = true;

        user.verificationCode = undefined;
        user.codeExpires = undefined;

        await user.save();

        return res.status(200).json({
            message: "Account activated successfully"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

export const resendVerificationCode = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.isActive) {
            return res.status(400).json({
                message: "Account already activated"
            });
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        user.verificationCode = code;

        user.codeExpires = new Date(Date.now() + 10 * 60 * 1000);

        await user.save();

        await sendEmail(
            email,
            "New Verification Code",
            `
            <h2>Account Verification</h2>

            <p>Your new verification code is:</p>

            <h1>${code}</h1>

            <p>
              This code expires in 10 minutes.
            </p>
            `
        );

        return res.status(200).json({
            message: "New verification code sent"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message:
                "Server error"
        });
    }
};

export const forgotPass = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        user.verificationCode = verificationCode;

        user.codeExpires = new Date(Date.now() + 10 * 60 * 1000);

        await user.save();

        await sendEmail(
            email,
            "Password Reset Code",
            `
            <h2>Password Reset</h2>

            <p>Your password reset code is:</p>

            <h1>${verificationCode}</h1>

            <p>
              This code expires in 10 minutes.
            </p>
            `
        );

        return res.status(200).json({
            message: "Password reset code sent to email"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

export const resetPassword = async (req, res) => {

    try {

        const { email, code, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.verificationCode !== code.toString()) {
            return res.status(400).json({
                message: "Invalid reset code"
            });
        }

        if (user.codeExpires < new Date()) {
            return res.status(400).json({
                message: "Reset code expired"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        user.resetCode = undefined;
        user.resetCodeExpires = undefined;

        await user.save();

        return res.status(200).json({
            message: "Password reset successful"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'Logged out!'
    })
};

export const getUser = (req, res) => {
    res.json({
        user: req.user
    })
};