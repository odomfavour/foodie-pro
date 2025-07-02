'use client';
import React, { useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  Users,
  Store,
  DollarSign,
  ShoppingBag,
  Clock,
  Plus,
  Settings,
  Eye,
  Edit,
  Star,
  AlertCircle,
  Filter,
  Download,
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Sample data
  const overviewStats = [
    {
      title: 'Total Revenue',
      value: '₦12,450,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Total Orders',
      value: '3,247',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Branches',
      value: '4',
      change: '0%',
      trend: 'neutral',
      icon: Store,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Staff',
      value: '45',
      change: '+5.3%',
      trend: 'up',
      icon: Users,
      color: 'bg-orange-500',
    },
  ];

  const revenueData = [
    { name: 'Mon', revenue: 2400000, orders: 240 },
    { name: 'Tue', revenue: 1398000, orders: 198 },
    { name: 'Wed', revenue: 9800000, orders: 380 },
    { name: 'Thu', revenue: 3908000, orders: 420 },
    { name: 'Fri', revenue: 4800000, orders: 580 },
    { name: 'Sat', revenue: 3800000, orders: 490 },
    { name: 'Sun', revenue: 4300000, orders: 510 },
  ];

  const branchPerformance = [
    {
      name: 'Victoria Island',
      revenue: 4500000,
      orders: 890,
      rating: 4.8,
      staff: 12,
    },
    { name: 'Ikeja', revenue: 3200000, orders: 670, rating: 4.6, staff: 15 },
    { name: 'Lekki', revenue: 2800000, orders: 520, rating: 4.7, staff: 10 },
    { name: 'Surulere', revenue: 1950000, orders: 410, rating: 4.5, staff: 8 },
  ];

  const orderStatusData = [
    { name: 'Completed', value: 2847, color: '#10B981' },
    { name: 'In Progress', value: 234, color: '#F59E0B' },
    { name: 'Pending', value: 166, color: '#EF4444' },
  ];

  const topMenuItems = [
    { name: 'Jollof Rice Special', orders: 456, revenue: 1596000 },
    { name: 'Grilled Chicken', orders: 389, revenue: 1633800 },
    { name: 'Suya Platter', orders: 312, revenue: 873600 },
    { name: 'Pepper Soup', orders: 278, revenue: 611600 },
    { name: 'Chapman Cocktail', orders: 234, revenue: 351000 },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New branch added',
      branch: 'Abuja Central',
      time: '2 hours ago',
      type: 'branch',
    },
    {
      id: 2,
      action: 'Admin assigned',
      branch: 'Victoria Island',
      admin: 'John Doe',
      time: '4 hours ago',
      type: 'admin',
    },
    {
      id: 3,
      action: 'Menu updated',
      branch: 'Ikeja',
      time: '6 hours ago',
      type: 'menu',
    },
    {
      id: 4,
      action: 'Staff shift updated',
      branch: 'Lekki',
      time: '8 hours ago',
      type: 'staff',
    },
    {
      id: 5,
      action: 'Inventory low alert',
      branch: 'Surulere',
      time: '1 day ago',
      type: 'alert',
    },
  ];

  // const [showBranchModal, setShowBranchModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SF</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Sundry Foods
                </h1>
                <p className="text-sm text-gray-500">Super Admin Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="1year">Last Year</option>
              </select>

              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Branch</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === 'up'
                          ? 'text-green-600'
                          : stat.trend === 'down'
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      vs last period
                    </span>
                  </div>
                </div>
                <div
                  className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Trend
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedMetric('revenue')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedMetric === 'revenue'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setSelectedMetric('orders')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedMetric === 'orders'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Orders
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    selectedMetric === 'revenue'
                      ? `₦${value.toLocaleString()}`
                      : value,
                    selectedMetric === 'revenue' ? 'Revenue' : 'Orders',
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Order Status Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Order Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Branch Performance Table */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Branch Performance
            </h3>
            <div className="flex space-x-2">
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Branch
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Revenue
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Orders
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Rating
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Staff
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {branchPerformance.map((branch, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Store className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          {branch.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-gray-900">
                      ₦{branch.revenue.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {branch.orders.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-900">{branch.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {branch.staff} members
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Menu Items */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Top Menu Items
            </h3>
            <div className="space-y-4">
              {topMenuItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      {item.orders} orders
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₦{item.revenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Recent Activities
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'branch'
                        ? 'bg-green-100'
                        : activity.type === 'admin'
                        ? 'bg-blue-100'
                        : activity.type === 'menu'
                        ? 'bg-purple-100'
                        : activity.type === 'staff'
                        ? 'bg-orange-100'
                        : 'bg-red-100'
                    }`}
                  >
                    {activity.type === 'branch' && (
                      <Store className="w-4 h-4 text-green-600" />
                    )}
                    {activity.type === 'admin' && (
                      <Users className="w-4 h-4 text-blue-600" />
                    )}
                    {activity.type === 'menu' && (
                      <Edit className="w-4 h-4 text-purple-600" />
                    )}
                    {activity.type === 'staff' && (
                      <Clock className="w-4 h-4 text-orange-600" />
                    )}
                    {activity.type === 'alert' && (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.action}</span>
                      {activity.branch && (
                        <span className="text-gray-600">
                          {' '}
                          at {activity.branch}
                        </span>
                      )}
                      {activity.admin && (
                        <span className="text-gray-600">
                          {' '}
                          - {activity.admin}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
