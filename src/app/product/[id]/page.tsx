/** Design reminder: the dynamic product route should support storytelling, detail, and discovery. */
import type { Metadata } from 'next';
import ProductDetailsView from '@/views/product/ProductDetailsView';

export const metadata: Metadata = {
  title: 'Карточка товара | Urban Nest Store',
  description: 'Динамическая карточка товара с галереей, related products и add-to-cart flow.',
};

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetailsView id={Number(id)} />;
}
