'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  companyName?: string;
  contact?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  phone?: string;
  fax?: string;
  isAdmin?: boolean; // Added isAdmin property
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  lastActivity: number | null;
  updateLastActivity: () => void;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [lastActivity, setLastActivity] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Update last activity timestamp
  const updateLastActivity = () => {
    const now = Date.now();
    setLastActivity(now);
    localStorage.setItem('lastActivity', now.toString());
  };

  // Check for stored auth data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedLastActivity = localStorage.getItem('lastActivity');

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error('Failed to parse stored user data', e);
      }
    }

    if (storedLastActivity) {
      setLastActivity(parseInt(storedLastActivity, 10));
    }

    // Mark as initialized after checking storage
    setIsInitialized(true);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login - in production, this would call your auth API
    // For demo purposes, we'll treat any email ending with @admin.com as admin
    const isAdmin = email.endsWith('@admin.com');

    const userData = {
      id: '1',
      email,
      name: email.split('@')[0],
      isAdmin,
    };

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    updateLastActivity();
  };

  const logout = () => {
    setUser(null);
    setLastActivity(null);
    localStorage.removeItem('user');
    localStorage.removeItem('lastActivity');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateProfile,
        lastActivity,
        updateLastActivity,
        isInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
