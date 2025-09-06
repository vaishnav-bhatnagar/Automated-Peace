import express from 'express';
import { Image } from '@prisma/client';

const router = express.Router();

// Store active SSE connections
const sseClients = new Set<express.Response>();

// SSE endpoint for real-time image updates
router.get('/images', (req, res) => {
  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  });

  // Add client to active connections
  sseClients.add(res);

  // Send initial connection message
  res.write(`data: ${JSON.stringify({ type: 'connected', message: 'SSE connection established' })}\n\n`);

  // Handle client disconnect
  req.on('close', () => {
    sseClients.delete(res);
  });

  req.on('aborted', () => {
    sseClients.delete(res);
  });

  // Keep connection alive with periodic heartbeat
  const heartbeat = setInterval(() => {
    if (sseClients.has(res)) {
      res.write(`data: ${JSON.stringify({ type: 'heartbeat', timestamp: new Date().toISOString() })}\n\n`);
    } else {
      clearInterval(heartbeat);
    }
  }, 30000); // Send heartbeat every 30 seconds
});

// Function to broadcast updates to all connected clients
export function broadcastImageUpdate(action: 'created' | 'updated' | 'deleted', image: Image) {
  const message = JSON.stringify({
    type: 'image_update',
    action,
    image,
    timestamp: new Date().toISOString()
  });

  // Send to all connected clients
  sseClients.forEach((client) => {
    try {
      client.write(`data: ${message}\n\n`);
    } catch (error) {
      console.error('Error sending SSE message:', error);
      sseClients.delete(client);
    }
  });

  console.log(`📡 Broadcasted ${action} update for image ${image.id} to ${sseClients.size} clients`);
}

// Function to get active client count (for debugging)
export function getActiveClientCount(): number {
  return sseClients.size;
}

export default router;
