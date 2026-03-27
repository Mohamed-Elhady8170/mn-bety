import { createAsyncThunk } from '@reduxjs/toolkit';
import { publicAxios, privateAxios } from '../../lib/axios';

// ─── Register ─────────────────────────────────────────────────────────────────
export const registerThunk = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await publicAxios.post('/auth/register', userData);
      // res.data.data = { user, accessToken }
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'حدث خطأ، حاول مجدداً');
    }
  }
);

// ─── Login ────────────────────────────────────────────────────────────────────
export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await publicAxios.post('/auth/login', { email, password });
      // res.data.data = { user, accessToken }
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'حدث خطأ، حاول مجدداً');
    }
  }
);

// ─── Logout ───────────────────────────────────────────────────────────────────
export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // publicAxios has withCredentials: true so refresh cookie gets sent
      await publicAxios.post('/auth/logout');
    } catch (err) {
      // Even if server fails, we still clear local state in the slice
      return rejectWithValue(err.response?.data?.message || 'حدث خطأ');
    }
  }
);

// ─── Verify Email (called from /verify-email page with token from URL) ────────
export const verifyEmailThunk = createAsyncThunk(
  'auth/verifyEmail',
  async (token, { rejectWithValue, dispatch }) => {
    try {
      const res = await publicAxios.post('/auth/verify-email', { token });
      // update emailVerified in store if user is logged in
      dispatch({ type: 'auth/updateEmailVerified', payload: true });
      return res.data.message;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'رابط التحقق غير صالح أو منتهي الصلاحية'
      );
    }
  }
);

// ─── Resend Verification Email ────────────────────────────────────────────────
export const resendVerificationThunk = createAsyncThunk(
  'auth/resendVerification',
  async (_, { rejectWithValue }) => {
    try {
      // Private route — user must be logged in
      const res = await privateAxios.post('/auth/resend-verification');
      return res.data.message;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'حدث خطأ أثناء إعادة الإرسال'
      );
    }
  }
);

// ─── Forgot Password ──────────────────────────────────────────────────────────
export const forgotPasswordThunk = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const res = await publicAxios.post('/auth/forgot-password', { email });
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'حدث خطأ، حاول مجدداً');
    }
  }
);

// ─── Reset Password (token comes from URL query param) ───────────────────────
export const resetPasswordThunk = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const res = await publicAxios.post('/auth/reset-password', { token, newPassword });
      return res.data.message;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'رابط إعادة التعيين غير صالح أو منتهي الصلاحية'
      );
    }
  }
);

// ─── Change Password (authenticated user) ────────────────────────────────────
export const changePasswordThunk = createAsyncThunk(
  'auth/changePassword',
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const res = await privateAxios.patch('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'حدث خطأ، حاول مجدداً');
    }
  }
);

// ─── Get Me (fetch current user data) ────────────────────────────────────────
export const getMeThunk = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const res = await privateAxios.get('/auth/me');
      return res.data.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'حدث خطأ');
    }
  }
);

// ─── Upgrade to Seller ────────────────────────────────────────────────────────
export const upgradeToSellerThunk = createAsyncThunk(
  'auth/upgradeToSeller',
  async (sellerData, { rejectWithValue }) => {
    try {
      const res = await privateAxios.post('/sellers/upgrade', sellerData);
      // res.data.data = { seller, accessToken }
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'حدث خطأ، حاول مجدداً');
    }
  }
);

// ─── Delete Seller Account ────────────────────────────────────────────────────
export const deleteSellerAccountThunk = createAsyncThunk(
  'auth/deleteSellerAccount',
  async (_, { rejectWithValue }) => {
    try {
      const res = await privateAxios.delete('/sellers/me');
      // res.data.data = { accessToken } (new token without seller role)
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'حدث خطأ، حاول مجدداً');
    }
  }
);