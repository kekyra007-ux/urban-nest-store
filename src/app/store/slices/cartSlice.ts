/** Design reminder: cart mechanics should feel dependable, immediate, and frictionless. */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/entities/product/model/types';
import { CartItem, CartState } from '@/entities/cart/model/types';

const initialState: CartState = {
  items: [],
};

function normalizeCartItem(product: Product): CartItem {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    category: product.category,
    brand: product.brand,
    quantity: 1,
  };
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find((item) => item.id === action.payload.id);

      if (existing) {
        existing.quantity += 1;
        return;
      }

      state.items.push(normalizeCartItem(action.payload));
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const existing = state.items.find((item) => item.id === action.payload);

      if (existing) {
        existing.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const existing = state.items.find((item) => item.id === action.payload);

      if (!existing) {
        return;
      }

      if (existing.quantity <= 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        return;
      }

      existing.quantity -= 1;
    },
    setItemQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const existing = state.items.find((item) => item.id === action.payload.id);

      if (!existing) {
        return;
      }

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        return;
      }

      existing.quantity = Math.floor(action.payload.quantity);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  hydrateCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
