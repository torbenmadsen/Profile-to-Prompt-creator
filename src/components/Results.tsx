import React from 'react';
import { ClipboardCheck, Sparkles, Brain } from 'lucide-react';
import { ProfileResult } from '../types/types';

interface ResultsProps {
  result: ProfileResult;
  onOptimize?: () => void;
  isOptimized?: boolean;
  isOptimizing?: boolean;
  originalResult?: ProfileResult;
  onStartOver?: () => void;
}

export function Results({ 
  result, 
  onOptimize, 
  isOptimized, 
  isOptimizing,
  originalResult,
  onStartOver
}: ResultsProps) {
  const handleStartOver = () => {
    if (window.confirm('Er du sikker? Alle dine svar og resultater vil blive slettet.')) {
      if (onStartOver) onStartOver();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.promptAdjustment);
  };

  const ResultCard = ({ data, title }: { data: ProfileResult; title: string }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{data.summary}</p>
      
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Nøgleegenskaber:</h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {data.traits.map((trait, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {trait}
          </span>
        ))}
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Prompt profil input</h3>
        <div className="bg-gray-50 p-4 rounded-md relative">
          <p className="text-gray-700 pr-10">{data.promptAdjustment}</p>
          <button
            onClick={() => navigator.clipboard.writeText(data.promptAdjustment)}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-blue-600 transition-colors"
            title="Kopier til udklipsholder"
          >
            <ClipboardCheck className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <ResultCard 
          data={originalResult || result} 
          title="Original Profilanalyse" 
        />
        {isOptimized && (
          <ResultCard data={result} title="Optimeret Profilanalyse" />
        )}
      </div>
      
      {!isOptimized && (
        <div className="text-center mt-8">
          {isOptimizing ? (
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 rounded-lg">
              <Brain className="w-6 h-6 text-blue-600 animate-pulse" />
              <span className="text-blue-700 font-medium">
                Optimerer din profil med AI...
              </span>
            </div>
          ) : (
            <button
              onClick={onOptimize}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 
                       text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all 
                       duration-200 shadow-md hover:shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Optimer profil med AI</span>
            </button>
          )}
        </div>
      )}
      
      <div className="text-center mt-6">
        <button
          onClick={handleStartOver}
          className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors hover:bg-gray-100 rounded-lg"
        >
          Start forfra med nye spørgsmål
        </button>
      </div>
    </div>
  );
}
