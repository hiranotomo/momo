import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BiologicalEntity, Interaction } from '../types';

interface VisualizationState {
  selectedEntity: BiologicalEntity | null;
  entities: BiologicalEntity[];
  interactions: Interaction[];
  viewMode: '2d' | '3d';
  filters: {
    entityType: ('microbe' | 'plant' | 'metabolite')[];
    interactionType: ('symbiotic' | 'parasitic' | 'neutral' | 'competitive')[];
    minAbundance: number;
  };
  timeRange: {
    start: string;
    end: string;
  };
}

const initialState: VisualizationState = {
  selectedEntity: null,
  entities: [],
  interactions: [],
  viewMode: '3d',
  filters: {
    entityType: ['microbe', 'plant', 'metabolite'],
    interactionType: ['symbiotic', 'parasitic', 'neutral', 'competitive'],
    minAbundance: 0,
  },
  timeRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    end: new Date().toISOString(),
  },
};

const visualizationSlice = createSlice({
  name: 'visualization',
  initialState,
  reducers: {
    setSelectedEntity: (state, action: PayloadAction<BiologicalEntity | null>) => {
      state.selectedEntity = action.payload;
    },
    setEntities: (state, action: PayloadAction<BiologicalEntity[]>) => {
      state.entities = action.payload;
    },
    setInteractions: (state, action: PayloadAction<Interaction[]>) => {
      state.interactions = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'2d' | '3d'>) => {
      state.viewMode = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<VisualizationState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setTimeRange: (state, action: PayloadAction<VisualizationState['timeRange']>) => {
      state.timeRange = action.payload;
    },
  },
});

export const { 
  setSelectedEntity, 
  setEntities, 
  setInteractions, 
  setViewMode, 
  updateFilters, 
  setTimeRange 
} = visualizationSlice.actions;
export default visualizationSlice.reducer;