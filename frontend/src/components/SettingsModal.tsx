import React, { useState, useEffect } from 'react';
import { SlideshowSettings } from '../types/index';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SlideshowSettings;
  onSave: (settings: SlideshowSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave
}) => {
  const [formData, setFormData] = useState<SlideshowSettings>(settings);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.apiUrl.trim()) {
      newErrors.apiUrl = 'API URL is required';
    } else {
      try {
        new URL(formData.apiUrl);
      } catch {
        newErrors.apiUrl = 'Please enter a valid URL';
      }
    }

    if (formData.interval < 1000) {
      newErrors.interval = 'Interval must be at least 1 second (1000ms)';
    } else if (formData.interval > 300000) {
      newErrors.interval = 'Interval must be less than 5 minutes (300000ms)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleReset = () => {
    setFormData({
      apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
      interval: 10000
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-panel p-6 w-full max-w-md animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close settings"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* API URL */}
          <div>
            <label htmlFor="apiUrl" className="block text-sm font-medium text-white/90 mb-2">
              Backend API URL
            </label>
            <input
              type="url"
              id="apiUrl"
              value={formData.apiUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, apiUrl: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
              placeholder="http://localhost:3001"
            />
            {errors.apiUrl && (
              <p className="mt-1 text-sm text-red-300">{errors.apiUrl}</p>
            )}
          </div>

          {/* Slideshow Interval */}
          <div>
            <label htmlFor="interval" className="block text-sm font-medium text-white/90 mb-2">
              Slideshow Interval (seconds)
            </label>
            <input
              type="number"
              id="interval"
              min="1"
              max="300"
              step="1"
              value={formData.interval / 1000}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                interval: Math.max(1000, parseInt(e.target.value) * 1000) 
              }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
            />
            {errors.interval && (
              <p className="mt-1 text-sm text-red-300">{errors.interval}</p>
            )}
            <p className="mt-1 text-xs text-white/60">
              Time between image transitions (1-300 seconds)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg text-white font-medium transition-colors"
            >
              Save
            </button>
          </div>
        </form>

        {/* Connection Status */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Real-time updates enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};
