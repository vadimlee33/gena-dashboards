import { NextRequest, NextResponse } from 'next/server'
import { JsonServerAPI } from '@/lib/utils/json-server'
import { 
  ApiResponse, 
  Chart, 
  UpdateChartRequest 
} from '@/lib/types/api'

// GET /api/charts/[id] - Get a specific chart
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const result = await JsonServerAPI.getChart(id)

    if (!result.success) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'NOT_FOUND',
          message: 'Chart not found',
        } as ApiResponse<null>,
        { status: 404 }
      )
    }

    return NextResponse.json({
      data: result.data,
      success: true,
      message: 'Chart retrieved successfully',
    } as ApiResponse<Chart>)

  } catch (error) {
    console.error('Error fetching chart:', error)
    return NextResponse.json(
      {
        data: null,
        success: false,
        error: 'FETCH_ERROR',
        message: 'An error occurred while fetching the chart',
      } as ApiResponse<null>,
      { status: 500 }
    )
  }
}

// PUT /api/charts/[id] - Update a chart
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body: UpdateChartRequest = await request.json()

    // Validate title if provided
    if (body.title !== undefined && (!body.title || body.title.trim().length === 0)) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Chart title cannot be empty',
        } as ApiResponse<null>,
        { status: 400 }
      )
    }

    // Validate type if provided
    if (body.type && !['bar', 'line', 'number'].includes(body.type)) {
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

    // Update chart
    const result = await JsonServerAPI.updateChart(id, {
      type: body.type,
      title: body.title?.trim(),
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
          error: 'UPDATE_ERROR',
          message: 'Failed to update chart',
        } as ApiResponse<null>,
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: result.data,
      success: true,
      message: 'Chart updated successfully',
    } as ApiResponse<Chart>)

  } catch (error) {
    console.error('Error updating chart:', error)
    return NextResponse.json(
      {
        data: null,
        success: false,
        error: 'UPDATE_ERROR',
        message: 'An error occurred while updating the chart',
      } as ApiResponse<null>,
      { status: 500 }
    )
  }
}

// DELETE /api/charts/[id] - Delete a chart
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const result = await JsonServerAPI.deleteChart(id)

    if (!result.success) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'DELETE_ERROR',
          message: 'Failed to delete chart',
        } as ApiResponse<null>,
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: null,
      success: true,
      message: 'Chart deleted successfully',
    } as ApiResponse<null>)

  } catch (error) {
    console.error('Error deleting chart:', error)
    return NextResponse.json(
      {
        data: null,
        success: false,
        error: 'DELETE_ERROR',
        message: 'An error occurred while deleting the chart',
      } as ApiResponse<null>,
      { status: 500 }
    )
  }
} 