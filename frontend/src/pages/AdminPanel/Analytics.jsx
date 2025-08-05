import React, { useState, useEffect } from 'react';
import {
  BarChart3, TrendingUp, Users, Building2, Briefcase, FileText, Calendar,
  MapPin, DollarSign, Star, Download, RefreshCw, ChevronDown, ChevronUp,
  PieChart, Activity, Target, Award, Clock, CheckCircle, XCircle, AlertTriangle
} from 'lucide-react';
import { axiosInstance } from '../../lib/axios';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    overview: {},
    trends: [],
    topCompanies: [],
    topInternships: [],
    applicationsByMonth: [],
    userGrowth: [],
    locationStats: [],
    industryStats: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('applications');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/admin/analytics?range=${timeRange}`);
      setAnalytics(response.data || {});
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Set default values if API fails
      setAnalytics({
        overview: {
          totalUsers: 0,
          totalCompanies: 0,
          totalInternships: 0,
          totalApplications: 0
        },
        trends: [],
        topCompanies: [],
        topInternships: [],
        applicationsByMonth: [],
        userGrowth: [],
        locationStats: [],
        industryStats: []
      });
    } finally {
      setLoading(false);
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

  const ChartCard = ({ title, children, className = "" }) => (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  const SimpleBarChart = ({ data, height = 200 }) => {
    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-48 text-gray-500">
          <p>No data available</p>
        </div>
      );
    }

    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{item.label}</span>
                <span className="text-gray-600">{item.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const PieChartComponent = ({ data, title }) => {
    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-48 text-gray-500">
          <p>No data available</p>
        </div>
      );
    }

    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

    return (
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const TopList = ({ title, items, icon: Icon, maxItems = 5 }) => {
    if (!items || items.length === 0) {
      return (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500">No data available</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <div className="space-y-2">
          {items.slice(0, maxItems).map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Icon className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">{item.name}</span>
              </div>
              <span className="text-sm text-gray-600">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600">Track performance and insights</p>
            </div>
            <div className="flex space-x-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button
                onClick={fetchAnalytics}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={analytics.overview?.totalUsers || 0}
            icon={Users}
            color="text-blue-600"
            bgColor="bg-blue-50"
            trend="+15% this month"
          />
          <StatCard
            title="Total Companies"
            value={analytics.overview?.totalCompanies || 0}
            icon={Building2}
            color="text-green-600"
            bgColor="bg-green-50"
            trend="+8% this month"
          />
          <StatCard
            title="Active Internships"
            value={analytics.overview?.totalInternships || 0}
            icon={Briefcase}
            color="text-purple-600"
            bgColor="bg-purple-50"
            trend="+12% this month"
          />
          <StatCard
            title="Total Applications"
            value={analytics.overview?.totalApplications || 0}
            icon={FileText}
            color="text-orange-600"
            bgColor="bg-orange-50"
            trend="+20% this month"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Application Trends */}
          <ChartCard title="Application Trends">
            <SimpleBarChart data={analytics.applicationsByMonth} />
          </ChartCard>

          {/* User Growth */}
          <ChartCard title="User Growth">
            <SimpleBarChart data={analytics.userGrowth} />
          </ChartCard>
        </div>

        {/* Top Lists and Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Top Companies */}
          <ChartCard title="Top Companies">
            <TopList
              title="By Applications"
              items={analytics.topCompanies}
              icon={Building2}
            />
          </ChartCard>

          {/* Top Internships */}
          <ChartCard title="Popular Internships">
            <TopList
              title="Most Applied"
              items={analytics.topInternships}
              icon={Briefcase}
            />
          </ChartCard>

          {/* Location Distribution */}
          <ChartCard title="Location Distribution">
            <PieChartComponent
              data={analytics.locationStats}
              title="Applications by Location"
            />
          </ChartCard>
        </div>

        {/* Industry and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Industry Breakdown */}
          <ChartCard title="Industry Breakdown">
            <PieChartComponent
              data={analytics.industryStats}
              title="Companies by Industry"
            />
          </ChartCard>

          {/* Recent Activity */}
          <ChartCard title="Recent Activity">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">New company registered</p>
                  <p className="text-xs text-gray-600">TechCorp Inc. joined the platform</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">New internship posted</p>
                  <p className="text-xs text-gray-600">Software Developer at Google</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">New application received</p>
                  <p className="text-xs text-gray-600">John Doe applied for Data Science</p>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 