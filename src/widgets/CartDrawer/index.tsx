/** Design reminder: the cart drawer should feel like a premium sidebar preview — fast, trustworthy, conversion-friendly. */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { closeCartDrawer } from '@/app/store/slices/uiSlice';
import { removeFromCart } from '@/app/store/slices/cartSlice';
import { selectCartTotals } from '@/entities/cart/model/selectors';
import { formatPrice } from '@/shared/lib/formatPrice';
import { routes } from '@/shared/config/routes';

const AUTO_CLOSE_MS = 6000;

/* ── Animations ── */

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

/* ── Overlay ── */

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 800;
  background: ${({ theme }) => theme.colors.overlay};
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  animation: ${({ $open }) =>
    $open
      ? css`${fadeIn} 260ms ease forwards`
      : 'none'};
`;

/* ── Panel ── */

const Panel = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 801;
  width: min(420px, 100vw);
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: -24px 0 80px rgba(53, 42, 35, 0.18);
  transform: ${({ $open }) => ($open ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
  animation: ${({ $open }) =>
    $open
      ? css`${slideIn} 320ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
      : 'none'};
  pointer-events: ${({ $open }) => ($open ? 'all' : 'none')};
`;

/* ── Header ── */

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

const DrawerTitle = styled.h2`
  font-size: 1.15rem;
`;

const CartBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.surface};
  font-size: 0.75rem;
  font-weight: 700;
`;

const CloseBtn = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 250, 244, 0.9);
  border-radius: 50%;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.text};
  }
`;

/* ── Item list ── */

const ItemList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem;
  display: grid;
  gap: 0.75rem;
  align-content: start;
`;

const EmptyMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  height: 100%;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
  text-align: center;
  padding: 2rem;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 72px 1fr auto;
  gap: 0.75rem;
  align-items: start;
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(246, 239, 230, 0.6);
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ItemImage = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: ${({ theme }) => theme.radii.sm};
  overflow: hidden;
  flex-shrink: 0;
`;

const ItemMeta = styled.div`
  display: grid;
  gap: 0.2rem;
`;

const ItemTitle = styled.span`
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.text};
`;

const ItemDetail = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ItemRemove = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0.15rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: color 160ms ease;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

/* ── Footer ── */

const DrawerFooter = styled.div`
  padding: 1.25rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  gap: 0.75rem;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.surface};
`;

const Totals = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;

  strong {
    font-size: 1.1rem;
  }
`;

const CtaLink = styled(Link)`
  display: block;
  text-align: center;
  padding: 0.95rem 1.4rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.surface};
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 180ms ease, box-shadow 180ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.card};
  }
`;

const ContinueBtn = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.text};
  }
`;

/* ── Progress bar ── */

const AutoCloseBar = styled.div`
  height: 2px;
  background: ${({ theme }) => theme.colors.accentSoft};
  overflow: hidden;
`;

const AutoCloseProgress = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.accent};
  animation: drain ${AUTO_CLOSE_MS}ms linear forwards;

  @keyframes drain {
    from { width: 100%; }
    to   { width: 0%; }
  }
`;

/* ── Component ── */

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.ui.cartDrawerOpen);
  const items = useAppSelector((state) => state.cart.items);
  const totals = useAppSelector(selectCartTotals);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => dispatch(closeCartDrawer()), AUTO_CLOSE_MS);
    return () => clearTimeout(timer);
  }, [open, dispatch]);

  // lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <Overlay $open={open} onClick={() => dispatch(closeCartDrawer())} />
      <Panel $open={open} role="dialog" aria-label="Корзина" aria-modal="true">
        {open && <AutoCloseBar><AutoCloseProgress /></AutoCloseBar>}
        <DrawerHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <DrawerTitle>Корзина</DrawerTitle>
            {items.length > 0 && <CartBadge>{totals.totalQuantity}</CartBadge>}
          </div>
          <CloseBtn onClick={() => dispatch(closeCartDrawer())} aria-label="Закрыть">✕</CloseBtn>
        </DrawerHeader>

        <ItemList>
          {items.length === 0 ? (
            <EmptyMsg>
              <span style={{ fontSize: '2rem' }}>🛒</span>
              <span>Корзина пуста</span>
            </EmptyMsg>
          ) : (
            items.map((item) => (
              <Item key={item.id}>
                <Link href={routes.product(item.id)} onClick={() => dispatch(closeCartDrawer())}>
                  <ItemImage>
                    <Image src={item.thumbnail} alt={item.title} fill style={{ objectFit: 'cover' }} sizes="72px" />
                  </ItemImage>
                </Link>
                <ItemMeta>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemDetail>{formatPrice(item.price)} × {item.quantity}</ItemDetail>
                  <ItemDetail style={{ fontWeight: 600, color: 'inherit' }}>{formatPrice(item.price * item.quantity)}</ItemDetail>
                </ItemMeta>
                <ItemRemove
                  onClick={() => dispatch(removeFromCart(item.id))}
                  aria-label={`Удалить ${item.title}`}
                >
                  ✕
                </ItemRemove>
              </Item>
            ))
          )}
        </ItemList>

        <DrawerFooter>
          {items.length > 0 ? (
            <>
              <Totals>
                <span>Итого ({totals.totalQuantity} тов.)</span>
                <strong>{formatPrice(totals.subtotal)}</strong>
              </Totals>
              <CtaLink href={routes.cart} onClick={() => dispatch(closeCartDrawer())}>
                Оформить заказ
              </CtaLink>
              <ContinueBtn onClick={() => dispatch(closeCartDrawer())}>
                Продолжить покупки
              </ContinueBtn>
            </>
          ) : (
            <CtaLink href={routes.catalog} onClick={() => dispatch(closeCartDrawer())}>
              Перейти в каталог
            </CtaLink>
          )}
        </DrawerFooter>
      </Panel>
    </>
  );
}
