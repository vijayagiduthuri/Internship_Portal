import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, DollarSign, Building, User, Bell, Upload, Star, Heart, Bookmark, Menu, X, Filter } from 'lucide-react';

const JobSearchPortal = () => {
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
  const [selectedJob, setSelectedJob] = useState(null);

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
      description: 'Looking for a creative visual designer to join our team and create stunning visual experiences for our clients.',
      fullDescription: `We are seeking a talented Visual Designer to join our growing creative team at Deloitte. In this role, you will be responsible for creating compelling visual content across multiple platforms and mediums.

Key Responsibilities:
• Design and develop visual concepts for client presentations, marketing materials, and digital platforms
• Collaborate with cross-functional teams including UX designers, developers, and project managers
• Maintain brand consistency across all visual communications
• Create wireframes, mockups, and prototypes for web and mobile applications
• Stay current with design trends and best practices

Requirements:
• Bachelor's degree in Graphic Design, Visual Arts, or related field
• 3-5 years of professional design experience
• Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign)
• Strong portfolio demonstrating creative problem-solving skills
• Experience with web design principles and responsive design
• Excellent communication and presentation skills

Benefits:
• Competitive salary range: $59,000 - $69,000
• Comprehensive health insurance
• 401(k) matching
• Professional development opportunities
• Hybrid work environment`,
      requirements: ['Adobe Creative Suite', 'Web Design', 'Brand Design', 'UI/UX Knowledge'],
      benefits: ['Health Insurance', '401(k)', 'Flexible Hours', 'Remote Work']
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
      description: 'Join our product design team to create amazing user experiences that delight millions of customers.',
      fullDescription: `GrubHub is looking for a passionate Product Designer to help shape the future of food delivery. You'll work on products used by millions of customers daily, focusing on creating intuitive and delightful user experiences.

Key Responsibilities:
• Design end-to-end user experiences for web and mobile applications
• Conduct user research and usability testing to inform design decisions
• Create user flows, wireframes, prototypes, and high-fidelity designs
• Collaborate with product managers and engineers to bring designs to life
• Contribute to and maintain our design system
• Present design concepts and rationale to stakeholders

Requirements:
• 3-5 years of product design experience
• Strong portfolio showcasing UX/UI design work
• Proficiency in Figma, Sketch, or similar design tools
• Experience with user research methodologies
• Understanding of mobile-first and responsive design principles
• Knowledge of front-end development principles (HTML/CSS/JS)

Why GrubHub:
• Competitive salary: $64,000 - $75,000
• Stock options
• Unlimited PTO
• Free meals from local restaurants
• Learning and development budget`,
      requirements: ['Figma/Sketch', 'User Research', 'Mobile Design', 'Design Systems'],
      benefits: ['Stock Options', 'Unlimited PTO', 'Free Meals', 'Learning Budget']
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
      description: 'Entry-level designer position with growth opportunities in a dynamic creative environment.',
      fullDescription: `Frey Design Group is offering an exciting paid internship opportunity for a budding designer looking to kickstart their career in a supportive, creative environment.

What You'll Do:
• Assist senior designers with various projects including branding, print, and digital design
• Create mockups and presentations for client pitches
• Participate in brainstorming sessions and creative reviews
• Learn about project management and client communication
• Develop skills in multiple design disciplines

What We're Looking For:
• Recent graduate or current student in Graphic Design or related field
• Basic knowledge of Adobe Creative Suite
• Strong creative thinking and problem-solving skills
• Eagerness to learn and take on new challenges
• Good communication and collaboration skills
• Portfolio showing creative potential

What We Offer:
• Competitive internship salary: $35,000 annually
• Mentorship from experienced designers
• Opportunity to work on real client projects
• Potential for full-time offer after internship
• Creative and supportive work environment
• Professional development workshops`,
      requirements: ['Adobe Creative Suite', 'Portfolio', 'Creative Thinking', 'Team Collaboration'],
      benefits: ['Mentorship', 'Real Projects', 'Full-time Potential', 'Workshops']
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

  const handleJobClick = (job) => {
    setSelectedJob(job);
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
          <div className={`px-4 lg:px-0 transition-all duration-300 ${selectedJob ? 'lg:w-1/2' : 'flex-1'}`}>
            
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
                  <div 
                    key={job.id} 
                    className={`p-4 lg:p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                      selectedJob?.id === job.id ? 'bg-purple-50 border-l-4 border-purple-600' : ''
                    }`}
                    onClick={() => handleJobClick(job)}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                      <div className="flex items-start space-x-3 lg:space-x-4 flex-1">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#620080'}}>
                          <span className="text-white font-semibold text-xs lg:text-sm">
                            {job.company.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base lg:text-lg text-gray-900 mb-1 hover:text-purple-700">{job.title}</h3>
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
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveJob(job.id);
                          }}
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
                      <button 
                        className="text-sm font-medium hover:underline" 
                        style={{color: '#620080'}}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJobClick(job);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Job Details Panel */}
          {selectedJob && (
            <div className="hidden lg:block w-1/2 pl-6">
              <div className="bg-white rounded-lg shadow-sm border sticky top-4 max-h-screen overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: '#620080'}}>
                        <span className="text-white font-semibold">{selectedJob.company.charAt(0)}</span>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{selectedJob.title}</h2>
                        <p className="text-gray-600">{selectedJob.company}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedJob(null)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X size={20} className="text-gray-500" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedJob.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedJob.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedJob.experience}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button 
                      className="flex-1 text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                      style={{backgroundColor: '#620080'}}
                    >
                      Apply Now
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveJob(selectedJob.id);
                      }}
                      className={`px-6 py-3 rounded-lg border font-semibold transition-colors ${
                        savedJobs.has(selectedJob.id) 
                          ? 'text-white border-transparent' 
                          : 'hover:bg-purple-50 border-purple-300'
                      }`}
                      style={{
                        backgroundColor: savedJobs.has(selectedJob.id) ? '#620080' : 'transparent',
                        color: savedJobs.has(selectedJob.id) ? 'white' : '#620080'
                      }}
                    >
                      <Heart size={16} className={savedJobs.has(selectedJob.id) ? 'fill-current' : ''} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Job Description */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Job Description</h3>
                    <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                      {selectedJob.fullDescription}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Key Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.requirements.map((req, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Benefits</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedJob.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#620080'}}></div>
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Company Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">About {selectedJob.company}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {selectedJob.company} is a leading company in its field, committed to innovation and excellence. 
                      We offer a collaborative work environment where talented professionals can grow their careers 
                      and make a meaningful impact.
                    </p>
                  </div>

                  {/* Posted Info */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">Posted {selectedJob.posted}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Sidebar (Tablet and Desktop) - Hidden when job details are shown */}
          <div className={`hidden md:block space-y-6 transition-all duration-300 ${selectedJob ? 'hidden' : 'w-64 flex-shrink-0'}`}>
            
          </div>
          
          {/* Right margin for desktop */}
          <div className="hidden lg:block w-4"></div>
        </div>
      </div>

      {/* Mobile Job Details Modal */}
      {selectedJob && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="font-semibold text-gray-900">Job Details</h3>
              <button 
                onClick={() => setSelectedJob(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              {/* Mobile Job Details Content */}
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: '#620080'}}>
                      <span className="text-white font-semibold">{selectedJob.company.charAt(0)}</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedJob.title}</h2>
                      <p className="text-gray-600">{selectedJob.company}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedJob.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedJob.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedJob.experience}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button 
                      className="flex-1 text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                      style={{backgroundColor: '#620080'}}
                    >
                      Apply Now
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveJob(selectedJob.id);
                      }}
                      className={`px-6 py-3 rounded-lg border font-semibold transition-colors ${
                        savedJobs.has(selectedJob.id) 
                          ? 'text-white border-transparent' 
                          : 'hover:bg-purple-50 border-purple-300'
                      }`}
                      style={{
                        backgroundColor: savedJobs.has(selectedJob.id) ? '#620080' : 'transparent',
                        color: savedJobs.has(selectedJob.id) ? 'white' : '#620080'
                      }}
                    >
                      <Heart size={16} className={savedJobs.has(selectedJob.id) ? 'fill-current' : ''} />
                    </button>
                  </div>
                </div>

                {/* Job Description */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Job Description</h3>
                  <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {selectedJob.fullDescription}
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Key Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.requirements.map((req, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Benefits</h3>
                  <div className="space-y-2">
                    {selectedJob.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#620080'}}></div>
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Company Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">About {selectedJob.company}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedJob.company} is a leading company in its field, committed to innovation and excellence. 
                    We offer a collaborative work environment where talented professionals can grow their careers 
                    and make a meaningful impact.
                  </p>
                </div>

                {/* Posted Info */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Posted {selectedJob.posted}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default JobSearchPortal;