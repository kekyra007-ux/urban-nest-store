/** Design reminder: pricing should read clearly with understated emphasis. */
'use client';

import styled from 'styled-components';
import { formatPrice } from '@/shared/lib/formatPrice';

const Price = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
`;

const Current = styled.strong`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: -0.01em;
`;

const Discount = styled.span`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default function ProductPrice({ price, discountPercentage }: { price: number; discountPercentage: number }) {
  const initialPrice = price / (1 - discountPercentage / 100);

  return (
    <Price>
      <Current>{formatPrice(price)}</Current>
      <Discount>{Math.round(discountPercentage)}% off · {formatPrice(initialPrice)}</Discount>
    </Price>
  );
}
