import { useState } from 'react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleGithubLogin = () => {
    console.log('GitHub login clicked');
  };

  return (
    <div className="h-screen flex">
      <div className="w-2/5 bg-white flex items-center justify-center p-6">

        <div className="w-full max-w-md">
          <h1 className="text-gray-700 text-3xl font-bold mb-6 text-center">Sign In</h1>


          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12 transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="text-left">
              <a href="#" className="text-purple-600 text-sm hover:text-purple-800 transition-colors duration-200">
                Forgot Password?
              </a>
            </div>

            <div class="flex justify-center">
              <button class="cursor-pointer text-white font-bold shadow-md hover:scale-[1.1] shadow-purple-400 px-50 py-2.5 bg-gradient-to-bl from-purple-500 to-purple-800">
                Signin
              </button>
            </div>


            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center py-2.5 px-4 border-2 border-purple-600 rounded-lg font-medium text-purple-600 bg-transparent hover:bg-purple-50 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <button
                onClick={handleGithubLogin}
                className="w-full flex items-center justify-center py-2.5 px-4 border-2 border-purple-600 rounded-lg font-medium text-purple-600 bg-transparent hover:bg-purple-50 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Continue with GitHub
              </button>
            </div>
          </div>

          <div className="mt-5 text-center">
            <span className="text-gray-500 text-sm">Don't have an account? </span>
            <a href="#" className="text-purple-600 text-sm hover:text-purple-800 transition-colors duration-200">
              Sign up
            </a>
          </div>
        </div>
      </div>

      
      <div className="w-3/5 flex flex-col justify-start items-center p-6 relative overflow-hidden" style={{ backgroundColor: '#620080' }}>
        <div className="text-center z-10 mt-6 mb-6 animate-slide-down">
          <h1 className="text-white text-8xl font-bold mb-3 animate-pulse" style={{ animation: 'slideInDown 1s ease-out, pulse 2s infinite' }}>Welcome to</h1>
          <h2 className="text-white text-6xl font-light mb-4 animate-fade-in-up" style={{ animation: 'fadeInUp 1.2s ease-out' }}>Internship Portal</h2>
          <p className="text-base font-medium animate-fade-in-up" style={{ color: '#E9D5FF', animation: 'fadeInUp 1.4s ease-out' }}>Login to access your account</p>
        </div>

        <div className="flex-1 w-full flex items-center justify-center z-10">
          <div
            className="w-64 h-48 rounded-lg shadow-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 animate-bounce-gentle"
            style={{
              background: 'linear-gradient(to bottom right, #8B5CF6, #730099)',
              animation: 'float 3s ease-in-out infinite, fadeInScale 1.6s ease-out'
            }}
          >
            <div className="flex justify-center">
              <img
                src="https://ddasf3j8zb8ok.cloudfront.net/new-website/images/cp-form-pic.svg"
                alt="Custom illustration"
                className="w-full h-full object-cover rounded-lg shadow-2xl transform hover:rotate-2 transition-all duration-300"
                style={{ animation: 'gentle-wiggle 4s ease-in-out infinite' }}
              />
            </div>


          </div>
        </div>

       
        <div className="absolute top-12 right-12 w-20 h-20 rounded-full opacity-10 animate-pulse" style={{ backgroundColor: '#8B5CF6' }}></div>
        <div className="absolute bottom-24 left-12 w-16 h-16 rounded-full opacity-10 animate-bounce" style={{ backgroundColor: '#5A007A' }}></div>

        
        <div className="absolute top-6 left-6 w-2 h-2 bg-white rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-20 right-20 w-3 h-3 rounded-full animate-pulse opacity-30" style={{ backgroundColor: '#C084FC' }}></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-white rounded-full animate-ping opacity-30"></div>
      </div>

      
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
      `}</style>
    </div>
  );
}