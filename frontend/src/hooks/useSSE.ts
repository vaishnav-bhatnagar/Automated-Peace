import { useEffect, useRef, useState } from 'react';
import { SSEMessage } from '../types';

interface UseSSEOptions {
  url: string;
  onMessage?: (message: SSEMessage) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
  enabled?: boolean;
}

export const useSSE = ({ url, onMessage, onError, onOpen, enabled = true }: UseSSEOptions) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!enabled || !url) {
      return;
    }

    const connectSSE = () => {
      try {
        const eventSource = new EventSource(url);
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
          setIsConnected(true);
          setError(null);
          onOpen?.();
        };

        eventSource.onmessage = (event) => {
          try {
            const message: SSEMessage = JSON.parse(event.data);
            onMessage?.(message);
          } catch (parseError) {
            console.error('Failed to parse SSE message:', parseError);
          }
        };

        eventSource.onerror = (event) => {
          setIsConnected(false);
          setError('Connection lost');
          onError?.(event);
          
          // Attempt to reconnect after 3 seconds
          setTimeout(() => {
            if (eventSourceRef.current?.readyState === EventSource.CLOSED) {
              connectSSE();
            }
          }, 3000);
        };

      } catch (err) {
        setError('Failed to connect');
        console.error('SSE connection error:', err);
      }
    };

    connectSSE();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      setIsConnected(false);
    };
  }, [url, enabled, onMessage, onError, onOpen]);

  const disconnect = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
    }
  };

  return {
    isConnected,
    error,
    disconnect
  };
};
