import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/bugs';

export const getAllBugs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getBugById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createBug = async (bugData) => {
  const response = await axios.post(API_URL, bugData);
  return response.data;
};

export const updateBug = async (id, updates) => {
  const response = await axios.put(`${API_URL}/${id}`, updates);
  return response.data;
};

export const deleteBug = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
