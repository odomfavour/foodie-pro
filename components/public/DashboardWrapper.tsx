import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../app-sidebar';
import DashboardHeader from './DashboardHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header with sidebar trigger */}
        <DashboardHeader
          user={{
            name: 'Ogo Odom',
            email: 'ogochuks@gmail.com',
          }}
        />

        {/* Main content area */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="container mx-auto p-6">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
}
