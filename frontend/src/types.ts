export interface Image {
  id: string;
  url: string;
  thumb_url?: string;
  source: string;
  title?: string;
  photographer?: string;
  photographer_profile?: string;
  alt_text?: string;
  width?: number;
  height?: number;
  is_active: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface SSEMessage {
  type: 'connected' | 'heartbeat' | 'image_update';
  action?: 'created' | 'updated' | 'deleted';
  image?: Image;
  message?: string;
  timestamp: string;
}

export interface SlideshowSettings {
  interval: number;
  apiUrl: string;
}
