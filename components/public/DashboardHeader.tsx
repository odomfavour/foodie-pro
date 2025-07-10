'use client';

import React from 'react';
import { ChevronDown, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '../ui/sidebar';
import { useAuth } from '@/contexts/auth-provider';
import { getInitials } from '@/utils/helpers';

interface HeaderProps {
  user?: {
    name?: string;
    email?: string;
    avatarUrl?: string | null;
  };
}

const DashboardHeader: React.FC<HeaderProps> = ({}) => {
  const { logout, user } = useAuth();
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-white/95 backdrop-blur-sm px-6 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 transition-colors" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 whitespace-nowrap">
            Restaurant Management
          </h1>
        </div>
      </div>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 p-1.5">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatarUrl || ''} alt={user?.fullName} />
              <AvatarFallback>{getInitials(user?.fullName)}</AvatarFallback>
            </Avatar>
            {/* <span className="hidden sm:block max-w-[120px] truncate text-sm font-medium text-gray-700 text-left">
              {user.name}
            </span> */}
            <span>
              <ChevronDown />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="font-medium text-sm truncate">{user?.fullName}</div>
            <div className="text-xs text-muted-foreground truncate">
              {user?.email}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logout}
            className="cursor-pointer text-red-600"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default DashboardHeader;
