# Gena Dashboards Application Architecture

## Application Overview

Gena Dashboards is a Next.js application for creating and managing interactive dashboards with various chart types (bar, line, number). The application uses React, TypeScript, TailwindCSS, Recharts for data visualization, and JSON Server for the backend.

### Technology Stack
- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Backend**: JSON Server
- **Drag & Drop**: React Beautiful DnD
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/                    # Next.js App Router (pages and API)
│   ├── api/               # Backend API endpoints
│   │   ├── chart-data/    # API for chart data
│   │   ├── charts/        # API for chart management
│   │   ├── dashboards/    # API for dashboard management
│   │   ├── data/          # API for data retrieval
│   │   └── docs/          # API documentation
│   ├── dashboard/         # Dashboard pages
│   ├── api-docs/          # API documentation page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── ui/               # Base UI components
│   │   ├── avatar.tsx    # Avatar component
│   │   ├── badge.tsx     # Badge component
│   │   ├── button.tsx    # Button component
│   │   ├── card.tsx      # Card component
│   │   ├── header.tsx    # Header component
│   │   ├── input.tsx     # Input component
│   │   ├── modal.tsx     # Modal component
│   │   └── test-tailwind.tsx # Test component
│   ├── charts/           # Chart components
│   │   ├── bar-chart.tsx     # Bar chart
│   │   ├── line-chart.tsx    # Line chart
│   │   ├── number-chart.tsx  # Number chart
│   │   ├── chart-config-modal.tsx # Chart configuration modal
│   │   └── chart-wrapper.tsx # Chart wrapper
│   ├── dashboard/        # Dashboard components
│   │   ├── dashboard-card.tsx    # Dashboard card
│   │   ├── dashboard-list.tsx    # Dashboard list
│   │   └── dashboard-view.tsx    # Dashboard view
│   └── layout/           # Layout components
│       └── main-layout.tsx       # Main layout
├── features/             # Feature-based architecture
│   ├── dashboard/        # Dashboard feature
│   │   ├── types.ts      # Dashboard data types
│   │   └── hooks/        # Custom hooks for logic
│   │       └── use-dashboards.ts # Hook for dashboard management
│   └── charts/           # Charts feature
│       └── hooks/        # Custom hooks for charts
│           └── use-chart-modal.ts # Hook for chart modal
├── services/             # Backend services
│   └── api/              # API clients
│       └── dashboard-service.ts  # Service for dashboard API
└── lib/                  # Utilities and configurations
    ├── data/             # Data
    │   └── mock-data.ts  # Mock data
    ├── styles/           # Styles
    │   ├── component-styles.ts   # Component styles
    │   ├── design-system.ts      # Design system
    │   └── index.ts              # Style exports
    ├── types/            # TypeScript types
    │   └── api.ts        # API types
    └── utils/            # Utilities
        ├── api.ts        # API utilities
        ├── id-generator.ts       # ID generator
        └── json-server.ts        # JSON Server utilities
