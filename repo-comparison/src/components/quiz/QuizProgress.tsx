import React from 'react';
import { Progress } from '../ui/progress';

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = Math.floor((currentStep / totalSteps) * 100);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Étape {currentStep} sur {totalSteps}</span>
        <span>{progressPercentage}% complété</span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default QuizProgress;