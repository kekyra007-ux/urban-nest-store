/** Design reminder: search must feel immediate but calm, preserving a premium browsing rhythm. */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { debounce } from '@/shared/lib/debounce';
import Input from '@/shared/ui/Input';

export default function SearchBar({ value, onCommit }: { value: string; onCommit: (value: string) => void }) {
  const [query, setQuery] = useState(value);
  const debouncedCommit = useMemo(() => debounce((nextValue: string) => onCommit(nextValue), 280), [onCommit]);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  return (
    <Input
      value={query}
      placeholder="Поиск по названию, описанию или категории"
      onChange={(event) => {
        const nextValue = event.target.value;
        setQuery(nextValue);
        debouncedCommit(nextValue);
      }}
    />
  );
}
