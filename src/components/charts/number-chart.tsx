import React from 'react';
import { combineClasses } from '@/lib/styles/component-styles';

interface NumberChartProps {
  value: number;
  label?: string;
  unit?: string;
  color?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const NumberChartComponent: React.FC<NumberChartProps> = ({ 
  value, 
  label, 
  unit, 
  color = '#10B981',
  trend,
  className = ''
}) => {
  const formatValue = (val: number | undefined | null) => {
    if (typeof val !== 'number' || isNaN(val)) return '-';
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(1)}M`;
    } else if (val >= 1000) {
      return `${(val / 1000).toFixed(1)}K`;
    }
    return val.toLocaleString();
  };

  const getTrendColor = (isPositive: boolean) => {
    return isPositive ? 'text-green-600' : 'text-red-600';
  };

  const getTrendIcon = (isPositive: boolean) => {
    return isPositive ? (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ) : (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    );
  };

  return (
    <div className={combineClasses('text-center p-6', className)}>
      {label && (
        <h3 className="text-sm font-medium text-gray-600 mb-3">
          {label}
        </h3>
      )}
      
      <div className="flex flex-col items-center">
        <div 
          className="text-4xl font-bold mb-2" 
          style={{ color }}
        >
          {formatValue(value)}
          {unit && (
            <span className="text-lg text-gray-500 ml-2 font-normal">
              {unit}
            </span>
          )}
        </div>
        
        {trend && (
          <div className={combineClasses(
            'flex items-center space-x-1 text-sm font-medium',
            getTrendColor(trend.isPositive)
          )}>
            {getTrendIcon(trend.isPositive)}
            <span>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const NumberChart = React.memo(NumberChartComponent);

NumberChart.displayName = 'NumberChart';

export default NumberChart; 