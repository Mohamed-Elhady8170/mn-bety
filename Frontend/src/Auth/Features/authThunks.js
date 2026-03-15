import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../lib/axios';

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/auth/register', userData);
      return res.data.data; // { user, accessToken }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'حدث خطأ');
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/auth/login', { email, password });
      return res.data.data; // { user, accessToken }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'حدث خطأ');
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'حدث خطأ');
    }
  }
);