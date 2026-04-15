/** Design reminder: the about route should deepen the brand story without losing the product tone. */
import type { Metadata } from 'next';
import AboutView from '@/views/about/AboutView';

export const metadata: Metadata = {
  title: 'О нас',
  description: 'История бренда Urban Nest: как мы начинали, что отбираем и почему верим в осознанный дизайн для дома. Преимущества, ценности, FAQ.',
  openGraph: {
    title: 'О нас — Urban Nest Store',
    description: 'История бренда Urban Nest: curated home objects, ручной отбор, осознанное производство и 5 лет в индустрии.',
    url: 'https://urbannest.store/about',
    images: [
      {
        url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663168568542/J7sVFfjNTLPg9JV5eBSGKb/urban-nest-brand-story-studio-8ELwYARLWG6uHqX3r2g7SR.webp',
        width: 1200,
        height: 630,
        alt: 'Urban Nest Store — brand story studio',
      },
    ],
  },
};

export default function AboutPage() {
  return <AboutView />;
}
