import axios from "axios";
import { store } from "../store/store.js";
import { clearAuth, setAccessToken } from "../Auth/Features/authSlice";

const BASE_URL = "http://localhost:4000/api";

// ============================================================
//         1. PUBLIC INSTANCE — login, register, refresh
//    No interceptors — no token check, no auto refresh
// ============================================================
export const publicAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // needed for refresh token cookie
});

// ============================================================
//         2. PRIVATE INSTANCE — all protected routes
//    Attaches token + handles silent refresh on 401
// ============================================================
export const privateAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ============================================================
//              SHARED FUNCTIONS
//   Defined before interceptors — used inside them
//   Also exported so any file in the app can use them
// ============================================================

/**
 * @desc  Request a new access token using the refresh token cookie
 * @returns {string} new access token
 */
export const refreshTokenRequest = async () => {
  const res = await publicAxios.post("/auth/refresh-token");
  return res.data.data; // new access token
};

/**
 * @desc  Clear auth state — call on logout or when refresh fails
 */
export const logoutRequest = () => {
  store.dispatch(clearAuth());
};

// ============================================================
//              PRIVATE INSTANCE INTERCEPTORS
// ============================================================

// ─── Attach access token to every private request ────────────────────────────
privateAxios.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Handle 401 — silent refresh, logout if refresh fails ────────────────────
privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // prevent infinite retry loop

      try {
        const newToken = await refreshTokenRequest();
        store.dispatch(setAccessToken(newToken));
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return privateAxios(originalRequest); // retry original request
      } catch {
        logoutRequest(); // refresh failed — clear auth state
        return Promise.reject(error); // ✅ clean reject after logout
      }
    }

    return Promise.reject(error); // ✅ always reject unhandled errors
  }
);