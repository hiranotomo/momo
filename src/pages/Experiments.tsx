import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Beaker, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { RootState } from '../store';
import ExperimentPipeline from '../components/experiments/ExperimentPipeline';
import SampleTracker from '../components/experiments/SampleTracker';
import QualityControl from '../components/experiments/QualityControl';
import ExperimentDetails from '../components/experiments/ExperimentDetails';

const Experiments: React.FC = () => {
  const experiments = useSelector((state: RootState) => state.experiments);
  const [selectedExperiment, setSelectedExperiment] = useState<string | null>(null);

  const stats = [
    {
      label: 'Active Experiments',
      value: 3,
      icon: Beaker,
      color: 'text-primary'
    },
    {
      label: 'Completion Rate',
      value: '87%',
      icon: TrendingUp,
      color: 'text-success'
    },
    {
      label: 'Avg. Processing Time',
      value: '4.2h',
      icon: Clock,
      color: 'text-secondary'
    },
    {
      label: 'Quality Score',
      value: '92%',
      icon: CheckCircle,
      color: 'text-accent'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2">Experiment Tracker</h2>
        <p className="text-text-secondary">
          Monitor and manage your research experiments in real-time
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <p className="text-sm text-text-secondary">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ExperimentPipeline />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <SampleTracker />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <QualityControl />
      </motion.div>

      {selectedExperiment && (
        <ExperimentDetails 
          experimentId={selectedExperiment}
          onClose={() => setSelectedExperiment(null)}
        />
      )}
    </div>
  );
};

export default Experiments;