'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardView from '@/components/dashboard/dashboard-view';
import Button from '@/components/ui/button';
import { useDashboards } from '@/features/dashboard/hooks/use-dashboards';
import { DashboardService } from '@/services/api/dashboard-service';
import { Dashboard } from '@/features/dashboard/types';

const DashboardPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const dashboardId = params.id as string;

  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    dashboards: localDashboards,
    addChart,
    updateChart,
    deleteChart,
    reorderCharts,
  } = useDashboards();

  // Try to find dashboard in local state first, then fetch from API
  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError(null);

      // First try to find in local state
      const localDashboard = localDashboards.find(d => d.id === dashboardId);
      if (localDashboard) {
        setDashboard(localDashboard);
        setLoading(false);
        return;
      }

      // If not found locally, try to fetch from API
      try {
        const apiDashboard = await DashboardService.getDashboard(dashboardId);
        setDashboard(apiDashboard);
      } catch (error) {
        console.error('Failed to load dashboard:', error);
        setError('Dashboard not found');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [dashboardId, localDashboards]);

  // Refresh dashboard data when local dashboards change
  useEffect(() => {
    if (dashboardId) {
      const localDashboard = localDashboards.find(d => d.id === dashboardId);
      if (localDashboard) {
        setDashboard(localDashboard);
      }
    }
  }, [localDashboards, dashboardId]);

  const handleAddChart = async (dashboardId: string) => {
    try {
      // This will be handled by the chart modal in DashboardView
      // The modal will call addChart when a new chart is created
    } catch (error) {
      console.error('Failed to add chart:', error);
      // Optionally show error notification to user
    }
  };

  const handleReorderCharts = async (dashboardId: string, chartIds: string[]) => {
    try {
      await reorderCharts(dashboardId, chartIds);
    } catch (error) {
      console.error('Failed to reorder charts:', error);
      // Optionally show error notification to user
    }
  };

  const handleUpdateChart = async (chartId: string, updates: any) => {
    try {
      await updateChart(chartId, updates);
    } catch (error) {
      console.error('Failed to update chart:', error);
      // Optionally show error notification to user
    }
  };

  const handleDeleteChart = async (chartId: string) => {
    try {
      await deleteChart(chartId);
    } catch (error) {
      console.error('Failed to delete chart:', error);
      // Optionally show error notification to user
    }
  };

  const handleRefresh = async () => {
    try {
      const apiDashboard = await DashboardService.getDashboard(dashboardId);
      setDashboard(apiDashboard);
    } catch (error) {
      console.error('Failed to refresh dashboard:', error);
    }
  };

  const handleRenameDashboard = async (dashboardId: string, newName: string) => {
    try {
      await DashboardService.updateDashboard(dashboardId, { name: newName });
      // Refresh the dashboard to get the updated data
      const apiDashboard = await DashboardService.getDashboard(dashboardId);
      setDashboard(apiDashboard);
    } catch (error) {
      console.error('Failed to rename dashboard:', error);
      throw error; // Re-throw to let the component handle the error
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-gray-900 mb-4">Loading...</div>
        <p className="text-gray-600">Please wait while we load your dashboard.</p>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard not found</h1>
        <p className="text-gray-600 mb-6">The dashboard you're looking for doesn't exist.</p>
        <Button variant="primary" onClick={() => router.push('/')}>
          Back to Dashboards
        </Button>
      </div>
    );
  }

  // Ensure dashboard has charts property
  const dashboardWithCharts = {
    ...dashboard,
    charts: dashboard.charts || []
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <Button variant="secondary" onClick={() => router.push('/')}>
          ← Back to Dashboards
        </Button>
      </div>
      <DashboardView
        dashboard={dashboardWithCharts}
        onAddChart={handleAddChart}
        onUpdateChart={handleUpdateChart}
        onDeleteChart={handleDeleteChart}
        onReorderCharts={handleReorderCharts}
        onRefresh={handleRefresh}
        onRenameDashboard={handleRenameDashboard}
      />
    </div>
  );
};

export default DashboardPage; 