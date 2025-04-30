// Types étendus pour le Quiz

export interface QuizResponse {
  personal?: {
    name?: string;
    email?: string;
    age?: string;
    gender?: string;
    location?: string; // Pays ou région
    weight?: string;
    height?: string;
  };
  healthConcerns?: {
    stressLevel?: string;
    sleepIssues?: string;
    energyLevel?: string;
    focusIssues?: string;
    digestiveIssues?: string;
    jointPain?: string;
    immuneSystem?: string;
    inflammation?: string;
    skinProblems?: string;
    moodSwings?: string;
    [key: string]: string | undefined;
  };
  goals?: {
    weightLoss?: boolean;
    increaseEnergy?: boolean;
    improveFocus?: boolean;
    improveDigestion?: boolean;
    reduceStress?: boolean;
    boostImmunity?: boolean;
    improveSleep?: boolean;
    improveJointHealth?: boolean;
    supportHeartHealth?: boolean;
    improveSkin?: boolean;
    detoxify?: boolean;
    [key: string]: boolean | undefined;
  };
  dietaryPreferences?: string[];
  lifestyle?: {
    physicalActivity?: string; // sedentary, moderate, active, very active
    sleepHours?: string;
    smokingStatus?: string; // non-smoker, former, occasional, regular
    alcoholConsumption?: string; // none, light, moderate, heavy
    stressLevel?: string; // low, moderate, high, very high
  };
  medications?: string[]; // Liste des médicaments actuels
  existingSupplements?: string[]; // Suppléments déjà pris
  dietaryRestrictions?: string[]; // Allergies, intolérances, restrictions
  seasonalFactors?: {
    season?: string; // spring, summer, fall, winter
    outdoorTime?: string; // minimal, moderate, significant
  };
  locationDetails?: {
      latitude?: number;
      longitude?: number;
  }; // Added for location-based recommendations
  [key: string]: any;
}

export interface QuizStep {
  id: string;
  title: string;
  description?: string;
  nextButtonText?: string;
  backButtonText?: string;
  isOptional?: boolean;
  requiredFields?: string[]; // Champs requis pour cette étape
  showCondition?: (responses: QuizResponse) => boolean; // Condition pour afficher cette étape
}

export interface SupplementRecommendation {
  id: string;
  name: string;
  description: string;
  matchScore: number;
  imageUrl?: string;
  dosage?: string;
  timeToEffect?: string;
  benefits?: string[];
  scientificEvidence?: {
    level: 'high' | 'moderate' | 'preliminary';
    description?: string;
  };
  naturalSources?: string[];
  warningNotes?: string[];
}

export interface QuizContextType {
  currentStep: number;
  responses: QuizResponse;
  updateResponses: (newData: Partial<QuizResponse>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
  isLastStep: boolean;
  progress: number;
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

export interface EnrichedRecommendation {
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
  complementarySupplements?: string[];
  scientificEvidence: {
    level: 'high' | 'moderate' | 'preliminary';
    keyStudies?: {
      title: string;
      authors: string;
      year: number;
      finding: string;
    }[];
  };
  userContextNotes?: string;
  warningNotes?: string[];
  isPrimary: boolean;
  contextualFactors?: string[];
  priorityScore?: number;
  priorityExplanation?: string;
  detailedExplanation?: string;
}

export interface CompatibleSupplement {
  supplementId: string;
  name: string;
  synergyScore: number;
  synergyType: string;
  description: string;
  relevance: string;
}

export interface CompatibilityReport {
  synergisticCombinations: {
    primary: string;
    secondary: string;
    primaryName: string;
    secondaryName: string;
    benefitDescription: string;
    synergyScore: number;
  }[];
  potentialInteractions: {
    supplement1: string;
    supplement2: string;
    name1: string;
    name2: string;
    description: string;
    severity: string;
  }[];
  supplementStack: {
    core: string[];
    supportive: string[];
    description: string;
  };
}

export interface RecommendationResult {
  supplementId: string;
  name: string;
  matchScore: number;
  reasonSymptoms?: string[];
  reasonGoals?: string[];
  efficacyPercentage?: number;
  dosageRecommendation?: string;
  timeToEffect?: string;
  naturalAlternatives?: string[];
  contextualNotes?: string;
  warningNotes?: string[];
  scientificEvidenceLevel?: 'high' | 'moderate' | 'preliminary';
  isPrimary?: boolean;
  scientificEvidence?: {
    count: number;
    strength: string;
  };
  compatibleSupplements?: CompatibleSupplement[];
}

export interface QuizResultsData {
  recommendations: RecommendationResult[];
  personalizationFactor?: number;
  aiConfidence?: number;
  analysisInsights?: string[];
  compatibilityReport?: CompatibilityReport;
}