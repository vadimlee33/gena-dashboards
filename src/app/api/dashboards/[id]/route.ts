import { NextRequest, NextResponse } from 'next/server'
import { JsonServerAPI } from '@/lib/utils/json-server'
import { 
  ApiResponse, 
  Dashboard, 
  UpdateDashboardRequest 
} from '@/lib/types/api'

// GET /api/dashboards/[id] - Get a specific dashboard
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const result = await JsonServerAPI.getDashboard(id)

    if (!result.success) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'NOT_FOUND',
          message: 'Dashboard not found',
        } as ApiResponse<null>,
        { status: 404 }
      )
    }

    return NextResponse.json({
      data: result.data,
      success: true,
      message: 'Dashboard retrieved successfully',
    } as ApiResponse<Dashboard>)

  } catch (error) {
    console.error('Error fetching dashboard:', error)
    return NextResponse.json(
      {
        data: null,
        success: false,
        error: 'FETCH_ERROR',
        message: 'An error occurred while fetching the dashboard',
      } as ApiResponse<null>,
      { status: 500 }
    )
  }
}

// PUT /api/dashboards/[id] - Update a dashboard
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body: UpdateDashboardRequest = await request.json()

    // Validate name if provided
    if (body.name !== undefined && (!body.name || body.name.trim().length === 0)) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Dashboard name cannot be empty',
        } as ApiResponse<null>,
        { status: 400 }
      )
    }

    // Update dashboard
    const result = await JsonServerAPI.updateDashboard(id, {
      name: body.name?.trim(),
      description: body.description?.trim(),
    })

    if (!result.success) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'UPDATE_ERROR',
          message: 'Failed to update dashboard',
        } as ApiResponse<null>,
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: result.data,
      success: true,
      message: 'Dashboard updated successfully',
    } as ApiResponse<Dashboard>)

  } catch (error) {
    console.error('Error updating dashboard:', error)
    return NextResponse.json(
      {
        data: null,
        success: false,
        error: 'UPDATE_ERROR',
        message: 'An error occurred while updating the dashboard',
      } as ApiResponse<null>,
      { status: 500 }
    )
  }
}

// DELETE /api/dashboards/[id] - Delete a dashboard
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const result = await JsonServerAPI.deleteDashboard(id)

    if (!result.success) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'DELETE_ERROR',
          message: 'Failed to delete dashboard',
        } as ApiResponse<null>,
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: null,
      success: true,
      message: 'Dashboard deleted successfully',
    } as ApiResponse<null>)

  } catch (error) {
    console.error('Error deleting dashboard:', error)
    return NextResponse.json(
      {
        data: null,
        success: false,
        error: 'DELETE_ERROR',
        message: 'An error occurred while deleting the dashboard',
      } as ApiResponse<null>,
      { status: 500 }
    )
  }
} 