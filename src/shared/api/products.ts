/** Design reminder: the data layer should support smooth merchandising and dependable detail pages. */
import { mapProduct } from '@/entities/product/model/mappers';
import { Category, Product, ProductListResponse } from '@/entities/product/model/types';
import { fetchJson } from './client';

export const productsApi = {
  async getAllProducts() {
    const response = await fetchJson<ProductListResponse>('/products?limit=0');
    return response.products.map(mapProduct);
  },
  async getCategories() {
    return fetchJson<Category[]>('/products/categories');
  },
  async getProductById(id: number) {
    const response = await fetchJson<Product>(`/products/${id}`);
    return mapProduct(response);
  },
  async getRelatedProducts(category: string, excludeId: number) {
    const response = await fetchJson<ProductListResponse>(`/products/category/${category}?limit=0`);
    return response.products
      .map(mapProduct)
      .filter((product) => product.id !== excludeId)
      .slice(0, 4);
  },
};
