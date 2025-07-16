import React, { useState } from 'react';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Badge from '@/components/ui/badge';
import DashboardCard from './dashboard-card';
import { dashboardStyles, combineClasses } from '@/lib/styles/component-styles';

interface Dashboard {
  id: string;
  name: string;
  createdAt?: Date;
  chartCount?: number;
}

interface DashboardListProps {
  dashboards: Dashboard[];
  onCreate: (name: string) => void | Promise<void>;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  isCreating?: boolean;
  isLoading?: boolean;
}

const DashboardList: React.FC<DashboardListProps> = ({ 
  dashboards, 
  onCreate, 
  onRename, 
  onDelete, 
  onSelect,
  isCreating = false,
  isLoading = false,
}) => {
  const [newName, setNewName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && !isCreating) {
      await onCreate(newName.trim());
      setNewName('');
    }
  };

  return (
    <div className={dashboardStyles.container}>
      {/* Create Dashboard Section */}
      <Card padding="xl" className={dashboardStyles.createSection}>
        <div className={dashboardStyles.createHeader}>
          <h2 className={combineClasses(dashboardStyles.title, dashboardStyles.createTitle)}>
            Create New Dashboard
          </h2>
          <p className={dashboardStyles.subtitle}>
            Create a new dashboard to start visualizing your data and track your metrics
          </p>
        </div>
        
        <form
          onSubmit={handleSubmit}
          className={dashboardStyles.createForm}
        >
          <div className={dashboardStyles.createInput}>
            <Input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Enter dashboard name..."
              label="Dashboard Name"
              helpText="Choose a descriptive name for your dashboard"
              className="w-full"
              disabled={isCreating}
            />
          </div>
          <Button 
            type="submit" 
            variant="primary" 
            size="lg"
            className={dashboardStyles.createButton}
            disabled={isCreating || !newName.trim()}
          >
            {isCreating ? 'Creating...' : 'Create Dashboard'}
          </Button>
        </form>
      </Card>

      {/* Dashboard List */}
      <div className={dashboardStyles.listSection}>
        <div className={dashboardStyles.header}>
          <div>
            <h3 className={combineClasses(dashboardStyles.title, 'text-xl')}>
              Your Dashboards
            </h3>
            <p className={dashboardStyles.subtitle}>
              {dashboards.length} dashboard{dashboards.length !== 1 ? 's' : ''} • Manage your data visualizations
            </p>
          </div>
          <div className={dashboardStyles.actions}>
            <Badge variant="primary" size="lg">
              {dashboards.length} Total
            </Badge>
          </div>
        </div>
        
        {isLoading ? (
          <Card padding="xl" className={dashboardStyles.emptyCard}>
            <div className={dashboardStyles.empty}>
              <div className={dashboardStyles.emptyIcon}>
                ⏳
              </div>
              <h3 className={dashboardStyles.emptyTitle}>Loading dashboards...</h3>
              <p className={dashboardStyles.emptyDescription}>
                Please wait while we load your dashboards.
              </p>
            </div>
          </Card>
        ) : dashboards.length === 0 ? (
          <Card padding="xl" className={dashboardStyles.emptyCard}>
            <div className={dashboardStyles.empty}>
              <div className={dashboardStyles.emptyIcon}>
                📊
              </div>
              <h3 className={dashboardStyles.emptyTitle}>No dashboards yet</h3>
              <p className={dashboardStyles.emptyDescription}>
                Get started by creating your first dashboard to visualize your data and track important metrics.
              </p>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => document.querySelector('input')?.focus()}
              >
                Create Your First Dashboard
              </Button>
            </div>
          </Card>
        ) : (
          <div >
            {dashboards.map(dashboard => (
              <DashboardCard
                key={dashboard.id}
                dashboard={dashboard}
                onSelect={onSelect}
                onRename={onRename}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardList;