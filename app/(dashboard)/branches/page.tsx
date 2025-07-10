'use client';
import React, { useState } from 'react';
import {
  Plus,
  MapPin,
  Users,
  Edit,
  Trash2,
  Search,
  Building,
  Grid,
  List,
  Eye,
  Shield,
  Calendar,
  Navigation,
} from 'lucide-react';

// Mock data for demonstration
const mockBranches = [
  {
    id: 1,
    name: 'Downtown Branch',
    location: '123 Main St, Lagos',
    coordinates: [3.3792, 6.5244],
    admins: [
      { id: 1, name: 'John Doe', email: 'john@sundryfoods.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@sundryfoods.com' },
    ],
    staffCount: 15,
    status: 'active',
    createdAt: '2024-01-15',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop',
  },
  {
    id: 2,
    name: 'Victoria Island Branch',
    location: '456 Ahmadu Bello Way, Victoria Island',
    coordinates: [3.4219, 6.4281],
    admins: [{ id: 3, name: 'Mike Johnson', email: 'mike@sundryfoods.com' }],
    staffCount: 12,
    status: 'active',
    createdAt: '2024-02-20',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop',
  },
  {
    id: 3,
    name: 'Ikeja Branch',
    location: '789 Allen Avenue, Ikeja',
    coordinates: [3.3375, 6.6018],
    admins: [{ id: 4, name: 'Sarah Wilson', email: 'sarah@sundryfoods.com' }],
    staffCount: 8,
    status: 'inactive',
    createdAt: '2024-03-10',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop',
  },
  {
    id: 4,
    name: 'Lekki Phase 1',
    location: '15 Admiralty Way, Lekki Phase 1',
    coordinates: [3.4653, 6.4474],
    admins: [
      { id: 5, name: 'David Brown', email: 'david@sundryfoods.com' },
      { id: 6, name: 'Lisa Green', email: 'lisa@sundryfoods.com' },
    ],
    staffCount: 18,
    status: 'active',
    createdAt: '2024-04-05',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop',
  },
];

