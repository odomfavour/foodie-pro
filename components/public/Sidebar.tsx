// components/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-100 border-r px-4 py-6">
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>
        <Link href="/admin/menu" className="text-gray-700 hover:text-blue-600">
          Menu
        </Link>
        <Link href="/admin/staff" className="text-gray-700 hover:text-blue-600">
          Staff
        </Link>
        <Link
          href="/admin/inventory"
          className="text-gray-700 hover:text-blue-600"
        >
          Inventory
        </Link>
        <Link
          href="/admin/shifts"
          className="text-gray-700 hover:text-blue-600"
        >
          Shifts
        </Link>
        <Link href="/profile" className="text-gray-700 hover:text-blue-600">
          Profile
        </Link>
        <Link href="/auth/logout" className="text-gray-700 hover:text-red-500">
          Logout
        </Link>
      </nav>
    </aside>
  );
}
