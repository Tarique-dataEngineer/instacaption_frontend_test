import axios from "axios";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { toast } from "react-toastify";

export interface User {
  _id: string;  // Add this line
  name: string;
  email: string;
  creditBalance: number;
  avatar: string;
}


interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  backendUrl: string;
  credit: number;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  generateImageCaption: (file: File) => Promise<string | null>;
  loadCreditsData: () => Promise<void>;
  setShowlogin: React.Dispatch<React.SetStateAction<boolean>>;  // Add this line
}


export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [credit, setCredit] = useState<number>(0);
  const [token, setToken] = useState<string | null>(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
  const navigate = useNavigate();


  // Load token from localStorage on the client side only
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Instead of calling /api/user/me, we now call /api/user/credits
  // which (as in your previous code) returns both credits and user info.
  useEffect(() => {
    if (token) {
      console.log("Token found, loading credits data...", token);
      loadCreditsData();
    }
  }, [token, backendUrl]);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });
      if (data.success) {
        setUser(data.user);
        setCredit(data.credits);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
        toast.success("Login successful!", { position: "top-right" });
        navigate("/", { replace: true });
        return true;
      } else {
        toast.error(
          data.message ||
            "Invalid credentials. Please check your email and password.",
          { position: "top-right" }
        );
        return false;
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Invalid credentials. Email or password is incorrect.";
      toast.error(errorMessage, { position: "top-right" });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  // Generate image caption (uses header "token")
  const generateImageCaption = async (file: File): Promise<string | null> => {
    try {
      if (!user) {
        toast.error("You must be logged in to generate captions.");
        setShowLogin(true);
        return null;
      }
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image-caption`,
        formData,
        {
          headers: {
            token, // using header 'token' as in your previous implementation
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.success) {
        loadCreditsData();
        setCredit(data.credits);
        return data.description;
      } else {
        toast.error(data.message || "Failed to generate description.");
        return null;
      }
    } catch (error: any) {
      toast.error(error.message || "Error generating caption.");
      return null;
    }
  };

  // Load credits data using /api/user/credits and header "token"
  const loadCreditsData = async () => {
    try {
      if (!token) {
        console.warn("No token available to load credits.");
        return;
      }
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { token },
      });
      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
        console.log("Credits and user loaded:", data.credits, data.user);
      } else {
        toast.error(data.message || "Failed to load credits.");
      }
    } catch (error: any) {
      console.error("Error loading credits:", error);
      toast.error(error.message || "Error loading credits.");
    }
  };

  return (
     <AppContext.Provider
      value={{
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        credit,
        token,
        setToken,
        login,
        logout,
        generateImageCaption,
        loadCreditsData,
        setShowlogin: setShowLogin,  // Add this line
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
