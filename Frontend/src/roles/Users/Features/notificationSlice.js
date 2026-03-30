import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notificationService from './notificationService';

// Fetch all notifications from DB
export const fetchNotifications = createAsyncThunk('notifications/fetchAll', async (_, thunkAPI) => {
  try {
    return await notificationService.getMyNotifications();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch notifications");
  }
});

// Mark a specific notification as read
export const markNotificationRead = createAsyncThunk('notifications/markRead', async (id, thunkAPI) => {
  try {
    return await notificationService.markAsRead(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to mark as read");
  }
});

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [],
    unreadCount: 0,
    isLoading: false,
  },
  reducers: {
    addLiveNotification: (state, action) => {
      state.items.unshift(action.payload);
      state.unreadCount += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => { 
        state.isLoading = true; 
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data?.notifications || [];
        state.unreadCount = state.items.filter(n => !n.isRead).length;
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const updated = action.payload.data?.notification;
        const index = state.items.findIndex(n => n._id === updated?._id);
        if (index !== -1 && !state.items[index].isRead) {
          state.items[index].isRead = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      });
  },
});

export const { addLiveNotification } = notificationSlice.actions;
export default notificationSlice.reducer;