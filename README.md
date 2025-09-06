# Automated Peace

A beautiful full-stack HD landscape slideshow application with real-time updates from a backend database. Features smooth crossfade transitions, automatic image preloading, and Server-Sent Events for live updates.

![Automated Peace](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)

## ✨ Features

### Frontend (React + TypeScript + Tailwind CSS)
- 🖼️ **HD Landscape Slideshow** - Displays high-definition landscape images
- ⏱️ **Automatic Transitions** - 10-second intervals with smooth 1-second crossfade
- 🚀 **Performance Optimized** - Image preloading, caching, and lazy loading
- 📡 **Real-time Updates** - SSE connection for live slideshow updates
- 🎛️ **Simple Controls** - Start/Stop buttons and settings modal
- 📱 **Responsive Design** - Works on all screen sizes
- ♿ **Accessibility** - Keyboard navigation and ARIA labels
- 🎨 **Elegant UI** - Glass-style overlays with modern design

### Backend (Node.js + Express + Prisma + PostgreSQL)
- 🗄️ **PostgreSQL Database** - Stores images and metadata
- 🔌 **REST API** - Full CRUD operations for images
- 📡 **Server-Sent Events** - Real-time updates to connected clients
- 🌱 **Seed Script** - Pre-populated with 20+ HD landscape images
- 🐳 **Docker Ready** - Complete containerization setup
- 🔒 **Type Safety** - Full TypeScript implementation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose (recommended)
- PostgreSQL (if running without Docker)

### Option 1: Docker (Recommended)

1. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd automated-peace
   cp .env.example .env
   ```

2. **Start with Docker**
   ```bash
   docker-compose up -d
   ```

3. **Seed the database**
   ```bash
   docker-compose exec backend npm run db:seed
   ```

4. **Open the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Option 2: Local Development

1. **Setup environment**
   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

2. **Start PostgreSQL**
   ```bash
   # Using Docker for just the database
   docker run -d \
     --name automated-peace-db \
     -e POSTGRES_DB=automated_peace \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=password \
     -p 5432:5432 \
     postgres:15-alpine
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm run db:push
   npm run db:seed
   npm run dev
   ```

4. **Setup Frontend** (in new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 🏗️ Project Structure

```
automated-peace/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript definitions
│   │   └── App.tsx         # Main application
│   ├── public/             # Static assets
│   └── Dockerfile          # Frontend container
├── backend/                 # Node.js Express backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── scripts/        # Database scripts
│   │   └── index.ts        # Server entry point
│   ├── prisma/             # Database schema
│   └── Dockerfile          # Backend container
├── docker-compose.yml       # Multi-container setup
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/automated_peace"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:3001
```

### Settings Modal
- **API URL**: Change backend endpoint dynamically
- **Slideshow Interval**: Adjust time between transitions (1-300 seconds)

## 📡 API Endpoints

### Images
- `GET /api/images` - Get all active images
- `GET /api/images/random?n=1` - Get random images
- `GET /api/images/:id` - Get single image
- `POST /api/images` - Add new image
- `PUT /api/images/:id` - Update image
- `DELETE /api/images/:id` - Delete image

### Real-time Updates
- `GET /api/stream/images` - SSE endpoint for live updates

### Health Check
- `GET /health` - Server health status

## 🎮 Controls

### UI Controls
- **Start Button**: Begin automatic slideshow
- **Stop Button**: Pause slideshow
- **Settings Gear**: Open configuration modal

### Keyboard Shortcuts
- `Space`: Play/Pause slideshow
- `←/→`: Navigate images manually
- `Escape`: Stop slideshow or close modal

## 🗄️ Database Schema

```sql
CREATE TABLE images (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url                  TEXT NOT NULL,
  thumb_url            TEXT,
  source               TEXT NOT NULL,
  title                TEXT,
  photographer         TEXT,
  photographer_profile TEXT,
  alt_text             TEXT,
  width                INTEGER,
  height               INTEGER,
  is_active            BOOLEAN DEFAULT true,
  tags                 TEXT[],
  created_at           TIMESTAMP DEFAULT NOW(),
  updated_at           TIMESTAMP DEFAULT NOW()
);
```

## 🔄 Real-time Updates

The application uses Server-Sent Events (SSE) for real-time communication:

- **Automatic Refresh**: Slideshow updates when images are added/removed
- **Connection Status**: Visual indicator shows connection state
- **Heartbeat**: Keeps connection alive with periodic pings
- **Reconnection**: Automatic reconnection on connection loss

## 🛠️ Development

### Available Scripts

**Root Level**
```bash
npm run dev              # Start both frontend and backend
npm run build            # Build both applications
npm run docker:up        # Start with Docker
npm run docker:down      # Stop Docker containers
```

**Backend**
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:seed          # Seed database with images
npm run db:reset         # Reset database
```

**Frontend**
```bash
npm start                # Start development server
npm run build            # Build for production
npm test                 # Run tests
```

### Adding Images

**Via API**
```bash
curl -X POST http://localhost:3001/api/images \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/image.jpg",
    "source": "Example",
    "title": "Beautiful Landscape",
    "photographer": "John Doe",
    "tags": ["landscape", "nature"]
  }'
```

**Via Seed Script**
Edit `backend/src/scripts/seed.ts` and run:
```bash
npm run db:seed
```

## 🐳 Docker Deployment

### Production Build
```bash
# Build images
docker-compose build

# Start in production mode
docker-compose -f docker-compose.yml up -d

# View logs
docker-compose logs -f
```

### Health Checks
Both containers include health checks:
- Backend: `GET /health`
- Frontend: HTTP 200 response
- Database: `pg_isready`

## 🔍 Troubleshooting

### Common Issues

**Connection Refused**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env files
- Verify Docker containers are healthy

**Images Not Loading**
- Check CORS settings in backend
- Verify image URLs are accessible
- Check browser console for errors

**SSE Connection Failed**
- Ensure backend is running
- Check API URL in frontend settings
- Verify firewall/proxy settings

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Docker cache
docker system prune -a
```

### Logs
```bash
# Docker logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres

# Application logs
tail -f backend/logs/app.log
```

## 🚀 Production Deployment

### Environment Setup
1. Set production environment variables
2. Use strong database passwords
3. Configure HTTPS/SSL
4. Set up reverse proxy (nginx)
5. Configure domain and DNS

### Performance Optimization
- Enable gzip compression
- Set up CDN for images
- Configure database connection pooling
- Implement image optimization
- Set up monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Images sourced from [Unsplash](https://unsplash.com) - Free high-resolution photos
- Built with modern web technologies and best practices
- Designed for peace and tranquility through beautiful landscapes

---

**Automated Peace** - Find your moment of zen with beautiful, ever-changing landscapes. 🌅
