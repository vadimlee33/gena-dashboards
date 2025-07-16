# Архитектура приложения Gena Dashboards

## Обзор приложения

Gena Dashboards - это Next.js приложение для создания и управления интерактивными дашбордами с различными типами графиков (столбчатые, линейные, числовые). Приложение использует React, TypeScript, TailwindCSS, Recharts для визуализации данных и JSON Server для бэкенда.

### Технологический стек
- **Frontend**: Next.js 14, React, TypeScript
- **Стилизация**: TailwindCSS
- **Графики**: Recharts
- **Управление состоянием**: Zustand
- **Формы**: React Hook Form
- **Backend**: JSON Server
- **Drag & Drop**: React Beautiful DnD
- **Иконки**: Lucide React

## Структура проекта

```
src/
├── app/                    # Next.js App Router (страницы и API)
│   ├── api/               # Backend API endpoints
│   │   ├── chart-data/    # API для данных графиков
│   │   ├── charts/        # API для управления графиками
│   │   ├── dashboards/    # API для управления дашбордами
│   │   ├── data/          # API для получения данных
│   │   └── docs/          # API документация
│   ├── dashboard/         # Страницы дашбордов
│   ├── api-docs/          # Страница документации API
│   ├── layout.tsx         # Корневой layout
│   └── page.tsx           # Главная страница
├── components/            # React компоненты
│   ├── ui/               # Базовые UI компоненты
│   │   ├── avatar.tsx    # Компонент аватара
│   │   ├── badge.tsx     # Компонент бейджа
│   │   ├── button.tsx    # Компонент кнопки
│   │   ├── card.tsx      # Компонент карточки
│   │   ├── header.tsx    # Компонент заголовка
│   │   ├── input.tsx     # Компонент ввода
│   │   ├── modal.tsx     # Компонент модального окна
│   │   └── test-tailwind.tsx # Тестовый компонент
│   ├── charts/           # Компоненты графиков
│   │   ├── bar-chart.tsx     # Столбчатый график
│   │   ├── line-chart.tsx    # Линейный график
│   │   ├── number-chart.tsx  # Числовой график
│   │   ├── chart-config-modal.tsx # Модальное окно настройки
│   │   └── chart-wrapper.tsx # Обертка для графиков
│   ├── dashboard/        # Компоненты дашбордов
│   │   ├── dashboard-card.tsx    # Карточка дашборда
│   │   ├── dashboard-list.tsx    # Список дашбордов
│   │   └── dashboard-view.tsx    # Просмотр дашборда
│   └── layout/           # Компоненты макета
│       └── main-layout.tsx       # Основной макет
├── features/             # Feature-based архитектура
│   ├── dashboard/        # Dashboard feature
│   │   ├── types.ts      # Типы данных дашбордов
│   │   └── hooks/        # Custom hooks для логики
│   │       └── use-dashboards.ts # Хук для управления дашбордами
│   └── charts/           # Charts feature
│       └── hooks/        # Custom hooks для charts
│           └── use-chart-modal.ts # Хук для модального окна графиков
├── services/             # Backend сервисы
│   └── api/              # API клиенты
│       └── dashboard-service.ts  # Сервис для работы с дашбордами
└── lib/                  # Утилиты и конфигурации
    ├── data/             # Данные
    │   └── mock-data.ts  # Моковые данные
    ├── styles/           # Стили
    │   ├── component-styles.ts   # Стили компонентов
    │   ├── design-system.ts      # Дизайн-система
    │   └── index.ts              # Экспорт стилей
    ├── types/            # TypeScript типы
    │   └── api.ts        # Типы API
    └── utils/            # Утилиты
        ├── api.ts        # Утилиты для API
        ├── id-generator.ts       # Генератор ID
        └── json-server.ts        # Утилиты для JSON Server
```

## API Endpoints

### Dashboards API
- `GET /api/dashboards` - Получить список дашбордов
- `GET /api/dashboards/:id` - Получить конкретный дашборд
- `POST /api/dashboards` - Создать дашборд
- `PUT /api/dashboards/:id` - Обновить дашборд
- `DELETE /api/dashboards/:id` - Удалить дашборд

