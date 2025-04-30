/**
 * Types for the recommendation and AI system
 */

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  profileCompleted: boolean;
  dateJoined: string;
  lastLogin: string;
}

// Quiz Types
// Quiz data types
export interface QuizData {
  symptoms?: string[];
  objectives?: string[];
  dietaryHabits?: string[];
  lifestyle?: {
    sleep?: number;
    stress?: string;
    exercise?: string;
    sleepQuality?: string;
    lifestyleFactors?: string[];
  };
  proteinConsumption?: string;
  userInfo?: {
    age?: string | number;
    gender?: string;
    email?: string;
  };
  medications?: string[];
}

export interface QuizResponse {
  age?: number | string;
  gender?: string;
  dietaryPreferences?: string[];
  healthConcerns?: string[];
  goals?: string[];
  lifestyle?: string[];
  weight?: number | string;
  height?: number | string;
  sleepQuality?: string;
  stressLevel?: string;
  exerciseFrequency?: string;
}

// Recommendation related types
export interface Recommendation {
  id: string;
  name: string;
  description: string;
  dosage: string;
  timeToEffect: string;
  efficacyPercentage: number;
  primaryBenefits: string[];
  matchedSymptoms: string[];
  matchedGoals: string[];
  naturalSources: string[];
  scientificEvidence: {
    level: 'high' | 'moderate' | 'preliminary';
    keyStudies?: {
      title: string;
      authors: string;
      year: number;
      finding: string;
    }[];
  };
  isPrimary: boolean;
  matchScore?: number;
}

// AI Learning types
export interface UserFeedback {
  userId?: string;
  recommendationId: string;
  rating: number; // 1-5 scale
  comment?: string;
  userSegment?: string;
  timestamp?: string;
}

export interface RecommendationPerformance {
  id: string;
  totalRatings: number;
  averageRating: number;
  totalClicks: number;
  userSegments: Record<string, {
    totalRatings: number;
    averageRating: number;
  }>;
}

export interface BehavioralMetrics {
  engagementScore: number;
  attentionSpan: number;
  decisionSpeed: number;
  userPreferences: string[];
}

export interface NeuroProfile {
  cognitiveLoad: number;
  stressIndicators: number;
  focusMetrics: number;
  decisivenessFactor: number;
}

export interface LearningData {
  userId: string;
  quizResponses: QuizData[];
  feedbackHistory: {
    recommendationId: string;
    wasHelpful: boolean;
    timestamp: number;
  }[];
  modelVersion: string;
  lastUpdated: number;
}


// Recommendation Types

export interface RecommendationItem {
  id: string;
  name: string;
  description: string;
  scientificBasis: string;
  categories: string[];
  dosage: string;
  timeToEffect: string;
  benefits: string[];
  cautions?: string;
  naturalSources?: string[];
  relevanceScore: number;
}

// System related types

export interface BehavioralMetrics {
  engagementScore: number;
  conversionRate: number;
  recommendationAcceptance: number;
  sessionDuration: number;
  pageViews: number;
}

export interface NeuroProfile {
  primaryMotivation: string;
  decisionStyle: string;
  healthFocus: string[];
  riskTolerance: number;
  complianceLevel: number;
}

export interface UserFeedback {
  recommendationId: string;
  helpful: boolean;
  purchaseIntent: number;
  comments?: string;
  timestamp: string;
}

export interface LearningData {
  quizData: QuizResponse;
  recommendationId: string;
  userFeedback: {
    helpful: boolean;
    purchaseIntent: number;
    comments?: string;
  };
  timestamp: string;
}


export interface UserProfile {
  age?: number;
  gender?: string;
  primaryGoals: string[];
  symptoms: string[];
  dietaryPreferences: string[];
  activityLevel: string;
  sleepQuality: string;
  stressLevel: string;
}

// Profile related types
export interface ProfileData {
  completionPercentage: number;
  healthScore: number;
  recentRecommendations: Recommendation[];
  symptoms: string[];
  challenges: {
    title: string;
    progress: number;
    daysLeft: number;
  }[];
  insights: string[];
}

// Article related types
export interface ArticleData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  imageUrl: string;
  readTime: number;
  relatedArticles: string[];
}

// SEO related types
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
}

//Preserving original interfaces that weren't replaced.  These are not directly conflicting with the provided edited code.

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ArticleAuthor {
  id: string;
  name: string;
  title: string;
  avatar?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  publishedDate: string;
  updatedDate?: string;
  categories: ArticleCategory[];
  author: ArticleAuthor;
  readTime: number;
}


export interface QuizResult {
  title: string;
  subtitle?: string;
  description?: string;
  score?: number;
  recommendations?: string[];
  actionPlan?: string;
}

export interface QuizOption {
  value: string;
  label: string;
  description?: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  description: string;
  type: 'single' | 'multiple' | 'text';
  options: QuizOption[];
}

export interface AIModelMetrics {
  accuracy: number;
  recall: number;
  precision: number;
  f1Score: number;
  dataPoints: number;
  lastUpdate: string;
  version: string;
}

export interface NeuralNetworkParameters {
  learningRate: number;
  batchSize: number;
  epochCount: number;
  optimizerType: string;
  dropoutRate: number;
  patientCount: number;
  architecture?: string;
  regularization?: number;
}

export interface PatternDiscovery {
  id: string;
  name: string;
  description: string;
  correlationStrength: number;
  discoveryDate: string;
  affectedRecommendations: string[];
  confidenceLevel: number;
}

export interface PerformanceMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  confusionMatrix?: number[][];
  rocAuc?: number;
  categories: {
    name: string;
    accuracy: number;
    recommendationCount: number;
  }[];
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  relevance: number;
  category: string;
  trend: 'up' | 'down' | 'stable';
  impact: 'high' | 'medium' | 'low';
  discoveryDate: string;
  appliedToModel: boolean;
  sourceData?: any;
}

export interface AILearningStatus {
  isActive: boolean;
  trainingProgress: number;
  lastTrainingDate: string;
  modelAccuracy: number;
  totalDataPoints: number;
  recentImprovements: string[];
}

export interface SymptomMapping {
  [key: string]: {
    weight: number;
    relatedSupplements: string[];
  };
}