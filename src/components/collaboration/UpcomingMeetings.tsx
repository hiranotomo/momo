import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, MapPin } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  date: Date;
  duration: string;
  type: 'virtual' | 'in-person';
  location: string;
  attendees: number;
}

const UpcomingMeetings: React.FC = () => {
  const meetings: Meeting[] = [
    {
      id: '1',
      title: 'Weekly Team Sync',
      date: new Date('2024-03-25T14:00:00'),
      duration: '1 hour',
      type: 'virtual',
      location: 'Zoom',
      attendees: 5
    },
    {
      id: '2',
      title: 'Data Analysis Review',
      date: new Date('2024-03-27T10:00:00'),
      duration: '2 hours',
      type: 'virtual',
      location: 'Teams',
      attendees: 3
    },
    {
      id: '3',
      title: 'Lab Meeting',
      date: new Date('2024-03-29T15:00:00'),
      duration: '1.5 hours',
      type: 'in-person',
      location: 'Conference Room B',
      attendees: 8
    }
  ];

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2" />
        Upcoming Meetings
      </h3>

      <div className="space-y-3">
        {meetings.map((meeting, index) => (
          <motion.div
            key={meeting.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          >
            <h4 className="font-medium text-sm mb-2">{meeting.title}</h4>
            
            <div className="space-y-1 text-xs text-text-secondary">
              <div className="flex items-center space-x-2">
                <Clock className="w-3 h-3" />
                <span>{formatDate(meeting.date)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                {meeting.type === 'virtual' ? (
                  <Video className="w-3 h-3" />
                ) : (
                  <MapPin className="w-3 h-3" />
                )}
                <span>{meeting.location}</span>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <span>{meeting.attendees} attendees</span>
                <span className="text-primary">{meeting.duration}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 btn-secondary text-sm"
      >
        Schedule New Meeting
      </motion.button>
    </div>
  );
};

export default UpcomingMeetings;