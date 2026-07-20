/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('citizen_portal_user');
      if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
        return JSON.parse(savedUser);
      }
      return null;
    } catch (e) {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('citizen_portal_token'));
  const [loading, setLoading] = useState(false);

  const login = async (email, password, username = 'CITIZEN') => {
    setLoading(true);
    try {
      const response = await api.login(email, password, username);
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
      const updatedUser = await api.updateProfile(user.username || user.id, profileData);
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

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.warn('Backend logout failed, proceeding with local logout', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('citizen_portal_user');
      localStorage.removeItem('citizen_portal_token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, updateProfile, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
