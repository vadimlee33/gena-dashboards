import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LineChartProps {
  data: { name: string; value: number }[];
  title: string;
  color?: string;
}

const LineChartComponent: React.FC<LineChartProps> = ({ data, title, color = '#3B82F6' }) => (
  <div className="w-full">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
      </RechartsLineChart>
    </ResponsiveContainer>
  </div>
);

const LineChart = React.memo(LineChartComponent);

LineChart.displayName = 'LineChart';

export default LineChart; 