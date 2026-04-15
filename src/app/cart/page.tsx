/** Design reminder: the cart route should translate reducers and selectors into a polished shopping flow. */
import type { Metadata } from 'next';
import CartView from '@/views/cart/CartView';

export const metadata: Metadata = {
  title: 'Корзина | Urban Nest Store',
  description: 'Корзина с quantity controls, totals и persisted state.',
};

export default function CartPage() {
  return <CartView />;
}
