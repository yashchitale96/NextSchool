# 🚀 NextSchool Deployment Guide

## Deployment Options

### 1. Vercel (Recommended - Easiest)

#### Prerequisites:
- Vercel account
- Production MySQL database (PlanetScale, Railway, or AWS RDS)

#### Steps:
1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/nextschool.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables in Vercel dashboard:
     - `DB_HOST`: Your production database host
     - `DB_USER`: Your database username
     - `DB_PASSWORD`: Your database password
     - `DB_NAME`: nextschool

3. **Database Setup:**
   - Create production MySQL database
   - Run the SQL script from `database/setup.sql`
   - Update environment variables

### 2. Railway

#### Steps:
1. **Connect GitHub repo to Railway**
2. **Add MySQL database service**
3. **Set environment variables**
4. **Deploy automatically**

### 3. Netlify (Static + Serverless)

#### Steps:
1. **Build for static export** (requires API changes)
2. **Use Netlify Functions for API routes**
3. **Configure build settings**

### 4. Docker Deployment

#### Prerequisites:
- Docker installed
- Production MySQL database

#### Steps:
1. **Build Docker image:**
   ```bash
   docker build -t nextschool .
   ```

2. **Run container:**
   ```bash
   docker run -p 3000:3000 \
     -e DB_HOST=your-db-host \
     -e DB_USER=your-db-user \
     -e DB_PASSWORD=your-db-password \
     -e DB_NAME=nextschool \
     nextschool
   ```

## Production Database Options

### 1. PlanetScale (Recommended)
- Serverless MySQL
- Free tier available
- Automatic scaling
- Branch-based schema changes

### 2. Railway MySQL
- Simple setup
- Integrated with Railway deployment
- Affordable pricing

### 3. AWS RDS
- Enterprise-grade
- High availability
- More configuration required

### 4. DigitalOcean Managed Database
- Simple setup
- Good performance
- Reasonable pricing

## Pre-Deployment Checklist

### ✅ Environment Setup
- [ ] Production database created
- [ ] Environment variables configured
- [ ] Database schema deployed
- [ ] SSL certificates configured (if needed)

### ✅ Code Preparation
- [ ] Remove console.logs
- [ ] Update API endpoints for production
- [ ] Configure CORS properly
- [ ] Test file upload limits
- [ ] Verify image optimization

### ✅ Security
- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] Input validation enabled
- [ ] File upload security implemented

### ✅ Performance
- [ ] Images optimized
- [ ] Database queries optimized
- [ ] Caching implemented (if needed)
- [ ] CDN configured (optional)

## Environment Variables Required

```env
# Database
DB_HOST=your-production-db-host
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
DB_NAME=nextschool

# Cloudinary (for image storage)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Next.js (if using auth)
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-32-character-secret
```

## Image Storage Setup

### Cloudinary Integration (Recommended)
Your project now uses **Cloudinary** for cloud image storage:

1. **Create free Cloudinary account** at [cloudinary.com](https://cloudinary.com)
2. **Get credentials** from dashboard (Cloud Name, API Key, API Secret)
3. **Add to environment variables** in your deployment platform
4. **Benefits**: 
   - ✅ Persistent storage across deployments
   - ✅ Global CDN delivery
   - ✅ Automatic image optimization
   - ✅ 25GB free storage

### Setup Steps:
1. Sign up at Cloudinary (free tier: 25GB storage)
2. Copy credentials from dashboard
3. Add environment variables to deployment platform
4. Deploy - images will automatically upload to cloud

**See `CLOUDINARY_SETUP.md` for detailed setup instructions.**

## Image Storage - Cloudinary Integration

✅ **Implemented Solution:**

Your project now uses **Cloudinary** for professional cloud image storage:

1. **Persistent Storage**: Images survive all deployments and restarts
2. **Global CDN**: Fast delivery worldwide with automatic optimization
3. **Auto-optimization**: Images automatically resized, compressed, and converted to best formats
4. **Scalable**: Handles unlimited images with 25GB free storage
5. **Professional**: Enterprise-grade image management

**Setup Required:**
- Create free Cloudinary account
- Add 3 environment variables to deployment platform
- Deploy - images automatically upload to cloud

**See `CLOUDINARY_SETUP.md` for complete setup instructions.**

## Post-Deployment Steps

1. **Test all functionality:**
   - Add new school
   - View schools list
   - Image upload/display
   - Form validation

2. **Monitor:**
   - Check logs for errors
   - Monitor database connections
   - Verify file uploads work

3. **Backup:**
   - Set up automated database backups
   - Document recovery procedures

## Troubleshooting

### Common Issues:
1. **Database connection fails:** Check firewall settings and credentials
2. **Images not displaying:** Verify file paths and storage configuration  
3. **Form submission errors:** Check API routes and CORS settings
4. **Build failures:** Verify all dependencies are in package.json

## Cost Estimates

### Free Tier Options:
- **Vercel:** Free for personal projects
- **PlanetScale:** 5GB storage free
- **Railway:** $5/month credit

### Paid Options:
- **Vercel Pro:** $20/month
- **Railway:** ~$10-30/month depending on usage
- **AWS RDS:** ~$15-50/month for small instances
