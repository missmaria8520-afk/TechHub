const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOTPByEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "TechHub - Your OTP Verification Code",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
            <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #2563eb; margin: 0; font-size: 28px;">TechHub</h1>
                    <p style="color: #64748b; margin: 5px 0 0 0;">Your Ultimate Tech Store</p>
                </div>
                
                <h2 style="color: #1e293b; margin-bottom: 20px;">Verification Code</h2>
                
                <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                    Hello! We received a request to verify your email address. Use the following OTP to complete your verification:
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <div style="background-color: #dbeafe; border: 2px solid #2563eb; border-radius: 8px; padding: 20px; display: inline-block;">
                        <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 5px;">${otp}</span>
                    </div>
                </div>
                
                <p style="color: #ef4444; font-size: 14px; text-align: center; margin: 20px 0;">
                    ⏰ This code expires in 10 minutes
                </p>
                
                <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin-top: 30px;">
                    If you didn't request this verification, please ignore this email. Your account security is important to us.
                </p>
                
                <div style="border-top: 1px solid #e2e8f0; margin-top: 30px; padding-top: 20px; text-align: center;">
                    <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                        © 2024 TechHub. All rights reserved.<br>
                        This is an automated message, please do not reply.
                    </p>
                </div>
            </div>
        </div>
        `,
        text: `TechHub - Your OTP verification code is ${otp}. It is valid for 10 minutes. If you didn't request this, please ignore this email.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("📩 OTP Sent to:", email);
    } catch (error) {
        console.error("❌ Error Sending OTP:", error.message);
    }
};

module.exports = sendOTPByEmail;
