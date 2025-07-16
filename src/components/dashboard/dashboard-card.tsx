import React, { useState } from 'react';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Badge from '@/components/ui/badge';
import { cardStyles, combineClasses } from '@/lib/styles/component-styles';
import { Dashboard } from '@/features/dashboard/types';

interface DashboardCardProps {
  dashboard: Dashboard;
  chartCount: number;
  onSelect: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  dashboard,
  chartCount,
  onSelect,
  onRename,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(dashboard.name);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditName(dashboard.name);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(dashboard.id);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editName.trim()) {
      onRename(dashboard.id, editName.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditName(dashboard.name);
  };

  return (
    <Card padding="lg" onClick={() => onSelect(dashboard.id)}>
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            label="Dashboard Name"
            className="w-full"
            autoFocus
          />
          <div className="flex gap-3">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="flex-1"
            >
              Save Changes
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-5">
          {/* Header Section */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-br from-blue-500 to-indigo-600">
                📊
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xl font-bold truncate text-gray-900">
                  {dashboard.name}
                </h4>
                <div className="flex items-center space-x-3 mt-2">
                  {dashboard.createdAt && (
                    <span className="text-sm text-gray-500">
                      Created {new Date(dashboard.createdAt).toLocaleDateString()}
                    </span>
                  )}
                  <span className="text-sm text-gray-500">
                    Charts: {chartCount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="text-sm font-medium text-gray-500">
              Click to view dashboard
            </div>
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="withIcon"
                size="sm"
                onClick={handleEdit}
              >
                ✏️ Edit
              </Button>
              <Button
                variant="withIcon"
                size="sm"
                onClick={handleDelete}
              >
                🗑️ Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DashboardCard; 