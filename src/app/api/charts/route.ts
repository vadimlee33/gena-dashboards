import { NextRequest, NextResponse } from 'next/server'
import { JsonServerAPI } from '@/lib/utils/json-server'
import { 
  ApiResponse, 
  Chart, 
  CreateChartRequest, 
  UpdateChartRequest
} from '@/lib/types/api'

// GET /api/charts - List all charts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const dashboardId = searchParams.get('dashboardId') || ''
    const type = searchParams.get('type') || ''
    const sortBy = searchParams.get('sortBy') || 'order'
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc'

    const result = await JsonServerAPI.getCharts(search, dashboardId, type, sortBy, sortOrder)

    if (!result.success) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'Failed to fetch charts',
          message: 'An error occurred while fetching charts',
        } as ApiResponse<null>,
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: result.data,
      success: true,
      message: 'Charts retrieved successfully',
    } as ApiResponse<Chart[]>)

  } catch (error) {
    console.error('Error fetching charts:', error)
    return NextResponse.json(
      {
        data: null,
        success: false,
        error: 'Failed to fetch charts',
        message: 'An error occurred while fetching charts',
      } as ApiResponse<null>,
      { status: 500 }
    )
  }
}

// POST /api/charts - Create a new chart
export async function POST(request: NextRequest) {
  try {
    const body: CreateChartRequest = await request.json()

    // Validate required fields
    if (!body.title || body.title.trim().length === 0) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Chart title is required',
        } as ApiResponse<null>,
        { status: 400 }
      )
    }

    if (!body.dashboardId) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Dashboard ID is required',
        } as ApiResponse<null>,
        { status: 400 }
      )
    }

    if (!body.type || !['bar', 'line', 'number'].includes(body.type)) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Chart type must be bar, line, or number',
        } as ApiResponse<null>,
        { status: 400 }
      )
    }

    if (!body.dataEndpoint) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Data endpoint is required',
        } as ApiResponse<null>,
        { status: 400 }
      )
    }

    // Create new chart
    const result = await JsonServerAPI.createChart({
      dashboardId: body.dashboardId,
      type: body.type,
      title: body.title.trim(),
      description: body.description?.trim(),
      dataEndpoint: body.dataEndpoint,
      order: body.order,
      config: body.config,
    })

    if (!result.success) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'CREATION_ERROR',
          message: 'An error occurred while creating the chart',
        } as ApiResponse<null>,
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: result.data,
      success: true,
      message: 'Chart created successfully',
    } as ApiResponse<Chart>, { status: 201 })

  } catch (error) {
    console.error('Error creating chart:', error)
    return NextResponse.json(
      {
        data: null,
        success: false,
        error: 'CREATION_ERROR',
        message: 'An error occurred while creating the chart',
      } as ApiResponse<null>,
      { status: 500 }
    )
  }
} 