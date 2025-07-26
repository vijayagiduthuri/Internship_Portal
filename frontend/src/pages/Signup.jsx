import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignupStore } from "../store/useAuthstore";

const Signup = () => {
const navigate = useNavigate();
  const {
    phase,
    loading,
    toast,
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
  } = useSignupStore();

  const otpRefs = useRef([...Array(6)].map(() => React.createRef()));

const handleOtpInput = (e, idx) => {
  const v = e.target.value.replace(/[^0-9]/g, "");
  const updated = [...otp];

  if (v) {
    updated[idx] = v.slice(-1);
    setOtp(updated);
    // 👉 Set cursor at end
    requestAnimationFrame(() => {
      const input = otpRefs.current[idx].current;
      input.setSelectionRange(1, 1); // move caret to end
    });
    if (idx < 5) {
      otpRefs.current[idx + 1].current?.focus();
    }
    if (idx === 5 && updated.every(i => i)) {
      setTimeout(() => handleOtpPhase(updated), 200);
    }
  } else {
    updated[idx] = "";
    setOtp(updated);
    if (idx > 0) {
      otpRefs.current[idx - 1].current?.focus();
    }
  }
};

const handleOtpKeyDown = (e, idx) => {
  const key = e.key;
  if (key === "Backspace") {
    const currentOTP = [...otp];
    if (otp[idx]) {
      // If current has value, clear it and stay in place
      currentOTP[idx] = "";
      setOtp(currentOTP);
      requestAnimationFrame(() => {
        const target = otpRefs.current[idx].current;
        target.focus();
        target.setSelectionRange(1, 1); // caret after input (optional)
      });
    } else if (idx > 0) {
      // If already empty, go to previous
      requestAnimationFrame(() => {
        const prev = otpRefs.current[idx - 1].current;
        prev.focus();
        prev.setSelectionRange(1, 1);
      });
    }
    return; // prevent key from bubbling
  }
  if (key === "ArrowLeft" && idx > 0) {
    otpRefs.current[idx - 1].current.focus();
    return;
  }
  if (key === "ArrowRight" && idx < otp.length - 1) {
    otpRefs.current[idx + 1].current.focus();
    return;
  }
};


useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        if (phase==="email") handleEmailPhase();
        if (phase==="credentials") handleSignupPhase();
      }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [phase, loading, handleEmailPhase]); 

  return (

    <div className="flex min-h-screen font-montserrat bg-gradient-to-r from-[#eceafe] to-[#8938f9]">  
    {loading && (
  <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex items-center justify-center z-50">
    <div className="w-12 h-12 border-4 border-white border-dashed rounded-full animate-spin" />
  </div>
)}
  {/* Left: Form Panel */}
    <div className="flex-1 bg-[#15172b] text-white rounded-l-2xl flex flex-col justify-center px-10 min-w-[340px]">
      <h2 className="text-3xl font-extrabold mb-2">Sign Up</h2>
      <p className="mb-6 text-[#d3cafa] text-base">Create your account</p>

      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in bg-black bg-opacity-80 text-white px-6 py-3 rounded shadow-lg transition">
          {toast}
        </div>
      )}

      {/* PHASE: Email */}
      {phase === "email" && (
        <>
          <div className="mb-5 text-left">
            <label className="block text-sm font-bold text-[#c3bbee] mb-1">Gmail</label>
            <input
              className={`w-full px-4 py-3 text-white bg-[#191c33] border ${
                emailError ? "border-red-500 animate-shake" : "border-[#30305a]"
              } rounded-md outline-none`}
              type="email"
              placeholder="youraddress@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>
          <button
            className="w-full py-3 mt-2 bg-gradient-to-r from-[#8b39fa] to-[#470899] rounded-md font-bold cursor-pointer"
            onClick={handleEmailPhase}
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Get OTP"}
          </button>
        </>
      )}

      {/* PHASE: OTP */}
      {phase === "otp" && (
        <>
          <div className="mb-5 text-left">
            <label className="block text-sm font-bold text-[#c3bbee] mb-2">Enter 6-digit OTP</label>
            <div className="flex gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={otpRefs.current[i]}
                  value={digit}
                  maxLength={1}
                  inputMode="numeric"
                  onChange={(e) => handleOtpInput(e, i)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)} 
                  className={`w-10 h-12 text-lg text-center font-bold bg-[#191c33] border ${
                    otpError ? "border-red-500 animate-shake" : "border-[#30305a]"
                  } rounded-md`}
                  disabled={loading}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* PHASE: Credentials */}
      {phase === "credentials" && (
        <>
          <div className="mb-5 text-left">
            <label className="block text-sm font-bold text-[#c3bbee] mb-1">Username</label>
            <input
              className={`w-full px-4 py-3 text-white bg-[#191c33] border ${
                credentialsError.userName ? "border-red-500 animate-shake" : "border-[#30305a]"
              } rounded-md outline-none`}
              placeholder="Choose a username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={loading}
              autoFocus
            />
          </div>
          <div className="mb-5 text-left">
            <label className="block text-sm font-bold text-[#c3bbee] mb-1">Password</label>
            <input
              className={`w-full px-4 py-3 text-white bg-[#191c33] border ${
                credentialsError.password ? "border-red-500 animate-shake" : "border-[#30305a]"
              } rounded-md outline-none`}
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <button
            className="w-full py-3 mt-2 bg-gradient-to-r from-[#8b39fa] to-[#470899] rounded-md font-bold cursor-pointer"
            onClick={() => handleSignupPhase(navigate)}
            disabled={loading || !userName || !password}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </>
      )}

      <div className="mt-6 text-sm text-[#ccc]">
        Already have an account?{" "}
        <Link to="/login" className="text-[#ae7bff] underline font-semibold">Log in</Link>
      </div>
    </div>

    {/* Right Info Panel */}
    <div className="flex-1.2 rounded-r-2xl bg-gradient-to-br from-[#a47cf6] to-[#702dbb] flex flex-col items-center justify-center px-12 text-white min-w-[350px] text-center">
      <h1 className="text-4xl font-extrabold opacity-90 mb-0">Welcome to</h1>
      <h2 className="text-2xl font-semibold text-[#e2d1f3] mb-6 tracking-wider">student portal</h2>
      <p className="text-lg text-[#dacfef] mb-10">Sign up to access your account</p>
      <div
        className="w-[210px] h-[135px] rounded-xl bg-cover bg-center opacity-90"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2017/01/31/13/05/teacher-2027511_1280.png')",
        }}
      />
    </div>
  </div>
  );
};

export default Signup;
