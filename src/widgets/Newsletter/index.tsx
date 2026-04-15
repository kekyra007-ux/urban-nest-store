/** Design reminder: newsletter blocks should extend brand warmth and offer a polished content break. */
'use client';

import styled from 'styled-components';
import Button from '@/shared/ui/Button';
import Container from '@/shared/ui/Container';
import Input from '@/shared/ui/Input';
import Section from '@/shared/ui/Section';

const Card = styled(Container)`
  display: grid;
  gap: 1rem;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(135deg, rgba(255,250,244,0.92), rgba(221,230,220,0.95));
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export default function Newsletter() {
  return (
    <Section>
      <Card>
        <div>
          <h2>Новые интерьерные дропы без визуального шума</h2>
          <p>Подпишись на подборки, новинки и сезонные коллекции Urban Nest.</p>
        </div>
        <Form>
          <Input type="email" placeholder="your@email.com" />
          <Button type="submit">Подписаться</Button>
        </Form>
      </Card>
    </Section>
  );
}
