import { useState } from 'react';
import { Chart } from '@/features/dashboard/types';

interface ChartConfig {
  type: 'number' | 'line' | 'bar';
  title: string;
  dataEndpoint: string;
  chartData: any;
  config?: any;
}

export const useChartModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingChart, setEditingChart] = useState<Chart | null>(null);

  const openCreateModal = () => {
    setIsEditing(false);
    setEditingChart(null);
    setIsOpen(true);
  };

  const openEditModal = (chart: Chart) => {
    setIsEditing(true);
    setEditingChart(chart);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsEditing(false);
    setEditingChart(null);
  };

  const handleSave = (config: ChartConfig) => {
    // This will be handled by the parent component
    closeModal();
  };

  return {
    isOpen,
    isEditing,
    editingChart,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSave,
  };
}; 