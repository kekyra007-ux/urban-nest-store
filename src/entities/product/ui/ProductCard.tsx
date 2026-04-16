/** Design reminder: cards should blend commerce clarity with editorial warmth and visual depth. */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { Product } from '@/entities/product/model/types';
import { routes } from '@/shared/config/routes';
import ProductPrice from './ProductPrice';
import WishlistToggleButton from '@/features/toggle-wishlist/ui/WishlistToggleButton';
import AddToCartButton from '@/features/add-to-cart/ui/AddToCartButton';
const Card = styled.article`
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 1rem;
  min-width: 0;
  height: 100%;
  padding: 1.125rem 1.125rem 1.25rem;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition:
    transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 240ms ease,
    border-color 240ms ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.card};
    border-color: color-mix(in srgb, ${({ theme }) => theme.colors.accent} 22%, transparent);
  }

  @media (max-width: 640px) {
    padding: 0.95rem 0.95rem 1.05rem;
    border-radius: 20px;
  }
`;

const VisualLink = styled(Link)`
  display: block;
  min-width: 0;
`;

const ImageWrap = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  aspect-ratio: 1 / 1;
  background: ${({ theme }) => theme.colors.surfaceAlt};

  img {
    transition: transform 380ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  ${Card}:hover & img {
    transform: scale(1.04);
  }

  @media (max-width: 640px) {
    border-radius: 14px;
  }
`;

const ImageShade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.12) 100%);
  pointer-events: none;
`;

const FloatingMeta = styled.div`
  position: absolute;
  left: 0.8rem;
  right: 0.8rem;
  bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
  gap: 0.625rem;
  align-items: center;
  pointer-events: none;
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  max-width: 100%;
  padding: 0.35rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.surface} 90%, transparent);
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: 0.76rem;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  @media (max-width: 640px) {
    min-height: 1.85rem;
    padding: 0.32rem 0.68rem;
    font-size: 0.72rem;
  }
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 0.875rem;
`;

const Meta = styled.div`
  display: grid;
  gap: 0.45rem;
  min-width: 0;
`;

const Category = styled.span`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${({ theme }) => theme.colors.accent};
`;

const Title = styled.h3`
  font-size: 1.06rem;
  line-height: 1.22;
  letter-spacing: -0.015em;
  overflow-wrap: anywhere;

  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

const Description = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.62;

  @media (max-width: 640px) {
    -webkit-line-clamp: 3;
    font-size: 0.86rem;
  }
`;

const BottomRow = styled.div`
  display: grid;
  gap: 0.875rem;
  margin-top: auto;
`;

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      <VisualLink href={routes.product(product.id)}>
        <ImageWrap>
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 520px) 100vw, (max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
          <ImageShade />
          <FloatingMeta>
            <Pill>{product.category.replace('-', ' ')}</Pill>
            <Pill>★ {product.rating.toFixed(1)}</Pill>
          </FloatingMeta>
        </ImageWrap>
      </VisualLink>

      <TopRow>
        <Meta>
          <Category>Curated object</Category>
          <Link href={routes.product(product.id)}>
            <Title>{product.title}</Title>
          </Link>
          <Description>{product.description}</Description>
        </Meta>
        <WishlistToggleButton productId={product.id} />
      </TopRow>

      <BottomRow>
        <ProductPrice price={product.price} discountPercentage={product.discountPercentage} />
        <AddToCartButton product={product} full />
      </BottomRow>
    </Card>
  );
}
