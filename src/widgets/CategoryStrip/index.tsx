/** Design reminder: category highlights should look curated like magazine callouts, not plain shortcuts. */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { Category } from '@/entities/product/model/types';
import { CATEGORY_IMAGE } from '@/shared/config/constants';
import Button from '@/shared/ui/Button';
import Container from '@/shared/ui/Container';
import Section from '@/shared/ui/Section';

const Wrap = styled(Container)`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr 0.95fr;
  align-items: stretch;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Categories = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

const Item = styled(Link)`
  display: grid;
  gap: 0.35rem;
  padding: 1.25rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const Promo = styled.div`
  position: relative;
  min-height: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
`;

const PromoText = styled.div`
  position: absolute;
  inset: auto 1.25rem 1.25rem 1.25rem;
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(32, 26, 23, 0.65);
  color: #fefcf8;
`;

export default function CategoryStrip({ categories }: { categories: Category[] }) {
  return (
    <Section>
      <Wrap>
        <div>
          <h2>Популярные категории</h2>
          <p>Быстрый вход в самые востребованные направления магазина.</p>
          <Categories>
            {categories.slice(0, 6).map((category) => (
              <Item key={category.slug} href={`/catalog?category=${category.slug}`}>
                <strong>{category.name}</strong>
                <span>Перейти в curated selection</span>
              </Item>
            ))}
          </Categories>
        </div>
        <Promo>
          <Image src={CATEGORY_IMAGE} alt="Dining category" fill style={{ objectFit: 'cover' }} sizes="(max-width: 980px) 100vw, 45vw" />
          <PromoText>
            <h3>Seasonal dining edit</h3>
            <p>Тёплые формы, мягкие материалы и спокойная палитра для дома.</p>
            <Link href="/catalog?category=furniture"><Button as="span" $variant="secondary">Смотреть подборку</Button></Link>
          </PromoText>
        </Promo>
      </Wrap>
    </Section>
  );
}
