# NextSchool - School Management System

A modern, responsive web application for managing school information built with Next.js 15, React 19, and MySQL.

## 🎯 Overview

NextSchool is a full-stack school management system that allows users to add, view, and manage school information with image uploads. The application features a clean, professional interface and robust backend functionality.

## ✨ Features

- **Add Schools**: Complete form with validation for school details
- **View Schools**: Responsive grid layout displaying all schools
- **Image Management**: Cloud-based image storage with Cloudinary
- **Data Persistence**: MySQL database with Railway hosting
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Form Validation**: Client-side validation with React Hook Form
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - Latest React version
- **TailwindCSS 4** - Utility-first CSS framework
- **React Hook Form** - Form handling and validation

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **MySQL** - Relational database
- **mysql2** - MySQL driver for Node.js
- **Connection Pooling** - Optimized database connections

### Cloud Services
- **Cloudinary** - Image storage and optimization
- **Railway** - Database hosting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MySQL database (local or Railway)
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yashchitale96/NextSchool.git
   cd NextSchool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```bash
   # Database Configuration
   DB_HOST=your_database_host
   DB_PORT=3306
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Initialize Database**
   ```bash
   npm run init-db
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
NextSchool/
├── src/
│   ├── app/
│   │   ├── addSchool/          # Add school page
│   │   ├── showSchools/        # Display schools page
│   │   ├── api/schools/        # API endpoints
│   │   ├── layout.js           # Root layout
│   │   ├── page.js             # Homepage
│   │   └── globals.css         # Global styles
│   └── lib/
│       ├── db.js               # Database connection
│       └── cloudinary.js       # Image upload utility
├── scripts/
│   ├── init-db.js              # Local database setup
│   └── init-production-db.js   # Production database setup
├── database/
│   └── setup.sql               # Database schema
└── public/                     # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run init-db` - Initialize local database
- `npm run init-production-db` - Initialize production database
- `npm run lint` - Run ESLint

## 🎨 Features Overview

### School Information Management
- **School Name**: Required field with minimum 3 characters
- **Address**: Full address with minimum 10 characters
- **City & State**: Location information
- **Contact**: 10-digit phone number validation
- **Email**: Valid email address validation
- **Image**: Optional school image upload (max 5MB)

### User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Smooth loading animations
- **Error Handling**: Clear error messages and validation
- **Success Feedback**: Confirmation messages for actions

## 🗄️ Database Schema

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact BIGINT NOT NULL,
  image TEXT,
  email_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🚢 Deployment

### Railway Database Setup
1. Create a MySQL database on Railway
2. Get your database connection details
3. Update environment variables
4. Run production database initialization

### Render Deployment
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy with build command: `npm run build`
4. Start command: `npm run start`

## 🔒 Environment Variables

Ensure these environment variables are set in production:

```bash
DB_HOST=your_railway_host
DB_PORT=your_railway_port
DB_USER=root
DB_PASSWORD=your_railway_password
DB_NAME=railway
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Cloudinary for image management
- Railway for database hosting

## 📧 Contact

**Yash Chitale** - [yashchitale96@gmail.com](mailto:yashchitale96@gmail.com)

Project Link: [https://github.com/yashchitale96/NextSchool](https://github.com/yashchitale96/NextSchool)

Live Demo: [https://nextschool.onrender.com](https://nextschool.onrender.com)
