import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, Filter } from 'lucide-react';
import VisualizationControls from '../components/visualization/VisualizationControls';
import DataCharts from '../components/visualization/DataCharts';
import HeatmapView from '../components/visualization/HeatmapView';
import NetworkGraph from '../components/visualization/NetworkGraph';

const Visualization: React.FC = () => {
  const [activeView, setActiveView] = useState<'charts' | 'heatmap' | 'network'>('charts');

  const viewOptions = [
    { id: 'charts', label: 'Charts', icon: BarChart3 },
    { id: 'heatmap', label: 'Heatmap', icon: PieChart },
    { id: 'network', label: 'Network', icon: TrendingUp }
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2">Data Visualization</h2>
        <p className="text-text-secondary">
          Explore and analyze your research data with interactive visualizations
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:w-64"
        >
          <VisualizationControls />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1"
        >
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                {viewOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setActiveView(option.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      activeView === option.id
                        ? 'bg-primary/20 text-primary'
                        : 'hover:bg-white/10 text-text-secondary'
                    }`}
                  >
                    <option.icon className="w-4 h-4" />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>

            {activeView === 'charts' && <DataCharts />}
            {activeView === 'heatmap' && <HeatmapView />}
            {activeView === 'network' && <NetworkGraph />}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Visualization;