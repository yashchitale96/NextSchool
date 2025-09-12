import { NextResponse } from 'next/server';
import { requireAuth } from '../../../../lib/auth';

export async function GET(request) {
  try {
    const authResult = await requireAuth(request);
    
    if (!authResult.authenticated) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: authResult.user
    });

  } catch (error) {
    console.error('Error in me API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}