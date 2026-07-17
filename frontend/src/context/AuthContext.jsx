/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user session exists in localStorage
    const savedUser = localStorage.getItem('citizen_portal_user');
    const savedToken = localStorage.getItem('citizen_portal_token');
    
    const timer = setTimeout(() => {
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      }
      setLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email, password, role = 'CITIZEN') => {
    setLoading(true);
    try {
      const response = await api.login(email, password, role);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('citizen_portal_user', JSON.stringify(response.user));
      localStorage.setItem('citizen_portal_token', response.token);
      setLoading(false);
      return response.user;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const register = async (name, email, mobile, password, state, district, pincode) => {
    setLoading(true);
    try {
      const userData = { name, email, mobile, password, state: state || 'Delhi', district: district || 'New Delhi', pincode: pincode || '110001' };
      const newUser = await api.register(userData);
      setLoading(false);
      return newUser;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      const updatedUser = await api.updateProfile(user.id, profileData);
      const mergedUser = { ...user, ...updatedUser };
      setUser(mergedUser);
      localStorage.setItem('citizen_portal_user', JSON.stringify(mergedUser));
      setLoading(false);
      return mergedUser;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('citizen_portal_user');
    localStorage.removeItem('citizen_portal_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, updateProfile, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
