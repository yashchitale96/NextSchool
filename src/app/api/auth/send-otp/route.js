import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';
import { generateOTP, sendOTPEmail } from '../../../../lib/email';

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Generate 6-digit OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    try {
      // Clean up expired OTPs for this email
      await pool.execute(
        'DELETE FROM otp_codes WHERE email = ? AND (expires_at < NOW() OR is_used = TRUE)',
        [email]
      );

      // Store OTP in database
      await pool.execute(
        'INSERT INTO otp_codes (email, code, expires_at) VALUES (?, ?, ?)',
        [email, otp, expiresAt]
      );

      // Send OTP email
      const emailResult = await sendOTPEmail(email, otp);
      
      if (!emailResult.success) {
        // Remove the OTP if email failed
        await pool.execute(
          'DELETE FROM otp_codes WHERE email = ? AND code = ?',
          [email, otp]
        );
        
        return NextResponse.json(
          { error: 'Failed to send OTP email. Please try again.' },
          { status: 500 }
        );
      }

      // Create or update user record
      await pool.execute(
        'INSERT INTO users (email) VALUES (?) ON DUPLICATE KEY UPDATE updated_at = NOW()',
        [email]
      );

      return NextResponse.json({
        message: 'OTP sent successfully to your email',
        email: email,
        expiresIn: 600 // 10 minutes in seconds
      });

    } catch (dbError) {
      console.error('Database error in send-otp:', dbError);
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in send-otp API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}