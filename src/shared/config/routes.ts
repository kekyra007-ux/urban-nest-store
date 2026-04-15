/** Design reminder: navigation should feel effortless and spacious, with clear escape routes from every page. */
export const routes = {
  home: '/',
  catalog: '/catalog',
  about: '/about',
  contacts: '/contacts',
  wishlist: '/wishlist',
  cart: '/cart',
  checkout: '/checkout',
  product: (id: number | string) => `/product/${id}`,
};
