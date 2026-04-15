/** Design reminder: the wishlist route should feel saved, personal, and still commercial. */
import type { Metadata } from 'next';
import WishlistView from '@/views/wishlist/WishlistView';

export const metadata: Metadata = {
  title: 'Wishlist | Urban Nest Store',
  description: 'Избранные товары с локальным persistence и empty state.',
};

export default function WishlistPage() {
  return <WishlistView />;
}
