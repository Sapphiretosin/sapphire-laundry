import axios from "axios";

// Base URL of your backend
const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Auth APIs
export const registerUser = async (name, email, password) => {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

// Example for adding token to requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
