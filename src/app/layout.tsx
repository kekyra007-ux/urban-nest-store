/** Design reminder: the root layout should maintain premium consistency across every route. */
import type { Metadata } from 'next';
import Header from '@/widgets/Header';
import Footer from '@/widgets/Footer';
import Toaster from '@/widgets/Toaster';
import CartDrawer from '@/widgets/CartDrawer';
import { PageLoaderDismiss } from '@/shared/ui/PageLoader';
import { Providers } from './providers/Providers';
import StyleRegistry from './providers/StyleRegistry';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Urban Nest Store',
    template: '%s | Urban Nest Store',
  },
  description:
    'Премиальный магазин мебели, декора и текстиля. Curated collection для спокойного, продуманного дома.',
  keywords: ['мебель', 'декор', 'интерьер', 'urban nest', 'home decor', 'furniture'],
  authors: [{ name: 'Urban Nest Store' }],
  openGraph: {
    type: 'website',
    siteName: 'Urban Nest Store',
    title: 'Urban Nest Store',
    description: 'Curated collection мебели и декора для спокойного, продуманного дома.',
    locale: 'ru_RU',
    url: 'https://urbannest.store',
    images: [
      {
        url: '/images/HERO_IMAGE.webp',
        width: 1200,
        height: 630,
        alt: 'Urban Nest Store — premium home decor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Urban Nest Store',
    description: 'Curated collection мебели и декора для спокойного, продуманного дома.',
    images: ['/images/HERO_IMAGE.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        {/* Static loader — dismissed by PageLoaderDismiss after hydration */}
        <div id="__page-loader" aria-hidden="true">
          <span className="__loader-brand">Urban Nest</span>
          <div className="__loader-dots">
            <span className="__loader-dot" />
            <span className="__loader-dot" />
            <span className="__loader-dot" />
          </div>
        </div>
        {/* styled-components portal — styles injected here to avoid React 19 head conflicts */}
        <div id="__sc" />
        <StyleRegistry>
          <Providers>
            <PageLoaderDismiss />
            <Header />
            {children}
            <Footer />
            <Toaster />
            <CartDrawer />
          </Providers>
        </StyleRegistry>
      </body>
    </html>
  );
}
