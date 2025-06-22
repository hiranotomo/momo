import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Link, Activity } from 'lucide-react';

interface InteractionDetailsProps {
  node: any;
  onClose: () => void;
}

const InteractionDetails: React.FC<InteractionDetailsProps> = ({ node, onClose }) => {
  const typeColors = {
    microbe: '#4ade80',
    plant: '#22d3ee',
    metabolite: '#f59e0b'
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Node Details
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-text-secondary mb-1">Entity</p>
            <p className="font-semibold text-lg">{node.id}</p>
          </div>

          <div>
            <p className="text-sm text-text-secondary mb-1">Type</p>
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: typeColors[node.type] }}
              />
              <span className="capitalize">{node.type}</span>
            </div>
          </div>

          <div>
            <p className="text-sm text-text-secondary mb-2 flex items-center">
              <Link className="w-4 h-4 mr-1" />
              Connections
            </p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between p-2 bg-white/5 rounded">
                <span>Symbiotic</span>
                <span className="text-success">3</span>
              </div>
              <div className="flex justify-between p-2 bg-white/5 rounded">
                <span>Neutral</span>
                <span className="text-text-secondary">2</span>
              </div>
              <div className="flex justify-between p-2 bg-white/5 rounded">
                <span>Parasitic</span>
                <span className="text-error">0</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-text-secondary mb-2 flex items-center">
              <Activity className="w-4 h-4 mr-1" />
              Properties
            </p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Abundance</span>
                <span>High</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Activity</span>
                <span>Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Influence</span>
                <span>85%</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-primary text-sm"
          >
            View Full Analysis
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InteractionDetails;