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
  FileText,
  X,
  Check,
  AlertCircle,
  UserCheck,
  MessageSquare,
  Mail
} from 'lucide-react';

const UserAnalyticsDashboard = () => {
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'application_update',
      title: 'Application Status Update',
      message: 'Your application at Tech Corp has been moved to interview stage',
      time: '2 hours ago',
      isRead: false,
      icon: UserCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      type: 'interview_scheduled',
      title: 'Interview Scheduled',
      message: 'Interview scheduled for tomorrow at 2:00 PM with StartupXYZ',
      time: '5 hours ago',
      isRead: false,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      type: 'application_rejected',
      title: 'Application Update',
      message: 'Unfortunately, your application at DataCorp was not selected',
      time: '1 day ago',
      isRead: true,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 4,
      type: 'message',
      title: 'New Message',
      message: 'HR Manager from InnovateLab sent you a message',
      time: '1 day ago',
      isRead: false,
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 5,
      type: 'application_received',
      title: 'Application Received',
      message: 'Your application to WebDev Solutions has been received',
      time: '2 days ago',
      isRead: true,
      icon: Mail,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 6,
      type: 'profile_viewed',
      title: 'Profile Viewed',
      message: '3 companies viewed your profile this week',
      time: '3 days ago',
      isRead: true,
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ]);

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

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const toggleNotificationPanel = () => {
    setIsNotificationPanelOpen(!isNotificationPanelOpen);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color, bgColor, trend = null }) => (
    <div className="bg-white rounded-xl p-4 sm:p-6 hover:shadow-[0_25px_50px_-12px_rgba(98,0,128,0.3)] transition-all duration-300 relative overflow-hidden" style={{ boxShadow: '0 20px 25px -5px rgba(98, 0, 128, 0.2), 0 10px 10px -5px rgba(98, 0, 128, 0.1)' }}>
      <div className="flex items-center justify-between relative z-10">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
          <div className="flex items-center">
            <p className="text-xl sm:text-3xl font-bold text-gray-900">{value}</p>
            {trend && (
              <span className={`ml-2 text-xs sm:text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">{subtitle}</p>}
        </div>
        <div className="p-2 sm:p-3 rounded-lg ml-2 sm:ml-4 flex-shrink-0" style={{ backgroundColor: bgColor }}>
          <Icon size={20} className="sm:w-6 sm:h-6" style={{ color: color }} />
        </div>
      </div>
    </div>
  );

  const ProgressBar = ({ label, value, maxValue, color }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">{label}</span>
        <span className="text-xs sm:text-sm text-gray-600 flex-shrink-0">{value}%</span>
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
    <div className="bg-white rounded-xl p-4 sm:p-6 hover:shadow-[0_25px_50px_-12px_rgba(98,0,128,0.3)] transition-all duration-300" style={{ boxShadow: '0 20px 25px -5px rgba(98, 0, 128, 0.2), 0 10px 10px -5px rgba(98, 0, 128, 0.1)' }}>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">{title}</h3>
      <div className="flex items-end justify-between h-24 sm:h-32 space-x-1 sm:space-x-2">
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
      <div className="bg-white rounded-xl p-4 sm:p-6 hover:shadow-[0_25px_50px_-12px_rgba(98,0,128,0.3)] transition-all duration-300" style={{ boxShadow: '0 20px 25px -5px rgba(98, 0, 128, 0.2), 0 10px 10px -5px rgba(98, 0, 128, 0.1)' }}>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">{title}</h3>
        <div className="space-y-4">
          {Object.entries(data).map(([status, count]) => {
            const percentage = ((count / total) * 100).toFixed(1);
            return (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center min-w-0 flex-1">
                  <div 
                    className="w-3 h-3 rounded-full mr-3 flex-shrink-0"
                    style={{ backgroundColor: colors[status] }}
                  />
                  <span className="text-xs sm:text-sm font-medium text-gray-700 capitalize truncate">{status}</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-gray-900">{count}</span>
                  <span className="text-xs text-gray-500 ml-1">({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Notification Panel Component
  const NotificationPanel = () => (
    <div className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
      isNotificationPanelOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      {/* Panel Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200" style={{ background: 'linear-gradient(135deg, #620080 0%, #5a007a 100%)' }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Notifications</h2>
            <p className="text-purple-100 text-sm">{unreadCount} unread messages</p>
          </div>
          <button 
            onClick={toggleNotificationPanel}
            className="p-2 text-white hover:text-purple-100 hover:bg-purple-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Mark all as read button */}
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="mt-3 text-sm text-purple-100 hover:text-white underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto h-full pb-20">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 p-4">
            <Bell size={48} className="mb-4 opacity-50" />
            <p className="text-lg">No notifications yet</p>
            <p className="text-sm text-center">We'll notify you when something happens</p>
          </div>
        ) : (
          <div className="p-3 sm:p-4 space-y-3">
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div 
                  key={notification.id}
                  className={`p-3 sm:p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    notification.isRead 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-white border-purple-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${notification.bgColor}`}>
                      <IconComponent size={16} className={notification.color} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-semibold truncate ${
                          notification.isRead ? 'text-gray-700' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <p className={`text-sm ${
                        notification.isRead ? 'text-gray-500' : 'text-gray-700'
                      }`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-400">
                          {notification.time}
                        </p>
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <NotificationPanel />
      
      <div className={`p-3 sm:p-6 transition-all duration-300 ${
        isNotificationPanelOpen ? 'lg:mr-96' : ''
      }`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="rounded-2xl p-4 sm:p-6 relative overflow-hidden" style={{ backgroundColor: '#620080', boxShadow: '0 20px 25px -5px rgba(98, 0, 128, 0.3), 0 10px 10px -5px rgba(98, 0, 128, 0.2)' }}>
              <div className="absolute top-0 left-0 w-full h-2" style={{ background: 'linear-gradient(90deg, #500066 0%, #7300a3 100%)' }}></div>
              
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-3xl font-bold text-white truncate">Analytics Dashboard</h1>
                  <p className="text-purple-100 mt-1 text-sm sm:text-base">Track your application performance and insights</p>
                </div>
                <div className="flex items-center space-x-4 flex-shrink-0">
                  <button 
                    onClick={toggleNotificationPanel}
                    className="relative p-2 text-white hover:text-purple-100 bg-purple-700 rounded-lg hover:bg-purple-800 transition-all duration-300"
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <PieChartSection 
              data={analyticsData.applicationsByStatus}
              title="Application Status Breakdown"
            />
            
            {/* Skills in Demand */}
            <div className="bg-white rounded-xl p-4 sm:p-6 hover:shadow-[0_25px_50px_-12px_rgba(98,0,128,0.3)] transition-all duration-300" style={{ boxShadow: '0 20px 25px -5px rgba(98, 0, 128, 0.2), 0 10px 10px -5px rgba(98, 0, 128, 0.1)' }}>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Skills in Demand</h3>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-xl p-4 sm:p-6 hover:shadow-[0_25px_50px_-12px_rgba(98,0,128,0.3)] transition-all duration-300" style={{ boxShadow: '0 20px 25px -5px rgba(98, 0, 128, 0.2), 0 10px 10px -5px rgba(98, 0, 128, 0.1)' }}>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Interview Performance</h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg" style={{ boxShadow: '0 8px 15px -3px rgba(98, 0, 128, 0.15)' }}>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">{analyticsData.interviewPerformance.scheduled}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Scheduled</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg" style={{ boxShadow: '0 8px 15px -3px rgba(98, 0, 128, 0.15)' }}>
                  <p className="text-xl sm:text-2xl font-bold text-green-600">{analyticsData.interviewPerformance.completed}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Completed</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-yellow-50 rounded-lg" style={{ boxShadow: '0 8px 15px -3px rgba(98, 0, 128, 0.15)' }}>
                  <p className="text-xl sm:text-2xl font-bold text-yellow-600">{analyticsData.interviewPerformance.passed}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Passed</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-lg" style={{ boxShadow: '0 8px 15px -3px rgba(98, 0, 128, 0.15)' }}>
                  <p className="text-xl sm:text-2xl font-bold text-purple-600">{analyticsData.interviewPerformance.pending}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Pending</p>
                </div>
              </div>
            </div>

            {/* Response Time Distribution */}
            <div className="bg-white rounded-xl p-4 sm:p-6 hover:shadow-[0_25px_50px_-12px_rgba(98,0,128,0.3)] transition-all duration-300" style={{ boxShadow: '0 20px 25px -5px rgba(98, 0, 128, 0.2), 0 10px 10px -5px rgba(98, 0, 128, 0.1)' }}>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Response Time Distribution</h3>
              <div className="space-y-4">
                {Object.entries(analyticsData.timeToResponse).map(([timeRange, count]) => {
                  const total = Object.values(analyticsData.timeToResponse).reduce((sum, val) => sum + val, 0);
                  const percentage = ((count / total) * 100).toFixed(1);
                  return (
                    <div key={timeRange} className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium text-gray-700 truncate flex-1">{timeRange}</span>
                      <div className="flex items-center ml-2">
                        <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="h-2 bg-purple-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-gray-900 w-6 sm:w-8 text-right">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Insights & Recommendations */}
          <div className="bg-white rounded-xl p-4 sm:p-6 hover:shadow-[0_25px_50px_-12px_rgba(98,0,128,0.3)] transition-all duration-300" style={{ boxShadow: '0 20px 25px -5px rgba(98, 0, 128, 0.2), 0 10px 10px -5px rgba(98, 0, 128, 0.1)' }}>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Insights & Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="p-4 bg-green-50 rounded-lg" style={{ boxShadow: '0 10px 20px -5px rgba(98, 0, 128, 0.2)' }}>
                <div className="flex items-center mb-2">
                  <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0" />
                  <h4 className="font-semibold text-green-900 text-sm sm:text-base">Strong Performance</h4>
                </div>
                <p className="text-xs sm:text-sm text-green-700">Your response rate is above average. Keep applying to similar positions.</p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg" style={{ boxShadow: '0 10px 20px -5px rgba(98, 0, 128, 0.2)' }}>
                <div className="flex items-center mb-2">
                  <Star size={20} className="text-yellow-600 mr-2 flex-shrink-0" />
                  <h4 className="font-semibold text-yellow-900 text-sm sm:text-base">Skill Focus</h4>
                </div>
                <p className="text-xs sm:text-sm text-yellow-700">JavaScript skills are in high demand. Consider highlighting them more.</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg" style={{ boxShadow: '0 10px 20px -5px rgba(98, 0, 128, 0.2)' }}>
                <div className="flex items-center mb-2">
                  <TrendingUp size={20} className="text-blue-600 mr-2 flex-shrink-0" />
                  <h4 className="font-semibold text-blue-900 text-sm sm:text-base">Growth Opportunity</h4>
                </div>
                <p className="text-xs sm:text-sm text-blue-700">Your application volume has increased 25% this month. Great momentum!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalyticsDashboard;