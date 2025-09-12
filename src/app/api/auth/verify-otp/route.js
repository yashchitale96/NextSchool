import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';
import { generateToken } from '../../../../lib/auth';

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    // Validate input
    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { error: 'OTP must be exactly 6 digits' },
        { status: 400 }
      );
    }

    try {
      // Check if OTP exists and is valid
      const [otpRecords] = await pool.execute(
        'SELECT * FROM otp_codes WHERE email = ? AND code = ? AND expires_at > NOW() AND is_used = FALSE ORDER BY created_at DESC LIMIT 1',
        [email, otp]
      );

      if (otpRecords.length === 0) {
        return NextResponse.json(
          { error: 'Invalid or expired OTP' },
          { status: 400 }
        );
      }

      // Mark OTP as used
      await pool.execute(
        'UPDATE otp_codes SET is_used = TRUE WHERE id = ?',
        [otpRecords[0].id]
      );

      // Update user as verified
      await pool.execute(
        'UPDATE users SET is_verified = TRUE WHERE email = ?',
        [email]
      );

      // Get user information
      const [users] = await pool.execute(
        'SELECT id, email, is_verified FROM users WHERE email = ?',
        [email]
      );

      if (users.length === 0) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      const user = users[0];

      // Generate JWT token
      const token = generateToken({
        userId: user.id,
        email: user.email,
        isVerified: user.is_verified
      });

      // Create response with token in cookie
      const response = NextResponse.json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          isVerified: user.is_verified
        }
      });

      // Set HTTP-only cookie for security
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        path: '/'
      });

      // Clean up old OTPs for this email
      await pool.execute(
        'DELETE FROM otp_codes WHERE email = ? AND (expires_at < NOW() OR is_used = TRUE)',
        [email]
      );

      return response;

    } catch (dbError) {
      console.error('Database error in verify-otp:', dbError);
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in verify-otp API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}