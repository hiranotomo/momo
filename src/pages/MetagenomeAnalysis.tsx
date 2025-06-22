import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Microscope, Search, Download, Filter } from 'lucide-react';
import TaxonomyTree from '../components/metagenome/TaxonomyTree';
import AbundanceChart from '../components/metagenome/AbundanceChart';
import DiversityMetrics from '../components/metagenome/DiversityMetrics';

const MetagenomeAnalysis: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTaxon, setSelectedTaxon] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2">Metagenome Analysis</h2>
        <p className="text-text-secondary">
          Explore the microbial diversity and taxonomic composition of your samples
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Search taxa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Microscope className="w-5 h-5 mr-2" />
              Interactive Taxonomy Tree
            </h3>
            <TaxonomyTree 
              searchTerm={searchTerm}
              onSelectTaxon={setSelectedTaxon}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <AbundanceChart selectedTaxon={selectedTaxon} />
            <DiversityMetrics />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MetagenomeAnalysis;