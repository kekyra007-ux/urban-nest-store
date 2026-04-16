/** Design reminder: the catalog must balance business density with calm, premium discoverability. */
'use client';

import Image from 'next/image';
import { useCallback, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { selectCatalogMeta, selectPaginatedProducts } from '@/app/store/selectors';
import { fetchCategories, fetchProducts, resetFilters, setCategory, setPage, setPerPage, setSearchQuery, setSort } from '@/app/store/slices/catalogSlice';
import { closeFilters, toggleFilters } from '@/app/store/slices/uiSlice';
import FiltersSidebar from '@/features/filters/ui/FiltersSidebar';
import SearchBar from '@/features/search-products/ui/SearchBar';
import SortSelect from '@/features/sort-products/ui/SortSelect';
import CatalogGrid from '@/widgets/CatalogGrid';
import Container from '@/shared/ui/Container';
import Pagination from '@/shared/ui/Pagination';
import EmptyState from '@/shared/ui/EmptyState';
import Button from '@/shared/ui/Button';
import { DINING_DETAILS_IMAGE, PAGE_SIZE_OPTIONS } from '@/shared/config/constants';
import Badge from '@/shared/ui/Badge';

const Shell = styled(Container)`
  display: grid;
  gap: 1.5rem;
  padding-block: 2rem 4rem;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
  gap: 1.5rem;
  align-items: stretch;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const HeaderContent = styled.div`
  display: grid;
  gap: 1rem;
  align-content: center;
  padding: clamp(1.35rem, 2vw, 2rem);
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  p {
    max-width: 42rem;
  }
`;

const HeaderVisual = styled.div`
  position: relative;
  min-height: 260px;
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const HeaderOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(247, 241, 233, 0.06) 0%, rgba(46, 35, 28, 0.1) 100%);
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Controls = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1.5fr 220px 160px auto;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1.15rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Select = styled.select`
  min-height: 52px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 1rem;

  option {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-block: 1rem 1.5rem;
  padding: 0.95rem 1rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 680px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export default function CatalogView() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const catalog = useAppSelector((state) => state.catalog);
  const ui = useAppSelector((state) => state.ui);
  const products = useAppSelector(selectPaginatedProducts);
  const meta = useAppSelector(selectCatalogMeta);

  useEffect(() => {
    if (catalog.status === 'idle') {
      dispatch(fetchProducts());
    }
    if (catalog.categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, catalog.status, catalog.categoriesStatus]);

  useEffect(() => {
    const query = searchParams?.get('q') ?? '';
    const category = searchParams?.get('category') ?? 'all';
    const sort = (searchParams?.get('sort') as typeof catalog.filters.sort | null) ?? 'featured';
    const page = Number(searchParams?.get('page') ?? '1');
    const perPage = Number(searchParams?.get('perPage') ?? String(catalog.filters.perPage));

    if (query !== catalog.filters.query) dispatch(setSearchQuery(query));
    if (category !== catalog.filters.category) dispatch(setCategory(category));
    if (sort !== catalog.filters.sort) dispatch(setSort(sort));
    if (!Number.isNaN(page) && page !== catalog.filters.page) dispatch(setPage(page));
    if (!Number.isNaN(perPage) && perPage !== catalog.filters.perPage) dispatch(setPerPage(perPage));
  }, [dispatch, searchParams, catalog.filters]);

  useEffect(() => {
    if (catalog.filters.page > meta.totalPages) {
      dispatch(setPage(meta.totalPages));
    }
  }, [catalog.filters.page, meta.totalPages, dispatch]);

  const updateParams = useCallback(
    (patch: Record<string, string>) => {
      const params = new URLSearchParams(searchParams?.toString() ?? '');
      Object.entries(patch).forEach(([key, value]) => {
        if (!value || value === 'all' || (key === 'page' && value === '1')) {
          params.delete(key);
          return;
        }
        params.set(key, value);
      });
      router.replace(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  return (
    <Shell>
      <Header>
        <HeaderContent>
          <Badge>Curated catalog</Badge>
          <h1>Каталог</h1>
          <p>Поиск, фильтры, сортировка и пагинация собраны в один взрослый UX-поток, но теперь поданы в более спокойной и премиальной редакционной оболочке.</p>
        </HeaderContent>
        <HeaderVisual>
          <Image src={DINING_DETAILS_IMAGE} alt="Urban Nest catalog mood" fill sizes="(max-width: 980px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
          <HeaderOverlay />
        </HeaderVisual>
      </Header>
      <Layout>
        <FiltersSidebar
          categories={catalog.categories}
          activeCategory={catalog.filters.category}
          onSelectCategory={(category) => {
            dispatch(setCategory(category));
            dispatch(setPage(1));
            dispatch(closeFilters());
            updateParams({ category, page: '1' });
          }}
          onReset={() => {
            dispatch(resetFilters());
            dispatch(closeFilters());
            router.replace('/catalog');
          }}
          mobile
          open={ui.filtersOpen}
        />
        <div>
          <Controls>
            <SearchBar
              value={catalog.filters.query}
              onCommit={(value) => {
                dispatch(setSearchQuery(value));
                updateParams({ q: value, page: '1' });
              }}
            />
            <SortSelect
              value={catalog.filters.sort}
              onChange={(value) => {
                dispatch(setSort(value));
                updateParams({ sort: value, page: '1' });
              }}
            />
            <Select
              value={catalog.filters.perPage}
              onChange={(event) => {
                const value = Number(event.target.value);
                dispatch(setPerPage(value));
                updateParams({ perPage: String(value), page: '1' });
              }}
            >
              {PAGE_SIZE_OPTIONS.map((option) => (
                <option key={option} value={option}>{option} / стр.</option>
              ))}
            </Select>
            <Button $variant="secondary" onClick={() => dispatch(toggleFilters())}>Фильтры</Button>
          </Controls>
          <Meta>
            <span>Найдено товаров: {meta.total}</span>
            <span>Страница {meta.currentPage} из {meta.totalPages}</span>
          </Meta>
          {catalog.status === 'failed' ? (
            <EmptyState
              icon="⚠️"
              title="Не удалось загрузить каталог"
              description={catalog.error ?? 'Что-то пошло не так. Попробуй ещё раз.'}
              onRetry={() => { dispatch(fetchProducts()); dispatch(fetchCategories()); }}
              retryLabel="Попробовать снова"
              href="/catalog"
              action="Обновить страницу"
            />
          ) : meta.total === 0 && catalog.status === 'succeeded' ? (
            <EmptyState
              icon="🔍"
              title="Ничего не найдено"
              description="Сбрось фильтры или измени поисковый запрос, чтобы вернуть товары в подборку."
              onRetry={() => { dispatch(resetFilters()); router.replace('/catalog'); }}
              retryLabel="Сбросить фильтры"
              href="/catalog"
              action="Весь каталог"
            />
          ) : (
            <>
              <CatalogGrid products={products} loading={catalog.status === 'loading'} />
              <div style={{ marginTop: '1.5rem' }}>
                <Pagination
                  currentPage={meta.currentPage}
                  totalPages={meta.totalPages}
                  onPageChange={(page) => {
                    dispatch(setPage(page));
                    updateParams({ page: String(page) });
                  }}
                />
              </div>
            </>
          )}
        </div>
      </Layout>
    </Shell>
  );
}
