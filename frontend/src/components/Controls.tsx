import React from 'react';

interface ControlsProps {
  isPlaying: boolean;
  onStart: () => void;
  onStop: () => void;
  onSettingsClick: () => void;
  hasImages: boolean;
  className?: string;
}

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onStart,
  onStop,
  onSettingsClick,
  hasImages,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Play/Stop Button */}
      <button
        onClick={isPlaying ? onStop : onStart}
        disabled={!hasImages}
        className="glass-button px-6 py-3 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        aria-label={isPlaying ? 'Stop slideshow' : 'Start slideshow'}
      >
        {isPlaying ? (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Stop
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Start
          </>
        )}
      </button>

      {/* Settings Button */}
      <button
        onClick={onSettingsClick}
        className="glass-button p-3 text-white hover:text-white/80 transition-colors"
        aria-label="Open settings"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>
  );
};
