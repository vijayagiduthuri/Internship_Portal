import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, DollarSign, Building, User, Bell, Upload, Star, Heart, Bookmark, Menu, X, Filter } from 'lucide-react';

const UserHomePage = () => {
  const [searchTerm, setSearchTerm] = useState('Designer');
  const [location, setLocation] = useState('Chicago, IL');
  const [selectedFilters, setSelectedFilters] = useState({
    jobType: [],
    location: [],
    company: []
  });
  const [sortBy, setSortBy] = useState('Date Posted');
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const [email, setEmail] = useState('steve.scaleup@gmail.com');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const jobTypes = [
    { name: 'All (284)', value: 'all', count: 284 },
    { name: 'Full Time (168)', value: 'fulltime', count: 168 },
    { name: 'Part Time (52)', value: 'parttime', count: 52 },
    { name: 'Contract (18)', value: 'contract', count: 18 },
    { name: 'Internship (31)', value: 'internship', count: 31 },
    { name: 'Freelance (7)', value: 'freelance', count: 7 }
  ];

  const locations = [
    { name: 'Chicago, IL (284)', value: 'chicago', count: 284 },
    { name: 'New, IL (65)', value: 'new-il', count: 65 },
    { name: 'Oak Brook, IL (19)', value: 'oak-brook', count: 19 },
    { name: 'Northbrook, IL (19)', value: 'northbrook', count: 19 },
    { name: 'Skokie, IL (14)', value: 'skokie', count: 14 }
  ];

  const companies = [
    { name: 'All (284)', value: 'all', count: 284 },
    { name: 'Abbott (22)', value: 'abbott', count: 22 },
    { name: 'Accenture Inc. (18)', value: 'accenture-inc', count: 18 },
    { name: 'Cars.com (29)', value: 'cars', count: 29 },
    { name: 'Caterpillar Inc. (7)', value: 'caterpillar', count: 7 },
    { name: 'Zebra Technologies (24)', value: 'zebra', count: 24 }
  ];

  const popularCompanies = [
    { name: 'Workday', logo: '💼' },
    { name: 'Salesforce', logo: '☁️' },
    { name: 'Marriott International', logo: '🏨' },
    { name: 'CarMax', logo: '🚗' },
    { name: 'SAP America Inc.', logo: '📊' },
    { name: 'Deloitte', logo: '💡' },
    { name: 'Accenture', logo: '⚡' },
    { name: 'Alliance Data', logo: '🔗' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest('.profile-dropdown')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Visual Designer',
      company: 'Deloitte',
      location: 'Chicago, IL',
      type: 'Full-Time',
      experience: '3 to 5 Years',
      salary: '$59k - $69k',
      posted: '2 days ago',
      featured: false,
      description: 'Looking for a creative visual designer to join our team and create stunning visual experiences for our clients.'
    },
    {
      id: 2,
      title: 'Product Designer',
      company: 'GrubHub',
      location: 'Chicago, IL',
      type: 'Full-Time',
      experience: '3 to 5 Years',
      salary: '$64k - $75k',
      posted: '4 hours ago',
      featured: true,
      description: 'Join our product design team to create amazing user experiences that delight millions of customers.'
    },
    {
      id: 3,
      title: 'Designer',
      company: 'Frey Design Group, INC',
      location: 'Chicago, IL',
      type: 'Paid Internship',
      experience: '0 to 1 Year',
      salary: '$35k',
      posted: '20 days ago',
      featured: false,
      description: 'Entry-level designer position with growth opportunities in a dynamic creative environment.'
    }
  ]);

  const handleFilterChange = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
      } else {
        newSaved.add(jobId);
      }
      return newSaved;
    });
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm, 'in', location);
  };

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      jobType: [],
      location: [],
      company: []
    });
  };

  // Filter Component for reusability
  const FilterSection = ({ className = "" }) => (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Filters</h3>
          <button 
            onClick={clearAllFilters}
            className="text-sm hover:underline"
            style={{color: '#620080'}}
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Job Type */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900 text-sm">JOB TYPE</h4>
            <button className="text-sm hover:underline" style={{color: '#620080'}}>Clear</button>
          </div>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <label key={type.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                  type="checkbox"
                  checked={selectedFilters.jobType.includes(type.value)}
                  onChange={() => handleFilterChange('jobType', type.value)}
                  className="mr-3 rounded"
                  style={{accentColor: '#620080'}}
                />
                <span className="text-sm text-gray-700">{type.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900 text-sm">LOCATION</h4>
            <button className="text-sm hover:underline" style={{color: '#620080'}}>Clear</button>
          </div>
          <div className="space-y-2">
            {locations.map((loc) => (
              <label key={loc.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                  type="checkbox"
                  checked={selectedFilters.location.includes(loc.value)}
                  onChange={() => handleFilterChange('location', loc.value)}
                  className="mr-3 rounded"
                  style={{accentColor: '#620080'}}
                />
                <span className="text-sm text-gray-700">{loc.name}</span>
              </label>
            ))}
            <button className="text-sm hover:underline block mt-2" style={{color: '#620080'}}>More...</button>
          </div>
        </div>

        {/* Company */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900 text-sm">COMPANY</h4>
            <button className="text-sm hover:underline" style={{color: '#620080'}}>Clear</button>
          </div>
          <div className="space-y-2">
            {companies.map((company) => (
              <label key={company.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                  type="checkbox"
                  checked={selectedFilters.company.includes(company.value)}
                  onChange={() => handleFilterChange('company', company.value)}
                  className="mr-3 rounded"
                  style={{accentColor: '#620080'}}
                />
                <span className="text-sm text-gray-700">{company.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{backgroundColor: '#fbeeff'}}>
      {/* Header */}
      <div className="text-white" style={{background: 'linear-gradient(135deg, #620080 0%, #8e44ad 100%)'}}>
        <div className="container mx-auto px-4 py-4">
          {/* Top Navigation */}
          <div className="flex justify-between items-center mb-4 lg:mb-8">
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Make-Me-Intern</h1>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <button className="p-2 rounded-lg hover:bg-opacity-80 transition-colors" style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>
                <Bell size={16} />
              </button>
              <div className="relative profile-dropdown">
                <button 
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 hover:bg-opacity-80 transition-colors p-1 rounded-lg"
                  style={{backgroundColor: 'rgba(255,255,255,0.1)'}}
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-orange-400 rounded-full flex items-center justify-center">
                    <User size={14} className="md:w-4 md:h-4" />
                  </div>
                  <span className="text-sm md:text-base">Steve</span>
                </button>

                {/* Profile Dropdown */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border z-50">
                    {/* Profile Header */}
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
                            <User size={20} className="text-white" />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">75%</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">Steve Scaleup</h3>
                          <p className="text-sm text-gray-600">steve.scaleup@gmail.com</p>
                          <button 
                            className="text-sm mt-1 hover:underline flex items-center"
                            style={{color: '#620080'}}
                          >
                            View Profile
                            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Building size={14} className="text-gray-500" />
                            <span className="text-sm text-gray-600">1,304,206</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star size={14} className="text-purple-500" />
                            <span className="text-sm text-gray-600">20</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Profile Completion Alert */}
                    <div className="p-3 bg-orange-50 border-b border-gray-200">
                      <p className="text-sm text-orange-800 font-medium">You're missing out</p>
                      <p className="text-xs text-orange-600">on opportunities to create an impact!</p>
                      <button 
                        className="text-xs mt-1 font-medium hover:underline"
                        style={{color: '#620080'}}
                      >
                        Complete my profile →
                      </button>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <div className="px-3 py-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">For Users</p>
                      </div>
                      
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3">
                        <User size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">Registrations/Applications</span>
                      </button>
                      
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3">
                        <Building size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">My Jobs</span>
                      </button>
                      
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3">
                        <Search size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">My Opportunities</span>
                      </button>
                      
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3">
                        <Star size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">My Festivals</span>
                      </button>
                      
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3">
                        <User size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">Referrals</span>
                      </button>
                      
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3">
                        <Clock size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">My Rounds</span>
                      </button>
                      
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3">
                        <Star size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">Unstop Awards Nominations</span>
                      </button>

                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm text-gray-700">Settings</span>
                        </button>
                        
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 text-red-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span className="text-sm">Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex justify-between items-center mb-4 lg:mb-8">
            <nav className="hidden md:flex space-x-6">
              <span className="font-semibold border-b-2 border-white pb-1">Jobs.</span>
              <button style={{color: 'rgba(255,255,255,0.8)'}} className="hover:text-white transition-colors">Find Jobs</button>
              <button style={{color: 'rgba(255,255,255,0.8)'}} className="hover:text-white transition-colors">Companies</button>
              <button style={{color: 'rgba(255,255,255,0.8)'}} className="hover:text-white transition-colors">Reviews</button>
              <button style={{color: 'rgba(255,255,255,0.8)'}} className="hover:text-white transition-colors">Services</button>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-opacity-80 transition-colors"
              style={{backgroundColor: 'rgba(255,255,255,0.2)'}}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setShowResumeUpload(true)}
                className="flex items-center space-x-2 bg-white hover:bg-gray-100 transition-colors px-4 py-2 rounded-lg font-semibold"
                style={{color: '#620080'}}
              >
                <Upload size={16} />
                <span>Upload Resume</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {showMobileMenu && (
            <div className="md:hidden mb-4 bg-white bg-opacity-10 rounded-lg p-4">
              <nav className="flex flex-col space-y-3">
                <span className="font-semibold text-white">Jobs.</span>
                <button className="text-left" style={{color: 'rgba(255,255,255,0.8)'}}>Find Jobs</button>
                <button className="text-left" style={{color: 'rgba(255,255,255,0.8)'}}>Companies</button>
                <button className="text-left" style={{color: 'rgba(255,255,255,0.8)'}}>Reviews</button>
                <button className="text-left" style={{color: 'rgba(255,255,255,0.8)'}}>Services</button>
                <button 
                  onClick={() => setShowResumeUpload(true)}
                  className="flex items-center space-x-2 bg-white text-center justify-center hover:bg-gray-100 transition-colors px-4 py-2 rounded-lg font-semibold mt-3"
                  style={{color: '#620080'}}
                >
                  <Upload size={16} />
                  <span>Upload Resume</span>
                </button>
              </nav>
            </div>
          )}

          {/* Hero Section */}
          <div className="text-center mb-6 lg:mb-8">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Find your dream job</h1>
            <p className="mb-6 md:mb-8 text-base md:text-lg" style={{color: 'rgba(255,255,255,0.9)'}}>Find your next career at companies like HubSpot, Nike, and Dropbox</p>
            
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row max-w-4xl mx-auto bg-white rounded-lg p-2 shadow-xl">
              <div className="flex-1 flex items-center px-4 py-3">
                <Search className="text-gray-400 mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-gray-700 outline-none text-sm md:text-base"
                />
              </div>
              <div className="flex-1 flex items-center px-4 py-3 border-t md:border-t-0 md:border-l border-gray-200">
                <MapPin className="text-gray-400 mr-3" size={20} />
                <input
                  type="text"
                  placeholder="City, state, zip code, or remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-gray-700 outline-none text-sm md:text-base"
                />
              </div>
              <button 
                onClick={handleSearch}
                className="text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                style={{backgroundColor: '#620080'}}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden px-4 py-4">
        <button 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          style={{color: '#620080'}}
        >
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white h-full w-80 max-w-sm overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <FilterSection className="border-0 shadow-none" />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="py-4 lg:py-8">
        <div className="flex gap-4 lg:gap-6">
          {/* Left margin for desktop filter section */}
          <div className="hidden lg:block w-4"></div>
          
          {/* Left Sidebar - Filters (Desktop Only) */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            <FilterSection />
          </div>

          {/* Middle - Job Listings */}
          <div className="flex-1 px-4 lg:px-0">
            {/* Resume Upload CTA */}
            <div className="border-2 border-dashed rounded-lg p-4 lg:p-6 mb-4 lg:mb-6" style={{backgroundColor: 'rgba(98, 0, 128, 0.05)', borderColor: 'rgba(98, 0, 128, 0.3)'}}>
              <div className="flex items-center mb-3">
                <Upload className="mr-3" style={{color: '#620080'}} size={24} />
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">Upload your resume</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm md:text-base">We'll match you with the best jobs. Right job, Right away!</p>
              <button 
                onClick={() => setShowResumeUpload(true)}
                className="w-full text-white py-2 lg:py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors text-sm md:text-base"
                style={{backgroundColor: '#620080'}}
              >
                Choose File
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
              {/* Results Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <span className="text-sm text-gray-600 font-medium">289 results found</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option>Date Posted</option>
                      <option>Relevance</option>
                      <option>Salary</option>
                      <option>Company</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Job Listings */}
              <div className="divide-y divide-gray-200">
                {jobs.map((job) => (
                  <div key={job.id} className="p-4 lg:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                      <div className="flex items-start space-x-3 lg:space-x-4 flex-1">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#620080'}}>
                          <span className="text-white font-semibold text-xs lg:text-sm">
                            {job.company.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base lg:text-lg text-gray-900 mb-1 hover:text-purple-700 cursor-pointer">{job.title}</h3>
                          <p className="text-gray-600 mb-2 text-sm lg:text-base">{job.company} • {job.location}</p>
                          <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs lg:text-sm text-gray-600">
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">{job.type}</span>
                            <span>{job.experience}</span>
                            <span className="font-semibold text-gray-900">{job.salary}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0 w-full sm:w-auto">
                        {job.featured && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-medium">
                            FEATURED
                          </span>
                        )}
                        <button 
                          onClick={() => toggleSaveJob(job.id)}
                          className={`text-xs lg:text-sm px-3 py-1 rounded border transition-colors flex-1 sm:flex-none ${
                            savedJobs.has(job.id) 
                              ? 'text-white border-transparent' 
                              : 'hover:bg-purple-50 border-purple-300'
                          }`}
                          style={{
                            backgroundColor: savedJobs.has(job.id) ? '#620080' : 'transparent',
                            color: savedJobs.has(job.id) ? 'white' : '#620080'
                          }}
                        >
                          {savedJobs.has(job.id) ? 'Saved ✓' : 'Save Job'}
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {job.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <span className="text-sm text-gray-500">Posted {job.posted}</span>
                      <button className="text-sm font-medium hover:underline" style={{color: '#620080'}}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar (Tablet and Desktop) */}
          <div className="hidden md:block w-64 flex-shrink-0 space-y-6">
            {/* Newsletter Signup */}
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <h3 className="font-semibold text-gray-900 mb-2">Be the first to see new jobs in <span style={{color: '#620080'}}>Chicago, IL</span></h3>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="steve.scaleup@gmail.com"
                />
                <button 
                  onClick={handleSubscribe}
                  className="w-full text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                  style={{backgroundColor: '#620080'}}
                >
                  {isSubscribed ? 'Subscribed! ✓' : 'Subscribe Now'}
                </button>
              </div>
              <p className="text-xs text-gray-500">You interested: HTML, CSS</p>
            </div>

            {/* Popular Companies */}
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <h3 className="font-semibold text-gray-900 mb-4">Popular in <span style={{color: '#620080'}}>Chicago</span></h3>
              <div className="space-y-3">
                {popularCompanies.map((company, index) => (
                  <button 
                    key={index}
                    className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'rgba(98, 0, 128, 0.1)'}}>
                      <span className="text-sm font-semibold" style={{color: '#620080'}}>
                        {company.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{company.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right margin for desktop */}
          <div className="hidden lg:block w-4"></div>
        </div>
      </div>

      {/* Resume Upload Modal */}
      {showResumeUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 lg:p-6 rounded-lg max-w-md w-full shadow-xl">
            <h3 className="text-lg lg:text-xl font-semibold mb-4">Upload your resume</h3>
            <p className="text-gray-600 mb-4 text-sm lg:text-base">We'll match you with the best jobs. Right job, Right away!</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 lg:p-8 text-center mb-4 hover:border-purple-400 transition-colors">
              <Upload className="mx-auto mb-2 text-gray-400" size={32} />
              <p className="text-gray-600 font-medium text-sm lg:text-base">Click to upload or drag and drop</p>
              <p className="text-xs lg:text-sm text-gray-400 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
              <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowResumeUpload(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm lg:text-base"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowResumeUpload(false)}
                className="flex-1 px-4 py-2 text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium text-sm lg:text-base"
                style={{backgroundColor: '#620080'}}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHomePage;