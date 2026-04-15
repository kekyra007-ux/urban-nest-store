/** Design reminder: cart entry points should feel decisive and trustworthy. */
'use client';

import { useState, useCallback } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Product } from '@/entities/product/model/types';
import { addToCart } from '@/app/store/slices/cartSlice';
import { addToast, openCartDrawer } from '@/app/store/slices/uiSlice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

const pop = keyframes`
  0%   { transform: scale(1); }
  40%  { transform: scale(0.94); }
  70%  { transform: scale(1.04); }
  100% { transform: scale(1); }
`;

const Btn = styled.button<{ $full?: boolean; $added: boolean }>`
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 0.95rem 1.4rem;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  width: ${({ $full }) => ($full ? '100%' : 'auto')};
  transition: background 260ms ease, color 260ms ease, box-shadow 180ms ease, transform 180ms ease;

  background: ${({ $added, theme }) => ($added ? theme.colors.success : theme.colors.text)};
  color: ${({ theme }) => theme.colors.surface};

  animation: ${({ $added }) => ($added ? css`${pop} 300ms ease` : 'none')};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.card};
  }

  &:disabled {
    cursor: default;
  }
`;

const ADDED_DURATION = 1600;

export default function AddToCartButton({ product, full }: { product: Product; full?: boolean }) {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);
  const inCart = useAppSelector((state) => state.cart.items.some((i) => i.id === product.id));

  const handleClick = useCallback(() => {
    dispatch(addToCart(product));
    dispatch(openCartDrawer());
    dispatch(addToast({
      type: 'cart',
      message: inCart ? 'Ещё одна единица добавлена' : 'Товар добавлен в корзину',
      description: product.title.length > 40 ? `${product.title.slice(0, 40)}…` : product.title,
    }));

    setAdded(true);
    setTimeout(() => setAdded(false), ADDED_DURATION);
  }, [dispatch, product, inCart]);

  return (
    <Btn $full={full} $added={added} onClick={handleClick} disabled={added}>
      {added ? '✓ Добавлено' : inCart ? 'Ещё раз в корзину' : 'Добавить в корзину'}
    </Btn>
  );
}
