
import { QuizResponse, Recommendation } from '@/components/quiz/types';

interface BehavioralData {
  timePerQuestion: number[];
  changeFrequency: number;
  hesitationPatterns: number[];
  scrollBehavior: {
    speed: number;
    direction_changes: number;
  };
}

interface NeuroProfile {
  stressIndex: number;
  decisionConfidence: number;
  attentionScore: number;
  consistencyIndex: number;
}

export const analyzeUserBehavior = (behavioralData: BehavioralData): NeuroProfile => {
  const averageTimePerQuestion = behavioralData.timePerQuestion.reduce((a, b) => a + b, 0) / behavioralData.timePerQuestion.length;
  const timeVariance = Math.sqrt(
    behavioralData.timePerQuestion.reduce((acc, time) => acc + Math.pow(time - averageTimePerQuestion, 2), 0) / behavioralData.timePerQuestion.length
  );

  return {
    stressIndex: calculateStressIndex(behavioralData),
    decisionConfidence: calculateDecisionConfidence(timeVariance, behavioralData.changeFrequency),
    attentionScore: calculateAttentionScore(behavioralData),
    consistencyIndex: calculateConsistencyIndex(behavioralData.hesitationPatterns)
  };
};

const calculateStressIndex = (data: BehavioralData): number => {
  const scrollStress = data.scrollBehavior.speed * (data.scrollBehavior.direction_changes / 10);
  const timeStress = data.timePerQuestion.some(time => time < 2) ? 0.8 : 0.4;
  return Math.min((scrollStress + timeStress) * 100, 100);
};

const calculateDecisionConfidence = (timeVariance: number, changeFrequency: number): number => {
  const baseConfidence = 100 - (timeVariance * 10);
  const changeImpact = changeFrequency * 5;
  return Math.max(0, Math.min(baseConfidence - changeImpact, 100));
};

const calculateAttentionScore = (data: BehavioralData): number => {
  const avgTime = data.timePerQuestion.reduce((a, b) => a + b, 0) / data.timePerQuestion.length;
  const scrollQuality = 1 - (data.scrollBehavior.speed / 10);
  return Math.min((avgTime * scrollQuality * 20), 100);
};

const calculateConsistencyIndex = (hesitationPatterns: number[]): number => {
  const patternVariance = hesitationPatterns.reduce((acc, val) => acc + Math.abs(val - 1), 0);
  return Math.max(0, 100 - (patternVariance * 15));
};

export const generateRecommendations = (
  responses: QuizResponse,
  neuroProfile: NeuroProfile
): Recommendation[] => {
  const recommendations: Recommendation[] = [];
  const { stressIndex, attentionScore, consistencyIndex } = neuroProfile;

  // Stress-based recommendations
  if (stressIndex > 70) {
    recommendations.push({
      title: "Programme Anti-Stress Avancé",
      description: "Formule scientifique adaptée aux profils à forte charge cognitive",
      confidence: stressIndex / 100,
      benefits: [
        "Réduction du stress chronique",
        "Amélioration de la concentration",
        "Régulation du cortisol"
      ],
      timeToEffect: "2-4 semaines",
      popularity: 89
    });
  }

  // Attention-based recommendations
  if (attentionScore < 60) {
    recommendations.push({
      title: "Complexe Neuro-Optimisation",
      description: "Support cognitif basé sur les dernières recherches en neurosciences",
      confidence: (100 - attentionScore) / 100,
      benefits: [
        "Amélioration de la clarté mentale",
        "Support de la mémoire",
        "Optimisation cognitive"
      ],
      timeToEffect: "3-6 semaines",
      popularity: 92
    });
  }

  // Add base recommendation with adjusted confidence
  recommendations.push({
    title: "Formule Équilibre Fondamental",
    description: "Support nutritionnel personnalisé basé sur votre profil neurologique",
    confidence: consistencyIndex / 100,
    benefits: [
      "Équilibre nutritionnel optimal",
      "Support immunitaire",
      "Vitalité quotidienne"
    ],
    timeToEffect: "2-8 semaines",
    popularity: 85
  });

  return recommendations.sort((a, b) => b.confidence - a.confidence);
};
