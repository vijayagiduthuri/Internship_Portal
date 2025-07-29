import React, { useState } from 'react';
import { 
  Briefcase, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Users, 
  Bell,
  TrendingUp,
  Award,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Timer,
  Star,
  FileText
} from 'lucide-react';

const UserAnalyticsDashboard = () => {
  // Mock analytics data
  const analyticsData = {
    totalApplications: 24,
    thisMonth: 8,
    responseRate: 67,
    averageResponseTime: 5.2,
    interviewConversionRate: 35,
    successRate: 12.5,
    activeApplications: 15,
    completedApplications: 9,
    weeklyActivity: [5, 8, 12, 6, 9, 11, 7],
    monthlyTrend: [15, 18, 22, 24],
    applicationsByStatus: {
      applied: 10,
      interview: 6,
      selected: 3,
      rejected: 5
    },
    skillsInDemand: [
      { skill: 'React', percentage: 75 },
      { skill: 'Python', percentage: 68 },
      { skill: 'JavaScript', percentage: 82 },
      { skill: 'SQL', percentage: 45 },
      { skill: 'Machine Learning', percentage: 38 }
    ],
    interviewPerformance: {
      scheduled: 12,
      completed: 8,
      passed: 5,
      pending: 4
    },
    timeToResponse: {
      '0-2 days': 8,
      '3-7 days': 12,
      '1-2 weeks': 6,
      '2+ weeks': 3
    }
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color, bgColor, trend = null }) => (
    <div className="bg-white rounded-xl p-6 hover:shadow-[0_25px_50px_-12px_rgba(98,0,128,0.3)] transition-all duration-300 relative overflow-hidden" style={{ boxShadow: '0 20px 25px -5px rgba(98, 0, 128, 0.2), 0 10px 10px -5px rgba(98, 0, 128, 0.1)' }}>
      <div className="flex items-center justify-between relative z-10">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-center">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {trend && (
              <span className={`ml-2 text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            )}
          </div>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 rounded-lg ml-4" style={{ backgroundColor: bgColor }}>
          <Icon size={24} style={{ color: color }} />
        </div>
      </div>
    </div>
  );

  const ProgressBar = ({ label, value, maxValue, color }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="h-2 rounded-full transition-all duration-300" 
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );

  const ActivityChart = ({ data, title }) => (
    <div className="bg-white rounded-xl p-6 hover:shadow-[0_25px_50px_-12px_rgba(98,0,128,0.3)] transition-all duration-300" style={{ boxShadow: '0 20px 25px -5px rgba(98, 0, 128, 0.2), 0 10px 10px -5px rgba(98, 0, 128, 0.1)' }}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      <div className="flex items-end justify-between h-32 space-x-2">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-purple-500 rounded-t-sm transition-all duration-300 hover:bg-purple-600"
              style={{ height: `${(value / Math.max(...data)) * 100}%`, minHeight: '8px' }}
            />
            <span className="text-xs text-gray-500 mt-2">
              {title.includes('Weekly') ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index] : `M${index + 1}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const PieChartSection = ({ data, title }) => {
    const total = Object.values(data).reduce((sum, val) => sum + val, 0);
    const colors = {
      applied: '#3b82f6',
      interview: '#f59e0b', 
      selected: '#10b981',
      rejected: '#ef4444'
    };

    return (
      <div className="bg-white rounded-xl p-6 hover:shadow-[0_25px_50px_-12px_rgba(98,0,128,0.3)] transition-all duration-300" style={{ boxShadow: '0 20px 25px -5px rgba(98, 0, 128, 0.2), 0 10px 10px -5px rgba(98, 0, 128, 0.1)' }}>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
        <div className="space-y-4">
          {Object.entries(data).map(([status, count]) => {
            const percentage = ((count / total) * 100).toFixed(1);
            return (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: colors[status] }}
                  />
                  <span className="text-sm font-medium text-gray-700 capitalize">{status}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{count}</span>
                  <span className="text-xs text-gray-500 ml-1">({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Floating bubble animation component
  const FloatingBubbles = () => {
    const bubbles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 50 + 25,
      left: Math.random() * 100,
      delay: Math.random() * 25,
      duration: Math.random() * 12 + 18,
    }));

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full opacity-15"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              background: `linear-gradient(45deg, #6b21a8, #a21caf, #be185d)`,
              animation: `float ${bubble.duration}s infinite linear`,
              animationDelay: `${bubble.delay}s`,
            }}
          />
        ))}
        <style jsx>{`
          @keyframes float {
            0% {
              transform: translateY(100vh) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.15;
            }
            90% {
              opacity: 0.15;
            }
            100% {
              transform: translateY(-100px) rotate(360deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white relative">
      <FloatingBubbles />
      
      <div className="p-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="rounded-2xl p-6 relative overflow-hidden" style={{ backgroundColor: '#620080', boxShadow: '0 20px 25px -5px rgba(98, 0, 128, 0.3), 0 10px 10px -5px rgba(98, 0, 128, 0.2)' }}>
              <div className="absolute top-0 left-0 w-full h-2" style={{ background: 'linear-gradient(90deg, #500066 0%, #7300a3 100%)' }}></div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
                  <p className="text-purple-100 mt-1">Track your application performance and insights</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="relative p-2 text-white hover:text-purple-100 bg-purple-700 rounded-lg hover:bg-purple-800 transition-all duration-300">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      3
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Applications"
              value={analyticsData.totalApplications}
              subtitle="All time"
              icon={Briefcase}
              color="#620080"
              bgColor="#f3e8ff"
              trend={12}
            />
            <StatCard
              title="This Month"
              value={analyticsData.thisMonth}
              subtitle="Applications sent"
              icon={Calendar}
              color="#3b82f6"
              bgColor="#dbeafe"
              trend={25}
            />
            <StatCard
              title="Response Rate"
              value={`${analyticsData.responseRate}%`}
              subtitle="Companies responded"
              icon={TrendingUp}
              color="#10b981"
              bgColor="#d1fae5"
              trend={8}
            />
            <StatCard
              title="Success Rate"
              value={`${analyticsData.successRate}%`}
              subtitle="Offers received"
              icon={Target}
              color="#f59e0b"
              bgColor="#fef3c7"
              trend={-3}
            />
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Avg Response Time"
              value={`${analyticsData.averageResponseTime} days`}
              subtitle="From application to response"
              icon={Timer}
              color="#8b5cf6"
              bgColor="#f3e8ff"
            />
            <StatCard
              title="Interview Rate"
              value={`${analyticsData.interviewConversionRate}%`}
              subtitle="Applications to interviews"
              icon={Users}
              color="#06b6d4"
              bgColor="#cffafe"
            />
            <StatCard
              title="Active Applications"
              value={analyticsData.activeApplications}
              subtitle="Pending responses"
              icon={Clock}
              color="#f97316"
              bgColor="#fed7aa"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ActivityChart 
              data={analyticsData.weeklyActivity} 
              title="Weekly Application Activity" 
            />
            <ActivityChart 
              data={analyticsData.monthlyTrend} 
              title="Monthly Application Trend" 
            />
          </div>

          {/* Application Status Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <PieChartSection 
              data={analyticsData.applicationsByStatus}
              title="Application Status Breakdown"
            />
            
            {/* Skills in Demand */}
            <div className="bg-white rounded-xl p-6 hover:shadow-[0_25px_50px_-12px_rgba(98,0,128,0.3)] transition-all duration-300" style={{ boxShadow: '0 20px 25px -5px rgba(98, 0, 128, 0.2), 0 10px 10px -5px rgba(98, 0, 128, 0.1)' }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Skills in Demand</h3>
              <div className="space-y-4">
                {analyticsData.skillsInDemand.map((skill, index) => (
                  <ProgressBar
                    key={index}
                    label={skill.skill}
                    value={skill.percentage}
                    color="#620080"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Interview Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 hover:shadow-[0_25px_50px_-12px_rgba(98,0,128,0.3)] transition-all duration-300" style={{ boxShadow: '0 20px 25px -5px rgba(98, 0, 128, 0.2), 0 10px 10px -5px rgba(98, 0, 128, 0.1)' }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Interview Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg" style={{ boxShadow: '0 8px 15px -3px rgba(98, 0, 128, 0.15)' }}>
                  <p className="text-2xl font-bold text-blue-600">{analyticsData.interviewPerformance.scheduled}</p>
                  <p className="text-sm text-gray-600">Scheduled</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg" style={{ boxShadow: '0 8px 15px -3px rgba(98, 0, 128, 0.15)' }}>
                  <p className="text-2xl font-bold text-green-600">{analyticsData.interviewPerformance.completed}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg" style={{ boxShadow: '0 8px 15px -3px rgba(98, 0, 128, 0.15)' }}>
                  <p className="text-2xl font-bold text-yellow-600">{analyticsData.interviewPerformance.passed}</p>
                  <p className="text-sm text-gray-600">Passed</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg" style={{ boxShadow: '0 8px 15px -3px rgba(98, 0, 128, 0.15)' }}>
                  <p className="text-2xl font-bold text-purple-600">{analyticsData.interviewPerformance.pending}</p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
            </div>

            {/* Response Time Distribution */}
            <div className="bg-white rounded-xl p-6 hover:shadow-[0_25px_50px_-12px_rgba(98,0,128,0.3)] transition-all duration-300" style={{ boxShadow: '0 20px 25px -5px rgba(98, 0, 128, 0.2), 0 10px 10px -5px rgba(98, 0, 128, 0.1)' }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Response Time Distribution</h3>
              <div className="space-y-4">
                {Object.entries(analyticsData.timeToResponse).map(([timeRange, count]) => {
                  const total = Object.values(analyticsData.timeToResponse).reduce((sum, val) => sum + val, 0);
                  const percentage = ((count / total) * 100).toFixed(1);
                  return (
                    <div key={timeRange} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{timeRange}</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="h-2 bg-purple-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-900 w-8">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Insights & Recommendations */}
          <div className="bg-white rounded-xl p-6 hover:shadow-[0_25px_50px_-12px_rgba(98,0,128,0.3)] transition-all duration-300" style={{ boxShadow: '0 20px 25px -5px rgba(98, 0, 128, 0.2), 0 10px 10px -5px rgba(98, 0, 128, 0.1)' }}>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Insights & Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 rounded-lg" style={{ boxShadow: '0 10px 20px -5px rgba(98, 0, 128, 0.2)' }}>
                <div className="flex items-center mb-2">
                  <CheckCircle size={20} className="text-green-600 mr-2" />
                  <h4 className="font-semibold text-green-900">Strong Performance</h4>
                </div>
                <p className="text-sm text-green-700">Your response rate is above average. Keep applying to similar positions.</p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg" style={{ boxShadow: '0 10px 20px -5px rgba(98, 0, 128, 0.2)' }}>
                <div className="flex items-center mb-2">
                  <Star size={20} className="text-yellow-600 mr-2" />
                  <h4 className="font-semibold text-yellow-900">Skill Focus</h4>
                </div>
                <p className="text-sm text-yellow-700">JavaScript skills are in high demand. Consider highlighting them more.</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg" style={{ boxShadow: '0 10px 20px -5px rgba(98, 0, 128, 0.2)' }}>
                <div className="flex items-center mb-2">
                  <TrendingUp size={20} className="text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-900">Growth Opportunity</h4>
                </div>
                <p className="text-sm text-blue-700">Your application volume has increased 25% this month. Great momentum!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalyticsDashboard;