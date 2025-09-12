import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

// Generate JWT token
export const generateToken = (payload, expiresIn = '24h') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Extract token from request headers
export const extractTokenFromRequest = (request) => {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Also check cookies
  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) {
    const tokenMatch = cookieHeader.match(/token=([^;]+)/);
    if (tokenMatch) {
      return tokenMatch[1];
    }
  }
  
  return null;
};

// Middleware to check authentication
export const requireAuth = async (request) => {
  const token = extractTokenFromRequest(request);
  
  if (!token) {
    return { authenticated: false, error: 'No token provided' };
  }
  
  const decoded = verifyToken(token);
  if (!decoded) {
    return { authenticated: false, error: 'Invalid token' };
  }
  
  return { authenticated: true, user: decoded };
};