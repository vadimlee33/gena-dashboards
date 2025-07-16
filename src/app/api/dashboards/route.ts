import { NextRequest, NextResponse } from 'next/server'
import { JsonServerAPI } from '@/lib/utils/json-server'
import { 
  ApiResponse, 
  Dashboard, 
  CreateDashboardRequest, 
  UpdateDashboardRequest,
  PaginatedResponse 
} from '@/lib/types/api'

// GET /api/dashboards - List all dashboards
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc'

    const result = await JsonServerAPI.getDashboards(search, sortBy, sortOrder)

    if (!result.success) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'Failed to fetch dashboards',
          message: 'An error occurred while fetching dashboards',
        } as ApiResponse<null>,
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: result.data,
      success: true,
      message: 'Dashboards retrieved successfully',
    } as ApiResponse<Dashboard[]>)

  } catch (error) {
    console.error('Error fetching dashboards:', error)
    return NextResponse.json(
      {
        data: null,
        success: false,
        error: 'Failed to fetch dashboards',
        message: 'An error occurred while fetching dashboards',
      } as ApiResponse<null>,
      { status: 500 }
    )
  }
}

// POST /api/dashboards - Create a new dashboard
export async function POST(request: NextRequest) {
  try {
    const body: CreateDashboardRequest = await request.json()

    // Validate required fields
    if (!body.name || body.name.trim().length === 0) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Dashboard name is required',
        } as ApiResponse<null>,
        { status: 400 }
      )
    }

    // Create new dashboard
    const result = await JsonServerAPI.createDashboard({
      name: body.name.trim(),
      description: body.description?.trim(),
    })

    if (!result.success) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'CREATION_ERROR',
          message: 'An error occurred while creating the dashboard',
        } as ApiResponse<null>,
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: result.data,
      success: true,
      message: 'Dashboard created successfully',
    } as ApiResponse<Dashboard>, { status: 201 })

  } catch (error) {
    console.error('Error creating dashboard:', error)
    return NextResponse.json(
      {
        data: null,
        success: false,
        error: 'CREATION_ERROR',
        message: 'An error occurred while creating the dashboard',
      } as ApiResponse<null>,
      { status: 500 }
    )
  }
} 