import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  Database, 
  Users, 
  GitBranch,
  Beaker,
  MessageSquare
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'publication' | 'data' | 'collaboration' | 'experiment' | 'analysis' | 'comment';
  title: string;
  description: string;
  user: string;
  timestamp: Date;
}

const ActivityFeed: React.FC = () => {
  const { t } = useTranslation();
  
  const activities: Activity[] = [
    {
      id: '1',
      type: 'experiment',
      title: t('overview.activity.newExperiment'),
      description: t('overview.activity.newExperimentDesc'),
      user: 'Dr. Sarah Chen',
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: '2',
      type: 'data',
      title: t('overview.activity.dataUpload'),
      description: t('overview.activity.dataUploadDesc'),
      user: 'Dr. Mike Johnson',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '3',
      type: 'analysis',
      title: t('overview.activity.analysisComplete'),
      description: t('overview.activity.analysisCompleteDesc'),
      user: 'AI Analysis Pipeline',
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      id: '4',
      type: 'collaboration',
      title: t('overview.activity.newMember'),
      description: t('overview.activity.newMemberDesc'),
      user: 'System',
      timestamp: new Date(Date.now() - 10800000)
    },
    {
      id: '5',
      type: 'publication',
      title: t('overview.activity.paperSubmitted'),
      description: t('overview.activity.paperSubmittedDesc'),
      user: 'Dr. Sarah Chen',
      timestamp: new Date(Date.now() - 86400000)
    }
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'publication':
        return <FileText className="w-5 h-5" />;
      case 'data':
        return <Database className="w-5 h-5" />;
      case 'collaboration':
        return <Users className="w-5 h-5" />;
      case 'experiment':
        return <Beaker className="w-5 h-5" />;
      case 'analysis':
        return <GitBranch className="w-5 h-5" />;
      case 'comment':
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'publication':
        return 'bg-primary/20 text-primary';
      case 'data':
        return 'bg-secondary/20 text-secondary';
      case 'collaboration':
        return 'bg-accent/20 text-accent';
      case 'experiment':
        return 'bg-success/20 text-success';
      case 'analysis':
        return 'bg-purple-500/20 text-purple-400';
      case 'comment':
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    
    if (hours < 1) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes}${t('common.minutes')}${t('common.ago', { defaultValue: '前' })}`;
    } else if (hours < 24) {
      return `${hours}${t('common.hours')}${t('common.ago', { defaultValue: '前' })}`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}${t('common.days')}${t('common.ago', { defaultValue: '前' })}`;
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-6">{t('overview.activity.title')}</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium">{activity.title}</h4>
                <span className="text-xs text-text-secondary">
                  {formatTimestamp(activity.timestamp)}
                </span>
              </div>
              <p className="text-sm text-text-secondary mb-1">
                {activity.description}
              </p>
              <p className="text-xs text-text-secondary">
                {t('common.by')} {activity.user}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;