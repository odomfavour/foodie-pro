'use client';
import React, { useState } from 'react';
import {
  ShoppingCart,
  Search,
  MapPin,
  Filter,
  Plus,
  Minus,
  Star,
  ChevronDown,
} from 'lucide-react';

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({});
  const [selectedBranch, setSelectedBranch] = useState(
    'Victoria Island Branch'
  );
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);

  const branches = [
    'Victoria Island Branch',
    'Ikeja Branch',
    'Lekki Branch',
    'Surulere Branch',
  ];

  const categories = [
    { id: 'all', name: 'All Items', count: 24 },
    { id: 'appetizers', name: 'Appetizers', count: 6 },
    { id: 'mains', name: 'Main Courses', count: 12 },
    { id: 'beverages', name: 'Beverages', count: 8 },
    { id: 'desserts', name: 'Desserts', count: 4 },
  ];

  const menuItems = [
    {
      id: 1,
      title: 'Jollof Rice Special',
      description:
        'Traditional Nigerian jollof rice with chicken, beef, and fried plantain',
      price: 3500,
      category: 'mains',
      rating: 4.8,
      reviews: 124,
      image:
        'https://images.unsplash.com/photo-1609780447631-05b93e5a88ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      tags: ['Popular', 'Spicy'],
    },
    {
      id: 2,
      title: 'Grilled Chicken Breast',
      description:
        'Tender grilled chicken with herbs, served with rice and vegetables',
      price: 4200,
      category: 'mains',
      rating: 4.6,
      reviews: 89,
      image:
        'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      tags: ['Healthy'],
    },
    {
      id: 3,
      title: 'Suya Platter',
      description: 'Spiced grilled meat skewers with onions and tomatoes',
      price: 2800,
      category: 'appetizers',
      rating: 4.9,
      reviews: 156,
      image:
        'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      tags: ['Popular', 'Spicy'],
    },
    {
      id: 4,
      title: 'Chapman Cocktail',
      description: 'Refreshing blend of fruits and sparkling water',
      price: 1500,
      category: 'beverages',
      rating: 4.4,
      reviews: 67,
      image:
        'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      tags: ['Refreshing'],
    },
    {
      id: 5,
      title: 'Pepper Soup',
      description: 'Spicy Nigerian pepper soup with assorted meat',
      price: 2200,
      category: 'appetizers',
      rating: 4.7,
      reviews: 98,
      image:
        'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      tags: ['Spicy', 'Traditional'],
    },
    {
      id: 6,
      title: 'Chocolate Cake',
      description: 'Rich chocolate cake with vanilla frosting',
      price: 1800,
      category: 'desserts',
      rating: 4.5,
      reviews: 43,
      image:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      tags: ['Sweet'],
    },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (itemId) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [itemId, count]) => {
      const item = menuItems.find((item) => item.id === parseInt(itemId));
      return sum + (item ? item.price * count : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-black pt-[100px]">
      {/* Header with Location Selector */}
      {/* <div className="bg-gray-800 py-4 px-6 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
        

          <div className="flex items-center space-x-4">
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-300" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div> */}
      <div className="max-w-[1440px] mx-auto">
        <div className="w-11/12 mx-auto py-5">
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setShowBranchDropdown(!showBranchDropdown)}
            >
              <MapPin className="w-5 h-5" />
              <span className="font-medium">{selectedBranch}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showBranchDropdown ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showBranchDropdown && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-10">
                {branches.map((branch) => (
                  <button
                    key={branch}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors ${
                      branch === selectedBranch
                        ? 'text-purple-400'
                        : 'text-gray-300'
                    }`}
                    onClick={() => {
                      setSelectedBranch(branch);
                      setShowBranchDropdown(false);
                    }}
                  >
                    {branch}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto">
        <div className="w-11/12 mx-auto">
          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>

              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors text-gray-300">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-700"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tag === 'Popular'
                            ? 'bg-red-900 text-red-200'
                            : tag === 'Spicy'
                            ? 'bg-orange-900 text-orange-200'
                            : tag === 'Healthy'
                            ? 'bg-green-900 text-green-200'
                            : 'bg-blue-900 text-blue-200'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-300">
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-purple-400">
                      ₦{item.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({item.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    {cart[item.id] > 0 ? (
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-purple-400" />
                        </button>
                        <span className="font-semibold text-lg text-white">
                          {cart[item.id]}
                        </span>
                        <button
                          onClick={() => addToCart(item.id)}
                          className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-purple-400" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item.id)}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
              <div className="text-gray-500 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                No items found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
