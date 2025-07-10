'use client';
import React, { useState } from 'react';
import {
  Plus,
  MapPin,
  Users,
  Edit,
  Trash2,
  Search,
  User,
  Grid,
  List,
  Eye,
  Shield,
  Calendar,
  Mail,
  Phone,
  Crown,
  UserCheck,
  Building,
  Filter,
  MoreVertical,
  Ban,
  CheckCircle,
  XCircle,
} from 'lucide-react';

// Mock data for demonstration
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@sundryfoods.com',
    phone: '+234 803 123 4567',
    role: 'admin',
    branch: { id: 1, name: 'Downtown Branch' },
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-07-08',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    permissions: ['menu_manage', 'staff_manage', 'inventory_manage'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@sundryfoods.com',
    phone: '+234 803 234 5678',
    role: 'staff',
    branch: { id: 1, name: 'Downtown Branch' },
    status: 'active',
    createdAt: '2024-02-20',
    lastLogin: '2024-07-09',
    image:
      'https://images.unsplash.com/photo-1494790108755-2616b9ff84aa?w=400&h=400&fit=crop',
    permissions: ['orders_manage', 'shifts_view'],
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@sundryfoods.com',
    phone: '+234 803 345 6789',
    role: 'customer',
    branch: null,
    status: 'active',
    createdAt: '2024-03-10',
    lastLogin: '2024-07-09',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    permissions: ['orders_place', 'reviews_submit'],
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@sundryfoods.com',
    phone: '+234 803 456 7890',
    role: 'superadmin',
    branch: null,
    status: 'active',
    createdAt: '2024-04-05',
    lastLogin: '2024-07-09',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    permissions: ['all_access'],
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david@sundryfoods.com',
    phone: '+234 803 567 8901',
    role: 'staff',
    branch: { id: 2, name: 'Victoria Island Branch' },
    status: 'inactive',
    createdAt: '2024-05-12',
    lastLogin: '2024-07-05',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    permissions: ['orders_manage'],
  },
];

const mockBranches = [
  { id: 1, name: 'Downtown Branch' },
  { id: 2, name: 'Victoria Island Branch' },
  { id: 3, name: 'Ikeja Branch' },
];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'staff',
    branch: '',
    password: '',
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus =
      statusFilter === 'all' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.password) {
      const user = {
        id: users.length + 1,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        branch: newUser.branch
          ? mockBranches.find((b) => b.id === parseInt(newUser.branch))
          : null,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: 'Never',
        image:
          'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop',
        permissions:
          newUser.role === 'superadmin' ? ['all_access'] : ['basic_access'],
      };
      setUsers([...users, user]);
      setNewUser({
        name: '',
        email: '',
        phone: '',
        role: 'staff',
        branch: '',
        password: '',
      });
      setIsDrawerOpen(false);
    }
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleToggleStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === 'active' ? 'inactive' : 'active',
            }
          : user
      )
    );
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'superadmin':
        return <Crown className="h-4 w-4" />;
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'staff':
        return <UserCheck className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'superadmin':
        return 'from-yellow-50 to-yellow-100 border-yellow-200/50 text-yellow-700';
      case 'admin':
        return 'from-purple-50 to-purple-100 border-purple-200/50 text-purple-700';
      case 'staff':
        return 'from-blue-50 to-blue-100 border-blue-200/50 text-blue-700';
      default:
        return 'from-gray-50 to-gray-100 border-gray-200/50 text-gray-700';
    }
  };

  const GridView = () => {
    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="group relative bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-200/50"
          >
            {/* User Avatar Header */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm shadow-lg ${
                    user.status === 'active'
                      ? 'bg-emerald-500/90 text-white ring-2 ring-emerald-400/50'
                      : 'bg-red-500/90 text-white ring-2 ring-red-400/50'
                  }`}
                >
                  {user.status.toUpperCase()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200 transform hover:scale-110"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200 transform hover:scale-110"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleToggleStatus(user.id)}
                  className={`p-2 backdrop-blur-sm rounded-full text-white transition-all duration-200 transform hover:scale-110 ${
                    user.status === 'active'
                      ? 'bg-red-500/20 hover:bg-red-500/40'
                      : 'bg-green-500/20 hover:bg-green-500/40'
                  }`}
                  title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                >
                  {user.status === 'active' ? (
                    <Ban className="h-4 w-4" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="p-2 bg-red-500/20 backdrop-blur-sm rounded-full text-white hover:bg-red-500/40 transition-all duration-200 transform hover:scale-110"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* User Avatar */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 pt-12 space-y-4">
              {/* User Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {user.name}
                </h3>
                <div className="flex items-center justify-center text-gray-500 text-sm mb-2">
                  <Mail className="h-4 w-4 mr-1" />
                  {user.email}
                </div>
                {user.phone && (
                  <div className="flex items-center justify-center text-gray-500 text-sm">
                    <Phone className="h-4 w-4 mr-1" />
                    {user.phone}
                  </div>
                )}
              </div>

              {/* Role Badge */}
              <div className="flex justify-center">
                <div
                  className={`bg-gradient-to-r px-4 py-2 rounded-xl border ${getRoleColor(
                    user.role
                  )}`}
                >
                  <div className="flex items-center space-x-2">
                    {getRoleIcon(user.role)}
                    <span className="text-sm font-medium capitalize">
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Branch Info */}
              {user.branch && (
                <div className="flex items-center justify-center py-2 px-3 bg-gray-50 rounded-lg">
                  <Building className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    {user.branch.name}
                  </span>
                </div>
              )}

              {/* Additional Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">
                      Joined
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 font-mono">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">
                      Last Login
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 font-mono">
                    {user.lastLogin === 'Never'
                      ? 'Never'
                      : new Date(user.lastLogin).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/10 group-hover:to-pink-400/10 transition-all duration-500 pointer-events-none"></div>
          </div>
        ))}
      </div>
    );
  };

  const TableView = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 font-medium text-gray-500">
                User
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">
                Role
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">
                Branch
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">
                Status
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">
                Last Login
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    {getRoleIcon(user.role)}
                    <span className="ml-2 text-sm capitalize">{user.role}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {user.branch ? user.branch.name : 'N/A'}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {user.lastLogin === 'Never'
                    ? 'Never'
                    : new Date(user.lastLogin).toLocaleDateString()}
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className={`transition-colors ${
                        user.status === 'active'
                          ? 'text-gray-400 hover:text-red-600'
                          : 'text-gray-400 hover:text-green-600'
                      }`}
                      title={
                        user.status === 'active' ? 'Deactivate' : 'Activate'
                      }
                    >
                      {user.status === 'active' ? (
                        <Ban className="h-4 w-4" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                User Management
              </h1>
            </div>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add User</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u) => u.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Admins</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    users.filter(
                      (u) => u.role === 'admin' || u.role === 'superadmin'
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <User className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Staff</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u) => u.role === 'staff').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="superadmin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="customer">Customer</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Grid View"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Table View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="pt-5">
          {viewMode === 'grid' ? <GridView /> : <TableView />}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
