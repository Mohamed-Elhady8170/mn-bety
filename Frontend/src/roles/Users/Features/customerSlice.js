import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateAxios } from "../../../lib/axios";
import { clearAuth, syncAuthUserProfile } from "../../../Auth/Features/authSlice";

// API calls
const getMyProfileAPI = async () => (await privateAxios.get("/customers/me")).data.data.profile;
const updateMyProfileAPI = async (data) => (await privateAxios.put("/customers/me", data)).data.data.profile;
const updateMyAvatarAPI = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  return (
    await privateAxios.post("/customers/me/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  ).data.data.profile;
};
const deleteMyAccountAPI = async () => {
  await privateAxios.delete("/customers/me");
};

// Thunks
export const fetchMyProfile = createAsyncThunk(
  "customer/fetchMyProfile",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const profile = await getMyProfileAPI();
      dispatch(syncAuthUserProfile(profile));
      return profile;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "حدث خطأ");
    }
  }
);

export const updateMyProfile = createAsyncThunk(
  "customer/updateMyProfile",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const profile = await updateMyProfileAPI(data);
      dispatch(syncAuthUserProfile(profile));
      return profile;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "حدث خطأ");
    }
  }
);

export const updateMyAvatar = createAsyncThunk(
  "customer/updateMyAvatar",
  async (file, { rejectWithValue, dispatch }) => {
    try {
      const profile = await updateMyAvatarAPI(file);
      dispatch(syncAuthUserProfile(profile));
      return profile;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "حدث خطأ");
    }
  }
);

export const deleteMyAccount = createAsyncThunk(
  "customer/deleteMyAccount",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await deleteMyAccountAPI();
      dispatch(clearAuth());
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "حدث خطأ");
    }
  }
);

// Slice
const customerSlice = createSlice({
  name: "customer",
  initialState: {
    profile: null,
    loading: false,
    updating: false,
    error: null,
  },
  reducers: {
    clearCustomerError: (state) => {
      state.error = null;
    },
    clearCustomerProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    // fetch
    builder
      .addCase(fetchMyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // update profile
    builder
      .addCase(updateMyProfile.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.updating = false;
        state.profile = action.payload;
      })
      .addCase(updateMyProfile.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });

    // update avatar
    builder
      .addCase(updateMyAvatar.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateMyAvatar.fulfilled, (state, action) => {
        state.updating = false;
        state.profile = action.payload;
      })
      .addCase(updateMyAvatar.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });

    // delete account
    builder
      .addCase(deleteMyAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMyAccount.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
      })
      .addCase(deleteMyAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCustomerError, clearCustomerProfile } = customerSlice.actions;
export default customerSlice.reducer;