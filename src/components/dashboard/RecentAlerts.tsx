import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store';

const RecentAlerts: React.FC = () => {
  const { t } = useTranslation();
  const alerts = useSelector((state: RootState) => state.dashboard.alerts);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-error/20 border-error/50 text-error';
      case 'warning':
        return 'bg-accent/20 border-accent/50 text-accent';
      case 'success':
        return 'bg-success/20 border-success/50 text-success';
      default:
        return 'bg-secondary/20 border-secondary/50 text-secondary';
    }
  };

  // Demo alerts if none exist
  const demoAlerts = [
    {
      id: '1',
      type: 'success' as const,
      message: t('overview.alerts.dnaSuccess'),
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      type: 'warning' as const,
      message: t('overview.alerts.qualityWarning'),
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: '3',
      type: 'info' as const,
      message: t('overview.alerts.newBatch'),
      timestamp: new Date(Date.now() - 7200000).toISOString()
    }
  ];

  const displayAlerts = alerts.length > 0 ? alerts : demoAlerts;

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">{t('overview.alerts.title')}</h3>
      
      <div className="space-y-3">
        <AnimatePresence>
          {displayAlerts.slice(0, 5).map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`p-3 rounded-lg border ${getAlertStyles(alert.type)} backdrop-blur-sm`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {displayAlerts.length === 0 && (
        <p className="text-center text-text-secondary py-8">
          {t('overview.alerts.noAlerts')}
        </p>
      )}
    </div>
  );
};

export default RecentAlerts;