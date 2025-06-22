import React from 'react';
import { Bell, User, Settings, Activity } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store';
import LanguageToggle from './LanguageToggle';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const alerts = useSelector((state: RootState) => state.dashboard.alerts);
  const unreadCount = alerts.filter(a => a.type === 'error' || a.type === 'warning').length;

  return (
    <header className="glass-effect border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('header.title')}
              </h1>
              <p className="text-sm text-text-secondary">{t('header.subtitle')}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageToggle />
          
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
          
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          
          <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors">
            <User className="w-5 h-5" />
            <span className="text-sm">{t('header.researcher')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;