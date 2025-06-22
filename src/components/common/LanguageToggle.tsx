import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { motion } from 'framer-motion';

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ja' ? 'en' : 'ja';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
      title={i18n.language === 'ja' ? 'Switch to English' : '日本語に切り替え'}
    >
      <Languages className="w-5 h-5" />
      <span className="text-sm font-medium">
        {i18n.language === 'ja' ? 'EN' : 'JP'}
      </span>
    </motion.button>
  );
};

export default LanguageToggle;