import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  FileText, 
  Download, 
  Upload, 
  Share2,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface SharedDataset {
  id: string;
  name: string;
  type: 'genomic' | 'transcriptomic' | 'metabolomic' | 'phenotypic';
  size: string;
  uploadedBy: string;
  uploadedAt: Date;
  status: 'processing' | 'ready' | 'error';
  downloads: number;
}

const SharedData: React.FC = () => {
  const datasets: SharedDataset[] = [
    {
      id: '1',
      name: 'Moss_Microbiome_16S_March2024.fastq',
      type: 'genomic',
      size: '2.3 GB',
      uploadedBy: 'Dr. Sarah Chen',
      uploadedAt: new Date('2024-03-15'),
      status: 'ready',
      downloads: 12
    },
    {
      id: '2',
      name: 'Metabolomics_Profile_Bryum.csv',
      type: 'metabolomic',
      size: '156 MB',
      uploadedBy: 'Dr. Mike Johnson',
      uploadedAt: new Date('2024-03-18'),
      status: 'ready',
      downloads: 8
    },
    {
      id: '3',
      name: 'RNA_Seq_Stress_Response.tar.gz',
      type: 'transcriptomic',
      size: '4.7 GB',
      uploadedBy: 'Dr. Emily Wang',
      uploadedAt: new Date('2024-03-20'),
      status: 'processing',
      downloads: 0
    }
  ];

  const typeColors = {
    genomic: 'text-primary bg-primary/20',
    transcriptomic: 'text-secondary bg-secondary/20',
    metabolomic: 'text-accent bg-accent/20',
    phenotypic: 'text-success bg-success/20'
  };

  const statusIcons = {
    processing: <Clock className="w-4 h-4 text-accent animate-spin" />,
    ready: <CheckCircle className="w-4 h-4 text-success" />,
    error: <XCircle className="w-4 h-4 text-error" />
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <Database className="w-5 h-5 mr-2" />
          Shared Datasets
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary text-sm flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Data</span>
        </motion.button>
      </div>

      <div className="space-y-4">
        {datasets.map((dataset, index) => (
          <motion.div
            key={dataset.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <FileText className="w-5 h-5 text-text-secondary" />
                  <h4 className="font-medium">{dataset.name}</h4>
                  {statusIcons[dataset.status]}
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <span className={`px-2 py-1 rounded-full text-xs ${typeColors[dataset.type]}`}>
                    {dataset.type}
                  </span>
                  <span>{dataset.size}</span>
                  <span>by {dataset.uploadedBy}</span>
                  <span>{formatDate(dataset.uploadedAt)}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {dataset.downloads > 0 && (
              <div className="mt-2 text-xs text-text-secondary">
                Downloaded {dataset.downloads} times
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/10 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Storage Usage</p>
            <p className="text-sm text-text-secondary">12.4 GB of 50 GB used</p>
          </div>
          <div className="text-2xl font-bold">25%</div>
        </div>
        <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: '25%' }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SharedData;