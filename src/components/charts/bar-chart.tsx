import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: { name: string; value: number }[];
  title: string;
  color?: string;
}

const BarChartComponent: React.FC<BarChartProps> = ({ data, title, color = '#10B981' }) => (
  <div className="w-full">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill={color} />
      </RechartsBarChart>
    </ResponsiveContainer>
  </div>
);

const BarChart = React.memo(BarChartComponent);

BarChart.displayName = 'BarChart';

export default BarChart; 