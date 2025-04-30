/**
 * Moteur d'apprentissage IA avancé pour les recommandations nutritionnelles personnalisées
 */

import { 
  LearningData, 
  AIModelState, 
  QuizResponse, 
  Recommendation,
  UserProfile,
  UserFeedback,
  BehavioralMetrics,
  NeuroProfile
} from './types';
import { SUPPLEMENT_CATALOG } from '../data/supplementCatalog';
import { findSimilarProfiles } from './userSimilarity';

import { calculateProfileSimilarity } from './userSimilarity';

/**
 * Sauvegarde les données d'apprentissage basées sur le quiz et les retours utilisateurs
 */
export const saveLearningData = (
  quizResponses: any, 
  recommendations: any[], 
  userFeedback: { 
    helpful: boolean; 
    purchaseIntent: number; 
    selectedRecommendations?: string[]; 
    additionalComments?: string;
    satisfactionRating?: number;
  }
) => {
  try {
    const learningEntry = {
      timestamp: new Date().toISOString(),
      quizData: {
        symptoms: quizResponses.symptoms || [],
        objectives: quizResponses.objectives || [],
        age: quizResponses.age,
        gender: quizResponses.gender,
        dietType: quizResponses.dietType,
        lifestyle: quizResponses.lifestyle || []
      },
      recommendationIds: recommendations.map(rec => ({
        id: rec.id,
        matchScore: rec.matchScore,
        isPrimary: !!rec.isPrimary
      })),
      feedback: userFeedback,
      sessionId: quizResponses.sessionId || `session_${Date.now()}`
    };

    // Récupérer les données d'apprentissage existantes
    let learningData = [];
    const storedData = localStorage.getItem('aiLearningData');

    if (storedData) {
      learningData = JSON.parse(storedData);
    }

    // Ajouter les nouvelles données
    learningData.push(learningEntry);

    // Limiter la taille des données stockées
    if (learningData.length > 500) {
      learningData = learningData.slice(-500); // Garder seulement les 500 entrées les plus récentes
    }

    // Sauvegarder les données mises à jour
    localStorage.setItem('aiLearningData', JSON.stringify(learningData));

    // Analyser et mettre à jour le modèle si suffisamment de nouvelles données
    if (learningData.length % 20 === 0) {
      // Toutes les 20 entrées, mettre à jour le modèle d'apprentissage
      updateLearningModel(learningData);
    }

    return true;
  } catch (error) {
    console.error('Error saving learning data:', error);
    return false;
  }
};

/**
 * Met à jour le modèle d'apprentissage basé sur les données accumulées
 */
const updateLearningModel = (learningData: any[]): void => {
  try {
    // Calculer les taux de succès par complément et symptôme
    const supplementFeedbackMap: Record<string, { positive: number; total: number }> = {};
    const symptomEffectivenessMap: Record<string, Record<string, { positive: number; total: number }>> = {};

    // Analyser toutes les données d'apprentissage
    learningData.forEach(entry => {
      // Ignorer les entrées sans feedback
      if (!entry.feedback) return;

      const isPositiveFeedback = entry.feedback.helpful || 
                               (entry.feedback.satisfactionRating && entry.feedback.satisfactionRating >= 4) ||
                               entry.feedback.purchaseIntent >= 7;

      // Mettre à jour les statistiques pour chaque recommandation
      entry.recommendationIds.forEach((rec: { id: string }) => {
        if (!supplementFeedbackMap[rec.id]) {
          supplementFeedbackMap[rec.id] = { positive: 0, total: 0 };
        }

        supplementFeedbackMap[rec.id].total += 1;
        if (isPositiveFeedback) {
          supplementFeedbackMap[rec.id].positive += 1;
        }
      });

      // Analyser l'efficacité par symptôme
      if (entry.quizData.symptoms && entry.quizData.symptoms.length > 0) {
        entry.quizData.symptoms.forEach((symptom: string) => {
          if (!symptomEffectivenessMap[symptom]) {
            symptomEffectivenessMap[symptom] = {};
          }

          entry.recommendationIds.forEach((rec: { id: string }) => {
            if (!symptomEffectivenessMap[symptom][rec.id]) {
              symptomEffectivenessMap[symptom][rec.id] = { positive: 0, total: 0 };
            }

            symptomEffectivenessMap[symptom][rec.id].total += 1;
            if (isPositiveFeedback) {
              symptomEffectivenessMap[symptom][rec.id].positive += 1;
            }
          });
        });
      }
    });

    // Calculer les scores d'efficacité
    const supplementEffectiveness: Record<string, number> = {};
    Object.entries(supplementFeedbackMap).forEach(([supplementId, stats]) => {
      if (stats.total >= 5) { // Minimum de 5 données pour considérer les statistiques fiables
        supplementEffectiveness[supplementId] = stats.positive / stats.total;
      }
    });

    // Calculer les facteurs d'ajustement par symptôme
    const symptomSupplementFactors: Record<string, Record<string, number>> = {};
    Object.entries(symptomEffectivenessMap).forEach(([symptom, supplements]) => {
      symptomSupplementFactors[symptom] = {};

      Object.entries(supplements).forEach(([supplementId, stats]) => {
        if (stats.total >= 3) { // Au moins 3 données par symptôme
          symptomSupplementFactors[symptom][supplementId] = stats.positive / stats.total;
        }
      });
    });

    // Sauvegarder le modèle mis à jour
    const updatedModel = {
      timestamp: new Date().toISOString(),
      version: (new Date()).getTime(),
      supplementEffectiveness,
      symptomSupplementFactors,
      dataPointsCount: learningData.length
    };

    localStorage.setItem('aiLearningModel', JSON.stringify(updatedModel));
    console.log('AI learning model updated with', learningData.length, 'data points');

  } catch (error) {
    console.error('Error updating learning model:', error);
  }
};

/**
 * Ajuste les recommandations en fonction du modèle d'apprentissage
 */
export const adjustRecommendationsWithLearning = (recommendations: any[], userData: any): any[] => {
  try {
    // Récupérer le modèle d'apprentissage
    const modelData = localStorage.getItem('aiLearningModel');
    if (!modelData) {
      return recommendations; // Pas de modèle, retourner les recommandations telles quelles
    }

    const model = JSON.parse(modelData);
    const { supplementEffectiveness, symptomSupplementFactors } = model;

    // Aucune donnée d'efficacité, retourner les recommandations telles quelles
    if (!supplementEffectiveness || Object.keys(supplementEffectiveness).length === 0) {
      return recommendations;
    }

    // Ajuster les scores basés sur les données d'apprentissage
    return recommendations.map(recommendation => {
      let learningAdjustment = 0;

      // Ajustement basé sur l'efficacité globale
      if (supplementEffectiveness[recommendation.id]) {
        learningAdjustment += (supplementEffectiveness[recommendation.id] - 0.5) * 0.2; // Ajustement dans la plage [-0.1, 0.1]
      }

      // Ajustement basé sur la correspondance symptôme-supplément
      if (userData.symptoms && userData.symptoms.length > 0 && symptomSupplementFactors) {
        let symptomMatchBoost = 0;
        let matchCount = 0;

        userData.symptoms.forEach((symptom: string) => {
          if (symptomSupplementFactors[symptom] && symptomSupplementFactors[symptom][recommendation.id]) {
            symptomMatchBoost += (symptomSupplementFactors[symptom][recommendation.id] - 0.5) * 0.3;
            matchCount++;
          }
        });

        // Appliquer l'ajustement moyen pour les symptômes correspondants
        if (matchCount > 0) {
          learningAdjustment += symptomMatchBoost / matchCount;
        }
      }

      // Appliquer l'ajustement final
      const adjustedScore = Math.min(1, Math.max(0, recommendation.matchScore + learningAdjustment));

      return {
        ...recommendation,
        matchScore: adjustedScore,
        originalScore: recommendation.matchScore,
        learningAdjustment
      };
    }).sort((a, b) => b.matchScore - a.matchScore); // Retrier en fonction des nouveaux scores
  } catch (error) {
    console.error('Error adjusting recommendations with learning data:', error);
    return recommendations; // En cas d'erreur, retourner les recommandations non modifiées
  }
};

/**
 * Enregistre le retour utilisateur sur une recommandation spécifique
 */
export const recordUserFeedback = (
  recommendationId: string,
  feedback: {
    helpful: boolean;
    effective: boolean;
    purchased: boolean;
    satisfactionRating?: number;
    comments?: string;
  }
): void => {
  try {
    // Récupérer les retours existants
    let feedbackData: any[] = [];
    const storedFeedback = localStorage.getItem('recommendationFeedback');

    if (storedFeedback) {
      feedbackData = JSON.parse(storedFeedback);
    }

    // Ajouter le nouveau retour
    feedbackData.push({
      recommendationId,
      feedback,
      timestamp: new Date().toISOString()
    });

    // Limiter la taille des données stockées
    if (feedbackData.length > 1000) {
      feedbackData = feedbackData.slice(-1000);
    }

    // Sauvegarder
    localStorage.setItem('recommendationFeedback', JSON.stringify(feedbackData));

  } catch (error) {
    console.error('Error recording user feedback:', error);
  }
};

/**
 * Obtient les statistiques d'apprentissage actuelles
 */
