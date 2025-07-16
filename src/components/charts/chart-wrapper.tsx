import React, { useState, useEffect, useCallback, useMemo } from 'react';
import NumberChart from './number-chart';
import LineChart from './line-chart';
import BarChart from './bar-chart';
import Card from '@/components/ui/card';
import { chartStyles, combineClasses } from '@/lib/styles/component-styles';
import { Chart } from '@/features/dashboard/types';

interface ChartData {
  labels: string[];
  values: number[];
}

interface NumberChartData {
  value: number;
  label?: string;
  unit?: string;
}

interface ChartWrapperProps {
  chart: Chart;
  className?: string;
}

const ChartWrapperComponent: React.FC<ChartWrapperProps> = ({ chart, className = '' }) => {
  const [data, setData] = useState<ChartData | NumberChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the data endpoint to prevent unnecessary re-fetches
  const dataEndpoint = useMemo(() => chart.dataEndpoint, [chart.dataEndpoint]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Ensure we're using the correct base URL
      const baseUrl = window.location.origin;
      const fullUrl = `${baseUrl}${dataEndpoint}`;
      
      console.log('Fetching chart data from:', fullUrl);
      console.log('Chart dataEndpoint:', dataEndpoint);
      console.log('Chart object:', chart);
      
      const response = await fetch(fullUrl);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`API endpoint not found: ${dataEndpoint}`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      
      const result = await response.json();
      
      // Handle the API response format
      if (result.data) {
        setData(result.data);
      } else if (result.labels && result.values) {
        // Direct chart data format
        setData(result);
      } else if (result.value !== undefined) {
        // Direct number data format
        setData(result);
      } else if (result.labels && Array.isArray(result.labels) && result.values && Array.isArray(result.values)) {
        // Alternative format
        setData(result);
      } else {
        console.error('Invalid data format:', result);
        throw new Error('Invalid data format');
      }
    } catch (err) {
      console.error('Error fetching chart data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load chart data');
    } finally {
      setLoading(false);
    }
  }, [dataEndpoint, chart]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderChart = useCallback(() => {
    if (loading) {
      return (
        <div className={chartStyles.loading}>
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin h-8 w-8 text-gray-400 mb-2 flex items-center justify-center text-2xl">
              ⏳
            </div>
            <span className="text-sm text-gray-500">Loading chart...</span>
          </div>
        </div>
      );
    }

    if (error || !data) {
      return (
        <div className={chartStyles.error}>
          <div className="flex flex-col items-center justify-center">
            <div className="h-8 w-8 text-red-400 mb-2 flex items-center justify-center text-2xl">
              ⚠️
            </div>
            <span className="text-sm text-red-500">{error || 'No data available'}</span>
            <span className="text-xs text-gray-400 mt-1">Endpoint: {dataEndpoint}</span>
            <button 
              onClick={() => fetchData()} 
              className="mt-2 text-xs text-blue-500 hover:text-blue-700 underline"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    const colors = chart.config?.colors || ['#3B82F6'];

    switch (chart.type) {
      case 'number':
        const numberData = data as NumberChartData;
        if (numberData.value === undefined || numberData.value === null || typeof numberData.value !== 'number') {
          return (
            <div className={chartStyles.error}>
              <div className="flex flex-col items-center justify-center">
                <div className="h-8 w-8 text-red-400 mb-2 flex items-center justify-center text-2xl">⚠️</div>
                <span className="text-sm text-red-500">Invalid number chart data</span>
              </div>
            </div>
          );
        }
        return (
          <NumberChart
            value={numberData.value}
            label={numberData.label}
            unit={numberData.unit}
            color={colors[0]}
          />
        );
      case 'line':
        const lineData = data as ChartData;
        if (!lineData.labels || !Array.isArray(lineData.labels) || !lineData.values || !Array.isArray(lineData.values) || lineData.labels.length === 0 || lineData.values.length === 0) {
          return (
            <div className={chartStyles.error}>
              <div className="flex flex-col items-center justify-center">
                <div className="h-8 w-8 text-red-400 mb-2 flex items-center justify-center text-2xl">⚠️</div>
                <span className="text-sm text-red-500">Invalid line chart data</span>
              </div>
            </div>
          );
        }
        const lineChartData = lineData.labels.map((label, index) => ({
          name: label,
          value: typeof lineData.values[index] === 'number' ? lineData.values[index] : 0,
        }));
        return (
          <LineChart
            data={lineChartData}
            title={chart.title}
            color={colors[0]}
          />
        );
      case 'bar':
        const barData = data as ChartData;
        if (!barData.labels || !Array.isArray(barData.labels) || !barData.values || !Array.isArray(barData.values) || barData.labels.length === 0 || barData.values.length === 0) {
          return (
            <div className={chartStyles.error}>
              <div className="flex flex-col items-center justify-center">
                <div className="h-8 w-8 text-red-400 mb-2 flex items-center justify-center text-2xl">⚠️</div>
                <span className="text-sm text-red-500">Invalid bar chart data</span>
              </div>
            </div>
          );
        }
        const barChartData = barData.labels.map((label, index) => ({
          name: label,
          value: typeof barData.values[index] === 'number' ? barData.values[index] : 0,
        }));
        return (
          <BarChart
            data={barChartData}
            title={chart.title}
            color={colors[0]}
          />
        );
      default:
        return (
          <div className={chartStyles.error}>
            <div className="flex flex-col items-center justify-center">
              <div className="h-8 w-8 text-gray-400 mb-2 flex items-center justify-center text-2xl">❓</div>
              <span className="text-sm text-gray-500">Unknown chart type</span>
            </div>
          </div>
        );
    }
  }, [loading, error, data, chart.type, chart.title, chart.config?.colors, dataEndpoint, fetchData]);

  return (
    <Card
      padding="md"
      className={combineClasses(chartStyles.container, className)}
    >
      <div className={chartStyles.header}>
        {/* <h3 className={chartStyles.title}>{chart.title}</h3> */}
        <div className="flex items-center space-x-2">
          {/* <div className="w-3 h-3 rounded-full bg-blue-500"></div> */}
          <span className="text-xs text-gray-500 capitalize mb-4">{chart.type} chart</span>
        </div>
      </div>
      
      <div className="mt-4">
        {renderChart()}
      </div>
    </Card>
  );
};

const ChartWrapper = React.memo(ChartWrapperComponent);

ChartWrapper.displayName = 'ChartWrapper';

export default ChartWrapper; 