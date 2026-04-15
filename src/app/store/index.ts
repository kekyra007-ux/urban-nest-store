/** Design reminder: the store is the backbone of a composed commerce experience. */
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import catalogReducer from './slices/catalogSlice';
import productReducer from './slices/productSlice';
import uiReducer from './slices/uiSlice';
import wishlistReducer from './slices/wishlistSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      catalog: catalogReducer,
      product: productReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
      ui: uiReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
