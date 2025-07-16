'use client';

import React, { useState } from 'react';
import DashboardList from '@/components/dashboard/dashboard-list';
import { useDashboards } from '@/features/dashboard/hooks/use-dashboards';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  
  const {
    dashboards,
    loading,
    createDashboard,
    renameDashboard,
    deleteDashboard,
  } = useDashboards();

  const handleSelectDashboard = (id: string) => {
    router.push(`/dashboard/${id}`);
  };

  const handleCreateDashboard = async (name: string) => {
    setIsCreating(true);
    try {
      await createDashboard(name);
    } catch (error) {
      console.error('Failed to create dashboard:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-full">
      <DashboardList
        dashboards={dashboards}
        onCreate={handleCreateDashboard}
        onRename={renameDashboard}
        onDelete={deleteDashboard}
        onSelect={handleSelectDashboard}
        isCreating={isCreating}
        isLoading={loading}
      />
    </div>
  );
};

export default HomePage; 