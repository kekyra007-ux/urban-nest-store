/** Design reminder: category highlights should look curated like magazine callouts, not plain shortcuts. */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { Category } from '@/entities/product/model/types';
import { EDITORIAL_LOUNGE_IMAGE } from '@/shared/config/constants';
import Badge from '@/shared/ui/Badge';
import Button from '@/shared/ui/Button';
import Container from '@/shared/ui/Container';
import Section from '@/shared/ui/Section';

const Head = styled.div`
  display: grid;
  gap: 0.8rem;
  margin-bottom: clamp(1.4rem, 2.5vw, 2.2rem);
  max-width: 42rem;

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: clamp(0.96rem, 1.15vw, 1.05rem);
    line-height: 1.65;
    margin: 0;
  }
`;

const Stack = styled(Container)`
  display: grid;
  gap: clamp(1rem, 2vw, 1.5rem);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
  align-items: stretch;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.7rem;
  }
`;

const Item = styled(Link)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.9rem;
  min-width: 0;

  padding: 1.1rem 1.15rem;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  transition:
    box-shadow 220ms ease,
    border-color 220ms ease,
    background 220ms ease,
    transform 220ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.card};
    background: ${({ theme }) => theme.colors.surfaceAlt};
    border-color: color-mix(in srgb, ${({ theme }) => theme.colors.accent} 24%, transparent);
  }

  @media (max-width: 640px) {
    padding: 1rem;
    border-radius: 16px;
  }
`;

const ItemText = styled.div`
  display: grid;
  gap: 0.18rem;
  min-width: 0;
`;

const ItemLabel = styled.span`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25;
  color: ${({ theme }) => theme.colors.text};
  text-transform: capitalize;
`;

const ItemHint = styled.span`
  font-size: 0.85rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (max-width: 640px) {
    font-size: 0.82rem;
  }
`;

const Arrow = styled.span`
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 999px;
  flex-shrink: 0;

  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.9rem;
  line-height: 1;

  transition:
    transform 200ms ease,
    background 200ms ease;

  ${Item}:hover & {
    transform: translateX(2px);
    background: color-mix(in srgb, ${({ theme }) => theme.colors.accent} 14%, transparent);
  }
`;

const PromoCard = styled.article`
  position: relative;
  display: grid;
  min-height: clamp(320px, 42vw, 500px);
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: 960px) {
    min-height: 360px;
    border-radius: ${({ theme }) => theme.radii.lg};
  }

  @media (max-width: 640px) {
    min-height: 420px;
  }
`;

const PromoImage = styled.div`
  position: absolute;
  inset: 0;
`;

const PromoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      90deg,
      rgba(20, 15, 10, 0.62) 0%,
      rgba(20, 15, 10, 0.34) 28%,
      rgba(20, 15, 10, 0.08) 58%,
      rgba(20, 15, 10, 0) 100%
    ),
    linear-gradient(180deg, rgba(20, 15, 10, 0.06) 0%, rgba(20, 15, 10, 0.14) 100%);

  @media (max-width: 640px) {
    background: linear-gradient(
      180deg,
      rgba(20, 15, 10, 0.76) 0%,
      rgba(20, 15, 10, 0.51) 34%,
      rgba(20, 15, 10, 0.4) 62%,
      rgba(20, 15, 10, 0.27) 100%
    );
  }
`;

const PromoContent = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  align-content: end;
  gap: 0.85rem;
  padding: clamp(1.4rem, 3vw, 2.5rem);
  max-width: 34rem;

  h3 {
    margin: 0;
    color: rgba(254, 250, 244, 0.96);
    font-size: clamp(1.4rem, 2.1vw, 2rem);
    line-height: 1.08;
    letter-spacing: -0.03em;
  }

  p {
    margin: 0;
    color: rgba(254, 250, 244, 0.82);
    font-size: clamp(0.95rem, 1.05vw, 1.02rem);
    line-height: 1.65;
    max-width: 32rem;
  }

  @media (max-width: 640px) {
    max-width: 100%;
    padding: 1.15rem;
    gap: 0.75rem;

    h3 {
      font-size: 1.3rem;
      line-height: 1.12;
    }

    p {
      font-size: 0.92rem;
      line-height: 1.58;
    }
  }
`;

export default function CategoryStrip({ categories }: { categories: Category[] }) {
  return (
    <Section>
      <Container>
        <Head>
          <Badge>Categories</Badge>
          <h2>Популярные категории</h2>
          <p>Быстрый вход в самые востребованные направления магазина.</p>
        </Head>
      </Container>

      <Stack>
        <Grid>
          {categories.slice(0, 6).map((category) => (
            <Item key={category.slug} href={`/catalog?category=${category.slug}`}>
              <ItemText>
                <ItemLabel>{category.name}</ItemLabel>
                <ItemHint>Смотреть подборку</ItemHint>
              </ItemText>
              <Arrow>→</Arrow>
            </Item>
          ))}
        </Grid>

        <PromoCard>
          <PromoImage>
            <Image
              src={EDITORIAL_LOUNGE_IMAGE}
              alt="Dining category"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center center' }}
              sizes="(max-width: 640px) 100vw, 92vw"
            />
          </PromoImage>

          <PromoOverlay />

          <PromoContent>
            <h3>Seasonal dining edit</h3>
            <p>
              Тёплые формы, мягкие материалы и спокойная палитра для дома — подборка для
              пространства, где повседневные вещи выглядят собранно и естественно.
            </p>
            <div>
              <Link href="/catalog?category=furniture">
                <Button as="span" $variant="secondary">
                  Смотреть подборку
                </Button>
              </Link>
            </div>
          </PromoContent>
        </PromoCard>
      </Stack>
    </Section>
  );
}
