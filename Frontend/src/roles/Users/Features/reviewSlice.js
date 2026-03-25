import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicAxios } from "../../../lib/axios";
import { privateAxios } from "../../../lib/axios";

// ============================================================
//                     REVIEW THUNKS
// ============================================================

/**
 * @desc  Fetch all reviews for a product (public)
 *        GET /api/products/:productId/reviews
 */
export const fetchProductReviews = createAsyncThunk(
  "review/fetchProductReviews",
  async ({ productId, page = 1, limit = 5 }, { rejectWithValue }) => {
    try {
      const { data } = await publicAxios.get(
        `/products/${productId}/reviews`,
        { params: { page, limit } }
      );
      return data.data; // { reviews, total, page, pages }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load reviews"
      );
    }
  }
);

/**
 * @desc  Create a review (private — customer only)
 *        POST /api/products/:productId/reviews
 */
export const createReview = createAsyncThunk(
  "review/createReview",
  async ({ productId, rating, comment }, { rejectWithValue }) => {
    try {
      const { data } = await privateAxios.post(
        `/products/${productId}/reviews`,
        { rating, comment }
      );
      return data.data.review;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to submit review"
      );
    }
  }
);

/**
 * @desc  Update own review (private — owner only)
 *        PUT /api/reviews/:reviewId
 */
export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({ reviewId, rating, comment }, { rejectWithValue }) => {
    try {
      const { data } = await privateAxios.put(`/reviews/${reviewId}`, {
        rating,
        comment,
      });
      return data.data.review;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update review"
      );
    }
  }
);

/**
 * @desc  Delete a review (private — owner or admin)
 *        DELETE /api/reviews/:reviewId
 */
export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      await privateAxios.delete(`/reviews/${reviewId}`);
      return reviewId; // return id to remove from state
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete review"
      );
    }
  }
);

// ============================================================
//                      REVIEW SLICE
// ============================================================

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    // ── Product reviews list ───────────────────────────────
    reviews:        [],
    total:          0,
    page:           1,
    pages:          1,
    loading:        false,
    error:          null,

    // ── Submit (create / update) ───────────────────────────
    submitting:     false,
    submitError:    null,
    submitSuccess:  false,

    // ── Delete ─────────────────────────────────────────────
    deleting:       false,
    deleteError:    null,

    // ── Track which product's reviews are loaded ───────────
    currentProductId: null,
  },

  reducers: {
    resetSubmitState(state) {
      state.submitting    = false;
      state.submitError   = null;
      state.submitSuccess = false;
    },
    setReviewPage(state, action) {
      state.page = action.payload;
    },
    clearReviews(state) {
      state.reviews          = [];
      state.total            = 0;
      state.page             = 1;
      state.pages            = 1;
      state.currentProductId = null;
    },
  },

  extraReducers: (builder) => {
    // ── fetchProductReviews ────────────────────────────────
    builder
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading  = false;
        state.reviews  = action.payload.reviews;
        state.total    = action.payload.total;
        state.page     = action.payload.page;
        state.pages    = action.payload.pages;
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });

    // ── createReview ───────────────────────────────────────
    builder
      .addCase(createReview.pending, (state) => {
        state.submitting    = true;
        state.submitError   = null;
        state.submitSuccess = false;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.submitting    = false;
        state.submitSuccess = true;
        // Prepend new review to the top of the list
        state.reviews.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.submitting  = false;
        state.submitError = action.payload;
      });

    // ── updateReview ───────────────────────────────────────
    builder
      .addCase(updateReview.pending, (state) => {
        state.submitting    = true;
        state.submitError   = null;
        state.submitSuccess = false;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.submitting    = false;
        state.submitSuccess = true;
        // Replace updated review in list
        const idx = state.reviews.findIndex(
          (r) => r._id === action.payload._id
        );
        if (idx !== -1) state.reviews[idx] = action.payload;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.submitting  = false;
        state.submitError = action.payload;
      });

    // ── deleteReview ───────────────────────────────────────
    builder
      .addCase(deleteReview.pending, (state) => {
        state.deleting     = true;
        state.deleteError  = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.deleting = false;
        state.reviews  = state.reviews.filter((r) => r._id !== action.payload);
        state.total    = Math.max(0, state.total - 1);
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.deleting    = false;
        state.deleteError = action.payload;
      });
  },
});

export const { resetSubmitState, setReviewPage, clearReviews } =
  reviewSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectReviews        = (state) => state.review.reviews;
export const selectReviewsTotal   = (state) => state.review.total;
export const selectReviewsPage    = (state) => state.review.page;
export const selectReviewsPages   = (state) => state.review.pages;
export const selectReviewsLoading = (state) => state.review.loading;
export const selectReviewsError   = (state) => state.review.error;
export const selectSubmitting     = (state) => state.review.submitting;
export const selectSubmitError    = (state) => state.review.submitError;
export const selectSubmitSuccess  = (state) => state.review.submitSuccess;
export const selectDeleting       = (state) => state.review.deleting;

export default reviewSlice.reducer;