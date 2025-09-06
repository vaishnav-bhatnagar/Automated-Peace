import React from 'react';
import { Image } from '../types';

interface ImageCreditProps {
  image: Image | null;
  className?: string;
}

export const ImageCredit: React.FC<ImageCreditProps> = ({ image, className = '' }) => {
  if (!image || (!image.photographer && !image.source)) {
    return null;
  }

  return (
    <div className={`glass-panel px-4 py-2 ${className}`}>
      <div className="text-white/90 text-sm">
        {image.photographer && (
          <div className="flex items-center gap-2">
            <span className="text-white/70">Photo by</span>
            {image.photographer_profile ? (
              <a
                href={image.photographer_profile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 font-medium underline decoration-white/30 hover:decoration-white/60 transition-colors"
              >
                {image.photographer}
              </a>
            ) : (
              <span className="text-white font-medium">{image.photographer}</span>
            )}
          </div>
        )}
        {image.source && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-white/70">on</span>
            <span className="text-white/90 font-medium">{image.source}</span>
          </div>
        )}
        {image.title && (
          <div className="text-white/80 text-xs mt-1 italic">
            "{image.title}"
          </div>
        )}
      </div>
    </div>
  );
};
