import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';

interface Metric {
  name: string;
  value: number;
  unit: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

const DiversityMetrics: React.FC = () => {
  const metrics: Metric[] = [
    {
      name: 'Shannon Index',
      value: 3.24,
      unit: '',
      change: 5.2,
      icon: Activity,
      color: 'text-primary'
    },
    {
      name: 'Simpson Index',
      value: 0.91,
      unit: '',
      change: 2.8,
      icon: BarChart3,
      color: 'text-secondary'
    },
    {
      name: 'Chao1 Richness',
      value: 156,
      unit: 'OTUs',
      change: -3.1,
      icon: Activity,
      color: 'text-accent'
    },
    {
      name: 'Pielou Evenness',
      value: 0.87,
      unit: '',
      change: 1.5,
      icon: BarChart3,
      color: 'text-success'
    }
  ];

  return (
    <div className="glass-effect rounded-lg p-4">
      <h4 className="text-lg font-medium mb-4">Diversity Metrics</h4>
      
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
              <div className="flex items-center space-x-1">
                {metric.change > 0 ? (
                  <TrendingUp className="w-3 h-3 text-success" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-error" />
                )}
                <span className={`text-xs ${metric.change > 0 ? 'text-success' : 'text-error'}`}>
                  {Math.abs(metric.change)}%
                </span>
              </div>
            </div>
            
            <h5 className="text-xs text-text-secondary mb-1">{metric.name}</h5>
            <p className="text-lg font-semibold">
              {metric.value} {metric.unit && <span className="text-sm text-text-secondary">{metric.unit}</span>}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-4 p-3 bg-primary/10 rounded-lg"
      >
        <p className="text-sm">
          <span className="font-semibold">Alpha Diversity Status:</span> High
        </p>
        <p className="text-xs text-text-secondary mt-1">
          Sample shows healthy microbial diversity with balanced community structure
        </p>
      </motion.div>
    </div>
  );
};

export default DiversityMetrics;