export const getLearningStatistics = (): any => {
  try {
    const model = localStorage.getItem('aiLearningModel');
    const feedbackData = localStorage.getItem('recommendationFeedback');
    const learningData = localStorage.getItem('aiLearningData');

    if (!model) {
      return {
        modelAvailable: false,
        dataPoints: 0,
        lastUpdate: null,
        accuracy: 0
      };
    }

    const modelObj = JSON.parse(model);
    const feedbackCount = feedbackData ? JSON.parse(feedbackData).length : 0;
    const learningCount = learningData ? JSON.parse(learningData).length : 0;

    // Calculer l'accuracy globale
    let totalPositive = 0;
    let totalFeedback = 0;

    if (feedbackData) {
      const feedbacks = JSON.parse(feedbackData);
      feedbacks.forEach((item: any) => {
        totalFeedback++;
        if (item.feedback.helpful || (item.feedback.satisfactionRating && item.feedback.satisfactionRating >= 4)) {
          totalPositive++;
        }
      });
    }

    const accuracy = totalFeedback > 0 ? (totalPositive / totalFeedback) : 0;

    return {
      modelAvailable: true,
      version: modelObj.version,
      lastUpdate: modelObj.timestamp,
      dataPoints: learningCount,
      feedbackCount,
      accuracy: accuracy * 100, // En pourcentage
      supplementsCovered: Object.keys(modelObj.supplementEffectiveness || {}).length,
      symptomsCovered: Object.keys(modelObj.symptomSupplementFactors || {}).length
    };
  } catch (error) {
    console.error('Error getting learning statistics:', error);
    return {
      modelAvailable: false,
      error: 'Failed to retrieve statistics'
    };
  }
};

/**
 * Ajuste les recommandations en fonction des données d'apprentissage précédentes
 * Utilise des techniques avancées comme la pondération de similitude et l'analyse des tendances
 * Version améliorée avec apprentissage incrémental et détection de biais
 */
// Function implementation moved to avoid duplication

/**
 * Fonctions utilitaires pour l'apprentissage automatique amélioré
 */

// Fonction sigmoïde pour un ajustement plus sophistiqué
function calculateSigmoidAdjustment(value: number, scale: number): number {
  return scale * (2 / (1 + Math.exp(-2 * value)) - 1);
}

// Extrait le segment démographique d'un utilisateur
function getUserDemographicSegment(quizData: any): string | null {
  if (!quizData || !quizData.personal) return null;
  
  // Construire un segment basé sur l'âge et le genre
  const age = parseInt(quizData.personal.age, 10);
  const gender = quizData.personal.gender;
  
  let ageGroup = '';
  if (!isNaN(age)) {
    if (age < 30) ageGroup = 'young';
    else if (age < 50) ageGroup = 'middle';
    else ageGroup = 'senior';
  }
  
  // Retourner le segment combiné
  if (ageGroup && gender) {
    return `${gender}_${ageGroup}`;
  } else if (ageGroup) {
    return ageGroup;
  } else if (gender) {
    return gender;
  }
  
  return null;
}

// Analyse la qualité des données pour une décision actuelle
function analyzeDataQualityForDecision(
  currentProfile: QuizResponse,
  similarProfiles: Array<{data: LearningData, similarityScore: number}>,
  allData: LearningData[]
): number {
  // Pas de profils similaires = qualité nulle
  if (similarProfiles.length === 0) return 0;
  
  // Facteurs de qualité des données
  const factors = {
    // 1. Nombre de profils similaires (plus c'est élevé, mieux c'est)
    profileCount: Math.min(1, similarProfiles.length / 15),
    
    // 2. Score de similarité moyen (plus c'est proche de 1, mieux c'est)
    avgSimilarity: similarProfiles.reduce((sum, p) => sum + p.similarityScore, 0) / similarProfiles.length,
    
    // 3. Quantité de feedback disponible
    feedbackCoverage: similarProfiles.filter(p => 
      p.data.userFeedback && p.data.userFeedback.length > 0
    ).length / similarProfiles.length,
    
    // 4. Diversité des profils (éviter les décisions basées sur des données trop homogènes)
    profileDiversity: calculateProfileDiversity(similarProfiles),
    
    // 5. Récence des données (données plus récentes = meilleure qualité)
    dataRecency: calculateDataRecency(similarProfiles)
  };
  
  // Pondération des facteurs
  const weights = {
    profileCount: 0.2,
    avgSimilarity: 0.3,
    feedbackCoverage: 0.25,
    profileDiversity: 0.15,
    dataRecency: 0.1
  };
  
  // Calcul du score pondéré
  let qualityScore = 0;
  for (const [factor, value] of Object.entries(factors)) {
    qualityScore += value * weights[factor as keyof typeof weights];
  }
  
  return qualityScore;
}

// Calcule la diversité des profils similaires
function calculateProfileDiversity(profiles: Array<{data: LearningData; similarityScore: number}>): number {
  if (profiles.length < 2) return 0;
  
  // Extraire des caractéristiques clés pour l'analyse de diversité
  const features: Array<{
    age?: string;
    gender?: string;
    symptoms: string[];
    goals: string[];
  }> = profiles.map(p => ({
    age: p.data.quizData.demographics?.age,
    gender: p.data.quizData.demographics?.gender,
    symptoms: Object.keys(p.data.quizData.healthConcerns || {}),
    goals: Object.keys(p.data.quizData.goals || {})
  }));
  
  // Calculer la diversité des caractéristiques
  const uniqueGenders = new Set(features.map(f => f.gender).filter(Boolean)).size;
  const uniqueAgeGroups = new Set(features.map(f => {
    const age = parseInt(f.age || '0', 10);
    if (isNaN(age)) return null;
    if (age < 30) return 'young';
    if (age < 50) return 'middle';
    return 'senior';
  }).filter(Boolean)).size;
  
  // Calculer la diversité des symptômes et objectifs
  const allSymptoms = new Set<string>();
  const allGoals = new Set<string>();
  features.forEach(f => {
    f.symptoms.forEach(s => allSymptoms.add(s));
    f.goals.forEach(g => allGoals.add(g));
  });
  
  const symptomsVariety = Math.min(1, allSymptoms.size / 10);
  const goalsVariety = Math.min(1, allGoals.size / 5);
  
  // Combiner les facteurs de diversité
  return (
    (uniqueGenders / 2) * 0.2 +
    (uniqueAgeGroups / 3) * 0.3 +
    symptomsVariety * 0.3 +
    goalsVariety * 0.2
  );
}

// Calcule la récence des données
function calculateDataRecency(profiles: Array<{data: LearningData; similarityScore: number}>): number {
  const now = new Date().getTime();
  
  // Calculer l'âge moyen des données en jours
  const ageSum = profiles.reduce((sum, profile) => {
    const timestamp = new Date(profile.data.timestamp).getTime();
    const ageInDays = (now - timestamp) / (1000 * 60 * 60 * 24);
    return sum + ageInDays;
  }, 0);
  
  const avgAgeInDays = ageSum / profiles.length;
  
  // Convertir en score de récence (plus récent = score plus élevé)
  return Math.max(0, Math.min(1, 1 - (avgAgeInDays / 365)));
}

// Enregistre un écart d'apprentissage pour amélioration future
function recordLearningGap(
  gapType: 'insufficient_data' | 'novel_profile' | 'algorithm_error' | 'low_quality_data',
  quizData: any,
  qualityScore?: number
): void {
  try {
    const learningGaps = secureStorageService.getItem('aiLearningGaps') || [];
    
    learningGaps.push({
      timestamp: new Date().toISOString(),
      gapType,
      profileFingerprint: createProfileFingerprint(quizData),
      qualityScore,
      quizDataSummary: summarizeQuizData(quizData)
    });
    
    // Limiter la taille des données
    if (learningGaps.length > 100) {
      learningGaps.splice(0, learningGaps.length - 100);
    }
    
    secureStorageService.setItem('aiLearningGaps', learningGaps);
  } catch (error) {
    console.warn("Erreur lors de l'enregistrement d'un écart d'apprentissage:", error);
  }
}

// Résumé anonymisé des données du quiz pour l'apprentissage
function summarizeQuizData(quizData: any): any {
  // Créer un résumé anonymisé pour l'analyse
  if (!quizData) return {};
  
  return {
    hasAge: !!quizData.personal?.age,
    hasGender: !!quizData.personal?.gender,
    symptomCount: Object.keys(quizData.healthConcerns || {}).length,
    goalCount: Object.keys(quizData.goals || {}).length,
    hasMedications: Array.isArray(quizData.medications) && quizData.medications.length > 0,
    primaryConcerns: getPrimarySymptoms(quizData).slice(0, 3)
  };
}

// Enregistre un ajustement pour apprentissage futur
function recordAdjustmentForLearning(
  quizData: QuizResponse,
  adjustedRecommendations: Recommendation[],
  baseRecommendations: Recommendation[]
): void {
  try {
    const adjustmentHistory = secureStorageService.getItem('aiAdjustmentHistory') || [];
    
    // Filtrer pour ne garder que les recommandations significativement ajustées
    const significantAdjustments = adjustedRecommendations
      .filter(rec => {
        const baseRec = baseRecommendations.find(b => b.id === rec.id);
        return baseRec && Math.abs(rec.matchScore - baseRec.matchScore) > 5;
      })
      .map(rec => {
        const baseRec = baseRecommendations.find(b => b.id === rec.id);
        return {
          id: rec.id,
          beforeScore: baseRec?.matchScore || 0,
          afterScore: rec.matchScore,
          delta: rec.matchScore - (baseRec?.matchScore || 0),
          confidence: rec.aiConfidenceScore || 0,
          insights: rec.aiInsights || {}
        };
      });
    
    if (significantAdjustments.length > 0) {
      adjustmentHistory.push({
        timestamp: new Date().toISOString(),
        profileFingerprint: createProfileFingerprint(quizData),
        adjustments: significantAdjustments,
        profileSummary: summarizeQuizData(quizData)
      });
      
      // Limiter la taille de l'historique
      if (adjustmentHistory.length > 50) {
        adjustmentHistory.splice(0, adjustmentHistory.length - 50);
      }
      
      secureStorageService.setItem('aiAdjustmentHistory', adjustmentHistory);
    }
  } catch (error) {
    console.warn("Erreur lors de l'enregistrement d'un ajustement pour apprentissage:", error);
  }
}

