/** Design reminder: badges should read like curated labels, not noisy UI stickers. */
'use client';

import styled from 'styled-components';

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.45rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: 0.82rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

export default Badge;
