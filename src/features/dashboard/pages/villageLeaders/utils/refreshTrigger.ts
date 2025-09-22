import { useRef, useEffect } from 'react';

/**
 * Utility function to trigger data refresh via URL parameter
 * @param triggerKey - The URL parameter key to use for triggering refresh
 */
export function triggerRefresh(triggerKey: string = 'leaderTrigger') {
  try {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set(triggerKey, Date.now().toString());
    window.history.replaceState({}, '', currentUrl.toString());
    
    // Clean up the parameter after a short delay
    setTimeout(() => {
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete(triggerKey);
      window.history.replaceState({}, '', cleanUrl.toString());
    }, 100);
  } catch (error) {
    console.error('Failed to trigger refresh:', error);
  }
}

/**
 * Hook to listen for URL-based refresh triggers
 * @param triggerKey - The URL parameter key to listen for
 * @param callback - Function to call when trigger is detected
 */
export function useRefreshTrigger(triggerKey: string, callback: () => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  
  useEffect(() => {
    const checkUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has(triggerKey)) {
        callbackRef.current();
      }
    };

    checkUrlParams();
    
    const handlePopState = () => checkUrlParams();
    window.addEventListener('popstate', handlePopState);
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, [triggerKey]);
}