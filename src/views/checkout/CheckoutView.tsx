/** Design reminder: checkout should feel reassuring, editorial, and structured like a premium concierge intake form. */
'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { clearCart } from '@/app/store/slices/cartSlice';
import { selectCartTotals } from '@/entities/cart/model/selectors';
import {
  CheckoutFieldName,
  CheckoutFormErrors,
  CheckoutFormValues,
  initialCheckoutValues,
  validateCheckoutField,
  validateCheckoutForm,
} from '@/features/checkout/model/validation';
import { routes } from '@/shared/config/routes';
import { formatPrice } from '@/shared/lib/formatPrice';
import Container from '@/shared/ui/Container';
import EmptyState from '@/shared/ui/EmptyState';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';

const Shell = styled(Container)`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) 360px;
  gap: 1.5rem;
  padding-block: 2rem 4rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const FormCard = styled.section`
  display: grid;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const HeaderBlock = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const Eyebrow = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.78rem;
`;

const Section = styled.section`
  display: grid;
  gap: 1rem;
`;

const SectionTitle = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: grid;
  gap: 0.45rem;
`;

const FieldLabel = styled.span`
  font-size: 0.92rem;
  font-weight: 600;
`;

const Hint = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.82rem;
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.82rem;
`;

const StyledTextarea = styled.textarea<{ $invalid?: boolean }>`
  width: 100%;
  min-height: 120px;
  resize: vertical;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.border)};
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.95rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 180ms ease, box-shadow 180ms ease;

  &:focus {
    outline: none;
    border-color: ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.accent)};
    box-shadow: 0 0 0 4px rgba(85, 107, 93, 0.12);
  }
`;

const StyledInput = styled(Input)<{ $invalid?: boolean }>`
  border-color: ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.border)};

  &:focus {
    border-color: ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.accent)};
    box-shadow: ${({ $invalid }) => ($invalid ? '0 0 0 4px rgba(180, 74, 74, 0.12)' : '0 0 0 4px rgba(85, 107, 93, 0.12)')};
  }
`;

const Sidebar = styled.aside`
  display: grid;
  gap: 1rem;
  align-content: start;
`;

const SummaryCard = styled.section`
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  position: sticky;
  top: 96px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
`;

const SuccessCard = styled(Container)`
  display: grid;
  gap: 1.25rem;
  padding-block: 2.5rem 4rem;
