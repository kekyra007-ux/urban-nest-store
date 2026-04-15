/** Design reminder: typed commerce entities create trust, stability, and clear domain language. */
export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
  tags?: string[];
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  minimumOrderQuantity?: number;
  reviews?: Review[];
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CatalogFilters {
  category: string;
  query: string;
  sort: SortOption;
  page: number;
  perPage: number;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc' | 'title-asc';
