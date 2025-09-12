require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function initAuthDatabase() {
  try {
    console.log('🔐 Initializing authentication database...');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'nextschool'
    });

    // Read and execute the auth setup SQL
    const authSqlPath = path.join(__dirname, '..', 'database', 'auth-setup.sql');
    const authSql = fs.readFileSync(authSqlPath, 'utf8');
    
    // Split SQL statements and execute them (filter out comments)
    const statements = authSql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt && !stmt.startsWith('--') && !stmt.startsWith('/*'));
    
    for (const statement of statements) {
      if (statement.trim()) {
        console.log('Executing:', statement.substring(0, 50) + '...');
        await connection.execute(statement);
      }
    }

    console.log('✅ Authentication tables created successfully!');
    
    // Verify tables exist
    const [userTables] = await connection.execute("SHOW TABLES LIKE 'users'");
    const [otpTables] = await connection.execute("SHOW TABLES LIKE 'otp_codes'");
    console.log('📋 Authentication tables created:', [...userTables, ...otpTables].map(t => Object.values(t)[0]));

    await connection.end();
    console.log('🎉 Authentication database setup complete!');
    
  } catch (error) {
    console.error('❌ Error setting up authentication database:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  initAuthDatabase();
}

module.exports = initAuthDatabase;