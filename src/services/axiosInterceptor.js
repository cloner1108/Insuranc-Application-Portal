import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "https://assignment.devotel.io/api";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Request interceptor (e.g., add auth token)
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Add token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (e.g., handle errors globally)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: Handle 401 errors
    if (error.response && error.response.status === 401) {
      // Optionally redirect to login or clear storage
      // localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
