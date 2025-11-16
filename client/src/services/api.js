import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('API Response:', response.config.url, response.status);
    return response;
  },
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const fetchBugs = async () => {
  try {
    const response = await api.get('/bugs');
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch bugs');
  }
};

export const createBug = async (bugData) => {
  try {
    const response = await api.post('/bugs', bugData);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create bug');
  }
};

export const updateBug = async (id, updates) => {
  try {
    const response = await api.put(`/bugs/${id}`, updates);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update bug');
  }
};

export const deleteBug = async (id) => {
  try {
    const response = await api.delete(`/bugs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete bug');
  }
};

export default api;
