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
import { setColorScheme } from '@/app/store/slices/uiSlice';
import { storage } from '@/shared/lib/storage';
import { GlobalStyles } from '@/shared/styles/global-styles';
import { lightTheme, darkTheme } from '@/shared/styles/theme';

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
  const colorScheme = useAppSelector((state) => state.ui.colorScheme);

  useEffect(() => {
    if (hydratedRef.current) {
      return;
    }

    store.dispatch(hydrateCart(storage.get(storage.keys.cart, [])));
    store.dispatch(hydrateWishlist(storage.get(storage.keys.wishlist, [])));
    store.dispatch(hydrateCatalogPreferences(storage.get(storage.keys.catalogPrefs, catalogFallback)));

    const savedScheme = storage.get<'light' | 'dark' | null>(storage.keys.colorScheme, null);
    if (savedScheme === 'light' || savedScheme === 'dark') {
      store.dispatch(setColorScheme(savedScheme));
    } else {
      // respect OS preference on first visit
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        store.dispatch(setColorScheme('dark'));
      }
    }

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

  useEffect(() => {
    if (!hydratedRef.current) {
      return;
    }

    storage.set(storage.keys.colorScheme, colorScheme);
  }, [colorScheme]);

  return null;
}

function ThemedShell({ children }: { children: React.ReactNode }) {
  const colorScheme = useAppSelector((state) => state.ui.colorScheme);
  const currentTheme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <StoreSync />
      {children}
    </ThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <ThemedShell>{children}</ThemedShell>
    </Provider>
  );
}