`;

const SuccessPanel = styled.section`
  display: grid;
  gap: 1rem;
  max-width: 760px;
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const GhostLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0.85rem 1.25rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  background: ${({ theme }) => theme.colors.surfaceAlt};
`;

function FieldControl({
  label,
  name,
  value,
  error,
  hint,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
}: {
  label: string;
  name: CheckoutFieldName;
  value: string;
  error?: string;
  hint?: string;
  type?: string;
  placeholder?: string;
  onChange: (name: CheckoutFieldName, value: string) => void;
  onBlur: (name: CheckoutFieldName, value: string) => void;
}) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <StyledInput
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        $invalid={Boolean(error)}
        onChange={(event) => onChange(name, event.target.value)}
        onBlur={(event) => onBlur(name, event.target.value)}
      />
      {error ? <ErrorText>{error}</ErrorText> : hint ? <Hint>{hint}</Hint> : null}
    </Field>
  );
}

export default function CheckoutView() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const totals = useAppSelector(selectCartTotals);

  const [values, setValues] = useState<CheckoutFormValues>(initialCheckoutValues);
  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [submittedOrder, setSubmittedOrder] = useState<CheckoutFormValues | null>(null);

  const primaryItem = useMemo(() => items[0], [items]);

  const updateField = (name: CheckoutFieldName, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const nextError = validateCheckoutField(name, value);
      return { ...current, [name]: nextError || undefined };
    });
  };

  const handleBlur = (name: CheckoutFieldName, value: string) => {
    const nextError = validateCheckoutField(name, value);
    setErrors((current) => ({ ...current, [name]: nextError || undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateCheckoutForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmittedOrder(values);
    dispatch(clearCart());
  };

  if (submittedOrder) {
    return (
      <SuccessCard>
        <SuccessPanel>
          <Eyebrow>Order confirmed</Eyebrow>
          <h1>Спасибо, заказ оформлен.</h1>
          <p>
            Мы сохранили контактные данные для подтверждения и доставим заказ по адресу{' '}
            <strong>
              {submittedOrder.city}, {submittedOrder.street}, {submittedOrder.house}
              {submittedOrder.apartment ? `, кв. ${submittedOrder.apartment}` : ''}
            </strong>
            . Письмо с подтверждением будет отправлено на <strong>{submittedOrder.email}</strong>.
          </p>
          <SummaryCard as="div" style={{ position: 'static', top: 'auto' }}>
            <SummaryRow>
              <span>Получатель</span>
              <strong>{submittedOrder.fullName}</strong>
            </SummaryRow>
            <SummaryRow>
              <span>Телефон</span>
              <strong>{submittedOrder.phone}</strong>
            </SummaryRow>
            <SummaryRow>
              <span>Итог заказа</span>
              <strong>{formatPrice(totals.total)}</strong>
            </SummaryRow>
          </SummaryCard>
          <ActionRow>
            <GhostLink href={routes.catalog}>Вернуться в каталог</GhostLink>
            <GhostLink href={routes.home}>На главную</GhostLink>
          </ActionRow>
        </SuccessPanel>
      </SuccessCard>
    );
  }

  if (!items.length) {
    return (
      <Container style={{ paddingBlock: '3rem' }}>
        <EmptyState
          title="Оформлять пока нечего"
          description="Сначала добавь товары в корзину, а затем вернись к checkout-форме для заполнения контактов и адреса доставки."
          href={routes.catalog}
          action="Открыть каталог"
        />
      </Container>
    );
  }

  return (
    <Shell>
      <FormCard as="form" onSubmit={handleSubmit} noValidate>
        <HeaderBlock>
          <Eyebrow>Checkout</Eyebrow>
          <h1>Оформление заказа</h1>
          <p>
            Заполни контактную информацию и адрес доставки. Валидация подскажет, если какое-то поле
            пропущено или введено в неверном формате.
          </p>
        </HeaderBlock>

        <Section>
          <SectionTitle>
            <h2>Контактная информация</h2>
            <p>Эти данные нужны для подтверждения заказа и связи с получателем.</p>
          </SectionTitle>
          <FieldsGrid>
            <FieldControl
              label="Имя и фамилия"
              name="fullName"
              value={values.fullName}
              error={errors.fullName}
              placeholder="Например, Анна Смирнова"
              onChange={updateField}
              onBlur={handleBlur}
            />
            <FieldControl
              label="Email"
              name="email"
              type="email"
              value={values.email}
              error={errors.email}
              placeholder="anna@example.com"
              onChange={updateField}
              onBlur={handleBlur}
            />
            <FieldControl
              label="Телефон"
              name="phone"
              type="tel"
              value={values.phone}
              error={errors.phone}
              placeholder="+7 (999) 123-45-67"
              hint="Минимум 10 цифр, можно вводить с пробелами и символами."
              onChange={updateField}
              onBlur={handleBlur}
            />
          </FieldsGrid>
        </Section>

        <Section>
          <SectionTitle>
            <h2>Адрес доставки</h2>
            <p>Укажи полный адрес, чтобы заказ можно было передать в доставку без уточнений.</p>
          </SectionTitle>
          <FieldsGrid>
            <FieldControl
              label="Город"
              name="city"
              value={values.city}
              error={errors.city}
              placeholder="Москва"
              onChange={updateField}
              onBlur={handleBlur}
            />
            <FieldControl
              label="Почтовый индекс"
              name="postalCode"
              value={values.postalCode}
              error={errors.postalCode}
              placeholder="101000"
              onChange={updateField}
              onBlur={handleBlur}
            />
            <FieldControl
              label="Улица"
              name="street"
              value={values.street}
              error={errors.street}
              placeholder="Большая Никитская"
              onChange={updateField}
              onBlur={handleBlur}
            />
            <FieldControl
              label="Дом"
              name="house"
              value={values.house}
              error={errors.house}
              placeholder="12Б"
              onChange={updateField}
              onBlur={handleBlur}
            />
            <FieldControl
              label="Квартира / офис"
              name="apartment"
              value={values.apartment}
              error={errors.apartment}
              placeholder="34"
              hint="Поле необязательное, но помогает избежать уточняющих звонков."
              onChange={updateField}
              onBlur={handleBlur}
            />
          </FieldsGrid>
          <Field>
            <FieldLabel>Комментарий к заказу</FieldLabel>
            <StyledTextarea
              name="comment"
              value={values.comment}
              $invalid={Boolean(errors.comment)}
              placeholder="Например, код домофона, удобный интервал доставки или просьба позвонить заранее."
              onChange={(event) => updateField('comment', event.target.value)}
              onBlur={(event) => handleBlur('comment', event.target.value)}
            />
            {errors.comment ? <ErrorText>{errors.comment}</ErrorText> : <Hint>Необязательное поле.</Hint>}
          </Field>
        </Section>

        <ActionRow>
          <Button type="submit">Подтвердить заказ</Button>
          <GhostLink href={routes.cart}>Вернуться в корзину</GhostLink>
        </ActionRow>
      </FormCard>

      <Sidebar>
        <SummaryCard>
          <h3>Сводка заказа</h3>
          <SummaryRow>
            <span>Позиций</span>
            <strong>{totals.totalItems}</strong>
          </SummaryRow>
          <SummaryRow>
            <span>Товаров всего</span>
            <strong>{totals.totalQuantity}</strong>
          </SummaryRow>
          <Divider />
          <SummaryRow>
            <span>Subtotal</span>
            <strong>{formatPrice(totals.subtotal)}</strong>
          </SummaryRow>
          <SummaryRow>
            <span>Доставка</span>
            <strong>{formatPrice(totals.delivery)}</strong>
          </SummaryRow>
          <SummaryRow>
            <span>Итог</span>
            <strong>{formatPrice(totals.total)}</strong>
          </SummaryRow>
          {primaryItem ? (
            <Hint>
              Первый товар в заказе: <strong>{primaryItem.title}</strong>. Остальные позиции и количество уже
              учтены в totals.
            </Hint>
          ) : null}
        </SummaryCard>
      </Sidebar>
    </Shell>
  );
}
