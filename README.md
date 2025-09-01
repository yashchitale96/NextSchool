# NextSchool - School Management System

A modern school management system built with Next.js 15, React Hook Form, and MySQL. This application allows you to add schools to a database and display them in an e-commerce style grid layout.

## Features

- **Add School**: Form with comprehensive validation using React Hook Form
- **View Schools**: E-commerce style grid display of schools with images
- **Image Upload**: Upload and store school images
- **Responsive Design**: Works on both desktop and mobile devices
- **MySQL Database**: Robust data storage with proper schema

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: MySQL
- **Form Handling**: React Hook Form
- **File Upload**: Built-in file handling
- **Styling**: Tailwind CSS with responsive design

## Database Schema

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

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

1. Create a MySQL database named `nextschool`
2. Run the SQL script located in `database/setup.sql` to create the required table
3. Update the `.env.local` file with your database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=nextschool
```

### 3. Create Upload Directory

The application will automatically create the `public/schoolImages` directory for storing uploaded images.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Pages

### Home Page (`/`)
- Landing page with navigation to add and view schools
- Clean, modern design with clear call-to-action buttons

### Add School (`/addSchool`)
- Comprehensive form with validation
- Fields: School name, address, city, state, contact number, email, and image upload
- Real-time validation with error messages
- Responsive design for all screen sizes

### View Schools (`/showSchools`)
- E-commerce style grid layout
- Displays school name, address, city, and image
- Responsive grid that adapts to screen size
- Loading states and error handling

## Form Validation

The add school form includes the following validations:

- **School Name**: Required, minimum 3 characters
- **Address**: Required, minimum 10 characters
- **City**: Required, minimum 2 characters
- **State**: Required, minimum 2 characters
- **Contact**: Required, exactly 10 digits
- **Email**: Required, valid email format
- **Image**: Optional, maximum 5MB file size

## API Endpoints

### POST `/api/schools`
Add a new school to the database
- Accepts multipart/form-data
- Handles image upload
- Returns success/error response

### GET `/api/schools`
Retrieve all schools from the database
- Returns array of school objects
- Includes all school information

## File Structure

```
src/
├── app/
│   ├── addSchool/
│   │   └── page.js          # Add school form page
│   ├── showSchools/
│   │   └── page.js          # Display schools page
│   ├── api/
│   │   └── schools/
│   │       └── route.js     # API routes for school operations
│   ├── globals.css          # Global styles
│   ├── layout.js            # Root layout
│   └── page.js              # Home page
├── lib/
│   └── db.js                # Database connection
public/
├── schoolImages/            # Uploaded school images (auto-created)
└── ...                      # Static assets
database/
└── setup.sql                # Database schema
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=nextschool
```

## Production Deployment

1. Set up a production MySQL database
2. Update environment variables for production
3. Deploy to Vercel, Netlify, or your preferred platform
4. Ensure the upload directory has proper permissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
