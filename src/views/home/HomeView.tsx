/** Design reminder: the home page should feel like a premium digital showroom with strong editorial pacing. */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { selectFeaturedProducts, selectNewArrivals } from '@/app/store/selectors';
import { fetchCategories, fetchProducts } from '@/app/store/slices/catalogSlice';
import CatalogGrid from '@/widgets/CatalogGrid';
import Benefits from '@/widgets/Benefits';
import CategoryStrip from '@/widgets/CategoryStrip';
import Hero from '@/widgets/Hero';
import Newsletter from '@/widgets/Newsletter';
import Container from '@/shared/ui/Container';
import Section from '@/shared/ui/Section';
import Button from '@/shared/ui/Button';
import Badge from '@/shared/ui/Badge';
import {
  BEDROOM_ALCOVE_IMAGE,
  CATEGORY_IMAGE,
  DINING_DETAILS_IMAGE,
  EDITORIAL_LOUNGE_IMAGE,
  STUDIO_MATERIALS_IMAGE,
} from '@/shared/config/constants';
import { routes } from '@/shared/config/routes';

const SectionIntro = styled.div`
  display: grid;
  gap: 0.75rem;
  max-width: 42rem;
  margin-bottom: 1.75rem;
`;

const ShowroomSection = styled(Section)`
  padding-top: 0.5rem;
`;

const ShowroomGrid = styled(Container)`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  align-items: stretch;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const EditorialCard = styled.article`
  position: relative;
  min-height: 620px;
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lifted};
`;

const EditorialImage = styled.div`
  position: absolute;
  inset: 0;
`;

const EditorialOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(247, 242, 235, 0.08) 0%, rgba(45, 33, 26, 0.18) 58%, rgba(31, 23, 18, 0.5) 100%);
`;

const EditorialContent = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  align-content: end;
  gap: 1rem;
  min-height: 100%;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  color: ${({ theme }) => theme.colors.surface};

  p {
    max-width: 28rem;
    color: rgba(255, 249, 243, 0.86);
  }
`;

const EditorialAside = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const InsightCard = styled.article`
  display: grid;
  gap: 1.1rem;
  padding: clamp(1.3rem, 2vw, 1.75rem);
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  p {
    max-width: 30rem;
  }
`;

const MiniStatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const MiniStat = styled.div`
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};

  strong {
    display: block;
    margin-bottom: 0.35rem;
    font-size: 1.15rem;
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.95rem;
  }
`;

const SplitVisual = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: 1.5rem;
  align-items: stretch;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const PortraitVisual = styled.div`
  position: relative;
  min-height: 560px;
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const SplitContent = styled.div`
  display: grid;
  gap: 1.4rem;
  align-content: center;
  padding: clamp(1.3rem, 2vw, 2rem);
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const BulletList = styled.ul`
  display: grid;
  gap: 0.85rem;
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    display: grid;
    gap: 0.2rem;
    padding-left: 1.15rem;
    position: relative;
  }

  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.6rem;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.accent};
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const JournalGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const JournalFeature = styled.article`
  position: relative;
  min-height: 500px;
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const JournalCard = styled.article`
  display: grid;
  grid-template-rows: minmax(280px, 340px) auto;
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const JournalImage = styled.div`
  position: relative;
  min-height: 280px;
  overflow: hidden;
`;

const JournalBody = styled.div`
  display: grid;
  gap: 0.9rem;
  padding: 1.35rem;
`;

