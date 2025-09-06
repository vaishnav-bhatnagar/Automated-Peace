// Simple mock data for landscape images
const mockImages = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
    thumb_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    source: 'Unsplash',
    title: 'Mountain Lake Reflection',
    photographer: 'John Doe',
    alt_text: 'Beautiful mountain lake with perfect reflection',
    width: 1920,
    height: 1080,
    is_active: true,
    tags: ['mountain', 'lake', 'reflection', 'nature'],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop',
    thumb_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    source: 'Unsplash',
    title: 'Forest Path',
    photographer: 'Jane Smith',
    alt_text: 'Misty forest path through tall trees',
    width: 1920,
    height: 1080,
    is_active: true,
    tags: ['forest', 'path', 'trees', 'mist'],
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop',
    thumb_url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
    source: 'Unsplash',
    title: 'Desert Sunset',
    photographer: 'Mike Johnson',
    alt_text: 'Golden desert landscape at sunset',
    width: 1920,
    height: 1080,
    is_active: true,
    tags: ['desert', 'sunset', 'golden', 'landscape'],
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
    thumb_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    source: 'Unsplash',
    title: 'Ocean Waves',
    photographer: 'Sarah Wilson',
    alt_text: 'Powerful ocean waves crashing on rocks',
    width: 1920,
    height: 1080,
    is_active: true,
    tags: ['ocean', 'waves', 'rocks', 'power'],
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-04T00:00:00Z'
  }
];

// Simple API handler for Vercel serverless functions
module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url } = req;
  
  // Health check endpoint
  if (url === '/health' || url === '/api/health') {
    res.status(200).json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      message: 'Automated Peace API is running'
    });
    return;
  }
  
  // Get all images
  if (url === '/api/images' && req.method === 'GET') {
    res.status(200).json(mockImages);
    return;
  }
  
  // Get random images
  if (url.startsWith('/api/images/random') && req.method === 'GET') {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const count = parseInt(urlParams.get('n')) || 1;
    const shuffled = [...mockImages].sort(() => 0.5 - Math.random());
    const randomImages = shuffled.slice(0, Math.min(count, mockImages.length));
    res.status(200).json(randomImages);
    return;
  }
  
  // Get single image by ID
  if (url.match(/^\/api\/images\/\d+$/) && req.method === 'GET') {
    const id = url.split('/').pop();
    const image = mockImages.find(img => img.id === id);
    if (image) {
      res.status(200).json(image);
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
    return;
  }
  
  // SSE stream endpoint (simplified)
  if (url === '/api/stream/images' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    // Send initial data
    res.write(`data: ${JSON.stringify({ type: 'connected', message: 'Connected to image stream' })}\n\n`);
    
    // Send a random image every 5 seconds (for demo)
    const interval = setInterval(() => {
      const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
      res.write(`data: ${JSON.stringify({ type: 'new_image', data: randomImage })}\n\n`);
    }, 5000);
    
    // Clean up on client disconnect
    req.on('close', () => {
      clearInterval(interval);
    });
    return;
  }
  
  // Default 404 response
  res.status(404).json({ 
    error: 'Not Found', 
    message: 'API endpoint not found',
    availableEndpoints: [
      'GET /health',
      'GET /api/images',
      'GET /api/images/random?n=1',
      'GET /api/images/:id',
      'GET /api/stream/images'
    ]
  });
};
