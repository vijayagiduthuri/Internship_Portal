import React, { useState, useEffect } from 'react';
import {
  Briefcase, Building2, Calendar, MapPin, DollarSign, Users, Search, Filter,
  MoreVertical, Edit, Trash2, Eye, CheckCircle, XCircle, AlertTriangle, Download,
  Plus, RefreshCw, ChevronDown, ChevronUp, Clock, Star, FileText, ExternalLink
} from 'lucide-react';
import { axiosInstance } from '../../lib/axios';

const InternshipManagement = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showInternshipModal, setShowInternshipModal] = useState(false);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/internships');
      setInternships(response.data || []);
    } catch (error) {
      console.error('Error fetching internships:', error);
      setInternships([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInternshipAction = async (internshipId, action) => {
    try {
      await axiosInstance.post(`/admin/internships/${internshipId}/${action}`);
      fetchInternships();
    } catch (error) {
      console.error('Error performing internship action:', error);
    }
  };

  const filteredInternships = internships.filter(internship => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      internship.title?.toLowerCase().includes(searchLower) ||
      internship.company?.toLowerCase().includes(searchLower) ||
      internship.location?.toLowerCase().includes(searchLower);
    
    const matchesStatus = filterStatus === 'all' || internship.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const sortedInternships = [...filteredInternships].sort((a, b) => {
    const aValue = a[sortBy] || '';
    const bValue = b[sortBy] || '';
    
    if (sortBy === 'createdAt' || sortBy === 'deadline') {
      return sortOrder === 'asc' 
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const InternshipCard = ({ internship }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{internship.title}</h3>
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(internship.status)}`}>
              {internship.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{internship.company}</p>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              {internship.location}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="w-4 h-4 mr-1" />
              {internship.salary || 'Not specified'}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Posted: {new Date(internship.createdAt).toLocaleDateString()}</span>
            <span>{internship.applications || 0} applications</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedInternship(internship);
              setShowInternshipModal(true);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleInternshipAction(internship._id, internship.isActive ? 'deactivate' : 'activate')}
            className={`p-2 rounded-lg transition-colors ${
              internship.isActive
                ? 'text-red-600 hover:bg-red-50'
                : 'text-green-600 hover:bg-green-50'
            }`}
          >
            {internship.isActive ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );

  const InternshipModal = ({ isOpen, onClose, internship }) => {
    if (!isOpen || !internship) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Internship Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{internship.title}</h3>
              <p className="text-lg text-gray-600 mb-4">{internship.company}</p>
              <p className="text-gray-700">{internship.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="font-medium">Location:</span>
                  <span className="ml-2">{internship.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="font-medium">Salary:</span>
                  <span className="ml-2">{internship.salary || 'Not specified'}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="font-medium">Duration:</span>
                  <span className="ml-2">{internship.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="font-medium">Positions:</span>
                  <span className="ml-2">{internship.positions || 1}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="font-medium">Posted:</span>
                  <span className="ml-2">{new Date(internship.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="font-medium">Deadline:</span>
                  <span className="ml-2">{new Date(internship.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="font-medium">Applications:</span>
                  <span className="ml-2">{internship.applications || 0}</span>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(internship.status)}`}>
                    {internship.status}
                  </span>
                </div>
              </div>
            </div>
            
            {internship.requirements && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {internship.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {internship.responsibilities && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Responsibilities</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {internship.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}
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
          <p className="mt-4 text-gray-600">Loading internships...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Internship Management</h1>
          <p className="text-gray-600">Manage and monitor internship postings</p>
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
                    placeholder="Search internships..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="createdAt">Date Posted</option>
                  <option value="title">Title</option>
                  <option value="company">Company</option>
                  <option value="deadline">Deadline</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <button
                  onClick={fetchInternships}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedInternships.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No internships found</h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== 'all' ? 'Try adjusting your search or filters' : 'No internships available'}
              </p>
            </div>
          ) : (
            sortedInternships.map((internship) => (
              <InternshipCard key={internship._id} internship={internship} />
            ))
          )}
        </div>

        {/* Internship Modal */}
        <InternshipModal
          isOpen={showInternshipModal}
          onClose={() => {
            setShowInternshipModal(false);
            setSelectedInternship(null);
          }}
          internship={selectedInternship}
        />
      </div>
    </div>
  );
};

export default InternshipManagement; 