/** Design reminder: related products should extend the story of the current room and mood. */
'use client';

import styled from 'styled-components';
import { Product } from '@/entities/product/model/types';
import CatalogGrid from '@/widgets/CatalogGrid';

const Wrap = styled.div`
  display: grid;
  gap: 1.5rem;
`;

export default function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <Wrap>
      <div>
        <h2>Похожие товары</h2>
        <p>Подобрали варианты в той же эстетике и категории.</p>
      </div>
      <CatalogGrid products={products} />
    </Wrap>
  );
}
