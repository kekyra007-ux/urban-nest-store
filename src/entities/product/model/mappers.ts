/** Design reminder: normalize external data so the interface always feels curated and stable. */
import { Product } from './types';

export const mapProduct = (product: Product): Product => ({
  ...product,
  images: product.images?.length ? product.images : [product.thumbnail],
});
