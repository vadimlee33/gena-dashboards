import { generateChartId, generateDashboardId } from '@/lib/utils/id-generator';

const JSON_SERVER_URL = 'http://localhost:3001'

export interface JsonServerResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export class JsonServerAPI {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<JsonServerResponse<T>> {
    try {
      const response = await fetch(`${JSON_SERVER_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return {
        data,
        success: true,
      }
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error)
      return {
        data: null as T,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  // Dashboard methods
  static async getDashboards(search?: string, sortBy = 'createdAt', sortOrder: 'asc' | 'desc' = 'desc') {
    let url = '/dashboards'
    const params = new URLSearchParams()
    
    if (search) {
      params.append('q', search)
    }
    if (sortBy) {
      params.append('_sort', sortBy)
      params.append('_order', sortOrder)
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`
    }
    
    return this.request(url)
  }

  static async getDashboard(id: string) {
    return this.request(`/dashboards/${id}`)
  }

  static async createDashboard(dashboard: { name: string; description?: string }) {
    return this.request('/dashboards', {
      method: 'POST',
      body: JSON.stringify({
        ...dashboard,
        id: generateDashboardId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    })
  }

  static async updateDashboard(id: string, updates: Partial<{ name: string; description: string }>) {
    return this.request(`/dashboards/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...updates,
        updatedAt: new Date().toISOString(),
      }),
    })
  }

  static async deleteDashboard(id: string) {
    return this.request(`/dashboards/${id}`, {
      method: 'DELETE',
    })
  }

  // Chart methods
  static async getCharts(search?: string, dashboardId?: string, type?: string, sortBy = 'order', sortOrder: 'asc' | 'desc' = 'asc') {
    let url = '/charts'
    const params = new URLSearchParams()
    
    if (search) {
      params.append('q', search)
    }
    if (dashboardId) {
      params.append('dashboardId', dashboardId)
    }
    if (type) {
      params.append('type', type)
    }
    if (sortBy) {
      params.append('_sort', sortBy)
      params.append('_order', sortOrder)
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`
    }
    
    return this.request(url)
  }

  static async getChart(id: string) {
    return this.request(`/charts/${id}`)
  }

  static async createChart(chart: {
    dashboardId: string
    type: 'bar' | 'line' | 'number'
    title: string
    description?: string
    dataEndpoint: string
    order: number
    config?: any
  }) {
    return this.request('/charts', {
      method: 'POST',
      body: JSON.stringify({
        ...chart,
        id: generateChartId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    })
  }

  static async updateChart(id: string, updates: Partial<{
    type: 'bar' | 'line' | 'number'
    title: string
    description: string
    dataEndpoint: string
    order: number
    config: any
  }>) {
    return this.request(`/charts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...updates,
        updatedAt: new Date().toISOString(),
      }),
    })
  }

  static async deleteChart(id: string) {
    return this.request(`/charts/${id}`, {
      method: 'DELETE',
    })
  }

  // Chart data methods
  static async getChartData(endpoint: string) {
    return this.request<any[]>(`/chartData?endpoint=${endpoint}`)
  }

  static async createChartData(chartData: {
    endpoint: string
    data: any
  }) {
    return this.request('/chartData', {
      method: 'POST',
      body: JSON.stringify({
        ...chartData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    })
  }

  static async updateChartData(endpoint: string, data: any) {
    // First, find the chart data record by endpoint
    const findResult = await this.getChartData(endpoint);
    
    if (!findResult.success || !findResult.data || findResult.data.length === 0) {
      return {
        data: null,
        success: false,
        error: 'NOT_FOUND',
        message: 'Chart data not found',
      };
    }
    
    // Get the first matching record
    const chartDataRecord = findResult.data[0];
    
    // Update the record by its ID
    return this.request(`/chartData/${chartDataRecord.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        data,
        updatedAt: new Date().toISOString(),
      }),
    });
  }
} 