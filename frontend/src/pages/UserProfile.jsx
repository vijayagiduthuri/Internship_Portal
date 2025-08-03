import  { useState, useCallback, memo } from 'react';
import { Edit3, MapPin, Mail, Phone, Calendar, Award, Briefcase, GraduationCap, User, Link, Plus, X } from 'lucide-react';
import { useAuthstore } from '../store/useAuthstore'
// Move InputField component outside and memoize it
const InputField = memo(({ label, value, onChange, type = "text", placeholder = "" }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {type === 'textarea' ? (
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    ) : (
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    )}
  </div>
));

// Move ProfileSection component outside and memoize it
const ProfileSection = memo(({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-lg p-6 mb-6" style={{ boxShadow: '0 10px 25px rgba(139, 69, 19, 0.15), 0 4px 12px rgba(139, 69, 19, 0.1)' }}>
    <div className="flex items-center mb-4">
      <Icon className="text-purple-600 mr-2" size={20} />
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </div>
    {children}
  </div>
));

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock username from signup - in your actual app, this would come from the auth store
  // You can replace this with: const { userName } = useAuthstore(); 
  const { userName } = useAuthstore();
  

  const [profile, setProfile] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      dateOfBirth: '',
      bio: '',
      profileImage: null
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    preferences: {
      desiredRole: '',
      workType: '',
      availability: '',
      salaryExpectation: ''
    }
  });

  // Fixed handleInputChange function
  const handleInputChange = useCallback((section, field, value, index = null, id = null) => {
    setProfile(prev => {
      if (index !== null || id !== null) {
        // Handle array items
        const newArray = [...prev[section]];
        if (id) {
          // Find item by ID and update it
          const itemIndex = newArray.findIndex(item => item.id === id);
          if (itemIndex !== -1) {
            newArray[itemIndex] = { ...newArray[itemIndex], [field]: value };
          }
        } else if (index !== null) {
          // Handle direct index update
          if (newArray[index]) {
            newArray[index] = { ...newArray[index], [field]: value };
          }
        }
        return { ...prev, [section]: newArray };
      } else if (section === 'personalInfo' || section === 'preferences') {
        // Handle nested objects
        return {
          ...prev,
          [section]: { ...prev[section], [field]: value }
        };
      }
      return prev;
    });
  }, []);

  const addItem = useCallback((section, newItem) => {
    setProfile(prev => ({
      ...prev,
      [section]: [...prev[section], { ...newItem, id: Date.now() + Math.random() }]
    }));
  }, []);

  const removeItem = useCallback((section, id) => {
    setProfile(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  }, []);

  const addSkill = useCallback((skill) => {
    if (skill && !profile.skills.includes(skill)) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  }, [profile.skills]);

  const removeSkill = useCallback((skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const sectionItems = [
    { id: 'personal-info', name: 'Personal Info', icon: User },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'skills', name: 'Skills', icon: Award },
    { id: 'projects', name: 'Projects', icon: Link },
    { id: 'certifications', name: 'Certifications', icon: Award },
    { id: 'preferences', name: 'Preferences', icon: Briefcase }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <div className="flex">
        {/* Side Panel */}
        <div className="w-64 fixed h-full overflow-y-auto" style={{
          background: 'linear-gradient(135deg, #620080 0%, #5a007a 25%, #4b0066 75%, #3d0052 100%)',
          boxShadow: '4px 0 15px rgba(139, 69, 19, 0.2)'
        }}>
          {/* User Info Section */}
          <div className="p-6 border-b border-purple-400">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mb-3" style={{ boxShadow: '0 4px 12px rgba(139, 69, 19, 0.15)' }}>
                {profile.personalInfo.profileImage ? (
                  <img src={profile.personalInfo.profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <User size={24} className="text-purple-800" />
                )}
              </div>
              {/* Display username from signup instead of full name */}

              <h3 className="font-semibold text-white text-sm">
                @{userName || 'username'}
              </h3>
              <p className="text-purple-200 text-xs mt-1">
                {profile.preferences.desiredRole || 'Your Role'}
              </p>
              {profile.personalInfo.location && (
                <div className="flex items-center text-purple-200 text-xs mt-2">
                  <MapPin size={12} className="mr-1" />
                  <span>{profile.personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="p-4">
            <nav className="space-y-2">
              {sectionItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full flex items-center px-3 py-2 text-left text-white hover:bg-purple-700 hover:text-purple-100 rounded-lg transition-colors text-sm"
                  style={{ boxShadow: 'inset 0 2px 4px rgba(139, 69, 19, 0.1)' }}
                >
                  <item.icon size={16} className="mr-3" />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Edit Button in Sidebar */}
          <div className="p-4 border-t border-purple-400 mt-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full bg-purple-200 text-purple-900 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center text-sm font-medium"
              style={{ boxShadow: '0 6px 16px rgba(139, 69, 19, 0.15)' }}
            >
              <Edit3 size={14} className="mr-2" />
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="rounded-lg p-6 mb-6" style={{
              background: 'linear-gradient(135deg, #620080 0%, #5a007a 25%, #4b0066 75%, #3d0052 100%)',
              boxShadow: '0 12px 32px rgba(139, 69, 19, 0.2), 0 6px 16px rgba(139, 69, 19, 0.1)'
            }}>
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-white">Profile Dashboard</h1>
                  <p className="text-purple-200 mt-1">Manage your internship profile information</p>
                </div>
                <div className="text-sm">
                  {isEditing ? (
                    <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full" style={{ boxShadow: '0 4px 12px rgba(139, 69, 19, 0.15)' }}>
                      Editing Mode
                    </span>
                  ) : (
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full" style={{ boxShadow: '0 4px 12px rgba(139, 69, 19, 0.15)' }}>
                      View Mode
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div id="personal-info">
              <ProfileSection title="Personal Information" icon={User}>
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="First Name"
                      value={profile.personalInfo.firstName}
                      onChange={(value) => handleInputChange('personalInfo', 'firstName', value)}
                      placeholder="Enter your first name"
                    />
                    <InputField
                      label="Last Name"
                      value={profile.personalInfo.lastName}
                      onChange={(value) => handleInputChange('personalInfo', 'lastName', value)}
                      placeholder="Enter your last name"
                    />
                    <InputField
                      label="Email"
                      type="email"
                      value={profile.personalInfo.email}
                      onChange={(value) => handleInputChange('personalInfo', 'email', value)}
                      placeholder="Enter your email address"
                    />
                    <InputField
                      label="Phone"
                      value={profile.personalInfo.phone}
                      onChange={(value) => handleInputChange('personalInfo', 'phone', value)}
                      placeholder="Enter your phone number"
                    />
                    <InputField
                      label="Location"
                      value={profile.personalInfo.location}
                      onChange={(value) => handleInputChange('personalInfo', 'location', value)}
                      placeholder="Enter your city, state"
                    />
                    <InputField
                      label="Date of Birth"
                      type="date"
                      value={profile.personalInfo.dateOfBirth}
                      onChange={(value) => handleInputChange('personalInfo', 'dateOfBirth', value)}
                    />
                    <div className="md:col-span-2">
                      <InputField
                        label="Bio"
                        type="textarea"
                        value={profile.personalInfo.bio}
                        onChange={(value) => handleInputChange('personalInfo', 'bio', value)}
                        placeholder="Tell us about yourself, your interests, and career goals..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.personalInfo.email ? (
                      <div className="flex items-center">
                        <Mail size={16} className="text-purple-600 mr-2" />
                        <span>{profile.personalInfo.email}</span>
                      </div>
                    ) : (
                      <div className="text-gray-400 italic">No email added</div>
                    )}
                    {profile.personalInfo.phone ? (
                      <div className="flex items-center">
                        <Phone size={16} className="text-purple-600 mr-2" />
                        <span>{profile.personalInfo.phone}</span>
                      </div>
                    ) : (
                      <div className="text-gray-400 italic">No phone number added</div>
                    )}
                    {profile.personalInfo.dateOfBirth ? (
                      <div className="flex items-center">
                        <Calendar size={16} className="text-purple-600 mr-2" />
                        <span>{new Date(profile.personalInfo.dateOfBirth).toLocaleDateString()}</span>
                      </div>
                    ) : (
                      <div className="text-gray-400 italic">No date of birth added</div>
                    )}
                    <div className="md:col-span-2 mt-2">
                      {profile.personalInfo.bio ? (
                        <p className="text-gray-700">{profile.personalInfo.bio}</p>
                      ) : (
                        <p className="text-gray-400 italic">No bio added. Click 'Edit Profile' to add your bio.</p>
                      )}
                    </div>
                  </div>
                )}
              </ProfileSection>
            </div>

            {/* Education */}
            <div id="education">
              <ProfileSection title="Education" icon={GraduationCap}>
                {profile.education.length === 0 && !isEditing ? (
                  <div className="text-center py-8">
                    <GraduationCap size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-400 italic">No education information added yet.</p>
                    <p className="text-gray-400 text-sm">Click 'Edit Profile' to add your educational background.</p>
                  </div>
                ) : (
                  profile.education.map((edu) => (
                    <div key={edu.id} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
                      {isEditing ? (
                        <div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <InputField
                              label="Institution"
                              value={edu.institution || ''}
                              onChange={(value) => handleInputChange('education', 'institution', value, null, edu.id)}
                              placeholder="University/College name"
                            />
                            <InputField
                              label="Degree"
                              value={edu.degree || ''}
                              onChange={(value) => handleInputChange('education', 'degree', value, null, edu.id)}
                              placeholder="Bachelor of Science in Computer Science"
                            />
                            <InputField
                              label="Start Date"
                              type="month"
                              value={edu.startDate || ''}
                              onChange={(value) => handleInputChange('education', 'startDate', value, null, edu.id)}
                            />
                            <InputField
                              label="End Date"
                              type="month"
                              value={edu.endDate || ''}
                              onChange={(value) => handleInputChange('education', 'endDate', value, null, edu.id)}
                            />
                            <InputField
                              label="GPA"
                              value={edu.gpa || ''}
                              onChange={(value) => handleInputChange('education', 'gpa', value, null, edu.id)}
                              placeholder="3.8"
                            />
                            <InputField
                              label="Relevant Coursework"
                              value={edu.relevant || ''}
                              onChange={(value) => handleInputChange('education', 'relevant', value, null, edu.id)}
                              placeholder="Data Structures, Algorithms, Web Development"
                            />
                          </div>
                          <button
                            onClick={() => removeItem('education', edu.id)}
                            className="text-red-600 hover:text-red-800 flex items-center"
                          >
                            <X size={16} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">{edu.institution}</h3>
                          <p className="text-purple-600 font-medium">{edu.degree}</p>
                          <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
                          <p className="text-gray-600">GPA: {edu.gpa}</p>
                          <p className="text-gray-700 mt-2">Relevant Coursework: {edu.relevant}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
                {isEditing && (
                  <button
                    onClick={() => addItem('education', {
                      institution: '',
                      degree: '',
                      startDate: '',
                      endDate: '',
                      gpa: '',
                      relevant: ''
                    })}
                    className="text-purple-600 hover:text-purple-800 flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Education
                  </button>
                )}
              </ProfileSection>
            </div>

            {/* Experience */}
            <div id="experience">
              <ProfileSection title="Experience" icon={Briefcase}>
                {profile.experience.length === 0 && !isEditing ? (
                  <div className="text-center py-8">
                    <Briefcase size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-400 italic">No work experience added yet.</p>
                    <p className="text-gray-400 text-sm">Click 'Edit Profile' to add your experience.</p>
                  </div>
                ) : (
                  profile.experience.map((exp) => (
                    <div key={exp.id} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
                      {isEditing ? (
                        <div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <InputField
                              label="Company"
                              value={exp.company || ''}
                              onChange={(value) => handleInputChange('experience', 'company', value, null, exp.id)}
                              placeholder="Company name"
                            />
                            <InputField
                              label="Position"
                              value={exp.position || ''}
                              onChange={(value) => handleInputChange('experience', 'position', value, null, exp.id)}
                              placeholder="Your position/role"
                            />
                            <InputField
                              label="Start Date"
                              type="month"
                              value={exp.startDate || ''}
                              onChange={(value) => handleInputChange('experience', 'startDate', value, null, exp.id)}
                            />
                            <InputField
                              label="End Date"
                              type="month"
                              value={exp.endDate || ''}
                              onChange={(value) => handleInputChange('experience', 'endDate', value, null, exp.id)}
                            />
                            <div className="md:col-span-2">
                              <InputField
                                label="Description"
                                type="textarea"
                                value={exp.description || ''}
                                onChange={(value) => handleInputChange('experience', 'description', value, null, exp.id)}
                                placeholder="Describe your responsibilities and achievements..."
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem('experience', exp.id)}
                            className="text-red-600 hover:text-red-800 flex items-center"
                          >
                            <X size={16} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">{exp.company}</h3>
                          <p className="text-purple-600 font-medium">{exp.position}</p>
                          <p className="text-gray-600">{exp.startDate} - {exp.endDate}</p>
                          <p className="text-gray-700 mt-2">{exp.description}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
                {isEditing && (
                  <button
                    onClick={() => addItem('experience', {
                      company: '',
                      position: '',
                      startDate: '',
                      endDate: '',
                      description: ''
                    })}
                    className="text-purple-600 hover:text-purple-800 flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Experience
                  </button>
                )}
              </ProfileSection>
            </div>

            {/* Skills */}
            <div id="skills">
              <ProfileSection title="Skills" icon={Award}>
                {profile.skills.length === 0 && !isEditing ? (
                  <div className="text-center py-8">
                    <Award size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-400 italic">No skills added yet.</p>
                    <p className="text-gray-400 text-sm">Click 'Edit Profile' to add your skills.</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center"
                        style={{ boxShadow: '0 4px 12px rgba(139, 69, 19, 0.1)' }}
                      >
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-purple-600 hover:text-purple-800"
                          >
                            <X size={12} />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                )}
                {isEditing && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Add a skill and press Enter"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      style={{ boxShadow: '0 4px 12px rgba(139, 69, 19, 0.1)' }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addSkill(e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                )}
              </ProfileSection>
            </div>

            {/* Projects */}
            <div id="projects">
              <ProfileSection title="Projects" icon={Link}>
                {profile.projects.length === 0 && !isEditing ? (
                  <div className="text-center py-8">
                    <Link size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-400 italic">No projects added yet.</p>
                    <p className="text-gray-400 text-sm">Click 'Edit Profile' to showcase your projects.</p>
                  </div>
                ) : (
                  profile.projects.map((project) => (
                    <div key={project.id} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
                      {isEditing ? (
                        <div>
                          <div className="grid grid-cols-1 gap-4 mb-4">
                            <InputField
                              label="Project Name"
                              value={project.name || ''}
                              onChange={(value) => handleInputChange('projects', 'name', value, null, project.id)}
                              placeholder="My awesome project"
                            />
                            <InputField
                              label="Description"
                              type="textarea"
                              value={project.description || ''}
                              onChange={(value) => handleInputChange('projects', 'description', value, null, project.id)}
                              placeholder="Describe what your project does and what you learned..."
                            />
                            <InputField
                              label="Technologies"
                              value={project.technologies || ''}
                              onChange={(value) => handleInputChange('projects', 'technologies', value, null, project.id)}
                              placeholder="React, Node.js, MongoDB"
                            />
                            <InputField
                              label="Link"
                              value={project.link || ''}
                              onChange={(value) => handleInputChange('projects', 'link', value, null, project.id)}
                              placeholder="https://github.com/username/project"
                            />
                          </div>
                          <button
                            onClick={() => removeItem('projects', project.id)}
                            className="text-red-600 hover:text-red-800 flex items-center"
                          >
                            <X size={16} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">{project.name}</h3>
                          <p className="text-gray-700 mt-1">{project.description}</p>
                          <p className="text-purple-600 mt-1">Technologies: {project.technologies}</p>
                          {project.link && (
                            <a
                              href={project.link}
                              className="text-purple-600 hover:underline mt-1 inline-block"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Project →
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
                {isEditing && (
                  <button
                    onClick={() => addItem('projects', {
                      name: '',
                      description: '',
                      technologies: '',
                      link: ''
                    })}
                    className="text-purple-600 hover:text-purple-800 flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Project
                  </button>
                )}
              </ProfileSection>
            </div>

            {/* Certifications */}
            <div id="certifications">
              <ProfileSection title="Certifications" icon={Award}>
                {profile.certifications.length === 0 && !isEditing ? (
                  <div className="text-center py-8">
                    <Award size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-400 italic">No certifications added yet.</p>
                    <p className="text-gray-400 text-sm">Click 'Edit Profile' to add your certifications.</p>
                  </div>
                ) : (
                  profile.certifications.map((cert) => (
                    <div key={cert.id} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
                      {isEditing ? (
                        <div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <InputField
                              label="Certification Name"
                              value={cert.name || ''}
                              onChange={(value) => handleInputChange('certifications', 'name', value, null, cert.id)}
                              placeholder="AWS Cloud Practitioner"
                            />
                            <InputField
                              label="Issuer"
                              value={cert.issuer || ''}
                              onChange={(value) => handleInputChange('certifications', 'issuer', value, null, cert.id)}
                              placeholder="Amazon Web Services"
                            />
                            <InputField
                              label="Date"
                              type="month"
                              value={cert.date || ''}
                              onChange={(value) => handleInputChange('certifications', 'date', value, null, cert.id)}
                            />
                          </div>
                          <button
                            onClick={() => removeItem('certifications', cert.id)}
                            className="text-red-600 hover:text-red-800 flex items-center"
                          >
                            <X size={16} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">{cert.name}</h3>
                          <p className="text-purple-600">{cert.issuer}</p>
                          <p className="text-gray-600">{cert.date}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
                {isEditing && (
                  <button
                    onClick={() => addItem('certifications', {
                      name: '',
                      issuer: '',
                      date: ''
                    })}
                    className="text-purple-600 hover:text-purple-800 flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Certification
                  </button>
                )}
              </ProfileSection>
            </div>


            {/* Preferences */}
            <div id="preferences">
              <ProfileSection title="Internship Preferences" icon={Briefcase}>
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Desired Role"
                      value={profile.preferences.desiredRole}
                      onChange={(value) => handleInputChange('preferences', 'desiredRole', value)}
                      placeholder="Software Development Intern"
                    />
                    <InputField
                      label="Work Type"
                      value={profile.preferences.workType}
                      onChange={(value) => handleInputChange('preferences', 'workType', value)}
                      placeholder="Remote, On-site, Hybrid"
                    />
                    <InputField
                      label="Availability"
                      value={profile.preferences.availability}
                      onChange={(value) => handleInputChange('preferences', 'availability', value)}
                      placeholder="Full-time (Summer 2024)"
                    />
                    <InputField
                      label="Salary Expectation"
                      value={profile.preferences.salaryExpectation}
                      onChange={(value) => handleInputChange('preferences', 'salaryExpectation', value)}
                      placeholder="$15-20/hour"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800">Desired Role</h4>
                      <p className="text-gray-600">{profile.preferences.desiredRole || 'Not specified'}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Work Type</h4>
                      <p className="text-gray-600">{profile.preferences.workType || 'Not specified'}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Availability</h4>
                      <p className="text-gray-600">{profile.preferences.availability || 'Not specified'}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Salary Expectation</h4>
                      <p className="text-gray-600">{profile.preferences.salaryExpectation || 'Not specified'}</p>
                    </div>
                  </div>
                )}
              </ProfileSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;