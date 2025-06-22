import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Reply, MoreVertical } from 'lucide-react';

interface Discussion {
  id: string;
  title: string;
  author: string;
  timestamp: Date;
  replies: number;
  likes: number;
  lastActivity: Date;
  preview: string;
}

const DiscussionForum: React.FC = () => {
  const discussions: Discussion[] = [
    {
      id: '1',
      title: 'Unexpected results in nitrogen fixation assay',
      author: 'Dr. Sarah Chen',
      timestamp: new Date('2024-03-20T10:00:00'),
      replies: 5,
      likes: 3,
      lastActivity: new Date('2024-03-20T14:30:00'),
      preview: 'Has anyone seen similar patterns in their samples? The values seem...'
    },
    {
      id: '2',
      title: 'New protocol for RNA extraction',
      author: 'Dr. Emily Wang',
      timestamp: new Date('2024-03-19T15:00:00'),
      replies: 8,
      likes: 12,
      lastActivity: new Date('2024-03-20T09:00:00'),
      preview: 'I\'ve optimized our RNA extraction protocol and wanted to share...'
    },
    {
      id: '3',
      title: 'Collaboration opportunity with European team',
      author: 'Dr. Mike Johnson',
      timestamp: new Date('2024-03-18T11:00:00'),
      replies: 3,
      likes: 7,
      lastActivity: new Date('2024-03-19T16:00:00'),
      preview: 'Just got off a call with the team in Germany. They have some...'
    }
  ];

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <MessageSquare className="w-5 h-5 mr-2" />
        Discussion Forum
      </h3>

      <div className="space-y-3">
        {discussions.map((discussion, index) => (
          <motion.div
            key={discussion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-sm flex-1 pr-2">
                {discussion.title}
              </h4>
              <button className="p-1 rounded hover:bg-white/10 transition-colors">
                <MoreVertical className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
            
            <p className="text-xs text-text-secondary mb-2 line-clamp-2">
              {discussion.preview}
            </p>
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <span className="text-text-secondary">
                  by {discussion.author}
                </span>
                <span className="text-text-secondary">
                  {formatTimestamp(discussion.timestamp)}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                  <Reply className="w-3 h-3" />
                  <span>{discussion.replies}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{discussion.likes}</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 btn-primary text-sm"
      >
        Start New Discussion
      </motion.button>
    </div>
  );
};

export default DiscussionForum;