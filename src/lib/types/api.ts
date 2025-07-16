// API Response Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface ApiError {
  error: string
  message: string
  statusCode: number
}

// Dashboard Types
export interface Dashboard {
  id: string
  name: string
  description?: string
  charts: string[]
  createdAt: Date
  updatedAt: Date
}

export interface CreateDashboardRequest {
  name: string
  description?: string
}

export interface UpdateDashboardRequest {
  name?: string
  description?: string
  charts?: string[]
}

// Chart Types
export interface Chart {
  id: string
  dashboardId: string
  type: 'bar' | 'line' | 'number'
  title: string
  description?: string
  dataEndpoint: string
  order: number
  config?: ChartConfig
  createdAt: Date
  updatedAt: Date
}

export interface ChartConfig {
  colors?: string[]
  showLegend?: boolean
  showGrid?: boolean
  animate?: boolean
  height?: number
  width?: number
}

export interface CreateChartRequest {
  dashboardId: string
  type: 'bar' | 'line' | 'number'
  title: string
  description?: string
  dataEndpoint: string
  order: number
  config?: ChartConfig
}

export interface UpdateChartRequest {
  type?: 'bar' | 'line' | 'number'
  title?: string
  description?: string
  dataEndpoint?: string
  order?: number
  config?: ChartConfig
}

// Chart Data Types
export interface ChartData {
  labels: string[]
  values: number[]
}

export interface NumberChartData {
  value: number
  label?: string
  unit?: string
}

export interface ChartDataResponse {
  data: ChartData | NumberChartData
  lastUpdated: Date
}

// Pagination Types
export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Filter Types
export interface DashboardFilters {
  search?: string
  createdAfter?: Date
  createdBefore?: Date
  hasCharts?: boolean
}

export interface ChartFilters {
  dashboardId?: string
  type?: 'bar' | 'line' | 'number'
  search?: string
}

// API Endpoint Types
export interface ApiEndpoints {
  dashboards: {
    list: string
    create: string
    get: (id: string) => string
    update: (id: string) => string
    delete: (id: string) => string
  }
  charts: {
    list: string
    create: string
    get: (id: string) => string
    update: (id: string) => string
    delete: (id: string) => string
  }
  data: {
    signupsByRegion: string
    ordersOverTime: string
    totalRevenue: string
  }
}

// Validation Schemas (for Zod)
export const dashboardSchema = {
  name: { min: 1, max: 100 },
  description: { max: 500 },
} as const

export const chartSchema = {
  title: { min: 1, max: 100 },
  description: { max: 500 },
  order: { min: 0 },
} as const 