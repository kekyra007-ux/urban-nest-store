/** Design reminder: transient UI state should serve navigation and filtering, never overwhelm the experience. */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToastType = 'cart' | 'wishlist-add' | 'wishlist-remove' | 'remove' | 'success' | 'error';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
}

interface UiState {
  mobileMenuOpen: boolean;
  filtersOpen: boolean;
  toasts: Toast[];
  cartDrawerOpen: boolean;
}

const initialState: UiState = {
  mobileMenuOpen: false,
  filtersOpen: false,
  toasts: [],
  cartDrawerOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },
    toggleFilters(state) {
      state.filtersOpen = !state.filtersOpen;
    },
    closeFilters(state) {
      state.filtersOpen = false;
    },
    addToast(state, action: PayloadAction<Omit<Toast, 'id'>>) {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      // cap at 5 toasts — drop the oldest
      if (state.toasts.length >= 5) {
        state.toasts.shift();
      }
      state.toasts.push({ id, ...action.payload });
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    openCartDrawer(state) {
      state.cartDrawerOpen = true;
    },
    closeCartDrawer(state) {
      state.cartDrawerOpen = false;
    },
  },
});

export const {
  toggleMobileMenu,
  closeMobileMenu,
  toggleFilters,
  closeFilters,
  addToast,
  removeToast,
  openCartDrawer,
  closeCartDrawer,
} = uiSlice.actions;
export default uiSlice.reducer;
