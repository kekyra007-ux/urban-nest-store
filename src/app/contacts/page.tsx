/** Design reminder: the contacts route should keep the premium tone even in utility interactions. */
import type { Metadata } from 'next';
import ContactsView from '@/views/contacts/ContactsView';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Адрес шоурума Urban Nest, часы работы, контактная форма и соцсети. Ответим в течение рабочего дня.',
  openGraph: {
    title: 'Контакты — Urban Nest Store',
    description: 'Шоурум на Valencia Street, San Francisco. Форма обратной связи, часы работы и соцсети Urban Nest.',
    url: 'https://urbannest.store/contacts',
    images: [
      {
        url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663168568542/J7sVFfjNTLPg9JV5eBSGKb/urban-nest-studio-materials-G5noHUFyPypiMGLPfsPWok.webp',
        width: 1200,
        height: 630,
        alt: 'Urban Nest Store — studio materials',
      },
    ],
  },
};

export default function ContactsPage() {
  return <ContactsView />;
}
