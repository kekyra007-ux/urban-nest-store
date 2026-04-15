/** Design reminder: buttons should be calm but decisive, with tactile depth and premium contrast. */
'use client';

import styled, { css } from 'styled-components';

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.surface};
    box-shadow: ${({ theme }) => theme.shadows.soft};
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
  `,
};

const Button = styled.button<{ $variant?: keyof typeof variants; $full?: boolean }>`
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 0.95rem 1.4rem;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  width: ${({ $full }) => ($full ? '100%' : 'auto')};
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease, color 180ms ease;
  ${({ $variant = 'primary' }) => variants[$variant]};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.card};
  }
`;

export default Button;
