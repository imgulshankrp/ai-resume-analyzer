import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

// ==============================
// Main API
// ==============================

const api = axios.create({
  baseURL: API_URL,
});

// Automatically attach JWT token

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

// ==============================
// Auth API
// ==============================

export const authAPI = axios.create({
  baseURL: `${API_URL}/auth`,
});

export const registerUser = (data) =>
  authAPI.post("/register", data);

export const loginUser = (data) =>
  authAPI.post("/login", data);