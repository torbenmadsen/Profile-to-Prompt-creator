import React from 'react';
import { Question as QuestionType } from '../types/types';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (type: string) => void;
  onNext: () => void;
  selectedAnswer: string | null;
}

export function Question({ question, onAnswer, onNext, selectedAnswer }: QuestionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{question.text}</h2>
      <div className="grid gap-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.type)}
            className={`p-4 text-left rounded-lg shadow-sm border transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                     ${selectedAnswer === option.type 
                       ? 'bg-blue-50 border-blue-500 shadow-md' 
                       : 'bg-white border-gray-200 hover:border-blue-500 hover:shadow-md'}`}
          >
            {option.text}
          </button>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          disabled={!selectedAnswer}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-200
                    ${selectedAnswer 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          Næste Spørgsmål
        </button>
      </div>
    </div>
  );
}
