
import { QuizStep } from "./types";

// Définition des étapes du quiz
export const quizSteps: QuizStep[] = [
  {
    id: "userInfo",
    title: "Pour commencer",
    description: "Parlez-nous un peu de vous",
  },
  {
    id: "objectives",
    title: "Vos objectifs",
    description: "Qu'aimeriez-vous améliorer ?",
  },
  {
    id: "dietaryHabits",
    title: "Votre alimentation",
    description: "Comment décririez-vous vos habitudes alimentaires ?",
  },
  {
    id: "proteinConsumption",
    title: "Consommation de protéines",
    description: "À quelle fréquence consommez-vous ces aliments ?",
  },
  {
    id: "lifestyle",
    title: "Votre mode de vie",
    description: "Parlons de vos habitudes quotidiennes",
  },
  {
    id: "symptoms",
    title: "Symptômes actuels",
    description: "Ressentez-vous l'un de ces symptômes ?",
  },
];
