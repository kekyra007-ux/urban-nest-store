/** Design reminder: validation should feel supportive and calm, guiding the user toward completion without abrupt friction. */
export interface CheckoutFormValues {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  postalCode: string;
  comment: string;
}

export type CheckoutFieldName = keyof CheckoutFormValues;
export type CheckoutFormErrors = Partial<Record<CheckoutFieldName, string>>;

export const initialCheckoutValues: CheckoutFormValues = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  street: '',
  house: '',
  apartment: '',
  postalCode: '',
  comment: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneDigitsPattern = /\d/g;
const postalCodePattern = /^[0-9A-Za-z\-\s]{4,10}$/;

export function validateCheckoutField(name: CheckoutFieldName, rawValue: string): string {
  const value = rawValue.trim();

  switch (name) {
    case 'fullName':
      if (!value) return 'Укажи имя и фамилию.';
      if (value.length < 4) return 'Имя должно содержать не меньше 4 символов.';
      return '';
    case 'email':
      if (!value) return 'Укажи email для подтверждения заказа.';
      if (!emailPattern.test(value)) return 'Введи корректный email.';
      return '';
    case 'phone': {
      if (!value) return 'Укажи номер телефона.';
      const digits = value.match(phoneDigitsPattern)?.length ?? 0;
      if (digits < 10) return 'Телефон должен содержать минимум 10 цифр.';
      return '';
    }
    case 'city':
      if (!value) return 'Укажи город доставки.';
      return '';
    case 'street':
      if (!value) return 'Укажи улицу.';
      if (value.length < 3) return 'Название улицы слишком короткое.';
      return '';
    case 'house':
      if (!value) return 'Укажи дом.';
      return '';
    case 'postalCode':
      if (!value) return 'Укажи почтовый индекс.';
      if (!postalCodePattern.test(value)) return 'Индекс должен содержать от 4 до 10 символов.';
      return '';
    case 'apartment':
    case 'comment':
      return '';
    default:
      return '';
  }
}

export function validateCheckoutForm(values: CheckoutFormValues): CheckoutFormErrors {
  const fields = Object.keys(values) as CheckoutFieldName[];

  return fields.reduce<CheckoutFormErrors>((acc, field) => {
    const error = validateCheckoutField(field, values[field]);

    if (error) {
      acc[field] = error;
    }

    return acc;
  }, {});
}