const CTAInline = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  align-items: center;
`;

export default function HomeView() {
  const dispatch = useAppDispatch();
  const { categories, status, categoriesStatus } = useAppSelector((state) => state.catalog);
  const featured = useAppSelector(selectFeaturedProducts);
  const newArrivals = useAppSelector(selectNewArrivals);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status, categoriesStatus]);

  return (
    <>
      <Hero />
      <Benefits />

      <ShowroomSection>
        <ShowroomGrid>
          <EditorialCard>
            <EditorialImage>
              <Image src={EDITORIAL_LOUNGE_IMAGE} alt="Editorial lounge mood by Urban Nest" fill sizes="(max-width: 980px) 100vw, 58vw" style={{ objectFit: 'cover' }} />
            </EditorialImage>
            <EditorialOverlay />
            <EditorialContent>
              <Badge>Showroom note</Badge>
              <h2>Собираем интерьер как спокойную последовательность материалов, а не как набор случайных вещей.</h2>
              <p>
                Новая визуальная линия проекта делает главную страницу ближе к digital showroom: больше воздуха,
                редакционный ритм и изображения, которые поддерживают премиальное ощущение бренда.
              </p>
              <CTAInline>
                <Link href={routes.catalog}><Button as="span">Смотреть коллекцию</Button></Link>
                <Link href={routes.about}><Button as="span" $variant="secondary">История бренда</Button></Link>
              </CTAInline>
            </EditorialContent>
          </EditorialCard>

          <EditorialAside>
            <InsightCard>
              <Badge>Curated atmosphere</Badge>
              <h3>Домашняя среда с тёплой тактильностью и мягкой геометрией.</h3>
              <p>
                Мы сместили акцент в сторону живых интерьерных образов, чтобы каталог ощущался не таблицей товаров,
                а последовательной интерьерной историей с собственным характером.
              </p>
              <MiniStatGrid>
                <MiniStat>
                  <strong>Natural oak</strong>
                  <span>тёплая древесина, визуально собирающая пространство</span>
                </MiniStat>
                <MiniStat>
                  <strong>Soft linen</strong>
                  <span>материалы, добавляющие глубину и ощущение покоя</span>
                </MiniStat>
                <MiniStat>
                  <strong>Quiet light</strong>
                  <span>мягкий свет вместо резкого рекламного контраста</span>
                </MiniStat>
              </MiniStatGrid>
            </InsightCard>

            <JournalCard>
              <JournalImage>
                <Image src={CATEGORY_IMAGE} alt="Dining composition for Urban Nest" fill sizes="(max-width: 980px) 100vw, 35vw" style={{ objectFit: 'cover' }} />
              </JournalImage>
              <JournalBody>
                <Badge>Dining edit</Badge>
                <h3>Подборки по сценариям, а не только по категориям.</h3>
                <p>
                  От ужина на каждый день до тихого weekend breakfast — подборки становятся более понятными и
                  эмоционально читаемыми, когда сопровождаются сильной lifestyle-подачей.
                </p>
              </JournalBody>
            </JournalCard>
          </EditorialAside>
        </ShowroomGrid>
      </ShowroomSection>

      <CategoryStrip categories={categories} />

      <Section>
        <Container>
          <SectionIntro>
            <Badge>New arrivals</Badge>
            <h2>Новые поступления с более чистой визуальной подачей.</h2>
            <p>
              Карточки и сетка каталога работают как аккуратная витрина: больше ритма, больше воздуха и более
              премиальная типографика вокруг ключевых товарных сценариев.
            </p>
          </SectionIntro>
          <CatalogGrid products={newArrivals} loading={status === 'loading'} />
        </Container>
      </Section>

      <Section $soft>
        <Container>
          <SplitVisual>
            <PortraitVisual>
              <Image src={BEDROOM_ALCOVE_IMAGE} alt="Warm Scandinavian bedroom alcove" fill sizes="(max-width: 980px) 100vw, 42vw" style={{ objectFit: 'cover' }} />
            </PortraitVisual>
            <SplitContent>
              <Badge>Bedroom story</Badge>
              <h2>Сценарии для тихих зон дома: спальня, хранение, мягкое утро.</h2>
              <p>
                Вместо агрессивной промо-подачи мы показываем интерьер как последовательность ощущений: приглушённый
                свет, фактуру ткани, дерево и спокойные расстояния между элементами.
              </p>
              <BulletList>
                <li>
                  <strong>Editorial spacing</strong>
                  <span>больше вертикального ритма и осмысленных пауз между блоками</span>
                </li>
                <li>
                  <strong>Calm contrast</strong>
                  <span>меньше визуального шума, больше уверенной иерархии заголовков и вторичного текста</span>
                </li>
                <li>
                  <strong>Soft commerce layer</strong>
                  <span>бизнес-функции остаются удобными, но не перетягивают на себя всю эмоциональную подачу</span>
                </li>
              </BulletList>
              <Link href={routes.catalog}><Button as="span" $variant="secondary">Перейти в каталог</Button></Link>
            </SplitContent>
          </SplitVisual>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionIntro>
            <Badge>Editorial picks</Badge>
            <h2>Подборка редакции с акцентом на интерьерную цельность.</h2>
            <p>
              Здесь остаются товары с лучшим рейтингом, но теперь блок поддержан richer storytelling и сильнее связан
              с общей art direction проекта.
            </p>
          </SectionIntro>
          <CatalogGrid products={featured.slice(0, 4)} loading={status === 'loading'} />
        </Container>
      </Section>

      <Section $soft>
        <Container>
          <JournalGrid>
            <JournalFeature>
              <EditorialImage>
                <Image src={DINING_DETAILS_IMAGE} alt="Dining details styled for Urban Nest" fill sizes="(max-width: 980px) 100vw, 55vw" style={{ objectFit: 'cover' }} />
              </EditorialImage>
              <EditorialOverlay />
              <EditorialContent>
                <Badge>Journal</Badge>
                <h2>Материалы и повседневные ритуалы становятся частью интерфейса.</h2>
                <p>
                  Визуальный апгрейд добавляет блоки, которые связывают каталог с образом жизни: сервировка, фактуры,
                  тёплые нейтральные сцены и более зрелый editorial balance.
                </p>
              </EditorialContent>
            </JournalFeature>

            <JournalCard>
              <JournalImage>
                <Image src={STUDIO_MATERIALS_IMAGE} alt="Urban Nest material study" fill sizes="(max-width: 980px) 100vw, 38vw" style={{ objectFit: 'cover' }} />
              </JournalImage>
              <JournalBody>
                <Badge>Craftsmanship</Badge>
                <h3>Текстуры, палитра и материалы объясняют, почему ассортимент выглядит согласованным.</h3>
                <p>
                  Этот блок усиливает доверие к бренду: дерево, boucle, stone surface и нейтральная палитра работают
                  как понятная система, а не просто как декор на фоне каталога.
                </p>
                <Link href={routes.about}><Button as="span">О философии бренда</Button></Link>
              </JournalBody>
            </JournalCard>
          </JournalGrid>
        </Container>
      </Section>

      <Newsletter />
    </>
  );
}
