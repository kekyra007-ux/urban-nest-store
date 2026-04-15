/** Design reminder: the catalog route should feel structured, calm, and fully merchandised. */
import type { Metadata } from 'next';
import { Suspense } from 'react';
import CatalogView from '@/views/catalog/CatalogView';

export const metadata: Metadata = {
  title: 'Каталог',
  description:
    'Полный каталог мебели, декора и аксессуаров для дома с фильтрами по категориям, поиском и сортировкой.',
  openGraph: {
    title: 'Каталог — Urban Nest Store',
    description:
      'Полный каталог мебели, декора и аксессуаров для дома с фильтрами по категориям, поиском и сортировкой.',
    url: 'https://urbannest.store/catalog',
    images: [
      {
        url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663168568542/J7sVFfjNTLPg9JV5eBSGKb/urban-nest-dining-details-kBmy5gMUVHTaAAsFKL8jsw.webp',
        width: 1200,
        height: 630,
        alt: 'Urban Nest Store каталог товаров',
      },
    ],
  },
};

export default function CatalogPage() {
  return (
    <Suspense>
      <CatalogView />
    </Suspense>
  );
}
