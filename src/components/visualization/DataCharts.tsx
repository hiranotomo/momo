import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const DataCharts: React.FC = () => {
  const abundanceData = [
    { name: 'Nostoc', microbes: 45, plants: 12, metabolites: 23 },
    { name: 'Bryum', microbes: 38, plants: 25, metabolites: 18 },
    { name: 'Syntrichia', microbes: 52, plants: 18, metabolites: 29 },
    { name: 'Physcomitrella', microbes: 41, plants: 22, metabolites: 25 },
    { name: 'Marchantia', microbes: 36, plants: 28, metabolites: 21 }
  ];

  const diversityData = [
    { month: 'Jan', shannon: 2.3, simpson: 0.85, chao1: 120 },
    { month: 'Feb', shannon: 2.5, simpson: 0.87, chao1: 135 },
    { month: 'Mar', shannon: 2.8, simpson: 0.89, chao1: 142 },
    { month: 'Apr', shannon: 3.1, simpson: 0.91, chao1: 158 },
    { month: 'May', shannon: 3.3, simpson: 0.92, chao1: 165 },
    { month: 'Jun', shannon: 3.2, simpson: 0.91, chao1: 162 }
  ];

  const taxonomyData = [
    { name: 'Proteobacteria', value: 35, color: '#4ade80' },
    { name: 'Actinobacteria', value: 25, color: '#22d3ee' },
    { name: 'Bacteroidetes', value: 20, color: '#f59e0b' },
    { name: 'Firmicutes', value: 15, color: '#a78bfa' },
    { name: 'Others', value: 5, color: '#94a3b8' }
  ];

  const functionalData = [
    { trait: 'N-fixation', microbes: 85, plants: 45 },
    { trait: 'P-solubilization', microbes: 70, plants: 30 },
    { trait: 'Hormone prod.', microbes: 60, plants: 75 },
    { trait: 'Stress tolerance', microbes: 80, plants: 90 },
    { trait: 'Pathogen resist.', microbes: 75, plants: 85 },
    { trait: 'Nutrient uptake', microbes: 65, plants: 95 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-lg font-medium mb-4">Species Abundance by Habitat</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={abundanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e3a5f',
                    border: 'none',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="microbes" fill="#4ade80" />
                <Bar dataKey="plants" fill="#22d3ee" />
                <Bar dataKey="metabolites" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h4 className="text-lg font-medium mb-4">Diversity Indices Over Time</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={diversityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e3a5f',
                    border: 'none',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="shannon" 
                  stroke="#4ade80" 
                  strokeWidth={2}
                  dot={{ fill: '#4ade80' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="simpson" 
                  stroke="#22d3ee" 
                  strokeWidth={2}
                  dot={{ fill: '#22d3ee' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="text-lg font-medium mb-4">Taxonomic Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taxonomyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taxonomyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e3a5f',
                    border: 'none',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h4 className="text-lg font-medium mb-4">Functional Traits Comparison</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={functionalData}>
                <PolarGrid stroke="#1e3a5f" />
                <PolarAngleAxis dataKey="trait" stroke="#94a3b8" />
                <PolarRadiusAxis stroke="#94a3b8" />
                <Radar 
                  name="Microbes" 
                  dataKey="microbes" 
                  stroke="#4ade80" 
                  fill="#4ade80" 
                  fillOpacity={0.6} 
                />
                <Radar 
                  name="Plants" 
                  dataKey="plants" 
                  stroke="#22d3ee" 
                  fill="#22d3ee" 
                  fillOpacity={0.6} 
                />
                <Legend />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e3a5f',
                    border: 'none',
                    borderRadius: '8px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DataCharts;