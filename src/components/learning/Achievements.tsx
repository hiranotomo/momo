import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Zap } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const Achievements: React.FC = () => {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first tutorial',
      icon: Star,
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Quiz Master',
      description: 'Score 100% on 3 quizzes',
      icon: Trophy,
      progress: 1,
      maxProgress: 3,
      unlocked: false,
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Knowledge Seeker',
      description: 'Complete all learning modules',
      icon: Target,
      progress: 2,
      maxProgress: 5,
      unlocked: false,
      rarity: 'epic'
    },
    {
      id: '4',
      title: 'Research Expert',
      description: 'Master all advanced topics',
      icon: Zap,
      progress: 0,
      maxProgress: 10,
      unlocked: false,
      rarity: 'legendary'
    }
  ];

  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-amber-400 to-amber-600'
  };

  const rarityGlow = {
    common: '',
    rare: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
    epic: 'shadow-[0_0_20px_rgba(147,51,234,0.5)]',
    legendary: 'shadow-[0_0_20px_rgba(251,191,36,0.5)]'
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Trophy className="w-5 h-5 mr-2" />
        Achievements
      </h3>

      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-lg ${
              achievement.unlocked ? '' : 'opacity-60'
            }`}
          >
            <div className={`p-3 bg-white/5 ${achievement.unlocked ? rarityGlow[achievement.rarity] : ''}`}>
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${rarityColors[achievement.rarity]}`}>
                  <achievement.icon className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{achievement.title}</h4>
                  <p className="text-xs text-text-secondary mt-1">
                    {achievement.description}
                  </p>
                  
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-text-secondary">Progress</span>
                      <span>
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${rarityColors[achievement.rarity]}`}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${(achievement.progress / achievement.maxProgress) * 100}%` 
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {achievement.unlocked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="absolute -top-1 -right-1"
                >
                  <div className="bg-success text-background text-xs px-2 py-1 rounded-bl-lg font-semibold">
                    Unlocked!
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Total Progress</span>
          <span className="font-semibold">25%</span>
        </div>
      </div>
    </div>
  );
};

export default Achievements;