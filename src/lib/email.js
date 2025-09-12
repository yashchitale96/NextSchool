import nodemailer from 'nodemailer';

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
export const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'NextSchool - Your Login Code',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">NextSchool</h1>
            <p style="color: #6b7280; margin: 5px 0;">School Management System</p>
          </div>
          
          <div style="background: #f8fafc; border-radius: 8px; padding: 30px; text-align: center;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0;">Your Login Code</h2>
            <p style="color: #4b5563; margin: 0 0 30px 0;">Enter this code to access your NextSchool account:</p>
            
            <div style="background: white; border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0; display: inline-block;">
              <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 4px;">${otp}</span>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin: 20px 0 0 0;">
              This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © 2025 NextSchool. This is an automated message, please do not reply.
            </p>
          </div>
        </div>
      `,
      text: `Your NextSchool login code is: ${otp}. This code will expire in 10 minutes.`
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('📧 OTP email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

// Verify email configuration
export const verifyEmailConfig = async () => {
  try {
    await transporter.verify();
    console.log('✅ Email configuration verified successfully');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error);
    return false;
  }
};