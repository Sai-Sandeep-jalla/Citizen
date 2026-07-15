import axios from 'axios';
import {
  getComplaintsFromStorage,
  saveComplaintsToStorage,
  getFeedbackFromStorage,
  saveFeedbackToStorage
} from './mockDb';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.citizenportal.gov.in';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
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

// Helper for Mock Delay simulation
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Service layer implementation with mock fallback support
export const api = {
  // 1. Dashboard API
  getDashboardData: async () => {
    // If we're calling a real backend, we'd do:
    // const response = await apiClient.get('/dashboard');
    // return response.data;

    // Simulated API
    await delay(600);
    let complaints = getComplaintsFromStorage();
    let feedbacks = getFeedbackFromStorage();

    // Fetch the logged-in user profile to isolate citizen metrics
    const userStr = localStorage.getItem('citizen_portal_user');
    const user = userStr ? JSON.parse(userStr) : null;

    if (user && user.role === 'CITIZEN') {
      complaints = complaints.filter((c) => c.citizenId === user.id);
      feedbacks = feedbacks.filter((f) => f.citizenId === user.id);
    }
    
    const todayStr = new Date().toDateString();
    const stats = {
      total: complaints.length,
      pending: complaints.filter((c) => c.status === 'PENDING').length,
      assigned: complaints.filter((c) => c.status === 'ASSIGNED').length,
      inProgress: complaints.filter((c) => c.status === 'IN_PROGRESS').length,
      resolved: complaints.filter((c) => c.status === 'RESOLVED').length,
      closed: complaints.filter((c) => c.status === 'CLOSED').length,
      rejected: complaints.filter((c) => c.status === 'REJECTED').length,
      registeredToday: complaints.filter((c) => {
        const d = c.createdDate || c.date;
        return d && new Date(d).toDateString() === todayStr;
      }).length
    };

    // Calculate category breakdown
    const categoryCounts = {};
    complaints.forEach((c) => {
      categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
    });

    const categoryChartData = Object.keys(categoryCounts).map((key) => ({
      name: key.toUpperCase(),
      value: categoryCounts[key]
    }));

    // Calculate status breakdown for pie chart
    const pieChartData = [
      { name: 'Pending', value: stats.pending, color: '#9CA3AF' },
      { name: 'Assigned', value: stats.assigned, color: '#3B82F6' },
      { name: 'In Progress', value: stats.inProgress, color: '#F59E0B' },
      { name: 'Resolved', value: stats.resolved, color: '#10B981' },
      { name: 'Closed', value: stats.closed, color: '#8B5CF6' },
      { name: 'Rejected', value: stats.rejected, color: '#EF4444' }
    ].filter(item => item.value > 0);

    return {
      stats,
      recentComplaints: complaints.slice(-4).reverse(),
      pieChartData,
      categoryChartData,
      averageRating: feedbacks.length 
        ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1) 
        : 'N/A',
      citizenSatisfactionRate: feedbacks.length
        ? Math.round((feedbacks.filter(f => f.rating >= 4).length / feedbacks.length) * 100)
        : 100
    };
  },

  // 2. Complaint API
  getComplaints: async (filters = {}) => {
    await delay(700);
    let list = getComplaintsFromStorage();

    // Filtering logic
    if (filters.status && filters.status !== 'ALL') {
      list = list.filter((c) => c.status === filters.status);
    }
    if (filters.category && filters.category !== 'ALL') {
      list = list.filter((c) => c.category === filters.category);
    }
    if (filters.priority && filters.priority !== 'ALL') {
      list = list.filter((c) => c.priority === filters.priority);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      list = list.filter(
        (c) =>
          c.id.toLowerCase().includes(searchLower) ||
          c.title.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower)
      );
    }
    if (filters.citizenId) {
      list = list.filter((c) => c.citizenId === filters.citizenId);
    }

    return list;
  },

  getComplaintById: async (id) => {
    await delay(500);
    const list = getComplaintsFromStorage();
    const item = list.find((c) => c.id === id);
    if (!item) throw new Error('Complaint not found');
    return item;
  },

  createComplaint: async (complaintData, citizenUser) => {
    await delay(1000);
    const list = getComplaintsFromStorage();
    
    const ticketId = `TKT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newComplaint = {
      id: ticketId,
      ...complaintData,
      status: 'PENDING',
      assignedDepartment: 'Awaiting Department Assignment',
      assignedOfficer: 'Pending Assignment',
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      citizenId: citizenUser?.id || 'anonymous',
      citizenName: complaintData.anonymous ? 'Anonymous Citizen' : (citizenUser?.name || 'Public User'),
      history: [
        {
          status: 'PENDING',
          date: new Date().toISOString(),
          comment: 'Grievance submitted successfully. Initial ticket created.'
        }
      ]
    };

    list.push(newComplaint);
    saveComplaintsToStorage(list);
    return newComplaint;
  },

  updateComplaint: async (id, updatedFields) => {
    await delay(600);
    const list = getComplaintsFromStorage();
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Complaint not found');

    const original = list[index];
    const updated = {
      ...original,
      ...updatedFields,
      updatedDate: new Date().toISOString()
    };

    // If status changed, add to timeline history
    if (updatedFields.status && updatedFields.status !== original.status) {
      updated.history.push({
        status: updatedFields.status,
        date: new Date().toISOString(),
        comment: updatedFields.comment || `Status updated to ${updatedFields.status}`
      });
    }

    list[index] = updated;
    saveComplaintsToStorage(list);
    return updated;
  },

  deleteComplaint: async (id) => {
    await delay(500);
    const list = getComplaintsFromStorage();
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Complaint not found');
    
    // Only allow deletion if in PENDING state (acting as draft/unprocessed)
    const complaint = list[index];
    if (complaint.status !== 'PENDING') {
      throw new Error('Processed complaints cannot be deleted');
    }

    const filtered = list.filter((c) => c.id !== id);
    saveComplaintsToStorage(filtered);
    return { success: true };
  },

  // 3. Feedback API
  submitFeedback: async (feedbackData) => {
    await delay(800);
    const feedbacks = getFeedbackFromStorage();
    const newFeedback = {
      id: `fb-${Math.floor(1000 + Math.random() * 9000)}`,
      ...feedbackData,
      createdDate: new Date().toISOString()
    };
    
    feedbacks.push(newFeedback);
    saveFeedbackToStorage(feedbacks);

    // Update the corresponding complaint to link this feedback
    const complaints = getComplaintsFromStorage();
    const compIdx = complaints.findIndex(c => c.id === feedbackData.complaintId);
    if (compIdx !== -1) {
      complaints[compIdx].feedbackId = newFeedback.id;
      complaints[compIdx].status = 'CLOSED';
      complaints[compIdx].history.push({
        status: 'CLOSED',
        date: new Date().toISOString(),
        comment: 'Citizen submitted feedback. Case officially closed.'
      });
      saveComplaintsToStorage(complaints);
    }

    return newFeedback;
  },

  getFeedback: async () => {
    await delay(500);
    return getFeedbackFromStorage();
  }
};

export default apiClient;
