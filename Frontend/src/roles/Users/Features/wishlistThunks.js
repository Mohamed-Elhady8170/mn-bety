// src/roles/Users/Features/wishlistThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateAxios } from '../../../lib/axios';

export const fetchWishlistThunk = createAsyncThunk(
  'wishlist/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await privateAxios.get('/wishlist');
      return res.data.data.wishlist;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'حدث خطأ');
    }
  }
);

export const addToWishlistThunk = createAsyncThunk(
  'wishlist/add',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await privateAxios.post('/wishlist', { productId });
      return res.data.data.wishlist;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'حدث خطأ');
    }
  }
);

export const removeFromWishlistThunk = createAsyncThunk(
  'wishlist/remove',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await privateAxios.delete(`/wishlist/${productId}`);
      const wishlistData = res.data?.data?.wishlist;
      // Backend may return { products: [...] } or direct array
      const products = Array.isArray(wishlistData)
        ? wishlistData
        : wishlistData?.products ?? null;
      return { products, removedId: productId };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'حدث خطأ');
    }
  }
);

export const clearWishlistThunk = createAsyncThunk(
  'wishlist/clear',
  async (_, { rejectWithValue }) => {
    try {
      await privateAxios.delete('/wishlist');
      return [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'حدث خطأ');
    }
  }
);