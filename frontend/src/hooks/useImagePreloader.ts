import { useCallback, useRef } from 'react';
import { Image } from '../types';

export const useImagePreloader = () => {
  const preloadedImages = useRef<Map<string, HTMLImageElement>>(new Map());
  const preloadQueue = useRef<Set<string>>(new Set());

  const preloadImage = useCallback((url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      // Check if already preloaded
      if (preloadedImages.current.has(url)) {
        resolve(preloadedImages.current.get(url)!);
        return;
      }

      // Check if already in queue
      if (preloadQueue.current.has(url)) {
        // Wait for existing preload to complete
        const checkInterval = setInterval(() => {
          if (preloadedImages.current.has(url)) {
            clearInterval(checkInterval);
            resolve(preloadedImages.current.get(url)!);
          }
        }, 100);
        return;
      }

      preloadQueue.current.add(url);

      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        preloadedImages.current.set(url, img);
        preloadQueue.current.delete(url);
        resolve(img);
      };

      img.onerror = () => {
        preloadQueue.current.delete(url);
        reject(new Error(`Failed to preload image: ${url}`));
      };

      img.src = url;
    });
  }, []);

  const preloadImages = useCallback(async (images: Image[]): Promise<void> => {
    const promises = images.map(image => 
      preloadImage(image.url).catch(error => {
        console.warn(`Failed to preload image ${image.id}:`, error);
        return null;
      })
    );

    await Promise.allSettled(promises);
  }, [preloadImage]);

  const getPreloadedImage = useCallback((url: string): HTMLImageElement | null => {
    return preloadedImages.current.get(url) || null;
  }, []);

  const clearCache = useCallback(() => {
    preloadedImages.current.clear();
    preloadQueue.current.clear();
  }, []);

  return {
    preloadImage,
    preloadImages,
    getPreloadedImage,
    clearCache
  };
};