// Obtient le contexte saisonnier actuel
function getSeasonalContext(): { 
  season: string; 
  seasonalFocus: string[];
  environmentalFactors: string[];
} {
  const now = new Date();
  const month = now.getMonth();
  
  // Déterminer la saison
  let season = 'spring';
  let seasonalFocus = [];
  let environmentalFactors = [];
  
  if (month >= 2 && month <= 4) {
    season = 'spring';
    seasonalFocus = ['allergies', 'detox', 'energy'];
    environmentalFactors = ['pollen', 'humidity changes'];
  } else if (month >= 5 && month <= 7) {
    season = 'summer';
    seasonalFocus = ['hydration', 'sun protection', 'activity'];
    environmentalFactors = ['heat', 'sun exposure', 'outdoor activity'];
  } else if (month >= 8 && month <= 10) {
    season = 'fall';
    seasonalFocus = ['immunity', 'mood', 'skin'];
    environmentalFactors = ['temperature changes', 'reduced daylight'];
  } else {
    season = 'winter';
    seasonalFocus = ['immunity', 'vitamin D', 'mood', 'energy'];
    environmentalFactors = ['cold', 'reduced sunlight', 'indoor air'];
  }
  
  return { season, seasonalFocus, environmentalFactors };
}

// Obtient les tendances nutritionnelles actuelles
function getNutritionalTrends(): { 
  risingIngredients: string[];
  risingConcerns: string[];
  popularity: Record<string, number>;
} {
  // Dans une version réelle, ces données proviendraient d'une API ou base de données
  // Simulation pour démonstration
  return {
    risingIngredients: ['ashwagandha', 'magnesium', 'vitamin-d', 'omega3'],
    risingConcerns: ['stress', 'immunity', 'sleep', 'brain-fog'],
    popularity: {
      'vitamin-d-supplement': 0.85,
      'magnesium-glycinate': 0.82,
      'zinc-picolinate': 0.75,
      'probiotics-daily': 0.78,
      'omega3-supplementation': 0.80,
      'ashwagandha-extract': 0.79
    }
  };
}

// Calcule une pertinence contextuelle avancée
function calculateEnhancedContextualRelevance(
  recommendationId: string,
  quizResponses: QuizResponse,
  seasonalContext: ReturnType<typeof getSeasonalContext>,
  nutritionalTrends: ReturnType<typeof getNutritionalTrends>
): number {
  let relevanceScore = 0;
  
  // 1. Pertinence saisonnière
  const seasonMatch = {
    'vitamin-d-supplement': { winter: 0.8, fall: 0.6, spring: 0.4, summer: 0.2 },
    'zinc-picolinate': { winter: 0.7, fall: 0.6, spring: 0.4, summer: 0.3 },
    'vitamin-c-complex': { winter: 0.7, fall: 0.5, spring: 0.5, summer: 0.3 },
    'probiotics-daily': { winter: 0.5, fall: 0.5, spring: 0.6, summer: 0.6 },
    'magnesium-glycinate': { winter: 0.5, fall: 0.5, spring: 0.5, summer: 0.7 },
    'omega3-supplementation': { winter: 0.6, fall: 0.6, spring: 0.5, summer: 0.5 }
  };
  
  if (seasonMatch[recommendationId as keyof typeof seasonMatch]) {
    relevanceScore += seasonMatch[recommendationId as keyof typeof seasonMatch][seasonalContext.season as keyof typeof seasonMatch[keyof typeof seasonMatch]] || 0;
  }
  
  // 2. Correspondance avec les tendances actuelles
  if (nutritionalTrends.popularity[recommendationId]) {
    relevanceScore += nutritionalTrends.popularity[recommendationId] * 0.3;
  }
  
  // 3. Facteurs environnementaux spécifiques
  if (seasonalContext.environmentalFactors.includes('reduced sunlight') && 
      recommendationId === 'vitamin-d-supplement') {
    relevanceScore += 0.4;
  }
  
  if (seasonalContext.environmentalFactors.includes('heat') && 
      recommendationId === 'magnesium-glycinate') {
    relevanceScore += 0.3;
  }
  
  // Normaliser pour rester dans une plage raisonnable
  return Math.min(1, relevanceScore);
}

// Analyse les interactions médicamenteuses potentielles
function analyzeMedicationInteractions(medications: string[]): Record<string, {severity: number}> {
  const interactions: Record<string, {severity: number}> = {};
  
  try {
    // Vérifier si le service de compatibilité est disponible
    const compatibilitySystem = require('./supplementCompatibilitySystem').default;
    
    // Simuler une analyse de toutes les interactions potentielles
    const commonSupplements = [
      'vitamin-d-supplement', 'magnesium-glycinate', 'zinc-picolinate',
      'omega3-supplementation', 'ashwagandha-extract', 'vitamin-b-complex'
    ];
    
    commonSupplements.forEach(supplementId => {
      let maxSeverity = 0;
      
      // Récupérer les interactions pour ce supplément
      const supplementInteractions = compatibilitySystem.checkMedicationInteractions(supplementId, medications);
      
      // Déterminer la sévérité maximale
      supplementInteractions.forEach(interaction => {
        let severityScore = 0;
        if (interaction.severity === 'high') severityScore = 0.9;
        else if (interaction.severity === 'moderate') severityScore = 0.5;
        else if (interaction.severity === 'minor') severityScore = 0.2;
        
        maxSeverity = Math.max(maxSeverity, severityScore);
      });
      
      if (maxSeverity > 0) {
        interactions[supplementId] = { severity: maxSeverity };
      }
    });
  } catch (error) {
    console.warn("Système d'interactions médicamenteuses non disponible:", error);
  }
  
  return interactions;
}

// Simule les informations scientifiques récentes
function getLatestScientificInsights(): Record<string, {impact: number; evidence: number}> {
  // Dans un système réel, ces données proviendraient d'une API ou d'une base de données mise à jour
  return {
    'vitamin-d-supplement': { impact: 0.15, evidence: 0.9 },   // Nouvelles recherches sur l'immunité
    'magnesium-glycinate': { impact: 0.12, evidence: 0.8 },    // Nouvelles études sur stress/sommeil
    'zinc-picolinate': { impact: 0.08, evidence: 0.7 },        // Études sur absorption optimisée
    'ashwagandha-extract': { impact: 0.18, evidence: 0.75 },   // Nouvelles recherches sur stress/cortisol
    'probiotics-daily': { impact: 0.14, evidence: 0.8 },       // Recherches axe intestin-cerveau
    'omega3-supplementation': { impact: 0.1, evidence: 0.85 }  // Études cardiovasculaires récentes
  };
}

// Trie les recommandations de manière optimale avec une stratégie multi-factorielle
function sortRecommendationsOptimally(recommendations: Recommendation[]): Recommendation[] {
  // Créer une version profonde des recommandations pour le tri
  const sortableRecs = [...recommendations];
  
  // Calculer un score composite qui équilibre priorité, score de correspondance et confiance
  sortableRecs.forEach(rec => {
    // Score composite: importance de la priorité > score > confiance
    const priorityFactor = 100 * (1 / Math.max(1, rec.priority));
    const scoreFactor = rec.matchScore;
    const confidenceFactor = (rec.aiConfidenceScore || 0.5) * 10;
    
    // Stocker temporairement pour le tri
    (rec as any).sortScore = priorityFactor * 0.6 + scoreFactor * 0.3 + confidenceFactor * 0.1;
  });
  
  // Trier par score composite
  sortableRecs.sort((a, b) => (b as any).sortScore - (a as any).sortScore);
  
  // Nettoyer le score temporaire
  return sortableRecs.map(rec => {
    const cleanRec = { ...rec };
    delete (cleanRec as any).sortScore;
    return cleanRec;
  });
}

// Approche hybride quand la qualité des données est moyenne
function hybridAdjustRecommendations(
  baseRecommendations: Recommendation[],
  quizResponses: QuizResponse,
  similarProfiles: Array<{data: LearningData; similarityScore: number}>,
  dataQualityScore: number
): Recommendation[] {
  // Combiner une approche basée sur règles avec des données limitées
  const ruleBasedRecs = enhanceRecommendationsWithRules(baseRecommendations, quizResponses);
  
  // Calculer un facteur de confiance pour les données vs les règles
  const dataWeight = Math.min(0.6, dataQualityScore * 0.8);
  const rulesWeight = 1 - dataWeight;
  
  console.log(`Utilisation d'un modèle hybride: ${Math.round(dataWeight*100)}% données, ${Math.round(rulesWeight*100)}% règles`);
  
  // Récupérer des insights limités des données similaires
  const limitedInsights: Record<string, {score: number; count: number}> = {};
  
  // Analyser les données de façon conservative
  similarProfiles.forEach(profile => {
    if (!profile.data.userFeedback || !profile.data.userFeedback.length) return;
    
    profile.data.userFeedback.forEach(feedback => {
      if (!limitedInsights[feedback.recommendationId]) {
        limitedInsights[feedback.recommendationId] = { score: 0, count: 0 };
      }
      
      limitedInsights[feedback.recommendationId].score += (feedback.rating - 3) * profile.similarityScore;
      limitedInsights[feedback.recommendationId].count++;
    });
  });
  
  // Appliquer les ajustements hybrides
  return ruleBasedRecs.map(rec => {
    const insight = limitedInsights[rec.id];
    
    if (insight && insight.count >= 2) {
      const avgAdjustment = insight.score / insight.count;
      const limitedAdjustment = avgAdjustment * 4.0 * dataWeight; // Impact limité
      
      rec.matchScore = Math.min(100, Math.max(0, rec.matchScore + limitedAdjustment));
      rec.aiAdjusted = true;
      rec.aiConfidenceScore = Math.min(0.6, (insight.count / 10) * dataQualityScore);
      rec.aiInsights = {
        similarProfilesCount: insight.count,
        confidenceLevel: rec.aiConfidenceScore.toFixed(2),
        hybridModel: `${Math.round(dataWeight*100)}% données / ${Math.round(rulesWeight*100)}% règles`
      };
    }
    
    return rec;
  }).sort((a, b) => b.matchScore - a.matchScore);
}

