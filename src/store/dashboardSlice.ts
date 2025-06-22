import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Milestone, Task, ResearchPhase } from '../types';

interface DashboardState {
  currentPhase: ResearchPhase | null;
  milestones: Milestone[];
  tasks: Task[];
  metrics: {
    samplesAnalyzed: number;
    speciesIdentified: number;
    interactionsDiscovered: number;
    publicationsSubmitted: number;
    dataQualityScore: number;
  };
  alerts: Array<{
    id: string;
    type: 'info' | 'warning' | 'error' | 'success';
    message: string;
    timestamp: string;
  }>;
}

const initialState: DashboardState = {
  currentPhase: null,
  milestones: [],
  tasks: [],
  metrics: {
    samplesAnalyzed: 0,
    speciesIdentified: 0,
    interactionsDiscovered: 0,
    publicationsSubmitted: 0,
    dataQualityScore: 0,
  },
  alerts: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setCurrentPhase: (state, action: PayloadAction<ResearchPhase>) => {
      state.currentPhase = action.payload;
    },
    updateMetrics: (state, action: PayloadAction<Partial<DashboardState['metrics']>>) => {
      state.metrics = { ...state.metrics, ...action.payload };
    },
    addAlert: (state, action: PayloadAction<DashboardState['alerts'][0]>) => {
      state.alerts.unshift(action.payload);
      if (state.alerts.length > 10) state.alerts.pop();
    },
    setMilestones: (state, action: PayloadAction<Milestone[]>) => {
      state.milestones = action.payload;
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { setCurrentPhase, updateMetrics, addAlert, setMilestones, setTasks } = dashboardSlice.actions;
export default dashboardSlice.reducer;