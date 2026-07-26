import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-analyzer-zf65.onrender.com",
});

export const registerUser = (data) => API.post("/register", data);

export const loginUser = (data) => API.post("/login", data);