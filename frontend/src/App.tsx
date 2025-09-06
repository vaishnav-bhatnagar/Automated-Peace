import React, { useState, useEffect, useCallback } from 'react';
import { Slideshow } from './components/Slideshow';
import { Controls } from './components/Controls';
import { SettingsModal } from './components/SettingsModal';
import { ImageCredit } from './components/ImageCredit';
import { useSlideshow } from './hooks/useSlideshow';
import { useSSE } from './hooks/useSSE';
import { apiService } from './services/api';
import { Image, SlideshowSettings, SSEMessage } from './types';

const DEFAULT_SETTINGS: SlideshowSettings = {
  interval: 10000, // 10 seconds
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001'
};

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<SlideshowSettings>(DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');

  // Initialize slideshow
  const slideshow = useSlideshow({
    images,
    interval: settings.interval,
    autoStart: false
  });

  // Load images from API
  const loadImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedImages = await apiService.getImages();
      setImages(fetchedImages);
      
      if (fetchedImages.length === 0) {
        setError('No images available. Please add some images to the backend database.');
      }
    } catch (err) {
      console.error('Failed to load images:', err);
      setError('Failed to connect to the backend. Please check your API URL in settings.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle SSE messages
  const handleSSEMessage = useCallback((message: SSEMessage) => {
    console.log('SSE message received:', message);
    
    switch (message.type) {
      case 'connected':
        setConnectionStatus('connected');
        break;
        
      case 'image_update':
        if (message.action && message.image) {
          switch (message.action) {
            case 'created':
              setImages(prev => [message.image!, ...prev]);
              break;
              
            case 'updated':
              setImages(prev => prev.map(img => 
                img.id === message.image!.id ? message.image! : img
              ));
              break;
              
            case 'deleted':
              setImages(prev => prev.filter(img => img.id !== message.image!.id));
              break;
          }
        }
        break;
        
      case 'heartbeat':
        // Keep connection alive
        break;
    }
  }, []);

  // Handle SSE connection events
  const handleSSEOpen = useCallback(() => {
    setConnectionStatus('connected');
  }, []);

  const handleSSEError = useCallback(() => {
    setConnectionStatus('disconnected');
  }, []);

  // Set up SSE connection
  const { isConnected } = useSSE({
    url: `${settings.apiUrl}/api/stream/images`,
    onMessage: handleSSEMessage,
    onOpen: handleSSEOpen,
    onError: handleSSEError,
    enabled: !loading && !error
  });

  // Update connection status based on SSE state
  useEffect(() => {
    if (isConnected) {
      setConnectionStatus('connected');
    } else if (!loading && !error) {
      setConnectionStatus('disconnected');
    }
  }, [isConnected, loading, error]);

  // Load images on mount and when settings change
  useEffect(() => {
    apiService.setBaseUrl(settings.apiUrl);
    loadImages();
  }, [loadImages, settings.apiUrl]);

  // Handle settings save
  const handleSettingsSave = useCallback((newSettings: SlideshowSettings) => {
    setSettings(newSettings);
    apiService.setBaseUrl(newSettings.apiUrl);
    
    // Reload images with new API URL
    loadImages();
  }, [loadImages]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Space':
          event.preventDefault();
          slideshow.toggle();
          break;
        case 'ArrowRight':
          event.preventDefault();
          slideshow.goToNext();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          slideshow.goToPrevious();
          break;
        case 'Escape':
          if (showSettings) {
            setShowSettings(false);
          } else {
            slideshow.stop();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [slideshow, showSettings]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-900">
      {/* Main Slideshow */}
      <Slideshow
        images={images}
        currentIndex={slideshow.currentIndex}
        isTransitioning={slideshow.isTransitioning}
        className="absolute inset-0"
      />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between">
          {/* Title */}
          <div className="glass-panel px-6 py-3">
            <h1 className="text-2xl font-light text-white tracking-wide">
              Automated Peace
            </h1>
          </div>

          {/* Connection Status & Controls */}
          <div className="flex items-center gap-4">
            {/* Connection Indicator */}
            <div className="glass-panel px-3 py-2 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-400 animate-pulse' :
                connectionStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' :
                'bg-red-400'
              }`} />
              <span className="text-white/80 text-sm capitalize">
                {connectionStatus}
              </span>
            </div>

            {/* Main Controls */}
            <Controls
              isPlaying={slideshow.isPlaying}
              onStart={slideshow.start}
              onStop={slideshow.stop}
              onSettingsClick={() => setShowSettings(true)}
              hasImages={slideshow.hasImages}
            />
          </div>
        </div>
      </header>

      {/* Image Credit */}
      {slideshow.currentImage && (
        <ImageCredit
          image={slideshow.currentImage}
          className="absolute bottom-6 left-6 z-10"
        />
      )}

      {/* Status Messages */}
      {loading && (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <div className="animate-spin w-12 h-12 border-2 border-white/30 border-t-white/70 rounded-full mx-auto mb-4"></div>
            <h2 className="text-xl font-light mb-2">Loading Images...</h2>
            <p className="text-white/70">Connecting to backend</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-slate-900 flex items-center justify-center z-20">
          <div className="glass-panel p-8 text-center max-w-md">
            <div className="text-red-400 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-white mb-4">Connection Error</h2>
            <p className="text-white/80 mb-6">{error}</p>
            <div className="flex gap-3">
              <button
                onClick={loadImages}
                className="flex-1 glass-button px-4 py-2 text-white font-medium"
              >
                Retry
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="flex-1 glass-button px-4 py-2 text-white font-medium"
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slideshow Info */}
      {slideshow.hasImages && !loading && !error && (
        <div className="absolute bottom-6 right-6 z-10">
          <div className="glass-panel px-4 py-2 text-white/80 text-sm">
            <div className="flex items-center gap-4">
              <span>
                {slideshow.currentIndex + 1} / {slideshow.totalImages}
              </span>
              {slideshow.isPlaying && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Playing</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSave={handleSettingsSave}
      />

      {/* Keyboard Shortcuts Help */}
      <div className="absolute top-6 right-6 z-10">
        <div className="glass-panel px-3 py-2 text-white/60 text-xs">
          <div className="space-y-1">
            <div>Space: Play/Pause</div>
            <div>←/→: Navigate</div>
            <div>Esc: Stop</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
