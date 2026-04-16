/** Design reminder: filters should frame discovery like a curated showroom menu. */
'use client';

import styled from 'styled-components';
import { Category } from '@/entities/product/model/types';
import Button from '@/shared/ui/Button';

const Panel = styled.aside<{ $mobile?: boolean; $open?: boolean }>`
  display: grid;
  gap: 1rem;
  align-content: start;
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (max-width: 900px) {
    display: ${({ $mobile, $open }) => ($mobile ? ($open ? 'grid' : 'none') : 'grid')};
  }
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  text-align: left;
  border: none;
  background: ${({ $active, theme }) => ($active ? theme.colors.surfaceAlt : 'transparent')};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.8rem 1rem;
  border-radius: ${({ theme }) => theme.radii.md};
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
      <div>
        <h3>Фильтры</h3>
        <p>Подбери товары по назначению комнаты и настроению интерьера.</p>
      </div>
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
      <Button $variant="ghost" onClick={onReset}>
        Сбросить фильтры
      </Button>
    </Panel>
  );
}
