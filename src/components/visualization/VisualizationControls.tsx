import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sliders, Download, RefreshCw } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateFilters } from '../../store/visualizationSlice';

const VisualizationControls: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.visualization.filters);

  const entityTypes = [
    { value: 'microbe', label: 'Microbes' },
    { value: 'plant', label: 'Plants' },
    { value: 'metabolite', label: 'Metabolites' }
  ];

  const interactionTypes = [
    { value: 'symbiotic', label: 'Symbiotic', color: 'text-success' },
    { value: 'parasitic', label: 'Parasitic', color: 'text-error' },
    { value: 'neutral', label: 'Neutral', color: 'text-text-secondary' },
    { value: 'competitive', label: 'Competitive', color: 'text-accent' }
  ];

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Sliders className="w-5 h-5 mr-2" />
        Visualization Controls
      </h3>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Date Range</label>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <span className="text-sm">Last 30 days</span>
              <Calendar className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Entity Types</label>
          <div className="space-y-2">
            {entityTypes.map((type) => (
              <label
                key={type.value}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.entityType.includes(type.value as any)}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...filters.entityType, type.value as any]
                      : filters.entityType.filter(t => t !== type.value);
                    dispatch(updateFilters({ entityType: newTypes }));
                  }}
                  className="rounded border-white/30 bg-white/10 text-primary focus:ring-primary"
                />
                <span className="text-sm">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Interaction Types</label>
          <div className="space-y-2">
            {interactionTypes.map((type) => (
              <label
                key={type.value}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.interactionType.includes(type.value as any)}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...filters.interactionType, type.value as any]
                      : filters.interactionType.filter(t => t !== type.value);
                    dispatch(updateFilters({ interactionType: newTypes }));
                  }}
                  className="rounded border-white/30 bg-white/10 text-primary focus:ring-primary"
                />
                <span className={`text-sm ${type.color}`}>{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Minimum Abundance
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.minAbundance}
            onChange={(e) => {
              dispatch(updateFilters({ minAbundance: parseInt(e.target.value) }));
            }}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-text-secondary mt-1">
            <span>0%</span>
            <span>{filters.minAbundance}%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="space-y-2 pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-primary text-sm flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Apply Filters</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-secondary text-sm flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default VisualizationControls;