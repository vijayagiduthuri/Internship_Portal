import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

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
  resetToken: '',
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
      const res = await axiosInstance.post('/api/authUsers/register', {
        email: email.trim().toLowerCase(),
        userName,
        password,
        verifyToken,
      });    
      console.log(res);
    const success = res?.data?.success;
    const message = res?.data?.message;

    if (res?.status === 201 && success) {
      toast.success(message || "Registration successful!");
      setTimeout(() => navigate("/userHomePage"), 1300);
    } else {
      toast.error(message || "Signup failed.");
    }

  } catch (error) {
    console.error("Signup error object:", error);

    const errorMsg =
      error?.response?.data?.message ||
      error?.response?.data?.error ||  // fallback
      "Server error.";

    toast?.error(errorMsg);

    // Optional: Custom error triggers
    if (typeof errorMsg === "string") {
      const msg = errorMsg.toLowerCase();
      if (/user.?name/.test(msg) || /password/.test(msg)) {
        get().triggerShake("credentialsError");
      }
    }
}
finally {
      set({ loading: false });
    }

  },

  isGmail: (val) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(val),
  //login page authentication
handleLogin: async (formData, navigate, toast) => {
  try {
    const res = await axiosInstance.post('/api/authUsers/login', formData);
    console.log("Full Login Response:", res);

    const user = res?.data?.user;
    const message = res?.data?.message;

    if (res.status === 200 && user) {
      localStorage.setItem("user", JSON.stringify(user));
      set({ user });
      toast.success(message || "Login successful!");
      setTimeout(() => navigate("/userHomePage"), 700);
    } else {
      toast.error(message || "Login failed.");
    }

  } catch (err) {
    console.log("Login Error:", err);
    const message =
      err?.response?.data?.message ??
      err?.message ??
      "Something went wrong. Please try again.";
    toast.error(message);
  } finally {
    set({ loading: false });
  }
},


handleForgotpassword: async (payload, toast) => {
  set({ loading: true });
  try {
    let apiPayload = {};
    // Email only (Stage 1)
    if (payload.email && !payload.otp && !payload.newPassword) {
      apiPayload = { email: payload.email };
    }
    // Email + OTP (Stage 2)
    else if (payload.email && payload.otp) {
      apiPayload = { email: payload.email, otp: payload.otp };
    }
    // Reset password (Stage 3)
    else if (payload.email && payload.newPassword && payload.resetToken) {
      apiPayload = {
        email: payload.email,
        newPassword: payload.newPassword,
        resetToken: payload.resetToken,
      };
    }
    console.log("API Payload:", apiPayload);
    const res = await axiosInstance.post('/api/authUsers/forgot-password', apiPayload);
    if (res.status === 200 && res.data.success) {
      toast.success(res.data.message);
       if (res.data.resetToken) {
        set({ resetToken: res.data.resetToken });
       }
        set((state) => ({ currentStage: state.currentStage + 1 }));
      }
    else {
      toast.error(res.data.message);
      return;
    }
  } catch (err) {
    toast.error(err.response?.data?.messag);
  } finally {
    set({ loading: false });
  }
},

}));