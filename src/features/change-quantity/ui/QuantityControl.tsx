/** Design reminder: quantity controls should remain clean, tactile, and unmistakably functional. */
'use client';

import styled from 'styled-components';
import { decreaseQuantity, increaseQuantity } from '@/app/store/slices/cartSlice';
import { useAppDispatch } from '@/app/store/hooks';

const Wrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.35rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const SmallButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.colors.surfaceAlt};
`;

export default function QuantityControl({ productId, quantity }: { productId: number; quantity: number }) {
  const dispatch = useAppDispatch();

  return (
    <Wrap>
      <SmallButton onClick={() => dispatch(decreaseQuantity(productId))}>−</SmallButton>
      <strong>{quantity}</strong>
      <SmallButton onClick={() => dispatch(increaseQuantity(productId))}>+</SmallButton>
    </Wrap>
  );
}