### Charts API
- `GET /api/charts` - Получить список графиков
- `GET /api/charts/:id` - Получить конкретный график
- `POST /api/charts` - Создать график
- `PUT /api/charts/:id` - Обновить график
- `DELETE /api/charts/:id` - Удалить график
- `PATCH /api/dashboards/:id/charts/reorder` - Изменить порядок графиков

### Chart Data API
- `GET /api/chart-data` - Получить данные графиков
- `POST /api/chart-data` - Создать данные графиков
- `PUT /api/chart-data` - Обновить данные графиков

### Data API
- `GET /api/data/:endpoint` - Получить данные по endpoint

## Структура данных

### Dashboard
```typescript
interface Dashboard {
  id: string;
  name: string;
  description?: string;
  charts: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Chart
```typescript
interface Chart {
  id: string;
  dashboardId: string;
  type: 'bar' | 'line' | 'number';
  title: string;
  description?: string;
  dataEndpoint: string;
  order: number;
  config: ChartConfig;
  createdAt: Date;
  updatedAt: Date;
}
```

### Chart Data
```typescript
interface ChartData {
  labels: string[];
  values: number[];
}

interface NumberChartData {
  value: number;
  label?: string;
  unit?: string;
}
```

## Компоненты и их назначение

### UI Components (`src/components/ui/`)
- **Button**: Переиспользуемая кнопка с различными вариантами
- **Card**: Карточка для отображения контента
- **Modal**: Модальное окно для форм и диалогов
- **Input**: Поле ввода с валидацией
- **Badge**: Бейдж для статусов и меток
- **Avatar**: Компонент аватара пользователя
- **Header**: Заголовок приложения

### Chart Components (`src/components/charts/`)
- **BarChart**: Столбчатый график с настройками
- **LineChart**: Линейный график с анимацией
- **NumberChart**: Числовой индикатор с форматированием
- **ChartWrapper**: Обертка для всех типов графиков
- **ChartConfigModal**: Модальное окно настройки графиков

### Dashboard Components (`src/components/dashboard/`)
- **DashboardCard**: Карточка дашборда в списке
- **DashboardList**: Список всех дашбордов
- **DashboardView**: Просмотр конкретного дашборда с графиками

### Layout Components (`src/components/layout/`)
- **MainLayout**: Основной макет приложения

## Features (Функциональные модули)

### Dashboard Feature (`src/features/dashboard/`)
- **types.ts**: Типы данных для дашбордов
- **hooks/use-dashboards.ts**: Хук для управления дашбордами

### Charts Feature (`src/features/charts/`)
- **hooks/use-chart-modal.ts**: Хук для управления модальным окном графиков

## Services (Сервисы)

### API Services (`src/services/api/`)
- **dashboard-service.ts**: Сервис для работы с API дашбордов

## Lib (Библиотеки и утилиты)

### Data (`src/lib/data/`)
- **mock-data.ts**: Моковые данные для разработки

### Styles (`src/lib/styles/`)
- **component-styles.ts**: Предопределенные стили компонентов
- **design-system.ts**: Дизайн-система с цветами и типографикой
- **index.ts**: Экспорт всех стилей

### Types (`src/lib/types/`)
- **api.ts**: Типы для API запросов и ответов

### Utils (`src/lib/utils/`)
- **api.ts**: Утилиты для работы с API
- **id-generator.ts**: Генератор уникальных ID
- **json-server.ts**: Утилиты для работы с JSON Server

## API Routes (Маршруты API)

### Dashboard Routes (`src/app/api/dashboards/`)
- **route.ts**: Основные операции с дашбордами
- **[id]/route.ts**: Операции с конкретным дашбордом
- **[id]/charts/reorder/route.ts**: Изменение порядка графиков

### Chart Routes (`src/app/api/charts/`)
- **route.ts**: Основные операции с графиками
- **[id]/route.ts**: Операции с конкретным графиком

### Data Routes (`src/app/api/data/`)
- **[endpoint]/route.ts**: Получение данных по endpoint

### Chart Data Routes (`src/app/api/chart-data/`)
- **route.ts**: Управление данными графиков

### Documentation Routes (`src/app/api/docs/`)
- **route.ts**: API документация

## Страницы приложения

### Главная страница (`src/app/page.tsx`)
- Список всех дашбордов
- Создание нового дашборда
- Навигация по приложению

### Страница дашборда (`src/app/dashboard/[id]/page.tsx`)
- Просмотр конкретного дашборда
- Управление графиками
- Drag & Drop функциональность

### API документация (`src/app/api-docs/page.tsx`)
- Интерактивная документация API
- Swagger UI интерфейс

## Конфигурационные файлы

### TailwindCSS (`tailwind.config.js`)
- Кастомные цвета (primary, secondary, success, warning, danger)
- Анимации и переходы
- Типографика и отступы

### TypeScript (`tsconfig.json`)
- Строгий режим TypeScript
- Алиасы путей (@/, @/components/, @/lib/)
- Настройки компиляции

### Next.js (`next.config.js`)
- Конфигурация для продакшена
- Оптимизация изображений
- Настройки сборки

## Функциональность

### Создание и управление дашбордами
- Создание новых дашбордов
- Редактирование существующих
- Удаление дашбордов
- Переименование дашбордов

### Управление графиками
- Добавление графиков в дашборд
- Настройка параметров графиков
- Изменение порядка графиков (Drag & Drop)
- Редактирование существующих графиков
- Удаление графиков

### Типы графиков
- **Number Chart**: Числовой индикатор с единицей измерения
- **Bar Chart**: Столбчатый график с настройкой цветов
- **Line Chart**: Линейный график с анимацией

### Drag & Drop
- Перетаскивание графиков для изменения порядка
- Визуальная обратная связь
- Сохранение нового порядка

### Редактирование графиков
- Редактирование заголовка и описания
- Изменение данных графиков
- Настройка цветов и конфигурации
- Загрузка существующих данных при редактировании

## Разработка и тестирование

### Команды разработки
```bash
npm run dev          # Запуск Next.js сервера
npm run json-server  # Запуск JSON Server
npm run build        # Сборка для продакшена
npm run start        # Запуск продакшен сервера
npm run lint         # Проверка кода
npm run type-check   # Проверка типов TypeScript
```

### Тестовые файлы
- `test-api.js` - Тестирование API endpoints
- `test-chart-creation.js` - Тестирование создания графиков
- `test-chart-editing.js` - Тестирование редактирования графиков
- `test-dashboard-rename.js` - Тестирование переименования дашбордов

### JSON Server
- Запускается на порту 3001
- Использует файл `db.json` для хранения данных
- Поддерживает фильтрацию, сортировку и поиск

## Принципы архитектуры

### 1. Feature-based Architecture
- Логика группируется по функциональным модулям
- Каждый feature самодостаточен
- Легко тестировать и поддерживать

### 2. Separation of Concerns
- UI компоненты отделены от бизнес-логики
- API логика в отдельных сервисах
- Типы данных определены в features

### 3. Type Safety
- Строгая типизация TypeScript
- Интерфейсы для всех данных
- Компиляция проверяет типы

### 4. Reusable Components
- Компоненты переиспользуются
- Без привязки к конкретной бизнес-логике
- Принимают props, не содержат состояние

### 5. API-First Design
- RESTful API endpoints
- Консистентная обработка ошибок
- JSON формат ответов

## Производительность

### Оптимизации
- Code splitting для компонентов
- Lazy loading для графиков
- Оптимизация изображений Next.js
- Кэширование API запросов

### Мониторинг
- Error boundaries для обработки ошибок
- Loading states для пользовательского опыта
- Валидация данных на клиенте и сервере

## Безопасность

### API Security
- Валидация всех входных данных
- Санитизация данных
- Правильная обработка CORS
- Использование environment variables

### Frontend Security
- Санитизация пользовательского ввода
- Защита от XSS атак
- Валидация данных на клиенте

## Доступность (Accessibility)

### WCAG Guidelines
- Семантическая HTML разметка
- Правильные ARIA атрибуты
- Навигация с клавиатуры
- Alt текст для изображений

### Chart Accessibility
- Правильный цветовой контраст
- Альтернативные таблицы данных
- Поддержка screen readers
- Навигация с клавиатуры

## Мобильная адаптивность

### Responsive Design
- Mobile-first подход
- Адаптивные графики
- Touch-friendly взаимодействия
- Оптимизированные макеты для маленьких экранов

### Performance
- Оптимизация для мобильных сетей
- Уменьшение размера бандла
- Lazy loading
- Правильные стратегии кэширования 