import { ApiResponse } from '@/lib/types/api'

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// Request Options
export interface RequestOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: any
  cache?: RequestCache
  signal?: AbortSignal
}

// Default headers
const getDefaultHeaders = (): Record<string, string> => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
})

// Error handling
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Main API client
export class ApiClient {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  // Generic request method
  async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      cache = 'default',
      signal,
    } = options

    const url = `${this.baseURL}${endpoint}`
    const requestHeaders = {
      ...getDefaultHeaders(),
      ...headers,
    }

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
      cache,
      signal,
    }

    if (body && method !== 'GET') {
      requestOptions.body = JSON.stringify(body)
    }

    try {
      const response = await fetch(url, requestOptions)
      const responseData = await response.json()

      if (!response.ok) {
        throw new ApiError(
          response.status,
          responseData.message || `HTTP ${response.status}`,
          responseData
        )
      }

      return responseData
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }

      // Network or other errors
      throw new ApiError(
        0,
        error instanceof Error ? error.message : 'Network error',
        error
      )
    }
  }

  // GET request
  async get<T>(endpoint: string, options?: Omit<RequestOptions, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  // POST request
  async post<T>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body })
  }

  // PUT request
  async put<T>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body })
  }

  // DELETE request
  async delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }

  // PATCH request
  async patch<T>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body })
  }
}

// Create default API client instance
export const apiClient = new ApiClient()

// Utility functions for specific endpoints
export const api = {
  // Dashboard endpoints
  dashboards: {
    list: (params?: URLSearchParams) => 
      apiClient.get(`/dashboards${params ? `?${params}` : ''}`),
    
    get: (id: string) => 
      apiClient.get(`/dashboards/${id}`),
    
    create: (data: any) => 
      apiClient.post('/dashboards', data),
    
    update: (id: string, data: any) => 
      apiClient.put(`/dashboards/${id}`, data),
    
    delete: (id: string) => 
      apiClient.delete(`/dashboards/${id}`),
  },

  // Chart endpoints
  charts: {
    list: (params?: URLSearchParams) => 
      apiClient.get(`/charts${params ? `?${params}` : ''}`),
    
    get: (id: string) => 
      apiClient.get(`/charts/${id}`),
    
    create: (data: any) => 
      apiClient.post('/charts', data),
    
    update: (id: string, data: any) => 
      apiClient.put(`/charts/${id}`, data),
    
    delete: (id: string) => 
      apiClient.delete(`/charts/${id}`),
  },

  // Data endpoints
  data: {
    signupsByRegion: () => 
      apiClient.get('/data/signups_by_region'),
    
    ordersOverTime: () => 
      apiClient.get('/data/orders_over_time'),
    
    totalRevenue: () => 
      apiClient.get('/data/total_revenue'),
  },
}

// Query parameter builders
export const buildQueryParams = (params: Record<string, any>): URLSearchParams => {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (value instanceof Date) {
        searchParams.append(key, value.toISOString())
      } else if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, String(item)))
      } else {
        searchParams.append(key, String(value))
      }
    }
  })
  
  return searchParams
}

// Response helpers
export const createSuccessResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
  data,
  success: true,
  message,
})

export const createErrorResponse = (error: string, message?: string): ApiResponse<null> => ({
  data: null,
  success: false,
  error,
  message,
})

// Retry logic for failed requests
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      
      if (i === maxRetries) {
        throw lastError
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
    }
  }

  throw lastError!
}

// Cache utilities
export const createCacheKey = (endpoint: string, params?: Record<string, any>): string => {
  const paramString = params ? JSON.stringify(params) : ''
  return `${endpoint}${paramString}`
}

// Request timeout
export const withTimeout = <T>(
  promise: Promise<T>,
  timeoutMs: number = 10000
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    ),
  ])
} 