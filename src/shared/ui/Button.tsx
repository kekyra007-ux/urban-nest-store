'use client';

import styled, { css } from 'styled-components';

const base = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};

  min-height: 52px;
  padding: 0.9rem 1.35rem;

  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: 0.01em;
  text-align: center;
  text-wrap: balance;

  width: ${({ $full }: any) => ($full ? '100%' : 'auto')};
  max-width: 100%;

  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  transition:
    background 220ms ease,
    color 220ms ease,
    box-shadow 220ms ease,
    border-color 220ms ease,
    opacity 160ms ease;

  cursor: pointer;
  appearance: none;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 3px color-mix(in srgb, ${({ theme }) => theme.colors.surface} 70%, transparent),
      0 0 0 5px color-mix(in srgb, ${({ theme }) => theme.colors.text} 18%, transparent);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    pointer-events: none;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: none;
    }
  }

  @media (max-width: 640px) {
    min-height: 48px;
    padding: 0.82rem 1.05rem;
    font-size: 0.92rem;
    line-height: 1.08;
  }

  @media (max-width: 420px) {
    min-height: 46px;
    padding: 0.78rem 0.95rem;
    font-size: 0.9rem;
    border-radius: 999px;
  }
`;

const primary = css`
  background: color-mix(in srgb, ${({ theme }) => theme.colors.text} 92%, transparent);
  color: ${({ theme }) => theme.colors.surface};

  box-shadow:
    0 6px 18px color-mix(in srgb, ${({ theme }) => theme.colors.text} 20%, transparent),
    inset 0 1px 0 color-mix(in srgb, ${({ theme }) => theme.colors.surface} 20%, transparent);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: color-mix(in srgb, ${({ theme }) => theme.colors.text} 85%, transparent);
      box-shadow:
        0 10px 26px color-mix(in srgb, ${({ theme }) => theme.colors.text} 24%, transparent),
        inset 0 1px 0 color-mix(in srgb, ${({ theme }) => theme.colors.surface} 28%, transparent);
    }
  }

  &:active {
    opacity: 0.92;
    box-shadow:
      0 4px 12px color-mix(in srgb, ${({ theme }) => theme.colors.text} 20%, transparent),
      inset 0 1px 0 color-mix(in srgb, ${({ theme }) => theme.colors.surface} 18%, transparent);
  }
`;

const secondary = css`
  background: color-mix(in srgb, ${({ theme }) => theme.colors.surface} 88%, transparent);
  color: ${({ theme }) => theme.colors.text};

  border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.text} 10%, transparent);

  box-shadow:
    0 4px 14px color-mix(in srgb, ${({ theme }) => theme.colors.text} 6%, transparent),
    inset 0 1px 0 color-mix(in srgb, ${({ theme }) => theme.colors.surface} 80%, transparent);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: color-mix(in srgb, ${({ theme }) => theme.colors.surface} 94%, transparent);
      border-color: color-mix(in srgb, ${({ theme }) => theme.colors.text} 18%, transparent);
      box-shadow:
        0 8px 22px color-mix(in srgb, ${({ theme }) => theme.colors.text} 8%, transparent),
        inset 0 1px 0 color-mix(in srgb, ${({ theme }) => theme.colors.surface} 88%, transparent);
    }
  }

  &:active {
    opacity: 0.92;
  }
`;

const ghost = css`
  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.text} 12%, transparent);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: color-mix(in srgb, ${({ theme }) => theme.colors.surface} 60%, transparent);
      border-color: color-mix(in srgb, ${({ theme }) => theme.colors.text} 20%, transparent);
    }
  }

  &:active {
    opacity: 0.92;
  }
`;

const variants = {
  primary,
  secondary,
  ghost,
};

const Button = styled.button<{
  $variant?: keyof typeof variants;
  $full?: boolean;
}>`
  ${base}
  ${({ $variant = 'primary' }) => variants[$variant]};
`;

export default Button;
