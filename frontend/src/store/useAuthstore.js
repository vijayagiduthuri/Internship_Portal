import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from '../components/Toast';

export const useAuthstore = create((set, get) => ({
  phase: 'email',
  loading: false,
  emailError: false,
  otpError: false,
  credentialsError: { userName: false, password: false },

  email: '',
  otp: ["", "", "", "", "", ""],
  userName: '',
  password: '',
  verifyToken: '',
  currentStage: 1,

  setEmail: (val) => set({ email: val, emailError: false }),
  setOtp: (val) => set({ otp: val, otpError: false }),
  setUserName: (val) => set({ userName: val }),
  setPassword: (val) => set({ password: val }),
  triggerShake: (key) => {
    set((state) => ({ [key]: true }));
    setTimeout(() => set({ [key]: false }), 700);
  },

 handleEmailPhase: async (toast) => {
  const { email, isGmail, triggerShake} = get();

  if (!isGmail(email.trim())) {
    toast.error("Enter a valid email address");
    triggerShake("emailError");
    return;
  }

  set({ loading: true });

  try {
    const res = await axiosInstance.post('/api/authUsers/register', { email });
    
    if (res.status === 200 && res.data?.success) {
      toast.success("OTP sent! Check your Gmail.");
      set({ phase: "otp" });
    } else {
      showToast(res?.data?.message || "Failed to send OTP");
    }

  } catch (error) {
    const msg = error?.response?.data?.message || "Server error.";
    toast.error(msg);
    triggerShake("emailError");
  } finally {
    set({ loading: false });
  }
},

  handleOtpPhase: async (enteredOtp,toast) => {
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
        toast.success("OTP verified!");
      } else {
        toast.error(res.data.message);
        set({ otp: ["", "", "", "", "", ""] });
        get().triggerShake("otpError");
      }
    } catch (error) {
        console.log(error.message);
      set({ otp: ["", "", "", "", "", ""] });
      toast.error("Enter valid OTP");
      get().triggerShake("otpError");
    } finally {
      set({ loading: false });
    }
  },

  handleSignupPhase: async (navigate,toast) => {
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
      if(res.status===401) toast.error(res.data.message)
      else if (res.status === 201 && res.data.success) {
        toast.success(res.data.message || "Registration successful!");
        setTimeout(() => navigate("/"), 1300);
      } else {
        toast.error(res.data.message || "Signup failed.");
      }
    } catch (error) {
      const msg = error.response?.data?.message?.toLowerCase() || "";
      if (/user.?name/.test(msg)) {
        get().triggerShake("credentialsError");
      } else if (/password/.test(msg)) {
        get().triggerShake("credentialsError");
      } else {
        console.log(error.message);
        toast.error(msg || "Server error.");
      }
    } finally {
      set({ loading: false });
    }
  },

  isGmail: (val) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(val),
  //login page authentication
handleLogin: async (formData) => {
  try {
    const res = await axiosInstance.post('/api/authUsers/login', formData);
    if (res.data.success) {
      toast.success(res.data.message || "Login successful!");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      set({ user: res.data.user });
      setTimeout(() => navigate("/"), 1300);
    } else {
      toast.error(res.data.message || "Login failed.");
    }
  } catch (err) {
    const status = err.response?.status;
    const message = err.response?.data?.message || "Server error.";
    if (status === 401) {
      toast.error(message|| "Unauthorized access.");
    } else {
      toast.error(message);
    }  
  }
},
handleForgotpassword: async (payload, toast) => {
  set({ loading: true });
  try {
    const res = await axiosInstance.post('/api/authUsers/forgot-password', payload);
    const { status, data } = res;
    console.log(data);
    if (status === 200 && data.success) {
      console.log("Response Data:", data);
      toast.success(data.message);
      if (data.resetToken) {
        set({ verifyToken: data.resetToken });
      }
      set((state) => ({ currentStage: state.currentStage + 1 }));
    } else if ([400, 401, 404, 410].includes(status)) {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Error in handleForgotpassword:", error);
    const msg = error?.response?.data?.message;
    toast.error(msg);
  } finally {
    set({ loading: false });
  }
} 
}));