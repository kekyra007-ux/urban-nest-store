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
  gap: 1rem;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    border-color 220ms ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadows.card};
    border-color: rgba(166, 133, 101, 0.32);
  }
`;

const VisualLink = styled(Link)`
  display: block;
`;

const ImageWrap = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  min-height: 280px;
  background: ${({ theme }) => theme.colors.surface};

  img {
    transition: transform 320ms ease;
  }

  ${Card}:hover & img {
    transform: scale(1.04);
  }
`;

const ImageShade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 36%, rgba(0, 0, 0, 0.14) 100%);
  pointer-events: none;
`;

const FloatingMeta = styled.div`
  position: absolute;
  left: 0.9rem;
  right: 0.9rem;
  bottom: 0.9rem;
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: center;
  pointer-events: none;
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0.35rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 1rem;
`;

const Meta = styled.div`
  display: grid;
  gap: 0.6rem;
  flex: 1;
`;

const Category = styled.span`
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Title = styled.h3`
  font-size: 1.2rem;
  line-height: 1.08;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`;

const BottomRow = styled.div`
  display: grid;
  gap: 0.9rem;
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
            sizes="(max-width: 768px) 100vw, 25vw"
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
          <Description>{product.description.slice(0, 96)}...</Description>
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
