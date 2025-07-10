'use client';
import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  User,
  Filter,
  Search,
} from 'lucide-react';

const ShiftManagement = () => {
  const [activeTab, setActiveTab] = useState('shifts');
  const [shifts, setShifts] = useState([]);
  const [staff, setStaff] = useState([]);
  const [filteredShifts, setFilteredShifts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingShift, setEditingShift] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('admin'); // 'admin' or 'staff'
  const [currentUserId, setCurrentUserId] = useState('staff1'); // Mock current user ID
  const [formData, setFormData] = useState({
    staffId: '',
    date: '',
    startTime: '',
    endTime: '',
    position: '',
    notes: '',
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockStaff = [
      {
        _id: 'staff1',
        name: 'John Doe',
        position: 'Server',
        email: 'john@example.com',
      },
      {
        _id: 'staff2',
        name: 'Jane Smith',
        position: 'Chef',
        email: 'jane@example.com',
      },
      {
        _id: 'staff3',
        name: 'Mike Johnson',
        position: 'Cashier',
        email: 'mike@example.com',
      },
      {
        _id: 'staff4',
        name: 'Sarah Wilson',
        position: 'Server',
        email: 'sarah@example.com',
      },
      {
        _id: 'staff5',
        name: 'David Brown',
        position: 'Kitchen Assistant',
        email: 'david@example.com',
      },
    ];

    const mockShifts = [
      {
        _id: '1',
        staff: mockStaff[0],
        date: '2025-07-10',
        startTime: '09:00',
        endTime: '17:00',
        position: 'Server',
        status: 'scheduled',
        checkedIn: false,
        checkedOut: false,
        actualStartTime: null,
        actualEndTime: null,
        notes: 'Morning shift',
        createdAt: new Date().toISOString(),
      },
      {
        _id: '2',
        staff: mockStaff[1],
        date: '2025-07-10',
        startTime: '06:00',
        endTime: '14:00',
        position: 'Chef',
        status: 'active',
        checkedIn: true,
        checkedOut: false,
        actualStartTime: '06:05',
        actualEndTime: null,
        notes: 'Kitchen opening',
        createdAt: new Date().toISOString(),
      },
      {
        _id: '3',
        staff: mockStaff[2],
        date: '2025-07-10',
        startTime: '12:00',
        endTime: '20:00',
        position: 'Cashier',
        status: 'scheduled',
        checkedIn: false,
        checkedOut: false,
        actualStartTime: null,
        actualEndTime: null,
        notes: 'Afternoon shift',
        createdAt: new Date().toISOString(),
      },
      {
        _id: '4',
        staff: mockStaff[3],
        date: '2025-07-11',
        startTime: '10:00',
        endTime: '18:00',
        position: 'Server',
        status: 'scheduled',
        checkedIn: false,
        checkedOut: false,
        actualStartTime: null,
        actualEndTime: null,
        notes: 'Weekend shift',
        createdAt: new Date().toISOString(),
      },
      {
        _id: '5',
        staff: mockStaff[4],
        date: '2025-07-09',
        startTime: '14:00',
        endTime: '22:00',
        position: 'Kitchen Assistant',
        status: 'completed',
        checkedIn: true,
        checkedOut: true,
        actualStartTime: '14:10',
        actualEndTime: '22:05',
        notes: 'Evening prep',
        createdAt: new Date().toISOString(),
      },
    ];

    setTimeout(() => {
      setStaff(mockStaff);
      setShifts(mockShifts);
      setFilteredShifts(mockShifts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter shifts based on search and date
  useEffect(() => {
    let filtered = shifts;

    if (searchTerm) {
      filtered = filtered.filter(
        (shift) =>
          shift.staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shift.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDate) {
      filtered = filtered.filter((shift) => shift.date === selectedDate);
    }

    // If staff user, only show their shifts
    if (userRole === 'staff') {
      filtered = filtered.filter((shift) => shift.staff._id === currentUserId);
    }

    setFilteredShifts(filtered);
  }, [searchTerm, selectedDate, shifts, userRole, currentUserId]);

  const getShiftStatus = (shift) => {
    const now = new Date();
    const shiftDate = new Date(shift.date);
    const startTime = new Date(`${shift.date}T${shift.startTime}`);
    const endTime = new Date(`${shift.date}T${shift.endTime}`);

    if (shift.status === 'completed') return 'completed';
    if (
      shift.checkedIn &&
      !shift.checkedOut &&
      now >= startTime &&
      now <= endTime
    )
      return 'active';
    if (shift.checkedIn && shift.checkedOut) return 'completed';
    if (now > endTime && !shift.checkedOut) return 'missed';
    if (now >= startTime && now <= endTime) return 'current';
    if (now < startTime) return 'scheduled';
    return 'scheduled';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'missed':
        return 'bg-red-100 text-red-800';
      case 'current':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmit = () => {
    if (
      !formData.staffId ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime
    ) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedStaff = staff.find((s) => s._id === formData.staffId);

    if (editingShift) {
      // Update existing shift
      const updatedShifts = shifts.map((shift) =>
        shift._id === editingShift._id
          ? {
              ...shift,
              staff: selectedStaff,
              date: formData.date,
              startTime: formData.startTime,
              endTime: formData.endTime,
              position: formData.position,
              notes: formData.notes,
            }
          : shift
      );
      setShifts(updatedShifts);
    } else {
      // Add new shift
      const newShift = {
        _id: Date.now().toString(),
        staff: selectedStaff,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        position: formData.position,
        status: 'scheduled',
        checkedIn: false,
        checkedOut: false,
        actualStartTime: null,
        actualEndTime: null,
        notes: formData.notes,
        createdAt: new Date().toISOString(),
      };
      setShifts([...shifts, newShift]);
    }

    // Reset form
    setFormData({
      staffId: '',
      date: '',
      startTime: '',
      endTime: '',
      position: '',
      notes: '',
    });
    setShowAddModal(false);
    setEditingShift(null);
  };

  const handleEdit = (shift) => {
    setEditingShift(shift);
    setFormData({
      staffId: shift.staff._id,
      date: shift.date,
      startTime: shift.startTime,
      endTime: shift.endTime,
      position: shift.position,
      notes: shift.notes,
    });
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this shift?')) {
      setShifts(shifts.filter((shift) => shift._id !== id));
    }
  };

  const handleCheckIn = (shiftId) => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);

    setShifts(
      shifts.map((shift) =>
        shift._id === shiftId
          ? {
              ...shift,
              checkedIn: true,
              actualStartTime: currentTime,
              status: 'active',
            }
          : shift
      )
    );
  };

  const handleCheckOut = (shiftId) => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);

    setShifts(
      shifts.map((shift) =>
        shift._id === shiftId
          ? {
              ...shift,
              checkedOut: true,
              actualEndTime: currentTime,
              status: 'completed',
            }
          : shift
      )
    );
  };

  const positions = [
    'Server',
    'Chef',
    'Cashier',
    'Kitchen Assistant',
    'Manager',
    'Bartender',
  ];
  const todayShifts = shifts.filter(
    (shift) => shift.date === new Date().toISOString().split('T')[0]
  );
  const activeShifts = todayShifts.filter(
    (shift) => getShiftStatus(shift) === 'active'
  );
  const scheduledShifts = todayShifts.filter(
    (shift) => getShiftStatus(shift) === 'scheduled'
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shifts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Shift Management
          </h1>
          <p className="text-gray-600">
            {userRole === 'admin'
              ? 'Manage staff shifts and schedules'
              : 'View your shifts and check in/out'}
          </p>
        </div>

        {/* Role Toggle (for demo) */}
        <div className="mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setUserRole('admin')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                userRole === 'admin'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Admin View
            </button>
            <button
              onClick={() => setUserRole('staff')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                userRole === 'staff'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Staff View
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Today's Shifts
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {todayShifts.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Now</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeShifts.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {scheduledShifts.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900">
                  {staff.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search staff or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            {userRole === 'admin' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Shift
              </button>
            )}
          </div>
        </div>

        {/* Shifts Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Staff
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scheduled Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actual Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredShifts.map((shift) => {
                  const status = getShiftStatus(shift);
                  const isCurrentUser = shift.staff._id === currentUserId;
                  const canCheckIn = status === 'current' && !shift.checkedIn;
                  const canCheckOut = shift.checkedIn && !shift.checkedOut;

                  return (
                    <tr key={shift._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {shift.staff.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {shift.staff.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(shift.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {shift.startTime} - {shift.endTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shift.actualStartTime && shift.actualEndTime
                          ? `${shift.actualStartTime} - ${shift.actualEndTime}`
                          : shift.actualStartTime
                          ? `${shift.actualStartTime} - Working`
                          : 'Not started'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {shift.position}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            status
                          )}`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {userRole === 'staff' && isCurrentUser && (
                            <>
                              {canCheckIn && (
                                <button
                                  onClick={() => handleCheckIn(shift._id)}
                                  className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                                >
                                  Check In
                                </button>
                              )}
                              {canCheckOut && (
                                <button
                                  onClick={() => handleCheckOut(shift._id)}
                                  className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                                >
                                  Check Out
                                </button>
                              )}
                            </>
                          )}

                          {userRole === 'admin' && (
                            <>
                              <button
                                onClick={() => handleEdit(shift)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(shift._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showAddModal && userRole === 'admin' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingShift ? 'Edit Shift' : 'Add New Shift'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Staff Member
                  </label>
                  <select
                    value={formData.staffId}
                    onChange={(e) =>
                      setFormData({ ...formData, staffId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select staff member</option>
                    {staff.map((member) => (
                      <option key={member._id} value={member._id}>
                        {member.name} - {member.position}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) =>
                        setFormData({ ...formData, startTime: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) =>
                        setFormData({ ...formData, endTime: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select position</option>
                    {positions.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional notes for this shift..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingShift(null);
                      setFormData({
                        staffId: '',
                        date: '',
                        startTime: '',
                        endTime: '',
                        position: '',
                        notes: '',
                      });
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                  >
                    {editingShift ? 'Update' : 'Add'} Shift
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShiftManagement;
