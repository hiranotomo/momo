import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`relative ${sizes[size]}`}>
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full rounded-full border-4 border-primary/20 border-t-primary" />
        </motion.div>
        
        <motion.div
          className="absolute inset-2"
          animate={{
            rotate: -360
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full rounded-full border-2 border-secondary/20 border-t-secondary" />
        </motion.div>
      </div>
      
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-text-secondary"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;