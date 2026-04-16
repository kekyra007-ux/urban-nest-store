/** Design reminder: the about page should deepen brand story through calm narrative and tactile imagery. */
'use client';

import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import {
  STORY_IMAGE,
  EDITORIAL_LOUNGE_IMAGE,
  STUDIO_MATERIALS_IMAGE,
} from '@/shared/config/constants';
import Container from '@/shared/ui/Container';
import Section from '@/shared/ui/Section';
import Badge from '@/shared/ui/Badge';

/* ── Hero ── */

const HeroGrid = styled(Container)`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Visual = styled.div`
  position: relative;
  min-height: 520px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lifted};
`;

/* ── Stats ── */

const StatsRow = styled(Container)`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;

const Stat = styled.div`
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  text-align: center;

  strong {
    display: block;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 2.5rem;
    line-height: 1;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 0.4rem;
  }

  span {
    font-size: 0.88rem;
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

/* ── Story ── */

const StoryGrid = styled(Container)`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

/* ── Benefits ── */

const BenefitsGrid = styled(Container)`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const BenefitCard = styled.article`
  display: grid;
  gap: 0.75rem;
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition:
    transform 220ms ease,
    box-shadow 220ms ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.card};
  }
`;

const BenefitIcon = styled.div`
  font-size: 2rem;
  line-height: 1;
`;

/* ── Values ── */

const ValuesGrid = styled(Container)`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const ValueCard = styled.div`
  display: grid;
  gap: 0.75rem;
  padding: 1.75rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.accentSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};

  h3 {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

/* ── FAQ ── */

const FaqList = styled.div`
  display: grid;
  gap: 0.75rem;
  max-width: 800px;
  margin: 0 auto;
`;

const FaqItem = styled.div`
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

const FaqQuestion = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  transition: color 180ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const FaqChevron = styled.span<{ $open: boolean }>`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: transform 220ms ease;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  flex-shrink: 0;
`;

const FaqAnswer = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 320ms ease;

  p {
    padding: 0 1.5rem 1.25rem;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.7;
  }
`;

const SectionHeading = styled.div`
  text-align: center;
  display: grid;
  gap: 0.75rem;
  justify-items: center;
  margin-bottom: 2rem;

  p {
    max-width: 46rem;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.7;
  }
