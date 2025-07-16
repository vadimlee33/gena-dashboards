import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

interface ReorderRequest {
  chartIds: string[];
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: dashboardId } = await params;
    const { chartIds }: ReorderRequest = await request.json();

    console.log('Reorder request:', { dashboardId, chartIds });

    if (!chartIds || !Array.isArray(chartIds)) {
      return NextResponse.json(
        { success: false, error: 'Invalid chartIds array' },
        { status: 400 }
      );
    }

    // Read current database
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    // Find the dashboard
    const dashboard = dbData.dashboards?.find((d: any) => d.id === dashboardId);
    if (!dashboard) {
      console.log('Dashboard not found:', dashboardId);
      console.log('Available dashboards:', dbData.dashboards?.map((d: any) => d.id));
      return NextResponse.json(
        { success: false, error: 'Dashboard not found' },
        { status: 404 }
      );
    }

    // Get all charts for this dashboard
    const dashboardCharts = dbData.charts?.filter((c: any) => c.dashboardId === dashboardId) || [];
    console.log('Found charts for dashboard:', dashboardCharts.length);
    
    // Check if all requested charts exist
    const existingChartIds = dashboardCharts.map((c: any) => c.id);
    const missingCharts = chartIds.filter(id => !existingChartIds.includes(id));
    if (missingCharts.length > 0) {
      console.log('Missing charts:', missingCharts);
      return NextResponse.json(
        { success: false, error: `Charts not found: ${missingCharts.join(', ')}` },
        { status: 404 }
      );
    }
    
    // Update order for each chart based on the new order
    const updatedCharts = dashboardCharts.map((chart: any) => {
      const newOrder = chartIds.indexOf(chart.id);
      const updatedChart = {
        ...chart,
        order: newOrder >= 0 ? newOrder : chart.order,
      };
      console.log(`Chart ${chart.id}: order ${chart.order} -> ${updatedChart.order}`);
      return updatedChart;
    });

    // Update charts in database
    dbData.charts = dbData.charts.map((chart: any) => {
      const updatedChart = updatedCharts.find((c: any) => c.id === chart.id);
      return updatedChart || chart;
    });

    // Write back to database
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    
    // Verify the changes were written
    const verificationData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const verificationCharts = verificationData.charts?.filter((c: any) => c.dashboardId === dashboardId) || [];
    console.log('Verification - charts after save:', verificationCharts.map((c: any) => ({ id: c.id, order: c.order })));

    console.log('Charts reordered successfully');

    return NextResponse.json({
      success: true,
      message: 'Charts reordered successfully',
      data: updatedCharts.sort((a: any, b: any) => a.order - b.order),
    });

  } catch (error) {
    console.error('Error reordering charts:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 