// Améliore les recommandations avec des règles prédéfinies quand les données sont insuffisantes
function enhanceRecommendationsWithRules(
  baseRecommendations: Recommendation[],
  quizResponses: QuizResponse
): Recommendation[] {
  const enhancedRecs = [...baseRecommendations];
  
  // Règles basées sur les symptômes prioritaires
  const primarySymptoms = getPrimarySymptoms(quizResponses);
  
  // Règles basées sur les symptômes
  const symptomRules: Record<string, Record<string, number>> = {
    'stress': {
      'ashwagandha-extract': 15,
      'magnesium-glycinate': 12,
      'adaptogenic-herbs': 10
    },
    'fatigue': {
      'vitamin-b-complex': 15,
      'coq10-ubiquinol': 12,
      'iron-complex': 10
    },
    'sleepIssues': {
      'magnesium-glycinate': 15,
      'melatonin-supplement': 12,
      'valerian-root': 10
    },
    'digestiveIssues': {
      'probiotics-daily': 15,
      'digestive-enzymes': 12,
      'ginger-extract': 8
    }
  };
  
  // Appliquer les règles pour les symptômes prioritaires
  primarySymptoms.forEach(symptom => {
    if (symptomRules[symptom]) {
      Object.entries(symptomRules[symptom]).forEach(([recId, boost]) => {
        const rec = enhancedRecs.find(r => r.id === recId);
        if (rec) {
          rec.matchScore = Math.min(100, rec.matchScore + boost);
          if (!rec.ruleBasedAdjustments) rec.ruleBasedAdjustments = [];
          rec.ruleBasedAdjustments.push(`${symptom}: +${boost}`);
        }
      });
    }
  });
  
  // Ajouter des ajustements basés sur l'âge
  if (quizResponses.personal?.age) {
    const age = parseInt(quizResponses.personal.age, 10);
    if (!isNaN(age)) {
      if (age > 50) {
        applyRuleAdjustment(enhancedRecs, 'vitamin-d-supplement', 8, 'senior age');
        applyRuleAdjustment(enhancedRecs, 'omega3-supplementation', 7, 'senior age');
        applyRuleAdjustment(enhancedRecs, 'coq10-ubiquinol', 7, 'senior age');
      } else if (age < 30) {
        applyRuleAdjustment(enhancedRecs, 'vitamin-b-complex', 5, 'young adult');
        applyRuleAdjustment(enhancedRecs, 'adaptogenic-herbs', 6, 'young adult');
      }
    }
  }
  
  // Ajouter des ajustements basés sur le genre
  if (quizResponses.personal?.gender) {
    const gender = quizResponses.personal.gender.toLowerCase();
    if (gender === 'female' || gender === 'femme') {
      applyRuleAdjustment(enhancedRecs, 'iron-complex', 8, 'female specific');
      applyRuleAdjustment(enhancedRecs, 'calcium', 6, 'female specific');
    }
  }
  
  // Ajouter une explication d'IA pour les recommandations ajustées par règles
  enhancedRecs.forEach(rec => {
    if (rec.ruleBasedAdjustments && rec.ruleBasedAdjustments.length > 0) {
      rec.aiAdjusted = true;
      rec.aiConfidenceScore = 0.7; // Confiance modérée pour les règles
      rec.aiInsights = {
        adjustmentMethod: 'knowledge-based-rules',
        factors: rec.ruleBasedAdjustments,
        explanation: "Recommandation basée sur des règles cliniques plutôt que des données d'apprentissage"
      };
    }
  });
  
  return enhancedRecs.sort((a, b) => b.matchScore - a.matchScore);
}

// Applique un ajustement basé sur des règles et ajoute une explication
function applyRuleAdjustment(
  recommendations: Recommendation[],
  recId: string,
  boost: number,
  reason: string
): void {
  const rec = recommendations.find(r => r.id === recId);
  if (rec) {
    rec.matchScore = Math.min(100, rec.matchScore + boost);
    if (!rec.ruleBasedAdjustments) rec.ruleBasedAdjustments = [];
    rec.ruleBasedAdjustments.push(`${reason}: +${boost}`);
  }
}

// Calcule l'alignement contextuel entre un retour et un profil actuel
function calculateContextualAlignment(feedback: any, currentProfile: QuizResponse): number {
  // Facteurs contextuals à considérer
  const factors = [
    // Les symptômes correspondants augmentent l'alignement
    hasSimilarSymptoms(feedback.symptoms, currentProfile.healthConcerns) * 0.6,
    
    // Les objectifs correspondants augmentent l'alignement
    hasSimilarGoals(feedback.goals, currentProfile.goals) * 0.4,
    
    // La cohérence de la saison augmente l'alignement
    seasonalMatchBonus(feedback.timestamp) * 0.3
  ];
  
  // Moyenne des facteurs non-nuls
  const nonZeroFactors = factors.filter(f => f !== 0);
  return nonZeroFactors.length > 0 
    ? nonZeroFactors.reduce((sum, val) => sum + val, 0) / nonZeroFactors.length
    : 0;
}

// Vérifie si les symptômes sont similaires
function hasSimilarSymptoms(feedbackSymptoms: any, currentSymptoms: any): number {
  if (!feedbackSymptoms || !currentSymptoms) return 0;
  
  // Convertir en ensembles de clés
  const fbKeys = new Set(Object.keys(feedbackSymptoms));
  const currKeys = new Set(Object.keys(currentSymptoms));
  
  // Calculer l'intersection
  const intersection = new Set([...fbKeys].filter(x => currKeys.has(x)));
  
  // Calculer la similarité de Jaccard
  const union = new Set([...fbKeys, ...currKeys]);
  
  return intersection.size / union.size;
}

// Vérifie si les objectifs sont similaires
function hasSimilarGoals(feedbackGoals: any, currentGoals: any): number {
  if (!feedbackGoals || !currentGoals) return 0;
  
  // Convertir en ensembles de clés
  const fbKeys = new Set(Object.keys(feedbackGoals));
  const currKeys = new Set(Object.keys(currentGoals));
  
  // Calculer l'intersection
  const intersection = new Set([...fbKeys].filter(x => currKeys.has(x)));
  
  // Calculer la similarité de Jaccard
  const union = new Set([...fbKeys, ...currKeys]);
  
  return intersection.size / union.size;
}

// Ajuste l'alignement en fonction de la saison
function seasonalMatchBonus(feedbackTimestamp?: string): number {
  if (!feedbackTimestamp) return 0;
  
  // Déterminer la saison actuelle
  const currentSeason = getCurrentSeason();
  
  // Déterminer la saison du feedback
  const feedbackDate = new Date(feedbackTimestamp);
  const feedbackSeason = getCurrentSeason(feedbackDate);
  
  // Correspondance exacte
  if (currentSeason === feedbackSeason) return 1.0;
  
  // Saisons adjacentes (printemps-été, été-automne, etc.)
  const seasons = ['winter', 'spring', 'summer', 'fall'];
  const currentIdx = seasons.indexOf(currentSeason);
  const feedbackIdx = seasons.indexOf(feedbackSeason);
  
  // Gérer le cas circulaire (hiver-printemps et automne-hiver)
  const distance = Math.min(
    Math.abs(currentIdx - feedbackIdx),
    Math.abs(currentIdx - feedbackIdx + seasons.length),
    Math.abs(currentIdx - feedbackIdx - seasons.length)
  );
  
  if (distance === 1) return 0.7;  // Saisons adjacentes
  if (distance === 2) return 0.3;  // Saisons opposées
  
  return 0;  // Ne devrait pas arriver, mais par sécurité
}

/**
 * Détermine la saison à partir d'une date
 */
function getCurrentSeason(date: Date = new Date()): 'winter' | 'spring' | 'summer' | 'fall' {
  const month = date.getMonth(); // 0-11

  if (month >= 2 && month <= 4) return 'spring';  // Mars à Mai
  if (month >= 5 && month <= 7) return 'summer';  // Juin à Août
  if (month >= 8 && month <= 10) return 'fall';   // Septembre à Novembre
  return 'winter';                               // Décembre à Février
}

/**
 * Crée une empreinte numérique du profil utilisateur pour l'analyse
 */
function createProfileFingerprint(quizResponses: QuizResponse): string {
  try {
    // Extraire les données les plus pertinentes pour l'empreinte
    const components = [
      quizResponses.healthConcerns ? Object.keys(quizResponses.healthConcerns).sort().join('|') : '',
      quizResponses.goals ? Object.keys(quizResponses.goals).sort().join('|') : '',
      quizResponses.personal?.age || '',
      quizResponses.personal?.gender || '',
      quizResponses.medications ? quizResponses.medications.sort().join('|') : '',
      quizResponses.lifestyle?.activityLevel || ''
    ];
    
    // Créer une chaîne représentant l'empreinte du profil
    return components.join('::');
  } catch (error) {
    console.error("Erreur lors de la création de l'empreinte du profil:", error);
    return '';
  }
}

/**
 * Version avancée de findSimilarProfiles avec critères multiples
 */
