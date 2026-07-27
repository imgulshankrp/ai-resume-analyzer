import axios from "axios";

console.log("API URL:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;

export const authAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
});

export const registerUser = (data) => authAPI.post("/register", data);

export const loginUser = (data) => authAPI.post("/login", data);