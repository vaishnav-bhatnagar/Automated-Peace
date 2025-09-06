# Quick Start Guide - Automated Peace

## 🚀 Fastest Way to Run

### Option 1: Docker (Recommended)
```bash
# 1. Copy environment file
copy .env.example .env

# 2. Start everything
docker-compose up -d

# 3. Seed the database
docker-compose exec backend npm run db:seed

# 4. Open http://localhost:3000
```

### Option 2: Windows Batch Files
```bash
# 1. Run setup (installs dependencies)
setup.bat

# 2. Start application
start.bat
```

## 🔧 Manual Setup (if batch files don't work)

### Prerequisites
- Node.js 18+
- PostgreSQL 15+ (or Docker)

### Steps
1. **Setup Environment**
   ```bash
   copy .env.example .env
   copy backend\.env.example backend\.env
   copy frontend\.env.example frontend\.env
   ```

2. **Start Database**
   ```bash
   docker run -d --name automated-peace-db -e POSTGRES_DB=automated_peace -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -p 5432:5432 postgres:15-alpine
   ```

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   npx prisma db push
   npm run db:seed
   npm run dev
   ```

4. **Frontend Setup** (new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 🎯 What You'll See

- **Frontend**: http://localhost:3000 - Beautiful HD landscape slideshow
- **Backend**: http://localhost:3001 - API endpoints
- **Database**: PostgreSQL with 20+ seeded landscape images

## 🎮 How to Use

1. **Start Slideshow**: Click the "Start" button
2. **Settings**: Click the gear icon to change API URL or interval
3. **Keyboard Controls**: 
   - Space: Play/Pause
   - ←/→: Navigate images
   - Esc: Stop

## 🔍 Troubleshooting

**PowerShell Execution Policy Error**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Port Already in Use**
- Change ports in docker-compose.yml or .env files

**Database Connection Error**
- Ensure PostgreSQL is running
- Check DATABASE_URL in backend/.env

## 📱 Features Working

✅ HD Landscape slideshow with smooth crossfade  
✅ 10-second automatic transitions  
✅ Image preloading for performance  
✅ Real-time updates via Server-Sent Events  
✅ Settings modal for API URL and interval  
✅ Responsive design with glass-style UI  
✅ Keyboard navigation and accessibility  
✅ Docker containerization  
✅ 20+ pre-seeded HD landscape images  

Enjoy your moment of automated peace! 🌅
