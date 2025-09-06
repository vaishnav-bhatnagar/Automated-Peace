# Deployment Guide for Automated Peace

## 🚀 Vercel Deployment (Frontend + Backend)

### Frontend Deployment
1. **Deploy Frontend to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository: `vaishnav-bhatnagar/Automated-Peace`
   - **Root Directory**: `frontend`
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - Deploy

2. **Environment Variables for Frontend**:
   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app
   ```

### Backend Deployment
1. **Deploy Backend Separately**:
   - Create new Vercel project
   - Import same GitHub repository
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `dist`

2. **Environment Variables for Backend**:
   ```
   DATABASE_URL=your_postgresql_connection_string
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

### Database Setup
Use a cloud PostgreSQL service:
- **Neon** (Free): https://neon.tech
- **Supabase** (Free): https://supabase.com
- **Railway** (Free tier): https://railway.app

## 🐳 Alternative: Railway Deployment

1. **Deploy to Railway**:
   - Go to [Railway](https://railway.app)
   - Connect GitHub repository
   - Railway will auto-detect and deploy both services
   - Add PostgreSQL service from Railway's marketplace

2. **Environment Variables**:
   Railway will auto-generate DATABASE_URL for PostgreSQL

## 🔧 Deployment Fixes Applied

✅ **TypeScript as Production Dependency**: Moved `typescript` and `prisma` to dependencies
✅ **Vercel Configuration**: Added `vercel.json` files for proper routing
✅ **Build Scripts**: Added `vercel-build` script with Prisma generation
✅ **Environment Setup**: Created production environment files

## 📝 Post-Deployment Steps

1. **Seed Database**:
   ```bash
   # After backend deployment, run seed script
   npm run db:seed
   ```

2. **Update Frontend API URL**:
   - Update `REACT_APP_API_URL` in frontend environment variables
   - Point to your deployed backend URL

3. **Test Application**:
   - Verify slideshow loads images
   - Test real-time updates (SSE)
   - Check settings modal functionality

## 🔍 Troubleshooting

**Build Errors**:
- Ensure TypeScript is in dependencies, not devDependencies
- Check all environment variables are set
- Verify database connection string

**Runtime Errors**:
- Check CORS settings in backend
- Verify API URL in frontend settings
- Ensure database is accessible

**Database Issues**:
- Run `prisma generate` before build
- Check DATABASE_URL format
- Ensure database allows external connections
