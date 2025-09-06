import express from 'express';
import { PrismaClient } from '@prisma/client';
import { broadcastImageUpdate } from './stream';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/images - Get all active images
router.get('/', async (req, res) => {
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

// GET /api/images/random?n=1 - Get random images
router.get('/random', async (req, res) => {
  try {
    const n = parseInt(req.query.n as string) || 1;
    const count = await prisma.image.count({ where: { is_active: true } });
    
    if (count === 0) {
      return res.json([]);
    }

    // Get random images using SQL
    const images = await prisma.$queryRaw`
      SELECT * FROM images 
      WHERE is_active = true 
      ORDER BY RANDOM() 
      LIMIT ${n}
    `;
    
    res.json(images);
  } catch (error) {
    console.error('Error fetching random images:', error);
    res.status(500).json({ error: 'Failed to fetch random images' });
  }
});

// GET /api/images/:id - Get single image
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const image = await prisma.image.findUnique({
      where: { id }
    });
    
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    res.json(image);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
});

// POST /api/images - Add new image
router.post('/', async (req, res) => {
  try {
    const {
      url,
      thumb_url,
      source,
      title,
      photographer,
      photographer_profile,
      alt_text,
      width,
      height,
      tags
    } = req.body;

    if (!url || !source) {
      return res.status(400).json({ error: 'URL and source are required' });
    }

    const image = await prisma.image.create({
      data: {
        url,
        thumb_url,
        source,
        title,
        photographer,
        photographer_profile,
        alt_text,
        width,
        height,
        tags: tags || []
      }
    });

    // Broadcast update to SSE clients
    broadcastImageUpdate('created', image);

    res.status(201).json(image);
  } catch (error) {
    console.error('Error creating image:', error);
    res.status(500).json({ error: 'Failed to create image' });
  }
});

// PUT /api/images/:id - Update image
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const image = await prisma.image.update({
      where: { id },
      data: updateData
    });

    // Broadcast update to SSE clients
    broadcastImageUpdate('updated', image);

    res.json(image);
  } catch (error) {
    console.error('Error updating image:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.status(500).json({ error: 'Failed to update image' });
  }
});

// DELETE /api/images/:id - Delete image
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const image = await prisma.image.delete({
      where: { id }
    });

    // Broadcast update to SSE clients
    broadcastImageUpdate('deleted', image);

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

export default router;
