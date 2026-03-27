import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateAxios } from "../../../lib/axios";
import {
  saveAuthToStorage,
} from "../../../Auth/Features/authStorage";

// ─── API calls ────────────────────────────────────────────────────────────────

const getMySellerProfileAPI  = async () => (await privateAxios.get("/sellers/me")).data.data.seller;

const updateSellerProfileAPI = async (data) => (await privateAxios.put("/sellers/me", data)).data.data.seller;

const updateSellerLogoAPI    = async (file) => {
  const formData = new FormData();
  formData.append("sellerLogo", file);
  return (await privateAxios.post("/sellers/me/logo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })).data.data.seller;
};

const deleteSellerAccountAPI = async () => (await privateAxios.delete("/sellers/me")).data.data;

const upgradeToSellerAPI     = async (data) => (await privateAxios.post("/sellers/upgrade", data)).data.data;

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const fetchMySellerProfile = createAsyncThunk(
  "sellerProfile/fetchMyProfile",
  async (_, { rejectWithValue }) => {
    try { return await getMySellerProfileAPI(); }
    catch (err) { return rejectWithValue(err.response?.data?.message || "حدث خطأ"); }
  }
);

export const updateSellerProfile = createAsyncThunk(
  "sellerProfile/updateProfile",
  async (data, { rejectWithValue }) => {
    try { return await updateSellerProfileAPI(data); }
    catch (err) { return rejectWithValue(err.response?.data?.message || "حدث خطأ"); }
  }
);

export const updateSellerLogo = createAsyncThunk(
  "sellerProfile/updateLogo",
  async (file, { rejectWithValue }) => {
    try { return await updateSellerLogoAPI(file); }
    catch (err) { return rejectWithValue(err.response?.data?.message || "حدث خطأ"); }
  }
);

export const deleteSellerAccount = createAsyncThunk(
  "sellerProfile/deleteAccount",
  async (_, { rejectWithValue, getState }) => {
    try {
      const data        = await deleteSellerAccountAPI();
      const currentUser = getState().auth.user;
      const updatedUser = {
        ...currentUser,
        roles: currentUser?.roles?.filter((r) => r !== "seller") || ["customer"],
      };
      saveAuthToStorage(updatedUser, data.accessToken);
      return { accessToken: data.accessToken, updatedUser };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "حدث خطأ");
    }
  }
);

export const upgradeToSeller = createAsyncThunk(
  "sellerProfile/upgrade",
  async (data, { rejectWithValue, getState }) => {
    try {
      const result      = await upgradeToSellerAPI(data);
      const currentUser = getState().auth.user;
      const updatedUser = {
        ...currentUser,
        roles: [...(currentUser?.roles || []), "seller"],
      };
      saveAuthToStorage(updatedUser, result.accessToken);
      return result;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "حدث خطأ");
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const sellerSlice = createSlice({
  name: "sellerProfile",
  initialState: {
    profile:  null,
    loading:  false,
    updating: false,
    error:    null,
  },
  reducers: {
    clearSellerError:   (state) => { state.error   = null; },
    clearSellerProfile: (state) => { state.profile = null; },
  },
  extraReducers: (builder) => {
    // ─── fetch
    builder
      .addCase(fetchMySellerProfile.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(fetchMySellerProfile.fulfilled, (state, action) => { state.loading = false; state.profile = action.payload; })
      .addCase(fetchMySellerProfile.rejected,  (state, action) => { state.loading = false; state.error   = action.payload; });

    // ─── update profile
    builder
      .addCase(updateSellerProfile.pending,   (state) => { state.updating = true;  state.error = null; })
      .addCase(updateSellerProfile.fulfilled, (state, action) => { state.updating = false; state.profile = action.payload; })
      .addCase(updateSellerProfile.rejected,  (state, action) => { state.updating = false; state.error   = action.payload; });

    // ─── update logo
    builder
      .addCase(updateSellerLogo.pending,   (state) => { state.updating = true;  state.error = null; })
      .addCase(updateSellerLogo.fulfilled, (state, action) => { state.updating = false; state.profile = action.payload; })
      .addCase(updateSellerLogo.rejected,  (state, action) => { state.updating = false; state.error   = action.payload; });

    // ─── delete seller account
    builder
      .addCase(deleteSellerAccount.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(deleteSellerAccount.fulfilled, (state) => { state.loading = false; state.profile = null; })
      .addCase(deleteSellerAccount.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });

    // ─── upgrade to seller
    builder
      .addCase(upgradeToSeller.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(upgradeToSeller.fulfilled, (state, action) => { state.loading = false; state.profile = action.payload.seller; })
      .addCase(upgradeToSeller.rejected,  (state, action) => { state.loading = false; state.error   = action.payload; });
  },
});

export const { clearSellerError, clearSellerProfile } = sellerSlice.actions;
export default sellerSlice.reducer;