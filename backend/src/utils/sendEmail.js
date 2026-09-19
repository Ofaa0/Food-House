const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    if (!process.env.SMTP_HOST) {
        console.log(`[Dev Email Stream] To: ${options.to} | Subject: ${options.subject} | Text: ${options.text}`);
        return;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const message = {
        from: `${process.env.FROM_EMAIL || 'noreply@restaurant.com'}`,
        to: options.to,
        subject: options.subject,
        text: options.text,
    };

    await transporter.sendMail(message);
};

module.exports = sendEmail;