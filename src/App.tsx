import React, { useState } from 'react';
import { Question } from './components/Question';
import { Results } from './components/Results';
import { questions } from './data/questions';
import { analyzeProfile, generatePromptAdjustment } from './utils/profileAnalyzer';
import { Profile, ProfileResult } from './types/types';
import { Brain } from 'lucide-react';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [result, setResult] = useState<ProfileResult | null>(null);
  const [optimizedResult, setOptimizedResult] = useState<ProfileResult | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleStartOver = () => {
    setAnswers([]);
    setSelectedAnswer(null);
    setCurrentQuestion(0);
    setIsComplete(false);
    setProfile(null);
    setResult(null);
    setOptimizedResult(null);
    setIsOptimizing(false);
  };


  const handleAnswer = (type: string) => {
    setSelectedAnswer(type);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;
    
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setIsComplete(true);
      analyzeProfile(newAnswers).then(newProfile => {
        setProfile(newProfile);
        generatePromptAdjustment(newProfile).then(setResult);
      });
    }
  };

  const handleOptimize = async () => {
    if (profile) {
      setIsOptimizing(true);
      const enhanced = await generatePromptAdjustment(profile, true);
      setOptimizedResult(enhanced);
      setIsOptimizing(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Brain className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Prompt Personligheds Optimering
          </h1>
          <p className="text-gray-600">
            Opdag din kommunikationsstil og få personlige LLM-interaktioner
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          {!isComplete ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Spørgsmål {currentQuestion + 1} af {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Færdig</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>
              <Question
                question={questions[currentQuestion]}
                onAnswer={handleAnswer}
                onNext={handleNext}
                selectedAnswer={selectedAnswer}
              />
            </>
          ) : result ? (
            optimizedResult ? (
              <Results 
                result={optimizedResult} 
                originalResult={result}
                isOptimized={true} 
              />
            ) : (
              <Results 
                result={result} 
                onOptimize={handleOptimize}
                isOptimized={false}
                isOptimizing={isOptimizing}
                onStartOver={handleStartOver}
              />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
