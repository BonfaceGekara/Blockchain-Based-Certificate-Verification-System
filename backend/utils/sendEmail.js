import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({

    service: 'gmail',

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }

});

export const sendEmail = async (receipient, subject, html) => {
    try {

        const mailOptions = {
            from: 'JKUAT - Certificate Verification System',
            to: receipient,
            subject,
            html
        };

        const info = await transporter.sendMail( mailOptions );

        return info;

    } catch(err) {
        console.log(err);
    }
}