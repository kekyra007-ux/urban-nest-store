/** Design reminder: the footer should close the experience like a calm editorial signature. */
'use client';

import styled from 'styled-components';
import Container from '@/shared/ui/Container';

const Shell = styled.footer`
  margin-top: 4rem;
  padding-block: 2rem 3rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Grid = styled(Container)`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

export default function Footer() {
  return (
    <Shell>
      <Grid>
        <div>
          <h3>Urban Nest Store</h3>
          <p>Современный магазин предметов для дома, собранный как зрелый frontend-проект для портфолио.</p>
        </div>
        <div>
          <h4>Навигация</h4>
          <p>Каталог, wishlist, cart, about, contacts и динамическая карточка товара.</p>
        </div>
        <div>
          <h4>Контакты</h4>
          <p>hello@urbannest.store</p>
          <p>+1 (415) 555-0147</p>
        </div>
      </Grid>
    </Shell>
  );
}
