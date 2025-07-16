import { NextRequest, NextResponse } from 'next/server'
import { JsonServerAPI } from '@/lib/utils/json-server'
import { 
  ApiResponse, 
  ChartData, 
  NumberChartData
} from '@/lib/types/api'

// GET /api/chart-data - Get chart data by endpoint
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get('endpoint') || ''

    if (!endpoint) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'MISSING_ENDPOINT',
          message: 'Endpoint parameter is required',
        } as ApiResponse<null>,
        { status: 400 }
      )
    }

    const result = await JsonServerAPI.getChartData(endpoint)

    if (!result.success) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'FETCH_ERROR',
          message: 'Failed to fetch chart data',
        } as ApiResponse<null>,
        { status: 500 }
      )
    }

    // JsonServerAPI.getChartData returns an array, we need the first match
    const chartDataArray = result.data as any[];
    if (!chartDataArray || chartDataArray.length === 0) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'NOT_FOUND',
          message: 'Chart data not found',
        } as ApiResponse<null>,
        { status: 404 }
      )
    }

    // Get the first matching record
    const chartData = chartDataArray[0];

    return NextResponse.json({
      data: chartData.data as unknown as ChartData | NumberChartData,
      success: true,
      message: 'Chart data retrieved successfully',
    } as ApiResponse<ChartData | NumberChartData>)

  } catch (error) {
    console.error('Error fetching chart data:', error)
    return NextResponse.json(
      {
        data: null,
        success: false,
        error: 'FETCH_ERROR',
        message: 'An error occurred while fetching chart data',
      } as ApiResponse<null>,
      { status: 500 }
    )
  }
}

// POST /api/chart-data - Create new chart data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { endpoint, data } = body

    if (!endpoint) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'MISSING_ENDPOINT',
          message: 'Endpoint is required',
        } as ApiResponse<null>,
        { status: 400 }
      )
    }

    if (!data) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'MISSING_DATA',
          message: 'Chart data is required',
        } as ApiResponse<null>,
        { status: 400 }
      )
    }

    const result = await JsonServerAPI.createChartData({
      endpoint,
      data,
    })

    if (!result.success) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'CREATION_ERROR',
          message: 'Failed to create chart data',
        } as ApiResponse<null>,
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: result.data,
      success: true,
      message: 'Chart data created successfully',
    } as ApiResponse<any>, { status: 201 })

  } catch (error) {
    console.error('Error creating chart data:', error)
    return NextResponse.json(
      {
        data: null,
        success: false,
        error: 'CREATION_ERROR',
        message: 'An error occurred while creating chart data',
      } as ApiResponse<null>,
      { status: 500 }
    )
  }
}

// PUT /api/chart-data - Update existing chart data
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { endpoint, data } = body

    if (!endpoint) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'MISSING_ENDPOINT',
          message: 'Endpoint is required',
        } as ApiResponse<null>,
        { status: 400 }
      )
    }

    if (!data) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'MISSING_DATA',
          message: 'Chart data is required',
        } as ApiResponse<null>,
        { status: 400 }
      )
    }

    // First try to get existing data to see if it exists
    const existingResult = await JsonServerAPI.getChartData(endpoint)
    
    if (existingResult.success && existingResult.data && existingResult.data.length > 0) {
      // Update existing data
      const result = await JsonServerAPI.updateChartData(endpoint, data)
      
      if (!result.success) {
        return NextResponse.json(
          {
            data: null,
            success: false,
            error: 'UPDATE_ERROR',
            message: 'Failed to update chart data',
          } as ApiResponse<null>,
          { status: 500 }
        )
      }

      return NextResponse.json({
        data: result.data,
        success: true,
        message: 'Chart data updated successfully',
      } as ApiResponse<any>)
    } else {
      // Create new data if it doesn't exist
      const result = await JsonServerAPI.createChartData({
        endpoint,
        data,
      })

      if (!result.success) {
        return NextResponse.json(
          {
            data: null,
            success: false,
            error: 'CREATION_ERROR',
            message: 'Failed to create chart data',
          } as ApiResponse<null>,
          { status: 500 }
        )
      }

      return NextResponse.json({
        data: result.data,
        success: true,
        message: 'Chart data created successfully',
      } as ApiResponse<any>)
    }

  } catch (error) {
    console.error('Error updating chart data:', error)
    return NextResponse.json(
      {
        data: null,
        success: false,
        error: 'UPDATE_ERROR',
        message: 'An error occurred while updating chart data',
      } as ApiResponse<null>,
      { status: 500 }
    )
  }
} 