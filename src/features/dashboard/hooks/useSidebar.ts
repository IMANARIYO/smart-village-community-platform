"use client";

import { useState, useEffect, useCallback } from 'react';

type SidebarState = 'expanded' | 'collapsed' | 'hidden';
type SidebarVariant = 'mobile' | 'desktop';

interface UseSidebarReturn {
  isOpen: boolean;
  state: SidebarState;
  variant: SidebarVariant;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  setSidebarState: (state: SidebarState) => void;
}

export function useSidebar(): UseSidebarReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<SidebarState>('expanded');
  const [variant, setVariant] = useState<SidebarVariant>('desktop');

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      setVariant(isMobile ? 'mobile' : 'desktop');
      
      if (isMobile) {
        setState('expanded'); // Mobile always uses expanded when open
        setIsOpen(false); // Close mobile sidebar by default
      } else {
        // Restore desktop state from localStorage or default to expanded
        const savedState = localStorage.getItem('sidebar-state') as SidebarState;
        setState(savedState || 'expanded');
        setIsOpen(true); // Desktop sidebar is always "open" but state controls visibility
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save desktop sidebar state to localStorage
  useEffect(() => {
    if (variant === 'desktop') {
      localStorage.setItem('sidebar-state', state);
    }
  }, [state, variant]);

  const toggleSidebar = useCallback(() => {
    if (variant === 'mobile') {
      setIsOpen(prev => !prev);
    } else {
      setState(prev => {
        switch (prev) {
          case 'expanded':
            return 'collapsed';
          case 'collapsed':
            return 'expanded';
          case 'hidden':
            return 'expanded';
          default:
            return 'expanded';
        }
      });
    }
  }, [variant]);

  const openSidebar = useCallback(() => {
    if (variant === 'mobile') {
      setIsOpen(true);
    } else {
      setState('expanded');
    }
  }, [variant]);

  const closeSidebar = useCallback(() => {
    if (variant === 'mobile') {
      setIsOpen(false);
    } else {
      setState('collapsed');
    }
  }, [variant]);

  const setSidebarState = useCallback((newState: SidebarState) => {
    setState(newState);
  }, []);

  return {
    isOpen,
    state,
    variant,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    setSidebarState,
  };
}