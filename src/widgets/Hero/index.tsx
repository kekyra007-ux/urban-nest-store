'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { HERO_IMAGE } from '@/shared/config/constants';
import { routes } from '@/shared/config/routes';
import Button from '@/shared/ui/Button';
import Badge from '@/shared/ui/Badge';

/* ── Layout ──────────────────────────────────────────────────────────────── */

const Section = styled.section`
  width: 100%;
  overflow-x: hidden;
`;

const Stage = styled.div`
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);

  min-height: clamp(640px, 54vw, 900px);

  @media (max-width: 960px) {
    min-height: clamp(520px, 68vw, 720px);
  }

  @media (max-width: 640px) {
    width: 100%;
    margin-left: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }
`;

/* ── Image ───────────────────────────────────────────────────────────────── */

const ImageWrap = styled.div`
  position: absolute;
  inset: 0;

  @media (max-width: 640px) {
    position: relative;
    flex: 0 0 auto;
    height: clamp(260px, 72vw, 380px);
    width: 100%;
  }
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  background:
    linear-gradient(
      100deg,
      color-mix(in srgb, ${({ theme }) => theme.colors.surface} 58%, transparent) 0%,
      color-mix(in srgb, ${({ theme }) => theme.colors.surface} 22%, transparent) 36%,
      transparent 64%
    ),
    linear-gradient(
      180deg,
      transparent 48%,
      color-mix(in srgb, ${({ theme }) => theme.colors.background} 32%, transparent) 100%
    );

  @media (max-width: 960px) {
    background: linear-gradient(
      180deg,
      transparent 28%,
      color-mix(in srgb, ${({ theme }) => theme.colors.background} 72%, transparent) 74%,
      ${({ theme }) => theme.colors.background} 100%
    );
  }

  @media (max-width: 640px) {
    background: linear-gradient(
      180deg,
      transparent 52%,
      color-mix(in srgb, ${({ theme }) => theme.colors.background} 65%, transparent) 82%,
      ${({ theme }) => theme.colors.background} 100%
    );
  }
`;

const Content = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;

  display: flex;
  align-items: center;
  padding: 0 clamp(1.5rem, 4.5vw, 5.5rem);

  @media (max-width: 960px) {
    align-items: flex-end;
    padding: 0 clamp(1.25rem, 3.5vw, 3rem) clamp(2rem, 4vw, 3.5rem);
  }

  @media (max-width: 640px) {
    position: relative;
    inset: auto;
    display: block;
    padding: clamp(1.25rem, 5vw, 2rem) clamp(1rem, 5vw, 1.5rem) clamp(2.5rem, 7vw, 4rem);
    background: ${({ theme }) => theme.colors.background};
  }
`;

const Card = styled.div`
  max-width: clamp(380px, 50%, 1040px);

  padding: clamp(1.75rem, 2.8vw, 2.75rem) clamp(1.75rem, 3.2vw, 3rem);
  border-radius: 28px;

  background: color-mix(in srgb, ${({ theme }) => theme.colors.surface} 36%, transparent);
  backdrop-filter: blur(16px) saturate(1.3);
  -webkit-backdrop-filter: blur(16px) saturate(1.3);
  border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.border} 55%, transparent);

  @media (max-width: 1100px) {
    max-width: clamp(340px, 50%, 520px);
  }

  @media (max-width: 960px) {
    max-width: 100%;
    padding: clamp(1.5rem, 3vw, 2rem) clamp(1.5rem, 3.5vw, 2.25rem);
    background: color-mix(in srgb, ${({ theme }) => theme.colors.surface} 68%, transparent);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  @media (max-width: 640px) {
    max-width: 100%;
    padding: 0;
    border-radius: 0;
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: none;
  }
`;

/* ── Typography ──────────────────────────────────────────────────────────── */

const Eyebrow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};

  font-size: clamp(2.4rem, 3.6vw, 4.8rem);
  line-height: 0.92;
  letter-spacing: -0.04em;
  text-wrap: balance;

  color: ${({ theme }) => theme.colors.text};

  text-shadow:
    0 1px 0 color-mix(in srgb, ${({ theme }) => theme.colors.surface} 80%, transparent),
    0 6px 18px color-mix(in srgb, ${({ theme }) => theme.colors.text} 12%, transparent);

  @media (max-width: 960px) {
    font-size: clamp(2.2rem, 5vw, 3.6rem);
  }

  @media (max-width: 640px) {
    font-size: clamp(2rem, 8.5vw, 3rem);
    line-height: 0.94;
    max-width: 13ch;

    text-shadow:
      0 1px 0 color-mix(in srgb, ${({ theme }) => theme.colors.surface} 70%, transparent),
      0 4px 12px color-mix(in srgb, ${({ theme }) => theme.colors.text} 10%, transparent);
  }
`;
const Lead = styled.p`
  margin: 1rem 0 0;
  max-width: 44ch;

  font-size: clamp(0.94rem, 1.25vw, 1.12rem);
  line-height: 1.72;

  color: ${({ theme }) => theme.colors.textMuted};

  text-shadow: 0 1px 0 color-mix(in srgb, ${({ theme }) => theme.colors.surface} 70%, transparent);

  @media (max-width: 640px) {
    max-width: 100%;
    font-size: 0.96rem;
    line-height: 1.65;
    margin-top: 0.875rem;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
  margin-top: 2rem;

  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const ActionLink = styled(Link)`
  @media (max-width: 640px) {
    display: flex;
  }
`;

/* ── Component ───────────────────────────────────────────────────────────── */

export default function Hero() {
  return (
    <Section>
      <Stage>
        <ImageWrap>
          <Image
            src={HERO_IMAGE}
            alt="Urban Nest — curated home interior"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <Scrim />
        </ImageWrap>

        <Content>
          <Card>
            <Eyebrow>
              <Badge>Curated living</Badge>
              <Badge>SS26 interior edit</Badge>
            </Eyebrow>

            <Title>Дом, который ощущается спокойнее с первого взгляда.</Title>

            <Lead>
              Мебель, декор и мягкие повседневные детали для пространства, где свет, тактильные
              формы и тишина становятся частью привычного ритма.
            </Lead>

            <Actions>
              <ActionLink href={routes.catalog}>
                <Button as="span" style={{ width: '100%' }}>
                  Открыть каталог
                </Button>
              </ActionLink>

              <ActionLink href={routes.about}>
                <Button as="span" $variant="secondary" style={{ width: '100%' }}>
                  Узнать о бренде
                </Button>
              </ActionLink>
            </Actions>
          </Card>
        </Content>
      </Stage>
    </Section>
  );
}
