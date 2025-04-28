
import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "../types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("groupme_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = () => {
    setIsLoading(true);
    
    // For the demo, simulate OAuth flow with mock user
    setTimeout(() => {
      const mockUser: User = {
        id: "12345",
        name: "John Doe",
        avatar_url: "https://i.pravatar.cc/150?img=3",
        token: "mock-token-12345"
      };
      
      // Store user in local storage
      localStorage.setItem("groupme_user", JSON.stringify(mockUser));
      setUser(mockUser);
      setIsLoading(false);
      toast.success("Successfully logged in!");
    }, 1000);
    
    // In a real implementation, this would redirect to GroupMe OAuth:
    // window.location.href = `https://oauth.groupme.com/oauth/authorize?client_id=YOUR_CLIENT_ID`;
  };

  const logout = () => {
    localStorage.removeItem("groupme_user");
    setUser(null);
    toast.info("Successfully logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
