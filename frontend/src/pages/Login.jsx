import { useRef, useState } from 'react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const passwordInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isGmail = (val) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(val);

  const validateForm = () => {
    if (!formData.email) {
      alert('Email is required!');
      return false;
    }
    if (!formData.password) {
      alert('Password is required!');
      return false;
    }
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Login attempt:', formData);
      // Handle login logic here
    }
  };

  const handleLogin = (data) => {
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => {
        console.log('Login successful:', data);
        setLoading(false);
      }, 2000);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Google login successful!');
    } catch (error) {
      console.error('Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('GitHub login successful!');
    } catch (error) {
      console.error('GitHub login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
  window.location.href = '/forgot-password';
};

const handleSignUp = () => {
  window.location.href = '/signup';
};
  const triggerShake = (type) => {
    console.log('Shake triggered:', type);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      {/* Mobile/Tablet Header Section */}
      <div className="lg:hidden w-full bg-gradient-to-br from-purple-900 to-purple-800 px-4 py-8 sm:py-12 md:py-16 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2 animate-pulse">
            Welcome to
          </h1>
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-light mb-4">
            Internship Portal
          </h2>
          <p className="text-purple-100 text-sm sm:text-base px-4">
            Login to access your account
          </p>
        </div>
        
        {/* Mobile decorative elements */}
        <div className="absolute top-4 right-4 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white opacity-10 animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-300 opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 right-8 w-2 h-2 bg-white rounded-full animate-ping opacity-30"></div>
      </div>

      {/* Left Panel - Form */}
      <div className="w-full lg:w-2/5 bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-20 min-h-0 lg:min-h-screen">
        <div className="w-full max-w-md">
          <h1 className="text-gray-700 text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center lg:block hidden">
            Sign In
          </h1>
          <h1 className="text-gray-700 text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center lg:hidden">
            Sign In to Continue
          </h1>

          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <div>
              <label className="block text-gray-700 text-sm mb-2">Email</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (isGmail(formData.email)) {
                        passwordInputRef.current?.focus();
                      } else {
                        alert("Please enter a valid Gmail address!");
                        triggerShake("emailError");
                      }
                    }
                  }}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  ref={passwordInputRef}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className="w-full pl-10 sm:pl-12 pr-12 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 disabled:opacity-50 p-1"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="text-left">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                className="text-purple-600 text-sm hover:text-purple-800 transition-colors duration-200 disabled:opacity-50 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <div className="flex justify-center">
              <button 
                type="button"
                onClick={() => handleLogin(formData)}
                disabled={loading}
                className="w-full cursor-pointer text-white font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] shadow-purple-800 py-2.5 sm:py-3 bg-gradient-to-bl from-purple-900 to-purple-900 rounded-md transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center my-4 sm:my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center py-2.5 sm:py-3 px-4 border-2 border-purple-600 rounded-lg font-medium text-purple-600 bg-transparent hover:bg-purple-50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="truncate">Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={handleGithubLogin}
              disabled={loading}
              className="w-full flex items-center justify-center py-2.5 sm:py-3 px-4 border-2 border-purple-600 rounded-lg font-medium text-purple-600 bg-transparent hover:bg-purple-50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="truncate">Continue with GitHub</span>
            </button>
          </div>

          <div className="mt-4 sm:mt-6 text-center">
            <span className="text-gray-500 text-sm">Don't have an account? </span>
            <button
              onClick={handleSignUp}
              className="text-purple-600 text-sm hover:text-purple-800 transition-colors duration-200 hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Curved Divider - Hidden on mobile/tablet */}
      <div className="absolute left-0 lg:left-[40%] top-0 h-full w-full lg:w-[150px] z-10 hidden lg:block">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M 0 0 Q 50 50 0 100 L 100 100 L 100 0 Z"
            fill="#620080"
          />
        </svg>
      </div>

      {/* Right Panel - Welcome Section (Desktop Only) */}
      <div className="hidden lg:flex w-full lg:w-3/5 flex-col justify-start items-center p-4 sm:p-6 lg:p-8 pt-8 sm:pt-12 lg:pt-16 relative overflow-hidden min-h-screen ml-0 lg:ml-[60px]" style={{ backgroundColor: '#620080' }}>
        <div className="text-center z-10 mb-4 sm:mb-6 animate-slide-down">
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-2 sm:mb-3 animate-pulse">
            Welcome to
          </h1>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mb-2 sm:mb-4 animate-fade-in-up">
            Internship Portal
          </h2>
          <p className="text-sm sm:text-base font-medium animate-fade-in-up px-4" style={{ color: '#E9D5FF' }}>
            Login to access your account
          </p>
        </div>

        <div className="flex-1 w-full flex items-center justify-center z-10 py-4">
          <div
            className="w-48 h-36 sm:w-56 sm:h-40 md:w-64 md:h-48 lg:w-72 lg:h-54 rounded-lg shadow-2xl flex items-center justify-center transform hover:scale-105 lg:hover:scale-110 transition-all duration-300 animate-bounce-gentle"
            style={{
              background: 'linear-gradient(to bottom right, #8B5CF6, #730099)',
            }}
          >
            <div className="flex justify-center p-2">
              <img
                src="https://ddasf3j8zb8ok.cloudfront.net/new-website/images/cp-form-pic.svg"
                alt="Custom illustration"
                className="w-full h-full object-cover rounded-lg shadow-2xl transform hover:rotate-2 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-6 sm:top-12 right-6 sm:right-12 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full opacity-10 animate-pulse" style={{ backgroundColor: '#8B5CF6' }}></div>
        <div className="absolute bottom-12 sm:bottom-24 left-6 sm:left-12 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full opacity-10 animate-bounce" style={{ backgroundColor: '#5A007A' }}></div>

        {/* Small decorative dots */}
        <div className="absolute top-3 sm:top-6 left-3 sm:left-6 w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse opacity-30" style={{ backgroundColor: '#C084FC' }}></div>
        <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full animate-ping opacity-30"></div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes gentle-wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(1deg);
          }
          75% {
            transform: rotate(-1deg);
          }
        }

        .animate-slide-down {
          animation: slideInDown 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1.2s ease-out;
        }
        
        .animate-bounce-gentle {
          animation: float 3s ease-in-out infinite, fadeInScale 1.6s ease-out;
        }

        /* Mobile-specific styles */
        @media (max-width: 1023px) {
          .min-h-screen {
            min-height: 100vh;
            min-height: 100dvh; /* Dynamic viewport height for mobile */
          }
        }

        /* Tablet landscape adjustments */
        @media (min-width: 768px) and (max-width: 1023px) and (orientation: landscape) {
          .lg\\:hidden {
            padding: 2rem 1rem;
          }
        }

        /* Small mobile adjustments */
        @media (max-width: 480px) {
          .min-h-screen {
            font-size: 14px;
          }
        }

        /* Very small mobile */
        @media (max-width: 320px) {
          input, button {
            padding-top: 0.625rem;
            padding-bottom: 0.625rem;
          }
        }

        /* Prevent zoom on iOS */
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          select,
          textarea,
          input[type="text"],
          input[type="password"],
          input[type="datetime"],
          input[type="datetime-local"],
          input[type="date"],
          input[type="month"],
          input[type="time"],
          input[type="week"],
          input[type="number"],
          input[type="email"],
          input[type="url"],
          input[type="search"],
          input[type="tel"],
          input[type="color"] {
            font-size: 16px;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          button {
            min-height: 44px; /* Minimum touch target size */
          }
          
          .hover\\:scale-\\[1\\.02\\]:hover {
            transform: scale(1);
          }
          
          .hover\\:bg-purple-50:hover {
            background-color: transparent;
          }
        }
      `}</style>
    </div>
  );
}