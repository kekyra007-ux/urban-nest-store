/** Design reminder: wishlist should feel like a saved interior moodboard, not a dead utility page. */
'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { selectWishlistProducts } from '@/app/store/selectors';
import { fetchProducts } from '@/app/store/slices/catalogSlice';
import CatalogGrid from '@/widgets/CatalogGrid';
import Container from '@/shared/ui/Container';
import EmptyState from '@/shared/ui/EmptyState';

const Shell = styled(Container)`
  display: grid;
  gap: 1.5rem;
  padding-block: 2rem 4rem;
`;

export default function WishlistView() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.catalog);
  const wishlistProducts = useAppSelector(selectWishlistProducts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <Shell>
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <h1>Wishlist</h1>
        <p>Локально сохранённые товары доступны из каталога и карточек товара.</p>
      </div>
      {wishlistProducts.length === 0 ? (
        <EmptyState icon="♡" title="Wishlist пока пуст" description="Сохрани несколько товаров из каталога, чтобы собрать свою подборку интерьера." href="/catalog" action="Перейти в каталог" />
      ) : (
        <CatalogGrid products={wishlistProducts} loading={status === 'loading'} />
      )}
    </Shell>
  );
}
