import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, PlayCircle, PauseCircle, RotateCcw } from 'lucide-react';

const InteractiveTutorial: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const tutorialSteps = [
    {
      title: 'Step 1: Sample Collection',
      content: 'Learn proper techniques for collecting moss samples in the field.',
      animation: '🌿',
      tips: [
        'Use sterile tools to avoid contamination',
        'Document GPS coordinates and environmental conditions',
        'Collect samples from multiple microhabitats'
      ]
    },
    {
      title: 'Step 2: DNA Extraction',
      content: 'Extract high-quality DNA from moss and microbial communities.',
      animation: '🧬',
      tips: [
        'Use appropriate lysis methods for different organisms',
        'Check DNA quality with spectrophotometry',
        'Store samples at -80°C for long-term preservation'
      ]
    },
    {
      title: 'Step 3: Sequencing Preparation',
      content: 'Prepare libraries for high-throughput sequencing.',
      animation: '🔬',
      tips: [
        'Optimize PCR conditions for target genes',
        'Use appropriate primers for 16S/ITS regions',
        'Include negative controls in all steps'
      ]
    },
    {
      title: 'Step 4: Data Analysis',
      content: 'Process and analyze metagenomic sequencing data.',
      animation: '📊',
      tips: [
        'Quality filter raw sequencing reads',
        'Use appropriate bioinformatics pipelines',
        'Validate findings with statistical analysis'
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Interactive Tutorial</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isPlaying ? (
              <PauseCircle className="w-6 h-6" />
            ) : (
              <PlayCircle className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={() => setCurrentStep(0)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold">{tutorialSteps[currentStep].title}</h4>
            <span className="text-sm text-text-secondary">
              {currentStep + 1} of {tutorialSteps.length}
            </span>
          </div>
          
          <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="mb-6 p-8 bg-white/5 rounded-lg flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-8xl"
              >
                {tutorialSteps[currentStep].animation}
              </motion.div>
            </div>
            
            <p className="text-text-secondary mb-4">
              {tutorialSteps[currentStep].content}
            </p>
          </div>

          <div className="lg:w-80">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h5 className="font-semibold mb-3">💡 Pro Tips</h5>
              <ul className="space-y-2">
                {tutorialSteps[currentStep].tips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start space-x-2"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-4 p-4 bg-accent/10 rounded-lg">
              <h5 className="font-semibold mb-2">🎯 Quick Quiz</h5>
              <p className="text-sm mb-3">
                What is the most important factor in this step?
              </p>
              <div className="space-y-2">
                <button className="w-full text-left p-2 rounded bg-white/5 hover:bg-white/10 transition-colors text-sm">
                  A. Speed of execution
                </button>
                <button className="w-full text-left p-2 rounded bg-white/5 hover:bg-white/10 transition-colors text-sm">
                  B. Quality control
                </button>
                <button className="w-full text-left p-2 rounded bg-white/5 hover:bg-white/10 transition-colors text-sm">
                  C. Cost efficiency
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            currentStep === 0 
              ? 'bg-white/5 text-text-secondary cursor-not-allowed' 
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          disabled={currentStep === tutorialSteps.length - 1}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            currentStep === tutorialSteps.length - 1
              ? 'bg-white/5 text-text-secondary cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default InteractiveTutorial;