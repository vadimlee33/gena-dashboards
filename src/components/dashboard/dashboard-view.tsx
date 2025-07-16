import React, { useState, useCallback, useMemo } from 'react';
import ChartWrapper from '@/components/charts/chart-wrapper';
import ChartConfigModal from '@/components/charts/chart-config-modal';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import { GripVertical, Edit, Trash2, Edit3 } from 'lucide-react';
import { useChartModal } from '@/features/charts/hooks/use-chart-modal';
import { Chart, Dashboard } from '@/features/dashboard/types';

interface DashboardViewProps {
  dashboard: Dashboard;
  onAddChart: (dashboardId: string) => void;
  onUpdateChart: (chartId: string, updates: Partial<Chart>) => void;
  onDeleteChart: (chartId: string) => void;
  onReorderCharts?: (dashboardId: string, chartIds: string[]) => Promise<void>;
  onRefresh?: () => void; // Add refresh callback
  onRenameDashboard?: (dashboardId: string, newName: string) => Promise<void>; // Add rename callback
}

const DashboardViewComponent: React.FC<DashboardViewProps> = ({
  dashboard,
  onAddChart,
  onUpdateChart,
  onDeleteChart,
  onReorderCharts,
  onRefresh,
  onRenameDashboard,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newDashboardName, setNewDashboardName] = useState(dashboard.name);
  
  const {
    isOpen: isChartModalOpen,
    isEditing,
    editingChart,
    openCreateModal,
    openEditModal,
    closeModal,
  } = useChartModal();

  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', index.toString());
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex || !onReorderCharts) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const charts = [...dashboard.charts];
    const [draggedChart] = charts.splice(draggedIndex, 1);
    charts.splice(dropIndex, 0, draggedChart);

    // Update order property for each chart
    const updatedCharts = charts.map((chart, index) => ({
      ...chart,
      order: index,
    }));

    // Show saving indicator
    setIsSaving(true);

    try {
      // Call the reorder callback with new chart IDs in order
      await onReorderCharts(dashboard.id, updatedCharts.map(chart => chart.id));
    } catch (error) {
      console.error('Failed to save chart order:', error);
      // Optionally show error notification
    } finally {
      setIsSaving(false);
    }
    
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, [draggedIndex, onReorderCharts, dashboard.charts, dashboard.id]);

  const handleUpdateChart = useCallback((chartId: string) => {
    const chart = dashboard.charts.find(c => c.id === chartId);
    if (chart) {
      openEditModal(chart);
    }
  }, [onUpdateChart, dashboard.charts, openEditModal]);

  const handleDeleteChart = useCallback((chartId: string) => {
    onDeleteChart(chartId);
  }, [onDeleteChart]);

  const handleAddChart = useCallback(() => {
    openCreateModal();
  }, [openCreateModal]);

  const handleChartSave = useCallback(async (config: any) => {
    if (isEditing && editingChart) {
      // Update existing chart - preserve the original dataEndpoint
      try {
        await onUpdateChart(editingChart.id, {
          title: config.title,
          // Don't update dataEndpoint - keep the original
          config: config.config,
        });
      } catch (error) {
        console.error('Failed to update chart:', error);
      }
    } else {
      // Add new chart
      try {
        // Create chart data first
        const chartDataEndpoint = config.dataEndpoint.replace('/api/data/', '');
        const chartDataResponse = await fetch('/api/chart-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            endpoint: chartDataEndpoint,
            data: config.chartData,
          }),
        });

        if (!chartDataResponse.ok) {
          throw new Error('Failed to save chart data');
        }

        // Create the chart
        const chartResponse = await fetch('/api/charts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dashboardId: dashboard.id,
            type: config.type,
            title: config.title,
            dataEndpoint: config.dataEndpoint,
            order: dashboard.charts.length,
            config: config.config,
          }),
        });

        if (!chartResponse.ok) {
          throw new Error('Failed to create chart');
        }

        onRefresh?.();
      } catch (error) {
        console.error('Failed to create chart:', error);
      }
    }
  }, [isEditing, editingChart, onUpdateChart, dashboard.id, dashboard.charts.length, onRefresh]);

  const handleRenameDashboard = useCallback(async () => {
    if (onRenameDashboard) {
      // Validate the new name
      if (!newDashboardName.trim()) {
        alert('Dashboard name cannot be empty');
        return;
      }
      
      setIsSaving(true);
      try {
        await onRenameDashboard(dashboard.id, newDashboardName.trim());
        onRefresh?.();
      } catch (error) {
        console.error('Failed to rename dashboard:', error);
        alert('Failed to rename dashboard. Please try again.');
      } finally {
        setIsSaving(false);
        setIsRenaming(false);
      }
    }
  }, [dashboard.id, newDashboardName, onRenameDashboard, onRefresh]);

  // Memoize sorted charts to prevent unnecessary re-sorting
  const sortedCharts = useMemo(() => 
    dashboard.charts?.sort((a, b) => a.order - b.order) || [], 
    [dashboard.charts]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between group">
        <div className="flex items-center gap-3">
          {isRenaming ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newDashboardName}
                onChange={(e) => setNewDashboardName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRenameDashboard();
                  } else if (e.key === 'Escape') {
                    setIsRenaming(false);
                    setNewDashboardName(dashboard.name);
                  }
                }}
                className="text-3xl font-bold border-2 border-blue-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <Button
                size="sm"
                onClick={handleRenameDashboard}
                disabled={isSaving}
                className="bg-green-500 hover:bg-green-600"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setIsRenaming(false);
                  setNewDashboardName(dashboard.name);
                }}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{dashboard.name}</h1>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setIsRenaming(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                title="Rename dashboard"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
          )}
          {isSaving && (
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Saving...</span>
            </div>
          )}
        </div>
        <Button onClick={handleAddChart}>
          Add Chart
        </Button>
      </div>
      
      {(!dashboard.charts || dashboard.charts.length === 0) ? (
        <Card className="text-center py-12">
          <p className="text-gray-500 mb-4">No charts yet. Add your first chart to get started!</p>
          <Button onClick={handleAddChart}>
            Add First Chart
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {sortedCharts.map((chart, index) => (
            <div
              key={chart.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              className={`relative group transition-all duration-200 ${
                draggedIndex === index ? 'opacity-50 scale-95' : ''
              } ${
                dragOverIndex === index && draggedIndex !== index 
                  ? 'border-2 border-blue-300 bg-blue-50 rounded-lg' 
                  : ''
              }`}
            >
              {/* Drag Handle */}
              <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing bg-white/80 backdrop-blur-sm rounded-md p-1 shadow-sm border">
                <GripVertical className="w-4 h-4 text-gray-500" />
              </div>

              {/* Chart Content */}
              <div className="w-full">
                <ChartWrapper 
                  key={`${chart.id}-${chart.updatedAt ? new Date(chart.updatedAt).getTime() : Date.now()}`}
                  chart={chart} 
                />
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleUpdateChart(chart.id)}
                  className="backdrop-blur-sm shadow-sm"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteChart(chart.id)}
                  className="backdrop-blur-sm shadow-sm"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>

              {/* Drop Indicator */}
              {dragOverIndex === index && draggedIndex !== index && (
                <div className="absolute inset-0 bg-blue-100 border-2 border-blue-300 rounded-lg opacity-30 pointer-events-none" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Chart Configuration Modal */}
      <ChartConfigModal
        open={isChartModalOpen}
        onClose={closeModal}
        onSave={handleChartSave}
        chart={editingChart}
        isEditing={isEditing}
      />
    </div>
  );
};

const DashboardView = React.memo(DashboardViewComponent);

DashboardView.displayName = 'DashboardView';

export default DashboardView; 