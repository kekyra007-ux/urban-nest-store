/** Design reminder: checkout routing should feel like a calm continuation of the cart flow, not a detached utility screen. */
import type { Metadata } from 'next';
import CheckoutView from '@/views/checkout/CheckoutView';

export const metadata: Metadata = {
  title: 'Оформление заказа | Urban Nest Store',
  description: 'Checkout-форма с контактной информацией, адресом доставки и валидацией полей.',
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
