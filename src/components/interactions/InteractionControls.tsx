import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Layers, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const InteractionControls: React.FC = () => {
  const [showMicrobes, setShowMicrobes] = useState(true);
  const [showPlants, setShowPlants] = useState(true);
  const [showMetabolites, setShowMetabolites] = useState(true);
  const [edgeOpacity, setEdgeOpacity] = useState(60);
  const [nodeSize, setNodeSize] = useState(100);

  const layers = [
    { id: 'microbes', label: 'Microbes', color: '#4ade80', state: showMicrobes, setState: setShowMicrobes },
    { id: 'plants', label: 'Plants', color: '#22d3ee', state: showPlants, setState: setShowPlants },
    { id: 'metabolites', label: 'Metabolites', color: '#f59e0b', state: showMetabolites, setState: setShowMetabolites }
  ];

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Sliders className="w-5 h-5 mr-2" />
        3D Controls
      </h3>

      <div className="space-y-4">
        <div>
          <div className="flex items-center mb-2">
            <Layers className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Layers</span>
          </div>
          <div className="space-y-2">
            {layers.map((layer) => (
              <label
                key={layer.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={layer.state}
                  onChange={(e) => layer.setState(e.target.checked)}
                  className="rounded border-white/30 bg-white/10 text-primary focus:ring-primary"
                />
                <div className="flex items-center space-x-2 flex-1">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: layer.color }}
                  />
                  <span className="text-sm">{layer.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Edge Opacity: {edgeOpacity}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={edgeOpacity}
            onChange={(e) => setEdgeOpacity(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Node Size: {nodeSize}%
          </label>
          <input
            type="range"
            min="50"
            max="150"
            value={nodeSize}
            onChange={(e) => setNodeSize(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <ZoomIn className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <ZoomOut className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default InteractionControls;