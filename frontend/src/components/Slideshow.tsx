import React, { useState, useEffect } from 'react';
import { Image } from '../types';

interface SlideshowProps {
  images: Image[];
  currentIndex: number;
  isTransitioning: boolean;
  className?: string;
}

export const Slideshow: React.FC<SlideshowProps> = ({
  images,
  currentIndex,
  isTransitioning,
  className = ''
}) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const currentImage = images[currentIndex];
  const nextIndex = (currentIndex + 1) % images.length;
  const nextImage = images[nextIndex];

  // Handle image load success
  const handleImageLoad = (imageId: string) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
    setImageErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(imageId);
      return newSet;
    });
  };

  // Handle image load error
  const handleImageError = (imageId: string) => {
    setImageErrors(prev => new Set([...prev, imageId]));
    console.warn(`Failed to load image: ${imageId}`);
  };

  // Preload next image
  useEffect(() => {
    if (nextImage && !loadedImages.has(nextImage.id) && !imageErrors.has(nextImage.id)) {
      const img = new Image();
      img.onload = () => handleImageLoad(nextImage.id);
      img.onerror = () => handleImageError(nextImage.id);
      img.src = nextImage.url;
    }
  }, [nextImage, loadedImages, imageErrors]);

  if (!currentImage) {
    return (
      <div className={`relative w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white/70">
            <div className="text-6xl mb-4">🖼️</div>
            <h2 className="text-2xl font-light mb-2">No Images Available</h2>
            <p className="text-lg opacity-75">
              Add some beautiful landscape images to get started
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Current Image */}
      <img
        key={`current-${currentImage.id}`}
        src={currentImage.url}
        alt={currentImage.alt_text || currentImage.title || 'Landscape image'}
        className={`slideshow-image ${isTransitioning ? 'fade-out' : 'fade-in'}`}
        onLoad={() => handleImageLoad(currentImage.id)}
        onError={() => handleImageError(currentImage.id)}
        loading="eager"
      />

      {/* Preload next image (hidden) */}
      {nextImage && nextImage.id !== currentImage.id && (
        <img
          key={`next-${nextImage.id}`}
          src={nextImage.url}
          alt={nextImage.alt_text || nextImage.title || 'Next landscape image'}
          className="slideshow-image opacity-0 pointer-events-none"
          onLoad={() => handleImageLoad(nextImage.id)}
          onError={() => handleImageError(nextImage.id)}
          loading="lazy"
        />
      )}

      {/* Loading overlay for current image */}
      {!loadedImages.has(currentImage.id) && !imageErrors.has(currentImage.id) && (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
          <div className="text-white/70 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-white/30 border-t-white/70 rounded-full mx-auto mb-4"></div>
            <p className="text-lg">Loading image...</p>
          </div>
        </div>
      )}

      {/* Error overlay for current image */}
      {imageErrors.has(currentImage.id) && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 to-slate-900/50 flex items-center justify-center">
          <div className="text-white/70 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-lg">Failed to load image</p>
            <p className="text-sm opacity-75 mt-2">
              {currentImage.title || 'Unknown image'}
            </p>
          </div>
        </div>
      )}

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
};
