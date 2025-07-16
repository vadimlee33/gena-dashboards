import { useState, useEffect } from 'react';
import { Dashboard, Chart } from '../types';
import { DashboardService } from '@/services/api/dashboard-service';
import { generateDashboardId, generateChartId } from '@/lib/utils/id-generator';

// No hardcoded data - everything comes from API

export const useDashboards = () => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(false);

  // Load dashboards from API on mount
  useEffect(() => {
    const loadDashboards = async () => {
      try {
        setLoading(true);
        const apiDashboards = await DashboardService.getDashboards();
        
        if (apiDashboards && Array.isArray(apiDashboards)) {
          setDashboards(apiDashboards);
        } else {
          setDashboards([]);
        }
      } catch (error) {
        console.error('Failed to load dashboards from API:', error);
        setDashboards([]);
      } finally {
        setLoading(false);
      }
    };

    loadDashboards();
  }, []);

  const createDashboard = async (name: string) => {
    try {
      setLoading(true);
      // Create dashboard via API
      const newDashboard = await DashboardService.createDashboard(name);
      
      if (newDashboard) {
        // Add to local state if API call was successful
        setDashboards(prev => [...prev, newDashboard]);
      } else {
        // Fallback to local creation if API fails
        const fallbackDashboard: Dashboard = {
          id: generateDashboardId(),
          name,
          description: '',
          charts: [],
        };
        setDashboards(prev => [...prev, fallbackDashboard]);
      }
    } catch (error) {
      console.error('Failed to create dashboard:', error);
      // Fallback to local creation if API fails
      const fallbackDashboard: Dashboard = {
        id: generateDashboardId(),
        name,
        description: '',
        charts: [],
      };
      setDashboards(prev => [...prev, fallbackDashboard]);
    } finally {
      setLoading(false);
    }
  };

  const renameDashboard = (id: string, name: string) => {
    setDashboards(prev => prev.map(d => d.id === id ? { ...d, name } : d));
  };

  const deleteDashboard = (id: string) => {
    setDashboards(prev => prev.filter(d => d.id !== id));
  };

  const addChart = async (dashboardId: string, config: any) => {
    try {
      setLoading(true);
      // Create chart via API
      const newChart = await DashboardService.addChart(dashboardId, {
        dashboardId,
        type: config.type || 'bar',
        title: config.title || 'New Chart',
        description: config.description,
        dataEndpoint: config.dataEndpoint || '/api/data/sample',
        order: config.order || 0,
        config: config.config || {},
      });
      if (newChart) {
        // Refresh dashboard data after adding chart to update charts list
        const updatedDashboard = await DashboardService.getDashboard(dashboardId);
        if (updatedDashboard) {
          setDashboards(prev => prev.map(d => d.id === dashboardId ? updatedDashboard : d));
        }
      } else {
        // Fallback to local creation if API fails
        const fallbackChart: Chart = {
          id: generateChartId(),
          dashboardId,
          type: config.type || 'bar',
          title: config.title || 'New Chart',
          description: config.description,
          dataEndpoint: config.dataEndpoint || '/api/data/sample',
          order: config.order || 0,
          config: config.config || {},
        };
        setDashboards(prev => prev.map(d =>
          d.id === dashboardId
            ? { ...d, charts: [...(d.charts || []), fallbackChart] }
            : d
        ));
      }
    } catch (error) {
      console.error('Failed to add chart:', error);
      // Fallback to local creation if API fails
      const fallbackChart: Chart = {
        id: generateChartId(),
        dashboardId,
        type: config.type || 'bar',
        title: config.title || 'New Chart',
        description: config.description,
        dataEndpoint: config.dataEndpoint || '/api/data/sample',
        order: config.order || 0,
        config: config.config || {},
      };
      setDashboards(prev => prev.map(d =>
        d.id === dashboardId
          ? { ...d, charts: [...(d.charts || []), fallbackChart] }
          : d
      ));
    } finally {
      setLoading(false);
    }
  };

  const updateChart = async (chartId: string, updates: Partial<Chart>) => {
    try {
      // Update chart via API
      const updatedChart = await DashboardService.updateChart(chartId, updates);
      
      if (updatedChart) {
        // Update local state if API call was successful
        setDashboards(prev => prev.map(d => ({
          ...d,
          charts: (d.charts || []).map(c => c.id === chartId ? updatedChart : c),
        })));
      }
    } catch (error) {
      console.error('Failed to update chart:', error);
      // Fallback to local update if API fails
      setDashboards(prev => prev.map(d => ({
        ...d,
        charts: (d.charts || []).map(c => c.id === chartId ? { ...c, ...updates } : c),
      })));
    }
  };

  const deleteChart = async (chartId: string) => {
    try {
      // Delete chart via API
      await DashboardService.deleteChart(chartId);
      
      // Update local state if API call was successful
      setDashboards(prev => prev.map(d => ({
        ...d,
        charts: (d.charts || []).filter(c => c.id !== chartId),
      })));
    } catch (error) {
      console.error('Failed to delete chart:', error);
      // Fallback to local delete if API fails
      setDashboards(prev => prev.map(d => ({
        ...d,
        charts: (d.charts || []).filter(c => c.id !== chartId),
      })));
    }
  };

  const reorderCharts = async (dashboardId: string, chartIds: string[]) => {
    // Update local state immediately for better UX
    setDashboards(prev => prev.map(d => {
      if (d.id !== dashboardId) return d;
      
      // Get current charts for this dashboard
      const currentCharts = d.charts || [];
      
      // Create a map of chart IDs to their new order
      const orderMap = new Map(chartIds.map((id, index) => [id, index]));
      
      // Update charts with new order
      const updatedCharts = currentCharts.map(chart => ({
        ...chart,
        order: orderMap.get(chart.id) ?? chart.order,
      }));
      
      // Sort charts by their new order
      const sortedCharts = updatedCharts.sort((a, b) => a.order - b.order);
      
      return {
        ...d,
        charts: sortedCharts,
      };
    }));

    // Save to API
    try {
      await DashboardService.reorderCharts(dashboardId, chartIds);
      // Refresh dashboard data after reorder to update chart order
      const updatedDashboard = await DashboardService.getDashboard(dashboardId);
      if (updatedDashboard) {
        setDashboards(prev => prev.map(d => d.id === dashboardId ? updatedDashboard : d));
      }
    } catch (error) {
      console.error('Failed to save chart order to API:', error);
      // Optionally revert local changes on error
    }
  };

  return {
    dashboards,
    loading,
    createDashboard,
    renameDashboard,
    deleteDashboard,
    addChart,
    updateChart,
    deleteChart,
    reorderCharts,
  };
}; 