"use client";
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  userdata: Object | null;
  setuserdata: (data: Object | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    // Load token from localStorage on initial render
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });

  const [userdata, setuserdata] = useState<Object | null>(() => {
    // Load userdata from localStorage on initial render
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("userdata");
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  });

  // Update localStorage whenever token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Update localStorage whenever userdata changes
  useEffect(() => {
    if (userdata) {
      localStorage.setItem("userdata", JSON.stringify(userdata));
    } else {
      localStorage.removeItem("userdata");
    }
  }, [userdata]);

  return (
    <AuthContext.Provider value={{ token, setToken, userdata, setuserdata }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
