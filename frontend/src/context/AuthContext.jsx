/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';

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
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    console.log('Authenticating user role selection:', role);

    // Validate email domain suffix
    let targetRole;
    if (email.endsWith('@gmail.com')) {
      targetRole = 'CITIZEN';
    } else if (email.endsWith('@admin.in')) {
      targetRole = 'ADMIN';
    } else if (email.endsWith('@dept.in')) {
      targetRole = 'OFFICER';
    } else {
      setLoading(false);
      throw new Error('Invalid email domain! Use @gmail.com for Citizen, @dept.in for Officer, or @admin.in for Admin.');
    }

    // Look up user in the registered users store
    const customUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const found = customUsers.find(u => u.email === email);

    let selectedUser;

    if (targetRole === 'CITIZEN') {
      // Citizens MUST be pre-registered via the Register page
      if (!found) {
        setLoading(false);
        throw new Error('No account found for this email. Please register first to access the portal.');
      }
      selectedUser = { ...found, role: targetRole };
    } else {
      // Admin / Officer accounts are system-provisioned — allow login without prior registration
      if (found) {
        selectedUser = { ...found, role: targetRole };
      } else {
        const defaultName = email.split('@')[0].split(/[._-]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        selectedUser = {
          id: 'usr-' + Math.random().toString(36).substr(2, 9),
          name: targetRole === 'OFFICER' ? `Officer ${defaultName}` : `Admin ${defaultName}`,
          email,
          mobile: '9876543210',
          role: targetRole,
          district: 'New Delhi',
          state: 'Delhi',
          pincode: '110001',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(defaultName)}&background=0B1E47&color=fff`
        };
      }
    }

    const mockToken = `mock-jwt-token-${selectedUser.role.toLowerCase()}-${Math.random().toString(36).substr(2, 9)}`;
    
    setUser(selectedUser);
    setToken(mockToken);
    localStorage.setItem('citizen_portal_user', JSON.stringify(selectedUser));
    localStorage.setItem('citizen_portal_token', mockToken);
    setLoading(false);
    return selectedUser;
  };

  const register = async (name, email, mobile, password, state, district, pincode) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newUser = {
      id: 'usr-' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      mobile,
      role: 'CITIZEN',
      state: state || 'Delhi',
      district: district || 'New Delhi',
      pincode: pincode || '110001',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=F97316&color=fff`
    };

    // Save to custom users database in local storage
    const customUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    customUsers.push(newUser);
    localStorage.setItem('registered_users', JSON.stringify(customUsers));

    // Do NOT automatically login newly registered user
    // (User is required to login manually)
    
    setLoading(false);
    return newUser;
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    localStorage.setItem('citizen_portal_user', JSON.stringify(updatedUser));
    
    // Update registered list if it is a custom citizen
    const customUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const index = customUsers.findIndex(u => u.id === user.id);
    if (index !== -1) {
      customUsers[index] = { ...customUsers[index], ...profileData };
      localStorage.setItem('registered_users', JSON.stringify(customUsers));
    }
    
    setLoading(false);
    return updatedUser;
  };

  const switchRole = (role) => {
    if (!user) return;
    const defaultName = user.email ? user.email.split('@')[0].split(/[._-]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Demo User';
    const switchedUser = {
      ...user,
      name: role === 'OFFICER' ? `Officer ${defaultName}` : role === 'ADMIN' ? `Admin ${defaultName}` : defaultName,
      role,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(defaultName)}&background=${role === 'OFFICER' ? '0B1E47' : 'F97316'}&color=fff`
    };
    setUser(switchedUser);
    const mockToken = `mock-jwt-token-${role.toLowerCase()}-switched`;
    setToken(mockToken);
    localStorage.setItem('citizen_portal_user', JSON.stringify(switchedUser));
    localStorage.setItem('citizen_portal_token', mockToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('citizen_portal_user');
    localStorage.removeItem('citizen_portal_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, updateProfile, switchRole, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
