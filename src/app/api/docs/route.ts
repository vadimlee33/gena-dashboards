import { NextResponse } from 'next/server'

// OpenAPI/Swagger specification
const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Dashboard API',
    description: 'RESTful API for managing dashboards and charts',
    version: '2.0.0',
    contact: {
      name: 'API Support',
      email: 'support@dashboard.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
  paths: {
    '/dashboards': {
      get: {
        summary: 'List dashboards',
        description: 'Retrieve a paginated list of dashboards',
        parameters: [
          {
            name: 'page',
            in: 'query',
            description: 'Page number',
            schema: { type: 'integer', default: 1 },
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Items per page',
            schema: { type: 'integer', default: 10 },
          },
          {
            name: 'search',
            in: 'query',
            description: 'Search term',
            schema: { type: 'string' },
          },
          {
            name: 'sortBy',
            in: 'query',
            description: 'Sort field',
            schema: { type: 'string', default: 'createdAt' },
          },
          {
            name: 'sortOrder',
            in: 'query',
            description: 'Sort order',
            schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' },
          },
        ],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DashboardListResponse',
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create dashboard',
        description: 'Create a new dashboard',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateDashboardRequest',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Dashboard created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DashboardResponse',
                },
              },
            },
          },
          '400': {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '409': {
            description: 'Conflict - dashboard already exists',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/dashboards/{id}': {
      get: {
        summary: 'Get dashboard',
        description: 'Retrieve a specific dashboard by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Dashboard ID',
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DashboardResponse',
                },
              },
            },
          },
          '404': {
            description: 'Dashboard not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      put: {
        summary: 'Update dashboard',
        description: 'Update an existing dashboard',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Dashboard ID',
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateDashboardRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Dashboard updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DashboardResponse',
                },
              },
            },
          },
          '404': {
            description: 'Dashboard not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Delete dashboard',
        description: 'Delete a dashboard and all its charts',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Dashboard ID',
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': {
            description: 'Dashboard deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse',
                },
              },
            },
          },
          '404': {
            description: 'Dashboard not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/dashboards/{id}/charts/reorder': {
      put: {
        summary: 'Reorder dashboard charts',
        description: 'Update the order of charts within a dashboard',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Dashboard ID',
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  chartIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Array of chart IDs in the desired order',
                  },
                },
                required: ['chartIds'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Charts reordered successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    message: { type: 'string' },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Chart' },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad request - invalid chartIds array',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    error: { type: 'string' },
                  },
                },
              },
            },
          },
          '404': {
            description: 'Dashboard or charts not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    error: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/charts': {
      get: {
        summary: 'List charts',
        description: 'Retrieve a paginated list of charts',
        parameters: [
          {
            name: 'search',
            in: 'query',
            description: 'Search term',
            schema: { type: 'string' },
          },
          {
            name: 'dashboardId',
            in: 'query',
            description: 'Filter by dashboard ID',
            schema: { type: 'string' },
          },
          {
            name: 'type',
            in: 'query',
            description: 'Filter by chart type',
            schema: { type: 'string', enum: ['bar', 'line', 'number'] },
          },
          {
            name: 'sortBy',
            in: 'query',
            description: 'Sort field',
            schema: { type: 'string', default: 'order' },
          },
          {
            name: 'sortOrder',
            in: 'query',
            description: 'Sort order',
            schema: { type: 'string', enum: ['asc', 'desc'], default: 'asc' },
          },
        ],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ChartListResponse',
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create chart',
        description: 'Create a new chart',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateChartRequest',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Chart created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ChartResponse',
                },
              },
            },
          },
          '400': {
            description: 'Bad request - validation error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/charts/{id}': {
      get: {
        summary: 'Get chart',
        description: 'Retrieve a specific chart by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Chart ID',
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ChartResponse',
                },
              },
            },
          },
          '404': {
            description: 'Chart not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      put: {
        summary: 'Update chart',
        description: 'Update an existing chart',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Chart ID',
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateChartRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Chart updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ChartResponse',
                },
              },
            },
          },
          '404': {
            description: 'Chart not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Delete chart',
        description: 'Delete a chart',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Chart ID',
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': {
            description: 'Chart deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessResponse',
                },
              },
            },
          },
          '404': {
            description: 'Chart not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/chart-data': {
      get: {
        summary: 'Get chart data by endpoint',
        description: 'Retrieve chart data using an endpoint parameter',
        parameters: [
          {
            name: 'endpoint',
            in: 'query',
            required: true,
            description: 'Chart data endpoint',
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ChartDataResponse',
                },
              },
            },
          },
          '400': {
            description: 'Missing endpoint parameter',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'Chart data not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create chart data',
        description: 'Create new chart data for an endpoint',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  endpoint: { type: 'string' },
                  data: {
                    oneOf: [
                      { $ref: '#/components/schemas/ChartData' },
                      { $ref: '#/components/schemas/NumberChartData' },
                    ],
                  },
                },
                required: ['endpoint', 'data'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Chart data created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse',
                },
              },
            },
          },
          '400': {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      put: {
        summary: 'Update chart data',
        description: 'Update existing chart data for an endpoint',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  endpoint: { type: 'string' },
                  data: {
                    oneOf: [
                      { $ref: '#/components/schemas/ChartData' },
                      { $ref: '#/components/schemas/NumberChartData' },
                    ],
                  },
                },
                required: ['endpoint', 'data'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Chart data updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse',
                },
              },
            },
          },
          '400': {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/data/{endpoint}': {
      get: {
        summary: 'Get chart data by endpoint path',
        description: 'Retrieve chart data using endpoint as path parameter',
        parameters: [
          {
            name: 'endpoint',
            in: 'path',
            required: true,
            description: 'Chart data endpoint',
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ChartDataResponse',
                },
              },
            },
          },
          '400': {
            description: 'Missing endpoint parameter',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'Chart data not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Dashboard: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          charts: { type: 'array', items: { type: 'string' } },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: ['id', 'name', 'charts', 'createdAt', 'updatedAt'],
      },
      Chart: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          dashboardId: { type: 'string' },
          type: { type: 'string', enum: ['bar', 'line', 'number'] },
          title: { type: 'string' },
          description: { type: 'string' },
          dataEndpoint: { type: 'string' },
          order: { type: 'integer' },
          config: { $ref: '#/components/schemas/ChartConfig' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: ['id', 'dashboardId', 'type', 'title', 'dataEndpoint', 'order', 'createdAt', 'updatedAt'],
      },
      ChartConfig: {
        type: 'object',
        properties: {
          colors: { type: 'array', items: { type: 'string' } },
          showLegend: { type: 'boolean' },
          showGrid: { type: 'boolean' },
          animate: { type: 'boolean' },
          height: { type: 'integer' },
          width: { type: 'integer' },
        },
      },
      ChartData: {
        type: 'object',
        properties: {
          labels: { type: 'array', items: { type: 'string' } },
          values: { type: 'array', items: { type: 'number' } },
        },
        required: ['labels', 'values'],
      },
      NumberChartData: {
        type: 'object',
        properties: {
          value: { type: 'number' },
          label: { type: 'string' },
          unit: { type: 'string' },
        },
        required: ['value'],
      },
      CreateDashboardRequest: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
        },
        required: ['name'],
      },
      UpdateDashboardRequest: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          charts: { type: 'array', items: { type: 'string' } },
        },
      },
      CreateChartRequest: {
        type: 'object',
        properties: {
          dashboardId: { type: 'string' },
          type: { type: 'string', enum: ['bar', 'line', 'number'] },
          title: { type: 'string' },
          description: { type: 'string' },
          dataEndpoint: { type: 'string' },
          order: { type: 'integer' },
          config: { $ref: '#/components/schemas/ChartConfig' },
        },
        required: ['dashboardId', 'type', 'title', 'dataEndpoint', 'order'],
      },
      UpdateChartRequest: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['bar', 'line', 'number'] },
          title: { type: 'string' },
          description: { type: 'string' },
          dataEndpoint: { type: 'string' },
          order: { type: 'integer' },
          config: { $ref: '#/components/schemas/ChartConfig' },
        },
      },
      ApiResponse: {
        type: 'object',
        properties: {
          data: { type: 'object' },
          success: { type: 'boolean' },
          message: { type: 'string' },
          error: { type: 'string' },
        },
        required: ['data', 'success'],
      },
      DashboardResponse: {
        allOf: [
          { $ref: '#/components/schemas/ApiResponse' },
          {
            type: 'object',
            properties: {
              data: { $ref: '#/components/schemas/Dashboard' },
            },
          },
        ],
      },
      ChartResponse: {
        allOf: [
          { $ref: '#/components/schemas/ApiResponse' },
          {
            type: 'object',
            properties: {
              data: { $ref: '#/components/schemas/Chart' },
            },
          },
        ],
      },
      DashboardListResponse: {
        allOf: [
          { $ref: '#/components/schemas/ApiResponse' },
          {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/Dashboard' } },
                  pagination: {
                    type: 'object',
                    properties: {
                      page: { type: 'integer' },
                      limit: { type: 'integer' },
                      total: { type: 'integer' },
                      totalPages: { type: 'integer' },
                      hasNext: { type: 'boolean' },
                      hasPrev: { type: 'boolean' },
                    },
                  },
                },
              },
            },
          },
        ],
      },
      ChartListResponse: {
        allOf: [
          { $ref: '#/components/schemas/ApiResponse' },
          {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  data: { type: 'array', items: { $ref: '#/components/schemas/Chart' } },
                  pagination: {
                    type: 'object',
                    properties: {
                      page: { type: 'integer' },
                      limit: { type: 'integer' },
                      total: { type: 'integer' },
                      totalPages: { type: 'integer' },
                      hasNext: { type: 'boolean' },
                      hasPrev: { type: 'boolean' },
                    },
                  },
                },
              },
            },
          },
        ],
      },
      ChartDataResponse: {
        allOf: [
          { $ref: '#/components/schemas/ApiResponse' },
          {
            type: 'object',
            properties: {
              data: {
                oneOf: [
                  { $ref: '#/components/schemas/ChartData' },
                  { $ref: '#/components/schemas/NumberChartData' },
                ],
              },
            },
          },
        ],
      },
      SuccessResponse: {
        allOf: [
          { $ref: '#/components/schemas/ApiResponse' },
          {
            type: 'object',
            properties: {
              data: { type: 'null' },
            },
          },
        ],
      },
      ErrorResponse: {
        allOf: [
          { $ref: '#/components/schemas/ApiResponse' },
          {
            type: 'object',
            properties: {
              data: { type: 'null' },
              error: { type: 'string' },
            },
          },
        ],
      },
    },
  },
}

export async function GET() {
  return NextResponse.json(openApiSpec)
} 