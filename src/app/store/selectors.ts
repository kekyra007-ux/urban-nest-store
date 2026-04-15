/** Design reminder: derived selectors keep catalog UX rich without scattering business logic. */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';

const sortProducts = (products: RootState['catalog']['items'], sort: RootState['catalog']['filters']['sort']) => {
  const copy = [...products];

  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return copy.sort((a, b) => b.rating - a.rating);
    case 'title-asc':
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return copy.sort((a, b) => b.rating - a.rating || a.price - b.price);
  }
};

export const selectCatalogState = (state: RootState) => state.catalog;
export const selectWishlistIds = (state: RootState) => state.wishlist.ids;

export const selectFilteredProducts = createSelector([selectCatalogState], (catalog) => {
  const query = catalog.filters.query.trim().toLowerCase();

  const filtered = catalog.items.filter((product) => {
    const matchesCategory = catalog.filters.category === 'all' || product.category === catalog.filters.category;
    const matchesQuery =
      !query ||
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });

  return sortProducts(filtered, catalog.filters.sort);
});

export const selectCatalogMeta = createSelector([selectCatalogState, selectFilteredProducts], (catalog, items) => {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / catalog.filters.perPage));
  const page = Math.min(catalog.filters.page, totalPages);
  const startIndex = (page - 1) * catalog.filters.perPage;
  const endIndex = startIndex + catalog.filters.perPage;

  return {
    total,
    totalPages,
    currentPage: page,
    startIndex,
    endIndex,
  };
});

export const selectPaginatedProducts = createSelector(
  [selectFilteredProducts, selectCatalogMeta],
  (items, meta) => items.slice(meta.startIndex, meta.endIndex),
);

export const selectFeaturedProducts = createSelector([selectCatalogState], (catalog) =>
  [...catalog.items].sort((a, b) => b.rating - a.rating).slice(0, 8),
);

export const selectNewArrivals = createSelector([selectCatalogState], (catalog) =>
  [...catalog.items].sort((a, b) => b.id - a.id).slice(0, 4),
);

export const selectWishlistProducts = createSelector([selectCatalogState, selectWishlistIds], (catalog, ids) =>
  catalog.items.filter((product) => ids.includes(product.id)),
);
