/** Design reminder: toasts should feel like a calm whisper, not a system alert. */
'use client';

import { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { removeToast, Toast, ToastType } from '@/app/store/slices/uiSlice';

/* ── Animations ── */

const slideIn = keyframes`
  from {
    transform: translateX(calc(100% + 1.5rem));
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(calc(100% + 1.5rem)); }
`;

/* ── Types config ── */

const TOAST_CONFIG: Record<ToastType, { icon: string; color: string }> = {
  cart:             { icon: '🛒', color: '#527a5f' },
  'wishlist-add':   { icon: '♥', color: '#b85b4f' },
  'wishlist-remove':{ icon: '♡', color: '#6d6259' },
  remove:           { icon: '✕', color: '#6d6259' },
  success:          { icon: '✓', color: '#527a5f' },
  error:            { icon: '⚠', color: '#b85b4f' },
};

const TOAST_DURATION = 3500;

/* ── Styles ── */

const Portal = styled.div`
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 9999;
  display: grid;
  gap: 0.6rem;
  pointer-events: none;

  @media (max-width: 480px) {
    top: auto;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
  }
`;

const ToastItem = styled.div<{ $type: ToastType; $exiting: boolean }>`
  pointer-events: all;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  min-width: 280px;
  max-width: 360px;
  padding: 0.9rem 1rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.lifted};
  backdrop-filter: blur(12px);
  animation: ${({ $exiting }) =>
    $exiting
      ? css`${fadeOut} 280ms ease forwards`
      : css`${slideIn} 280ms cubic-bezier(0.22, 1, 0.36, 1) forwards`};

  @media (max-width: 480px) {
    max-width: 100%;
    min-width: unset;
  }
`;

const IconWrap = styled.div<{ $color: string }>`
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ $color }) => `${$color}18`};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const Body = styled.div`
  flex: 1;
  display: grid;
  gap: 0.15rem;
`;

const Message = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
`;

const Description = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.4;
`;

const CloseBtn = styled.button`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;
  margin-top: 0.1rem;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  border-radius: 0 0 ${({ theme }) => theme.radii.lg} ${({ theme }) => theme.radii.lg};
  background: currentColor;
  animation: shrink ${TOAST_DURATION}ms linear forwards;

  @keyframes shrink {
    from { width: 100%; }
    to   { width: 0%; }
  }
`;

/* ── Single toast item ── */

function ToastEntry({ toast }: { toast: Toast }) {
  const dispatch = useAppDispatch();
  const config = TOAST_CONFIG[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(toast.id));
    }, TOAST_DURATION);
    return () => clearTimeout(timer);
  }, [dispatch, toast.id]);

  return (
    <ToastItem $type={toast.type} $exiting={false} style={{ position: 'relative', overflow: 'hidden' }}>
      <IconWrap $color={config.color}>{config.icon}</IconWrap>
      <Body>
        <Message>{toast.message}</Message>
        {toast.description ? <Description>{toast.description}</Description> : null}
      </Body>
      <CloseBtn onClick={() => dispatch(removeToast(toast.id))} aria-label="Закрыть">✕</CloseBtn>
      <ProgressBar style={{ color: config.color }} />
    </ToastItem>
  );
}

/* ── Toaster root ── */

export default function Toaster() {
  const toasts = useAppSelector((state) => state.ui.toasts);

  if (!toasts.length) return null;

  return (
    <Portal>
      {toasts.map((toast) => (
        <ToastEntry key={toast.id} toast={toast} />
      ))}
    </Portal>
  );
}
