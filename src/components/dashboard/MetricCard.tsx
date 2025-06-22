import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend: number;
  color: 'primary' | 'secondary' | 'accent' | 'success';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, trend, color }) => {
  const colorClasses = {
    primary: 'text-primary border-primary/50',
    secondary: 'text-secondary border-secondary/50',
    accent: 'text-accent border-accent/50',
    success: 'text-success border-success/50',
  };

  const bgColorClasses = {
    primary: 'bg-primary/10',
    secondary: 'bg-secondary/10',
    accent: 'bg-accent/10',
    success: 'bg-success/10',
  };

  return (
    <motion.div
      className="card group"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${bgColorClasses[color]}`}>
          <Icon className={`w-6 h-6 ${colorClasses[color].split(' ')[0]}`} />
        </div>
        <div className="flex items-center space-x-1">
          {trend > 0 ? (
            <TrendingUp className="w-4 h-4 text-success" />
          ) : trend < 0 ? (
            <TrendingDown className="w-4 h-4 text-error" />
          ) : (
            <Minus className="w-4 h-4 text-text-secondary" />
          )}
          <span className={`text-sm ${trend > 0 ? 'text-success' : trend < 0 ? 'text-error' : 'text-text-secondary'}`}>
            {Math.abs(trend)}%
          </span>
        </div>
      </div>

      <h3 className="text-text-secondary text-sm mb-1">{title}</h3>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-3xl font-bold">
          {value.toLocaleString()}
        </span>
      </motion.div>

      <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${bgColorClasses[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, (value / 1000) * 100)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

export default MetricCard;