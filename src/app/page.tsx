/** Design reminder: the landing route should open with atmosphere, clarity, and architectural confidence. */
import type { Metadata } from 'next';
import HomeView from '@/views/home/HomeView';

export const metadata: Metadata = {
  title: 'Urban Nest Store',
  description:
    'Curated collection мебели, декора и текстиля для спокойного, продуманного дома. Открой каталог и найди то, что сделает твоё пространство лучше.',
  openGraph: {
    title: 'Urban Nest Store — Curated Home Collection',
    description:
      'Мебель, декор и текстиль с ручным отбором. Каждый предмет — за качество, лаконичность и долговечность.',
    url: 'https://urbannest.store',
    images: [
      {
        url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663168568542/J7sVFfjNTLPg9JV5eBSGKb/urban-nest-hero-living-room-X5hxUF6nWjxE7rC7GMDZZF.webp',
        width: 1200,
        height: 630,
        alt: 'Urban Nest Store — warm living room',
      },
    ],
  },
};

export default function HomePage() {
  return <HomeView />;
}
