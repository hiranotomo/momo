import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, Target, Brain } from 'lucide-react';
import LearningPath from '../components/learning/LearningPath';
import InteractiveTutorial from '../components/learning/InteractiveTutorial';
import QuizModule from '../components/learning/QuizModule';
import Achievements from '../components/learning/Achievements';

const Learning: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'path' | 'tutorial' | 'quiz'>('path');

  const modules = [
    { id: 'path', label: 'Learning Path', icon: Target },
    { id: 'tutorial', label: 'Interactive Tutorial', icon: Brain },
    { id: 'quiz', label: 'Knowledge Quiz', icon: Trophy }
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2">Learning Module</h2>
        <p className="text-text-secondary">
          Enhance your understanding of microbe-plant co-evolution
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Modules
            </h3>
            <div className="space-y-2">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeModule === module.id
                      ? 'bg-primary/20 text-primary'
                      : 'hover:bg-white/10 text-text-secondary'
                  }`}
                >
                  <module.icon className="w-5 h-5" />
                  <span>{module.label}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6"
          >
            <Achievements />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-3"
        >
          {activeModule === 'path' && <LearningPath />}
          {activeModule === 'tutorial' && <InteractiveTutorial />}
          {activeModule === 'quiz' && <QuizModule />}
        </motion.div>
      </div>
    </div>
  );
};

export default Learning;