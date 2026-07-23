import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-resume-analyzer-57fk.onrender.com/api",
});

export default api;