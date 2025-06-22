import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, Play, Book, Star } from 'lucide-react';

interface PathNode {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'completed' | 'available' | 'locked';
  progress: number;
}

const LearningPath: React.FC = () => {
  const pathNodes: PathNode[] = [
    {
      id: '1',
      title: 'Introduction to Symbiosis',
      description: 'Learn the basics of symbiotic relationships in nature',
      duration: '30 min',
      difficulty: 'beginner',
      status: 'completed',
      progress: 100
    },
    {
      id: '2',
      title: 'Moss Biology Fundamentals',
      description: 'Understanding bryophyte structure and physiology',
      duration: '45 min',
      difficulty: 'beginner',
      status: 'completed',
      progress: 100
    },
    {
      id: '3',
      title: 'Microbial Communities',
      description: 'Explore the diversity of moss-associated microbiomes',
      duration: '60 min',
      difficulty: 'intermediate',
      status: 'available',
      progress: 65
    },
    {
      id: '4',
      title: 'Co-evolution Mechanisms',
      description: 'Deep dive into evolutionary processes and adaptations',
      duration: '90 min',
      difficulty: 'advanced',
      status: 'locked',
      progress: 0
    },
    {
      id: '5',
      title: 'Research Applications',
      description: 'Practical applications in biotechnology and ecology',
      duration: '75 min',
      difficulty: 'advanced',
      status: 'locked',
      progress: 0
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-success';
      case 'intermediate':
        return 'text-accent';
      case 'advanced':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-success" />;
      case 'available':
        return <Play className="w-6 h-6 text-primary" />;
      case 'locked':
        return <Lock className="w-6 h-6 text-text-secondary" />;
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-6">Your Learning Journey</h3>
      
      <div className="relative">
        {/* Path line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/20" />
        
        <div className="space-y-6">
          {pathNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-start space-x-4 ${
                node.status === 'locked' ? 'opacity-50' : ''
              }`}
            >
              {/* Node indicator */}
              <div className="relative z-10 flex-shrink-0">
                {getStatusIcon(node.status)}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className={`p-4 rounded-lg transition-all ${
                  node.status === 'available' 
                    ? 'bg-primary/10 border border-primary/30 hover:bg-primary/20 cursor-pointer' 
                    : 'bg-white/5 border border-white/10'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold mb-1">{node.title}</h4>
                      <p className="text-sm text-text-secondary">{node.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Book className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm">{node.duration}</span>
                      </div>
                      <span className={`text-xs ${getDifficultyColor(node.difficulty)}`}>
                        {node.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  {node.progress > 0 && node.progress < 100 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{node.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${node.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {node.status === 'available' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-3 w-full btn-primary text-sm"
                    >
                      Continue Learning
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 p-4 bg-primary/10 rounded-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Overall Progress</p>
            <p className="text-sm text-text-secondary">2 of 5 modules completed</p>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-accent" />
            <span className="text-2xl font-bold">40%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LearningPath;