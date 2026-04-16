/** Design reminder: the contacts page should turn basic forms into a calm branded interaction. */
'use client';

import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import Button from '@/shared/ui/Button';
import Container from '@/shared/ui/Container';
import Input from '@/shared/ui/Input';
import Section from '@/shared/ui/Section';
import Badge from '@/shared/ui/Badge';

/* ── Layout ── */

const HeroGrid = styled(Container)`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 0.9fr 1.1fr;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  display: grid;
  gap: 1.25rem;
  padding: 1.75rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

/* ── Contact info ── */

const ContactItem = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accentSoft};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const ContactText = styled.div`
  display: grid;
  gap: 0.2rem;

  strong {
    font-size: 0.88rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  span {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

/* ── Hours ── */

const HoursGrid = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const HoursRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  span:first-child {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.9rem;
  }

  span:last-child {
    font-weight: 600;
    font-size: 0.9rem;
  }
`;

/* ── Social ── */

const SocialRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 180ms ease, transform 180ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: #fff;
    transform: translateY(-2px);
  }
`;

/* ── Form ── */

const FormCard = styled(Card).attrs({ as: 'form' })``;

const FieldGroup = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const Label = styled.label`
  display: grid;
  gap: 0.4rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const Textarea = styled.textarea`
  min-height: 160px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  transition: border-color 180ms ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const StatusMessage = styled.p<{ $success?: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $success, theme }) => ($success ? theme.colors.accentSoft : 'rgba(184, 91, 79, 0.1)')};
  color: ${({ $success, theme }) => ($success ? theme.colors.success : theme.colors.danger)};
  font-size: 0.9rem;
`;

/* ── Map placeholder ── */

const MapBlock = styled(Container)``;

const MapPlaceholder = styled.div`
  min-height: 320px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accentSoft} 0%, ${({ theme }) => theme.colors.surfaceAlt} 100%);
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
`;

export default function ContactsView() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const subject = String(formData.get('subject') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    if (!name || !email || !message) {
      setStatus('error');
      setErrorMsg('Пожалуйста, заполни имя, email и текст сообщения.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMsg('Укажи корректный email-адрес.');
      return;
    }

    void subject;
    setStatus('success');
    event.currentTarget.reset();
  };

  return (
    <>
      <Section>
        <Container style={{ display: 'grid', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Badge>Get in touch</Badge>
          <h1>Контакты</h1>
          <p style={{ maxWidth: '44rem', color: 'var(--text-muted)' }}>
            Есть вопрос о товаре, заказе или хочешь записаться на консультацию по интерьеру?
            Мы на связи — выбери удобный способ.
          </p>
        </Container>
        <HeroGrid>
          {/* Info card */}
          <Card>
            <h2 style={{ fontSize: '1.35rem' }}>Как нас найти</h2>

            <ContactItem>
              <ContactIcon>📍</ContactIcon>
              <ContactText>
                <strong>Адрес шоурума</strong>
                <span>18 Valencia Street, San Francisco, CA 94103</span>
              </ContactText>
            </ContactItem>

            <ContactItem>
              <ContactIcon>✉</ContactIcon>
              <ContactText>
                <strong>Email</strong>
                <span>hello@urbannest.store</span>
              </ContactText>
            </ContactItem>

            <ContactItem>
              <ContactIcon>☎</ContactIcon>
              <ContactText>
                <strong>Телефон</strong>
                <span>+1 (415) 555-0192</span>
              </ContactText>
            </ContactItem>

            <div style={{ borderTop: '1px solid rgba(32,26,23,0.12)', paddingTop: '1rem' }}>
              <p style={{ fontSize: '0.88rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', color: 'rgba(109,98,89,1)' }}>Часы работы</p>
              <HoursGrid>
                <HoursRow><span>Понедельник</span><span>Выходной</span></HoursRow>
                <HoursRow><span>Вт — Пт</span><span>11:00 — 19:00</span></HoursRow>
                <HoursRow><span>Суббота</span><span>11:00 — 18:00</span></HoursRow>
                <HoursRow><span>Воскресенье</span><span>12:00 — 17:00</span></HoursRow>
              </HoursGrid>
            </div>

            <div style={{ borderTop: '1px solid rgba(32,26,23,0.12)', paddingTop: '1rem' }}>
              <p style={{ fontSize: '0.88rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', color: 'rgba(109,98,89,1)' }}>Мы в соцсетях</p>
              <SocialRow>
                <SocialLink href="#" aria-label="Instagram">▪ Instagram</SocialLink>
                <SocialLink href="#" aria-label="Pinterest">▪ Pinterest</SocialLink>
                <SocialLink href="#" aria-label="TikTok">▪ TikTok</SocialLink>
                <SocialLink href="#" aria-label="YouTube">▪ YouTube</SocialLink>
              </SocialRow>
            </div>
          </Card>

          {/* Form card */}
          <FormCard onSubmit={handleSubmit}>
            <h2 style={{ fontSize: '1.35rem' }}>Написать нам</h2>
            <FieldGroup>
              <Label>
                Имя
                <Input name="name" placeholder="Как к тебе обращаться?" />
              </Label>
              <Label>
                Email
                <Input name="email" type="email" placeholder="your@email.com" />
              </Label>
              <Label>
                Тема
                <Input name="subject" placeholder="Вопрос о товаре, доставке, возврате…" />
              </Label>
              <Label>
                Сообщение
                <Textarea name="message" placeholder="Расскажи, чем мы можем помочь?" />
              </Label>
            </FieldGroup>
            <Button type="submit">Отправить сообщение</Button>
            {status === 'success' ? (
              <StatusMessage $success>Сообщение отправлено. Ответим в течение рабочего дня!</StatusMessage>
            ) : status === 'error' ? (
              <StatusMessage>{errorMsg}</StatusMessage>
            ) : null}
          </FormCard>
        </HeroGrid>
      </Section>

      {/* Map */}
      <Section $soft>
        <MapBlock>
          <MapPlaceholder>
            <span style={{ fontSize: '2rem' }}>📍</span>
            <strong>18 Valencia Street, San Francisco</strong>
            <span>Здесь будет интерактивная карта</span>
          </MapPlaceholder>
        </MapBlock>
      </Section>
    </>
  );
}
