import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Share2, Calendar } from 'lucide-react';
import TeamMembers from '../components/collaboration/TeamMembers';
import SharedData from '../components/collaboration/SharedData';
import DiscussionForum from '../components/collaboration/DiscussionForum';
import UpcomingMeetings from '../components/collaboration/UpcomingMeetings';

const Collaboration: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2">Collaboration Space</h2>
        <p className="text-text-secondary">
          Connect with your research team and share insights
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <TeamMembers />
          <SharedData />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <UpcomingMeetings />
          <DiscussionForum />
        </motion.div>
      </div>
    </div>
  );
};

export default Collaboration;