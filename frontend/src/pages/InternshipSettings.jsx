import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  User, 
  Shield, 
  Bell, 
  Briefcase, 
  CreditCard, 
  HelpCircle, 
  Globe, 
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Building,
  FileText,
  Lock,
  Smartphone,
  Camera,
  Download,
  Trash2,
  ChevronRight,
  Check,
  Menu,
  X
} from 'lucide-react';

const InternshipSettings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  
  const [formData, setFormData] = useState({
    fullName: 'Anna Taylor',
    email: 'annatay@example.com',
    phone: '+1 (987) 654 321',
    location: 'New York, NY',
    dateOfBirth: '1999-05-15',
    university: 'Stanford University',
    degree: 'Computer Science',
    graduationYear: '2025',
    bio: 'Passionate about technology and innovation',
    linkedIn: 'linkedin.com/in/annataylor',
    github: 'github.com/annataylor',
    website: 'annataylor.dev'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    applicationUpdates: true,
    internshipRecommendations: true,
    weeklyDigest: false,
    marketingEmails: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessaging: true,
    showApplicationHistory: false
  });

  // Handle screen size detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
        setSidebarOpen(false);
      } else if (width < 1024) {
        setScreenSize('tablet');
        setSidebarOpen(false);
      } else if (width < 1440) {
        setScreenSize('laptop');
        setSidebarOpen(true);
      } else {
        setScreenSize('desktop');
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    if (screenSize === 'mobile' || screenSize === 'tablet') {
      setSidebarOpen(false);
    }
  };

  const menuItems = [
    { id: 'account', label: 'Account', icon: User, description: 'Personal information' },
    { id: 'privacy', label: 'Privacy', icon: Shield, description: 'Control visibility' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Alerts & updates' },
    { id: 'applications', label: 'Applications', icon: Briefcase, description: 'Resume & history' },
    { id: 'preferences', label: 'Preferences', icon: Globe, description: 'App settings' },
    { id: 'security', label: 'Security', icon: Lock, description: 'Password & 2FA' },
    { id: 'billing', label: 'Billing', icon: CreditCard, description: 'Plans & payments' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, description: 'Get assistance' }
  ];

  const IOSToggle = ({ checked, onChange, size = 'default' }) => {
    const sizeClasses = size === 'small' ? 'h-5 w-8' : 'h-6 w-11';
    const thumbSize = size === 'small' ? 'h-3 w-3' : 'h-4 w-4';
    const translateX = size === 'small' ? (checked ? 'translate-x-4' : 'translate-x-0.5') : (checked ? 'translate-x-6' : 'translate-x-1');
    
    return (
      <button
        onClick={onChange}
        className={`relative inline-flex ${sizeClasses} items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
          checked 
            ? 'bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg' 
            : 'bg-gray-300 hover:bg-gray-400'
        }`}
        style={{
          boxShadow: checked ? '0 4px 12px rgba(124, 58, 237, 0.4)' : '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        <span
          className={`${thumbSize} transform rounded-full bg-white transition-transform duration-300 ease-in-out shadow-md ${translateX}`}
          style={{
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
          }}
        />
      </button>
    );
  };

  const IOSCard = ({ children, className = "", hover = true }) => (
    <div 
      className={`bg-white rounded-2xl border border-gray-100 transition-all duration-300 ${
        hover ? (screenSize === 'mobile' ? 'hover:shadow-lg' : 'hover:shadow-xl hover:scale-[1.01] hover:border-gray-200') : 'shadow-lg'
      } ${className}`}
      style={{
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {children}
    </div>
  );

  const IOSInput = ({ label, type = 'text', ...props }) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 tracking-wide">{label}</label>
      <input
        type={type}
        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all duration-300 text-base"
        style={{
          fontSize: '16px' // Prevents zoom on iOS
        }}
        {...props}
      />
    </div>
  );

  const IOSButton = ({ children, variant = 'primary', size = 'default', className = '', ...props }) => {
    const baseClasses = "font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95";
    const sizeClasses = size === 'large' ? 'px-8 py-4 text-base' : 'px-6 py-3 text-sm';
    
    const variantClasses = {
      primary: 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 focus:ring-purple-500 shadow-lg hover:shadow-xl',
      secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
      danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
    };

    return (
      <button 
        className={`${baseClasses} ${sizeClasses} ${variantClasses[variant]} ${className}`}
        style={variant === 'primary' ? {
          boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)'
        } : {}}
        {...props}
      >
        {children}
      </button>
    );
  };

  const getGridClasses = () => {
    switch (screenSize) {
      case 'mobile':
        return 'grid-cols-1';
      case 'tablet':
        return 'grid-cols-1 sm:grid-cols-2';
      case 'laptop':
        return 'grid-cols-1 md:grid-cols-2';
      case 'desktop':
        return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3';
      default:
        return 'grid-cols-1 md:grid-cols-2';
    }
  };

  const getSpacingClasses = () => {
    switch (screenSize) {
      case 'mobile':
        return 'space-y-4 p-4';
      case 'tablet':
        return 'space-y-6 p-6';
      case 'laptop':
        return 'space-y-6 p-6';
      case 'desktop':
        return 'space-y-8 p-8';
      default:
        return 'space-y-6 p-6';
    }
  };

  const renderAccountInfo = () => (
    <div className={getSpacingClasses().replace('p-', 'space-y-')}>
      <div className="text-center mb-6 md:mb-8">
        <h1 className={`font-bold text-gray-900 mb-2 ${screenSize === 'mobile' ? 'text-2xl' : screenSize === 'tablet' ? 'text-3xl' : 'text-4xl'}`}>Account</h1>
        <p className={`text-gray-600 ${screenSize === 'mobile' ? 'text-base' : 'text-lg'}`}>Manage your personal information</p>
      </div>

      {/* Profile Picture */}
      <IOSCard className={getSpacingClasses()}>
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div 
              className={`${screenSize === 'mobile' ? 'w-20 h-20' : screenSize === 'desktop' ? 'w-28 h-28' : 'w-24 h-24'} bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-full flex items-center justify-center text-white ${screenSize === 'mobile' ? 'text-xl' : screenSize === 'desktop' ? 'text-3xl' : 'text-2xl'} font-bold shadow-xl`}
              style={{
                boxShadow: '0 8px 25px rgba(124, 58, 237, 0.4)'
              }}
            >
              AT
            </div>
            <button className={`absolute -bottom-1 -right-1 ${screenSize === 'mobile' ? 'w-7 h-7' : 'w-8 h-8'} bg-white rounded-full shadow-lg border-2 border-gray-100 flex items-center justify-center hover:scale-110 transition-transform duration-200`}>
              <Camera className={`${screenSize === 'mobile' ? 'w-3 h-3' : 'w-4 h-4'} text-gray-600`} />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4">JPEGs and PNGs under 5MB</p>
          <div className={`flex ${screenSize === 'mobile' ? 'flex-col' : 'flex-row'} justify-center gap-3`}>
            <IOSButton size="default">Upload Photo</IOSButton>
            <IOSButton variant="secondary">Remove</IOSButton>
          </div>
        </div>
      </IOSCard>

      {/* Basic Information */}
      <IOSCard className={getSpacingClasses()}>
        <h2 className={`font-bold text-gray-900 mb-6 ${screenSize === 'mobile' ? 'text-lg' : 'text-xl'}`}>Basic Information</h2>
        <div className={`grid ${getGridClasses()} gap-6`}>
          <IOSInput
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
          <IOSInput
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <IOSInput
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <IOSInput
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="City, State"
          />
          <IOSInput
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>
      </IOSCard>

      {/* Education */}
      <IOSCard className={getSpacingClasses()}>
        <h2 className={`font-bold text-gray-900 mb-6 ${screenSize === 'mobile' ? 'text-lg' : 'text-xl'}`}>Education</h2>
        <div className={`grid ${getGridClasses()} gap-6`}>
          <IOSInput
            label="University"
            name="university"
            value={formData.university}
            onChange={handleInputChange}
          />
          <IOSInput
            label="Degree"
            name="degree"
            value={formData.degree}
            onChange={handleInputChange}
          />
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 tracking-wide">Graduation Year</label>
            <select
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleInputChange}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all duration-300 text-base"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>
        </div>
      </IOSCard>

      {/* Bio & Links */}
      <IOSCard className={getSpacingClasses()}>
        <h2 className={`font-bold text-gray-900 mb-6 ${screenSize === 'mobile' ? 'text-lg' : 'text-xl'}`}>Profile & Links</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 tracking-wide">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all duration-300 resize-none text-base"
              placeholder="Tell us about yourself..."
            />
          </div>
          <div className={`grid ${getGridClasses()} gap-6`}>
            <IOSInput
              label="LinkedIn"
              type="url"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleInputChange}
            />
            <IOSInput
              label="GitHub"
              type="url"
              name="github"
              value={formData.github}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </IOSCard>

      <div className="flex justify-center pt-4">
        <IOSButton size="large" className={screenSize === 'mobile' ? 'w-full' : 'w-auto'}>Save Changes</IOSButton>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className={getSpacingClasses().replace('p-', 'space-y-')}>
      <div className="text-center mb-6 md:mb-8">
        <h1 className={`font-bold text-gray-900 mb-2 ${screenSize === 'mobile' ? 'text-2xl' : screenSize === 'tablet' ? 'text-3xl' : 'text-4xl'}`}>Privacy</h1>
        <p className={`text-gray-600 ${screenSize === 'mobile' ? 'text-base' : 'text-lg'}`}>Control your profile visibility</p>
      </div>

      <IOSCard className={getSpacingClasses()}>
        <h2 className={`font-bold text-gray-900 mb-6 ${screenSize === 'mobile' ? 'text-lg' : 'text-xl'}`}>Profile Visibility</h2>
        <div className="space-y-4">
          {[
            { value: 'public', label: 'Public', desc: 'Anyone can see your profile' },
            { value: 'private', label: 'Private', desc: 'Only you can see your profile' },
            { value: 'connections-only', label: 'Connections Only', desc: 'Only your connections can see your profile' }
          ].map((option) => (
            <div 
              key={option.value} 
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                privacy.profileVisibility === option.value 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handlePrivacyChange('profileVisibility', option.value)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{option.label}</p>
                  <p className="text-sm text-gray-600">{option.desc}</p>
                </div>
                {privacy.profileVisibility === option.value && (
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </IOSCard>

      <IOSCard className={getSpacingClasses()}>
        <h2 className={`font-bold text-gray-900 mb-6 ${screenSize === 'mobile' ? 'text-lg' : 'text-xl'}`}>Contact Information</h2>
        <div className="space-y-6">
          {[
            { key: 'showEmail', label: 'Show email address', desc: 'Display your email on your profile' },
            { key: 'showPhone', label: 'Show phone number', desc: 'Display your phone on your profile' },
            { key: 'allowMessaging', label: 'Allow messaging', desc: 'Let other users message you' },
            { key: 'showApplicationHistory', label: 'Show application history', desc: 'Visible to recruiters' }
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div className="flex-1 pr-4">
                <p className={`font-semibold text-gray-900 ${screenSize === 'mobile' ? 'text-sm' : 'text-base'}`}>{label}</p>
                <p className={`text-gray-600 ${screenSize === 'mobile' ? 'text-xs' : 'text-sm'}`}>{desc}</p>
              </div>
              <IOSToggle
                checked={privacy[key]}
                onChange={() => handlePrivacyChange(key, !privacy[key])}
              />
            </div>
          ))}
        </div>
      </IOSCard>
    </div>
  );

  const renderNotifications = () => (
    <div className={getSpacingClasses().replace('p-', 'space-y-')}>
      <div className="text-center mb-6 md:mb-8">
        <h1 className={`font-bold text-gray-900 mb-2 ${screenSize === 'mobile' ? 'text-2xl' : screenSize === 'tablet' ? 'text-3xl' : 'text-4xl'}`}>Notifications</h1>
        <p className={`text-gray-600 ${screenSize === 'mobile' ? 'text-base' : 'text-lg'}`}>Choose what you want to be notified about</p>
      </div>

      <IOSCard className={getSpacingClasses()}>
        <h2 className={`font-bold text-gray-900 mb-6 ${screenSize === 'mobile' ? 'text-lg' : 'text-xl'}`}>Notification Types</h2>
        <div className="space-y-6">
          {[
            { key: 'emailNotifications', label: 'Email notifications', desc: 'Receive notifications via email', icon: Mail },
            { key: 'pushNotifications', label: 'Push notifications', desc: 'Receive push notifications on your device', icon: Smartphone },
            { key: 'applicationUpdates', label: 'Application updates', desc: 'Get notified about application status changes', icon: Briefcase },
            { key: 'internshipRecommendations', label: 'Internship recommendations', desc: 'Receive personalized internship suggestions', icon: Building },
            { key: 'weeklyDigest', label: 'Weekly digest', desc: 'Weekly summary of your activity', icon: Calendar },
            { key: 'marketingEmails', label: 'Marketing emails', desc: 'Promotional content and news', icon: Mail }
          ].map(({ key, label, desc, icon: Icon }) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div className={`flex items-center gap-3 md:gap-4 flex-1 pr-4`}>
                <div className={`${screenSize === 'mobile' ? 'w-8 h-8' : 'w-10 h-10'} bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`${screenSize === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'} text-purple-600`} />
                </div>
                <div>
                  <p className={`font-semibold text-gray-900 ${screenSize === 'mobile' ? 'text-sm' : 'text-base'}`}>{label}</p>
                  <p className={`text-gray-600 ${screenSize === 'mobile' ? 'text-xs' : 'text-sm'}`}>{desc}</p>
                </div>
              </div>
              <IOSToggle
                checked={notifications[key]}
                onChange={() => handleNotificationChange(key)}
              />
            </div>
          ))}
        </div>
      </IOSCard>
    </div>
  );

  const renderApplications = () => (
    <div className={getSpacingClasses().replace('p-', 'space-y-')}>
      <div className="text-center mb-6 md:mb-8">
        <h1 className={`font-bold text-gray-900 mb-2 ${screenSize === 'mobile' ? 'text-2xl' : screenSize === 'tablet' ? 'text-3xl' : 'text-4xl'}`}>Applications</h1>
        <p className={`text-gray-600 ${screenSize === 'mobile' ? 'text-base' : 'text-lg'}`}>Manage your resume and application history</p>
      </div>

      <IOSCard className={getSpacingClasses()}>
        <h2 className={`font-bold text-gray-900 mb-6 ${screenSize === 'mobile' ? 'text-lg' : 'text-xl'}`}>Resume & Documents</h2>
        <div className="space-y-6">
          <div 
            className={`flex ${screenSize === 'mobile' ? 'flex-col' : 'flex-row'} items-start sm:items-center justify-between p-4 md:p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 gap-4`}
            style={{
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)'
            }}
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className={`${screenSize === 'mobile' ? 'w-10 h-10' : 'w-12 h-12'} bg-purple-600 rounded-xl flex items-center justify-center shadow-lg`}>
                <FileText className={`${screenSize === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
              </div>
              <div>
                <p className={`font-bold text-gray-900 ${screenSize === 'mobile' ? 'text-sm' : 'text-base'}`}>Resume.pdf</p>
                <p className={`text-gray-600 ${screenSize === 'mobile' ? 'text-xs' : 'text-sm'}`}>Uploaded 2 days ago • 1.2 MB</p>
              </div>
            </div>
            <div className={`flex gap-2 ${screenSize === 'mobile' ? 'w-full' : 'w-auto'}`}>
              <button className={`${screenSize === 'mobile' ? 'flex-1' : 'flex-none'} p-2.5 md:p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105`}>
                <Download className={`${screenSize === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'} text-gray-600`} />
              </button>
              <button className={`${screenSize === 'mobile' ? 'flex-1' : 'flex-none'} p-2.5 md:p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105`}>
                <Trash2 className={`${screenSize === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'} text-red-500`} />
              </button>
            </div>
          </div>
          
          <div 
            className="border-2 border-dashed border-purple-300 rounded-xl p-6 md:p-8 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all duration-300"
          >
            <div className={`${screenSize === 'mobile' ? 'w-12 h-12' : screenSize === 'desktop' ? 'w-20 h-20' : 'w-16 h-16'} bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
              <FileText className={`${screenSize === 'mobile' ? 'w-6 h-6' : screenSize === 'desktop' ? 'w-10 h-10' : 'w-8 h-8'} text-purple-600`} />
            </div>
            <p className={`font-semibold text-gray-900 mb-2 ${screenSize === 'mobile' ? 'text-sm' : 'text-base'}`}>Upload New Resume</p>
            <p className={`text-gray-600 ${screenSize === 'mobile' ? 'text-xs' : 'text-sm'}`}>Drag and drop or click to select</p>
          </div>
        </div>
      </IOSCard>

      <IOSCard className={getSpacingClasses()}>
        <h2 className={`font-bold text-gray-900 mb-6 ${screenSize === 'mobile' ? 'text-lg' : 'text-xl'}`}>Recent Applications</h2>
        <div className="space-y-4">
          {[
            { company: 'Google', role: 'Software Engineering Intern', status: 'pending', date: '3 days ago', color: 'yellow' },
            { company: 'Microsoft', role: 'Product Manager Intern', status: 'interview', date: '1 week ago', color: 'green' },
            { company: 'Apple', role: 'Design Intern', status: 'rejected', date: '2 weeks ago', color: 'red' }
          ].map((app, index) => (
            <div key={index} className="flex items-center justify-between p-4 md:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center gap-3 md:gap-4 flex-1">
                <div className={`${screenSize === 'mobile' ? 'w-10 h-10' : 'w-12 h-12'} bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold ${screenSize === 'mobile' ? 'text-xs' : 'text-sm'}`}>
                  {app.company[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`font-bold text-gray-900 truncate ${screenSize === 'mobile' ? 'text-sm' : 'text-base'}`}>{app.role}</p>
                  <p className={`text-gray-600 ${screenSize === 'mobile' ? 'text-xs' : 'text-sm'}`}>{app.company} • Applied {app.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${
                  app.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                  app.color === 'green' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
                <ChevronRight className={`${screenSize === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400`} />
              </div>
            </div>
          ))}
        </div>
      </IOSCard>
    </div>
  );

  const renderSecurity = () => (
    <div className={getSpacingClasses().replace('p-', 'space-y-')}>
      <div className="text-center mb-6 md:mb-8">
        <h1 className={`font-bold text-gray-900 mb-2 ${screenSize === 'mobile' ? 'text-2xl' : screenSize === 'tablet' ? 'text-3xl' : 'text-4xl'}`}>Security</h1>
        <p className={`text-gray-600 ${screenSize === 'mobile' ? 'text-base' : 'text-lg'}`}>Keep your account safe and secure</p>
      </div>

      <IOSCard className={getSpacingClasses()}>
        <h2 className={`font-bold text-gray-900 mb-6 ${screenSize === 'mobile' ? 'text-lg' : 'text-xl'}`}>Change Password</h2>
        <div className="space-y-6">
          <IOSInput label="Current Password" type="password" />
          <IOSInput label="New Password" type="password" />
          <IOSInput label="Confirm New Password" type="password" />
          <IOSButton className={screenSize === 'mobile' ? 'w-full' : 'w-auto'}>Update Password</IOSButton>
        </div>
      </IOSCard>

      <IOSCard className={getSpacingClasses()}>
        <h2 className={`font-bold text-gray-900 mb-6 ${screenSize === 'mobile' ? 'text-lg' : 'text-xl'}`}>Two-Factor Authentication</h2>
        <div className={`flex ${screenSize === 'mobile' ? 'flex-col' : 'flex-row'} items-start sm:items-center justify-between gap-4`}>
          <div className="flex items-center gap-3 md:gap-4">
            <div className={`${screenSize === 'mobile' ? 'w-10 h-10' : 'w-12 h-12'} bg-green-100 rounded-xl flex items-center justify-center`}>
              <Shield className={`${screenSize === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'} text-green-600`} />
            </div>
            <div>
              <p className={`font-semibold text-gray-900 ${screenSize === 'mobile' ? 'text-sm' : 'text-base'}`}>Secure your account</p>
              <p className={`text-gray-600 ${screenSize === 'mobile' ? 'text-xs' : 'text-sm'}`}>Add an extra layer of protection</p>
            </div>
          </div>
          <IOSButton variant="secondary" className={screenSize === 'mobile' ? 'w-full' : 'w-auto'}>Enable 2FA</IOSButton>
        </div>
      </IOSCard>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return renderAccountInfo();
      case 'privacy':
        return renderPrivacy();
      case 'notifications':
        return renderNotifications();
      case 'applications':
        return renderApplications();
      case 'security':
        return renderSecurity();
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className={`${screenSize === 'mobile' ? 'w-12 h-12' : 'w-16 h-16'} bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <HelpCircle className={`${screenSize === 'mobile' ? 'w-6 h-6' : 'w-8 h-8'} text-gray-400`} />
              </div>
              <p className="text-gray-500 font-medium">Coming Soon</p>
              <p className="text-sm text-gray-400">This section is under development</p>
            </div>
          </div>
        );
    }
  };

  const currentMenuItem = menuItems.find(item => item.id === activeSection);

  const getSidebarWidth = () => {
    switch (screenSize) {
      case 'mobile':
        return 'w-80';
      case 'tablet':
        return 'w-80';
      case 'laptop':
        return 'w-72';
      case 'desktop':
        return 'w-80';
      default:
        return 'w-80';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex relative">
        {/* Mobile/Tablet Header */}
        {(screenSize === 'mobile' || screenSize === 'tablet') && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">
                  {currentMenuItem?.label || 'Settings'}
                </h1>
              </div>
            </div>
          </div>
        )}

        {/* Mobile/Tablet Sidebar Overlay */}
        {sidebarOpen && (screenSize === 'mobile' || screenSize === 'tablet') && (
          <div 
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div 
          className={`${
            screenSize === 'laptop' || screenSize === 'desktop' 
              ? 'relative translate-x-0' 
              : `fixed ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
          } transition-transform duration-300 ease-in-out z-50 ${getSidebarWidth()} bg-white/80 backdrop-blur-xl border-r border-gray-200/50 min-h-screen`}
          style={{
            boxShadow: '2px 0 20px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className={`${getSpacingClasses()} border-b border-gray-200/50`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className={`font-bold text-gray-900 ${screenSize === 'mobile' ? 'text-xl' : 'text-2xl'}`}>Settings</h1>
              </div>
              {(screenSize === 'mobile' || screenSize === 'tablet') && (
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              )}
            </div>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleSectionChange(item.id)}
                      className={`w-full flex items-center gap-4 px-4 py-4 text-left rounded-2xl transition-all duration-300 group ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg transform scale-105'
                          : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
                      }`}
                      style={activeSection === item.id ? {
                        boxShadow: '0 8px 25px rgba(124, 58, 237, 0.3)'
                      } : {}}
                    >
                      <Icon className={`w-5 h-5 ${activeSection === item.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                      <div className="flex-1">
                        <span className={`font-semibold block ${screenSize === 'mobile' ? 'text-sm' : 'text-base'}`}>{item.label}</span>
                        <span className={`text-xs ${activeSection === item.id ? 'text-purple-100' : 'text-gray-500'}`}>
                          {item.description}
                        </span>
                      </div>
                      {activeSection !== item.id && (
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className={`flex-1 overflow-y-auto ${
          screenSize === 'mobile' || screenSize === 'tablet' 
            ? 'pt-20 p-4' 
            : screenSize === 'laptop' 
              ? 'p-6' 
              : 'p-8'
        }`}>
          <div className={`mx-auto ${
            screenSize === 'desktop' ? 'max-w-6xl' : 'max-w-4xl'
          }`}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipSettings;