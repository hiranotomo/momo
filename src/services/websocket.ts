import { io, Socket } from 'socket.io-client';
import { store } from '../store';
import { updateMetrics, addAlert } from '../store/dashboardSlice';
import { updateStage, updateSampleCounts, addQCMetric } from '../store/experimentsSlice';
import { setEntities, setInteractions } from '../store/visualizationSlice';

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect() {
    // In a real app, this would connect to your backend WebSocket server
    // For demo purposes, we'll simulate WebSocket events
    this.simulateWebSocketEvents();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  private simulateWebSocketEvents() {
    // Simulate metric updates every 5 seconds
    setInterval(() => {
      const metrics = store.getState().dashboard.metrics;
      store.dispatch(updateMetrics({
        samplesAnalyzed: metrics.samplesAnalyzed + Math.floor(Math.random() * 5),
        speciesIdentified: metrics.speciesIdentified + Math.floor(Math.random() * 2),
        interactionsDiscovered: metrics.interactionsDiscovered + Math.floor(Math.random() * 3),
        dataQualityScore: Math.min(100, metrics.dataQualityScore + Math.random() * 2)
      }));
    }, 5000);

    // Simulate alerts every 10 seconds
    setInterval(() => {
      const alertTypes = ['info', 'warning', 'error', 'success'] as const;
      const messages = [
        'New data batch processed successfully',
        'Quality control warning: Sample contamination detected',
        'Sequencing run completed',
        'Analysis pipeline finished',
        'New collaboration request received'
      ];

      store.dispatch(addAlert({
        id: Date.now().toString(),
        type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date().toISOString()
      }));
    }, 10000);

    // Simulate experiment stage updates
    setInterval(() => {
      const stages = store.getState().experiments.stages;
      const runningStage = stages.find(s => s.status === 'running');
      
      if (runningStage && runningStage.progress < 100) {
        store.dispatch(updateStage({
          ...runningStage,
          progress: Math.min(100, runningStage.progress + Math.random() * 10)
        }));
      }
    }, 3000);

    // Simulate sample count updates
    setInterval(() => {
      const samples = store.getState().experiments.samples;
      if (samples.processed < samples.total) {
        store.dispatch(updateSampleCounts({
          processed: Math.min(samples.total, samples.processed + 1)
        }));
      }
    }, 8000);

    // Simulate QC metric updates
    setInterval(() => {
      store.dispatch(addQCMetric({
        name: 'DNA Concentration',
        value: 70 + Math.random() * 30,
        threshold: 80,
        status: Math.random() > 0.3 ? 'pass' : 'warning',
        timestamp: new Date()
      }));
    }, 15000);
  }

  // Real WebSocket implementation would look like this:
  /*
  connect() {
    this.socket = io('ws://localhost:3001', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: this.maxReconnectAttempts
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('metrics:update', (data) => {
      store.dispatch(updateMetrics(data));
    });

    this.socket.on('alert:new', (data) => {
      store.dispatch(addAlert(data));
    });

    this.socket.on('experiment:update', (data) => {
      store.dispatch(updateStage(data));
    });

    this.socket.on('samples:update', (data) => {
      store.dispatch(updateSampleCounts(data));
    });

    this.socket.on('qc:update', (data) => {
      store.dispatch(addQCMetric(data));
    });
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
  */
}

export const websocketService = new WebSocketService();