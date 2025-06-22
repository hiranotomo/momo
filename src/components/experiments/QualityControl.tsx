import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface QCMetric {
  name: string;
  value: number;
  threshold: number;
  status: 'pass' | 'warning' | 'fail';
  trend: number;
}

const QualityControl: React.FC = () => {
  const metrics: QCMetric[] = [
    {
      name: 'DNA Concentration',
      value: 85,
      threshold: 80,
      status: 'pass',
      trend: 5.2
    },
    {
      name: 'Purity (260/280)',
      value: 1.82,
      threshold: 1.8,
      status: 'pass',
      trend: 2.1
    },
    {
      name: 'Fragment Size',
      value: 340,
      threshold: 350,
      status: 'warning',
      trend: -3.5
    },
    {
      name: 'Contamination',
      value: 0.02,
      threshold: 0.05,
      status: 'pass',
      trend: -15.3
    }
  ];

  const timeSeriesData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    quality: 80 + Math.random() * 15 + (i > 12 ? 5 : 0),
    threshold: 85
  }));

  const getStatusIcon = (status: QCMetric['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-accent" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-error" />;
    }
  };

  const getStatusColor = (status: QCMetric['status']) => {
    switch (status) {
      case 'pass':
        return 'border-success/50 bg-success/10';
      case 'warning':
        return 'border-accent/50 bg-accent/10';
      case 'fail':
        return 'border-error/50 bg-error/10';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Quality Control Metrics</h3>
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-primary" />
          <span className="text-sm text-text-secondary">Live Monitoring</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`p-4 rounded-lg border ${getStatusColor(metric.status)}`}
          >
            <div className="flex items-center justify-between mb-2">
              {getStatusIcon(metric.status)}
              <div className="flex items-center space-x-1">
                {metric.trend > 0 ? (
                  <TrendingUp className="w-4 h-4 text-success" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-error" />
                )}
                <span className={`text-xs ${metric.trend > 0 ? 'text-success' : 'text-error'}`}>
                  {Math.abs(metric.trend)}%
                </span>
              </div>
            </div>
            
            <h4 className="text-sm text-text-secondary mb-1">{metric.name}</h4>
            <p className="text-lg font-semibold">
              {metric.value} {metric.name === 'Contamination' && '%'}
            </p>
            <p className="text-xs text-text-secondary mt-1">
              Threshold: {metric.threshold}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="h-64"
      >
        <h4 className="text-sm font-medium mb-2">Quality Score Trend (24h)</h4>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={timeSeriesData}>
            <defs>
              <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4ade80" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
            <XAxis 
              dataKey="time" 
              stroke="#94a3b8"
              interval={3}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#94a3b8"
              domain={[70, 100]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e3a5f', 
                border: 'none',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="threshold" 
              stroke="#ef4444" 
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={false}
            />
            <Area 
              type="monotone" 
              dataKey="quality" 
              stroke="#4ade80" 
              fillOpacity={1} 
              fill="url(#colorQuality)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="mt-6 flex items-center justify-between p-4 bg-success/10 rounded-lg">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-success" />
          <span className="font-medium">Overall Quality Status: PASS</span>
        </div>
        <button className="btn-secondary text-sm">
          Generate QC Report
        </button>
      </div>
    </div>
  );
};

export default QualityControl;