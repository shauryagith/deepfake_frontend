import React, {
  createContext,
  useContext,
  useState,
  startTransition,
  useEffect,
} from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<string | null>(localStorage.getItem('user'));

  const isAuthenticated = !!token;

  useEffect(() => {
    // Sync user from localStorage on initial load
    if (token && !user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUser(storedUser);
    }
  }, [token, user]);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        username,
        password,
      });

      const access_token = response.data.access_token;

      // startTransition(() => {
      //   setToken(access_token);
      //   setUser(username);
      // });

      localStorage.setItem('token', access_token);
      localStorage.setItem('user', username);
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Login failed';
      console.error('Login failed:', message);
      throw new Error(message);
    }
  };

  const signup = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/signup', {
        username,
        password,
      });

      // Automatically log in after signup
      // await login(username, password);
      localStorage.setItem("token",response.data.access_token);
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Signup failed';
      console.error('Signup failed:', message);
      throw new Error(message);
    }
  };

  const logout = () => {
    startTransition(() => {
      setToken(null);
      setUser(null);
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, signup, logout }}>
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
