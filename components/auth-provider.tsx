'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

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
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate login - in production, this would call your auth API
    setUser({
      id: '1',
      email,
      name: email.split('@')[0],
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
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
