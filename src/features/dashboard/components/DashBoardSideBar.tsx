// src/components/layout/Sidebar.tsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, X, ChevronDown, ChevronRight } from 'lucide-react';

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
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, variant, state, entries = sidebarEntries }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

    const handleNavigation = (path: string) => {
        navigate(path);
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
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors text-left
                    ${activeInGroup ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {state === 'expanded' && <span className="text-sm font-medium">{item.name}</span>}
                    </div>
                    {state === 'expanded' && (
                        expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                    )}
                </button>
            );

            if (state === 'collapsed' && variant === 'desktop') {
                return (
                    <li key={item.name} className="relative">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className={`w-full flex items-center justify-center p-3 rounded-lg transition-colors
                                    ${activeInGroup ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <item.icon className="w-5 h-5" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="right"
                                align="start"
                                className="w-48"
                            >
                                {item.items.map((subItem) => (
                                    <DropdownMenuItem
                                        key={subItem.href}
                                        onClick={() => handleNavigation(subItem.href)}
                                        className={isActive(subItem.href) ? 'bg-blue-100 text-blue-700' : ''}
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
                <li key={item.name} className={`space-y-1`}>
                    {state === 'collapsed' && variant === 'desktop' ? (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                {groupButton}
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={10}>
                                <p className="font-medium">{item.name}</p>
                                {item.items.length > 0 && (
                                    <p className="text-xs opacity-75 mt-1">
                                        {item.items.length} item{item.items.length !== 1 ? 's' : ''}
                                    </p>
                                )}
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        groupButton
                    )}

                    {expanded && state === 'expanded' && (
                        <ul className="pl-6 mt-1 space-y-1">
                            {item.items.map(child => renderItem(child, level + 1))}
                        </ul>
                    )}
                </li>
            );




        }

        const itemButton = (
            <button
                onClick={() => 'href' in item && handleNavigation(item.href)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left
                ${'href' in item && isActive(item.href) ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                {'icon' in item && <item.icon className="w-5 h-5 flex-shrink-0" />}
                {state === 'expanded' && 'name' in item && <span className="text-sm font-medium truncate">{item.name}</span>}
            </button>
        );

        return (
            <li key={isNavigationItem(item) ? item.href : ""}>
                {state === 'collapsed' && variant === 'desktop' && isNavigationItem(item) ? (
                    <Tooltip>
                        <TooltipTrigger asChild>{itemButton}</TooltipTrigger>
                        <TooltipContent side="right" sideOffset={10}>
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

    // ---------------- Mobile Sidebar ----------------
    if (variant === 'mobile') {
        return (
            <>
                {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}
                <aside className={`fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                            <Home className="w-6 h-6 text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-800">Community Hub</h2>
                        </div>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    aria-label="Close sidebar"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Close sidebar</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <nav className="mt-4 overflow-y-auto pb-4">
                        <TooltipProvider>
                            <ul className="space-y-1 px-2">
                                {entries.map(entry => renderItem(entry))}
                            </ul>
                        </TooltipProvider>
                    </nav>
                </aside>
            </>
        );
    }

    // ---------------- Desktop Sidebar ----------------
    const getSidebarClasses = () => {
        const base = 'flex-col fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-10 ';
        switch (state) {
            case 'expanded': return `${base} w-64`;
            case 'collapsed': return `${base} w-15`;
            case 'hidden': return `${base} w-0 overflow-hidden`;
            default: return `${base} w-64`;
        }
    };

    if (state === 'hidden') return <aside className={getSidebarClasses()} />;

    const headerContent = state === 'expanded' ? (
        <div className="flex items-center space-x-2">
            <Home className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <h2 className="text-lg font-semibold text-gray-800 truncate">Community Hub</h2>
        </div>
    ) : (
        <Home className="w-6 h-6 text-blue-600" />
    );

    return (
        <aside className={getSidebarClasses()}>
            <div className="flex items-center justify-center p-4 border-b border-gray-200 min-h-[73px]">
                {state === 'collapsed' ? (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="cursor-pointer">
                                {headerContent}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={10}>
                            <p className="font-medium">Community Hub</p>
                            <p className="text-xs opacity-75 mt-1">Expand sidebar for full navigation</p>
                        </TooltipContent>
                    </Tooltip>
                ) : (
                    headerContent
                )}
            </div>
            <nav className="mt-4 overflow-y-auto pb-4">
                <TooltipProvider
                    delayDuration={300}
                    skipDelayDuration={100}
                >
                    <ul className="space-y-1 px-2">
                        {entries.map(entry => renderItem(entry))}
                    </ul>
                </TooltipProvider>
            </nav>
        </aside>
    );
};

export default Sidebar;