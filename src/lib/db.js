import mysql from 'mysql2/promise';

// Enhanced connection configuration for production
const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nextschool',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // SSL configuration for production databases
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
};

const pool = mysql.createPool(config);

// Test connection on startup
pool.getConnection()
  .then(connection => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Database connected successfully');
    }
    connection.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

export default pool;
