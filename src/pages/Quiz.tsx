import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import QuizForm from "@/components/quiz/QuizForm";
import { QuizData } from "@/utils/types";
import quizIntegrationService from "@/utils/quizIntegrationService";

export default function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<QuizData>({
    symptoms: [],
    objectives: [],
    dietaryHabits: [],
    lifestyle: {
      sleep: 7,
      stress: 'moderate',
      exercise: 'light',
      sleepQuality: 'good',
      lifestyleFactors: []
    },
    proteinConsumption: '',
    userInfo: {
      age: '',
      gender: '',
      email: ''
    },
    medications: []
  });

  const handleFormChange = (data: any) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleNext = () => {
    console.log("Moving to next step:", step + 1);
    setStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    console.log("Moving to previous step:", step - 1);
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = () => {
    console.log("Quiz submitted with data:", formData);

    try {
      sessionStorage.setItem('quizData', JSON.stringify(formData));

      const enrichedData = quizIntegrationService.enrichQuizData(formData);
      console.log("Enriched quiz data:", enrichedData);

      navigate('/quiz-results', { state: enrichedData });
    } catch (error) {
      console.error("Error processing quiz submission:", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="container mx-auto px-4 pt-8 pb-16 max-w-2xl min-h-screen">
      <div className="flex flex-col space-y-8">
        <div className="text-center pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Découvrez Votre Profil Nutritionnel</h1>
          <p className="text-lg mt-2 mb-6 text-muted-foreground">
            Répondez à notre évaluation nutritionnelle et recevez des recommandations personnalisées basées sur vos besoins uniques.
          </p>
        </div>

        <div className="bg-card rounded-lg border shadow-sm p-6">
          <QuizForm
            step={step}
            formData={formData}
            onChange={handleFormChange}
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Vos données sont conservées de manière privée et sécurisée. Nous les utilisons uniquement pour générer des recommandations personnalisées.
        </div>
      </div>
    </div>
  );
}