import React, { useState, useEffect } from 'react';
import {
  Users, Building2, Briefcase, FileText, CheckCircle, XCircle, Clock, TrendingUp,
  BarChart3, Settings, Shield, AlertTriangle, Eye, Edit, Trash2, Plus, Search,
  Filter, Download, RefreshCw
} from 'lucide-react';
import { axiosInstance } from '../../lib/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    activeInternships: 0,
    pendingApprovals: 0,
    totalApplications: 0
  });
  const [pendingCompanies, setPendingCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showCompanyModal, setShowCompanyModal] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, companiesResponse] = await Promise.all([
        axiosInstance.get('/admin/admin-stats'),
        axiosInstance.get('/admin/pending-companies')
      ]);
      
      setStats(statsResponse.data);
      setPendingCompanies(companiesResponse.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set default values if API fails
      setStats({
        totalCompanies: 0,
        activeInternships: 0,
        pendingApprovals: 0,
        totalApplications: 0
      });
      setPendingCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCompanyVerification = async (companyId, verify) => {
    try {
      await axiosInstance.post(`/admin/verify-company/${companyId}/${verify}`);
      fetchDashboardData();
      setShowCompanyModal(false);
      setSelectedCompany(null);
    } catch (error) {
      console.error('Error verifying company:', error);
    }
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color, bgColor, trend = null }) => (
    <div className={`p-6 rounded-xl shadow-sm border ${bgColor} ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {subtitle && <p className="text-sm opacity-70 mt-1">{subtitle}</p>}
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${bgColor} bg-opacity-20`}>
          {Icon && <Icon className="w-8 h-8" />}
        </div>
      </div>
    </div>
  );

  const CompanyCard = ({ company }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{company.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{company.description}</p>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Industry:</span> {company.industry}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Location:</span> {company.headquarters}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Email:</span> {company.email}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedCompany(company);
              setShowCompanyModal(true);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const CompanyModal = ({ isOpen, onClose, company, onVerify }) => {
    if (!isOpen || !company) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Company Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
              <p className="text-gray-600 mt-1">{company.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><span className="font-medium">Industry:</span> {company.industry}</p>
                <p><span className="font-medium">Location:</span> {company.headquarters}</p>
                <p><span className="font-medium">Email:</span> {company.email}</p>
              </div>
              <div>
                <p><span className="font-medium">Website:</span> {company.website}</p>
                <p><span className="font-medium">HR Contact:</span> {company.hrContact}</p>
                <p><span className="font-medium">Registered:</span> {new Date(company.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4 border-t">
              <button
                onClick={() => onVerify(company._id, 'true')}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </button>
              <button
                onClick={() => onVerify(company._id, 'false')}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </button>
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
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your internship portal</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Companies"
            value={stats.totalCompanies}
            icon={Building2}
            color="text-blue-600"
            bgColor="bg-blue-50"
            trend="+12% this month"
          />
          <StatCard
            title="Active Internships"
            value={stats.activeInternships}
            icon={Briefcase}
            color="text-green-600"
            bgColor="bg-green-50"
            trend="+8% this month"
          />
          <StatCard
            title="Pending Approvals"
            value={stats.pendingApprovals}
            icon={Clock}
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
          <StatCard
            title="Total Applications"
            value={stats.totalApplications}
            icon={FileText}
            color="text-purple-600"
            bgColor="bg-purple-50"
            trend="+15% this month"
          />
        </div>

        {/* Pending Companies Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Pending Company Verifications</h2>
                <p className="text-gray-600 mt-1">
                  {pendingCompanies.length} companies waiting for approval
                </p>
              </div>
              <button
                onClick={fetchDashboardData}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {pendingCompanies.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pending verifications</h3>
                <p className="text-gray-600">All companies have been processed</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pendingCompanies.map((company) => (
                  <CompanyCard key={company._id} company={company} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Company Modal */}
        <CompanyModal
          isOpen={showCompanyModal}
          onClose={() => {
            setShowCompanyModal(false);
            setSelectedCompany(null);
          }}
          company={selectedCompany}
          onVerify={handleCompanyVerification}
        />
      </div>
    </div>
  );
};

export default AdminDashboard; 