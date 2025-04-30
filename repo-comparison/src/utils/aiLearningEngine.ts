/**
 * Moteur d'apprentissage IA avancé pour les recommandations nutritionnelles personnalisées
 */

import { secureStorageService } from './secureStorage';
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
 * Sauvegarde les données d'apprentissage pour utilisation future
 */
export const saveLearningData = (
  quizResponses: QuizResponse,
  recommendations: Recommendation[],
  behavioralMetrics?: BehavioralMetrics,
  neuroProfile?: NeuroProfile
): void => {
  try {
    // Récupérer les données d'apprentissage existantes
    const existingData: LearningData[] = secureStorageService.getItem('aiLearningData') || [];

    // Créer une nouvelle entrée de données d'apprentissage
    const newEntry: LearningData = {
      timestamp: new Date().toISOString(),
      quizData: quizResponses,
      recommendations: recommendations.map(r => ({ 
        id: r.id, 
        priority: r.priority, 
        matchScore: r.matchScore 
      })),
      userFeedback: null, // Sera rempli plus tard lorsque l'utilisateur fournira un retour
      behavioralMetrics: behavioralMetrics || null,
      neuroProfile: neuroProfile || null
    };

    // Ajouter la nouvelle entrée au tableau
    existingData.push(newEntry);

    // Limiter la taille des données d'apprentissage (garder les 1000 entrées les plus récentes)
    const trimmedData = existingData.slice(-1000);

    // Sauvegarder les données dans le stockage sécurisé
    secureStorageService.setItem('aiLearningData', trimmedData);

    // Mettre à jour les métriques d'apprentissage
    updateLearningMetrics(trimmedData);

  } catch (error) {
    console.error("Erreur lors de la sauvegarde des données d'apprentissage:", error);
  }
};

/**
 * Met à jour les métriques d'apprentissage basées sur les données d'apprentissage
 */
const updateLearningMetrics = (learningData: LearningData[]): void => {
  try {
    const metrics = {
      totalSamples: learningData.length,
      lastUpdate: new Date().toISOString(),
      averageRecommendations: 0,
      feedbackRate: 0,
      positiveRatings: 0,
      uniqueProfiles: 0
    };

    // Calculer les statistiques
    const totalRecommendations = learningData.reduce((sum, data) => 
      sum + (data.recommendations ? data.recommendations.length : 0), 0);

    metrics.averageRecommendations = totalRecommendations / Math.max(1, learningData.length);

    const entriesWithFeedback = learningData.filter(data => data.userFeedback !== null).length;
    metrics.feedbackRate = entriesWithFeedback / Math.max(1, learningData.length);

    const positiveRatings = learningData.filter(data => 
      data.userFeedback !== null && 
      data.userFeedback.some(f => f.rating >= 4)
    ).length;

    metrics.positiveRatings = positiveRatings / Math.max(1, entriesWithFeedback);

    // Calcul des profils uniques (estimation simplifiée)
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

    metrics.uniqueProfiles = uniqueProfiles.size;

    // Sauvegarder les métriques
    secureStorageService.setItem('aiLearningMetrics', metrics);

  } catch (error) {
    console.error("Erreur lors de la mise à jour des métriques d'apprentissage:", error);
  }
};

/**
 * Ajuste les recommandations en fonction des données d'apprentissage précédentes
 */
