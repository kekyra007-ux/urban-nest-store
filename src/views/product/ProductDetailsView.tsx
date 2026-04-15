/** Design reminder: the product page should feel immersive, spacious, and conversion-friendly. */
'use client';

import { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { clearCurrentProduct, fetchProductById, fetchRelatedProducts } from '@/app/store/slices/productSlice';
import AddToCartButton from '@/features/add-to-cart/ui/AddToCartButton';
import WishlistToggleButton from '@/features/toggle-wishlist/ui/WishlistToggleButton';
import ProductGallery from '@/entities/product/ui/ProductGallery';
import ProductPrice from '@/entities/product/ui/ProductPrice';
import RelatedProducts from '@/widgets/RelatedProducts';
import Container from '@/shared/ui/Container';
import EmptyState from '@/shared/ui/EmptyState';
import Badge from '@/shared/ui/Badge';

const Shell = styled(Container)`
  display: grid;
  gap: 2rem;
  padding-block: 2rem 4rem;
`;

const Hero = styled.div`
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Content = styled.div`
  display: grid;
  gap: 1.2rem;
  align-content: start;
  padding: clamp(1.35rem, 2vw, 2rem);
  border-radius: ${({ theme }) => theme.radii.xl};
  background: linear-gradient(180deg, rgba(255, 250, 244, 0.95) 0%, rgba(246, 239, 230, 0.85) 100%);
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const Intro = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const SupportingText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 0.25rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 0.4rem;
`;

const InfoCard = styled.div`
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(255, 251, 246, 0.92);
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  strong {
    display: block;
    margin-bottom: 0.35rem;
  }

  p,
  span {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const Reviews = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

/* ── Skeleton ── */

const shimmer = keyframes`
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
`;

const shimmerMixin = css`
  background: linear-gradient(120deg, rgba(255,255,255,0.35), rgba(235,228,216,0.95), rgba(255,255,255,0.35));
  background-size: 200% 100%;
  animation: ${shimmer} 1.2s infinite linear;
`;

const SkeletonBase = styled.div`
  border-radius: ${({ theme }) => theme.radii.sm};
  ${shimmerMixin}
`;

const SkeletonGallery = styled(SkeletonBase)`
  min-height: 480px;
  border-radius: ${({ theme }) => theme.radii.xl};
`;

const SkeletonContent = styled.div`
  display: grid;
  gap: 1.2rem;
  align-content: start;
  padding: clamp(1.35rem, 2vw, 2rem);
  border-radius: ${({ theme }) => theme.radii.xl};
  background: rgba(255, 250, 244, 0.6);
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const SkeletonLine = styled(SkeletonBase)<{ $width?: string; $height?: string }>`
  height: ${({ $height }) => $height ?? '1rem'};
  width: ${({ $width }) => $width ?? '100%'};
`;

const SkeletonCard = styled(SkeletonBase)`
  height: 100px;
  border-radius: ${({ theme }) => theme.radii.lg};
`;

function ProductDetailsSkeleton() {
  return (
    <Shell>
      <Hero>
        <SkeletonGallery />
        <SkeletonContent>
          <SkeletonLine $width="35%" $height="1.5rem" />
          <SkeletonLine $width="75%" $height="2.5rem" />
          <SkeletonLine $width="100%" $height="1rem" />
          <SkeletonLine $width="85%" $height="1rem" />
          <SkeletonLine $width="40%" $height="2rem" />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <SkeletonLine $width="55%" $height="52px" />
            <SkeletonLine $width="52px" $height="52px" />
          </div>
          <InfoGrid>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </InfoGrid>
        </SkeletonContent>
      </Hero>
    </Shell>
  );
}

export default function ProductDetailsView({ id }: { id: number }) {
  const dispatch = useAppDispatch();
  const { current, related, status, relatedStatus, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (current) {
      dispatch(fetchRelatedProducts({ category: current.category, excludeId: current.id }));
    }
  }, [dispatch, current]);

  if (status === 'failed') {
    return (
      <Container style={{ paddingBlock: '3rem' }}>
        <EmptyState
          icon="⚠️"
          title="Не удалось загрузить товар"
          description={error ?? 'Что-то пошло не так. Попробуй ещё раз или вернись в каталог.'}
          onRetry={() => dispatch(fetchProductById(id))}
          retryLabel="Попробовать снова"
          href="/catalog"
          action="Вернуться в каталог"
        />
      </Container>
    );
  }

  if (status === 'loading' || !current) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <Shell>
      <Hero>
        <ProductGallery images={current.images} title={current.title} />
        <Content>
          <Intro>
            <Badge>{current.category.replace('-', ' ')}</Badge>
            <h1>{current.title}</h1>
            <SupportingText>{current.description}</SupportingText>
          </Intro>
          <ProductPrice price={current.price} discountPercentage={current.discountPercentage} />
          <Actions>
            <AddToCartButton product={current} />
            <WishlistToggleButton productId={current.id} />
          </Actions>
          <InfoGrid>
            <InfoCard><strong>Рейтинг</strong><p>{current.rating} / 5</p></InfoCard>
            <InfoCard><strong>Наличие</strong><p>{current.availabilityStatus ?? `Stock: ${current.stock}`}</p></InfoCard>
            <InfoCard><strong>Доставка</strong><p>{current.shippingInformation ?? 'Доставка 3–7 дней'}</p></InfoCard>
            <InfoCard><strong>Гарантия</strong><p>{current.warrantyInformation ?? '1 year warranty'}</p></InfoCard>
          </InfoGrid>
        </Content>
      </Hero>
      <div style={{ display: 'grid', gap: '1rem' }}>
        <h2>Отзывы</h2>
        <Reviews>
          {(current.reviews ?? []).slice(0, 3).map((review) => (
            <InfoCard key={`${review.reviewerEmail}-${review.date}`}>
              <strong>{review.reviewerName}</strong>
              <p>{review.comment}</p>
              <span>Рейтинг: {review.rating}/5</span>
            </InfoCard>
          ))}
        </Reviews>
      </div>
      {relatedStatus !== 'failed' && related.length > 0 ? <RelatedProducts products={related} /> : null}
    </Shell>
  );
}
