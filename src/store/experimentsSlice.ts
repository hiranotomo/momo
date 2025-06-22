import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExperimentStage, QCMetric } from '../types';

interface ExperimentsState {
  stages: ExperimentStage[];
  currentStageId: string | null;
  samples: {
    total: number;
    processed: number;
    failed: number;
  };
  qcMetrics: QCMetric[];
}

const initialState: ExperimentsState = {
  stages: [],
  currentStageId: null,
  samples: {
    total: 0,
    processed: 0,
    failed: 0,
  },
  qcMetrics: [],
};

const experimentsSlice = createSlice({
  name: 'experiments',
  initialState,
  reducers: {
    setStages: (state, action: PayloadAction<ExperimentStage[]>) => {
      state.stages = action.payload;
    },
    updateStage: (state, action: PayloadAction<ExperimentStage>) => {
      const index = state.stages.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.stages[index] = action.payload;
      }
    },
    setCurrentStage: (state, action: PayloadAction<string>) => {
      state.currentStageId = action.payload;
    },
    updateSampleCounts: (state, action: PayloadAction<Partial<ExperimentsState['samples']>>) => {
      state.samples = { ...state.samples, ...action.payload };
    },
    addQCMetric: (state, action: PayloadAction<QCMetric>) => {
      state.qcMetrics.push(action.payload);
    },
  },
});

export const { setStages, updateStage, setCurrentStage, updateSampleCounts, addQCMetric } = experimentsSlice.actions;
export default experimentsSlice.reducer;