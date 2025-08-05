import React, { useState, useEffect } from 'react';
import {
  Users, Building2, UserCheck, Search, Filter, MoreVertical, Edit, Trash2, Eye,
  Mail, Phone, Calendar, Shield, CheckCircle, XCircle, AlertTriangle, Download,
  Plus, RefreshCw, ChevronDown, ChevronUp
} from 'lucide-react';
import { axiosInstance } from '../../lib/axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchUsers();
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      let response;
      switch (activeTab) {
        case 'students':
          response = await axiosInstance.get('/admin/users/students');
          setUsers(response.data || []);
          break;
        case 'companies':
          response = await axiosInstance.get('/admin/users/companies');
          setCompanies(response.data || []);
          break;
        case 'recruiters':
          response = await axiosInstance.get('/admin/users/recruiters');
          setRecruiters(response.data || []);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      // Set empty arrays if API fails
      switch (activeTab) {
        case 'students':
          setUsers([]);
          break;
        case 'companies':
          setCompanies([]);
          break;
        case 'recruiters':
          setRecruiters([]);
          break;
        default:
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId, action) => {
    try {
      await axiosInstance.post(`/admin/users/${userId}/${action}`);
      fetchUsers();
    } catch (error) {
      console.error('Error performing user action:', error);
    }
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'students':
        return users;
      case 'companies':
        return companies;
      case 'recruiters':
        return recruiters;
      default:
        return [];
    }
  };

  const filteredData = getCurrentData().filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(searchLower) ||
      item.email?.toLowerCase().includes(searchLower) ||
      item.phone?.toLowerCase().includes(searchLower)
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortBy] || '';
    const bValue = b[sortBy] || '';
    
    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const TabButton = ({ id, label, icon: Icon, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
        activeTab === id
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
      {count > 0 && (
        <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
          {count}
        </span>
      )}
    </button>
  );

  const UserCard = ({ user, type }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <div className="ml-2 flex items-center">
              {user.isActive ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">{user.email}</p>
          {user.phone && (
            <p className="text-sm text-gray-600 mb-2">{user.phone}</p>
          )}
          {type === 'companies' && (
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Industry:</span> {user.industry}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Location:</span> {user.headquarters}
              </p>
            </div>
          )}
          {type === 'recruiters' && (
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Company:</span> {user.company}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Role:</span> {user.role}
              </p>
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedUser({ ...user, type });
              setShowUserModal(true);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleUserAction(user._id, user.isActive ? 'deactivate' : 'activate')}
            className={`p-2 rounded-lg transition-colors ${
              user.isActive
                ? 'text-red-600 hover:bg-red-50'
                : 'text-green-600 hover:bg-green-50'
            }`}
          >
            {user.isActive ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );

  const UserModal = ({ isOpen, onClose, user }) => {
    if (!isOpen || !user) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">User Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><span className="font-medium">Status:</span> 
                  <span className={`ml-2 ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </p>
                {user.phone && <p><span className="font-medium">Phone:</span> {user.phone}</p>}
                <p><span className="font-medium">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              {user.type === 'companies' && (
                <div>
                  <p><span className="font-medium">Industry:</span> {user.industry}</p>
                  <p><span className="font-medium">Location:</span> {user.headquarters}</p>
                  <p><span className="font-medium">Website:</span> {user.website}</p>
                </div>
              )}
              {user.type === 'recruiters' && (
                <div>
                  <p><span className="font-medium">Company:</span> {user.company}</p>
                  <p><span className="font-medium">Role:</span> {user.role}</p>
                  <p><span className="font-medium">Department:</span> {user.department}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage students, companies, and recruiters</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex space-x-2">
              <TabButton
                id="students"
                label="Students"
                icon={Users}
                count={users.length}
              />
              <TabButton
                id="companies"
                label="Companies"
                icon={Building2}
                count={companies.length}
              />
              <TabButton
                id="recruiters"
                label="Recruiters"
                icon={UserCheck}
                count={recruiters.length}
              />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="createdAt">Date Joined</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <button
                  onClick={fetchUsers}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedData.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms' : 'No users in this category'}
              </p>
            </div>
          ) : (
            sortedData.map((user) => (
              <UserCard key={user._id} user={user} type={activeTab} />
            ))
          )}
        </div>

        {/* User Modal */}
        <UserModal
          isOpen={showUserModal}
          onClose={() => {
            setShowUserModal(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
        />
      </div>
    </div>
  );
};

export default UserManagement;