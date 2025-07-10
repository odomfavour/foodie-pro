'use client';
import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Filter,
  DollarSign,
  Clock,
  Star,
  Eye,
  X,
  Save,
  Upload,
  Tag,
} from 'lucide-react';

const AdminMenuDashboard = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      title: 'Jollof Rice Special',
      description:
        'Traditional Nigerian jollof rice with chicken, vegetables, and aromatic spices',
      price: 2500,
      category: 'Main Course',
      image: '/api/placeholder/300/200',
      status: 'active',
      preparationTime: '25 mins',
      rating: 4.8,
      orders: 245,
    },
    {
      id: 2,
      title: 'Peppered Chicken',
      description:
        'Grilled chicken marinated in authentic Nigerian pepper sauce',
      price: 3200,
      category: 'Main Course',
      image: '/api/placeholder/300/200',
      status: 'active',
      preparationTime: '20 mins',
      rating: 4.6,
      orders: 189,
    },
    {
      id: 3,
      title: 'Pounded Yam & Egusi',
      description:
        'Fresh pounded yam served with rich egusi soup and assorted meat',
      price: 2800,
      category: 'Traditional',
      image: '/api/placeholder/300/200',
      status: 'active',
      preparationTime: '30 mins',
      rating: 4.9,
      orders: 167,
    },
    {
      id: 4,
      title: 'Suya Platter',
      description:
        'Grilled beef skewers with traditional spices, onions, and tomatoes',
      price: 1500,
      category: 'Appetizer',
      image: '/api/placeholder/300/200',
      status: 'inactive',
      preparationTime: '15 mins',
      rating: 4.4,
      orders: 98,
    },
    {
      id: 5,
      title: 'Chapman Cocktail',
      description:
        'Refreshing Nigerian cocktail with mixed fruits and sparkling water',
      price: 800,
      category: 'Beverages',
      image: '/api/placeholder/300/200',
      status: 'active',
      preparationTime: '5 mins',
      rating: 4.2,
      orders: 312,
    },
    {
      id: 6,
      title: 'Meat Pie',
      description:
        'Crispy pastry filled with seasoned minced meat and vegetables',
      price: 500,
      category: 'Snacks',
      image: '/api/placeholder/300/200',
      status: 'active',
      preparationTime: '10 mins',
      rating: 4.5,
      orders: 278,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const categories = [
    'all',
    'Main Course',
    'Traditional',
    'Appetizer',
    'Beverages',
    'Snacks',
    'Desserts',
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = () => {
    setEditingItem(null);
    setShowAddModal(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowAddModal(true);
  };

  const handleDeleteItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleToggleStatus = (id) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'active' ? 'inactive' : 'active',
            }
          : item
      )
    );
  };

  const MenuItemDrawer = ({ isOpen, onClose, item }) => {
    const [formData, setFormData] = useState({
      title: item?.title || '',
      description: item?.description || '',
      price: item?.price || '',
      category: item?.category || 'Main Course',
      preparationTime: item?.preparationTime || '',
      status: item?.status || 'active',
    });

    const handleSubmit = () => {
      if (item) {
        // Update existing item
        setMenuItems(
          menuItems.map((menuItem) =>
            menuItem.id === item.id
              ? { ...menuItem, ...formData, price: parseFloat(formData.price) }
              : menuItem
          )
        );
      } else {
        // Add new item
        const newItem = {
          id: Date.now(),
          ...formData,
          price: parseFloat(formData.price),
          image: '/api/placeholder/300/200',
          rating: 0,
          orders: 0,
        };
        setMenuItems([...menuItems, newItem]);
      }
      onClose();
    };

    useEffect(() => {
      if (item) {
        setFormData({
          title: item.title || '',
          description: item.description || '',
          price: item.price || '',
          category: item.category || 'Main Course',
          preparationTime: item.preparationTime || '',
          status: item.status || 'active',
        });
      } else {
        setFormData({
          title: '',
          description: '',
          price: '',
          category: 'Main Course',
          preparationTime: '',
          status: 'active',
        });
      }
    }, [item]);

    return (
      <>
        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={onClose}
          />
        )}

        {/* Drawer */}
        <div
          className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {item ? 'Edit Menu Item' : 'Add New Menu Item'}
                </h2>
                <p className="text-orange-100 text-sm mt-1">
                  {item
                    ? 'Update menu item details'
                    : 'Create a new menu item for your restaurant'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-orange-200 transition-colors p-2 rounded-lg hover:bg-white hover:bg-opacity-10"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto h-full pb-24">
            <div className="space-y-6">
              {/* Image Upload Section */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Item Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <button className="text-orange-500 hover:text-orange-600 font-medium">
                      Click to upload
                    </button>
                    <p className="text-gray-500 text-sm mt-1">
                      or drag and drop
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>

              {/* Item Name */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Item Name *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  placeholder="Enter item name"
                />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  rows="4"
                  placeholder="Describe your menu item..."
                />
              </div>

              {/* Price and Category Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Price (₦) *
                  </label>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  >
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preparation Time */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Preparation Time *
                </label>
                <div className="relative">
                  <Clock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    value={formData.preparationTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preparationTime: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    placeholder="e.g., 20 mins"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() =>
                      setFormData({ ...formData, status: 'active' })
                    }
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      formData.status === 'active'
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() =>
                      setFormData({ ...formData, status: 'inactive' })
                    }
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      formData.status === 'inactive'
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    Inactive
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium flex items-center justify-center space-x-2 shadow-lg"
              >
                <Save size={20} />
                <span>{item ? 'Update' : 'Add'} Item</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Menu Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your restaurant's menu items
              </p>
            </div>
            <button
              onClick={handleAddItem}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2 shadow-lg"
            >
              <Plus size={20} />
              <span>Add New Item</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">
                  {menuItems.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Tag className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Items</p>
                <p className="text-2xl font-bold text-green-600">
                  {menuItems.filter((item) => item.status === 'active').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Eye className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {(
                    menuItems.reduce((sum, item) => sum + item.rating, 0) /
                    menuItems.length
                  ).toFixed(1)}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Star className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-purple-600">
                  {menuItems.reduce((sum, item) => sum + item.orders, 0)}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <DollarSign className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full sm:w-64"
                />
              </div>

              <div className="relative">
                <Filter
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div
          className={`${
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }`}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div
                className={`${
                  viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full h-48'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.status}
                    </span>
                    <button
                      onClick={() => handleToggleStatus(item.id)}
                      className={`w-10 h-6 rounded-full transition-colors relative ${
                        item.status === 'active'
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                          item.status === 'active'
                            ? 'translate-x-5'
                            : 'translate-x-1'
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-orange-600">
                    ₦{item.price.toLocaleString()}
                  </span>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {item.preparationTime}
                    </div>
                    <div className="flex items-center">
                      <Star size={16} className="mr-1 text-yellow-400" />
                      {item.rating}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {item.orders} orders
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditItem(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Drawer */}
      <MenuItemDrawer
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        item={editingItem}
      />
    </div>
  );
};

export default AdminMenuDashboard;
