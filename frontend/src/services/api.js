/**
 * @file api.js
 * @description API service module containing configurations and interceptors for HTTP requests.
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Increased timeout for real backend requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('citizen_portal_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized session expiration
      console.warn('Session expired. Redirecting to login...');
      localStorage.removeItem('citizen_portal_user');
      localStorage.removeItem('citizen_portal_token');
      // Only redirect if not already on the login page to prevent redirect loops
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Helper function to build query strings
const buildQueryParams = (params) => {
  if (!params) return '';
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== 'ALL' && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return query ? `?${query}` : '';
};

// Service layer implementation using actual API calls
export const api = {
  // 1. Dashboard API
  getDashboardData: async (citizenId = null) => {
    const query = citizenId ? `?citizenId=${encodeURIComponent(citizenId)}` : '';
    const response = await apiClient.get(`/api/dashboard${query}`);
    return response.data;
  },

  // 2. Complaint API
  getComplaints: async (filters = {}) => {
    const response = await apiClient.get(`/api/complaints${buildQueryParams(filters)}`);
    return response.data;
  },

  getComplaintById: async (id) => {
    const response = await apiClient.get(`/api/complaints/${id}`);
    return response.data;
  },

  createComplaint: async (complaintData, _citizenUser) => {
    // citizen user is handled via auth token on backend now
    const response = await apiClient.post('/api/complaints', complaintData);
    return response.data;
  },

  updateComplaint: async (id, updatedFields) => {
    const response = await apiClient.put(`/api/complaints/${id}`, updatedFields);
    return response.data;
  },

  deleteComplaint: async (id) => {
    const response = await apiClient.delete(`/api/complaints/${id}`);
    return response.data;
  },

  // 3. Feedback API
  submitFeedback: async (feedbackData) => {
    const complaintId = feedbackData.complaintId || feedbackData.id;
    const response = await apiClient.post(`/api/complaints/${complaintId}/feedback`, feedbackData);
    return response.data;
  },

  getFeedback: async () => {
    const response = await apiClient.get('/api/feedback');
    return response.data;
  },

  // 4. Auth & User API
  login: async (role, userName, password, loginType) => {
    const response = await axios.post('/login-services/api/v1/user/login', {
      role,
      userName,
      password,
      loginType
    }, { timeout: 5000 });
    return response;
  },

  logout: async () => {
    const response = await apiClient.post('/api/users/logout');
    return response.data;
  },

  register: async (userData) => {
    const response = await axios.post('/login-services/api/v1/user/signup', userData);
    return response;
  },

  sendOtp: async (data) => {
    const response = await apiClient.post('/api/users/send-otp', data);
    return response.data;
  },

  verifyOtp: async (data) => {
    const response = await apiClient.post('/api/users/verify-otp', data);
    return response.data;
  },

  resetPassword: async (data) => {
    const response = await apiClient.post('/api/users/reset-password', data);
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/api/users/profile');
    return response.data;
  },

  updateProfile: async (username, profileData) => {
    // username might be used depending on backend routing (PUT /api/users/profile or PUT /api/users/:username)
    // As per requirements: PUT /api/users/profile (assumes auth token identifies user)
    const response = await apiClient.put('/api/users/profile', profileData);
    return response.data;
  },

  // 5. Metadata & Announcements API (Replaces Static Constants)
  getMetadata: async () => {
    // Fetch global configuration (Categories, Priorities, Statuses, States & Districts)
    const response = await apiClient.get('/api/metadata');
    return response.data;
  },

  getAnnouncements: async () => {
    const response = await apiClient.get('/api/announcements');
    return response.data;
  }
};

export default apiClient;
