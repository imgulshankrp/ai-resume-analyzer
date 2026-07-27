import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export default api;

export const authAPI = axios.create({
  baseURL: `${API_URL}/auth`,
});

export const registerUser = (data) => authAPI.post("/register", data);

export const loginUser = (data) => authAPI.post("/login", data);