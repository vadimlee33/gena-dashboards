// Dashboard feature types
export interface Chart {
  id: string;
  dashboardId: string;
  type: 'bar' | 'line' | 'number';
  title: string;
  description?: string;
  dataEndpoint: string;
  order: number;
  config?: ChartConfig;
  createdAt?: string; // ISO date string from API
  updatedAt?: string; // ISO date string from API
}

export interface ChartConfig {
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  animate?: boolean;
  height?: number;
  width?: number;
}

export interface Dashboard {
  id: string;
  name: string;
  description?: string;
  charts: Chart[];
  createdAt?: string; // ISO date string from API
  updatedAt?: string; // ISO date string from API
}

export interface DashboardListProps {
  dashboards: Dashboard[];
  onCreate: (name: string) => void | Promise<void>;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  isCreating?: boolean;
  isLoading?: boolean;
}

export interface DashboardViewProps {
  dashboard: Dashboard;
  onAddChart: (dashboardId: string) => void;
  onUpdateChart: (chartId: string, updates: Partial<Chart>) => void;
  onDeleteChart: (chartId: string) => void;
} 