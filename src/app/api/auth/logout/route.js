import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Create response
    const response = NextResponse.json({
      message: 'Logout successful'
    });

    // Clear the authentication cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Error in logout API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}