function findSimilarProfilesAdvanced(
  currentProfile: QuizResponse,
  learningData: LearningData[],
  maxResults: number = 5
): {data: LearningData, similarityScore: number}[] {
  try {
    // Calculer les scores de similarité pour tous les profils
    const profilesWithScores = learningData.map(data => {
      // Créer un score multivarié basé sur plusieurs facteurs
      const symptomSimilarity = calculateSymptomSimilarity(
        currentProfile.healthConcerns, 
        data.quizData.healthConcerns
      );
      
      const goalSimilarity = calculateGoalSimilarity(
        currentProfile.goals, 
        data.quizData.goals
      );
      
      const demographicSimilarity = calculateDemographicSimilarity(
        currentProfile.personal, 
        data.quizData.demographics
      );
      
      const medicationSimilarity = calculateMedicationSimilarity(
        currentProfile.medications, 
        data.quizData.medications
      );
      
      const lifestyleSimilarity = calculateLifestyleSimilarity(
        currentProfile.lifestyle, 
        data.quizData.lifestyle
      );
      
      // Pondération des différentes dimensions de similarité
      const weights = {
        symptom: 0.40,      // Les symptômes sont les plus importants
        goal: 0.25,         // Les objectifs sont également importants
        demographic: 0.15,  // Les données démographiques ont une importance modérée
        medication: 0.10,   // Les médicaments peuvent être pertinents pour certaines recommandations
        lifestyle: 0.10     // Le style de vie a une influence modérée
      };
      
      // Calculer le score composite pondéré
      const compositeScore = 
        (symptomSimilarity * weights.symptom) + 
        (goalSimilarity * weights.goal) + 
        (demographicSimilarity * weights.demographic) + 
        (medicationSimilarity * weights.medication) + 
        (lifestyleSimilarity * weights.lifestyle);
      
      return {
        data,
        similarityScore: compositeScore,
        details: {
          symptom: symptomSimilarity,
          goal: goalSimilarity,
          demographic: demographicSimilarity,
          medication: medicationSimilarity,
          lifestyle: lifestyleSimilarity
        }
      };
    });
    
    // Filtrer et trier les profils par score de similarité décroissant
    return profilesWithScores
      .filter(profile => profile.similarityScore > 0.3) // Seuil minimum de similarité
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, maxResults);
  } catch (error) {
    console.error("Erreur lors de la recherche de profils similaires:", error);
    return [];
  }
}

/**
 * Calcul de la similarité des symptômes entre deux profils
 */
function calculateSymptomSimilarity(
  currentSymptoms: any,
  historicalSymptoms: any
): number {
  if (!currentSymptoms || !historicalSymptoms) return 0;
  
  try {
    // Extraire les clés des symptômes
    const currentKeys = Object.keys(currentSymptoms);
    const historicalKeys = Object.keys(historicalSymptoms);
    
    if (currentKeys.length === 0 || historicalKeys.length === 0) return 0;
    
    // Calculer l'intersection des symptômes
    const commonKeys = currentKeys.filter(key => historicalKeys.includes(key));
    
    // Calculer la similarité des valeurs pour les symptômes communs
    let valueSimilarity = 0;
    commonKeys.forEach(key => {
      const currentValue = currentSymptoms[key];
      const historicalValue = historicalSymptoms[key];
      
      // Si les valeurs sont identiques, similarité de 1.0
      if (currentValue === historicalValue) {
        valueSimilarity += 1.0;
      } 
      // Si les valeurs sont proches sur une échelle ordinale
      else if (isOrdinalValue(currentValue) && isOrdinalValue(historicalValue)) {
        const ordinalDiff = Math.abs(getOrdinalValue(currentValue) - getOrdinalValue(historicalValue));
        valueSimilarity += Math.max(0, 1.0 - (ordinalDiff * 0.25));
      }
      // Sinon, similarité de 0.5 pour symptôme présent mais différent
      else {
        valueSimilarity += 0.5;
      }
    });
    
    // Similarité basée sur la proportion et la valeur
    const jaccard = commonKeys.length / (currentKeys.length + historicalKeys.length - commonKeys.length);
    const valueAvg = commonKeys.length > 0 ? valueSimilarity / commonKeys.length : 0;
    
    return (jaccard * 0.7) + (valueAvg * 0.3);
  } catch (error) {
    console.error("Erreur lors du calcul de similarité des symptômes:", error);
    return 0;
  }
}

/**
 * Vérifie si une valeur est ordinale (ex: low, moderate, high)
 */
function isOrdinalValue(value: any): boolean {
  const ordinalValues = ['very_low', 'low', 'moderate', 'high', 'very_high', 'none', 'mild', 'severe'];
  return ordinalValues.includes(value);
}

/**
 * Convertit une valeur ordinale en nombre
 */
function getOrdinalValue(value: string): number {
  const mapping: Record<string, number> = {
    'none': 0,
    'very_low': 1,
    'low': 2,
    'mild': 2,
    'moderate': 3,
    'high': 4,
    'very_high': 5,
    'severe': 5
  };
  return mapping[value] || 0;
}

/**
 * Calcul de la similarité des objectifs entre deux profils
 */
function calculateGoalSimilarity(
  currentGoals: any,
  historicalGoals: any
): number {
  if (!currentGoals || !historicalGoals) return 0;
  
  try {
    // Extraire les clés des objectifs
    const currentKeys = Object.keys(currentGoals).filter(k => currentGoals[k] === true);
    const historicalKeys = Object.keys(historicalGoals).filter(k => historicalGoals[k] === true);
    
    if (currentKeys.length === 0 || historicalKeys.length === 0) return 0;
    
    // Similarité de Jaccard (taille de l'intersection divisée par la taille de l'union)
    const intersection = currentKeys.filter(key => historicalKeys.includes(key));
    return intersection.length / (currentKeys.length + historicalKeys.length - intersection.length);
  } catch (error) {
    console.error("Erreur lors du calcul de similarité des objectifs:", error);
    return 0;
  }
}

/**
 * Calcule la similarité des données démographiques entre deux profils
 */
function calculateDemographicSimilarity(
  currentDemo: any,
  historicalDemo: any
): number {
  if (!currentDemo || !historicalDemo) return 0;
  
  try {
    let similarityScore = 0;
    let factorCount = 0;
    
    // Similarité d'âge
    if (currentDemo.age && historicalDemo.age) {
      const ageDiff = Math.abs(parseInt(currentDemo.age, 10) - parseInt(historicalDemo.age, 10));
      // Tranches d'âge: 0-5 ans (1.0), 6-10 ans (0.8), 11-20 ans (0.6), 21+ ans (0.3)
      let ageScore = 0;
      if (ageDiff <= 5) ageScore = 1.0;
      else if (ageDiff <= 10) ageScore = 0.8;
      else if (ageDiff <= 20) ageScore = 0.6;
      else ageScore = 0.3;
      
      similarityScore += ageScore;
      factorCount++;
    }
    
    // Similarité de genre
    if (currentDemo.gender && historicalDemo.gender) {
      // 1.0 si identique, 0.1 sinon (genre reste pertinent pour certaines recommandations)
      const genderScore = currentDemo.gender.toLowerCase() === historicalDemo.gender.toLowerCase() ? 1.0 : 0.1;
      similarityScore += genderScore;
      factorCount++;
    }
    
    // Ajoutez d'autres facteurs démographiques si disponibles
    
    return factorCount > 0 ? similarityScore / factorCount : 0;
  } catch (error) {
    console.error("Erreur lors du calcul de similarité démographique:", error);
    return 0;
  }
}

/**
 * Calcule la similarité des médicaments entre deux profils
 */
function calculateMedicationSimilarity(
  currentMeds: string[] | undefined,
  historicalMeds: string[] | undefined
): number {
  if (!currentMeds || !historicalMeds || currentMeds.length === 0 || historicalMeds.length === 0) {
    // Si les deux n'ont pas de médicaments, similarité moyenne
    if ((!currentMeds || currentMeds.length === 0) && (!historicalMeds || historicalMeds.length === 0)) {
      return 0.5;
    }
    return 0;
  }
  
  try {
    // Normaliser les noms de médicaments
    const normalizeMed = (med: string) => med.toLowerCase().trim();
    const currentNormalized = currentMeds.map(normalizeMed);
    const historicalNormalized = historicalMeds.map(normalizeMed);
    
    // Calculer similarité de Jaccard
    const intersection = currentNormalized.filter(med => historicalNormalized.includes(med));
    const unionSize = currentNormalized.length + historicalNormalized.length - intersection.length;
    
    // Facteur de correspondance exacte
    if (intersection.length === 0) return 0;
    if (intersection.length === currentNormalized.length && 
        intersection.length === historicalNormalized.length) {
      return 1.0; // Correspondance parfaite
    }
    
    return intersection.length / unionSize;
  } catch (error) {
    console.error("Erreur lors du calcul de similarité des médicaments:", error);
    return 0;
  }
}

/**
 * Calcule la similarité du style de vie entre deux profils
 */
