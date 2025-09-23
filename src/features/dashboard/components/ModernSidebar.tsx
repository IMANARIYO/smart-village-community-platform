"use client";

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  X,
  ChevronDown,
  LogOut,
  User,
  Settings,

} from 'lucide-react';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { sidebarEntries, type NavigationItem, type SidebarEntry } from '../utils/sideBarLinks';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  variant: 'mobile' | 'desktop';
  state: 'expanded' | 'collapsed' | 'hidden';
  entries?: SidebarEntry[];
}

const isNavigationItem = (entry: SidebarEntry): entry is NavigationItem => {
  return entry.type === "item" || 'href' in entry;
};

const ModernSidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  variant,
  state,
  entries = sidebarEntries
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const handleNavigation = (path: string) => {
    navigate(path);
    if (variant === 'mobile') onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    toast.success('Logged out successfully');
    navigate('/auth/login');
    if (variant === 'mobile') onClose();
  };

  const toggleGroup = (name: string) => {
    setExpandedGroups(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const isActive = (path: string) => location.pathname === path;

  const renderItem = (item: SidebarEntry, level = 0) => {
    if ('items' in item && item.type === 'group') {
      const activeInGroup = item.items.some(i => isActive(i.href));
      const expanded = expandedGroups[item.name] ?? activeInGroup;

      const groupButton = (
        <button
          onClick={() => toggleGroup(item.name)}
          className={`group w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 text-left relative overflow-hidden active:scale-95 ${variant === 'mobile' ? 'min-h-[48px]' : 'py-2.5'
            } ${activeInGroup
              ? 'bg-gradient-to-r from-primary-normal to-primary-dark text-white shadow-lg'
              : 'text-neutral-normal hover:bg-primary-light hover:text-primary-dark'
            }`}
        >
          <div className="flex items-center space-x-3 z-10 min-w-0 flex-1">
            <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${activeInGroup ? 'text-white' : 'text-primary-normal'
              }`} />
            {(state === 'expanded' || variant === 'mobile') && (
              <span className={`font-medium truncate ${variant === 'mobile' ? 'text-base' : 'text-sm'
                }`}>{item.name}</span>
            )}
          </div>
          {(state === 'expanded' || variant === 'mobile') && (
            <div className={`transition-transform duration-200 flex-shrink-0 ${expanded ? 'rotate-180' : 'rotate-0'
              }`}>
              <ChevronDown className="w-4 h-4" />
            </div>
          )}
          {activeInGroup && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
          )}
        </button>
      );

      if (state === 'collapsed' && variant === 'desktop') {
        return (
          <li key={item.name} className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`w-full flex items-center justify-center p-3 rounded-xl transition-all duration-200 group ${activeInGroup
                    ? 'bg-primary-normal text-white shadow-lg'
                    : 'text-neutral-normal hover:bg-primary-light hover:text-primary-dark'
                  }`}>
                  <item.icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start" className="w-48 bg-card border-border">
                {item.items.map((subItem) => (
                  <DropdownMenuItem
                    key={subItem.href}
                    onClick={() => handleNavigation(subItem.href)}
                    className={`cursor-pointer transition-colors ${isActive(subItem.href)
                        ? 'bg-primary-light text-primary-dark'
                        : 'hover:bg-primary-light'
                      }`}
                  >
                    {subItem.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        );
      }

      return (
        <li key={item.name} className="space-y-1">
          {state === 'collapsed' && variant === 'desktop' ? (
            <Tooltip>
              <TooltipTrigger asChild>{groupButton}</TooltipTrigger>
              <TooltipContent side="right" sideOffset={10} className="bg-neutral-normal text-white">
                <p className="font-medium">{item.name}</p>
                <p className="text-xs opacity-75 mt-1">
                  {item.items.length} item{item.items.length !== 1 ? 's' : ''}
                </p>
              </TooltipContent>
            </Tooltip>
          ) : (
            groupButton
          )}

          {expanded && (state === 'expanded' || variant === 'mobile') && (
            <ul className={`mt-2 space-y-1 ${variant === 'mobile'
                ? 'pl-4 border-l-2 border-primary-light ml-4'
                : 'pl-6 border-l-2 border-primary-light ml-2'
              }`}>
              {item.items.map(child => renderItem(child, level + 1))}
            </ul>
          )}
        </li>
      );
    }

    const itemButton = (
      <button
        onClick={() => 'href' in item && handleNavigation(item.href)}
        className={`group w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 text-left relative overflow-hidden active:scale-95 ${variant === 'mobile' ? 'min-h-[48px]' : 'py-2.5'
          } ${'href' in item && isActive(item.href)
            ? 'bg-gradient-to-r from-primary-normal to-primary-dark text-white shadow-lg'
            : 'text-neutral-normal hover:bg-primary-light hover:text-primary-dark'
          }`}
      >
        {'icon' in item && (
          <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${'href' in item && isActive(item.href) ? 'text-white' : 'text-primary-normal'
            }`} />
        )}
        {(state === 'expanded' || variant === 'mobile') && 'name' in item && (
          <span className={`font-medium truncate ${variant === 'mobile' ? 'text-base' : 'text-sm'
            }`}>{item.name}</span>
        )}
        {'href' in item && isActive(item.href) && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
        )}
      </button>
    );

    return (
      <li key={isNavigationItem(item) ? item.href : ""}>
        {state === 'collapsed' && variant === 'desktop' && isNavigationItem(item) ? (
          <Tooltip>
            <TooltipTrigger asChild>{itemButton}</TooltipTrigger>
            <TooltipContent side="right" sideOffset={10} className="bg-neutral-normal text-white">
              <p className="font-medium">{item.name}</p>
              {isActive(item.href) && (
                <p className="text-xs opacity-75 mt-1">Currently active</p>
              )}
            </TooltipContent>
          </Tooltip>
        ) : (
          itemButton
        )}
      </li>
    );
  };

  const UserProfile = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = user?.name || user?.first_name || 'User';
    const userEmail = user?.email || 'user@smartvillage.com';

    return (
      <div className="p-3 border-t border-border bg-gradient-to-r from-background-light to-primary-light/20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center space-x-3 p-2 rounded-xl hover:bg-primary-light transition-all duration-200 group">
              <Avatar className="h-8 w-8 ring-2 ring-primary-normal ring-offset-2">
                <AvatarFallback className="bg-primary-normal text-white font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {(state === 'expanded' || variant === 'mobile') && (
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-neutral-normal group-hover:text-primary-dark">
                    {userName}
                  </p>
                  <p className="text-xs text-neutral-normal/70 truncate">
                    {userEmail}
                  </p>
                </div>
              )}
              {(state === 'expanded' || variant === 'mobile') && (
                <Settings className="w-4 h-4 text-neutral-normal group-hover:text-primary-dark transition-colors" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card border-border">
            <DropdownMenuItem className="cursor-pointer hover:bg-primary-light">
              <User className="w-4 h-4 mr-2 text-primary-normal" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-primary-light">
              <Settings className="w-4 h-4 mr-2 text-primary-normal" />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-error-normal hover:bg-error-light hover:text-error-dark"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  // Mobile Sidebar
  if (variant === 'mobile') {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
            onClick={onClose}
          />
        )}

        <aside className={`fixed left-0 top-0 h-full w-full max-w-sm bg-card shadow-2xl transform transition-all duration-300 ease-out z-50 lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } flex flex-col`}>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-normal to-primary-dark text-white shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Home className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-bold truncate">Smart Village</h2>
                <p className="text-xs opacity-90 truncate">Community Platform</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/20 transition-all duration-200 active:scale-95"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <TooltipProvider>
              <ul className="space-y-1">
                {entries.map(entry => renderItem(entry))}
              </ul>
            </TooltipProvider>
          </nav>

          <div className="border-t border-border bg-gradient-to-r from-background-light to-primary-light/10">
            <UserProfile />
          </div>

          <div className="h-safe-area-inset-bottom bg-gradient-to-r from-background-light to-primary-light/10" />
        </aside>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <aside className={`fixed left-0 top-0 h-full bg-card border-r border-border shadow-lg transition-all duration-300 z-30 ${state === 'expanded' ? 'w-64' : state === 'collapsed' ? 'w-16' : 'w-0'
      }`}>
      <div className="flex flex-col h-full">
        <div className={`p-4 border-b border-border bg-gradient-to-r from-primary-normal to-primary-dark text-white ${state === 'collapsed' ? 'px-2' : ''
          }`}>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Home className="w-6 h-6" />
            </div>
            {state === 'expanded' && (
              <div>
                <h2 className="text-lg font-bold">Smart Village</h2>
                <p className="text-xs opacity-90">Community Platform</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <TooltipProvider>
            <ul className={`space-y-2 ${state === 'expanded' ? 'px-3' : 'px-2'}`}>
              {entries.map(entry => renderItem(entry))}
            </ul>
          </TooltipProvider>
        </nav>

        <UserProfile />
      </div>
    </aside>
  );
};

export default ModernSidebar;