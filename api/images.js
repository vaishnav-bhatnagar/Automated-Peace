// Mock data for landscape images
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
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop',
    thumb_url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop',
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

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json(mockImages);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
