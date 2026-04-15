/** Design reminder: the hero must establish warm Scandinavian calm, premium space, and strong narrative focus. */
'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { HERO_IMAGE } from '@/shared/config/constants';
import { routes } from '@/shared/config/routes';
import Button from '@/shared/ui/Button';
import Container from '@/shared/ui/Container';
import Badge from '@/shared/ui/Badge';

const Section = styled.section`
  padding-block: clamp(2.5rem, 7vw, 5.5rem) 3rem;
`;

const Frame = styled(Container)`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: end;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Content = styled.div`
  display: grid;
  gap: 1.5rem;
  align-content: start;
`;

const Eyebrow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: clamp(3.25rem, 10vw, 6rem);
  line-height: 0.94;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Visual = styled.div`
  position: relative;
  min-height: 600px;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lifted};

  @media (max-width: 960px) {
    min-height: 420px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(246, 240, 231, 0.02) 0%, rgba(32, 26, 23, 0.08) 100%);
`;

export default function Hero() {
  return (
    <Section>
      <Frame>
        <Content>
          <Eyebrow>
            <Badge>Curated living</Badge>
            <Badge>SS26 interior edit</Badge>
          </Eyebrow>
          <Title>Дом, который ощущается спокойнее с первого взгляда.</Title>
          <p>
            Urban Nest Store — это цифровой showroom с мебелью, декором и мягкими повседневными
            деталями. Проект демонстрирует не только визуальную подачу, но и зрелую
            frontend-архитектуру с Redux Toolkit, динамическими маршрутами, поиском, фильтрами и
            local persistence.
          </p>
          <Actions>
            <Link href={routes.catalog}>
              <Button as="span">Открыть каталог</Button>
            </Link>
            <Link href={routes.about}>
              <Button as="span" $variant="secondary">
                Узнать о бренде
              </Button>
            </Link>
          </Actions>
        </Content>
        <Visual>
          <Image
            src={HERO_IMAGE}
            alt="Urban Nest Hero"
            fill
            priority
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 960px) 100vw, 50vw"
          />
          <Overlay />
        </Visual>
      </Frame>
    </Section>
  );
}
