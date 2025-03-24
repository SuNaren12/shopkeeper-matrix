
import React, { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../data/mockData';
import { toast } from '@/components/ui/sonner';

interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // In a real app, this would call an API
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      toast.success('Logged in successfully');
      return true;
    }
    
    toast.error('Invalid email or password');
    return false;
  };

  const register = (email: string, password: string, name: string): boolean => {
    // In a real app, this would call an API
    const userExists = users.some(u => u.email === email);
    
    if (userExists) {
      toast.error('Email already in use');
      return false;
    }
    
    // Simulate creating a new user
    const newUser = {
      id: users.length + 1,
      email,
      name,
      role: 'user' as const,
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
    toast.success('Registered successfully');
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
