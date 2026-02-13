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
  passwd?: string;
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
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }

    const userData = await response.json();
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

  const updateProfile = async (userData: Partial<User>) => {
    if (user) {
      try {
        const response = await fetch(`/api/customers?id=${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          const updatedUser = { ...user, ...userData };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } else {
          console.error('Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
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
