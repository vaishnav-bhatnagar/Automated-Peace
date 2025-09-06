const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://automated-peace-git-main-vaishnav-bhatnagars-projects.vercel.app',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Basic images endpoint
app.get('/api/images', async (req, res) => {
  try {
    const images = await prisma.image.findMany({
      where: { is_active: true },
      orderBy: { created_at: 'desc' }
    });
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Random images endpoint
app.get('/api/images/random', async (req, res) => {
  try {
    const count = parseInt(req.query.n) || 1;
    const images = await prisma.image.findMany({
      where: { is_active: true },
      take: count,
      orderBy: { created_at: 'desc' }
    });
    res.json(images);
  } catch (error) {
    console.error('Error fetching random images:', error);
    res.status(500).json({ error: 'Failed to fetch random images' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
