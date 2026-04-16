/** Design reminder: catalog state must support elegant browsing, configurable pagination, and low-friction filtering. */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogFilters, Category, Product, SortOption } from '@/entities/product/model/types';
import { DEFAULT_PAGE_SIZE } from '@/shared/config/constants';
import { productsApi } from '@/shared/api/products';

interface CatalogState {
  items: Product[];
  categories: Category[];
  filters: CatalogFilters;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  categoriesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CatalogState = {
  items: [],
  categories: [],
  filters: {
    category: 'all',
    query: '',
    sort: 'featured',
    page: 1,
    perPage: DEFAULT_PAGE_SIZE,
  },
  status: 'idle',
  categoriesStatus: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk('catalog/fetchProducts', async () =>
  productsApi.getAllProducts(),
);
export const fetchCategories = createAsyncThunk('catalog/fetchCategories', async () =>
  productsApi.getCategories(),
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.filters.category = action.payload;
      state.filters.page = 1;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.filters.query = action.payload;
      state.filters.page = 1;
    },
    setSort(state, action: PayloadAction<SortOption>) {
      state.filters.sort = action.payload;
      state.filters.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.filters.page = action.payload;
    },
    setPerPage(state, action: PayloadAction<number>) {
      state.filters.perPage = action.payload;
      state.filters.page = 1;
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
    hydrateCatalogPreferences(state, action: PayloadAction<Partial<CatalogFilters>>) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Не удалось загрузить каталог';
      })
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesStatus = 'failed';
      });
  },
});

export const {
  setCategory,
  setSearchQuery,
  setSort,
  setPage,
  setPerPage,
  resetFilters,
  hydrateCatalogPreferences,
} = catalogSlice.actions;
export default catalogSlice.reducer;
