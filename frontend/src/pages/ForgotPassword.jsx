import  { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthstore } from '../store/useAuthstore';
import toast from '../components/Toast';
const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
const [errors, setErrors] = useState({
  newPassword: null,
  confirmPassword: null,
});
  const [showSuccess, setShowSuccess] = useState(false);
  const otpRefs = useRef([]);
  const newpasswordInputRef = useRef(null);
  const confirmpasswordInputRef = useRef(null);
const {isGmail , handleForgotpassword , resetToken,currentStage,setCurrentStage} = useAuthstore()

const handleGetOTP = async () => {
  if (!isGmail(email)) {
    setErrors({ email: 'Please enter a valid email address' });
    return;
  }
  setErrors({});
  setLoading(true);
  try {
    let payload = { email: email.trim().toLowerCase() };
    await handleForgotpassword(payload, toast);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  } catch (error) {
    toast.error(error);
  } finally {
    setLoading(false);
  }
};

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Only allow digits
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-move to next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const digits = paste.match(/\d/g);
    
    if (digits && digits.length >= 6) {
      const newOtp = digits.slice(0, 6);
      setOtp(newOtp);
      otpRefs.current[5]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' });
      return;
    }
      const payload = {
        email: email.trim().toLowerCase(),
        otp: otpString,}
  setLoading(true);
  try {
    await handleForgotpassword(payload,toast);
  } catch (err) {
    toast.error("OTP verification failed.");
  } finally {
    setLoading(false);
  }
  };

  const handleSavePassword = async () => {
    const newErrors = {};
    if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters long';
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
      setErrors({});
        const payload = {
        email: email.trim().toLowerCase(),
        newPassword :newPassword,
        resetToken: resetToken,
      };
      setLoading(true);
      try {
        await handleForgotpassword( payload,toast);
        setShowSuccess(true);
      } catch (err) {
        toast.error("Password reset failed.");
      } finally {
        setLoading(false);
      }
    };

  const handleBack = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
      setErrors({});
    }
  };

useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (currentStage === 1) {
        handleGetOTP();
      } else if (currentStage === 2) {
        handleVerifyOTP();
      }
    }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [currentStage, handleGetOTP, handleVerifyOTP]);


  const getSubtitle = () => {
    switch (currentStage) {
      case 1:
        return "Don't Worry , We'll send you reset instruction";
      case 2:
        return "We've sent a 6-digit OTP to your email address. Please enter it below.";
      case 3:
        return "Please enter your new password and confirm it.";
      default:
        return "";
    }
  };

  // Eye icon component
  const EyeIcon = ({ isVisible, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
    >
      {isVisible ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
        </svg>
      )}
    </button>
  );

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-5 relative overflow-hidden">
        {/* Animated Background Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
          <div className="bubble bubble-4"></div>
          <div className="bubble bubble-5"></div>
          <div className="bubble bubble-6"></div>
          <div className="bubble bubble-7"></div>
          <div className="bubble bubble-8"></div>
        </div>
        
        <div className="bg-white rounded-2xl border border-gray-100 p-12 w-full max-w-md text-center relative z-10"
             style={{ 
               boxShadow: '0 20px 40px rgba(98, 0, 128, 0.15), 0 8px 16px rgba(98, 0, 128, 0.1)' 
             }}>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Password Reset Successful!</h3>
          <p className="text-gray-500 mb-8">Your password has been updated successfully. You can now login with your new password.</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm font-medium hover:underline transition-all duration-200 transform hover:scale-105"
            style={{ color: '#620080' }}
          >
            ← Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-5 relative overflow-hidden">
      {/* Animated Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
        <div className="bubble bubble-6"></div>
        <div className="bubble bubble-7"></div>
        <div className="bubble bubble-8"></div>
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-100 p-12 w-full max-w-md relative z-10" 
           style={{ 
             boxShadow: '0 20px 40px rgba(98, 0, 128, 0.15), 0 8px 16px rgba(98, 0, 128, 0.1)' 
           }}>
        
        {/* Question mark icon */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-gray-500 text-lg font-medium">?</span>
          </div>
        </div>
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mb-3" style={{ color: '#620080' }}>
            Forgot Password?
          </h1>
          <p className="text-gray-500 text-sm">
            {getSubtitle()}
          </p>
        </div>

        {/* Stage 1: Email */}
        {currentStage === 1 && (
          <form
              onSubmit={(e) => {
                e.preventDefault();       // Prevent page reload
                handleGetOTP();           // Your function to send OTP
              }}
              className="space-y-6"
            >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)
                  setErrors({})
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 transition-all duration-200"
                placeholder="john.doe@gmail.com"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2 animate-fade-in">{errors.email}</p>
              )}
            </div>
            <button
              onClick={handleGetOTP}
              disabled={loading}
              className="w-full py-3 px-6 text-white font-medium rounded-lg transition-all duration-200 hover:opacity-90 hover:shadow-lg transform hover:scale-105 active:scale-95 disabled:opacity-60 disabled:transform-none"
              style={{ backgroundColor: '#620080' }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending OTP...
                </div>
              ) : (
                'Get OTP'
              )}
            </button>
            <div className="flex justify-between items-center text-sm">
              <button
                onClick={() => navigate('/login')}
                className="flex items-center font-medium hover:underline transition-all duration-200 transform hover:scale-105"
                style={{ color: '#620080' }}
              >
                ← Back to login
              </button>
            </div>
          </div>
          </form>
        )}

        {/* Stage 2: OTP */}
        {currentStage === 2 && (
          <form
              onSubmit={(e) => {
                e.preventDefault();       // Prevent page reload
                handleGetOTP();           // Your function to send OTP
              }}
              className="space-y-6"
            >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Enter 6-Digit OTP
              </label>
              <div className="flex justify-center gap-3 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={handleOtpPaste}
                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-300"
                    disabled={loading}
                  />
                ))}
              </div>
              {errors.otp && (
                <p className="text-red-500 text-sm text-center animate-fade-in">{errors.otp}</p>
              )}
            </div>
            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full py-3 px-6 text-white font-medium rounded-lg transition-all duration-200 hover:opacity-90 hover:shadow-lg transform hover:scale-105 active:scale-95 disabled:opacity-60 disabled:transform-none"
              style={{ backgroundColor: '#620080' }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                'Verify OTP'
              )}
            </button>
            <div className="flex justify-between items-center text-sm">
              <button
                onClick={handleBack}
                className="flex items-center font-medium hover:underline transition-all duration-200 transform hover:scale-105"
                style={{ color: '#620080' }}
              >
                ← Back
              </button>
              <button
                onClick={() => handleGetOTP()}
                className="font-medium hover:underline transition-all duration-200 transform hover:scale-105"
                style={{ color: '#620080' }}
              >
                Resend OTP
              </button>
            </div>
          </div>
          </form>
        )}

        {/* Stage 3: New Password */}
        {currentStage === 3 && (
          <form
              onSubmit={(e) => {
                e.preventDefault();       // Prevent page reload
                handleGetOTP();           // Your function to send OTP
              }}
              className="space-y-6"
            >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (newPassword.length < 6) {
                        setErrors((prev) => ({...prev,newPassword: "Password must be at least 6 characters long"}));
                      } else {
                        setErrors((prev) => ({  ...prev, newPassword: null, }));
                        confirmpasswordInputRef.current?.focus();
                      }
                    }
                  }}
                  ref={newpasswordInputRef}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter new password"
                  disabled={loading}
                />
                <EyeIcon 
                  isVisible={showNewPassword} 
                  onClick={() => setShowNewPassword(!showNewPassword)} 
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-2 animate-fade-in">
                    {errors.newPassword}
                  </p>
                )}
            </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  ref={confirmpasswordInputRef}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (confirmPassword !== newPassword) {
                        setErrors((prev) => ({...prev,confirmPassword: "Passwords do not match"}));
                      }
                      else {
                        setErrors((prev) => ({...prev, confirmPassword: null }));
                      handleSavePassword();
                      }
                    }
                  }}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Confirm new password"
                  disabled={loading}
                />
                <EyeIcon 
                  isVisible={showConfirmPassword} 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2 animate-fade-in">{errors.confirmPassword}</p>
              )}
            </div>
            <button
              onClick={handleSavePassword}
              disabled={loading}
              className="w-full py-3 px-6 text-white font-medium rounded-lg transition-all duration-200 hover:opacity-90 hover:shadow-lg transform hover:scale-105 active:scale-95 disabled:opacity-60 disabled:transform-none"
              style={{ backgroundColor: '#620080' }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                'Save Password'
              )}
            </button>
            <div className="flex justify-center">
              <button
                onClick={()=> navigate('/login')}
                className="flex items-center text-sm font-medium hover:underline transition-all duration-200 transform hover:scale-105"
                style={{ color: '#620080' }}
              >
                ← Back
              </button>
            </div>
          </div>
          </form>
        )}
      </div>
    </div>
    
  );
};

