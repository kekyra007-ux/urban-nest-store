/** Design reminder: empty states should still feel branded, helpful, and intentional. */
'use client';

import Link from 'next/link';
import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
  display: grid;
  gap: 1.25rem;
  place-items: center;
  text-align: center;
  padding: clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem);
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const IconWrap = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accentSoft};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
`;

const TextBlock = styled.div`
  display: grid;
  gap: 0.6rem;
  max-width: 36rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
`;

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  href?: string;
  action?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export default function EmptyState({ title, description, icon, href, action, onRetry, retryLabel = 'Try again' }: EmptyStateProps) {
  return (
    <Wrapper>
      {icon ? <IconWrap>{icon}</IconWrap> : null}
      <TextBlock>
        <h3>{title}</h3>
        <p>{description}</p>
      </TextBlock>
      <Actions>
        {onRetry ? (
          <Button onClick={onRetry}>{retryLabel}</Button>
        ) : null}
        {href && action ? (
          <Link href={href}>
            <Button $variant={onRetry ? 'secondary' : 'primary'} as="span">{action}</Button>
          </Link>
        ) : null}
      </Actions>
    </Wrapper>
  );
}
