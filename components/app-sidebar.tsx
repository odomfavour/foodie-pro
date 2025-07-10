'use client';
import { usePathname } from 'next/navigation'; // For Next.js 13+
// Or use: import { useRouter } from 'next/router'; // For Next.js 12 and below
// Or use: import { useLocation } from 'react-router-dom'; // For React Router

import {
  Home,
  Inbox,
  Settings,
  Users,
  ChefHat,
  Package,
  Clock,
  Star,
  BarChart3,
  Utensils,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

// Menu items based on the restaurant management app
const items = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Branches', url: '/branches', icon: Inbox },
  { title: 'Users', url: '/users', icon: Inbox },
  { title: 'Orders', url: '/orders', icon: Inbox },
  { title: 'Menu Management', url: '/menu-management', icon: ChefHat },
  { title: 'Menu', url: '/menu', icon: ChefHat },
  { title: 'Staff Management', url: '/staff', icon: Users },
  { title: 'Inventory', url: '/inventory', icon: Package },
  { title: 'Shift Management', url: '/shifts', icon: Clock },
  { title: 'Reviews', url: '/reviews', icon: Star },
  { title: 'Analytics', url: '/analytics', icon: BarChart3 },
];

const accountItems = [{ title: 'Profile', url: '/profile', icon: Settings }];

export function AppSidebar() {
  // Get current pathname
  const pathname = usePathname(); // Next.js 13+
  // const router = useRouter(); const pathname = router.pathname; // Next.js 12
  // const location = useLocation(); const pathname = location.pathname; // React Router

  const isActive = (url: string) => {
    return pathname === url;
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-white shadow-sm">
      <SidebarContent className="bg-gradient-to-b from-blue-50 to-white">
        {/* Brand Header */}
        <div className="px-6 py-3 border-b border-gray-200">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Sundry Foods</h2>
            </div>
          </Link>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`w-full justify-start px-3 py-2 rounded-md transition-all duration-200 group relative ${
                        active
                          ? 'bg-blue-100 text-blue-700 shadow-sm  border-blue-600'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <a
                        href={item.url}
                        className="flex items-center space-x-3"
                      >
                        <item.icon
                          className={`w-5 h-5 transition-transform duration-200 ${
                            active
                              ? 'text-blue-600 scale-110'
                              : 'group-hover:scale-110'
                          }`}
                        />
                        <span
                          className={`font-medium ${
                            active ? 'font-semibold' : ''
                          }`}
                        >
                          {item.title}
                        </span>
                        {/* Active indicator dot */}
                        {active && (
                          <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Items */}
        <SidebarGroup className="px-3 py-4 border-t border-gray-100">
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {accountItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`w-full justify-start px-3 py-2 rounded-lg transition-all duration-200 group relative ${
                        active
                          ? 'bg-blue-100 text-blue-700 shadow-sm border-l-4 border-blue-600'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <a
                        href={item.url}
                        className="flex items-center space-x-3"
                      >
                        <item.icon
                          className={`w-5 h-5 transition-transform duration-200 ${
                            active
                              ? 'text-blue-600 scale-110'
                              : 'group-hover:scale-110'
                          }`}
                        />
                        <span
                          className={`font-medium ${
                            active ? 'font-semibold' : ''
                          }`}
                        >
                          {item.title}
                        </span>
                        {active && (
                          <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Footer */}
        <div className="mt-auto p-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>System Active</span>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
