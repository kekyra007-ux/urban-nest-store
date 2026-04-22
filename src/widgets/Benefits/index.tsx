/** Design reminder: benefit blocks should feel like confident brand notes, not generic feature lists. */
'use client';

import styled from 'styled-components';
import Container from '@/shared/ui/Container';
import Section from '@/shared/ui/Section';
const Grid = styled(Container)`
  display: grid;
  gap: clamp(0.9rem, 1.6vw, 1.2rem);
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: stretch;

  @media (max-width: 1180px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  display: grid;
  gap: 0.85rem;
  align-content: start;
  min-width: 0;

  padding: clamp(1rem, 1.6vw, 1.35rem);
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  transition:
    box-shadow 200ms ease,
    border-color 200ms ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.card};
  }

  @media (max-width: 640px) {
    padding: 0.95rem;
    border-radius: ${({ theme }) => theme.radii.md};
  }
`;

const Kicker = styled.span`
  display: inline-flex;
  align-items: center;
  justify-self: start;
  min-height: 1.9rem;
  padding: 0.32rem 0.72rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  @media (max-width: 640px) {
    font-size: 0.7rem;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
`;

const Text = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.7rem;
  line-height: 1.6;

  @media (max-width: 640px) {
    font-size: 0.6rem;
    line-height: 1.55;
  }
`;

const benefits = [
  {
    kicker: 'Curated living',
    title: 'Подборки, которые ощущаются как готовые интерьерные сцены',
    text: 'Мы собираем каталог не как витрину случайных предметов, а как последовательность спокойных, совместимых между собой решений для дома.',
  },
  {
    kicker: 'Material focus',
    title: 'Тёплые фактуры и материалы, с которыми хочется жить дольше',
    text: 'Светлое дерево, мягкий текстиль, спокойная керамика и естественные оттенки помогают пространству выглядеть цельно и взросло.',
  },
  {
    kicker: 'Quiet shopping',
    title: 'Лёгкий выбор без визуального шума и перегруженных действий',
    text: 'Фильтры, карточки и ключевые сценарии устроены так, чтобы поиск нужной вещи занимал меньше усилий и не ломал общее впечатление от каталога.',
  },
  {
    kicker: 'Home rhythm',
    title: 'Предметы для повседневного ритма, а не только для красивой картинки',
    text: 'Мы делаем акцент на вещах, которые поддерживают уют каждый день: помогают организовать пространство, смягчают интерьер и добавляют ему тишины.',
  },
];

export default function Benefits() {
  return (
    <Section $soft>
      <Grid>
        {benefits.map((benefit) => (
          <Card key={benefit.title}>
            <Kicker>{benefit.kicker}</Kicker>
            <Title>{benefit.title}</Title>
            <Text>{benefit.text}</Text>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
