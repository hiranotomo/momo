import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Award, RefreshCw } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QuizModule: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: Question[] = [
    {
      id: '1',
      question: 'What type of relationship do Nostoc cyanobacteria typically form with moss?',
      options: [
        'Parasitic - harming the moss',
        'Symbiotic - providing nitrogen fixation',
        'Competitive - competing for resources',
        'Neutral - no interaction'
      ],
      correctAnswer: 1,
      explanation: 'Nostoc cyanobacteria form symbiotic relationships with moss, providing fixed nitrogen in exchange for shelter and nutrients.'
    },
    {
      id: '2',
      question: 'Which molecular marker is most commonly used for identifying bacterial communities?',
      options: [
        '18S rRNA gene',
        '16S rRNA gene',
        'ITS region',
        'COI gene'
      ],
      correctAnswer: 1,
      explanation: 'The 16S rRNA gene is the standard molecular marker for bacterial identification and phylogenetic studies.'
    },
    {
      id: '3',
      question: 'What is the primary benefit of moss-microbe associations in harsh environments?',
      options: [
        'Increased photosynthesis rate',
        'Enhanced stress tolerance',
        'Faster reproduction',
        'Larger size'
      ],
      correctAnswer: 1,
      explanation: 'Microbial associations help moss survive in harsh environments by enhancing stress tolerance through various mechanisms.'
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card text-center py-12"
      >
        <Award className="w-24 h-24 mx-auto mb-6 text-accent" />
        <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
        <p className="text-lg mb-6">
          Your Score: <span className="text-primary font-bold">{score}/{questions.length}</span> ({percentage}%)
        </p>
        
        <div className="w-full max-w-xs mx-auto mb-8">
          <div className="h-4 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetQuiz}
          className="btn-primary flex items-center space-x-2 mx-auto"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Take Quiz Again</span>
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="card">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Knowledge Quiz</h3>
          <span className="text-sm text-text-secondary">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h4 className="text-lg font-medium mb-6">
          {questions[currentQuestion].question}
        </h4>

        <div className="space-y-3 mb-6">
          {questions[currentQuestion].options.map((option, index) => {
            const isCorrect = index === questions[currentQuestion].correctAnswer;
            const isSelected = selectedAnswer === index;
            
            return (
              <motion.button
                key={index}
                whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  selectedAnswer === null
                    ? 'bg-white/5 hover:bg-white/10 cursor-pointer'
                    : isSelected
                    ? isCorrect
                      ? 'bg-success/20 border border-success'
                      : 'bg-error/20 border border-error'
                    : isCorrect
                    ? 'bg-success/10 border border-success/50'
                    : 'bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {selectedAnswer !== null && (
                    <>
                      {isSelected && isCorrect && <CheckCircle className="w-5 h-5 text-success" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-error" />}
                      {!isSelected && isCorrect && <CheckCircle className="w-5 h-5 text-success" />}
                    </>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-primary/10 rounded-lg mb-6"
          >
            <p className="text-sm">
              <span className="font-semibold">Explanation:</span> {questions[currentQuestion].explanation}
            </p>
          </motion.div>
        )}

        {selectedAnswer !== null && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="btn-primary ml-auto block"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default QuizModule;