"use client";


import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarToggleProps {
  isOpen: boolean;
  state: 'expanded' | 'collapsed' | 'hidden';
  variant: 'mobile' | 'desktop';
  onToggle: () => void;
  className?: string;
}

export function SidebarToggle({
  isOpen,
  state,
  variant,
  onToggle,
  className = ''
}: SidebarToggleProps) {
  const getIcon = () => {
    if (variant === 'mobile') {
      return isOpen ? X : Menu;
    }

    switch (state) {
      case 'expanded':
        return ChevronLeft;
      case 'collapsed':
        return ChevronRight;
      case 'hidden':
        return Menu;
      default:
        return Menu;
    }
  };

  const getTooltipText = () => {
    if (variant === 'mobile') {
      return isOpen ? 'Close menu' : 'Open menu';
    }

    switch (state) {
      case 'expanded':
        return 'Collapse sidebar';
      case 'collapsed':
        return 'Expand sidebar';
      case 'hidden':
        return 'Show sidebar';
      default:
        return 'Toggle sidebar';
    }
  };

  const Icon = getIcon();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={`h-9 w-9 p-0 hover:bg-primary-light hover:text-primary-dark transition-all duration-200 ${className}`}
            aria-label={getTooltipText()}
          >
            <Icon className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-popover text-popover-foreground border-border">
          <p>{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}