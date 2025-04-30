
import { useState } from "react";
import { QuizResponse } from "./types";
import { toast } from "sonner";

interface UseQuizNavigationProps {
  onComplete: (responses: QuizResponse) => void;
  onUserInfoUpdate: (info: {name: string, email: string}) => void;
  stepsCount: number;
}

export const useQuizNavigation = ({ 
  onComplete, 
  onUserInfoUpdate, 
  stepsCount 
}: UseQuizNavigationProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [responses, setResponses] = useState<QuizResponse>({
    name: "",
    email: "",
    objectives: [],
    dietaryHabits: "",
    meatConsumption: "",
    fishConsumption: "",
    fruitVegConsumption: "",
    exerciseFrequency: "",
    sleepQuality: "",
    stressLevel: "",
    symptoms: [], // Assurons-nous que c'est initialisé comme un tableau vide
  });

  const updateResponse = (field: string, value: any) => {
    setResponses((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    // Validation basique selon l'étape
    if (currentStepIndex === 0 && (!responses.name || !responses.email)) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    if (currentStepIndex === 1 && (!responses.objectives || responses.objectives.length === 0)) {
      toast.error("Veuillez sélectionner au moins un objectif");
      return;
    }

    if (currentStepIndex === 0) {
      onUserInfoUpdate({
        name: responses.name,
        email: responses.email
      });
    }

    if (currentStepIndex < stepsCount - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onComplete(responses);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return {
    currentStepIndex,
    responses,
    updateResponse,
    handleNext,
    handlePrevious
  };
};