const BranchesManagement = () => {
  const [branches, setBranches] = useState(mockBranches);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [newBranch, setNewBranch] = useState({
    name: '',
    location: '',
    coordinates: ['', ''],
    admins: [],
  });

  const filteredBranches = branches.filter(
    (branch) =>
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBranch = () => {
    if (newBranch.name && newBranch.location) {
      const branch = {
        id: branches.length + 1,
        name: newBranch.name,
        location: newBranch.location,
        coordinates: [
          parseFloat(newBranch.coordinates[0]) || 0,
          parseFloat(newBranch.coordinates[1]) || 0,
        ],
        admins: [],
        staffCount: 0,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setBranches([...branches, branch]);
      setNewBranch({
        name: '',
        location: '',
        coordinates: ['', ''],
        admins: [],
      });
      setIsDrawerOpen(false);
    }
  };

  const handleDeleteBranch = (branchId) => {
    setBranches(branches.filter((branch) => branch.id !== branchId));
  };

  const GridView = () => {
    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredBranches.map((branch) => (
          <div
            key={branch.id}
            className="group relative bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-200/50"
          >
            {/* Image Header */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={branch.image}
                alt={branch.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm shadow-lg ${
                    branch.status === 'active'
                      ? 'bg-emerald-500/90 text-white ring-2 ring-emerald-400/50'
                      : 'bg-gray-500/90 text-white ring-2 ring-gray-400/50'
                  }`}
                >
                  {branch.status.toUpperCase()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setSelectedBranch(branch)}
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
                  onClick={() => handleDeleteBranch(branch.id)}
                  className="p-2 bg-red-500/20 backdrop-blur-sm rounded-full text-white hover:bg-red-500/40 transition-all duration-200 transform hover:scale-110"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Branch Name Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                  {branch.name}
                </h3>
                <div className="flex items-center text-white/90 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {branch.location}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-4">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-2 rounded-xl border border-blue-200/50">
                  <div className="flex items-center space-x-2 mb-1">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                      Staff
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-700">
                    {branch.staffCount}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-2 rounded-xl border border-purple-200/50">
                  <div className="flex items-center space-x-2 mb-1">
                    <Shield className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">
                      Admins
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-purple-700">
                    {branch.admins.length}
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">
                      Created
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 font-mono">
                    {new Date(branch.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Navigation className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">
                      Location
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">
                    {branch.coordinates[0].toFixed(4)},{' '}
                    {branch.coordinates[1].toFixed(4)}
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
                Branch Name
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">
                Location
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">
                Status
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">
                Staff
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">
                Admins
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">
                Created
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBranches.map((branch) => (
              <tr
                key={branch.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="font-medium text-gray-900">
                      {branch.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {branch.location}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      branch.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {branch.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {branch.staffCount}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {branch.admins.length}
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {branch.createdAt}
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedBranch(branch)}
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
                      onClick={() => handleDeleteBranch(branch.id)}
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
      <div className="">
        <div className="">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Building className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Branches Management
              </h1>
            </div>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Branch</span>
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className=" py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Branches</p>
                <p className="text-2xl font-bold text-gray-900">
                  {branches.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Active Branches</p>
                <p className="text-2xl font-bold text-gray-900">
                  {branches.filter((b) => b.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Users className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900">
                  {branches.reduce((sum, b) => sum + b.staffCount, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Admins</p>
                <p className="text-2xl font-bold text-gray-900">
                  {branches.reduce((sum, b) => sum + b.admins.length, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" pb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search branches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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

      {/* Side Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Add New Branch
                </h2>
              </div>

              <div className="flex-1 px-6 py-4 overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Branch Name
                    </label>
                    <input
                      type="text"
                      value={newBranch.name}
                      onChange={(e) =>
                        setNewBranch({ ...newBranch, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter branch name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newBranch.location}
                      onChange={(e) =>
                        setNewBranch({ ...newBranch, location: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter full address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Longitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={newBranch.coordinates[0]}
                        onChange={(e) =>
                          setNewBranch({
                            ...newBranch,
                            coordinates: [
                              e.target.value,
                              newBranch.coordinates[1],
                            ],
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="3.3792"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Latitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={newBranch.coordinates[1]}
                        onChange={(e) =>
                          setNewBranch({
                            ...newBranch,
                            coordinates: [
                              newBranch.coordinates[0],
                              e.target.value,
                            ],
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="6.5244"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddBranch}
                    disabled={!newBranch.name || !newBranch.location}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Branch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Branch Details Modal */}
      {selectedBranch && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setSelectedBranch(null)}
          />
          <div className="absolute inset-4 bg-white rounded-lg shadow-xl max-w-2xl mx-auto">
            <div className="flex flex-col h-full">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedBranch.name}
                </h2>
              </div>

              <div className="flex-1 px-6 py-4 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Branch Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Location:</span>
                        <span className="text-sm text-gray-900">
                          {selectedBranch.location}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Staff Count:
                        </span>
                        <span className="text-sm text-gray-900">
                          {selectedBranch.staffCount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Status:</span>
                        <span
                          className={`text-sm ${
                            selectedBranch.status === 'active'
                              ? 'text-green-600'
                              : 'text-gray-600'
                          }`}
                        >
                          {selectedBranch.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Created:</span>
                        <span className="text-sm text-gray-900">
                          {selectedBranch.createdAt}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Coordinates:
                        </span>
                        <span className="text-sm text-gray-900">
                          {selectedBranch.coordinates[0].toFixed(4)},{' '}
                          {selectedBranch.coordinates[1].toFixed(4)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Assigned Admins
                    </h3>
                    <div className="space-y-2">
                      {selectedBranch.admins.map((admin) => (
                        <div
                          key={admin.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {admin.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {admin.email}
                            </div>
                          </div>
                          <button className="text-red-600 hover:text-red-700 text-sm">
                            Remove
                          </button>
                        </div>
                      ))}
                      {selectedBranch.admins.length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                          No admins assigned to this branch
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedBranch(null)}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchesManagement;
