import { create } from 'zustand';
import axios from 'axios';
import { axiosInstance } from '../lib/axios';
import { useNavigate } from 'react-router-dom';

export const useSignupStore = create((set, get) => ({
  phase: 'email',
  loading: false,
  toast: '',
  emailError: false,
  otpError: false,
  credentialsError: { userName: false, password: false },

  email: '',
  otp: ["", "", "", "", "", ""],
  userName: '',
  password: '',
  verifyToken: '',

  setEmail: (val) => set({ email: val, emailError: false }),
  setOtp: (val) => set({ otp: val, otpError: false }),
  setUserName: (val) => set({ userName: val }),
  setPassword: (val) => set({ password: val }),
  setToast: (msg) => {
    set({ toast: msg });
    setTimeout(() => set({ toast: '' }), 3500);
  },
  clearToast: () => set({ toast: '' }),

  showToast: (msg) => {
    get().setToast(msg);
  },
  triggerShake: (key) => {
    set((state) => ({ [key]: true }));
    setTimeout(() => set({ [key]: false }), 700);
  },

 handleEmailPhase: async () => {
  const { email, isGmail, triggerShake, showToast } = get();

  if (!isGmail(email.trim())) {
    showToast("Enter a valid email address");
    triggerShake("emailError");
    return;
  }

  set({ loading: true });

  try {
    const res = await axiosInstance.post('/api/authUsers/register', { email });
    
    if (res.status === 200 && res.data?.success) {
      showToast("OTP sent! Check your Gmail.");
      set({ phase: "otp" });
    } else {
      showToast(res?.data?.message || "Failed to send OTP");
    }

  } catch (error) {
    const msg = error?.response?.data?.message || "Server error.";
    showToast(msg);
    triggerShake("emailError");
  } finally {
    set({ loading: false });
  }
},

  handleOtpPhase: async (enteredOtp) => {
    const otpStr = (enteredOtp || get().otp).join("");
    set({ loading: true });
    try {
      const res = await axiosInstance.post('/api/authUsers/register',{
        email: get().email.trim().toLowerCase(),
        otp: otpStr,
      });
      if (res.status === 200 && res.data.verifyToken) {
        set({
          verifyToken: res.data.verifyToken,
          phase: "credentials",
        });
        get().showToast("OTP verified!");
      } else {
        showToast(res.data.message);
        set({ otp: ["", "", "", "", "", ""] });
        get().triggerShake("otpError");
      }
    } catch (error) {
        console.log(error.message);
      set({ otp: ["", "", "", "", "", ""] });
      get().showToast("Enter valid OTP");
      get().triggerShake("otpError");
    } finally {
      set({ loading: false });
    }
  },

  handleSignupPhase: async (navigate) => {
    const { email, userName, password, verifyToken } = get();
    const errors = {};
    let hasErr = false;

    if (!userName) {
      errors.userName = true;
      hasErr = true;
    }
    if (!password || password.length < 6) {
      errors.password = true;
      hasErr = true;
    }
    if (hasErr) {
      set({ credentialsError: errors });
      return;
    }

    set({ loading: true });
    try {
      const res = await axiosInstance.post('/api/authUsers/register',{
        email: email.trim().toLowerCase(),
        userName,
        password,
        verifyToken,
      });
      if(res.status===401) showToast(res.data.message)
      else if (res.status === 201 && res.data.success) {
        get().showToast(res.data.message || "Registration successful!");
        setTimeout(() => navigate("/signin"), 1300);
      } else {
        get().showToast(res.data.message || "Signup failed.");
      }
    } catch (error) {
      const msg = error.response?.data?.message?.toLowerCase() || "";
      if (/user.?name/.test(msg)) {
        get().triggerShake("credentialsError");
      } else if (/password/.test(msg)) {
        get().triggerShake("credentialsError");
      } else {
        console.log(error.message);
        get().showToast(msg || "Server error.");
      }
    } finally {
      set({ loading: false });
    }
  },

  isGmail: (val) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(val),
}));
