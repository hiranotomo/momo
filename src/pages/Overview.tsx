import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  Users, 
  Microscope, 
  FileText,
  Activity,
  AlertCircle
} from 'lucide-react';
import { RootState } from '../store';
import { updateMetrics } from '../store/dashboardSlice';
import MetricCard from '../components/dashboard/MetricCard';
import ProgressTimeline from '../components/dashboard/ProgressTimeline';
import RecentAlerts from '../components/dashboard/RecentAlerts';
import ActivityFeed from '../components/dashboard/ActivityFeed';

const Overview: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const metrics = useSelector((state: RootState) => state.dashboard.metrics);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      dispatch(updateMetrics({
        samplesAnalyzed: Math.floor(Math.random() * 10) + metrics.samplesAnalyzed,
        speciesIdentified: Math.floor(Math.random() * 3) + metrics.speciesIdentified,
        dataQualityScore: Math.min(100, metrics.dataQualityScore + Math.random() * 2),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, metrics]);

  const metricItems = [
    {
      title: t('overview.metrics.samplesAnalyzed'),
      value: metrics.samplesAnalyzed,
      icon: Microscope,
      trend: 12.5,
      color: 'primary' as const
    },
    {
      title: t('overview.metrics.speciesIdentified'),
      value: metrics.speciesIdentified,
      icon: Users,
      trend: 8.3,
      color: 'secondary' as const
    },
    {
      title: t('overview.metrics.interactionsDiscovered'),
      value: metrics.interactionsDiscovered,
      icon: Activity,
      trend: -2.1,
      color: 'accent' as const
    },
    {
      title: t('overview.metrics.publications'),
      value: metrics.publicationsSubmitted,
      icon: FileText,
      trend: 0,
      color: 'success' as const
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2">{t('overview.title')}</h2>
        <p className="text-text-secondary">
          {t('overview.subtitle')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <MetricCard {...item} />
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
          <ProgressTimeline />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <RecentAlerts />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <ActivityFeed />
      </motion.div>
    </div>
  );
};

export default Overview;