```

## API Endpoints

### Dashboards API
- `GET /api/dashboards` - Get list of dashboards
- `GET /api/dashboards/:id` - Get specific dashboard
- `POST /api/dashboards` - Create dashboard
- `PUT /api/dashboards/:id` - Update dashboard
- `DELETE /api/dashboards/:id` - Delete dashboard

### Charts API
- `GET /api/charts` - Get list of charts
- `GET /api/charts/:id` - Get specific chart
- `POST /api/charts` - Create chart
- `PUT /api/charts/:id` - Update chart
- `DELETE /api/charts/:id` - Delete chart
- `PATCH /api/dashboards/:id/charts/reorder` - Reorder charts

### Chart Data API
- `GET /api/chart-data` - Get chart data
- `POST /api/chart-data` - Create chart data
- `PUT /api/chart-data` - Update chart data

### Data API
- `GET /api/data/:endpoint` - Get data by endpoint

## Data Structure

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

## Components and Their Purpose

### UI Components (`src/components/ui/`)
- **Button**: Reusable button with various variants
- **Card**: Card for displaying content
- **Modal**: Modal window for forms and dialogs
- **Input**: Input field with validation
- **Badge**: Badge for statuses and labels
- **Avatar**: User avatar component
- **Header**: Application header

### Chart Components (`src/components/charts/`)
- **BarChart**: Bar chart with settings
- **LineChart**: Line chart with animation
- **NumberChart**: Number indicator with formatting
- **ChartWrapper**: Wrapper for all chart types
- **ChartConfigModal**: Chart configuration modal

### Dashboard Components (`src/components/dashboard/`)
- **DashboardCard**: Dashboard card in list
- **DashboardList**: List of all dashboards
- **DashboardView**: View specific dashboard with charts

### Layout Components (`src/components/layout/`)
- **MainLayout**: Main application layout

## Features (Functional Modules)

### Dashboard Feature (`src/features/dashboard/`)
- **types.ts**: Dashboard data types
- **hooks/use-dashboards.ts**: Hook for dashboard management

### Charts Feature (`src/features/charts/`)
- **hooks/use-chart-modal.ts**: Hook for chart modal management

## Services

### API Services (`src/services/api/`)
- **dashboard-service.ts**: Service for dashboard API

## Lib (Libraries and Utilities)

### Data (`src/lib/data/`)
- **mock-data.ts**: Mock data for development

### Styles (`src/lib/styles/`)
- **component-styles.ts**: Predefined component styles
- **design-system.ts**: Design system with colors and typography
- **index.ts**: Style exports

### Types (`src/lib/types/`)
- **api.ts**: Types for API requests and responses

### Utils (`src/lib/utils/`)
- **api.ts**: Utilities for API work
- **id-generator.ts**: Unique ID generator
- **json-server.ts**: JSON Server utilities

## API Routes

### Dashboard Routes (`src/app/api/dashboards/`)
- **route.ts**: Main dashboard operations
- **[id]/route.ts**: Operations with specific dashboard
- **[id]/charts/reorder/route.ts**: Chart reordering

### Chart Routes (`src/app/api/charts/`)
- **route.ts**: Main chart operations
- **[id]/route.ts**: Operations with specific chart

### Data Routes (`src/app/api/data/`)
- **[endpoint]/route.ts**: Get data by endpoint

### Chart Data Routes (`src/app/api/chart-data/`)
- **route.ts**: Chart data management

### Documentation Routes (`src/app/api/docs/`)
- **route.ts**: API documentation

## Application Pages

### Main Page (`src/app/page.tsx`)
- List of all dashboards
- Create new dashboard
- Application navigation

### Dashboard Page (`src/app/dashboard/[id]/page.tsx`)
- View specific dashboard
- Chart management
- Drag & Drop functionality

### API Documentation (`src/app/api-docs/page.tsx`)
- Interactive API documentation
- Swagger UI interface

## Configuration Files

### TailwindCSS (`tailwind.config.js`)
- Custom colors (primary, secondary, success, warning, danger)
- Animations and transitions
- Typography and spacing

### TypeScript (`tsconfig.json`)
- Strict TypeScript mode
- Path aliases (@/, @/components/, @/lib/)
- Compilation settings

### Next.js (`next.config.js`)
- Production configuration
- Image optimization
- Build settings

## Functionality

### Dashboard Creation and Management
- Create new dashboards
- Edit existing dashboards
- Delete dashboards
- Rename dashboards

### Chart Management
- Add charts to dashboard
- Configure chart parameters
- Change chart order (Drag & Drop)
- Edit existing charts
- Delete charts

### Chart Types
- **Number Chart**: Number indicator with unit of measurement
- **Bar Chart**: Bar chart with color settings
- **Line Chart**: Line chart with animation

### Drag & Drop
- Drag charts to change order
- Visual feedback
- Save new order

### Chart Editing
- Edit title and description
- Change chart data
- Configure colors and settings
- Load existing data when editing

## Development and Testing

### Development Commands
```bash
npm run dev          # Start Next.js server
npm run json-server  # Start JSON Server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Code linting
npm run type-check   # TypeScript type checking
```

### Test Files
- `test-api.js` - API endpoint testing
- `test-chart-creation.js` - Chart creation testing
- `test-chart-editing.js` - Chart editing testing
- `test-dashboard-rename.js` - Dashboard rename testing

### JSON Server
- Runs on port 3001
- Uses `db.json` file for data storage
- Supports filtering, sorting, and search

## Architecture Principles

### 1. Feature-based Architecture
- Logic grouped by functional modules
- Each feature is self-contained
- Easy to test and maintain

### 2. Separation of Concerns
- UI components separated from business logic
- API logic in separate services
- Data types defined in features

### 3. Type Safety
- Strict TypeScript typing
- Interfaces for all data
- Compilation checks types

### 4. Reusable Components
- Components are reusable
- No binding to specific business logic
- Accept props, don't contain state

### 5. API-First Design
- RESTful API endpoints
- Consistent error handling
- JSON response format

## Performance

### Optimizations
- Code splitting for components
- Lazy loading for charts
- Next.js image optimization
- API request caching

### Monitoring
- Error boundaries for error handling
- Loading states for user experience
- Data validation on client and server

## Security

### API Security
- Validate all input data
- Sanitize data
- Proper CORS handling
- Use environment variables

### Frontend Security
- Sanitize user input
- XSS attack protection
- Client-side data validation

## Accessibility

### WCAG Guidelines
- Semantic HTML markup
- Proper ARIA attributes
- Keyboard navigation
- Alt text for images

### Chart Accessibility
- Proper color contrast
- Alternative data tables
- Screen reader support
- Keyboard navigation

## Mobile Responsiveness

### Responsive Design
- Mobile-first approach
- Adaptive charts
- Touch-friendly interactions
- Optimized layouts for small screens

### Performance
- Mobile network optimization
- Bundle size reduction
- Lazy loading
- Proper caching strategies 