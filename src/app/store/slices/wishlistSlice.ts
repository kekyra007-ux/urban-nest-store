/** Design reminder: wishlist interactions should feel lightweight and instantly legible. */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  ids: number[];
}

const initialState: WishlistState = {
  ids: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    hydrateWishlist(state, action: PayloadAction<number[]>) {
      state.ids = action.payload;
    },
    toggleWishlist(state, action: PayloadAction<number>) {
      if (state.ids.includes(action.payload)) {
        state.ids = state.ids.filter((id) => id !== action.payload);
        return;
      }
      state.ids.push(action.payload);
    },
  },
});

export const { hydrateWishlist, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
