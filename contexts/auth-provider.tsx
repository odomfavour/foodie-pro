/* eslint-disable */
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { serialize } from 'cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { LoginPayload } from '@/types/login-payload';
import { useAuthService } from './authenticate-service';
import { Storage } from '@/utils/storage';
interface AuthContextType {
  token: string | null;
  user: any;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();
  const { loginUser, logout } = useAuthService();

  useEffect(() => {
    const authData = Storage.getAuthToken();
    console.log('auth', authData);
    if (authData) {
      const { token, user } = JSON.parse(authData);
      setToken(token);
      setUser(user);
      // scheduleTokenRefresh(userToken, refreshToken, loginUser);
    }
  }, []);

  const domain =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:3000'; // Get current domain if `window` is available

  // useEffect(() => {
  //   if (token) {
  //     try {
  //       const decodedUser = jwtDecode(token); // Decode the token to get user info
  //       console.log('dnfd', decodedUser);
  //       setUser(decodedUser); // Store the decoded user in state
  //     } catch (error) {
  //       console.error('Error decoding token:', error);
  //       setUser(null); // If decoding fails, reset the user
  //     }
  //   } else {
  //     setUser(null); // Reset user if there's no token
  //   }
  // }, [token]);

  const handleLogin = async (payload: LoginPayload) => {
    try {
      const response = await loginUser(payload); // Get full response
      console.log('res', response);

      if (!response.token) {
        toast.error('Login failed. Please check your credentials.');
        return; // Return null if login fails
      }
      document.cookie = serialize('sf_token', response.token, {
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
      });
      setToken(response.token);
      setUser(response?.user);
      Storage.setAuthToken(JSON.stringify(response)); // Save response to localStorage
      toast.success('Login successful!');
      // setTimeout(() => router.push('/dashboard'), 1000);

      return response;
    } catch (error: any) {
      toast.error(`Login failed. ${error?.response?.data?.message}.`);
      console.error('Login failed:', error?.response?.data?.message);
    }
  };

  const handleLogout = () => {
    logout();
    setToken(null);
    setUser(null);
    Storage.removeAuthToken();
    document.cookie = 'sf_token=; path=/; max-age=0';
    toast.success('Logout successful!');
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
