/** Design reminder: pagination should remain configurable, legible, and visually lightweight. */
'use client';

import styled from 'styled-components';
import Button from './Button';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
`;

const Numbers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export default function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Row>
      <Button $variant="secondary" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Назад
      </Button>
      <Numbers>
        {pages.map((page) => (
          <Button key={page} $variant={page === currentPage ? 'primary' : 'ghost'} onClick={() => onPageChange(page)}>
            {page}
          </Button>
        ))}
      </Numbers>
      <Button $variant="secondary" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Далее
      </Button>
    </Row>
  );
}
