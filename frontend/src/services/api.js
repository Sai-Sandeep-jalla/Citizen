import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.citizenportal.gov.in';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1500, // Reduced from 5000ms so offline backend falls back faster
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
<<<<<<< HEAD
    const complaintId = feedbackData.complaintId || feedbackData.id;
    const response = await apiClient.post(`/api/complaints/${complaintId}/feedback`, feedbackData);
=======
    const response = await apiClient.post('/api/feedback', feedbackData);
>>>>>>> 82b3a534c20e8b88c3d10f0fc7cbb456e4a3361c
    return response.data;
  },

  getFeedback: async () => {
    const response = await apiClient.get('/api/feedback');
    return response.data;
  },

<<<<<<< HEAD
  // 4. Auth & User API
  login: async (email, password, username = 'CITIZEN') => {
    const response = await apiClient.post('/api/users/login', { email, password, username });
    return response.data; // expects { user, token }
  },

  logout: async () => {
    const response = await apiClient.post('/api/users/logout');
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post('/api/users/register', userData);
    return response.data;
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
=======
  // 4. Auth API
  login: async (email, password, role = 'CITIZEN') => {
    const response = await apiClient.post('/api/auth/login', { email, password, role });
    return response.data; // expects { user, token }
  },

  register: async (userData) => {
    const response = await apiClient.post('/api/auth/register', userData);
    return response.data;
  },

  updateProfile: async (userId, profileData) => {
    // userId might be used depending on backend routing (PUT /api/users/profile or PUT /api/users/:id)
>>>>>>> 82b3a534c20e8b88c3d10f0fc7cbb456e4a3361c
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
