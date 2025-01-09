import axios from 'axios';

// Base URL of your API
const API_BASE_URL = 'https://example.com/api';

// Axios instance for reusable configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic API methods
const apiService = {
  // GET request
  get: async (endpoint, params = {}) => {
    try {
      const response = await axiosInstance.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  },

  // POST request
  post: async (endpoint, body) => {
    try {
      const response = await axiosInstance.post(endpoint, body);
      return response.data;
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  },

  // PUT request
  put: async (endpoint, body) => {
    try {
      const response = await axiosInstance.put(endpoint, body);
      return response.data;
    } catch (error) {
      console.error(`PUT ${endpoint} failed:`, error);
      throw error;
    }
  },

  // PATCH request
  patch: async (endpoint, body) => {
    try {
      const response = await axiosInstance.patch(endpoint, body);
      return response.data;
    } catch (error) {
      console.error(`PATCH ${endpoint} failed:`, error);
      throw error;
    }
  },

  // DELETE request
  delete: async (endpoint) => {
    try {
      const response = await axiosInstance.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(`DELETE ${endpoint} failed:`, error);
      throw error;
    }
  },
};

export default apiService;
