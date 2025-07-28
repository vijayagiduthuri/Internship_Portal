import React, { useState } from 'react';

const CompanyRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    logo: null,
    gst: '',
    cin: '',
    companySize: '',
    industry: '',
    description: '',
    headquarters: '',
    website: '',
    hrContactName: '',
    hrContactEmail: '',
    hrContactPhone: '',
    companyPhone: '',
    foundedYear: '',
    socialLinks: ''
  });
  const [errors, setErrors] = useState({});

  const steps = [
    { 
      number: 1, 
      title: 'Basic Info', 
      fields: ['companyName', 'companyEmail', 'companyPhone', 'website']
    },
    { 
      number: 2, 
      title: 'Legal Details', 
      fields: ['gst', 'cin', 'companySize', 'industry', 'headquarters', 'foundedYear']
    },
    { 
      number: 3, 
      title: 'Company Logo', 
      fields: ['logo']
    },
    { 
      number: 4, 
      title: 'Description', 
      fields: ['description']
    },
    { 
      number: 5, 
      title: 'HR Contact & Social', 
      fields: ['hrContactName', 'hrContactEmail', 'hrContactPhone', 'socialLinks']
    }
  ];

  const validateCurrentStep = () => {
    const newErrors = {};
    const currentStepFields = steps[currentStep - 1].fields;
    
    currentStepFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
      } else if (field.includes('Email') && !/\S+@\S+\.\S+/.test(formData[field])) {
        newErrors[field] = 'Invalid email';
      } else if (field.includes('Phone') && !/^[0-9]{10}$/.test(formData[field])) {
        newErrors[field] = 'Phone must be 10 digits';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        logo: file
      }));
      if (errors.logo) {
        setErrors(prev => ({
          ...prev,
          logo: ''
        }));
      }
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async () => {
    if (!validateCurrentStep()) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Company registered:', formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6 flex items-center" style={{ color: '#620080' }}>
              
              Basic Company Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                  style={{ '--tw-ring-color': '#620080' }}
                  placeholder="Company Name *"
                />
                {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
              </div>
              <div>
                <input
                  name="companyEmail"
                  type="email"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                  style={{ '--tw-ring-color': '#620080' }}
                  placeholder="Company Email *"
                />
                {errors.companyEmail && <p className="text-red-500 text-sm mt-1">{errors.companyEmail}</p>}
              </div>
              <div>
                <input
                  name="companyPhone"
                  type="tel"
                  value={formData.companyPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                  style={{ '--tw-ring-color': '#620080' }}
                  placeholder="Company Phone *"
                />
                {errors.companyPhone && <p className="text-red-500 text-sm mt-1">{errors.companyPhone}</p>}
              </div>
              <div>
                <input
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                  style={{ '--tw-ring-color': '#620080' }}
                  placeholder="Website URL *"
                />
                {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6 flex items-center" style={{ color: '#620080' }}>
              
              Legal & Business Details
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <input
                  name="gst"
                  value={formData.gst}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                  style={{ '--tw-ring-color': '#620080' }}
                  placeholder="GST Number *"
                />
                {errors.gst && <p className="text-red-500 text-sm mt-1">{errors.gst}</p>}
              </div>
              <div>
                <input
                  name="cin"
                  value={formData.cin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                  style={{ '--tw-ring-color': '#620080' }}
                  placeholder="CIN Number *"
                />
                {errors.cin && <p className="text-red-500 text-sm mt-1">{errors.cin}</p>}
              </div>
              <div>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
                  style={{ '--tw-ring-color': '#620080' }}
                >
                  <option value="">Select Company Size *</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201+">201+ employees</option>
                </select>
                {errors.companySize && <p className="text-red-500 text-sm mt-1">{errors.companySize}</p>}
              </div>
              <div>
                <input
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                  style={{ '--tw-ring-color': '#620080' }}
                  placeholder="Industry *"
                />
                {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
              </div>
              <div>
                <input
                  name="headquarters"
                  value={formData.headquarters}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                  style={{ '--tw-ring-color': '#620080' }}
                  placeholder="Headquarters *"
                />
                {errors.headquarters && <p className="text-red-500 text-sm mt-1">{errors.headquarters}</p>}
              </div>
              <div>
                <input
                  name="foundedYear"
                  type="number"
                  value={formData.foundedYear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                  style={{ '--tw-ring-color': '#620080' }}
                  placeholder="Founded Year *"
                />
                {errors.foundedYear && <p className="text-red-500 text-sm mt-1">{errors.foundedYear}</p>}
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6 flex items-center" style={{ color: '#620080' }}>
              
              Company Logo
            </h3>
            <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-opacity-60 transition-colors bg-white" style={{ borderColor: '#bf80d9' }}>
              <input
                type="file"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
                accept="image/*"
              />
              <label htmlFor="logo-upload" className="cursor-pointer">
                <div className="mb-4" style={{ color: '#a300d6' }}>
                  <svg className="mx-auto h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-xl text-gray-700 font-semibold mb-2">
                  {formData.logo ? formData.logo.name : 'Upload Company Logo'}
                </p>
                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
              </label>
            </div>
            {errors.logo && <p className="text-red-500 text-sm mt-2">{errors.logo}</p>}
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6 flex items-center" style={{ color: '#620080' }}>
              
              Company Description
            </h3>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
              style={{ '--tw-ring-color': '#620080' }}
              placeholder="Tell us about your company... *"
              rows="6"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6 flex items-center" style={{ color: '#620080' }}>
              
              HR Contact & Social Links
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <input
                  name="hrContactName"
                  value={formData.hrContactName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                  style={{ '--tw-ring-color': '#620080' }}
                  placeholder="HR Contact Name *"
                />
                {errors.hrContactName && <p className="text-red-500 text-sm mt-1">{errors.hrContactName}</p>}
              </div>
              <div>
                <input
                  name="hrContactEmail"
                  type="email"
                  value={formData.hrContactEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                  style={{ '--tw-ring-color': '#620080' }}
                  placeholder="HR Contact Email *"
                />
                {errors.hrContactEmail && <p className="text-red-500 text-sm mt-1">{errors.hrContactEmail}</p>}
              </div>
              <div>
                <input
                  name="hrContactPhone"
                  type="tel"
                  value={formData.hrContactPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                  style={{ '--tw-ring-color': '#620080' }}
                  placeholder="HR Contact Phone *"
                />
                {errors.hrContactPhone && <p className="text-red-500 text-sm mt-1">{errors.hrContactPhone}</p>}
              </div>
              <div>
                <input
                  name="socialLinks"
                  value={formData.socialLinks}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                  style={{ '--tw-ring-color': '#620080' }}
                  placeholder="Social Media URL *"
                />
                {errors.socialLinks && <p className="text-red-500 text-sm mt-1">{errors.socialLinks}</p>}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-8 px-4" style={{ background: 'linear-gradient(135deg, #620080 0%, #5a007a 25%, #4b0066 75%, #3d0052 100%)' }}>
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-20 animate-pulse" style={{ backgroundColor: '#8a00b3' }}></div>
      <div className="absolute top-20 right-16 w-16 h-16 rounded-full opacity-30 animate-bounce" style={{ backgroundColor: '#9900cc' }}></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full opacity-25" style={{ backgroundColor: '#7300a3' }}></div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-6 animate-bounce">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#620080' }}>
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
          </svg>
        </div>
        <h1 className="text-4xl lg:text-4xl font-bold text-white mb-4">Welcome to Internship Portal</h1>
        <p className="text-purple-200 text-lg mb-6">Register your company and start hiring</p>
      </div>

      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Step Navigation Sidebar */}
        <div className="w-80 bg-white rounded-2xl shadow-2xl p-6 h-fit sticky top-8">
          <h3 className="text-lg font-bold mb-6" style={{ color: '#620080' }}>Registration Steps</h3>
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center mr-4">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      currentStep === step.number 
                        ? 'text-white shadow-lg' 
                        : currentStep > step.number 
                        ? 'text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    style={{ 
                      backgroundColor: currentStep === step.number 
                        ? '#620080' 
                        : currentStep > step.number 
                        ? '#a300d6' 
                        : undefined 
                    }}
                  >
                    {currentStep > step.number ? '✓' : step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div 
                      className="w-0.5 h-8 mt-2"
                      style={{ 
                        backgroundColor: currentStep > step.number ? '#a300d6' : '#e5e7eb' 
                      }}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-xl mr-2">{step.icon}</span>
                    <div>
                      <p 
                        className={`font-semibold ${
                          currentStep === step.number 
                            ? 'text-purple-800' 
                            : currentStep > step.number 
                            ? 'text-purple-600' 
                            : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-400">Step {step.number} of {steps.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Form Container */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 relative overflow-hidden">
            {/* Form Header Decoration */}
            <div className="absolute top-0 left-0 w-full h-2" style={{ background: 'linear-gradient(90deg, #620080 0%, #7300a3 100%)' }}></div>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-gray-800">Company Registration</h2>
                <span className="text-sm text-gray-500">Step {currentStep} of {steps.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(currentStep / steps.length) * 100}%`,
                    background: 'linear-gradient(90deg, #620080 0%, #a300d6 100%)'
                  }}
                />
              </div>
            </div>

            {success && (
              <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center mb-6 animate-pulse border border-green-200">
                Registration successful! Welcome to Internship Portal!
              </div>
            )}

            {/* Step Content */}
            <div className="mb-8">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={prevStep}
                className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 ${
                  currentStep === 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled={currentStep === 1}
              >
                Previous
              </button>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  style={{ 
                    background: 'linear-gradient(135deg, #620080 0%, #5a007a 100%)'
                  }}
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onSubmit}
                  className="px-8 py-3 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:hover:transform-none"
                  style={{ 
                    background: 'linear-gradient(135deg, #620080 0%, #5a007a 100%)'
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registering...
                    </div>
                  ) : (
                    'Register Company'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistration;