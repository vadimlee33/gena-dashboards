'use client'

import { useEffect } from 'react'

export default function ApiDocsPage() {
  useEffect(() => {
    // Load Swagger UI
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js'
    script.async = true
    document.head.appendChild(script)

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css'
    document.head.appendChild(link)

    script.onload = () => {
      // @ts-ignore
      const SwaggerUIBundle = window.SwaggerUIBundle

      SwaggerUIBundle({
        url: '/api/docs',
        dom_id: '#swagger-ui',
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
        layout: 'BaseLayout',
        deepLinking: true,
        showExtensions: true,
        showCommonExtensions: true,
        docExpansion: 'list',
        filter: true,
        tryItOutEnabled: true,
        requestInterceptor: (request: any) => {
          // Add any request interceptors here
          return request
        },
        responseInterceptor: (response: any) => {
          // Add any response interceptors here
          return response
        }
      })
    }

    return () => {
      // Cleanup
      document.head.removeChild(script)
      document.head.removeChild(link)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard API Documentation
          </h1>
          <p className="text-gray-600">
            Interactive API documentation for the Dashboard application (v2.0.0)
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <div id="swagger-ui" className="p-4" />
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Quick Start
          </h2>
          <div className="space-y-4 text-blue-800">
            <div>
              <h3 className="font-medium">Base URL</h3>
              <code className="bg-blue-100 px-2 py-1 rounded text-sm">
                http://localhost:3000/api
              </code>
            </div>
            <div>
              <h3 className="font-medium">Authentication</h3>
              <p>Currently, the API does not require authentication.</p>
            </div>
            <div>
              <h3 className="font-medium">Response Format</h3>
              <p>All responses follow this format:</p>
              <pre className="bg-blue-100 p-3 rounded text-sm overflow-x-auto">
                {`{
  "data": <response_data>,
  "success": true|false,
  "message": "Human readable message",
  "error": "Error code (only on failure)"
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-900 mb-4">
            New in v2.0.0
          </h2>
          <div className="space-y-4 text-green-800">
            <div>
              <h3 className="font-medium">Chart Data Management</h3>
              <p>New endpoints for managing chart data:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><code className="bg-green-100 px-1 py-0.5 rounded text-xs">GET /api/chart-data?endpoint=...</code> - Get chart data by endpoint</li>
                <li><code className="bg-green-100 px-1 py-0.5 rounded text-xs">POST /api/chart-data</code> - Create new chart data</li>
                <li><code className="bg-green-100 px-1 py-0.5 rounded text-xs">PUT /api/chart-data</code> - Update existing chart data</li>
                <li><code className="bg-green-100 px-1 py-0.5 rounded text-xs">{'GET /api/data/{endpoint}'}</code> - Get chart data by path parameter</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium">Chart Reordering</h3>
              <p>New endpoint for reordering charts within dashboards:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><code className="bg-green-100 px-1 py-0.5 rounded text-xs">{'PUT /api/dashboards/{id}/charts/reorder'}</code> - Reorder charts in a dashboard</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium">Enhanced Chart Filtering</h3>
              <p>Improved chart listing with better filtering and sorting options.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-900 mb-4">
            Example Requests
          </h2>
          <div className="space-y-4 text-yellow-800">
            <div>
              <h3 className="font-medium">List Dashboards</h3>
              <code className="bg-yellow-100 px-2 py-1 rounded text-sm">
                GET /api/dashboards
              </code>
            </div>
            <div>
              <h3 className="font-medium">Create Dashboard</h3>
              <code className="bg-yellow-100 px-2 py-1 rounded text-sm">
                POST /api/dashboards
              </code>
            </div>
            <div>
              <h3 className="font-medium">Get Chart Data</h3>
              <code className="bg-yellow-100 px-2 py-1 rounded text-sm">
                GET /api/chart-data?endpoint=signups_by_region
              </code>
            </div>
            <div>
              <h3 className="font-medium">Reorder Charts</h3>
              <code className="bg-yellow-100 px-2 py-1 rounded text-sm">
                {'PUT /api/dashboards/{id}/charts/reorder'}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 