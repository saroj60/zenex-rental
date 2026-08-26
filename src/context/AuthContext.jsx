import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear persistent storage to force a re-login if they had an old session
    localStorage.removeItem('nepaldrive_admin_auth');
    
    const storedAuth = sessionStorage.getItem('nepaldrive_admin_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUser({ email: 'info@zenextravels.com', name: 'Super Admin', role: 'admin' });
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulated authentication logic
    if (email === 'info@zenextravels.com' && password === 'zenextravels@@2026') {
      setIsAuthenticated(true);
      setUser({ email: 'info@zenextravels.com', name: 'Super Admin', role: 'admin' });
      sessionStorage.setItem('nepaldrive_admin_auth', 'true');
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password.' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.removeItem('nepaldrive_admin_auth');
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
