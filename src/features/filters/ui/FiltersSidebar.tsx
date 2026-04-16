/** Design reminder: filters should frame discovery like a curated showroom menu. */
'use client';

import styled from 'styled-components';
import { Category } from '@/entities/product/model/types';
import Button from '@/shared/ui/Button';

const Panel = styled.aside<{ $mobile?: boolean; $open?: boolean }>`
  display: grid;
  gap: 1.25rem;
  align-content: start;

  padding: 1.25rem 1.1rem;

  border-radius: 20px;

  background: color-mix(in srgb, ${({ theme }) => theme.colors.surface} 92%, transparent);
  border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.border} 70%, transparent);

  box-shadow: none;

  @media (max-width: 900px) {
    display: ${({ $mobile, $open }) => ($mobile ? ($open ? 'grid' : 'none') : 'grid')};
    padding: 1rem;
    border-radius: 18px;
  }
`;

const Header = styled.div`
  display: grid;
  gap: 0.4rem;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  font-size: 0.85rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`;
const List = styled.div`
  display: grid;
  gap: 0.25rem;
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  text-align: left;
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.border : 'transparent')};
  background: ${({ $active, theme }) => ($active ? theme.colors.surfaceAlt : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.textMuted)};
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  font-size: 0.9rem;
  padding: 0.6rem 0.875rem;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition:
    background 140ms ease,
    color 140ms ease,
    border-color 140ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.border};
  }
`;

const ResetWrap = styled.div`
  margin-top: 0.5rem;
  padding-top: 0.75rem;

  border-top: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.border} 60%, transparent);
`;

const ResetButton = styled.button`
  background: none;
  border: none;

  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};

  cursor: pointer;

  transition: color 140ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export default function FiltersSidebar({
  categories,
  activeCategory,
  onSelectCategory,
  onReset,
  mobile,
  open,
}: {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onReset: () => void;
  mobile?: boolean;
  open?: boolean;
}) {
  return (
    <Panel $mobile={mobile} $open={open}>
      <Header>
        <Title>Фильтры</Title>
        <Description>Подбери товары по назначению комнаты и настроению интерьера.</Description>
      </Header>

      <List>
        <CategoryButton $active={activeCategory === 'all'} onClick={() => onSelectCategory('all')}>
          Все категории
        </CategoryButton>

        {categories.map((category) => (
          <CategoryButton
            key={category.slug}
            $active={activeCategory === category.slug}
            onClick={() => onSelectCategory(category.slug)}
          >
            {category.name}
          </CategoryButton>
        ))}
      </List>

      <ResetWrap>
        <ResetButton onClick={onReset}>Сбросить фильтры</ResetButton>
      </ResetWrap>
    </Panel>
  );
}
