"use client";

import React from 'react';
import { useSidebar } from '../hooks/useSidebar';
import ModernSidebar from './ModernSidebar';
import Header from './DashBoardHeader';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const {
    isOpen,
    state,
    variant,
    toggleSidebar,
    openSidebar,
    closeSidebar,
  } = useSidebar();

  const getContentMargin = () => {
    if (variant === 'mobile') return '';
    
    switch (state) {
      case 'expanded': return 'lg:ml-64';
      case 'collapsed': return 'lg:ml-16';
      case 'hidden': return 'lg:ml-0';
      default: return 'lg:ml-64';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <ModernSidebar
        isOpen={isOpen}
        onClose={closeSidebar}
        variant={variant}
        state={state}
      />

      {/* Header */}
      <Header
        onToggleSidebar={toggleSidebar}
        onOpenMobileSidebar={openSidebar}
        sidebarState={state}
        isMobile={variant === 'mobile'}
      />

      {/* Main Content */}
      <main className={`transition-all duration-300 ease-in-out ${getContentMargin()}`}>
        <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 bg-background">
          <div className="max-w-full mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile overlay when sidebar is open */}
      {variant === 'mobile' && isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
}