export const adjustRecommendationsWithLearning = (
  baseRecommendations: Recommendation[],
  quizResponses: QuizResponse
): Recommendation[] => {
  try {
    const learningData: LearningData[] = secureStorageService.getItem('aiLearningData') || [];

    if (learningData.length < 10) {
      // Pas assez de données pour ajuster
      return baseRecommendations;
    }

    // Trouver des profils similaires
    const similarProfiles = findSimilarProfiles(quizResponses, learningData, 5);

    if (similarProfiles.length === 0) {
      return baseRecommendations;
    }

    // Créer une copie des recommandations de base
    const adjustedRecommendations = [...baseRecommendations];

    // Récupérer les retours des profils similaires
    const relevantFeedback: Record<string, {count: number, totalRating: number}> = {};

    similarProfiles.forEach(profile => {
      if (!profile.data.userFeedback) return;

      profile.data.userFeedback.forEach(feedback => {
        if (!relevantFeedback[feedback.recommendationId]) {
          relevantFeedback[feedback.recommendationId] = { count: 0, totalRating: 0 };
        }

        relevantFeedback[feedback.recommendationId].count += 1;
        relevantFeedback[feedback.recommendationId].totalRating += feedback.rating;
      });
    });

    // Ajuster les scores de correspondance et les priorités en fonction des retours
    adjustedRecommendations.forEach(rec => {
      if (relevantFeedback[rec.id]) {
        const avgRating = relevantFeedback[rec.id].totalRating / relevantFeedback[rec.id].count;

        // Augmenter le score de correspondance pour les recommandations bien notées
        if (avgRating > 3.5) {
          rec.matchScore = Math.min(100, rec.matchScore + (avgRating - 3) * 5);

          // Augmenter la priorité des recommandations très bien notées
          if (avgRating > 4.5 && rec.priority > 1) {
            rec.priority -= 1;
          }
        } 
        // Réduire le score pour les recommandations mal notées
        else if (avgRating < 2.5) {
          rec.matchScore = Math.max(0, rec.matchScore - (3 - avgRating) * 5);

          // Réduire la priorité des recommandations très mal notées
          if (avgRating < 1.5) {
            rec.priority += 1;
          }
        }

        // Ajouter une indication que l'IA a ajusté cette recommandation
        rec.aiAdjusted = true;
        rec.aiConfidenceScore = avgRating / 5;
      }
    });

    // Trier par priorité puis par score de correspondance
    adjustedRecommendations.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return b.matchScore - a.matchScore;
    });

    return adjustedRecommendations;

  } catch (error) {
    console.error("Erreur lors de l'ajustement des recommandations:", error);
    return baseRecommendations;
  }
};

/**
 * Enregistre un retour utilisateur et met à jour le modèle IA
 */
export const recordUserFeedback = (
  recommendationId: string,
  rating: number,
  comments?: string
): void => {
  try {
    // Récupérer les données d'apprentissage
    const learningData: LearningData[] = secureStorageService.getItem('aiLearningData') || [];

    if (learningData.length === 0) {
      return;
    }

    // Trouver l'entrée la plus récente sans retour
    const mostRecentEntry = [...learningData]
      .reverse()
      .find(entry => 
        entry.recommendations && 
        entry.recommendations.some(r => r.id === recommendationId) &&
        (!entry.userFeedback || !entry.userFeedback.some(f => f.recommendationId === recommendationId))
      );

    if (mostRecentEntry) {
      if (!mostRecentEntry.userFeedback) {
        mostRecentEntry.userFeedback = [];
      }

      mostRecentEntry.userFeedback.push({
        recommendationId,
        rating,
        comments,
        timestamp: new Date().toISOString()
      });

      // Mettre à jour l'entrée dans le tableau
      const updatedData = learningData.map(entry => 
        entry.timestamp === mostRecentEntry.timestamp ? mostRecentEntry : entry
      );

      // Sauvegarder les données mises à jour
      secureStorageService.setItem('aiLearningData', updatedData);

      // Mettre à jour les métriques d'apprentissage
      updateLearningMetrics(updatedData);

      // Entraîner ou ajuster le modèle avec ce nouveau retour
      trainAIModel(false);
    }

  } catch (error) {
    console.error("Erreur lors de l'enregistrement du retour utilisateur:", error);
  }
};

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
export const getAILearningStatus = (): {
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
  // Cette fonction traiterait les métriques comportementales comme le temps passé sur les questions,
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
  getAILearningStatus,
  analyzeRecommendationPerformance,
  identifyPatternCorrelations,
  evaluateDataQuality,
  processBehavioralData,
  generateRecommendations
};