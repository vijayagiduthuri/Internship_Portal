import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const BASE_URL = "http://127.0.0.1:9000/api/authUsers/register";

  const [phase, setPhase] = useState("email");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [credentialsError, setCredentialsError] = useState({ userName: false, password: false });

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyToken, setVerifyToken] = useState("");

  const otpInputs = useRef([...Array(6)].map(() => React.createRef()));

  const isGmail = (val) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(val);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const triggerShake = (setFunc) => {
    setFunc(true);
    setTimeout(() => setFunc(false), 700);
  };

  const handleEmailPhase = async () => {
    if (!isGmail(email.trim())) {
      triggerShake(setEmailError);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(BASE_URL, { email: email});
      if (res.status === 200 && res.data.success) {
        showToast("OTP sent! Check your Gmail.");
        setPhase("otp");
      } else {
        showToast(res.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        triggerShake(setEmailError);
      } else {
        showToast(error.response?.data?.message || "Server error.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpPhase = async (enteredOtp) => {
    setLoading(true);
    try {
      const otpStr = (enteredOtp || otp).join("");
      const res = await axios.post(BASE_URL, {
        email: email.trim().toLowerCase(),
        otp: otpStr,
      });
      if (res.status === 200 && res.data.success && res.data.verifyToken) {
        setVerifyToken(res.data.verifyToken);
        showToast("OTP verified!");
        setPhase("credentials");
      } else {
        setOtp(["", "", "", "", "", ""]);
        triggerShake(setOtpError);
      }
    } catch (error) {
      setOtp(["", "", "", "", "", ""]);
      triggerShake(setOtpError);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupPhase = async () => {
    const errors = {};
    let hasErr = false;
    if (!userName) { errors.userName = true; hasErr = true;}
    if (!password || password.length < 6) { errors.password = true; hasErr = true;}
    setCredentialsError(errors);

    if (hasErr) return;

    setLoading(true);
    try {
      const res = await axios.post(BASE_URL, {
        email: email.trim().toLowerCase(),
        userName,
        password,
        verifyToken,
      });
      if (res.status === 201 && res.data.success) {
        showToast(res.data.message || "Registration successful!");
        setTimeout(() => navigate("/signin"), 1300);
      } else {
        if (res.data?.message?.toLowerCase().includes("username")) {
          triggerShake(() => setCredentialsError(prev => ({...prev, userName:true})));
        } else if (res.data?.message?.toLowerCase().includes("password")) {
          triggerShake(() => setCredentialsError(prev => ({...prev, password:true})));
        } else {
          showToast(res.data.message || "Signup failed.");
        }
      }
    } catch (error) {
      const msg = error.response?.data?.message || "";
      if (/user.?name/i.test(msg)) {
        triggerShake(() => setCredentialsError(prev => ({...prev, userName:true})));
      } else if (/password/i.test(msg)) {
        triggerShake(() => setCredentialsError(prev => ({...prev, password:true})));
      } else {
        showToast(msg || "Server error.");
      }
    } finally {
      setLoading(false);
    }
  };

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
      setTimeout(() => handleOtpPhase(updated), 100);
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpInputs.current[idx - 1].current.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) {
      otpInputs.current[idx - 1].current.focus();
    }
    if (e.key === "ArrowRight" && idx < 5) {
      otpInputs.current[idx + 1].current.focus();
    }
  };

  useEffect(() => setEmailError(false), [email]);
  useEffect(() => setOtpError(false), [otp.join("")]);
  useEffect(() => setCredentialsError({userName:false, password:false}), [userName, password]);

  useEffect(() => {
    function handleEnter(e) {
      if (loading) return;
      if (e.key === "Enter") {
        if (phase==="email") handleEmailPhase();
        if (phase==="credentials") handleSignupPhase();
      }
    }
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [phase, email, userName, password, otp, loading]);

  return (
<div className="flex min-h-screen font-montserrat bg-gradient-to-r from-[#eceafe] to-[#8938f9]">    {/* Left: Form Panel */}
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
              disabled={loading}
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
                  ref={otpInputs.current[i]}
                  value={digit}
                  maxLength={1}
                  inputMode="numeric"
                  onChange={(e) => handleOtpInput(e, i)}
                  onKeyDown={(e) => handleBackspace(e, i)}
                  className={`w-10 h-12 text-lg text-center font-bold bg-[#191c33] border ${
                    otpError ? "border-red-500 animate-shake" : "border-[#30305a]"
                  } rounded-md`}
                  disabled={loading}
                />
              ))}
            </div>
            <p className="text-xs text-[#d3cafa] mt-2">Auto submitting when OTP is complete</p>
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
                fieldError.username ? "border-red-500 animate-shake" : "border-[#30305a]"
              } rounded-md outline-none`}
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              disabled={loading}
              autoFocus
            />
          </div>
          <div className="mb-5 text-left">
            <label className="block text-sm font-bold text-[#c3bbee] mb-1">Password</label>
            <input
              className={`w-full px-4 py-3 text-white bg-[#191c33] border ${
                fieldError.password ? "border-red-500 animate-shake" : "border-[#30305a]"
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
            onClick={handleSignupPhase}
            disabled={loading || !username || !password}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </>
      )}

      <div className="mt-6 text-sm text-[#ccc]">
        Already have an account?{" "}
        <Link to="/signin" className="text-[#ae7bff] underline font-semibold">Log in</Link>
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