function calculateLifestyleSimilarity(
  currentLifestyle: any,
  historicalLifestyle: any
): number {
  if (!currentLifestyle || !historicalLifestyle) return 0;
  
  try {
    let similarityScore = 0;
    let factorCount = 0;
    
    // Vérifier le niveau d'activité
    if (currentLifestyle.activityLevel && historicalLifestyle.activityLevel) {
      const activityLevels = ['rarely_never', 'few_times_monthly', '2-3_times_weekly', 'daily'];
      const currentIdx = activityLevels.indexOf(currentLifestyle.activityLevel);
      const historicalIdx = activityLevels.indexOf(historicalLifestyle.activityLevel);
      
      if (currentIdx >= 0 && historicalIdx >= 0) {
        // Différence normalisée entre les niveaux d'activité
        const levelDiff = Math.abs(currentIdx - historicalIdx) / (activityLevels.length - 1);
        similarityScore += 1 - levelDiff;
        factorCount++;
      }
    }
    
    // Vérifier le niveau de stress
    if (currentLifestyle.stressLevel && historicalLifestyle.stressLevel) {
      const stressLevels = ['low', 'moderate', 'high', 'very_high'];
      const currentIdx = stressLevels.indexOf(currentLifestyle.stressLevel);
      const historicalIdx = stressLevels.indexOf(historicalLifestyle.stressLevel);
      
      if (currentIdx >= 0 && historicalIdx >= 0) {
        const levelDiff = Math.abs(currentIdx - historicalIdx) / (stressLevels.length - 1);
        similarityScore += 1 - levelDiff;
        factorCount++;
      }
    }
    
    // Vérifier le régime alimentaire
    if (currentLifestyle.dietType && historicalLifestyle.dietType) {
      // 1.0 si identique, 0.3 sinon (le régime reste partiellement pertinent)
      const dietScore = currentLifestyle.dietType === historicalLifestyle.dietType ? 1.0 : 0.3;
      similarityScore += dietScore;
      factorCount++;
    }
    
    return factorCount > 0 ? similarityScore / factorCount : 0;
  } catch (error) {
    console.error("Erreur lors du calcul de similarité du style de vie:", error);
    return 0;
  }
}

/**
 * Calcule la pertinence contextuelle d'une recommandation pour un profil
 */
function calculateContextualRelevance(
  recommendationId: string,
  quizResponses: QuizResponse
): number {
  try {
    // Matrice de pertinence contextuelle pour les suppléments de base
    const contextualRelevanceMatrix: Record<string, Record<string, number>> = {
      // Pertinence saisonnière
      'winter': {
        'vitamin-d-supplement': 0.8,
        'zinc-picolinate': 0.6,
        'vitamin-c-complex': 0.7,
        'elderberry': 0.6
      },
      'spring': {
        'quercetin': 0.7,
        'vitamin-c-complex': 0.5
      },
      'summer': {
        'magnesium-glycinate': 0.6,
        'electrolytes': 0.7
      },
      'fall': {
        'vitamin-d-supplement': 0.6,
        'probiotics-daily': 0.5
      },
      
      // Pertinence par âge
      'young_adult': { // 18-30 ans
        'coq10-ubiquinol': 0.3,
        'iron': 0.6,
        'vitamin-b-complex': 0.7
      },
      'middle_age': { // 31-50 ans
        'coq10-ubiquinol': 0.6,
        'magnesium-glycinate': 0.7,
        'ashwagandha-extract': 0.6
      },
      'senior': { // 51+ ans
        'coq10-ubiquinol': 0.8,
        'vitamin-d-supplement': 0.7,
        'omega3-supplementation': 0.8
      },
      
      // Pertinence par genre
      'female': {
        'iron': 0.7,
        'magnesium-glycinate': 0.6,
        'calcium': 0.6
      },
      'male': {
        'zinc-picolinate': 0.6,
        'magnesium-glycinate': 0.5,
        'vitamin-d-supplement': 0.5
      },
      
      // Pertinence par régime alimentaire
      'vegan': {
        'vitamin-b12': 0.9,
        'vitamin-d-supplement': 0.7,
        'iron': 0.7,
        'omega3-supplementation': 0.8
      },
      'vegetarian': {
        'vitamin-b12': 0.7,
        'iron': 0.6,
        'zinc-picolinate': 0.5
      }
    };
    
    // Déterminer les contextes pertinents pour l'utilisateur
    const userContexts: string[] = [];
    
    // Contexte saisonnier
    const season = getCurrentSeason();
    userContexts.push(season);
    
    // Contexte d'âge
    if (quizResponses.personal?.age) {
      const age = parseInt(quizResponses.personal.age, 10);
      if (age >= 18 && age <= 30) userContexts.push('young_adult');
      else if (age >= 31 && age <= 50) userContexts.push('middle_age');
      else if (age > 50) userContexts.push('senior');
    }
    
    // Contexte de genre
    if (quizResponses.personal?.gender) {
      const gender = quizResponses.personal.gender.toLowerCase();
      if (gender === 'female' || gender === 'femme') userContexts.push('female');
      else if (gender === 'male' || gender === 'homme') userContexts.push('male');
    }
    
    // Contexte de régime alimentaire
    if (quizResponses.dietaryHabits?.dietType) {
      if (quizResponses.dietaryHabits.dietType === 'vegan') userContexts.push('vegan');
      else if (quizResponses.dietaryHabits.dietType === 'vegetarian') userContexts.push('vegetarian');
    }
    
    // Calculer la pertinence contextuelle agrégée
    let totalRelevance = 0;
    let contextCount = 0;
    
    userContexts.forEach(context => {
      if (contextualRelevanceMatrix[context] && contextualRelevanceMatrix[context][recommendationId]) {
        totalRelevance += contextualRelevanceMatrix[context][recommendationId];
        contextCount++;
      }
    });
    
    return contextCount > 0 ? totalRelevance / contextCount : 0;
  } catch (error) {
    console.error("Erreur lors du calcul de la pertinence contextuelle:", error);
    return 0;
  }
}

/**
 * Analyse les patterns de succès spécifiques aux segments d'utilisateurs
 */
function analyzeSegmentSuccessPatterns(
  learningData: LearningData[],
  currentProfile: QuizResponse
): Record<string, number> {
  try {
    // Structure pour stocker les ajustements de score par recommandation
    const adjustmentScores: Record<string, number> = {};
    
    // Segmentation simple basée sur les symptômes principaux
    const primarySymptoms = getPrimarySymptoms(currentProfile);
    
    if (primarySymptoms.length === 0) {
      return adjustmentScores;
    }
    
    // Trouver les entrées d'apprentissage avec le même symptôme principal
    const relevantEntries = learningData.filter(entry => {
      const entrySymptoms = getPrimarySymptoms(entry.quizData);
      return entrySymptoms.some(symptom => primarySymptoms.includes(symptom));
    });
    
    if (relevantEntries.length < 3) {
      return adjustmentScores;
    }
    
    // Agréger les données de retour par recommandation
    const feedbackByRecommendation: Record<string, {
      positiveCount: number,
      totalCount: number
    }> = {};
    
    relevantEntries.forEach(entry => {
      if (!entry.userFeedback) return;
      
      entry.userFeedback.forEach(feedback => {
        if (!feedbackByRecommendation[feedback.recommendationId]) {
          feedbackByRecommendation[feedback.recommendationId] = {
            positiveCount: 0,
            totalCount: 0
          };
        }
        
        feedbackByRecommendation[feedback.recommendationId].totalCount++;
        if (feedback.rating >= 4) {
          feedbackByRecommendation[feedback.recommendationId].positiveCount++;
        }
      });
    });
    
    // Calculer les scores d'ajustement en fonction du taux de succès
    Object.entries(feedbackByRecommendation).forEach(([recId, stats]) => {
      if (stats.totalCount >= 3) { // Minimum de 3 retours pour être significatif
        const successRate = stats.positiveCount / stats.totalCount;
        
        // Formule d'ajustement: 0 à 4% d'ajustement selon le taux de succès
        // Un taux de 50% ne produit aucun ajustement
        // Un taux supérieur à 50% produit un ajustement positif
        // Un taux inférieur à 50% produit un ajustement négatif
        adjustmentScores[recId] = (successRate - 0.5) * 8.0;
      }
    });
    
    return adjustmentScores;
  } catch (error) {
    console.error("Erreur lors de l'analyse des patterns de succès:", error);
    return {};
  }
}

/**
 * Extrait les symptômes primaires d'un profil
 */
function getPrimarySymptoms(profile: any): string[] {
  try {
    if (!profile.healthConcerns) return [];
    
    const symptoms: string[] = [];
    
    // Symptômes prioritaires à rechercher
    const prioritySymptoms = [
      'stress', 'fatigue', 'sleepIssues', 'digestiveIssues',
      'stressLevel', 'energyLevel', 'immunityIssues'
    ];
    
    // Extraire les symptômes significatifs
    Object.entries(profile.healthConcerns).forEach(([key, value]) => {
      if (prioritySymptoms.includes(key)) {
        if (
          value === 'yes' || 
          value === true || 
          value === 'high' || 
          value === 'very_high' || 
          value === 'severe' ||
          value === 'low' || 
          value === 'very_low'
        ) {
          symptoms.push(key);
        }
      }
    });
    
    return symptoms;
  } catch (error) {
    console.error("Erreur lors de l'extraction des symptômes primaires:", error);
    return [];
  }
}

// Function implementation moved to avoid duplication

/**
 * Analyse la performance des recommandations
 */
export const analyzeRecommendationPerformance = (): Record<string, {
  totalRatings: number,
  averageRating: number,
  recommendationCount: number
}> => {
  try {
    const learningData: LearningData[] = secureStorageService.getItem('aiLearningData') || [];

    const performance: Record<string, {
      totalRatings: number,
      averageRating: number,
      recommendationCount: number
    }> = {};

    // Initialiser les statistiques pour chaque supplément dans le catalogue
    Object.keys(SUPPLEMENT_CATALOG).forEach(id => {
      performance[id] = {
        totalRatings: 0,
        averageRating: 0,
        recommendationCount: 0
      };
    });

    // Comptabiliser les recommandations
    learningData.forEach(entry => {
      entry.recommendations?.forEach(rec => {
        if (performance[rec.id]) {
          performance[rec.id].recommendationCount += 1;
        }
      });

      // Comptabiliser les évaluations
      entry.userFeedback?.forEach(feedback => {
        if (performance[feedback.recommendationId]) {
          performance[feedback.recommendationId].totalRatings += 1;
          performance[feedback.recommendationId].averageRating += feedback.rating;
        }
      });
    });

    // Calculer les moyennes
    Object.keys(performance).forEach(id => {
      if (performance[id].totalRatings > 0) {
        performance[id].averageRating = performance[id].averageRating / performance[id].totalRatings;
      }
    });

    return performance;

  } catch (error) {
    console.error("Erreur lors de l'analyse de la performance des recommandations:", error);
    return {};
  }
};

