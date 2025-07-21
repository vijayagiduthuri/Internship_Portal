import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const BASE_URL = "http://127.0.0.1:8000/api/auth/register";

  // UI states
  const [phase, setPhase] = useState("email"); // "email" → "otp" → "credentials"
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");


  // Form states
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Unified payload state
  const payload = { email, username, password ,otp};

  // Util: simple email (Gmail-only) frontend validation
      const isGmail = (val) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(val);

  // Display message for 3 seconds
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleEmailPhase = async () => {
    if (!isGmail(email))
    {
      showToast("Enter a valid Gmail address.");
      return 
    }
    setLoading(true);
    try {
      const res = await axios.post(BASE_URL, { payload });
      if (res.status === 200 && res.data.success) {
        showToast("OTP sent. Check your email.");
        setPhase("otp");
      } else {
        showToast(res.data.message || "Failed to send OTP");
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Server error.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpPhase = async () => {
    if (otp.length !== 6) return showToast("Enter the 6-digit OTP.");
    setLoading(true);
    try {
      const res = await axios.post(BASE_URL, { payload });
      if (res.status === 200 && res.data.success) {
        showToast("OTP verified.");
        setPhase("credentials");
      } else {
        showToast(res.data.message || "OTP verification failed");
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Server error.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupPhase = async () => {
    if (!username || !password) return showToast("Username & password required.");
    setLoading(true);
    try {
      const res = await axios.post(BASE_URL, { payload });
      if (res.status === 200 && res.data.success) {
        showToast("Signup successful!");
        setTimeout(() => navigate("/"), 500);
      } else {
        showToast(res.data.message || "Signup failed.");
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Server error.");
    } finally {
      setLoading(false);
    }
  };

  // --- UI Rendering ---
  return (
<div className="flex min-h-screen font-montserrat bg-gradient-to-r from-[#eceafe] to-[#8938f9]">
      {/* Left: Form Panel */}
      <div className="flex-1 bg-[#15172b] text-white rounded-l-2xl flex flex-col justify-center px-10 min-w-[340px]">
        <h2 className="text-3xl font-extrabold mb-2">Sign Up</h2>
        <p className="mb-6 text-[#d3cafa] text-base">Create your account</p>
     {toast && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in bg-black bg-opacity-80 text-white px-6 py-3 rounded shadow-lg transition">
          {toast}
        </div>
      )}


        {phase === "email" && (
          <>
            <div className="mb-5 text-left">
              <label className="block text-sm font-bold text-[#c3bbee] mb-1">Gmail</label>
              <input
                className="w-full px-4 py-3 text-white bg-[#191c33] border border-[#30305a] rounded-md outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youraddress@gmail.com"
                autoFocus
                disabled={loading}
              />
            </div>
            <button
              className="w-full py-3 mt-2 bg-gradient-to-r from-[#8b39fa] to-[#470899] rounded-md font-bold cursor-pointer"
               disabled={loading }
              onClick={handleEmailPhase}
            >
              {loading ? "Sending OTP..." : "Get OTP"}
            </button>
          </>
        )}

        {phase === "otp" && (
          <>
            <div className="mb-5 text-left">
              <label className="block text-sm font-bold text-[#c3bbee] mb-1">Enter 6-digit OTP</label>
              <input
                className="w-full px-4 py-3 text-white bg-[#191c33] border border-[#30305a] rounded-md outline-none tracking-widest text-lg text-center"
                value={otp}
                onChange={e =>
                  setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                placeholder="OTP"
                maxLength={4}
                disabled={loading}
                autoFocus
              />
            </div>
            <button
              className="w-full py-3 mt-2 bg-gradient-to-r from-[#8b39fa] to-[#470899] rounded-md font-bold cursor-pointer"
              disabled={loading || otp.length !== 4}
              onClick={handleOtpPhase}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {phase === "credentials" && (
          <>
            <div className="mb-5 text-left">
              <label className="block text-sm font-bold text-[#c3bbee] mb-1">Username</label>
              <input
                className="w-full px-4 py-3 text-white bg-[#191c33] border border-[#30305a] rounded-md outline-none"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Choose a username"
                disabled={loading}
                autoFocus
              />
            </div>
            <div className="mb-5 text-left">
              <label className="block text-sm font-bold text-[#c3bbee] mb-1">Password</label>
              <input
                className="w-full px-4 py-3 text-white bg-[#191c33] border border-[#30305a] rounded-md outline-none"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={loading}
              />
            </div>
            <button
              className="w-full py-3 mt-2 bg-gradient-to-r from-[#8b39fa] to-[#470899] rounded-md font-bold cursor-pointer"
              disabled={loading || !username || !password}
              onClick={handleSignupPhase}
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
      {/* Right: Info Panel */}
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
