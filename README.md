# Urban Nest Store

Многостраничный e-commerce фронтенд проект, демонстрирующий frontend-архитектуру на современном стеке. Проект моделирует полноценный интернет-магазин мебели и декора с редакционной визуальной подачей в стиле Warm Scandinavian.

🔗 **Live demo:** [urban-nest-store-786.netlify.app](https://urban-nest-store-786.netlify.app)

---

## Стек

| Слой              | Технология                                 |
| ----------------- | ------------------------------------------ |
| Фреймворк         | Next.js 15 (App Router)                    |
| UI-библиотека     | React 19                                   |
| Язык              | TypeScript 5 (strict mode)                 |
| Стилизация        | styled-components 6                        |
| Состояние         | Redux Toolkit 2 + `createAsyncThunk`       |
| Данные            | DummyJSON Products REST API                |
| Персистентность   | localStorage (корзина, избранное, фильтры) |
| Пакетный менеджер | pnpm                                       |

---

## Запуск

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production-сборка
pnpm typecheck  # строгая проверка типов
pnpm lint       # ESLint + Prettier
```

---

## Архитектура

Проект следует **Feature-Sliced Design (FSD)** — методологии, которая делит кодовую базу на слои с явными правилами зависимостей. Каждый слой знает только о слоях ниже себя.

```
src/
├── app/                   # Next.js App Router: маршруты, провайдеры, Redux store
│   ├── store/
│   │   ├── slices/        # catalogSlice, cartSlice, wishlistSlice, productSlice, uiSlice
│   │   ├── selectors.ts   # мемоизированные селекторы (filtered, paginated, featured)
│   │   └── hooks.ts       # типизированные useAppDispatch / useAppSelector
│   └── providers/
│       └── Providers.tsx  # Redux + ThemeProvider + StoreSync (localStorage hydration)
│
├── entities/              # Доменные сущности: Product, Cart
│   ├── product/
│   │   ├── model/         # типы, mapProduct-нормализатор
│   │   └── ui/            # ProductCard, ProductGallery, ProductPrice
│   └── cart/
│       └── model/         # типы CartItem, selectors (totals)
│
├── features/              # Изолированные user actions
│   ├── add-to-cart/       # AddToCartButton (feedback-состояние, toast, drawer)
│   ├── toggle-wishlist/   # WishlistToggleButton (heartbeat-анимация, toast)
│   ├── change-quantity/   # QuantityControl
│   ├── search-products/   # SearchBar с debounce
│   ├── sort-products/     # SortSelect
│   └── filters/           # FiltersSidebar (desktop + mobile)
│
├── widgets/               # Составные блоки, не привязанные к маршруту
│   ├── Header/            # sticky nav, usePathname, pill-active, mobile hamburger
│   ├── Footer/
│   ├── Hero/              # landing hero section
│   ├── CatalogGrid/       # grid + структурированный skeleton loader
│   ├── CartDrawer/        # slide-in панель корзины
│   ├── CartSummary/       # сайдбар с итогами заказа
│   ├── Toaster/           # toast-очередь с прогресс-баром
│   ├── RelatedProducts/
│   ├── CategoryStrip/
│   ├── Benefits/
│   └── Newsletter/
│
├── views/                 # Page-level view: оркестрирует виджеты и фичи
│   ├── home/HomeView.tsx
│   ├── catalog/CatalogView.tsx
│   ├── product/ProductDetailsView.tsx
│   ├── cart/CartView.tsx
│   ├── wishlist/WishlistView.tsx
│   ├── about/AboutView.tsx
│   ├── contacts/ContactsView.tsx
│   └── checkout/CheckoutView.tsx
│
└── shared/                # Переиспользуемые примитивы без бизнес-логики
    ├── ui/                # Button, Input, Badge, Container, Section,
    │                      # EmptyState, Pagination, PageLoader
    ├── api/               # fetchJson-клиент, productsApi
    ├── config/            # routes.ts, constants.ts
    ├── lib/               # debounce, formatPrice, storage
    └── styles/            # theme.ts, GlobalStyles, styled.d.ts
```

### Принципы зависимостей

- `app` → все слои
- `views` → `widgets`, `features`, `entities`, `shared`
- `widgets` → `features`, `entities`, `shared`
- `features` → `entities`, `shared`
- `entities` → `shared`
- `shared` → ничего выше

---

## Redux Store

Пять слайсов, каждый отвечает за свою область:

| Слайс           | Зона ответственности                                         |
| --------------- | ------------------------------------------------------------ |
| `catalogSlice`  | список товаров, категории, фильтры, сортировка, пагинация    |
| `productSlice`  | текущий товар, related products, async статусы               |
| `cartSlice`     | позиции, количество, добавление/удаление                     |
| `wishlistSlice` | массив ID избранных товаров                                  |
| `uiSlice`       | mobile menu, filters panel, toast-очередь, cart drawer state |

**Персистентность через `StoreSync`** — компонент внутри `Providers.tsx`, который при монтировании читает данные из localStorage (`cart`, `wishlist`, `catalogPrefs`) и диспатчит hydrate-экшены, а при изменениях синхронизирует state обратно через `useEffect`.

**Мемоизированные селекторы** в `selectors.ts`:

- `selectFilteredProducts` — фильтрация + сортировка
- `selectPaginatedProducts` — slice для текущей страницы
- `selectCatalogMeta` — totalPages, currentPage, total
- `selectFeaturedProducts` / `selectNewArrivals` — для главной страницы
- `selectWishlistProducts` — пересечение wishlist IDs с каталогом

---

## Страницы

| Маршрут         | Описание                                                           |
| --------------- | ------------------------------------------------------------------ |
| `/`             | Лендинг: hero, benefits, editorial-блоки, каталожные подборки      |
| `/catalog`      | Каталог с поиском, фильтрами по категории, сортировкой, пагинацией |
| `/product/[id]` | Динамическая карточка: галерея, цена, в корзину, related products  |
| `/cart`         | Корзина: quantity controls, итоговые суммы, удаление               |
| `/wishlist`     | Избранное с persist через localStorage                             |
| `/checkout`     | Форма оформления заказа с валидацией                               |
| `/about`        | История бренда, преимущества, ценности, FAQ-аккордеон              |
| `/contacts`     | Форма обратной связи, часы работы, соцсети, карта                  |

---

## Ключевые технические решения

### Каталог

- Поиск реализован через `SearchBar` с **debounce 280ms** — запрос в Redux диспатчится только после паузы в наборе
- Все параметры (поиск, категория, сортировка, страница, размер страницы) **синхронизированы с URL** через `useSearchParams` / `router.replace` — страница bookmarkable и share-able
- `useSearchParams` обёрнут в `<Suspense>` на уровне `catalog/page.tsx` — требование Next.js App Router

### Skeleton Loaders

- `CatalogGrid` показывает 8 карточек-скелетонов, которые структурно повторяют `ProductCard`: блок изображения, строки названия/описания, цена, кнопка
- `ProductDetailsView` показывает полный скелетон макета: галерея слева, контентная колонка справа с info-карточками
- Shimmer-анимация через `keyframes` + `css` тег из styled-components (корректная работа в v6)

### Toast-система

- Очередь тостов хранится в `uiSlice.toasts[]`
- `Toaster` — виджет, смонтированный в root layout, рендерит fixed-positioned стек
- Типы: `cart`, `wishlist-add`, `wishlist-remove`, `remove`, `success`, `error` — у каждого свой цвет и иконка
- Авто-закрытие через `setTimeout` в самом компоненте тоста, визуальный прогресс-бар

### Cart Drawer

- `CartDrawer` — slide-in панель из `position: fixed`, анимация через `cubic-bezier(0.22, 1, 0.36, 1)`
- Открывается автоматически при добавлении товара в корзину
- Авто-закрытие через 6 секунд (зелёный прогресс-бар вверху)
- Блокирует скролл страницы (`document.body.style.overflow = 'hidden'`) пока открыт

### Micro-interactions

- `AddToCartButton` — при клике переходит в состояние `✓ Добавлено` с зелёным фоном на 1.6 секунды, кнопка disabled на это время
- `WishlistToggleButton` — CSS heartbeat-анимация при каждом клике, управляется через `.classList` для рестарта анимации
- Оба компонента диспатчат соответствующий toast и (для корзины) открывают drawer

### Page Loader

- Статический `<div id="__page-loader">` встроен в HTML в `layout.tsx` — виден до загрузки любого JS
- Стили в `globals.css` (не styled-components) — гарантированно применяются до гидрации
- Клиентский компонент `PageLoaderDismiss` убирает оверлей через 120ms после монтирования React
- Решает проблему flash of unstyled content при первой загрузке

### Header

- `usePathname()` из `next/navigation` вместо `window.location.pathname` — реактивен к навигации, работает на сервере
- Активный пункт меню: pill-фон + зелёная точка; `isActive()` обрабатывает вложенные пути (`/catalog/...`)
- Wishlist и корзина — отдельные icon-кнопки с badge-счётчиками
- Hamburger с CSS-анимацией трёх полосок в крест (`transform` + `opacity`)
- Мобильное меню: `scaleY` + `opacity` transition, `visibility` для accessibility

### SEO

- `generateMetadata` / статический `metadata` на каждой странице
- `title.template: '%s | Urban Nest Store'` в root layout
- Open Graph + Twitter Card с уникальными изображениями для каждого маршрута

### Styled-components в Next.js App Router

- `compiler: { styledComponents: true }` в `next.config.mjs` — SSR-инъекция стилей без FOUC
- Темизация через `ThemeProvider` + типизированный `DefaultTheme` в `styled.d.ts`
- `createGlobalStyle` для базовых CSS-сбросов и глобальных правил
- `keyframes` + `css` тег для корректных анимаций внутри styled-компонентов

---

## UI-система

Тема в `shared/styles/theme.ts` определяет дизайн-токены:

```
colors     — background, surface, text, textMuted, accent, border, success, danger
radii      — sm (12px) → xl (40px) → pill (999px)
spacing    — xs / sm / md / lg / xl / xxl
shadows    — soft / card / lifted
fonts      — display (Fraunces) / body (Manrope)
breakpoints— sm / md / lg / xl
```

Базовые UI-примитивы (`shared/ui/`):

- **Button** — варианты `primary`, `secondary`, `ghost`; пропс `$full` для ширины 100%
- **EmptyState** — иконка + заголовок + описание + опциональные `onRetry` и `href/action`
- **Pagination** — постраничная навигация с ellipsis
- **Badge** — лейбл-тег для категорий и editorial-меток
- **Container** / **Section** — layout-обёртки с `max-width` и вертикальным ритмом

---

## Error / Empty / Loading States

Каждый значимый сценарий отработан:

| Сценарий                       | Реализация                                              |
| ------------------------------ | ------------------------------------------------------- |
| Загрузка каталога              | 8 структурных skeleton-карточек                         |
| Загрузка товара                | skeleton-макет страницы (галерея + контент)             |
| Ошибка загрузки каталога       | EmptyState с кнопкой «Попробовать снова» + retry action |
| Ошибка загрузки товара         | EmptyState + retry + ссылка в каталог                   |
| Пустой поиск / нет результатов | EmptyState с кнопкой сброса фильтров                    |
| Пустая корзина                 | EmptyState с иконкой и ссылкой в каталог                |
| Пустой wishlist                | EmptyState с призывом добавить товары                   |

---

## Структура данных

Данные поступают из **DummyJSON Products API** и нормализуются через `mapProduct()` в `entities/product/model/`. Поля типа `availabilityStatus`, `shippingInformation`, `warrantyInformation`, `reviews` опциональны — компоненты показывают fallback-значения.

`CartItem` — намеренно уплощённая структура (id, title, price, thumbnail, category, brand, quantity), не зависящая от полного `Product`. Это позволяет корзине работать автономно без загрузки каталога.
