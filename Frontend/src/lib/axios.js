import axios from 'axios';
import { store } from '../store/store';
import { clearAuth, setAccessToken } from '../Auth/Features/authSlice';

const BASE_URL = 'http://localhost:4000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,  // send httpOnly cookie (refresh token) with every request
});

// Attach access token to every outgoing request
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses — try silent refresh, logout if it fails
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // prevent infinite retry loop
      try {
        // request new access token using refresh token from cookie
        const res = await axios.post(
          `${BASE_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const newToken = res.data.data;
        store.dispatch(setAccessToken(newToken));
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);   // retry original request
      } catch {
        // refresh failed — clear auth state and force logout
        store.dispatch(clearAuth());
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;