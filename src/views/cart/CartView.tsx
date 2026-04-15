/** Design reminder: the cart page should translate stateful logic into a clean, trustworthy checkout prelude. */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { clearCart, removeFromCart } from '@/app/store/slices/cartSlice';
import { addToast } from '@/app/store/slices/uiSlice';
import QuantityControl from '@/features/change-quantity/ui/QuantityControl';
import { selectCartTotals } from '@/entities/cart/model/selectors';
import CartSummary from '@/widgets/CartSummary';
import Container from '@/shared/ui/Container';
import EmptyState from '@/shared/ui/EmptyState';
import { formatPrice } from '@/shared/lib/formatPrice';
import { routes } from '@/shared/config/routes';

const Shell = styled(Container)`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: minmax(0, 1.2fr) 340px;
  padding-block: 2rem 4rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const List = styled.div`
  display: grid;
  gap: 1rem;
`;

const Card = styled.article`
  display: grid;
  grid-template-columns: 140px 1fr auto;
  gap: 1rem;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(255, 250, 244, 0.92);
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Visual = styled.div`
  position: relative;
  min-height: 140px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.md};
`;

const Meta = styled.div`
  display: grid;
  gap: 0.25rem;
`;

const Muted = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const RemoveButton = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.danger};
`;

export default function CartView() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const totals = useAppSelector(selectCartTotals);

  if (!items.length) {
    return (
      <Container style={{ paddingBlock: '3rem' }}>
        <EmptyState
          icon="🛒"
          title="Корзина пуста"
          description="Добавь товары из каталога или карточки товара — они сохранятся даже после перезагрузки страницы."
          href="/catalog"
          action="Перейти в каталог"
        />
      </Container>
    );
  }

  return (
    <Shell>
      <List>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <h1>Корзина</h1>
          <p>
            Здесь собрана синхронная cart-логика магазина: добавление товаров, управление
            количеством, удаление позиций и мгновенный пересчёт totals через централизованные
            selectors.
          </p>
        </div>
        {items.map((item) => (
          <Card key={item.id}>
            <Link href={routes.product(item.id)}>
              <Visual>
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="140px"
                />
              </Visual>
            </Link>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <Meta>
                <Muted>{item.category}</Muted>
                <h3>{item.title}</h3>
                {item.brand ? <span>{item.brand}</span> : null}
              </Meta>
              <p>{formatPrice(item.price)} за единицу</p>
              <QuantityControl productId={item.id} quantity={item.quantity} />
            </div>
            <div
              style={{
                display: 'grid',
                gap: '0.75rem',
                justifyItems: 'end',
                alignContent: 'space-between',
              }}
            >
              <strong>{formatPrice(item.price * item.quantity)}</strong>
              <RemoveButton
                onClick={() => {
                  dispatch(removeFromCart(item.id));
                  dispatch(
                    addToast({
                      type: 'remove',
                      message: 'Товар удалён из корзины',
                      description:
                        item.title.length > 40 ? `${item.title.slice(0, 40)}…` : item.title,
                    }),
                  );
                }}
              >
                Удалить
              </RemoveButton>
            </div>
          </Card>
        ))}
      </List>
      <CartSummary
        subtotal={totals.subtotal}
        delivery={totals.delivery}
        total={totals.total}
        totalItems={totals.totalItems}
        totalQuantity={totals.totalQuantity}
        onClear={() => {
          dispatch(clearCart());
          dispatch(addToast({ type: 'remove', message: 'Корзина очищена' }));
        }}
      />
    </Shell>
  );
}
