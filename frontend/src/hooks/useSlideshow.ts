import { useState, useEffect, useCallback, useRef } from 'react';
import { Image } from '../types/index';
import { useImagePreloader } from './useImagePreloader';

interface UseSlideshowOptions {
  images: Image[];
  interval: number;
  autoStart?: boolean;
}

export const useSlideshow = ({ images, interval, autoStart = false }: UseSlideshowOptions) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoStart);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { preloadImage, preloadImages } = useImagePreloader();

  // Preload all images when images change
  useEffect(() => {
    if (images.length > 0) {
      preloadImages(images);
    }
  }, [images, preloadImages]);

  // Preload next image
  const preloadNextImage = useCallback(() => {
    if (images.length > 1) {
      const nextIndex = (currentIndex + 1) % images.length;
      const nextImage = images[nextIndex];
      if (nextImage) {
        preloadImage(nextImage.url).catch(console.warn);
      }
    }
  }, [currentIndex, images, preloadImage]);

  // Preload next image when current index changes
  useEffect(() => {
    preloadNextImage();
  }, [preloadNextImage]);

  const goToNext = useCallback(() => {
    if (images.length === 0) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsTransitioning(false);
    }, 50); // Small delay for smooth transition
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    if (images.length === 0) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsTransitioning(false);
    }, 50);
  }, [images.length]);

  const goToIndex = useCallback((index: number) => {
    if (index < 0 || index >= images.length) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 50);
  }, [images.length]);

  const start = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const stop = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Handle automatic progression
  useEffect(() => {
    if (isPlaying && images.length > 1) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, interval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, interval, goToNext, images.length]);

  // Reset to first image when images change
  useEffect(() => {
    if (images.length > 0 && currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images.length, currentIndex]);

  const currentImage = images[currentIndex] || null;

  return {
    currentImage,
    currentIndex,
    isPlaying,
    isTransitioning,
    start,
    stop,
    toggle,
    goToNext,
    goToPrevious,
    goToIndex,
    hasImages: images.length > 0,
    totalImages: images.length
  };
};
