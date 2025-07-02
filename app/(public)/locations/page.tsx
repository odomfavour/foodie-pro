'use client';
import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Star,
  Filter,
  Search,
} from 'lucide-react';

// Sample images (replace with your actual image paths)
const branchImages = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1581349485608-9469926a8e5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
];

const LocationsPage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedDeliveryType, setSelectedDeliveryType] = useState('all');
  const [userLocation, setUserLocation] = useState(null);
  const [sortBy, setSortBy] = useState('distance');

  const branches = [
    {
      id: 1,
      name: 'Victoria Island Branch',
      address: '23 Ahmadu Bello Way, Victoria Island, Lagos',
      coordinates: { lat: 6.4281, lng: 3.4219 },
      distance: 0.5,
      phone: '+234 901 234 5678',
      rating: 4.8,
      reviews: 324,
      openHours: {
        weekdays: '8:00 AM - 10:00 PM',
        weekends: '9:00 AM - 11:00 PM',
      },
      services: ['dine-in', 'takeaway', 'delivery'],
      isOpen: true,
      features: [
        'Parking Available',
        'WiFi',
        'Air Conditioning',
        'Outdoor Seating',
      ],
      image: branchImages[0],
      manager: 'Adebayo Johnson',
      staff: 12,
    },
    {
      id: 2,
      name: 'Ikeja Branch',
      address: '45 Allen Avenue, Ikeja, Lagos',
      coordinates: { lat: 6.5944, lng: 3.3375 },
      distance: 8.2,
      phone: '+234 901 234 5679',
      rating: 4.6,
      reviews: 267,
      openHours: {
        weekdays: '8:00 AM - 9:30 PM',
        weekends: '9:00 AM - 10:30 PM',
      },
      services: ['dine-in', 'takeaway', 'delivery'],
      isOpen: true,
      features: [
        'Parking Available',
        'WiFi',
        'Air Conditioning',
        'Private Dining',
      ],
      image: branchImages[1],
      manager: 'Funmi Adebisi',
      staff: 15,
    },
    {
      id: 3,
      name: 'Lekki Branch',
      address: '12 Admiralty Way, Lekki Phase 1, Lagos',
      coordinates: { lat: 6.4698, lng: 3.5852 },
      distance: 12.5,
      phone: '+234 901 234 5680',
      rating: 4.7,
      reviews: 189,
      openHours: {
        weekdays: '8:00 AM - 10:00 PM',
        weekends: '9:00 AM - 11:00 PM',
      },
      services: ['dine-in', 'takeaway'],
      isOpen: false,
      features: [
        'Parking Available',
        'WiFi',
        'Air Conditioning',
        'Beachside View',
      ],
      image: branchImages[2],
      manager: 'Kemi Okafor',
      staff: 10,
    },
    {
      id: 4,
      name: 'Surulere Branch',
      address: '78 Bode Thomas Street, Surulere, Lagos',
      coordinates: { lat: 6.4969, lng: 3.3447 },
      distance: 15.1,
      phone: '+234 901 234 5681',
      rating: 4.5,
      reviews: 156,
      openHours: {
        weekdays: '8:00 AM - 9:00 PM',
        weekends: '9:00 AM - 10:00 PM',
      },
      services: ['dine-in', 'takeaway', 'delivery'],
      isOpen: true,
      features: ['WiFi', 'Air Conditioning', 'Family Friendly'],
      image: branchImages[3],
      manager: 'Tunde Afolabi',
      staff: 8,
    },
  ];

  const deliveryTypes = [
    { value: 'all', label: 'All Services' },
    { value: 'dine-in', label: 'Dine-in' },
    { value: 'takeaway', label: 'Takeaway' },
    { value: 'delivery', label: 'Delivery' },
  ];

  const filteredBranches = branches.filter((branch) => {
    const matchesSearch =
      branch.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesService =
      selectedDeliveryType === 'all' ||
      branch.services.includes(selectedDeliveryType);
    return matchesSearch && matchesService;
  });

  const sortedBranches = [...filteredBranches].sort((a, b) => {
    if (sortBy === 'distance') return a.distance - b.distance;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const selectBranch = (branch) => {
    console.log('Selected branch:', branch.name);
    alert(`Selected ${branch.name}! Redirecting to menu...`);
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden relative">
      {/* Bent Background Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-900">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Restaurant Interior"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute bottom-0 w-full h-32 bg-gray-900 transform -skew-y-3 origin-bottom-left"></div>
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-8 bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Location
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Select a branch near you to start ordering
          </p>

          <button
            onClick={getCurrentLocation}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
          >
            <Navigation className="w-5 h-5" />
            <span>Use My Location</span>
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search locations..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>

            <select
              value={selectedDeliveryType}
              onChange={(e) => setSelectedDeliveryType(e.target.value)}
              className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
            >
              {deliveryTypes.map((type) => (
                <option
                  key={type.value}
                  value={type.value}
                  className="bg-gray-800"
                >
                  {type.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
            >
              <option value="distance" className="bg-gray-800">
                Sort by Distance
              </option>
              <option value="rating" className="bg-gray-800">
                Sort by Rating
              </option>
              <option value="name" className="bg-gray-800">
                Sort by Name
              </option>
            </select>
          </div>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedBranches.map((branch) => (
            <div
              key={branch.id}
              className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-700"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={branch.image}
                  alt={branch.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      branch.isOpen
                        ? 'bg-green-900 text-green-200'
                        : 'bg-red-900 text-red-200'
                    }`}
                  >
                    {branch.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-gray-900 rounded-lg px-2 py-1 text-sm font-medium text-gray-200 shadow">
                  {branch.distance} km away
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {branch.name}
                    </h3>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-white">
                        {branch.rating}
                      </span>
                      <span className="text-sm text-gray-400">
                        ({branch.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">
                      {branch.address}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">
                      {branch.phone}
                    </span>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-300">
                      <div>Weekdays: {branch.openHours.weekdays}</div>
                      <div>Weekends: {branch.openHours.weekends}</div>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-white mb-2">
                    Available Services
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {branch.services.map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-purple-900 text-purple-200 text-xs rounded-md font-medium"
                      >
                        {service.charAt(0).toUpperCase() + service.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-white mb-2">
                    Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {branch.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-gray-700 text-gray-200 text-xs rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                    {branch.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-200 text-xs rounded-md">
                        +{branch.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => selectBranch(branch)}
                    disabled={!branch.isOpen}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                      branch.isOpen
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {branch.isOpen ? 'Select Branch' : 'Currently Closed'}
                  </button>
                  <button className="px-4 py-3 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                    <MapPin className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedBranches.length === 0 && (
          <div className="text-center py-12 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
            <div className="text-gray-500 mb-4">
              <MapPin className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              No branches found
            </h3>
            <p className="text-gray-400">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationsPage;
