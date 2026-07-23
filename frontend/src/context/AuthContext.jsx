/**
 * @file AuthContext.jsx
 * @description React Context provider managing user authentication state and methods.
 */

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

  // Authenticate credentials but DO NOT log the user in yet (for 2FA)
  const authenticateCredentials = async (emailOrMobile, password, role = 'CITIZEN') => {
    setLoading(true);
    try {
      const formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
      let responseData, authToken;
      
      const response = await api.login(formattedRole, emailOrMobile, password, 'email_id');
      responseData = response.data || {};
      authToken = responseData.token || response.token || response.accessToken || responseData.accessToken || responseData.data?.token || responseData.data?.accessToken || responseData.jwt || responseData.data?.jwt || response.headers?.authorization?.replace('Bearer ', '');

      if (!authToken) {
        throw new Error("No authentication token received from server");
      }

      const localSavedName = localStorage.getItem('demo_registered_name_' + emailOrMobile);
      const baseFallback = emailOrMobile.includes('@') ? emailOrMobile.split('@')[0] : emailOrMobile;
      const apiName = responseData.UserName || responseData.userName || responseData.name || responseData.username || responseData.data?.userName || responseData.data?.UserName || responseData.data?.username || responseData.data?.name || responseData.user?.name || responseData.user?.userName;
      const extractedName = apiName || localSavedName || baseFallback;
      const loggedInUser = { email: emailOrMobile, role: formattedRole, userName: extractedName, ...responseData };
      setLoading(false);
      return { loggedInUser, authToken, message: responseData.message || responseData.data?.message };
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      throw new Error(errorMessage);
    }
  };

  // Finalize the login process and save to local storage
  const finalizeLogin = (loggedInUser, authToken) => {
    setUser(loggedInUser);
    setToken(authToken);
    localStorage.setItem('citizen_portal_user', JSON.stringify(loggedInUser));
    localStorage.setItem('citizen_portal_token', authToken);
  };

  // Old login function for backwards compatibility (used where 2FA isn't needed)
  const login = async (email, password, role = 'CITIZEN') => {
    const { loggedInUser, authToken, message } = await authenticateCredentials(email, password, role);
    finalizeLogin(loggedInUser, authToken);
    return { ...loggedInUser, message };
  };

  const requestOtp = async (data) => {
    return await api.sendOtp(data);
  };

  const verifyOtp = async (data) => {
    return await api.verifyOtp(data);
  };

  const register = async (userName, emailId, phoneNumber, password, role, address) => {
    setLoading(true);
    try {
      const userData = { userName, emailId, phoneNumber, password, role, address };
      let response;
      response = await api.register(userData);
      setLoading(false);
      return response.data || response;
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      throw new Error(errorMessage);
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
    // Clear local state instantly for an immediate UI response
    setUser(null);
    setToken(null);
    localStorage.removeItem('citizen_portal_user');
    localStorage.removeItem('citizen_portal_token');

    // Attempt backend logout asynchronously without blocking the user
    api.logout().catch(error => {
      console.warn('Backend logout failed or offline.', error);
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      loading, 
      login, 
      authenticateCredentials,
      finalizeLogin,
      requestOtp,
      verifyOtp,
      register, 
      updateProfile, 
      logout, 
      isAuthenticated: !!token 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
