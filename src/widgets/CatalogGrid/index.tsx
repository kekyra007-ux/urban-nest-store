/** Design reminder: catalog grids should feel airy, consistent, and easy to scan across breakpoints. */
'use client';

import styled, { css, keyframes } from 'styled-components';
import { Product } from '@/entities/product/model/types';
import ProductCard from '@/entities/product/ui/ProductCard';

const shimmer = keyframes`
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
`;

const shimmerMixin = css`
  background: linear-gradient(
    120deg,
    ${({ theme }) => theme.colors.surfaceAlt} 0%,
    ${({ theme }) => theme.colors.surface} 50%,
    ${({ theme }) => theme.colors.surfaceAlt} 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.2s infinite linear;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(1rem, 1.8vw, 1.5rem);
  align-items: stretch;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.875rem;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const SkeletonCard = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const SkeletonImage = styled.div`
  aspect-ratio: 1 / 1;
  border-radius: ${({ theme }) => theme.radii.lg};
  ${shimmerMixin}
`;

const SkeletonLine = styled.div<{ $width?: string; $height?: string }>`
  height: ${({ $height }) => $height ?? '1rem'};
  width: ${({ $width }) => $width ?? '100%'};
  border-radius: ${({ theme }) => theme.radii.sm};
  ${shimmerMixin}
`;

const SkeletonButton = styled.div`
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.pill};
  ${shimmerMixin}
`;

function ProductCardSkeleton() {
  return (
    <SkeletonCard>
      <SkeletonImage />
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        <SkeletonLine $width="40%" $height="0.75rem" />
        <SkeletonLine $width="80%" $height="1.25rem" />
        <SkeletonLine $height="0.875rem" />
        <SkeletonLine $width="70%" $height="0.875rem" />
      </div>
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <SkeletonLine $width="45%" $height="1.5rem" />
        <SkeletonButton />
      </div>
    </SkeletonCard>
  );
}

export default function CatalogGrid({
  products,
  loading = false,
}: {
  products: Product[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <Grid>
        {Array.from({ length: 8 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </Grid>
    );
  }

  return (
    <Grid>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}
