import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('ncr_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const activeToken = localStorage.getItem('ncr_token') || sessionStorage.getItem('ncr_token');
      const wasLoggedOut = localStorage.getItem('ncr_logged_out') === 'true';

      if (activeToken) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data.user);
        } catch (err) {
          console.error('Failed to load user:', err);
          logout();
        }
      } else if (!wasLoggedOut) {
        // Default auto-login as customer Saroj for instant live demo experience
        await autoLoginAs('customer');
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const autoLoginAs = async (role = 'customer') => {
    try {
      const email = role === 'admin' ? 'admin@nepalcarrental.com' : 'customer@nepalcarrental.com';
      const password = role === 'admin' ? 'adminpassword123' : 'customerpassword123';
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('ncr_token', res.data.token);
      localStorage.removeItem('ncr_logged_out');
      setToken(res.data.token);
      setUser(res.data.user);
    } catch (err) {
      console.error('Auto login failed', err);
    }
  };

  const login = async (identifierOrEmail, password, rememberMe = true) => {
    const payload = identifierOrEmail.includes('@')
      ? { email: identifierOrEmail.trim(), password }
      : { identifier: identifierOrEmail.trim(), password };

    const res = await api.post('/auth/login', payload);
    if (rememberMe) {
      localStorage.setItem('ncr_token', res.data.token);
    } else {
      sessionStorage.setItem('ncr_token', res.data.token);
      localStorage.removeItem('ncr_token');
    }
    localStorage.removeItem('ncr_logged_out');
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const register = async (userData) => {
    const res = await api.post('/auth/register', userData);
    localStorage.setItem('ncr_token', res.data.token);
    localStorage.removeItem('ncr_logged_out');
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem('ncr_token');
    sessionStorage.removeItem('ncr_token');
    localStorage.setItem('ncr_logged_out', 'true');
    setToken(null);
    setUser(null);
  };

  const switchUser = async (targetRole) => {
    setLoading(true);
    await autoLoginAs(targetRole);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin' || user?.role === 'staff',
        login,
        register,
        logout,
        switchUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
