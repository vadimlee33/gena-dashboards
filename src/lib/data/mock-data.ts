import { Dashboard, Chart, ChartData, NumberChartData } from '@/lib/types/api'

// Mock Dashboards
export const mockDashboards: Dashboard[] = [
  {
    id: 'dashboard-1',
    name: 'Marketing KPIs',
    description: 'Key performance indicators for marketing campaigns',
    charts: ['chart-1', 'chart-2', 'chart-3'],
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-20T14:30:00Z'),
  },
  {
    id: 'dashboard-2',
    name: 'Sales Analytics',
    description: 'Sales performance and revenue tracking',
    charts: ['chart-4', 'chart-5'],
    createdAt: new Date('2024-01-10T09:00:00Z'),
    updatedAt: new Date('2024-01-18T16:45:00Z'),
  },
  {
    id: 'dashboard-3',
    name: 'User Engagement',
    description: 'User behavior and engagement metrics',
    charts: ['chart-6', 'chart-7', 'chart-8'],
    createdAt: new Date('2024-01-12T11:30:00Z'),
    updatedAt: new Date('2024-01-19T13:20:00Z'),
  },
]

// Mock Charts
export const mockCharts: Chart[] = [
  {
    id: 'chart-1',
    dashboardId: 'dashboard-1',
    type: 'bar',
    title: 'Signups by Region',
    description: 'User signups broken down by geographic region',
    dataEndpoint: '/api/data/signups_by_region',
    order: 0,
    config: {
      colors: ['#3B82F6', '#10B981', '#F59E0B'],
      showLegend: true,
      showGrid: true,
      animate: true,
    },
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-20T14:30:00Z'),
  },
  {
    id: 'chart-2',
    dashboardId: 'dashboard-1',
    type: 'line',
    title: 'Orders Over Time',
    description: 'Daily order volume trends',
    dataEndpoint: '/api/data/orders_over_time',
    order: 1,
    config: {
      colors: ['#8B5CF6'],
      showLegend: false,
      showGrid: true,
      animate: true,
    },
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-20T14:30:00Z'),
  },
  {
    id: 'chart-3',
    dashboardId: 'dashboard-1',
    type: 'number',
    title: 'Total Revenue',
    description: 'Current total revenue',
    dataEndpoint: '/api/data/total_revenue',
    order: 2,
    config: {
      colors: ['#10B981'],
    },
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-20T14:30:00Z'),
  },
  {
    id: 'chart-4',
    dashboardId: 'dashboard-2',
    type: 'bar',
    title: 'Sales by Product',
    description: 'Sales performance by product category',
    dataEndpoint: '/api/data/sales_by_product',
    order: 0,
    config: {
      colors: ['#EF4444', '#F97316', '#EAB308'],
      showLegend: true,
      showGrid: true,
      animate: true,
    },
    createdAt: new Date('2024-01-10T09:00:00Z'),
    updatedAt: new Date('2024-01-18T16:45:00Z'),
  },
  {
    id: 'chart-5',
    dashboardId: 'dashboard-2',
    type: 'line',
    title: 'Monthly Growth',
    description: 'Month-over-month growth rate',
    dataEndpoint: '/api/data/monthly_growth',
    order: 1,
    config: {
      colors: ['#06B6D4'],
      showLegend: false,
      showGrid: true,
      animate: true,
    },
    createdAt: new Date('2024-01-10T09:00:00Z'),
    updatedAt: new Date('2024-01-18T16:45:00Z'),
  },
  {
    id: 'chart-6',
    dashboardId: 'dashboard-3',
    type: 'bar',
    title: 'Page Views by Device',
    description: 'Page views broken down by device type',
    dataEndpoint: '/api/data/page_views_by_device',
    order: 0,
    config: {
      colors: ['#6366F1', '#8B5CF6', '#EC4899'],
      showLegend: true,
      showGrid: true,
      animate: true,
    },
    createdAt: new Date('2024-01-12T11:30:00Z'),
    updatedAt: new Date('2024-01-19T13:20:00Z'),
  },
  {
    id: 'chart-7',
    dashboardId: 'dashboard-3',
    type: 'line',
    title: 'Session Duration',
    description: 'Average session duration over time',
    dataEndpoint: '/api/data/session_duration',
    order: 1,
    config: {
      colors: ['#F59E0B'],
      showLegend: false,
      showGrid: true,
      animate: true,
    },
    createdAt: new Date('2024-01-12T11:30:00Z'),
    updatedAt: new Date('2024-01-19T13:20:00Z'),
  },
  {
    id: 'chart-8',
    dashboardId: 'dashboard-3',
    type: 'number',
    title: 'Active Users',
    description: 'Current number of active users',
    dataEndpoint: '/api/data/active_users',
    order: 2,
    config: {
      colors: ['#10B981'],
    },
    createdAt: new Date('2024-01-12T11:30:00Z'),
    updatedAt: new Date('2024-01-19T13:20:00Z'),
  },
]

