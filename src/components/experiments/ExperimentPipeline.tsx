import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ArrowRight 
} from 'lucide-react';

interface PipelineStage {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  duration: string;
  samples: number;
}

const ExperimentPipeline: React.FC = () => {
  const [stages, setStages] = useState<PipelineStage[]>([
    {
      id: '1',
      name: 'Sample Preparation',
      status: 'completed',
      progress: 100,
      duration: '2h 15m',
      samples: 48
    },
    {
      id: '2',
      name: 'DNA Extraction',
      status: 'completed',
      progress: 100,
      duration: '3h 30m',
      samples: 48
    },
    {
      id: '3',
      name: 'Library Preparation',
      status: 'running',
      progress: 65,
      duration: '1h 45m',
      samples: 45
    },
    {
      id: '4',
      name: 'Sequencing',
      status: 'pending',
      progress: 0,
      duration: '~8h',
      samples: 0
    },
    {
      id: '5',
      name: 'Quality Control',
      status: 'pending',
      progress: 0,
      duration: '~1h',
      samples: 0
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStages(prev => prev.map(stage => {
        if (stage.status === 'running' && stage.progress < 100) {
          return { ...stage, progress: Math.min(100, stage.progress + Math.random() * 5) };
        }
        return stage;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: PipelineStage['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'running':
        return <Clock className="w-5 h-5 text-primary animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-error" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-text-secondary" />;
    }
  };

  const getStatusColor = (status: PipelineStage['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'running':
        return 'bg-primary';
      case 'failed':
        return 'bg-error';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Experiment Pipeline</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition-colors">
            <Play className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            <Pause className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        {stages.map((stage, index) => (
          <div key={stage.id} className="relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center space-x-4 mb-6"
            >
              <div className="flex-shrink-0">
                {getStatusIcon(stage.status)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{stage.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <span>{stage.samples} samples</span>
                    <span>{stage.duration}</span>
                  </div>
                </div>

                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`absolute left-0 top-0 h-full ${getStatusColor(stage.status)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>

                {stage.status === 'running' && (
                  <p className="text-xs text-primary mt-1">
                    {stage.progress.toFixed(0)}% complete
                  </p>
                )}
              </div>

              {index < stages.length - 1 && (
                <ArrowRight className="w-5 h-5 text-text-secondary flex-shrink-0" />
              )}
            </motion.div>

            {index < stages.length - 1 && (
              <div className="absolute left-2.5 top-8 bottom-0 w-px bg-white/20" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/10 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Overall Progress</p>
            <p className="text-xs text-text-secondary">Est. completion: 14:30</p>
          </div>
          <div className="text-2xl font-bold">52%</div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentPipeline;