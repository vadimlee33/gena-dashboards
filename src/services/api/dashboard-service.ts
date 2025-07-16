import { Dashboard, Chart } from '@/features/dashboard/types';
import { generateDashboardId, generateChartId } from '@/lib/utils/id-generator';

// API endpoints
const API_BASE = 'http://localhost:3001';

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export class DashboardService {
  // Get all dashboards
  static async getDashboards(): Promise<Dashboard[]> {
    try {
      const response = await fetch(`${API_BASE}/dashboards`);
      if (!response.ok) {
        throw new Error('Failed to fetch dashboards');
      }
      const dashboards = await response.json();
      
      // For each dashboard, fetch its charts
      const dashboardsWithCharts = await Promise.all(
        dashboards.map(async (dashboard: any) => {
          const chartsResponse = await fetch(`${API_BASE}/charts?dashboardId=${dashboard.id}`);
          const charts = await chartsResponse.json();
          return {
            ...dashboard,
            charts: charts.sort((a: any, b: any) => a.order - b.order),
          };
        })
      );
      
      return dashboardsWithCharts;
    } catch (error) {
      console.error('Error fetching dashboards:', error);
      return [];
    }
  }

  // Get dashboard by ID
  static async getDashboard(id: string): Promise<Dashboard | null> {
    try {
      const response = await fetch(`${API_BASE}/dashboards/${id}`);
      if (!response.ok) {
        return null;
      }
      const dashboard = await response.json();
      
      // Fetch charts for this dashboard
      const chartsResponse = await fetch(`${API_BASE}/charts?dashboardId=${id}`);
      const charts = await chartsResponse.json();
      
      return {
        ...dashboard,
        charts: charts.sort((a: any, b: any) => a.order - b.order),
      };
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      return null;
    }
  }

  // Create new dashboard
  static async createDashboard(name: string): Promise<Dashboard | null> {
    try {
      const response = await fetch(`${API_BASE}/dashboards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name,
          description: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });
      if (!response.ok) {
        return null;
      }
      const dashboard = await response.json();
      return {
        ...dashboard,
        charts: [],
      };
    } catch (error) {
      console.error('Error creating dashboard:', error);
      return null;
    }
  }

  // Update dashboard
  static async updateDashboard(id: string, updates: Partial<Dashboard>): Promise<Dashboard> {
    try {
      const response = await fetch(`${API_BASE}/dashboards/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updates,
          updatedAt: new Date().toISOString(),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update dashboard');
      }
      const dashboard = await response.json();
      
      // Fetch charts for this dashboard
      const chartsResponse = await fetch(`${API_BASE}/charts?dashboardId=${id}`);
      const charts = await chartsResponse.json();
      
      return {
        ...dashboard,
        charts: charts.sort((a: any, b: any) => a.order - b.order),
      };
    } catch (error) {
      console.error('Error updating dashboard:', error);
      throw error;
    }
  }

  // Delete dashboard
  static async deleteDashboard(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE}/dashboards/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete dashboard');
      }
    } catch (error) {
      console.error('Error deleting dashboard:', error);
      throw error;
    }
  }

  // Add chart to dashboard
  static async addChart(dashboardId: string, chart: Omit<Chart, 'id'>): Promise<Chart> {
    try {
      const response = await fetch(`${API_BASE}/charts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...chart,
          dashboardId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add chart');
      }
      const newChart = await response.json();
      return newChart;
    } catch (error) {
      console.error('Error adding chart:', error);
      throw error;
    }
  }

  // Update chart
  static async updateChart(chartId: string, updates: Partial<Chart>): Promise<Chart> {
    try {
      const response = await fetch(`${API_BASE}/charts/${chartId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updates,
          updatedAt: new Date().toISOString(),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update chart');
      }
      const chart = await response.json();
      return chart;
    } catch (error) {
      console.error('Error updating chart:', error);
      throw error;
    }
  }

  // Delete chart
  static async deleteChart(chartId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE}/charts/${chartId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete chart');
      }
    } catch (error) {
      console.error('Error deleting chart:', error);
      throw error;
    }
  }

  // Reorder charts in dashboard
  static async reorderCharts(dashboardId: string, chartIds: string[]): Promise<void> {
    try {
      console.log('Sending reorder request:', { dashboardId, chartIds });
      
      // Get all charts for this dashboard
      const response = await fetch(`${API_BASE}/charts?dashboardId=${dashboardId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch charts from JSON Server');
      }
      
      const charts = await response.json();
      
      // Update order for each chart
      const updatePromises = charts.map(async (chart: any) => {
        const newOrder = chartIds.indexOf(chart.id);
        if (newOrder >= 0 && newOrder !== chart.order) {
          console.log(`Updating chart ${chart.id}: order ${chart.order} -> ${newOrder}`);
          
          const updateResponse = await fetch(`${API_BASE}/charts/${chart.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              order: newOrder,
              updatedAt: new Date().toISOString(),
            }),
          });
          
          if (!updateResponse.ok) {
            throw new Error(`Failed to update chart ${chart.id}`);
          }
        }
      });
      
      await Promise.all(updatePromises);
      console.log('Charts reordered successfully via JSON Server');
      
    } catch (error) {
      console.error('Error reordering charts:', error);
      throw error;
    }
  }
} 