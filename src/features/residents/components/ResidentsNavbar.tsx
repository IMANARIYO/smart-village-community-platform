import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Globe, ChevronDown, Bell, User, Check, Settings, LogOut, Shield, HelpCircle } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const ResidentsNavbar: React.FC = () => {
  const location = useLocation()

  const handleProfileClick = () => {
    // Navigate to profile page
    console.log('Navigate to profile')
  }

  const handleSettingsClick = () => {
    // Navigate to settings page
    console.log('Navigate to settings')
  }

  const handleLogoutClick = () => {
    // Handle logout logic
    console.log('Logout user')
  }

  const handleHelpClick = () => {
    // Navigate to help/support page
    console.log('Navigate to help')
  }

  const navLinks = [
    { path: '/resident', label: 'Home' },
    { path: '/resident/news', label: 'News' },
    { path: '/resident/volunteering', label: 'Volunteering' },
    { path: '/resident/contacts', label: 'Contacts' },
    { path: '/resident/visitors', label: 'Visitors' },
    { path: '/safety/incidents', label: 'Safety' },
  ]

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-green-700">Smart Village</h1>
              <p className="text-sm text-gray-500">Nyarucyamu I Village</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-green-700 border-b-2 border-green-700'
                    : 'text-green-600 hover:text-green-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side - Language, Notifications, User Profile */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center space-x-2 text-green-600 hover:text-green-700 cursor-pointer">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">English</span>
              <ChevronDown className="w-4 h-4" />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-green-600 hover:text-green-700 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium text-green-700">John Doe</span>
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                      Resident
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-green-600" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john.doe@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettingsClick} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Privacy & Security</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleHelpClick} className="cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogoutClick} className="cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResidentsNavbar
