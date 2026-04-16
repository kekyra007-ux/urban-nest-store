/** Design reminder: cart summary should present totals with calm confidence and strong hierarchy. */
'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { routes } from '@/shared/config/routes';
import { formatPrice } from '@/shared/lib/formatPrice';
import Button from '@/shared/ui/Button';

const Card = styled.aside`
  display: grid;
  gap: 0;
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  position: sticky;
  top: 88px;
  align-self: start;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1.25rem;
`;

const Section = styled.div`
  display: grid;
  gap: 0.6rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;

  span {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  strong {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text};
    white-space: nowrap;
  }
`;

const TotalRow = styled(Row)`
  span {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  strong {
    font-size: 1.2rem;
    font-family: ${({ theme }) => theme.fonts.display};
    letter-spacing: -0.02em;
  }
`;

const Ctas = styled.div`
  display: grid;
  gap: 0.6rem;
  margin-top: 1.25rem;
`;

interface CartSummaryProps {
  subtotal: number;
  delivery: number;
  total: number;
  totalItems: number;
  totalQuantity: number;
  onClear: () => void;
}

export default function CartSummary({
  subtotal,
  delivery,
  total,
  totalItems,
  totalQuantity,
  onClear,
}: CartSummaryProps) {
  return (
    <Card>
      <Title>Итого по заказу</Title>

      <Section>
        <Row>
          <span>Позиций</span>
          <strong>{totalItems}</strong>
        </Row>
        <Row>
          <span>Товаров всего</span>
          <strong>{totalQuantity}</strong>
        </Row>
      </Section>

      <Section>
        <Row>
          <span>Subtotal</span>
          <strong>{formatPrice(subtotal)}</strong>
        </Row>
        <Row>
          <span>Доставка</span>
          <strong>{formatPrice(delivery)}</strong>
        </Row>
      </Section>

      <Section>
        <TotalRow>
          <span>Всего</span>
          <strong>{formatPrice(total)}</strong>
        </TotalRow>
      </Section>

      <Ctas>
        <Link href={routes.checkout}>
          <Button as="span" $full>
            Перейти к оформлению
          </Button>
        </Link>
        <Button $variant="ghost" $full onClick={onClear}>
          Очистить корзину
        </Button>
      </Ctas>
    </Card>
  );
}