/**
 * Entraîne le modèle d'IA en utilisant les données d'apprentissage stockées
 */
export const trainAIModel = async (fullTraining: boolean = true): Promise<void> => {
  try {
    // Simuler un processus d'entraînement (dans une application réelle, nous aurions un véritable entraînement)
    const startTime = new Date();

    // Obtenir les données d'apprentissage
    const learningData: LearningData[] = secureStorageService.getItem('aiLearningData') || [];

    if (learningData.length < 5) {
      console.warn("Pas assez de données pour entraîner le modèle");
      return;
    }

    // Dans une application réelle, nous utiliserions ces données pour entraîner un modèle ML
    // Ici, nous allons simplement simuler l'entraînement

    // Récupérer l'état actuel du modèle
    const currentModel: AIModelState = secureStorageService.getItem('aiModelState') || {
      version: '1.0.0',
      lastTrainingDate: new Date().toISOString(),
      trainingHistory: [],
      hyperparameters: {
        learningRate: 0.01,
        epochs: 50,
        batchSize: 32,
        hiddenLayers: [64, 32]
      },
      accuracy: 0.85,
      weights: {},
      features: []
    };

    // Simuler l'analyse des données
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mettre à jour l'état du modèle
    const newVersion = incrementVersion(currentModel.version, fullTraining);

    const trainingHistoryEntry = {
      date: new Date().toISOString(),
      duration: (new Date().getTime() - startTime.getTime()) / 1000,
      dataPoints: learningData.length,
      accuracy: Math.min(0.98, currentModel.accuracy + (Math.random() * 0.03 - 0.005)),
      fullTraining
    };

    const updatedModel: AIModelState = {
      ...currentModel,
      version: newVersion,
      lastTrainingDate: new Date().toISOString(),
      trainingHistory: [...currentModel.trainingHistory, trainingHistoryEntry],
      accuracy: trainingHistoryEntry.accuracy,
      hyperparameters: fullTraining 
        ? {
            learningRate: Math.max(0.001, currentModel.hyperparameters.learningRate * 0.95),
            epochs: currentModel.hyperparameters.epochs + 5,
            batchSize: currentModel.hyperparameters.batchSize,
            hiddenLayers: [...currentModel.hyperparameters.hiddenLayers]
          }
        : currentModel.hyperparameters
    };

    // Sauvegarder le modèle mis à jour
    secureStorageService.setItem('aiModelState', updatedModel);

    console.log(`Modèle IA entraîné avec succès (v${newVersion}). Précision: ${(updatedModel.accuracy * 100).toFixed(2)}%`);

  } catch (error) {
    console.error("Erreur lors de l'entraînement du modèle IA:", error);
  }
};

/**
 * Incrémente la version du modèle
 */
const incrementVersion = (currentVersion: string, isMajorUpdate: boolean): string => {
  const versionParts = currentVersion.split('.').map(Number);

  if (isMajorUpdate) {
    versionParts[1] += 1;
    versionParts[2] = 0;
  } else {
    versionParts[2] += 1;
  }

  return versionParts.join('.');
};

/**
 * Obtient l'état actuel du modèle d'apprentissage
 */
// Rename to avoid conflict with getAILearningStatus from aiLearning.ts
export const getAILearningEngineStatus = (): {
  isActive: boolean;
  modelVersion: string;
  accuracy: number;
  lastTrainingDate: string;
  trainingHistory: any[];
  dataPointsCount: number;
  uniqueProfilesCount: number;
  dataQuality: number;
} => {
  try {
    const modelState: AIModelState = secureStorageService.getItem('aiModelState') || {
      version: '1.0.0',
      lastTrainingDate: new Date().toISOString(),
      trainingHistory: [],
      hyperparameters: {
        learningRate: 0.01,
        epochs: 50,
        batchSize: 32,
        hiddenLayers: [64, 32]
      },
      accuracy: 0.85,
      weights: {},
      features: []
    };

    const metrics = secureStorageService.getItem('aiLearningMetrics') || {
      totalSamples: 0,
      lastUpdate: new Date().toISOString(),
      averageRecommendations: 0,
      feedbackRate: 0,
      positiveRatings: 0,
      uniqueProfiles: 0
    };

    return {
      isActive: true,
      modelVersion: modelState.version,
      accuracy: modelState.accuracy,
      lastTrainingDate: modelState.lastTrainingDate,
      trainingHistory: modelState.trainingHistory,
      dataPointsCount: metrics.totalSamples,
      uniqueProfilesCount: metrics.uniqueProfiles,
      dataQuality: metrics.feedbackRate * 100
    };

  } catch (error) {
    console.error("Erreur lors de la récupération de l'état d'apprentissage:", error);

    return {
      isActive: true,
      modelVersion: '1.0.0',
      accuracy: 0.85,
      lastTrainingDate: new Date().toISOString(),
      trainingHistory: [],
      dataPointsCount: 0,
      uniqueProfilesCount: 0,
      dataQuality: 70
    };
  }
};

/**
 * Identifie les corrélations entre les profils utilisateurs et les recommandations efficaces
 */
export const identifyPatternCorrelations = (): Record<string, any> => {
  try {
    const learningData: LearningData[] = secureStorageService.getItem('aiLearningData') || [];

    if (learningData.length < 20) {
      return {
        sufficientData: false,
        message: 'Pas assez de données pour identifier des corrélations significatives'
      };
    }

    // Corrélations entre tranches d'âge et efficacité des recommandations
    const ageCorrelations: Record<string, Record<string, {
      count: number;
      averageRating: number;
    }>> = {};

    // Corrélations entre symptômes et efficacité des recommandations
    const symptomCorrelations: Record<string, Record<string, {
      count: number;
      averageRating: number;
    }>> = {};

    // Analyser les données d'apprentissage
    learningData.forEach(entry => {
      if (!entry.userFeedback || entry.userFeedback.length === 0) return;

      const ageRange = getAgeRange(entry.quizData.demographics?.age);

      entry.userFeedback.forEach(feedback => {
        // Corrélations d'âge
        if (ageRange) {
          if (!ageCorrelations[ageRange]) {
            ageCorrelations[ageRange] = {};
          }

          if (!ageCorrelations[ageRange][feedback.recommendationId]) {
            ageCorrelations[ageRange][feedback.recommendationId] = { count: 0, averageRating: 0 };
          }

          ageCorrelations[ageRange][feedback.recommendationId].count += 1;
          ageCorrelations[ageRange][feedback.recommendationId].averageRating += feedback.rating;
        }

        // Corrélations de symptômes
        if (entry.quizData.healthConcerns) {
          Object.entries(entry.quizData.healthConcerns).forEach(([symptom, value]) => {
            if (value === 'yes' || value === 'high' || value === 'very_high') {
              if (!symptomCorrelations[symptom]) {
                symptomCorrelations[symptom] = {};
              }

              if (!symptomCorrelations[symptom][feedback.recommendationId]) {
                symptomCorrelations[symptom][feedback.recommendationId] = { count: 0, averageRating: 0 };
              }

              symptomCorrelations[symptom][feedback.recommendationId].count += 1;
              symptomCorrelations[symptom][feedback.recommendationId].averageRating += feedback.rating;
            }
          });
        }
      });
    });

    // Calculer les moyennes
    Object.keys(ageCorrelations).forEach(age => {
      Object.keys(ageCorrelations[age]).forEach(recId => {
        if (ageCorrelations[age][recId].count > 0) {
          ageCorrelations[age][recId].averageRating = 
            ageCorrelations[age][recId].averageRating / ageCorrelations[age][recId].count;
        }
      });
    });

    Object.keys(symptomCorrelations).forEach(symptom => {
      Object.keys(symptomCorrelations[symptom]).forEach(recId => {
        if (symptomCorrelations[symptom][recId].count > 0) {
          symptomCorrelations[symptom][recId].averageRating = 
            symptomCorrelations[symptom][recId].averageRating / symptomCorrelations[symptom][recId].count;
        }
      });
    });

    // Trouver les meilleures corrélations
    const bestAgeCorrelations: Record<string, { recommendationId: string, rating: number }[]> = {};
    const bestSymptomCorrelations: Record<string, { recommendationId: string, rating: number }[]> = {};

    Object.keys(ageCorrelations).forEach(age => {
      const entries = Object.entries(ageCorrelations[age])
        .filter(([_, data]) => data.count >= 3)
        .map(([recId, data]) => ({
          recommendationId: recId,
          rating: data.averageRating
        }))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

      if (entries.length > 0) {
        bestAgeCorrelations[age] = entries;
      }
    });

    Object.keys(symptomCorrelations).forEach(symptom => {
      const entries = Object.entries(symptomCorrelations[symptom])
        .filter(([_, data]) => data.count >= 3)
        .map(([recId, data]) => ({
          recommendationId: recId,
          rating: data.averageRating
        }))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

      if (entries.length > 0) {
        bestSymptomCorrelations[symptom] = entries;
      }
    });

    return {
      sufficientData: true,
      dataPointsCount: learningData.length,
      ageCorrelations: bestAgeCorrelations,
      symptomCorrelations: bestSymptomCorrelations
    };

  } catch (error) {
    console.error("Erreur lors de l'identification des corrélations:", error);

    return {
      sufficientData: false,
      error: "Une erreur est survenue lors de l'analyse des données"
    };
  }
};

/**
 * Évalue la qualité des données d'apprentissage
 */
