import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  FlaskConical, 
  BarChart3, 
  BookOpen, 
  Users,
  Microscope,
  Network
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, labelKey: 'nav.overview' },
    { path: '/experiments', icon: FlaskConical, labelKey: 'nav.experiments' },
    { path: '/visualization', icon: BarChart3, labelKey: 'nav.dataVisualization' },
    { path: '/metagenome', icon: Microscope, labelKey: 'nav.metagenome' },
    { path: '/interactions', icon: Network, labelKey: 'nav.interactions' },
    { path: '/learning', icon: BookOpen, labelKey: 'nav.learning' },
    { path: '/collaboration', icon: Users, labelKey: 'nav.collaboration' },
  ];

  return (
    <aside className="w-64 glass-effect border-r border-white/10 h-full flex flex-col">
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-primary/20 text-primary glow-effect'
                  : 'hover:bg-white/10 text-text-secondary hover:text-text-primary'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{t(item.labelKey)}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="glass-effect rounded-lg p-4">
          <div className="text-sm text-text-secondary mb-2">{t('common.systemStatus')}</div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs">{t('common.allSystemsOperational')}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;