/** Design reminder: product browsing should feel curated and configurable, not rigid. */
export const API_BASE_URL = 'https://dummyjson.com';
export const DEFAULT_PAGE_SIZE = 12;
export const PAGE_SIZE_OPTIONS = [6, 12, 24];
export const FEATURED_CATEGORY_SLUGS = ['furniture', 'home-decoration', 'kitchen-accessories'];

export const HERO_IMAGE =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663168568542/J7sVFfjNTLPg9JV5eBSGKb/urban-nest-hero-living-room-X5hxUF6nWjxE7rC7GMDZZF.webp';
export const CATEGORY_IMAGE =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663168568542/J7sVFfjNTLPg9JV5eBSGKb/urban-nest-category-dining-4nvWKUxtFWdCskAZouznsW.webp';
export const STORY_IMAGE =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663168568542/J7sVFfjNTLPg9JV5eBSGKb/urban-nest-brand-story-studio-8ELwYARLWG6uHqX3r2g7SR.webp';
export const EDITORIAL_LOUNGE_IMAGE =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663168568542/J7sVFfjNTLPg9JV5eBSGKb/urban-nest-editorial-lounge-NThcMzgN6ZZ6S2XASMWTHh.webp';
export const BEDROOM_ALCOVE_IMAGE =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663168568542/J7sVFfjNTLPg9JV5eBSGKb/urban-nest-bedroom-alcove-apPh4AWPN3xQgvQcv6XaLD.webp';
export const DINING_DETAILS_IMAGE =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663168568542/J7sVFfjNTLPg9JV5eBSGKb/urban-nest-dining-details-kBmy5gMUVHTaAAsFKL8jsw.webp';
export const STUDIO_MATERIALS_IMAGE =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663168568542/J7sVFfjNTLPg9JV5eBSGKb/urban-nest-studio-materials-G5noHUFyPypiMGLPfsPWok.webp';

export const NAV_LINKS = [
  { label: 'Главная', href: '/' },
  { label: 'Каталог', href: '/catalog' },
  { label: 'О нас', href: '/about' },
  { label: 'Контакты', href: '/contacts' },
  { label: 'Wishlist', href: '/wishlist' },
  { label: 'Корзина', href: '/cart' },
] as const;