`;

const faqData = [
  {
    q: 'Откуда берутся товары в каталоге?',
    a: 'Urban Nest сотрудничает с небольшими европейскими студиями и производителями, которые разделяют ценности осознанного дизайна. Каждый предмет проходит редакционный отбор — мы берём только то, что вписывается в концепцию спокойного, продуманного дома.',
  },
  {
    q: 'Как организована доставка?',
    a: 'Стандартная доставка занимает 3–7 рабочих дней. Для крупных предметов мебели мы организуем подъём и установку в удобное для вас время. Все детали по доставке уточняются при оформлении заказа.',
  },
  {
    q: 'Можно ли вернуть товар?',
    a: 'Да. В течение 14 дней с момента получения вы можете вернуть товар в оригинальной упаковке, если он не был в использовании. Процедура возврата описана в разделе помощи — мы постарались сделать её максимально простой.',
  },
  {
    q: 'Есть ли шоурум, где можно посмотреть вещи вживую?',
    a: 'Наш шоурум находится по адресу Valencia Street 18, San Francisco. Часы работы: вторник–пятница 11:00–19:00, суббота–воскресенье 11:00–17:00. Приходите без записи или пишите нам заранее, если нужна персональная консультация по интерьеру.',
  },
  {
    q: 'Как быстро обновляется ассортимент?',
    a: 'Мы добавляем новые коллекции каждые 4–6 недель. Подпишись на рассылку, чтобы первым узнавать о поступлениях и сезонных подборках — иногда лимитированные серии разбирают за несколько дней.',
  },
];

function FaqEntry({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <FaqItem>
      <FaqQuestion onClick={() => setOpen((prev) => !prev)}>
        {q}
        <FaqChevron $open={open}>▼</FaqChevron>
      </FaqQuestion>
      <FaqAnswer $open={open}>
        <p>{a}</p>
      </FaqAnswer>
    </FaqItem>
  );
}

export default function AboutView() {
  return (
    <>
      {/* Hero */}
      <Section>
        <HeroGrid>
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <Badge>About the brand</Badge>
            <h1>Urban Nest родился как идея сделать спокойный дом новой нормой.</h1>
            <p>
              Мы верим, что пространство влияет на настроение и мышление. Поэтому Urban Nest — это
              не просто магазин мебели, это редакция: каждый товар в каталоге отобран вручную за
              качество материалов, лаконичность формы и долговечность.
            </p>
            <p>
              Бренд основан в 2019 году двумя друзьями, уставшими от безликого масс-маркета. Сегодня
              Urban Nest — это команда из 24 человек, 600+ артикулов в каталоге и шоурум в
              Сан-Франциско.
            </p>
          </div>
          <Visual>
            <Image
              src={STORY_IMAGE}
              alt="Brand story studio"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 960px) 100vw, 50vw"
            />
          </Visual>
        </HeroGrid>
      </Section>

      {/* Stats */}
      <Section $soft>
        <StatsRow>
          <Stat>
            <strong>2019</strong>
            <span>Год основания</span>
          </Stat>
          <Stat>
            <strong>600+</strong>
            <span>Артикулов</span>
          </Stat>
          <Stat>
            <strong>24</strong>
            <span>Человека в команде</span>
          </Stat>
          <Stat>
            <strong>12k+</strong>
            <span>Довольных клиентов</span>
          </Stat>
        </StatsRow>
      </Section>

      {/* Story */}
      <Section>
        <StoryGrid>
          <Visual style={{ minHeight: '440px' }}>
            <Image
              src={EDITORIAL_LOUNGE_IMAGE}
              alt="Editorial lounge"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 960px) 100vw, 50vw"
            />
          </Visual>
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <Badge>Our story</Badge>
            <h2>От идеи до шоурума — пять лет осознанного роста</h2>
            <p>
              В 2019 году Алекс и Мари открыли первый поп-ап на Valencia Street с тремя стеллажами и
              ноутбуком вместо кассы. Уже через полгода вокруг Urban Nest выросло сообщество: люди
              приходили не только за покупками, но и за советом по оформлению пространства.
            </p>
            <p>
              В 2021 году запустили интернет-магазин. В 2023 — открыли постоянный шоурум. Каждый
              этап рос органически, без венчурных инвестиций: только слово уст, хороший продукт и
              уважение к клиентам.
            </p>
          </div>
        </StoryGrid>
      </Section>

      {/* Benefits */}
      <Section $soft>
        <Container>
          <SectionHeading>
            <Badge>Why Urban Nest</Badge>
            <h2>Чем мы отличаемся</h2>
            <p>
              Мы не гонимся за объёмом — мы выбираем глубину. Каждое решение в магазине принято с
              оглядкой на долгосрочное удобство покупателя.
            </p>
          </SectionHeading>
        </Container>
        <BenefitsGrid>
          <BenefitCard>
            <BenefitIcon>✦</BenefitIcon>
            <h3>Ручной отбор</h3>
            <p>
              Каждый товар в каталоге прошёл живой тест: наша команда проверяет качество материала,
              сборки и упаковки перед тем, как артикул попадает на сайт.
            </p>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon>◻</BenefitIcon>
            <h3>Лаконичная эстетика</h3>
            <p>
              Мы работаем только с дизайнерами, которые убирают лишнее, а не добавляют. Форма
              следует за функцией, тектура — за атмосферой.
            </p>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon>↻</BenefitIcon>
            <h3>Осознанное производство</h3>
            <p>
              Приоритет — материалы с сертификатами экологичности, местные производства и бренды с
              прозрачной цепочкой поставок.
            </p>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon>◑</BenefitIcon>
            <h3>Живая поддержка</h3>
            <p>
              Никаких ботов — только реальные люди. Наши консультанты помогут подобрать мебель под
              конкретную комнату или бюджет.
            </p>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon>⊞</BenefitIcon>
            <h3>Гибкий возврат</h3>
            <p>
              14 дней на решение — без лишних вопросов. Мы забираем товар самостоятельно и
              возвращаем деньги в течение 3 рабочих дней.
            </p>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon>♦</BenefitIcon>
            <h3>Дизайн-консультации</h3>
            <p>
              Каждый покупатель может записаться на бесплатную 30-минутную видеосессию с нашим
              интерьерным консультантом.
            </p>
          </BenefitCard>
        </BenefitsGrid>
      </Section>

      {/* Values */}
      <Section>
        <Container>
          <SectionHeading>
            <Badge>Our values</Badge>
            <h2>Ценности, которые нас формируют</h2>
          </SectionHeading>
        </Container>
        <ValuesGrid>
          <ValueCard>
            <h3>Честность</h3>
            <p>
              Мы не скрываем происхождение товаров и не завышаем «скидки». Цены честные, описания —
              точные.
            </p>
          </ValueCard>
          <ValueCard>
            <h3>Долговечность</h3>
            <p>
              Нам интересны предметы, которые живут годами, а не сезонные новинки, улетающие на
              помойку к весне.
            </p>
          </ValueCard>
          <ValueCard>
            <h3>Уважение к пространству</h3>
            <p>
              Дом — это не витрина. Мы помогаем создавать пространство для жизни, а не для
              фотографий.
            </p>
          </ValueCard>
        </ValuesGrid>
      </Section>

      {/* Materials visual */}
      <Section $soft>
        <Container>
          <div
            style={{
              position: 'relative',
              minHeight: '420px',
              borderRadius: '32px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(72,57,47,0.14)',
            }}
          >
            <Image
              src={STUDIO_MATERIALS_IMAGE}
              alt="Studio materials"
              fill
              style={{ objectFit: 'cover' }}
              sizes="100vw"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, rgba(32,26,23,0.55) 0%, rgba(32,26,23,0) 60%)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  padding: 'clamp(2rem, 5vw, 4rem)',
                  display: 'grid',
                  gap: '1rem',
                  maxWidth: '520px',
                }}
              >
                <h2 style={{ color: '#fffaf4', fontFamily: 'var(--font-display)' }}>
                  Материалы, которые говорят сами за себя
                </h2>
                <p style={{ color: 'rgba(255,250,244,0.82)', lineHeight: 1.7 }}>
                  Натуральное дерево, шерсть, лён, камень — мы выбираем то, что становится лучше с
                  возрастом.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <SectionHeading>
            <Badge>FAQ</Badge>
            <h2>Часто задаваемые вопросы</h2>
            <p>
              Не нашли ответ? Напишите нам на странице Контактов — ответим в течение рабочего дня.
            </p>
          </SectionHeading>
          <FaqList>
            {faqData.map((item) => (
              <FaqEntry key={item.q} q={item.q} a={item.a} />
            ))}
          </FaqList>
        </Container>
      </Section>
    </>
  );
}
