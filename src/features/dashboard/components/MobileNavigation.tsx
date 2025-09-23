"use client";

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Users, Calendar, Phone, Bell } from 'lucide-react';

interface MobileNavigationProps {
  className?: string;
}

const quickNavItems = [
  { icon: Home, label: 'Overview', href: '/dashboard/overview' },
  { icon: Users, label: 'Residents', href: '/dashboard/residents' },
  { icon: Calendar, label: 'Events', href: '/dashboard/events' },
  { icon: Phone, label: 'Contacts', href: '/dashboard/contacts' },
  { icon: Bell, label: 'Alerts', href: '/dashboard/emergency' },
];

export function MobileNavigation({ className = '' }: MobileNavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 lg:hidden ${className}`}>
      <div className="flex items-center justify-around py-2 px-1">
        {quickNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 active:scale-95 min-w-0 flex-1 ${
                active
                  ? 'text-primary bg-primary-light'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary-light/50'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 transition-transform duration-200 ${
                active ? 'scale-110' : 'group-hover:scale-105'
              }`} />
              <span className="text-xs font-medium truncate max-w-full">
                {item.label}
              </span>
              {active && (
                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-card" />
    </nav>
  );
}