export default ForgotPasswordPage;

// Add custom CSS for bubbles animation and additional effects
const styles = `
  .bubble {
    position: absolute;
    border-radius: 50%;
    opacity: 0.1;
    animation: float 6s ease-in-out infinite;
  }
  
  .bubble-1 {
    width: 80px;
    height: 80px;
    background: #620080;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
    animation-duration: 8s;
  }
  
  .bubble-2 {
    width: 60px;
    height: 60px;
    background: #9333ea;
    top: 20%;
    right: 15%;
    animation-delay: 1s;
    animation-duration: 10s;
  }
  
  .bubble-3 {
    width: 100px;
    height: 100px;
    background: #620080;
    bottom: 15%;
    left: 5%;
    animation-delay: 2s;
    animation-duration: 12s;
  }
  
  .bubble-4 {
    width: 40px;
    height: 40px;
    background: #a855f7;
    top: 60%;
    right: 10%;
    animation-delay: 3s;
    animation-duration: 9s;
  }
  
  .bubble-5 {
    width: 70px;
    height: 70px;
    background: #620080;
    top: 40%;
    left: 85%;
    animation-delay: 4s;
    animation-duration: 11s;
  }
  
  .bubble-6 {
    width: 50px;
    height: 50px;
    background: #c084fc;
    bottom: 30%;
    right: 25%;
    animation-delay: 5s;
    animation-duration: 7s;
  }
  
  .bubble-7 {
    width: 90px;
    height: 90px;
    background: #9333ea;
    top: 5%;
    left: 50%;
    animation-delay: 1.5s;
    animation-duration: 13s;
  }
  
  .bubble-8 {
    width: 35px;
    height: 35px;
    background: #620080;
    bottom: 10%;
    right: 5%;
    animation-delay: 2.5s;
    animation-duration: 8s;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) translateX(0px) scale(1);
      opacity: 0.1;
    }
    25% {
      transform: translateY(-20px) translateX(10px) scale(1.1);
      opacity: 0.2;
    }
    50% {
      transform: translateY(-10px) translateX(-15px) scale(0.9);
      opacity: 0.15;
    }
    75% {
      transform: translateY(-30px) translateX(5px) scale(1.05);
      opacity: 0.25;
    }
  }
  
  /* Pulse animation for some bubbles */
  .bubble-2, .bubble-5, .bubble-7 {
    animation: pulse 6s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.3;
    }
  }

  /* Fade in animation for error messages */
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}