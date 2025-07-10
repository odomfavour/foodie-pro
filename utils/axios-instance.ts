import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001/api',
  withCredentials: true, // optional: if you’re using cookies/auth
});

export default api;
