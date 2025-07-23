import axios from 'axios';

// Dynamically set base URL based on environment
const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:9000'
    : '/api';

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});