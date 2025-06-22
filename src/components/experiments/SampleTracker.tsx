import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const SampleTracker: React.FC = () => {
  const samples = useSelector((state: RootState) => state.experiments.samples);

  const data = [
    { name: 'Processed', value: samples.processed || 42, color: '#4ade80' },
    { name: 'In Progress', value: 6, color: '#22d3ee' },
    { name: 'Failed', value: samples.failed || 2, color: '#ef4444' },
    { name: 'Pending', value: (samples.total || 50) - (samples.processed || 42) - 6 - (samples.failed || 2), color: '#64748b' }
  ];

  const totalSamples = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      return (
        <div className="glass-effect p-2 rounded">
          <p className="text-sm">
            {payload[0].name}: <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card h-full">
      <h3 className="text-xl font-semibold mb-4">Sample Status</h3>
      
      <div className="relative h-48 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-3xl font-bold">{totalSamples}</p>
            <p className="text-sm text-text-secondary">Total</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm">{item.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold">{item.value}</span>
              <span className="text-xs text-text-secondary">
                ({((item.value / totalSamples) * 100).toFixed(0)}%)
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 btn-primary text-sm"
      >
        View Detailed Report
      </motion.button>
    </div>
  );
};

export default SampleTracker;