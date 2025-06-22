import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'active' | 'pending' | 'delayed';
}

const ProgressTimeline: React.FC = () => {
  const { t } = useTranslation();
  
  const timelineItems: TimelineItem[] = [
    {
      id: '1',
      title: t('overview.timeline.sampleCollection'),
      description: t('overview.timeline.sampleCollectionDesc'),
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: '2',
      title: t('overview.timeline.dnaExtraction'),
      description: t('overview.timeline.dnaExtractionDesc'),
      date: '2024-02-20',
      status: 'completed'
    },
    {
      id: '3',
      title: t('overview.timeline.bioinformatics'),
      description: t('overview.timeline.bioinformaticsDesc'),
      date: '2024-03-10',
      status: 'active'
    },
    {
      id: '4',
      title: t('overview.timeline.interactionNetwork'),
      description: t('overview.timeline.interactionNetworkDesc'),
      date: '2024-04-15',
      status: 'pending'
    },
    {
      id: '5',
      title: t('overview.timeline.validation'),
      description: t('overview.timeline.validationDesc'),
      date: '2024-05-20',
      status: 'pending'
    }
  ];

  const getStatusIcon = (status: TimelineItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'active':
        return <Clock className="w-5 h-5 text-primary animate-pulse" />;
      case 'delayed':
        return <AlertCircle className="w-5 h-5 text-error" />;
      default:
        return <Circle className="w-5 h-5 text-text-secondary" />;
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-6">{t('overview.timeline.title')}</h3>
      
      <div className="relative">
        {timelineItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex items-start mb-8 last:mb-0"
          >
            {index < timelineItems.length - 1 && (
              <div className="absolute left-[18px] top-8 bottom-0 w-0.5 bg-white/20" />
            )}
            
            <div className="flex-shrink-0 mr-4">
              <div className="relative">
                {getStatusIcon(item.status)}
                {item.status === 'active' && (
                  <div className="absolute inset-0 animate-ping">
                    <Clock className="w-5 h-5 text-primary opacity-75" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold">{item.title}</h4>
                <span className="text-sm text-text-secondary">{item.date}</span>
              </div>
              <p className="text-sm text-text-secondary">{item.description}</p>
              
              {item.status === 'active' && (
                <motion.div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>{t('overview.timeline.progress')}</span>
                    <span>65%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTimeline;