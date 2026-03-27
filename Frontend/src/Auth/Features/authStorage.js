/**
 * @file authStorage.js
 * @description Handles all auth persistence in localStorage.
 * Imported by authSlice — never call localStorage directly in slices/components.
 */

const KEYS = {
  USER: 'mn-bety-user',
  TOKEN: 'mn-bety-token',
};

// ─── Save ─────────────────────────────────────────────────────────────────────

export const saveAuthToStorage = (user, accessToken) => {
  try {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
    localStorage.setItem(KEYS.TOKEN, accessToken);
  } catch (err) {
    console.error('[authStorage] Failed to save auth:', err);
  }
};

export const saveTokenToStorage = (accessToken) => {
  try {
    localStorage.setItem(KEYS.TOKEN, accessToken);
  } catch (err) {
    console.error('[authStorage] Failed to save token:', err);
  }
};

// ─── Load ─────────────────────────────────────────────────────────────────────

export const loadAuthFromStorage = () => {
  try {
    const user = localStorage.getItem(KEYS.USER);
    const accessToken = localStorage.getItem(KEYS.TOKEN);
    return {
      user: user ? JSON.parse(user) : null,
      accessToken: accessToken || null,
    };
  } catch (err) {
    console.error('[authStorage] Failed to load auth:', err);
    return { user: null, accessToken: null };
  }
};

// ─── Clear ────────────────────────────────────────────────────────────────────

export const clearAuthFromStorage = () => {
  try {
    localStorage.removeItem(KEYS.USER);
    localStorage.removeItem(KEYS.TOKEN);
  } catch (err) {
    console.error('[authStorage] Failed to clear auth:', err);
  }
};

// ─── Update user only (e.g. after role change) ────────────────────────────────

export const updateUserInStorage = (user) => {
  try {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  } catch (err) {
    console.error('[authStorage] Failed to update user:', err);
  }
};