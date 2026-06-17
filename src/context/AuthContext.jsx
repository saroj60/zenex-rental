import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there is a saved session in localStorage on initial load
    const storedAuth = localStorage.getItem('nepaldrive_admin_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUser({ email: 'admin@zenextravel.com', name: 'Super Admin', role: 'admin' });
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulated authentication logic
    if (email === 'admin@zenextravel.com' && password === 'password123') {
      setIsAuthenticated(true);
      setUser({ email: 'admin@zenextravel.com', name: 'Super Admin', role: 'admin' });
      localStorage.setItem('nepaldrive_admin_auth', 'true');
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password.' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('nepaldrive_admin_auth');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