// Mock Chart Data
export const mockChartData: Record<string, ChartData | NumberChartData> = {
  'signups_by_region': {
    labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa'],
    values: [120, 95, 180, 65, 45],
  },
  'orders_over_time': {
    labels: [
      '2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05',
      '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10',
    ],
    values: [32, 45, 41, 58, 67, 72, 68, 75, 82, 89],
  },
  'total_revenue': {
    value: 98123,
    label: 'Total Revenue',
    unit: 'USD',
  },
  'sales_by_product': {
    labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'],
    values: [45000, 32000, 18000, 25000, 15000],
  },
  'monthly_growth': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [12, 15, 18, 22, 25, 28],
  },
  'page_views_by_device': {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    values: [45000, 68000, 12000],
  },
  'session_duration': {
    labels: [
      '00:00', '04:00', '08:00', '12:00', '16:00', '20:00',
    ],
    values: [120, 180, 240, 300, 280, 200],
  },
  'active_users': {
    value: 15420,
    label: 'Active Users',
    unit: 'users',
  },
}

// Helper functions for mock data
export const findDashboardById = (id: string): Dashboard | undefined => {
  return mockDashboards.find(dashboard => dashboard.id === id)
}

export const findChartsByDashboardId = (dashboardId: string): Chart[] => {
  return mockCharts.filter(chart => chart.dashboardId === dashboardId)
}

export const findChartById = (id: string): Chart | undefined => {
  return mockCharts.find(chart => chart.id === id)
}

export const getChartData = (endpoint: string): ChartData | NumberChartData | null => {
  const key = endpoint.replace('/api/data/', '')
  return mockChartData[key] || null
}

// Generate unique IDs
export const generateId = (): string => {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Add new dashboard
export const addDashboard = (dashboard: Omit<Dashboard, 'id' | 'createdAt' | 'updatedAt'>): Dashboard => {
  const newDashboard: Dashboard = {
    ...dashboard,
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  mockDashboards.push(newDashboard)
  return newDashboard
}

// Add new chart
export const addChart = (chart: Omit<Chart, 'id' | 'createdAt' | 'updatedAt'>): Chart => {
  const newChart: Chart = {
    ...chart,
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  mockCharts.push(newChart)
  return newChart
}

// Update dashboard
export const updateDashboard = (id: string, updates: Partial<Dashboard>): Dashboard | null => {
  const index = mockDashboards.findIndex(dashboard => dashboard.id === id)
  if (index === -1) return null

  mockDashboards[index] = {
    ...mockDashboards[index],
    ...updates,
    updatedAt: new Date(),
  }
  return mockDashboards[index]
}

// Update chart
export const updateChart = (id: string, updates: Partial<Chart>): Chart | null => {
  const index = mockCharts.findIndex(chart => chart.id === id)
  if (index === -1) return null

  mockCharts[index] = {
    ...mockCharts[index],
    ...updates,
    updatedAt: new Date(),
  }
  return mockCharts[index]
}

// Delete dashboard
export const deleteDashboard = (id: string): boolean => {
  const index = mockDashboards.findIndex(dashboard => dashboard.id === id)
  if (index === -1) return false

  mockDashboards.splice(index, 1)
  // Also delete associated charts
  const chartIndices = mockCharts
    .map((chart, index) => ({ chart, index }))
    .filter(({ chart }) => chart.dashboardId === id)
    .map(({ index }) => index)
    .reverse() // Delete from end to avoid index shifting

  chartIndices.forEach(index => {
    mockCharts.splice(index, 1)
  })

  return true
}

// Delete chart
export const deleteChart = (id: string): boolean => {
  const index = mockCharts.findIndex(chart => chart.id === id)
  if (index === -1) return false

  mockCharts.splice(index, 1)
  return true
} 