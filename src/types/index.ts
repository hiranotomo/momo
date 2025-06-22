export interface ResearchPhase {
  id: string;
  name: string;
  startDate: Date;
  endDate?: Date;
  status: 'pending' | 'active' | 'completed';
  progress: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'achieved' | 'delayed';
  phase: string;
}

export interface Task {
  id: string;
  title: string;
  assignee?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate: Date;
  dependencies: string[];
  progress: number;
}

export interface ExperimentStage {
  id: string;
  name: string;
  status: 'waiting' | 'in_progress' | 'completed' | 'failed';
  startTime?: Date;
  endTime?: Date;
  progress: number;
  samples: number;
}

export interface QCMetric {
  name: string;
  value: number;
  threshold: number;
  status: 'pass' | 'warning' | 'fail';
  timestamp: Date;
}

export interface BiologicalEntity {
  id: string;
  name: string;
  type: 'microbe' | 'plant' | 'metabolite';
  taxonomy?: string[];
  abundance?: number;
  metadata: Record<string, any>;
}

export interface Interaction {
  source: string;
  target: string;
  type: 'symbiotic' | 'parasitic' | 'neutral' | 'competitive';
  strength: number;
  evidence: string[];
}

export interface Dataset {
  id: string;
  name: string;
  type: 'genomic' | 'transcriptomic' | 'metabolomic' | 'phenotypic';
  size: number;
  uploadedAt: Date;
  processedAt?: Date;
  quality: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'researcher' | 'student' | 'collaborator' | 'admin';
  avatar?: string;
  lastActive: Date;
}