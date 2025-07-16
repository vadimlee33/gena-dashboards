import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/modal';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { combineClasses } from '@/lib/styles/component-styles';

interface ChartData {
  labels?: string[];
  values?: number[];
  value?: number;
  label?: string;
  unit?: string;
}

interface ChartConfig {
  type: 'number' | 'line' | 'bar';
  title: string;
  dataEndpoint: string;
  chartData: ChartData;
  config?: any;
}

interface Chart {
  id: string;
  dashboardId: string;
  type: 'number' | 'line' | 'bar';
  title: string;
  description?: string;
  dataEndpoint: string;
  order: number;
  config?: any;
}

interface ChartConfigModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (config: ChartConfig) => void;
  chart?: Chart; // Optional chart for editing mode
  isEditing?: boolean; // Flag to indicate if we're editing
}

const ChartConfigModal: React.FC<ChartConfigModalProps> = ({ 
  open, 
  onClose, 
  onSave, 
  chart, 
  isEditing = false 
}) => {
  const [type, setType] = useState<'number' | 'line' | 'bar'>('bar');
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#3B82F6');
  
  // Chart data fields
  const [numberValue, setNumberValue] = useState('');
  const [numberLabel, setNumberLabel] = useState('');
  const [numberUnit, setNumberUnit] = useState('');
  const [labels, setLabels] = useState('');
  const [values, setValues] = useState('');

  // Load chart data for editing
  useEffect(() => {
    if (open) {
      if (isEditing && chart) {
        // Load existing chart data for editing
        setType(chart.type);
        setTitle(chart.title);
        setColor(chart.config?.colors?.[0] || '#3B82F6');
        
        // Load chart data from endpoint
        loadChartData(chart.dataEndpoint);
      } else {
        // Reset form for new chart
        setTitle('');
        setType('bar');
        setColor('#3B82F6');
        setNumberValue('');
        setNumberLabel('');
        setNumberUnit('');
        setLabels('');
        setValues('');
      }
    }
  }, [open, chart, isEditing]);

  const loadChartData = async (dataEndpoint: string) => {
    try {
      const endpoint = dataEndpoint.replace('/api/data/', '');
      const response = await fetch(`/api/chart-data?endpoint=${endpoint}`);
      
      if (response.ok) {
        const result = await response.json();
        const chartData = result.data;
        
        console.log('Loading chart data:', chartData); // Debug log
        
        if (!chartData) {
          console.warn('No chart data found for endpoint:', endpoint);
          return;
        }
        
        if (chart.type === 'number') {
          setNumberValue(chartData.value?.toString() || '');
          setNumberLabel(chartData.label || '');
          setNumberUnit(chartData.unit || '');
        } else {
          // Handle different data formats for bar/line charts
          let labels = '';
          let values = '';
          
          if (chartData.labels && Array.isArray(chartData.labels)) {
            labels = chartData.labels.join(', ');
          }
          
          if (chartData.values && Array.isArray(chartData.values)) {
            values = chartData.values.join(', ');
          }
          
          setLabels(labels);
          setValues(values);
        }
      } else {
        console.warn('Failed to load chart data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to load chart data:', error);
    }
  };

  const generateEndpoint = (title: string): string => {
    // Ensure minimum length for valid endpoint
    const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const endpoint = cleanTitle.length < 3 ? `chart_${cleanTitle}_${Date.now()}` : cleanTitle;
    return `/api/data/${endpoint}`;
  };

  const generateChartDataEndpoint = (title: string): string => {
    // Ensure minimum length for valid endpoint
    const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const endpoint = cleanTitle.length < 3 ? `chart_${cleanTitle}_${Date.now()}` : cleanTitle;
    return endpoint;
  };

  const handleSave = async () => {
    if (!title.trim()) return;

    // Validate title length for new charts
    if (!isEditing && title.trim().length < 3) {
      alert('Chart title must be at least 3 characters long');
      return;
    }

    // When editing, preserve the original dataEndpoint
    const dataEndpoint = isEditing && chart ? chart.dataEndpoint : generateEndpoint(title);
    let chartData: ChartData = {};

    // Prepare chart data based on type
    if (type === 'number') {
      if (!numberValue.trim()) {
        alert('Please enter a value for the number chart');
        return;
      }
      chartData = {
        value: parseFloat(numberValue),
        label: numberLabel || title,
        unit: numberUnit || '',
      };
    } else {
      if (!labels.trim() || !values.trim()) {
        alert('Please enter both labels and values for the chart');
        return;
      }
      
      const labelsArray = labels.split(',').map(l => l.trim()).filter(l => l);
      const valuesArray = values.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
      
      if (labelsArray.length === 0 || valuesArray.length === 0) {
        alert('Please enter valid labels and values');
        return;
      }
      
      if (labelsArray.length !== valuesArray.length) {
        alert('Number of labels must match number of values');
        return;
      }
      
      chartData = {
        labels: labelsArray,
        values: valuesArray,
      };
    }

    // Save chart data to API
    try {
      // When editing, use the existing endpoint; when creating, generate new one
      const chartDataEndpoint = isEditing && chart 
        ? chart.dataEndpoint.replace('/api/data/', '') 
        : generateChartDataEndpoint(title);
        
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch('/api/chart-data', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: chartDataEndpoint,
          data: chartData,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? 'update' : 'save'} chart data`);
      }
    } catch (error) {
      console.error(`Failed to ${isEditing ? 'update' : 'save'} chart data:`, error);
      // Continue anyway, the chart will be created with the data
    }

    onSave({ 
      type, 
      title: title.trim(), 
      dataEndpoint,
      chartData,
      config: {
        colors: [color],
        showLegend: true,
        showGrid: true,
        animate: true,
      }
    });
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setType('bar');
    setColor('#3B82F6');
    setNumberValue('');
    setNumberLabel('');
    setNumberUnit('');
    setLabels('');
    setValues('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={isEditing ? "Edit Chart" : "Add New Chart"}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chart Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'number' | 'line' | 'bar')}
            className={combineClasses(
              'w-full border border-gray-300 rounded-md px-3 py-2 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
              'transition-colors duration-200'
            )}
            disabled={isEditing} // Disable type change when editing
          >
            <option value="number">Number Chart</option>
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
          </select>
          {isEditing && (
            <p className="text-xs text-gray-500 mt-1">
              Chart type cannot be changed after creation
            </p>
          )}
        </div>

        <div>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter chart title"
            label="Chart Title"
            helpText={isEditing ? "Choose a descriptive title for your chart" : "Choose a descriptive title for your chart (minimum 3 characters)"}
          />
        </div>

        {/* Chart Data Input */}
        {type === 'number' ? (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Number Chart Data</h4>
            
            <Input
              value={numberValue}
              onChange={(e) => setNumberValue(e.target.value)}
              placeholder="Enter number value"
              label="Value"
              helpText="Enter the numeric value to display"
              type="number"
            />
            
            <Input
              value={numberLabel}
              onChange={(e) => setNumberLabel(e.target.value)}
              placeholder="Enter label (optional)"
              label="Label"
              helpText="Optional label for the number"
            />
            
            <Input
              value={numberUnit}
              onChange={(e) => setNumberUnit(e.target.value)}
              placeholder="Enter unit (optional)"
              label="Unit"
              helpText="Optional unit (e.g., USD, users, %)"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Chart Data</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Labels
              </label>
              <textarea
                value={labels}
                onChange={(e) => setLabels(e.target.value)}
                placeholder="Enter labels separated by commas (e.g., Jan, Feb, Mar)"
                className={combineClasses(
                  'w-full border border-gray-300 rounded-md px-3 py-2 text-sm',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  'transition-colors duration-200',
                  'resize-none'
                )}
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter labels separated by commas
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Values
              </label>
              <textarea
                value={values}
                onChange={(e) => setValues(e.target.value)}
                placeholder="Enter values separated by commas (e.g., 10, 20, 30)"
                className={combineClasses(
                  'w-full border border-gray-300 rounded-md px-3 py-2 text-sm',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  'transition-colors duration-200',
                  'resize-none'
                )}
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter numeric values separated by commas
              </p>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chart Color
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer"
            />
            <span className="text-sm text-gray-500">{color}</span>
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSave} 
            disabled={!title.trim()}
          >
            {isEditing ? 'Update Chart' : 'Add Chart'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ChartConfigModal; 