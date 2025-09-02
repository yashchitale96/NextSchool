require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

async function initializeProductionDatabase() {
  let connection;
  
  try {
    console.log('🚀 Connecting to Railway MySQL database...');
    
    // Create connection to Railway database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false
      }
    });

    console.log('✅ Connected to Railway database successfully');

    // Create schools table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        contact BIGINT NOT NULL,
        image TEXT,
        email_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_name (name(255)),
        INDEX idx_city (city(255)),
        INDEX idx_state (state(255)),
        INDEX idx_created_at (created_at)
      )
    `;

    await connection.execute(createTableQuery);
    console.log('✅ Table "schools" created successfully with indexes');

    // Check if table has data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM schools');
    console.log(`📊 Current schools in database: ${rows[0].count}`);

    // Insert sample data if table is empty (optional)
    if (rows[0].count === 0) {
      console.log('📝 Adding sample school data...');
      
      const sampleSchools = [
        {
          name: 'Greenwood High School',
          address: '123 Education Lane',
          city: 'Mumbai',
          state: 'Maharashtra',
          contact: 9876543210,
          email_id: 'info@greenwood.edu',
          image: null
        },
        {
          name: 'Sunshine Academy',
          address: '456 Learning Street',
          city: 'Pune',
          state: 'Maharashtra', 
          contact: 9876543211,
          email_id: 'contact@sunshine.edu',
          image: null
        }
      ];

      for (const school of sampleSchools) {
        await connection.execute(
          'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [school.name, school.address, school.city, school.state, school.contact, school.email_id, school.image]
        );
      }
      
      console.log('✅ Sample data inserted successfully');
    }

    console.log('🎉 Production database initialization completed!');

  } catch (error) {
    console.error('❌ Error initializing production database:', error);
    
    if (error.code === 'ENOTFOUND') {
      console.error('🔧 Check your Railway database connection details');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('🔧 Check your database credentials');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the initialization
initializeProductionDatabase();
