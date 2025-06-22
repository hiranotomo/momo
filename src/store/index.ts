import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import experimentsReducer from './experimentsSlice';
import visualizationReducer from './visualizationSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    experiments: experimentsReducer,
    visualization: visualizationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;