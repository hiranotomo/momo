import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface AbundanceChartProps {
  selectedTaxon: string | null;
}

const AbundanceChart: React.FC<AbundanceChartProps> = ({ selectedTaxon }) => {
  const data = [
    { sample: 'S1', abundance: 45, color: '#4ade80' },
    { sample: 'S2', abundance: 38, color: '#22d3ee' },
    { sample: 'S3', abundance: 52, color: '#f59e0b' },
    { sample: 'S4', abundance: 41, color: '#a78bfa' },
    { sample: 'S5', abundance: 36, color: '#ef4444' },
    { sample: 'S6', abundance: 48, color: '#10b981' }
  ];

  return (
    <div className="glass-effect rounded-lg p-4">
      <h4 className="text-lg font-medium mb-4">
        Relative Abundance {selectedTaxon && `- ${selectedTaxon}`}
      </h4>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="h-64"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
            <XAxis 
              dataKey="sample" 
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              label={{ 
                value: 'Relative Abundance (%)', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: '#94a3b8', fontSize: 12 }
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e3a5f',
                border: 'none',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="abundance" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
          <span className="text-text-secondary">Average:</span>
          <span className="font-semibold">
            {(data.reduce((sum, d) => sum + d.abundance, 0) / data.length).toFixed(1)}%
          </span>
        </div>
        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
          <span className="text-text-secondary">Max:</span>
          <span className="font-semibold">
            {Math.max(...data.map(d => d.abundance))}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AbundanceChart;