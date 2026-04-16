/** Design reminder: wishlist toggles should act like refined, low-noise micro-interactions. */
'use client';

import { useCallback } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { toggleWishlist } from '@/app/store/slices/wishlistSlice';
import { addToast } from '@/app/store/slices/uiSlice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

const heartBeat = keyframes`
  0%   { transform: scale(1); }
  25%  { transform: scale(1.35); }
  50%  { transform: scale(0.92); }
  75%  { transform: scale(1.15); }
  100% { transform: scale(1); }
`;

const Toggle = styled.button<{ $active: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid ${({ $active, theme }) => ($active ? 'transparent' : theme.colors.border)};
  background: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.surface)};
  color: ${({ $active, theme }) => ($active ? theme.colors.surface : theme.colors.text)};
  font-size: 1.15rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition:
    background 220ms ease,
    color 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.soft};
    transform: scale(1.06);
  }

  &.beat {
    animation: ${css`${heartBeat} 380ms ease`};
  }
`;

export default function WishlistToggleButton({ productId }: { productId: number }) {
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) => state.wishlist.ids.includes(productId));

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(toggleWishlist(productId));
      dispatch(
        addToast({
          type: active ? 'wishlist-remove' : 'wishlist-add',
          message: active ? 'Убрано из избранного' : 'Добавлено в избранное',
        }),
      );

      // trigger CSS animation class
      const btn = e.currentTarget;
      btn.classList.remove('beat');
      // force reflow to restart animation
      void btn.offsetWidth;
      btn.classList.add('beat');
      btn.addEventListener('animationend', () => btn.classList.remove('beat'), { once: true });
    },
    [dispatch, productId, active],
  );

  return (
    <Toggle $active={active} onClick={handleClick} aria-label={active ? 'Убрать из избранного' : 'Добавить в избранное'}>
      {active ? '♥' : '♡'}
    </Toggle>
  );
}
