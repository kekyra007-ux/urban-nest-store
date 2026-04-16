/** Design reminder: product browsing should feel curated and configurable, not rigid. */
export const API_BASE_URL = 'https://dummyjson.com';
export const DEFAULT_PAGE_SIZE = 12;
export const PAGE_SIZE_OPTIONS = [6, 12, 24];
export const FEATURED_CATEGORY_SLUGS = ['furniture', 'home-decoration', 'kitchen-accessories'];

export const HERO_IMAGE = '/images/HERO_IMAGE.webp';
export const CATEGORY_IMAGE = '/images/CATEGORY_IMAG.webp';
export const STORY_IMAGE = '/images/STORY_IMAGE.webp';
export const EDITORIAL_LOUNGE_IMAGE = '/images/EDITORIAL_LOUNGE_IMAGE.webp';
export const BEDROOM_ALCOVE_IMAGE = '/images/BEDROOM_ALCOVE_IMAGE.webp';
export const DINING_DETAILS_IMAGE = '/images/DINING_DETAILS_IMAGE.webp';
export const STUDIO_MATERIALS_IMAGE = '/images/STUDIO_MATERIALS_IMAGE.webp';

export const NAV_LINKS = [
  { label: 'Главная', href: '/' },
  { label: 'Каталог', href: '/catalog' },
  { label: 'О нас', href: '/about' },
  { label: 'Контакты', href: '/contacts' },
  { label: 'Wishlist', href: '/wishlist' },
  { label: 'Корзина', href: '/cart' },
] as const;
