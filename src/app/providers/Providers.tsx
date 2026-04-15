'use client';

/** Design reminder: providers should create a cohesive, premium shell rather than leak infrastructure into the UI. */
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { AppStore, makeStore } from '@/app/store';
import { useAppSelector, useAppStore } from '@/app/store/hooks';
import { hydrateCart } from '@/app/store/slices/cartSlice';
import { hydrateCatalogPreferences } from '@/app/store/slices/catalogSlice';
import { hydrateWishlist } from '@/app/store/slices/wishlistSlice';
import { storage } from '@/shared/lib/storage';
import { GlobalStyles } from '@/shared/styles/global-styles';
import { theme } from '@/shared/styles/theme';

const catalogFallback = {
  category: 'all',
  query: '',
  sort: 'featured' as const,
  page: 1,
  perPage: 12,
};

function StoreSync() {
  const store = useAppStore();
  const hydratedRef = useRef(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistIds = useAppSelector((state) => state.wishlist.ids);
  const filters = useAppSelector((state) => state.catalog.filters);

  useEffect(() => {
    if (hydratedRef.current) {
      return;
    }

    store.dispatch(hydrateCart(storage.get(storage.keys.cart, [])));
    store.dispatch(hydrateWishlist(storage.get(storage.keys.wishlist, [])));
    store.dispatch(hydrateCatalogPreferences(storage.get(storage.keys.catalogPrefs, catalogFallback)));
    hydratedRef.current = true;
  }, [store]);

  useEffect(() => {
    if (!hydratedRef.current) {
      return;
    }

    storage.set(storage.keys.cart, cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (!hydratedRef.current) {
      return;
    }

    storage.set(storage.keys.wishlist, wishlistIds);
  }, [wishlistIds]);

  useEffect(() => {
    if (!hydratedRef.current) {
      return;
    }

    storage.set(storage.keys.catalogPrefs, filters);
  }, [filters]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <StoreSync />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
