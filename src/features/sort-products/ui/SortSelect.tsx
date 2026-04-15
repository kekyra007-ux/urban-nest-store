/** Design reminder: sorting controls should stay native, typed, and elegantly quiet. */
'use client';

import styled from 'styled-components';
import { SortOption } from '@/entities/product/model/types';

const Select = styled.select`
  min-height: 52px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 250, 244, 0.92);
  padding: 0 1rem;
`;

export default function SortSelect({ value, onChange }: { value: SortOption; onChange: (value: SortOption) => void }) {
  return (
    <Select value={value} onChange={(event) => onChange(event.target.value as SortOption)}>
      <option value="featured">По умолчанию</option>
      <option value="price-asc">Цена: по возрастанию</option>
      <option value="price-desc">Цена: по убыванию</option>
      <option value="rating-desc">По рейтингу</option>
      <option value="title-asc">По названию</option>
    </Select>
  );
}
