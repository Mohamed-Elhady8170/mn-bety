import { createSlice } from '@reduxjs/toolkit';
import {
  saveAuthToStorage,
  saveTokenToStorage,
  clearAuthFromStorage,
  loadAuthFromStorage,
  updateUserInStorage,
} from './authStorage';
import {
  loginThunk,
  registerThunk,
  logoutThunk,
  upgradeToSellerThunk,
  deleteSellerAccountThunk,
   updateMe
} from './authThunks';

// ─── Load persisted state on app start ───────────────────────────────────────
const persisted = loadAuthFromStorage();

const initialState = {
  user: persisted.user,           // { userId, fullName, email, phone, roles }
  accessToken: persisted.accessToken,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Called by axios interceptor after silent refresh
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      saveTokenToStorage(action.payload);
    },

    // Called on logout or when refresh fails
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.error = null;
      clearAuthFromStorage();
    },

    // Clear error manually (e.g. when user closes error toast)
    clearError: (state) => {
      state.error = null;
    },

    // Update user roles after any role change (upgrade/downgrade)
    updateUserRoles: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, roles: action.payload };
        updateUserInStorage(state.user);
      }
    },

    updateEmailVerified: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, emailVerified: action.payload };
        updateUserInStorage(state.user);
      }
    },

    // Keep auth user in sync with customer profile updates (name/avatar/etc.).
    syncAuthUserProfile: (state, action) => {
      if (!state.user || !action.payload) return;

      const profile = action.payload;
      state.user = {
        ...state.user,
        ...(profile.fullName !== undefined ? { fullName: profile.fullName } : {}),
        ...(profile.phone !== undefined ? { phone: profile.phone } : {}),
        ...(profile.avatar !== undefined ? { avatar: profile.avatar } : {}),
        ...(profile.emailVerified !== undefined ? { emailVerified: profile.emailVerified } : {}),
        ...(profile.createdAt !== undefined ? { createdAt: profile.createdAt } : {}),
      };

      updateUserInStorage(state.user);
    },
  },

  extraReducers: (builder) => {

    // ─── Register ─────────────────────────────────────────────────────────────
    builder
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        saveAuthToStorage(action.payload.user, action.payload.accessToken);
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // ─── Login ────────────────────────────────────────────────────────────────
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        saveAuthToStorage(action.payload.user, action.payload.accessToken);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // ─── Logout ───────────────────────────────────────────────────────────────
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.accessToken = null;
        state.error = null;
        clearAuthFromStorage();
      })
      .addCase(logoutThunk.rejected, (state) => {
        // Even if server logout fails, clear local state
        state.isLoading = false;
        state.user = null;
        state.accessToken = null;
        state.error = null;
        clearAuthFromStorage();
      });

    // ─── Upgrade to Seller ────────────────────────────────────────────────────
    builder
      .addCase(upgradeToSellerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(upgradeToSellerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // Backend returns new accessToken with updated roles
        state.accessToken = action.payload.accessToken;
        // Add seller role to user locally
        const updatedUser = {
          ...state.user,
          roles: [...(state.user?.roles || []), 'seller'],
        };
        state.user = updatedUser;
        saveAuthToStorage(updatedUser, action.payload.accessToken);
      })
      .addCase(upgradeToSellerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // ─── Delete Seller Account ────────────────────────────────────────────────
    builder
      .addCase(deleteSellerAccountThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSellerAccountThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // Backend returns new accessToken without seller role
        state.accessToken = action.payload.accessToken;
        const updatedUser = {
          ...state.user,
          roles: state.user?.roles?.filter((r) => r !== 'seller') || ['customer'],
        };
        state.user = updatedUser;
        saveAuthToStorage(updatedUser, action.payload.accessToken);
      })
      .addCase(deleteSellerAccountThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
      // ─── Update Me ────────────────────────────────────────────────────────────────
builder
  .addCase(updateMe.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  })
  .addCase(updateMe.fulfilled, (state, action) => {
    state.isLoading = false;
    // Backend returns updated user — merge into state
    state.user = { ...state.user, ...action.payload };
    updateUserInStorage(state.user);
  })
  .addCase(updateMe.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
  },
});


export const {
  setAccessToken,
  clearAuth,
  clearError,
  updateUserRoles,
  updateEmailVerified,
  syncAuthUserProfile,
} = authSlice.actions;
export default authSlice.reducer;