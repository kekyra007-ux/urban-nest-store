/** Design reminder: the header should feel airy, navigable, and quietly premium on every route. */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled, { css } from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { closeMobileMenu, openCartDrawer, toggleMobileMenu } from '@/app/store/slices/uiSlice';
import { selectCartTotals } from '@/entities/cart/model/selectors';
import Container from '@/shared/ui/Container';

/* ── Shell ── */

const Shell = styled.header`
  position: sticky;
  top: 0;
  z-index: 700;
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  background: rgba(246, 240, 231, 0.86);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: box-shadow 220ms ease;

  &:has(+ *) {
    box-shadow: 0 1px 0 rgba(32, 26, 23, 0.06);
  }
`;

const Row = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  min-height: 72px;
`;

/* ── Brand ── */

const Brand = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.35rem;
  letter-spacing: -0.04em;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.text};
  transition: opacity 160ms ease;

  &:hover {
    opacity: 0.72;
  }
`;

/* ── Main nav ── */

const Nav = styled.nav<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
  justify-content: center;

  @media (max-width: 900px) {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
    padding: 0.75rem;
    border-radius: 0 0 ${({ theme }) => theme.radii.lg} ${({ theme }) => theme.radii.lg};
    background: rgba(252, 247, 241, 0.98);
    backdrop-filter: blur(20px);
    box-shadow: 0 24px 48px rgba(53, 42, 35, 0.12);
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    border-left: 1px solid ${({ theme }) => theme.colors.border};
    border-right: 1px solid ${({ theme }) => theme.colors.border};

    transform-origin: top center;
    transition: opacity 200ms ease, transform 200ms cubic-bezier(0.22, 1, 0.36, 1), visibility 200ms;

    ${({ $open }) =>
      $open
        ? css`
            opacity: 1;
            transform: scaleY(1);
            visibility: visible;
            pointer-events: all;
          `
        : css`
            opacity: 0;
            transform: scaleY(0.92);
            visibility: hidden;
            pointer-events: none;
          `}
  }
`;

const activeLinkStyle = css`
  background: rgba(255, 250, 244, 0.95);
  color: ${({ theme }) => theme.colors.text};
  border-color: rgba(32, 26, 23, 0.16);
  font-weight: 600;
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid transparent;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.textMuted)};
  transition: background 160ms ease, color 160ms ease, border-color 160ms ease;
  white-space: nowrap;

  ${({ $active }) => $active && activeLinkStyle}

  &:hover {
    background: rgba(255, 250, 244, 0.8);
    color: ${({ theme }) => theme.colors.text};
    border-color: rgba(32, 26, 23, 0.1);
  }

  @media (max-width: 900px) {
    padding: 0.65rem 1rem;
    border-radius: ${({ theme }) => theme.radii.md};
  }
`;

const ActiveDot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  flex-shrink: 0;
`;

/* ── Actions (right side) ── */

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const IconBtn = styled.button<{ $active?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid ${({ $active, theme }) => ($active ? 'rgba(32,26,23,0.22)' : theme.colors.border)};
  background: ${({ $active, theme }) => ($active ? 'rgba(255,250,244,0.95)' : 'transparent')};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;

  &:hover {
    background: rgba(255, 250, 244, 0.95);
    border-color: rgba(32, 26, 23, 0.22);
    transform: scale(1.04);
  }
`;

const IconLinkBtn = styled(Link)<{ $active?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid ${({ $active, theme }) => ($active ? 'rgba(32,26,23,0.22)' : theme.colors.border)};
  background: ${({ $active, theme }) => ($active ? 'rgba(255,250,244,0.95)' : 'transparent')};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;

  &:hover {
    background: rgba(255, 250, 244, 0.95);
    border-color: rgba(32, 26, 23, 0.22);
    transform: scale(1.04);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -3px;
  right: -3px;
  min-width: 18px;
  height: 18px;
  padding-inline: 4px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.surface};
  font-size: 0.68rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  border: 2px solid rgba(246, 240, 231, 0.9);
`;

/* ── Hamburger ── */

const HamburgerBtn = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 42px;
  height: 42px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  align-items: center;
  transition: background 160ms ease;

  &:hover {
    background: rgba(255, 250, 244, 0.95);
  }

  @media (max-width: 900px) {
    display: inline-flex;
  }
`;

const Bar = styled.span<{ $open: boolean; $index: number }>`
  display: block;
  width: 18px;
  height: 1.5px;
  background: ${({ theme }) => theme.colors.text};
  border-radius: 2px;
  transform-origin: center;
  transition: transform 220ms ease, opacity 220ms ease, width 220ms ease;

  ${({ $open, $index }) =>
    $open &&
    $index === 0 &&
    css`
      transform: translateY(6.5px) rotate(45deg);
    `}

  ${({ $open, $index }) =>
    $open &&
    $index === 1 &&
    css`
      opacity: 0;
      width: 0;
    `}

  ${({ $open, $index }) =>
    $open &&
    $index === 2 &&
    css`
      transform: translateY(-6.5px) rotate(-45deg);
    `}
`;

/* ── Nav links config ── */

const MAIN_LINKS = [
  { label: 'Главная', href: '/' },
  { label: 'Каталог', href: '/catalog' },
  { label: 'О нас', href: '/about' },
  { label: 'Контакты', href: '/contacts' },
] as const;

/* ── Component ── */

export default function Header() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const mobileMenuOpen = useAppSelector((state) => state.ui.mobileMenuOpen);
  const wishlistCount = useAppSelector((state) => state.wishlist.ids.length);
  const { totalQuantity } = useAppSelector(selectCartTotals);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <Shell>
      <Row>
        <Brand href="/" onClick={() => dispatch(closeMobileMenu())}>Urban Nest</Brand>

        <Nav $open={mobileMenuOpen}>
          {MAIN_LINKS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              $active={isActive(item.href)}
              onClick={() => dispatch(closeMobileMenu())}
            >
              {isActive(item.href) && <ActiveDot />}
              {item.label}
            </NavLink>
          ))}
        </Nav>

        <Actions>
          <IconLinkBtn
            href="/wishlist"
            $active={isActive('/wishlist')}
            aria-label={`Избранное${wishlistCount > 0 ? ` (${wishlistCount})` : ''}`}
          >
            {isActive('/wishlist') ? '♥' : '♡'}
            {wishlistCount > 0 && <Badge>{wishlistCount > 99 ? '99+' : wishlistCount}</Badge>}
          </IconLinkBtn>

          <IconBtn
            $active={isActive('/cart')}
            onClick={() => dispatch(openCartDrawer())}
            aria-label={`Корзина${totalQuantity > 0 ? ` (${totalQuantity})` : ''}`}
          >
            🛒
            {totalQuantity > 0 && <Badge>{totalQuantity > 99 ? '99+' : totalQuantity}</Badge>}
          </IconBtn>

          <HamburgerBtn
            onClick={() => dispatch(toggleMobileMenu())}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={mobileMenuOpen}
          >
            <Bar $open={mobileMenuOpen} $index={0} />
            <Bar $open={mobileMenuOpen} $index={1} />
            <Bar $open={mobileMenuOpen} $index={2} />
          </HamburgerBtn>
        </Actions>
      </Row>
    </Shell>
  );
}
