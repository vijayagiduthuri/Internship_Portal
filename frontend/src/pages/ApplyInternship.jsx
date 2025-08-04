import React, { useState } from 'react';

const InternshipApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    internshipId: '',
    fullName: '',
    email: '',
    phone: '',
    education: {
      college: '',
      degree: '',
      branch: '',
      yearOfPassing: ''
    },
    resumeFile: null,
    coverLetter: ''
  });
  const [errors, setErrors] = useState({});

  const steps = [
    { 
      number: 1, 
      title: 'Personal Info', 
      fields: ['fullName', 'email', 'phone']
    },
    { 
      number: 2, 
      title: 'Education Details', 
      fields: ['education.college', 'education.degree', 'education.branch', 'education.yearOfPassing']
    },
    { 
      number: 3, 
      title: 'Resume Upload', 
      fields: ['resumeFile']
    },
    { 
      number: 4, 
      title: 'Cover Letter', 
      fields: []
    }
  ];

  const validateCurrentStep = () => {
    const newErrors = {};
    const currentStepFields = steps[currentStep - 1].fields;
    
    currentStepFields.forEach(field => {
      if (field === 'fullName' && !formData.fullName) {
        newErrors.fullName = 'Full name is required';
      } else if (field === 'email') {
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Invalid email';
        }
      } else if (field === 'phone') {
        if (!formData.phone) {
          newErrors.phone = 'Phone is required';
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
          newErrors.phone = 'Phone must be 10 digits';
        }
      } else if (field === 'education.college' && !formData.education.college) {
        newErrors['education.college'] = 'College is required';
      } else if (field === 'education.degree' && !formData.education.degree) {
        newErrors['education.degree'] = 'Degree is required';
      } else if (field === 'education.branch' && !formData.education.branch) {
        newErrors['education.branch'] = 'Branch is required';
      } else if (field === 'education.yearOfPassing' && !formData.education.yearOfPassing) {
        newErrors['education.yearOfPassing'] = 'Year of passing is required';
      } else if (field === 'resumeFile' && !formData.resumeFile) {
        newErrors.resumeFile = 'Resume is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('education.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        education: {
          ...prev.education,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024) {
        setFormData(prev => ({
          ...prev,
          resumeFile: file
        }));
        if (errors.resumeFile) {
          setErrors(prev => ({
            ...prev,
            resumeFile: ''
          }));
        }
      } else {
        setErrors(prev => ({ 
          ...prev, 
          resumeFile: 'Please upload a PDF file under 5MB' 
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

  const closeSuccessPopup = () => {
    setSuccess(false);
  };

  const onSubmit = async () => {
    if (!validateCurrentStep()) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Application submitted:', formData);
      setSuccess(true);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="rounded-lg p-4 mb-6" style={{ background: 'linear-gradient(135deg, #620080 0%, #5a007a 100%)' }}>
              <h3 className="text-xl font-semibold text-white flex items-center">
                Personal Information
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                    style={{ '--tw-ring-color': '#620080' }}
                    placeholder="Full Name *"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                    style={{ '--tw-ring-color': '#620080' }}
                    placeholder="Email Address *"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="lg:col-span-2">
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                    style={{ '--tw-ring-color': '#620080' }}
                    placeholder="Phone Number *"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="rounded-lg p-4 mb-6" style={{ background: 'linear-gradient(135deg, #620080 0%, #5a007a 100%)' }}>
              <h3 className="text-xl font-semibold text-white flex items-center">
                Education Details
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="lg:col-span-2">
                  <input
                    name="education.college"
                    value={formData.education.college}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                    style={{ '--tw-ring-color': '#620080' }}
                    placeholder="College/University Name *"
                  />
                  {errors['education.college'] && <p className="text-red-500 text-sm mt-1">{errors['education.college']}</p>}
                </div>
                <div>
                  <select
                    name="education.degree"
                    value={formData.education.degree}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
                    style={{ '--tw-ring-color': '#620080' }}
                  >
                    <option value="">Select Degree *</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="B.E">B.E</option>
                    <option value="BCA">BCA</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="MCA">MCA</option>
                    <option value="M.Sc">M.Sc</option>
                  </select>
                  {errors['education.degree'] && <p className="text-red-500 text-sm mt-1">{errors['education.degree']}</p>}
                </div>
                <div>
                  <input
                    name="education.branch"
                    value={formData.education.branch}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                    style={{ '--tw-ring-color': '#620080' }}
                    placeholder="Branch/Stream *"
                  />
                  {errors['education.branch'] && <p className="text-red-500 text-sm mt-1">{errors['education.branch']}</p>}
                </div>
                <div className="lg:col-span-2">
                  <select
                    name="education.yearOfPassing"
                    value={formData.education.yearOfPassing}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
                    style={{ '--tw-ring-color': '#620080' }}
                  >
                    <option value="">Select Year of Passing *</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {errors['education.yearOfPassing'] && <p className="text-red-500 text-sm mt-1">{errors['education.yearOfPassing']}</p>}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="rounded-lg p-4 mb-6" style={{ background: 'linear-gradient(135deg, #620080 0%, #5a007a 100%)' }}>
              <h3 className="text-xl font-semibold text-white flex items-center">
                Resume Upload
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-opacity-60 transition-colors" style={{ borderColor: '#bf80d9' }}>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                  accept=".pdf"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <div className="mb-4" style={{ color: '#a300d6' }}>
                    <svg className="mx-auto h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-xl text-gray-700 font-semibold mb-2">
                    {formData.resumeFile ? formData.resumeFile.name : 'Upload Resume (PDF)'}
                  </p>
                  <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PDF files up to 5MB</p>
                </label>
              </div>
              {errors.resumeFile && <p className="text-red-500 text-sm mt-2">{errors.resumeFile}</p>}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="rounded-lg p-4 mb-6" style={{ background: 'linear-gradient(135deg, #620080 0%, #5a007a 100%)' }}>
              <h3 className="text-xl font-semibold text-white flex items-center">
                Cover Letter
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400"
                style={{ '--tw-ring-color': '#620080' }}
                placeholder="Tell us why you're interested in this internship and what makes you a perfect candidate... (Optional)"
                rows="6"
              />
              {errors.coverLetter && <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 relative overflow-hidden">

      {/* Success Popup Modal */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative border-2" style={{ borderColor: '#ffffff' }}>
            {/* Close Button */}
            <button 
              onClick={closeSuccessPopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Success Content */}
            <div className="text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Success Message */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Application Submitted!</h3>
              <p className="text-gray-600 mb-6">
                Your internship application has been successfully submitted. We'll get back to you soon!
              </p>
              
              {/* OK Button */}
              <button
                onClick={closeSuccessPopup}
                className="px-8 py-3 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                style={{ background: 'linear-gradient(135deg, #620080 0%, #5a007a 100%)' }}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">

        <h1 className="text-4xl lg:text-4xl font-bold mb-4" style={{ color: '#620080' }}>Apply for Internship</h1>
        <p className="text-gray-600 text-lg mb-6">Join our team and start your career journey</p>
      </div>

      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Step Navigation Sidebar */}
        <div className="w-80 bg-white rounded-2xl shadow-2xl p-6 h-fit sticky top-8 border border-gray-100">
          <h3 className="text-lg font-bold mb-6" style={{ color: '#620080' }}>Application Steps</h3>
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
          <div className="bg-gray-50 rounded-2xl shadow-2xl p-8 lg:p-12 relative overflow-hidden border border-gray-100">
            {/* Form Header Decoration */}
            <div className="absolute top-0 left-0 w-full h-2" style={{ background: 'linear-gradient(90deg, #620080 0%, #7300a3 100%)' }}></div>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-gray-800">Internship Application</h2>
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
                      Submitting...
                    </div>
                  ) : (
                    'Submit Application'
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

export default InternshipApplicationForm;