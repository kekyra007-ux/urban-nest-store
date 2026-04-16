'use client';

import styled, { css } from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { toggleColorScheme } from '@/app/store/slices/uiSlice';

/* ── Track (the pill container) ── */

const Track = styled.button<{ $dark: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 52px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ $dark, theme }) =>
    $dark ? 'rgba(237, 229, 216, 0.18)' : theme.colors.border};
  background: ${({ $dark }) =>
    $dark ? 'rgba(122, 158, 137, 0.18)' : 'rgba(85, 107, 93, 0.1)'};
  cursor: pointer;
  padding: 0;
  transition: background 280ms ease, border-color 280ms ease;
  flex-shrink: 0;

  &:hover {
    background: ${({ $dark }) =>
      $dark ? 'rgba(122, 158, 137, 0.28)' : 'rgba(85, 107, 93, 0.18)'};
    border-color: ${({ $dark }) =>
      $dark ? 'rgba(237, 229, 216, 0.28)' : 'rgba(32, 26, 23, 0.24)'};
  }
`;

/* ── Thumb (the sliding circle) ── */

const Thumb = styled.span<{ $dark: boolean }>`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ $dark, theme }) => ($dark ? theme.colors.accent : theme.colors.text)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  line-height: 1;
  transition: transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1), background 280ms ease;

  ${({ $dark }) =>
    $dark &&
    css`
      transform: translateX(24px);
    `}
`;

/* ── Component ── */

interface ThemeToggleProps {
  /** Optional label shown beside the toggle */
  showLabel?: boolean;
}

const Wrapper = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
`;

const Label = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
`;

export default function ThemeToggle({ showLabel = false }: ThemeToggleProps) {
  const dispatch = useAppDispatch();
  const colorScheme = useAppSelector((state) => state.ui.colorScheme);
  const isDark = colorScheme === 'dark';

  return (
    <Wrapper>
      {showLabel && <Label>{isDark ? 'Тёмная' : 'Светлая'}</Label>}
      <Track
        $dark={isDark}
        onClick={() => dispatch(toggleColorScheme())}
        aria-label={isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
        aria-pressed={isDark}
        role="switch"
      >
        <Thumb $dark={isDark}>
          {isDark ? '☾' : '☀'}
        </Thumb>
      </Track>
    </Wrapper>
  );
}
