import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Eye, Move3d, Settings } from 'lucide-react';
import InteractionNetwork3D from '../components/interactions/InteractionNetwork3D';
import InteractionControls from '../components/interactions/InteractionControls';
import InteractionDetails from '../components/interactions/InteractionDetails';

const Interactions3D: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'orbit' | 'fly'>('orbit');

  return (
    <div className="p-6 h-[calc(100vh-8rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold mb-2">3D Interaction Network</h2>
        <p className="text-text-secondary">
          Explore microbe-plant interactions in an immersive 3D environment
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100%-6rem)]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="card h-full relative">
            <div className="absolute top-4 right-4 z-10 flex space-x-2">
              <button
                onClick={() => setViewMode('orbit')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'orbit' ? 'bg-primary/20 text-primary' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('fly')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'fly' ? 'bg-primary/20 text-primary' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Move3d className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            
            <InteractionNetwork3D 
              onSelectNode={setSelectedNode}
              viewMode={viewMode}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          <InteractionControls />
          {selectedNode && (
            <InteractionDetails 
              node={selectedNode}
              onClose={() => setSelectedNode(null)}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Interactions3D;