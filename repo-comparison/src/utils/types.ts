/**
 * Types pour le système de recommandation et d'IA
 */

export interface QuizResponse {
  personal?: {
    name?: string;
    email?: string;
    age?: string;
    gender?: string;
  };
  healthConcerns?: {
    stressLevel?: string;
    sleepIssues?: string;
    energyLevel?: string;
    focusIssues?: string;
    digestiveIssues?: string;
    [key: string]: string | undefined;
  };
  goals?: {
    weightLoss?: boolean;
    increaseEnergy?: boolean;
    improveFocus?: boolean;
    improveDigestion?: boolean;
    reduceStress?: boolean;
    [key: string]: boolean | undefined;
  };
  dietaryPreferences?: string[];
  [key: string]: any;
}

export interface Recommendation {
  id: string;
  name: string;
  description: string;
  priority: number;
  matchScore?: number;
  benefits?: string[];
  recommendedDose?: string;
  timeToEffect?: string;
  scientificBasis?: string;
  confidence?: number;
  reason: string;
  [key: string]: any;
}

export interface BehavioralMetrics {
  sessionDuration: number;   // Durée de la session de quiz en secondes
  hesitationCount: number;   // Nombre de fois où l'utilisateur a hésité (changé de réponse)
  changeCount: number;       // Nombre de modifications de réponses
  engagementScore: number;   // Score d'engagement calculé
  [key: string]: number;
}

export interface NeuroProfile {
  decisionStyle: 'intuitive' | 'analytical' | 'mixed';
  riskTolerance: 'conservative' | 'moderate' | 'adventurous';
  informationProcessing: 'visual' | 'textual' | 'interactive';
  motivationFactor: 'health' | 'appearance' | 'performance' | 'longevity';
  [key: string]: string;
}

export interface UserFeedback {
  helpful: boolean;
  relevance: number;         // 1-10
  purchaseIntent: number;    // 1-10
  comments?: string;
  [key: string]: any;
}

export interface LearningData {
  timestamp: number;
  quizData: QuizResponse;
  recommendationId: string;
  userFeedback: UserFeedback;
  [key: string]: any;
}

export interface AIModelState {
  version: number;
  trainingIterations: number;
  supplementScores: Record<string, SupplementScore>;
  symptomWeights: Record<string, number>;
  goalWeights: Record<string, number>;
  userProfiles: UserProfile[];
  performanceMetrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    lastEvaluated: string;
  };
  featureImportance: Record<string, number>;
  seasonalPatterns: Record<string, SeasonalPattern>;
}

export interface SeasonalPattern {
  name: string;
  startMonth: number;
  endMonth: number;
  relatedSymptoms: string[];
  relatedSupplements: string[];
  description: string;
  confidence: number;
}

export interface PredictiveInsight {
  type: 'seasonal' | 'statistical' | 'personalized';
  symptom: string;
  relevance: number;
  supplements: string[];
  description: string;
  confidence?: number;
}

export interface SupplementSynergy {
  primaryId: string;
  secondaryId: string;
  effect: 'enhance' | 'reduce' | 'neutral';
  description: string;
  strengthPercent: number;
  evidence: 'strong' | 'moderate' | 'theoretical';
}


// These are the new types from the edited snippet. They replace and extend existing types.

/**
 * Types pour le système de recommandation nutritionnelle
 */

// Données brutes du quiz
export interface QuizData {
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  symptoms?: string[];
  objectives?: string[];
  dietaryHabits?: string[];
  proteinConsumption?: string;
  exerciseFrequency?: string;
  sleepQuality?: string;
  stressLevel?: string;
  lifestyle?: string[];
}

// Réponse complète au quiz
export interface QuizResponseNew {
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  symptoms?: string[];
  objectives?: string[];
  dietaryHabits?: any;
  proteinConsumption?: string;
  exerciseFrequency?: string;
  sleepQuality?: string;
  stressLevel?: string;
  lifestyle?: string[];
  dietaryRestrictions?: Record<string, boolean>;
  personalGoals?: string[];
  medicalConditions?: string[];
}

// Recommandation de supplément
export interface Recommendation {
  id: string;
  title: string;
  description: string;
  scientificBasis: string;
  relevanceScore: number;
  categories: string[];
  relatedTerms: string[];
  recommendedDose?: string;
}

// Suppléments spécifiques
export interface SupplementInfo {
  name: string;
  scientificName?: string;
  description: string;
  benefits: string[];
  standardDose: string;
  recommendedDose?: string;
  scientificBasis: string;
  contraindications?: string[];
  naturalSources?: string[];
  timeToEffect: string;
  category: string;
}

// Feedback utilisateur
export interface UserFeedbackNew {
  recommendationId: string;
  rating: number;
  comments?: string;
  effectiveAfterDays?: number;
  sideEffects?: string[];
  wouldRecommend?: boolean;
}

// Métriques comportementales
export interface BehavioralMetricsNew {
  timeOnQuiz: number;
  changedAnswers: number;
  engagementScore: number;
  completionTime: Date;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  interactionPattern: string[];
}

// Profil neuronal de l'utilisateur
export interface NeuroProfile {
  attentionScore: number;
  decisionSpeed: number;
  consistencyIndex: number;
  responsePatterns: string[];
  trustScore: number;
}

// Données d'apprentissage pour l'IA
export interface LearningDataNew {
  quizResponses: QuizResponseNew;
  recommendations: RecommendationNew[];
  userFeedback?: UserFeedbackNew[];
  behavioralMetrics?: BehavioralMetricsNew;
  neuroProfile?: NeuroProfile;
  effectivenessScore?: number;
}

// Données pour l'affichage des résultats
export interface ResultsDisplayData {
  recommendations: RecommendationNew[];
  userProfile: {
    symptoms: string[];
    objectives: string[];
    lifestyle: string[];
  };
  scientificLevel: number;
  analysisDate: Date;
}

// Terme scientifique
export interface ScientificTerm {
  id: string;
  title: string;
  description: string;
  category: string;
  references?: string[];
}

// Placeholder types removed