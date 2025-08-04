import React, {useRef, useEffect } from "react";
import { useAuthstore } from "../store/useAuthstore";
import toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    phase,
    loading,
    email,
    otp,
    userName,
    password,
    emailError,
    otpError,
    credentialsError,

    setEmail,
    setOtp,
    setUserName,
    setPassword,
    handleEmailPhase,
    handleOtpPhase,
    handleSignupPhase,
  } = useAuthstore();
 const navigate = useNavigate();
  const otpInputs = useRef([...Array(6)].map(() => React.createRef()));
  const handleOtpInput = (e, idx) => {
    const v = e.target.value.replace(/[^0-9]/g, "");
    if (!v) {
      if (e.nativeEvent.inputType === "deleteContentBackward" && idx > 0) {
        otpInputs.current[idx - 1].current.focus();
      }
      let updated = [...otp];
      updated[idx] = "";
      setOtp(updated);
      return;
    }
    let updated = [...otp];
    updated[idx] = v[v.length-1];
    setOtp(updated);

    if (idx < 5 && v) otpInputs.current[idx + 1].current.focus();

    if (idx === 5 && updated.every(b => b)) {
      setTimeout(() => handleOtpPhase(updated,toast), 100);
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      e.preventDefault();
      let updated = [...otp];
      if (otp[idx]) {
        updated[idx] = '';
      } else if (idx > 0) {
        updated[idx - 1] = '';
        otpInputs.current[idx - 1].current.focus();
      }
      setOtp(updated);
    }
    if (e.key === "ArrowLeft" && idx > 0) {
      otpInputs.current[idx - 1].current.focus();
      const input = otpInputs.current[idx - 1].current;
      requestAnimationFrame(() => input.setSelectionRange(input.value.length, input.value.length));
    }
    if (e.key === "ArrowRight" && idx < 5) {
      otpInputs.current[idx + 1].current.focus();
    }
  };

  useEffect(() => {
    function handleEnter(e) {
      if (loading) return;
      if (e.key === "Enter") {
        if (phase==="email") handleEmailPhase(toast);
        if (phase==="credentials") handleSignupPhase(navigate , toast);
      }
    }
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [phase, email, userName, password, otp, loading, handleEmailPhase, handleSignupPhase, toast]);
  
const handleOtpPaste = (e) => {
  e.preventDefault();
  const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
  if (pastedData.length < 6) return;

  const newOtp = [...otp];
  for (let i = 0; i < 6; i++) {
    newOtp[i] = pastedData[i];
    if (otpInputs.current[i]?.current) {
      otpInputs.current[i].current.value = pastedData[i];
    }
  }
  setOtp(newOtp);
  // Optionally trigger OTP validation after paste
  if (newOtp.every((digit) => digit)) {
    setTimeout(() => handleOtpPhase(newOtp, toast), 100);
  }
};

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      {/* Left Panel - Welcome Section with Smooth Single Curved Right Edge */}
      <div 
        className="w-full lg:w-3/5 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden min-h-[300px] sm:min-h-[400px] lg:min-h-screen order-1 lg:order-1" 
        style={{ 
          backgroundColor: '#620080',
          clipPath: 'ellipse(100% 160% at 0% 50%)'
        }}
      >
        {/* Moved text content down with additional margin-top */}
        <div className="text-center z-10 mb-4 sm:mb-6 mt-16 sm:mt-20 lg:mt-10">
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-2 sm:mb-3 animate-pulse">
            Welcome to
          </h1>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mb-2 sm:mb-4">
            Student Portal
          </h2>
          <p className="text-sm sm:text-base font-medium px-4" style={{ color: '#E9D5FF' }}>
            Sign up to access your account
          </p>
        </div>

        <div className="flex-1 w-full flex items-center justify-center z-10 py-4">
          <div
            className="w-48 h-36 sm:w-56 sm:h-40 md:w-64 md:h-48 lg:w-72 lg:h-54 rounded-lg shadow-2xl flex items-center justify-center transform hover:scale-105 lg:hover:scale-110 transition-all duration-300"
            style={{
              background: 'linear-gradient(to bottom right, #8B5CF6, #730099)',
              animation: 'float 3s ease-in-out infinite'
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

        {/* Animated background elements - responsive sizes */}
        <div className="absolute top-6 sm:top-12 right-6 sm:right-12 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full opacity-10 animate-pulse" style={{ backgroundColor: '#8B5CF6' }}></div>
        <div className="absolute bottom-12 sm:bottom-24 left-6 sm:left-12 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full opacity-10 animate-bounce" style={{ backgroundColor: '#5A007A' }}></div>

        {/* Small decorative dots */}
        <div className="absolute top-3 sm:top-6 left-3 sm:left-6 w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse opacity-30" style={{ backgroundColor: '#C084FC' }}></div>
        <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full animate-ping opacity-30"></div>
      </div>
      
      {/* Right Panel - Form */}
      <div className="w-full lg:w-2/5 bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8 order-2 lg:order-2 relative">

        <div className="w-full max-w-md">
          <h1 className="text-gray-700 text-2xl sm:text-3xl font-bold mb-6 text-center">Sign Up</h1>

          <div className="space-y-4 sm:space-y-6">
            {/* PHASE: Email */}
            {phase === "email" && (
              <>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Email</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {/* Changed from @ icon to user profile icon */}
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      className={`w-full pl-10 sm:pl-12 pr-4 py-2.5 bg-gray-50 border ${
                        emailError ? "border-red-500 animate-shake" : "border-gray-300"
                      } rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoFocus
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    className="w-full cursor-pointer text-white font-bold shadow-md hover:scale-[1.02] sm:hover:scale-[1.05] shadow-purple-800 py-2.5 bg-gradient-to-bl from-purple-900 to-purple-900 rounded-md transition-transform duration-200 disabled:opacity-50"
                    onClick={()=>handleEmailPhase(toast)}
                    disabled={loading}
                  >
                    {loading ? "Sending OTP..." : "Get OTP"}
                  </button>
                </div>
              </>
            )}

            {/* PHASE: OTP */}
            {phase === "otp" && (
              <>
                <div>
                  <label className="block text-gray-700 text-sm mb-3">Enter 6-digit OTP</label>
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={otpInputs.current[i]}
                        value={digit}
                        maxLength={1}
                        inputMode="numeric"
                        onChange={(e) => handleOtpInput(e, i)}
                        onKeyDown={(e) => handleOtpKeyDown(e, i)}
                        className={`w-12 h-12 text-lg text-center font-bold bg-gray-50 border ${
                          otpError ? "border-red-500 animate-shake" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                        disabled={loading}
                          onPaste={(e) => handleOtpPaste(e)}
                      />
                    ))}
                  </div>
                   <div className="flex justify-between items-center mt-4 px-1 text-sm sm:text-base">
                    <span className="text-gray-500"></span>
                      <button
                        type="button"
                        className="text-purple-600 hover:underline font-medium ml-2"
                        onClick={() => handleEmailPhase(toast)}
                        disabled={loading}
                      >
                        Resend OTP
                      </button>
                    </div>
                </div>
              </>
            )}

            {/* PHASE: Credentials */}
            {phase === "credentials" && (
              <>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Username</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      className={`w-full pl-10 sm:pl-12 pr-4 py-2.5 bg-gray-50 border ${
                        credentialsError.userName ? "border-red-500 animate-shake" : "border-gray-300"
                      } rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Choose a username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      disabled={loading}
                      autoFocus
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      className={`w-full pl-10 sm:pl-12 pr-4 py-2.5 bg-gray-50 border ${
                        credentialsError.password ? "border-red-500 animate-shake" : "border-gray-300"
                      } rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    className="w-full cursor-pointer text-white font-bold shadow-md hover:scale-[1.02] sm:hover:scale-[1.05] shadow-purple-800 py-2.5 bg-gradient-to-bl from-purple-900 to-purple-900 rounded-md transition-transform duration-200 disabled:opacity-50"
                    onClick={()=>handleSignupPhase(navigate,toast)}
                    disabled={loading || !userName || !password}
                  >
                    {loading ? "Signing up..." : "Sign Up"}
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="mt-5 text-center">
            <span className="text-gray-500 text-sm">Already have an account? </span>
            <a href="/login" className="text-purple-600 text-sm hover:text-purple-800 transition-colors duration-200">
              Sign in
            </a>
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-fade-in {
          animation: fadeInUp 0.3s ease-out;
        }

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

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        /* Mobile responsiveness - remove curve on small screens */
        @media (max-width: 1023px) {
          .w-full.lg\\:w-3\\/5:first-child {
            clip-path: none !important;
          }
        }

        /* Prevent body scroll and hide scrollbars */
        body {
          overflow: hidden;
        }
        
        /* Hide scrollbars for webkit browsers */
        ::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbars for Firefox */
        html {
          scrollbar-width: none;
        }
        
        /* Hide scrollbars for IE and Edge */
        body {
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
};

export default Signup;