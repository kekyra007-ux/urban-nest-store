/** Design reminder: benefit blocks should feel like confident brand notes, not generic feature lists. */
'use client';

import styled from 'styled-components';
import Container from '@/shared/ui/Container';
import Section from '@/shared/ui/Section';

const Grid = styled(Container)`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

const Card = styled.article`
  display: grid;
  gap: 0.75rem;
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(255, 250, 244, 0.9);
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const benefits = [
  { title: 'Curated collections', text: 'Каталог собран как интерьерная подборка, а не просто список SKU.' },
  { title: 'Typed architecture', text: 'Строгие типы DTO, селекторы, slices и переиспользуемые UI-слои.' },
  { title: 'Smooth shopping flow', text: 'Wishlist, cart, quantity controls и persistence делают UX зрелым.' },
  { title: 'Responsive showroom', text: 'Спокойная адаптивность без визуального шума на любых экранах.' },
];

export default function Benefits() {
  return (
    <Section $soft>
      <Grid>
        {benefits.map((benefit) => (
          <Card key={benefit.title}>
            <h3>{benefit.title}</h3>
            <p>{benefit.text}</p>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
