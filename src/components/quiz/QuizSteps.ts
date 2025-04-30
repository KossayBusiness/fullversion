import { QuizStep } from "./types";

// Definition of quiz steps
export const quizSteps: QuizStep[] = [
  {
    id: "userInfo",
    title: "Let's get started",
    description: "Tell us a bit about yourself",
  },
  {
    id: "objectives",
    title: "Your goals",
    description: "What would you like to improve?",
  },
  {
    id: "dietaryHabits",
    title: "Your diet",
    description: "How would you describe your eating habits?",
  },
  {
    id: "proteinConsumption",
    title: "Protein consumption",
    description: "How often do you consume these foods?",
  },
  {
    id: "lifestyle",
    title: "Your lifestyle",
    description: "Let's talk about your daily habits",
  },
  {
    id: "symptoms",
    title: "Current Symptoms",
    description: "Are you experiencing any of these symptoms?",
  },
    {
    id: "medications",
    title: "Your Medications",
    description: "List any medications you are currently taking.",
  },
];

export enum QuizStep {
  UserInfo = 0,
  Symptoms = 1,
  Objectives = 2,
  DietaryHabits = 3,
  Lifestyle = 4,
  Medications = 5, // Nouvelle étape pour les médicaments
  ProteinConsumption = 6,
  Results = 7
}

// Example of how results might be structured (replace with your actual results structure)
export const results = {
    title: "Your personalized analysis results",
    subtitle: "Based on your profile, here are the most suitable recommendations:",
    scientificBasis: "Scientific Basis",
    dosage: "Recommended Dosage",
    timeToEffect: "Time to Effect",
    naturalSources: "Natural Sources",
    complementarySupplements: "Complementary Supplements",
    contextualFactors: "Contextual Factors",
    warnings: "Important Considerations",
    download: "Download my results",
    compatibility: "Compatibility",
    efficacy: "Efficacy",
    matchScore: "Match Score",
    primaryRecommendation: "Primary Recommendation",
    secondaryRecommendations: "Secondary Recommendations",
  };

  export const resultsFR = {
    title: "Résultats de votre analyse personnalisée",
    subtitle: "Selon votre profil, voici les recommandations les plus adaptées :",
    scientificBasis: "Base scientifique",
    dosage: "Posologie recommandée",
    timeToEffect: "Délai d'efficacité",
    naturalSources: "Sources naturelles",
    complementarySupplements: "Compléments complémentaires",
    contextualFactors: "Facteurs contextuels",
    warnings: "Précautions importantes",
    download: "Télécharger mes résultats",
    compatibility: "Compatibilité",
    efficacy: "Efficacité",
    matchScore: "Score de correspondance",
    primaryRecommendation: "Recommandation principale",
    secondaryRecommendations: "Recommandations secondaires",
  };