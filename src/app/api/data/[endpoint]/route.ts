import { NextRequest, NextResponse } from 'next/server'
import { JsonServerAPI } from '@/lib/utils/json-server'
import { 
  ApiResponse, 
  ChartData, 
  NumberChartData
} from '@/lib/types/api'

// GET /api/data/[endpoint] - Get chart data by endpoint
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ endpoint: string }> }
) {
  try {
    const { endpoint } = await context.params;

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

    if (!result.success || !result.data || result.data.length === 0) {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: 'DATA_NOT_FOUND',
          message: `Chart data for endpoint '${endpoint}' not found`,
        } as ApiResponse<null>,
        { status: 404 }
      )
    }

    // Extract the actual chart data from the first result
    const chartData = result.data[0]
    const data = chartData.data

    return NextResponse.json({
      data,
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