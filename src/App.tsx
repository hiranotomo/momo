import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Overview from './pages/Overview';
import Experiments from './pages/Experiments';
import Visualization from './pages/Visualization';
import MetagenomeAnalysis from './pages/MetagenomeAnalysis';
import Interactions3D from './pages/Interactions3D';
import Learning from './pages/Learning';
import Collaboration from './pages/Collaboration';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto">
                <Routes>
                  <Route path="/" element={<Overview />} />
                  <Route path="/experiments" element={<Experiments />} />
                  <Route path="/visualization" element={<Visualization />} />
                  <Route path="/metagenome" element={<MetagenomeAnalysis />} />
                  <Route path="/interactions" element={<Interactions3D />} />
                  <Route path="/learning" element={<Learning />} />
                  <Route path="/collaboration" element={<Collaboration />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;