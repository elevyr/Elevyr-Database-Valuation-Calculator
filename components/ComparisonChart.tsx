import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { formatCurrency } from '../utils';

interface ComparisonChartProps {
  currentRevenue: number;
  benchmarkRevenue: number;
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({ currentRevenue, benchmarkRevenue }) => {
  const data = [
    {
      name: 'Your Current Results',
      value: currentRevenue,
      color: '#94a3b8', // slate-400
      type: 'current'
    },
    {
      name: 'Benchmark Potential',
      value: benchmarkRevenue,
      color: '#4ade80', // green-400 (base)
      type: 'benchmark'
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 text-white p-3 rounded-lg shadow-lg text-sm">
          <p className="font-semibold">{payload[0].payload.name}</p>
          <p className="text-blue-200">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64 mt-4 mb-2">
      <h4 className="text-center text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Revenue Comparison</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20, 
          }}
          barSize={60}
        >
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
            dy={10}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={1000}>
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.type === 'current' ? '#94a3b8' : '#2563eb'} />
            ))}
             <LabelList dataKey="value" position="top" formatter={(val: number) => formatCurrency(val)} style={{ fill: '#475569', fontSize: 12, fontWeight: 700 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};