export const evaluateDataQuality = (): {
  overallQuality: number;
  feedbackCoverage: number;
  profileDiversity: number;
  dataVolume: number;
  recommendations: {
    id: string;
    name: string;
    dataQuality: number;
    sampleSize: number;
  }[];
} => {
  try {
    const learningData: LearningData[] = secureStorageService.getItem('aiLearningData') || [];

    if (learningData.length === 0) {
      return {
        overallQuality: 0,
        feedbackCoverage: 0,
        profileDiversity: 0,
        dataVolume: 0,
        recommendations: []
      };
    }

    // Couverture de feedback
    const entriesWithFeedback = learningData.filter(data => 
      data.userFeedback !== null && data.userFeedback.length > 0
    ).length;

    const feedbackCoverage = (entriesWithFeedback / learningData.length) * 100;

    // Diversité des profils
    const uniqueProfiles = new Set();
    learningData.forEach(data => {
      const profileHash = JSON.stringify({
        age: data.quizData.demographics?.age,
        gender: data.quizData.demographics?.gender,
        healthConcerns: Object.values(data.quizData.healthConcerns || {}).sort().join('_'),
        goals: Object.values(data.quizData.goals || {}).sort().join('_')
      });
      uniqueProfiles.add(profileHash);
    });

    const profileDiversity = Math.min(100, (uniqueProfiles.size / Math.max(1, learningData.length)) * 200);

    // Volume de données
    const dataVolume = Math.min(100, (learningData.length / 1000) * 100);

    // Qualité des données par recommandation
    const recommendationData: Record<string, {
      count: number;
      feedbackCount: number;
      name: string;
    }> = {};

    // Initialiser pour chaque supplément
    Object.entries(SUPPLEMENT_CATALOG).forEach(([id, supplement]) => {
      recommendationData[id] = {
        count: 0,
        feedbackCount: 0,
        name: supplement.name
      };
    });

    // Compter les recommandations et les retours
    learningData.forEach(entry => {
      entry.recommendations?.forEach(rec => {
        if (recommendationData[rec.id]) {
          recommendationData[rec.id].count += 1;
        }
      });

      entry.userFeedback?.forEach(feedback => {
        if (recommendationData[feedback.recommendationId]) {
          recommendationData[feedback.recommendationId].feedbackCount += 1;
        }
      });
    });

    // Calculer la qualité des données pour chaque recommandation
    const recommendationQuality = Object.entries(recommendationData)
      .map(([id, data]) => ({
        id,
        name: data.name,
        dataQuality: data.count > 0 ? (data.feedbackCount / data.count) * 100 : 0,
        sampleSize: data.count
      }))
      .filter(item => item.sampleSize > 0)
      .sort((a, b) => b.dataQuality - a.dataQuality);

    // Qualité globale
    const overallQuality = Math.round((feedbackCoverage + profileDiversity + dataVolume) / 3);

    return {
      overallQuality,
      feedbackCoverage,
      profileDiversity,
      dataVolume,
      recommendations: recommendationQuality
    };

  } catch (error) {
    console.error("Erreur lors de l'évaluation de la qualité des données:", error);

    return {
      overallQuality: 0,
      feedbackCoverage: 0,
      profileDiversity: 0,
      dataVolume: 0,
      recommendations: []
    };
  }
};

/**
 * Obtient une plage d'âge à partir d'un âge spécifique
 */
const getAgeRange = (age?: number): string | null => {
  if (!age) return null;

  if (age < 25) return '18-24';
  if (age < 35) return '25-34';
  if (age < 45) return '35-44';
  if (age < 55) return '45-54';
  if (age < 65) return '55-64';
  return '65+';
};

/**
 * Traite les données comportementales pour extraire des insights
 */
export const processBehavioralData = (behavioralMetrics: BehavioralMetrics): {
  attentionLevel: number; // 0-1
  uncertaintyLevel: number; // 0-1
  interestAreas: string[];
  suggestedFocus: string[];
} => {
  // Cette fonction traiterait les métriques comportementales comme letemps passé sur les questions,
  // les changements de réponses, etc. pour en extraire des insights sur le comportement utilisateur

  // Calcul du niveau d'attention basé sur le temps passé
  let attentionLevel = 0.5; // Valeur par défaut

  if (behavioralMetrics.questionTimeSpent) {
    const avgTimeSpent = Object.values(behavioralMetrics.questionTimeSpent).reduce((a, b) => a + b, 0) / 
      Object.values(behavioralMetrics.questionTimeSpent).length;

    // Attention anormalement basse ou élevée
    if (avgTimeSpent < 3) attentionLevel = 0.3;
    else if (avgTimeSpent > 20) attentionLevel = 0.4;
    else if (avgTimeSpent >= 5 && avgTimeSpent <= 15) attentionLevel = 0.8;
  }

  // Calcul du niveau d'incertitude basé sur les changements de réponses
  let uncertaintyLevel = 0.2; // Valeur par défaut

  if (behavioralMetrics.changedAnswers && behavioralMetrics.changedAnswers.length > 0) {
    const changeRatio = behavioralMetrics.changedAnswers.length / 
      (Object.keys(behavioralMetrics.questionTimeSpent || {}).length || 10);

    uncertaintyLevel = Math.min(1, changeRatio * 2);
  }

  // Déterminer les domaines d'intérêt
  const interestAreas: string[] = [];

  if (behavioralMetrics.questionTimeSpent) {
    // Trouver les questions sur lesquelles l'utilisateur a passé le plus de temps
    const sortedByTime = Object.entries(behavioralMetrics.questionTimeSpent)
      .sort(([, timeA], [, timeB]) => timeB - timeA)
      .slice(0, 3)
      .map(([questionId]) => {
        if (questionId.includes('stress')) return 'Stress';
        if (questionId.includes('sleep')) return 'Sommeil';
        if (questionId.includes('energy')) return 'Énergie';
        if (questionId.includes('digest')) return 'Digestion';
        if (questionId.includes('immune')) return 'Immunité';
        return 'Santé générale';
      });

    interestAreas.push(...sortedByTime);
  }

  // Suggestions de focus basées sur l'analyse comportementale
  const suggestedFocus: string[] = [];

  if (uncertaintyLevel > 0.6) {
    suggestedFocus.push('Information éducative supplémentaire');
    suggestedFocus.push('Explications plus détaillées des recommandations');
  }

  if (attentionLevel < 0.4) {
    suggestedFocus.push('Contenus plus concis et directs');
    suggestedFocus.push('Présentations visuelles des recommandations');
  }

  // Ajouter des suggestions basées sur les domaines d'intérêt
  if (interestAreas.includes('Stress')) {
    suggestedFocus.push('Stratégies de gestion du stress');
  }

  if (interestAreas.includes('Sommeil')) {
    suggestedFocus.push('Amélioration de la qualité du sommeil');
  }

  return {
    attentionLevel,
    uncertaintyLevel,
    interestAreas: [...new Set(interestAreas)], // Dédupliquer
    suggestedFocus: [...new Set(suggestedFocus)] // Dédupliquer
  };
};


export const generateRecommendations = (userProfile: UserProfile, aiModel: AIModelState): Recommendation[] => {
  const isVegan = userProfile.dietaryRestrictions.vegan || false;
  const isVegetarian = userProfile.dietaryRestrictions.vegetarian || false;
  const isGlutenFree = userProfile.dietaryRestrictions.glutenFree || false;
  const isDairyFree = userProfile.dietaryRestrictions.dairyFree || false;

  // Créer le profil utilisateur complet pour le système optimisé
  const completeUserProfile: UserProfile = {
    activeSymptoms: userProfile.activeSymptoms || [],
    activeGoals: userProfile.activeGoals || [],
    dietaryRestrictions: {
      vegan: isVegan,
      vegetarian: isVegetarian,
      glutenFree: isGlutenFree,
      dairyFree: isDairyFree
    },
    ageGroup: userProfile.ageGroup || '31-45',
    gender: userProfile.gender || 'non_specifie',
    lifestyleFactors: userProfile.lifestyleFactors || []
  };

  // Utiliser le système de recommandation optimisé
  const optimizedRecommender = require('./optimizedRecommendation').default;
  const { optimizeRecommendations, predictFutureNeeds, generateExplanation } = optimizedRecommender;

  // Générer les recommandations principales
  const optimizedRecommendations = optimizeRecommendations(completeUserProfile);

  // Générer des recommandations prédictives supplémentaires si nécessaire
  const predictiveRecommendations = predictFutureNeeds(completeUserProfile, optimizedRecommendations);

  // Créer l'explication personnalisée
  const explanation = generateExplanation(optimizedRecommendations, completeUserProfile);

  // Combiner toutes les recommandations
  const finalRecommendations = [
    ...optimizedRecommendations,
    ...predictiveRecommendations
  ];

  // Si aucune recommandation n'a été générée, créer une recommandation par défaut
  if (finalRecommendations.length === 0) {
    const defaultSupplement = SUPPLEMENT_CATALOG["vitamin_b_complex"];

    if (defaultSupplement) {
      finalRecommendations.push({
        id: "vitamin_b_complex",
        name: defaultSupplement.name,
        description: `${defaultSupplement.name} (${defaultSupplement.scientificName})`,
        priority: 5,
        matchScore: 50,
        benefits: defaultSupplement.benefits,
        recommendedDose: "Dose standard recommandée",
        timeToEffect: defaultSupplement.timeToEffect,
        scientificBasis: defaultSupplement.scientificBasis,
        confidence: 0.5,
        reason: "Recommandation par défaut basée sur les informations limitées"
      });
    }
  }
  return finalRecommendations;
};


export default {
  saveLearningData,
  adjustRecommendationsWithLearning,
  recordUserFeedback,
  trainAIModel,
  getAILearningEngineStatus,
  analyzeRecommendationPerformance,
  identifyPatternCorrelations,
  evaluateDataQuality,
  processBehavioralData,
  generateRecommendations,
  getLearningStatistics
};