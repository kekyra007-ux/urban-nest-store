/** Design reminder: product detail state should support focused storytelling and related discovery. */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '@/entities/product/model/types';
import { productsApi } from '@/shared/api/products';

interface ProductState {
  current: Product | null;
  related: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  relatedStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  current: null,
  related: [],
  status: 'idle',
  relatedStatus: 'idle',
  error: null,
};

export const fetchProductById = createAsyncThunk('product/fetchById', async (id: number) => productsApi.getProductById(id));
export const fetchRelatedProducts = createAsyncThunk(
  'product/fetchRelated',
  async ({ category, excludeId }: { category: string; excludeId: number }) => productsApi.getRelatedProducts(category, excludeId),
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearCurrentProduct(state) {
      state.current = null;
      state.related = [];
      state.status = 'idle';
      state.relatedStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.current = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Не удалось загрузить товар';
      })
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.relatedStatus = 'loading';
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.relatedStatus = 'succeeded';
        state.related = action.payload;
      })
      .addCase(fetchRelatedProducts.rejected, (state) => {
        state.relatedStatus = 'failed';
      });
  },
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
