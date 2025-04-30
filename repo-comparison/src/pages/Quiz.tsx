import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import SymptomsStep from "@/components/quiz/SymptomsStep";
import DietaryHabitsStep from "@/components/quiz/DietaryHabitsStep";
import LifestyleStep from "@/components/quiz/LifestyleStep";
import ObjectivesStep from "@/components/quiz/ObjectivesStep";
import ProteinConsumptionStep from "@/components/quiz/ProteinConsumptionStep";
import QuizResults from "@/components/QuizResults";
import ScientificTrustBadges from "@/components/quiz/ScientificTrustBadges";
import { QuizStep } from "@/components/quiz/types";

// Étapes du quiz
const steps = [
  { id: "symptoms", label: "Symptômes" },
  { id: "dietaryHabits", label: "Alimentation" },
  { id: "lifestyle", label: "Mode de vie" },
  { id: "objectives", label: "Objectifs" },
  { id: "proteinConsumption", label: "Protéines" }
];

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizData, setQuizData] = useState<any>({
    symptoms: [],
    dietaryHabits: [], // S'assurer que c'est toujours un tableau
    lifestyle: [],
    exerciseFrequency: "",
    sleepQuality: "",
    stressLevel: "",
    objectives: [],
    proteinConsumption: ""
  });

  // Fonction pour passer à l'étape suivante
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      completeQuiz();
    }
  };

  // Fonction pour revenir à l'étape précédente
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  // Fonction pour terminer le quiz
  const completeQuiz = () => {
    // Vérifier si suffisamment de données ont été collectées
    const dataPoints = Object.values(quizData).filter(value => 
      Array.isArray(value) ? value.length > 0 : Boolean(value)
    ).length;

    console.log("Quiz completed with data points:", dataPoints);
    console.log("Quiz data:", quizData);

    // Terminer le quiz
    setQuizCompleted(true);
  };

  // Fonction pour mettre à jour les données du quiz
  const updateQuizData = (key: string, data: any) => {
    setQuizData(prevData => ({
      ...prevData,
      [key]: data
    }));
  };

  // Fonction pour redémarrer le quiz
  const restartQuiz = () => {
    setQuizData({
      symptoms: [],
      dietaryHabits: [],
      lifestyle: [],
      exerciseFrequency: "",
      sleepQuality: "",
      stressLevel: "",
      objectives: [],
      proteinConsumption: ""
    });
    setCurrentStep(0);
    setQuizCompleted(false);
  };

  // Rendu conditionnel en fonction de l'état du quiz
  if (quizCompleted) {
    return <QuizResults quizData={quizData} restartQuiz={restartQuiz} />;
  }

  // Rendu des étapes du quiz
  const renderStep = () => {
    switch (steps[currentStep].id) {
      case "symptoms":
        return (
          <SymptomsStep 
            responses={{ symptoms: quizData.symptoms }}
            updateResponse={(field, value) => updateQuizData(field, value)} 
          />
        );
      case "dietaryHabits":
        return (
          <DietaryHabitsStep 
            responses={{ dietaryHabits: quizData.dietaryHabits }}
            updateResponse={(field, value) => updateQuizData(field, value)} 
          />
        );
      case "lifestyle":
        return (
          <LifestyleStep 
            responses={{ 
              lifestyle: quizData.lifestyle || [],
              exerciseFrequency: quizData.exerciseFrequency || "",
              sleepQuality: quizData.sleepQuality || "",
              stressLevel: quizData.stressLevel || ""
            }}
            updateResponse={(field, value) => updateQuizData(field, value)}
          />
        );
      case "objectives":
        return (
          <ObjectivesStep 
            responses={{ objectives: quizData.objectives }}
            updateResponse={(field, value) => updateQuizData(field, value)}
          />
        );
      case "proteinConsumption":
        return (
          <ProteinConsumptionStep 
            responses={{ proteinConsumption: quizData.proteinConsumption }}
            updateResponse={(field, value) => updateQuizData(field, value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container className="py-8 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Quiz Nutritionnel Personnalisé</h1>
          <p className="text-gray-600">
            Découvrez des recommandations basées sur vos besoins spécifiques
          </p>
        </div>

        {/* Indicateur de progression */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`text-xs ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}
              >
                {step.label}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Contenu de l'étape actuelle */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Badges de confiance scientifique */}
        <div className="mb-8">
          <ScientificTrustBadges />
        </div>

        {/* Boutons de navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Précédent
          </Button>
          <Button
            onClick={nextStep}
          >
            {currentStep < steps.length - 1 ? "Suivant" : "Voir mes résultats"}
          </Button>
        </div>
      </motion.div>
    </Container>
  );
};

export default Quiz;