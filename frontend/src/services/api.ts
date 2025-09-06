import { Image } from '../types';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.REACT_APP_API_URL || 'http://localhost:3001') {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  setBaseUrl(url: string) {
    this.baseUrl = url.replace(/\/$/, '');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Get all active images
  async getImages(): Promise<Image[]> {
    return this.request<Image[]>('/api/images');
  }

  // Get random images
  async getRandomImages(count: number = 1): Promise<Image[]> {
    return this.request<Image[]>(`/api/images/random?n=${count}`);
  }

  // Get single image
  async getImage(id: string): Promise<Image> {
    return this.request<Image>(`/api/images/${id}`);
  }

  // Add new image
  async createImage(imageData: Partial<Image>): Promise<Image> {
    return this.request<Image>('/api/images', {
      method: 'POST',
      body: JSON.stringify(imageData),
    });
  }

  // Update image
  async updateImage(id: string, imageData: Partial<Image>): Promise<Image> {
    return this.request<Image>(`/api/images/${id}`, {
      method: 'PUT',
      body: JSON.stringify(imageData),
    });
  }

  // Delete image
  async deleteImage(id: string): Promise<void> {
    await this.request(`/api/images/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request('/health');
  }

  // Get SSE stream URL
  getStreamUrl(): string {
    return `${this.baseUrl}/api/stream/images`;
  }
}

export const apiService = new ApiService();
export default apiService;
