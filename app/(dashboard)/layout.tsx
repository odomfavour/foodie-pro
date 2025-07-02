// components/Layout.tsx

import Sidebar from '@/components/public/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
