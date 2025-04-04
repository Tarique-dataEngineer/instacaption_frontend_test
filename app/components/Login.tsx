import React, { useContext, useEffect, useState } from "react";
import { assets } from "~/assets/assets"; // Correct Remix path
import { AppContext } from "~/context/AppContextProvider"; // Correct Remix path
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import ProfileSettings from "~/components/ProfileSettings";

const Login = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within an AppContextProvider");
  }
  
  const { setShowLogin, backendUrl, setToken, setUser, user } = context;

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTPField, setShowOTPField] = useState(false);
  const [showAvatarSelection, setShowAvatarSelection] = useState(false);

  // This helper now uses axios to match your previous implementation.
  const fetchAPI = async (endpoint: string, body: any) => {
    try {
      const { data } = await axios.post(`${backendUrl}${endpoint}`, body);
      return data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Network error. Please try again."
      );
      return null;
    }
  };

  const sendOTP = async () => {
    const data = await fetchAPI("/api/user/send-otp", { email });
    if (data?.success) {
      toast.success("OTP sent successfully");
      setShowOTPField(true);
    } else {
      toast.error(data?.message || "Error sending OTP");
    }
  };

  const verifyOTP = async () => {
    const data = await fetchAPI("/api/user/verify-otp", { email, otp });
    if (data?.success) {
      toast.success("OTP verified");
      setShowOTPField(false);
      // After OTP verification, proceed with user registration.
      await registerUser();
    } else {
      toast.error(data?.message || "Invalid OTP");
    }
  };

  const registerUser = async () => {
    const data = await fetchAPI("/api/user/register", { name, email, password });
    if (data?.success) {
      setToken(data.token);
      setUser(data.user);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
      setShowLogin(false);
      toast.success("Registration successful");
    } else {
      toast.error(data?.message || "Registration failed");
    }
  };

  const requestPasswordReset = async () => {
    const data = await fetchAPI("/api/user/request-password-reset", { email });
    if (data?.success) {
      toast.success(data.message);
    } else {
      toast.error(data?.message || "Error in password reset");
    }
  };

  const loginUser = async () => {
    const data = await fetchAPI("/api/user/login", { email, password });
    if (data?.success) {
      if (!data.user.avatar) {
        setShowAvatarSelection(true);
      } else {
        setToken(data.token);
        setUser(data.user);
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
        }
        setShowLogin(false);
        toast.success("Login successful");
      }
    } else {
      toast.error(data?.message || "Login failed");
    }
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "Sign Up") {
      return showOTPField ? verifyOTP() : sendOTP();
    }
    if (state === "Forgot Password") return requestPasswordReset();
    if (state === "Login") return loginUser();
  };

  const handleAvatarSelect = async (avatarUrl: string) => {
    const data = await fetchAPI("/api/user/update-avatar", { avatarUrl });
    if (data?.success) {
      setToken(data.token);
      setUser({ ...data.user, avatar: avatarUrl });
      setShowLogin(false);
      toast.success("Avatar selected successfully!");
    }
  };



  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">{state}</h1>
        <p className="text-sm text-center">Welcome back, please sign in to continue</p>

        {(state === "Sign Up" || state === "Forgot Password") && (
          <div className="border px-3 py-2 flex items-center rounded-full mt-5">
            <img src={assets.profile_icon} alt="Profile" className="w-5 h-5" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="outline-none text-sm flex-grow pl-2"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        {/* Email Input Field */}
        <div className="border px-4 py-2 flex items-center rounded-full mt-4">
          <img src={assets.email_icon} alt="Email" className="w-4 h-4" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="outline-none text-sm flex-grow pl-2"
            placeholder="Email Address"
            required
          />
        </div>

        {/* OTP Input Field */}
        {showOTPField && (
          <div className="border px-4 py-2 flex items-center rounded-full mt-4">
            <img src={assets.lock_icon} alt="OTP" className="w-4 h-4" />
            <input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              type="text"
              className="outline-none text-sm flex-grow pl-2"
              placeholder="Enter OTP"
              required
            />
          </div>
        )}

        {/* Password Input Field (Hidden for Forgot Password) */}
        {state !== "Forgot Password" && (
          <div className="border px-4 py-2 flex items-center rounded-full mt-4">
            <img src={assets.lock_icon} alt="Password" className="w-4 h-4" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="outline-none text-sm flex-grow pl-2"
              placeholder="Password"
              required
            />
          </div>
        )}
        {showAvatarSelection && (
          <ProfileSettings
          onAvatarSelect={handleAvatarSelect}
          currentAvatar={user?.avatar || null}
          />
          )}

        {/* Forgot Password Link */}
        <p
          className="text-sm text-blue-600 my-4 cursor-pointer"
          onClick={() =>
            setState(state === "Forgot Password" ? "Login" : "Forgot Password")
          }
        >
          {state === "Forgot Password" ? "Back to Login" : "Forgot Password?"}
        </p>

        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === "Login"
            ? "Login"
            : state === "Forgot Password"
            ? "Reset Password"
            : showOTPField
            ? "Verify OTP"
            : "Sign Up"}
        </button>

        <p className="mt-5 text-center">
          {state === "Login" ? (
            <>
              Don&apos;t have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setState("Sign Up")}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setState("Login")}
              >
                Login
              </span>
            </>
          )}
        </p>

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="Close"
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};

export default Login;
