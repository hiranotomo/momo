import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, Globe, Circle } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  institution: string;
  avatar: string;
  status: 'online' | 'busy' | 'offline';
  expertise: string[];
}

const TeamMembers: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      role: 'Principal Investigator',
      email: 's.chen@university.edu',
      institution: 'University Research Lab',
      avatar: '👩‍🔬',
      status: 'online',
      expertise: ['Microbiology', 'Genomics', 'Ecology']
    },
    {
      id: '2',
      name: 'Dr. Mike Johnson',
      role: 'Co-Investigator',
      email: 'm.johnson@institute.org',
      institution: 'Environmental Institute',
      avatar: '👨‍🔬',
      status: 'busy',
      expertise: ['Bioinformatics', 'Data Analysis']
    },
    {
      id: '3',
      name: 'Dr. Emily Wang',
      role: 'Postdoc Researcher',
      email: 'e.wang@university.edu',
      institution: 'University Research Lab',
      avatar: '👩‍💻',
      status: 'online',
      expertise: ['Molecular Biology', 'Sequencing']
    },
    {
      id: '4',
      name: 'Alex Rivera',
      role: 'PhD Student',
      email: 'a.rivera@university.edu',
      institution: 'University Research Lab',
      avatar: '🧑‍🎓',
      status: 'offline',
      expertise: ['Field Work', 'Sample Collection']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-success';
      case 'busy':
        return 'text-accent';
      case 'offline':
        return 'text-text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <Users className="w-5 h-5 mr-2" />
        Team Members
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="flex items-start space-x-4">
              <div className="relative">
                <div className="text-4xl">{member.avatar}</div>
                <Circle 
                  className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} fill-current`}
                />
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-sm text-text-secondary">{member.role}</p>
                <p className="text-xs text-text-secondary mt-1">{member.institution}</p>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {member.expertise.map((skill) => (
                    <span 
                      key={skill}
                      className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center space-x-3 mt-3">
                  <button className="text-text-secondary hover:text-primary transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="text-text-secondary hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="text-text-secondary hover:text-primary transition-colors">
                    <Globe className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;