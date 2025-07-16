import { NextResponse } from 'next/server'

// OpenAPI/Swagger specification
const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Dashboard API',
    description: 'RESTful API for managing dashboards and charts',
    version: '1.0.0',
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
    '/charts': {
      get: {
        summary: 'List charts',
        description: 'Retrieve a paginated list of charts',
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
        },
      },
    },
    '/data/signups_by_region': {
      get: {
        summary: 'Get signups by region data',
        description: 'Retrieve data for signups by region chart',
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
        },
      },
    },
    '/data/orders_over_time': {
      get: {
        summary: 'Get orders over time data',
        description: 'Retrieve data for orders over time chart',
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
        },
      },
    },
    '/data/total_revenue': {
      get: {
        summary: 'Get total revenue data',
        description: 'Retrieve data for total revenue number chart',
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NumberChartDataResponse',
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
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/ChartData' },
                  lastUpdated: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        ],
      },
      NumberChartDataResponse: {
        allOf: [
          { $ref: '#/components/schemas/ApiResponse' },
          {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  data: { $ref: '#/components/schemas/NumberChartData' },
                  lastUpdated: { type: 'string', format: 'date-time' },
                },
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