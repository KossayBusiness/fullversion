/**
 * Système d'apprentissage IA pour les recommandations nutritionnelles personnalisées
 */

import { secureStorageService } from './secureStorage';
import { 
  LearningData, 
  AIModelState, 
  QuizResponse, 
  Recommendation,
  UserProfile,
  UserFeedback
} from './types';
import { calculateProfileSimilarity } from './userSimilarity';
import SUPPLEMENT_CATALOG from '@/data/supplementCatalog';
import { SYMPTOM_CATEGORIES, SYMPTOM_RECOMMENDATIONS, GOAL_RECOMMENDATIONS } from '../data/recommendationMappings';

// Structure de données pour le modèle AI
interface AIModel {
  supplementScores: Record<string, {
    effectivenessScore: number; 
    confidenceScore: number;
    feedbackCount: number;
    lastUpdated: string;
  }>;
  symptomWeights: Record<string, number>;
  goalWeights: Record<string, number>;
  dietaryAdjustments: Record<string, number>;
  userProfiles: UserProfile[];
  version: number;
  trainingIterations: number;
}

// Données initiales du modèle
const initialAIModel: AIModel = {
  supplementScores: {},
  symptomWeights: {
    stress: 1.0,
    sleep: 1.0,
    energy: 1.0,
    mood: 1.0,
    focus: 1.0,
    digestion: 1.0,
    immunity: 1.0,
    inflammation: 1.0
  },
  goalWeights: {
    weight_management: 1.0,
    cognitive_performance: 1.0,
    stress_management: 1.0,
    energy_boost: 1.0,
    better_sleep: 1.0,
    immune_support: 1.0,
    digestive_health: 1.0
  },
  dietaryAdjustments: {
    vegan: 1.0,
    vegetarian: 1.0,
    glutenFree: 1.0,
    dairyFree: 1.0
  },
  userProfiles: [],
  version: 1.0,
  trainingIterations: 0
};

// Initialiser le modèle AI s'il n'existe pas
export const initializeAIModel = (): void => {
  try {
    const existingModel = secureStorageService.getItem('aiModel');

    if (!existingModel) {
      // Pré-remplir le modèle avec les données du catalogue de suppléments
      const modelWithSupplements = { ...initialAIModel };
      const supplementScores: Record<string, any> = {};

      // Pour chaque supplément dans le catalogue, initialiser son score
      Object.keys(SUPPLEMENT_CATALOG).forEach(supplementId => {
        const supplement = SUPPLEMENT_CATALOG[supplementId];

        supplementScores[supplementId] = {
          effectivenessScore: supplement.scienceScore * 10, // Convertir le score scientifique (1-10) en score d'efficacité (10-100)
          confidenceScore: 0.5, // Confiance initiale moyenne
          feedbackCount: 0,
          lastUpdated: new Date().toISOString()
        };
      });

      modelWithSupplements.supplementScores = supplementScores;
      secureStorageService.setItem('aiModel', modelWithSupplements);

      console.log("Modèle AI initialisé avec les données du catalogue de suppléments");
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation du modèle AI:", error);
  }
};

/**
 * Enregistre des données d'apprentissage pour améliorer le modèle AI
 */
export const recordLearningData = (data: LearningData): void => {
  try {
    // Assurez-vous que le modèle AI est initialisé
    initializeAIModel();

    // Récupérer les données d'apprentissage existantes
    const existingData: LearningData[] = secureStorageService.getItem('aiLearningData') || [];

    // Ajouter les nouvelles données
    existingData.push(data);

    // Limiter à 1000 entrées pour éviter de surcharger le stockage
    const trimmedData = existingData.slice(-1000);

    secureStorageService.setItem('aiLearningData', trimmedData);

    // Mettre à jour le modèle AI avec ces nouvelles données
    // Note: Dans un système de production, cela serait fait périodiquement plutôt qu'à chaque enregistrement
    updateAIModelWithLearningData(data);

  } catch (error) {
    console.error("Erreur lors de l'enregistrement des données d'apprentissage:", error);
  }
};

/**
 * Enregistre un retour utilisateur sur une recommandation
 */
export const recordUserFeedback = (
  recommendationId: string,
  rating: number,
  comments?: string
): void => {
  try {
    // Récupérer les retours existants
    const existingFeedback: UserFeedback[] = secureStorageService.getItem('userFeedback') || [];

    // Ajouter le nouveau retour
    existingFeedback.push({
      recommendationId,
      rating,
      comments,
      timestamp: new Date().toISOString()
    });

    secureStorageService.setItem('userFeedback', existingFeedback);

    // Mettre à jour le modèle AI avec ce retour
    updateAIModelWithFeedback(recommendationId, rating);

  } catch (error) {
    console.error("Erreur lors de l'enregistrement du retour utilisateur:", error);
  }
};

/**
 * Met à jour le modèle AI avec de nouvelles données d'apprentissage
 */
const updateAIModelWithLearningData = (data: LearningData): void => {
  try {
    // Récupérer le modèle AI actuel
    const aiModel: AIModel = secureStorageService.getItem('aiModel') || initialAIModel;

    // Mettre à jour les profils utilisateurs
    if (data.userProfile) {
      // Éviter les doublons en vérifiant la similarité avec les profils existants
      const similarProfileIndex = aiModel.userProfiles.findIndex(profile => 
        calculateProfileSimilarity(profile, data.userProfile) > 0.85
      );

      if (similarProfileIndex >= 0) {
        // Mettre à jour un profil similaire existant
        aiModel.userProfiles[similarProfileIndex] = {
          ...aiModel.userProfiles[similarProfileIndex],
          ...data.userProfile,
          lastUpdated: new Date().toISOString()
        };
      } else {
        // Ajouter un nouveau profil
        aiModel.userProfiles.push({
          ...data.userProfile,
          lastUpdated: new Date().toISOString()
        });

        // Limiter à 100 profils
        if (aiModel.userProfiles.length > 100) {
          aiModel.userProfiles.shift(); // Supprimer le plus ancien
        }
      }
    }

    // Incrémenter le compteur d'itérations
    aiModel.trainingIterations++;

    // Sauvegarder le modèle mis à jour
    secureStorageService.setItem('aiModel', aiModel);

  } catch (error) {
    console.error("Erreur lors de la mise à jour du modèle AI avec les données d'apprentissage:", error);
  }
};

/**
 * Met à jour le modèle AI avec un retour utilisateur
 */
const updateAIModelWithFeedback = (
  recommendationId: string,
  rating: number
): void => {
  try {
    // Récupérer le modèle AI actuel
    const aiModel: AIModel = secureStorageService.getItem('aiModel') || initialAIModel;

    // Mettre à jour le score du supplément
    if (aiModel.supplementScores[recommendationId]) {
      const currentScore = aiModel.supplementScores[recommendationId];
      const feedbackWeight = 0.1; // Poids du nouveau retour (10%)

      // Convertir la note (1-5) en ajustement d'efficacité
      const ratingNormalized = (rating - 3) / 2; // -1 à +1

      // Mettre à jour le score d'efficacité
      currentScore.effectivenessScore = Math.max(10, Math.min(100, 
        currentScore.effectivenessScore + (ratingNormalized * 20 * feedbackWeight)
      ));

      // Augmenter la confiance à mesure que nous recevons plus de retours
      currentScore.confidenceScore = Math.min(0.95, 
        currentScore.confidenceScore + (0.05 * feedbackWeight)
      );

      // Incrémenter le compteur de retours
      currentScore.feedbackCount++;

      // Mettre à jour la date
      currentScore.lastUpdated = new Date().toISOString();

      // Sauvegarder la mise à jour
      aiModel.supplementScores[recommendationId] = currentScore;
      secureStorageService.setItem('aiModel', aiModel);
    }

  } catch (error) {
    console.error("Erreur lors de la mise à jour du modèle AI avec le retour utilisateur:", error);
  }
};

/**
 * Effectue un entraînement complet du modèle AI avec toutes les données disponibles
 * Cette fonction retourne une promesse qui se résout après l'entraînement
 */
export const trainAIModel = async (): Promise<void> => {
  return new Promise((resolve) => {
    try {
      console.log("Début de l'entraînement du modèle AI...");

      // Récupérer toutes les données
      const learningData: LearningData[] = secureStorageService.getItem('aiLearningData') || [];
      const userFeedback: UserFeedback[] = secureStorageService.getItem('userFeedback') || [];

      if (learningData.length === 0) {
        console.log("Pas de données d'apprentissage disponibles");
        resolve();
        return;
      }

      // Réinitialiser le modèle avec les valeurs de base
      let aiModel: AIModel = { ...initialAIModel };

      // Pré-remplir les scores de suppléments depuis le catalogue
      const supplementScores: Record<string, any> = {};
      Object.keys(SUPPLEMENT_CATALOG).forEach(supplementId => {
        const supplement = SUPPLEMENT_CATALOG[supplementId];

        supplementScores[supplementId] = {
          effectivenessScore: supplement.scienceScore * 10,
          confidenceScore: 0.5,
          feedbackCount: 0,
          lastUpdated: new Date().toISOString()
        };
      });

      aiModel.supplementScores = supplementScores;

      // Analyser les retours utilisateurs pour construire un index d'efficacité
      const feedbackBySupplementId: Record<string, number[]> = {};

      userFeedback.forEach(feedback => {
        if (!feedbackBySupplementId[feedback.recommendationId]) {
          feedbackBySupplementId[feedback.recommendationId] = [];
        }

        feedbackBySupplementId[feedback.recommendationId].push(feedback.rating);
      });

      // Appliquer les retours au modèle
      Object.entries(feedbackBySupplementId).forEach(([supplementId, ratings]) => {
        if (ratings.length > 0 && aiModel.supplementScores[supplementId]) {
          const avgRating = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
          const ratingNormalized = (avgRating - 3) / 2; // -1 à +1

          aiModel.supplementScores[supplementId].effectivenessScore = Math.max(10, Math.min(100,
            aiModel.supplementScores[supplementId].effectivenessScore + (ratingNormalized * 20)
          ));

          aiModel.supplementScores[supplementId].confidenceScore = Math.min(0.95,
            0.5 + (0.05 * Math.min(ratings.length, 10)) // Max +0.5 pour 10 ratings
          );

          aiModel.supplementScores[supplementId].feedbackCount = ratings.length;
        }
      });

      // Analyser les profils utilisateurs pour ajuster les poids des symptômes et objectifs
      const symptomCounts: Record<string, number> = {};
      const goalCounts: Record<string, number> = {};

      learningData.forEach(data => {
        if (data.userProfile && data.userProfile.activeSymptoms) {
          data.userProfile.activeSymptoms.forEach(symptomId => {
            symptomCounts[symptomId] = (symptomCounts[symptomId] || 0) + 1;
          });
        }

        if (data.userProfile && data.userProfile.activeGoals) {
          data.userProfile.activeGoals.forEach(goalId => {
            goalCounts[goalId] = (goalCounts[goalId] || 0) + 1;
          });
        }
      });

      // Ajuster les poids des symptômes en fonction de leur fréquence
      const totalSymptomCount = Object.values(symptomCounts).reduce((sum, count) => sum + count, 0) || 1;
      Object.entries(symptomCounts).forEach(([symptomId, count]) => {
        // Calculer l'importance relative (fréquence normalisée)
        const relativeImportance = count / totalSymptomCount;

        // Ajuster le poids (entre 0.8 et 1.2 en fonction de la fréquence)
        aiModel.symptomWeights[symptomId] = Math.max(0.8, Math.min(1.2, 
          1.0 + (relativeImportance - 0.125) * 2 // 0.125 est la fréquence moyenne pour 8 symptômes
        ));
      });

      // Ajuster les poids des objectifs en fonction de leur fréquence
      const totalGoalCount = Object.values(goalCounts).reduce((sum, count) => sum + count, 0) || 1;
      Object.entries(goalCounts).forEach(([goalId, count]) => {
        const relativeImportance = count / totalGoalCount;

        aiModel.goalWeights[goalId] = Math.max(0.8, Math.min(1.2,
          1.0 + (relativeImportance - 0.143) * 2 // 0.143 est la fréquence moyenne pour 7 objectifs
        ));
      });

      // Collecter les profils utilisateurs
      const userProfiles: UserProfile[] = [];
      learningData.forEach(data => {
        if (data.userProfile) {
          // Vérifier si un profil similaire existe déjà
          const similarProfileExists = userProfiles.some(profile => 
            calculateProfileSimilarity(profile, data.userProfile) > 0.85
          );

          if (!similarProfileExists && userProfiles.length < 100) {
            userProfiles.push({
              ...data.userProfile,
              lastUpdated: data.timestamp
            });
          }
        }
      });

      aiModel.userProfiles = userProfiles;
      aiModel.trainingIterations = learningData.length;
      aiModel.version = Math.floor(Date.now() / 1000); // Version timestamp

      // Sauvegarder le modèle entraîné
      secureStorageService.setItem('aiModel', aiModel);

      console.log("Entraînement du modèle AI terminé:", {
        supplements: Object.keys(aiModel.supplementScores).length,
        profiles: aiModel.userProfiles.length,
        iterations: aiModel.trainingIterations,
        version: aiModel.version
      });

      // Simuler un processus d'entraînement qui prend du temps
      setTimeout(() => {
        console.log('Entraînement du modèle terminé');
        resolve();
      }, 6000); // Simule 6 secondes d'entraînement

    } catch (error) {
      console.error("Erreur lors de l'entraînement du modèle AI:", error);
      resolve();
    }
  });
};

/**
 * Génère des recommandations personnalisées en fonction du profil utilisateur
 * en utilisant le modèle AI entraîné avec des mécanismes avancés d'analyse
 */
export const generateAIPersonalizedRecommendations = (
  quizResponses: QuizResponse
): Recommendation[] => {
  try {
    // S'assurer que le modèle AI est initialisé
    initializeAIModel();

    // Récupérer le modèle AI
    const aiModel: AIModel = secureStorageService.getItem('aiModel') || initialAIModel;

    // Extraire les informations pertinentes du quiz
    const {
      stressLevel = 0,
      sleepQuality = 0,
      energyLevel = 0,
      concentration = 0,
      digestion = 0,
      immuneFunction = 0,
      jointHealth = 0,
      skinHealth = 0,
      personalGoals = [],
      dietaryRestrictions = {},
      ageRange = '',
      gender = '',
      activityLevel = 0,
      medicalConditions = []
    } = quizResponses;

    // Créer un profil utilisateur plus détaillé pour l'analyse
    const userProfile = {
      demographics: {
        ageRange,
        gender,
        activityLevel
      },
      activeSymptoms: [],
      activeGoals: personalGoals,
      dietaryRestrictions,
      medicalConditions: medicalConditions || [],
      intensityLevels: {
        stress: stressLevel,
        sleep: sleepQuality,
        energy: energyLevel,
        focus: concentration,
        digestion: digestion,
        immune: immuneFunction,
        joints: jointHealth,
        skin: skinHealth
      }
    };

    // Analyse avancée des symptômes avec gestion de l'intensité
    const symptomIntensityThreshold = 5; // Seuil configurable

    // Déterminer les symptômes actifs avec priorité basée sur l'intensité
    const symptomMapping = [
      { key: 'stress', value: stressLevel, threshold: symptomIntensityThreshold, priority: 1 },
      { key: 'sleep', value: sleepQuality, condition: 'lte', threshold: symptomIntensityThreshold, priority: 2 },
      { key: 'energy', value: energyLevel, condition: 'lte', threshold: symptomIntensityThreshold, priority: 3 },
      { key: 'focus', value: concentration, condition: 'lte', threshold: symptomIntensityThreshold, priority: 4 },
      { key: 'digestion', value: digestion, condition: 'lte', threshold: symptomIntensityThreshold, priority: 5 },
      { key: 'immune', value: immuneFunction, condition: 'lte', threshold: symptomIntensityThreshold, priority: 6 },
      { key: 'joints', value: jointHealth, condition: 'lte', threshold: symptomIntensityThreshold, priority: 7 },
      { key: 'skin', value: skinHealth, condition: 'lte', threshold: symptomIntensityThreshold, priority: 8 }
    ];

    // Déterminer les symptômes actifs avec gestion de seuils configurables
    symptomMapping.forEach(symptom => {
      const { key, value, condition = 'gte', threshold, priority } = symptom;
      const isActive = condition === 'lte' 
        ? value <= threshold 
        : value >= threshold;

      if (isActive) {
        userProfile.activeSymptoms.push({
          id: key,
          intensity: Math.abs(value - threshold) + 1,
          priority
        });
      }
    });

    // Trier les symptômes par priorité et intensité
    userProfile.activeSymptoms.sort((a, b) => {
      // D'abord par priorité (plus petit nombre = plus haute priorité)
      if (a.priority !== b.priority) return a.priority - b.priority;
      // Ensuite par intensité (plus grande intensité = plus haute priorité)
      return b.intensity - a.intensity;
    });

    // Extraire uniquement les IDs des symptômes pour la compatibilité avec le reste du code
    const activeSymptomIds = userProfile.activeSymptoms.map(s => s.id);

    // Recherche de profils similaires pour affiner les recommandations
    const similarProfiles = aiModel.userProfiles
      .map(profile => ({
        profile,
        similarity: calculateProfileSimilarity(profile, userProfile)
      }))
      .filter(item => item.similarity > 0.7) // Seuil de similarité configurable
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5); // Top 5 des profils les plus similaires

    // Calculer les scores des suppléments pour ce profil avec l'influence des profils similaires
    const supplementScores: Record<string, number> = {};

    // 1. Scores basés sur les symptômes
    userProfile.activeSymptoms.forEach(symptomId => {
      const symptomWeight = aiModel.symptomWeights[symptomId] || 1.0;

      // Récupérer les recommandations pour ce symptôme
      const recommendations = SYMPTOM_RECOMMENDATIONS[symptomId] || [];

      recommendations.forEach(rec => {
        const baseScore = rec.priority * 10;
        const modelScore = aiModel.supplementScores[rec.id]?.effectivenessScore || 50;
        const weightedScore = baseScore * symptomWeight * (modelScore / 50);

        supplementScores[rec.id] = (supplementScores[rec.id] || 0) + weightedScore;
      });
    });

    // 2. Scores basés sur les objectifs
    userProfile.activeGoals.forEach(goalId => {
      const goalWeight = aiModel.goalWeights[goalId] || 1.0;

      // Récupérer les recommandations pour cet objectif
      const recommendations = GOAL_RECOMMENDATIONS[goalId] || [];

      recommendations.forEach(rec => {
        const baseScore = rec.priority * 8; // Légèrement inférieur aux symptômes
        const modelScore = aiModel.supplementScores[rec.id]?.effectivenessScore || 50;
        const weightedScore = baseScore * goalWeight * (modelScore / 50);

        supplementScores[rec.id] = (supplementScores[rec.id] || 0) + weightedScore;
      });
    });

    // 3. Filtrer selon les restrictions alimentaires
    const isVegetarian = dietaryRestrictions.vegetarian || false;
    const isVegan = dietaryRestrictions.vegan || false;
    const isGlutenFree = dietaryRestrictions.glutenFree || false;
    const isDairyFree = dietaryRestrictions.dairyFree || false;

    // Construire la liste des suppléments à exclure
    const excludedSupplements = new Set<string>();

    Object.entries(SUPPLEMENT_CATALOG).forEach(([id, supplement]) => {
      if ((isVegan && !supplement.vegan) ||
          (isVegetarian && !supplement.vegetarian) ||
          (isGlutenFree && !supplement.glutenFree) ||
          (isDairyFree && !supplement.dairyFree)) {
        excludedSupplements.add(id);
      }
    });

    // 4. Appliquer les exclusions et créer les recommandations finales
    const finalRecommendations: Recommendation[] = [];

    Object.entries(supplementScores)
      .filter(([id]) => !excludedSupplements.has(id))
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3) // Top 3 recommendations
      .forEach(([id, score]) => {
        const supplement = SUPPLEMENT_CATALOG[id];
        const modelData = aiModel.supplementScores[id] || {
          effectivenessScore: 50,
          confidenceScore: 0.5
        };

        // Déterminer la dose appropriée
        const dose = isVegetarian ? 
          findDoseForSupplement(id, 'vegetarian') : 
          findDoseForSupplement(id, 'standard');

        if (supplement && dose) {
          // Construire les raisons de la recommandation
          const reasons = [];

          userProfile.activeSymptoms.forEach(symptomId => {
            const categoryData = SYMPTOM_CATEGORIES.find(c => c.id === symptomId);
            if (SYMPTOM_RECOMMENDATIONS[symptomId]?.some(r => r.id === id)) {
              reasons.push(categoryData?.name || symptomId);
            }
          });

          userProfile.activeGoals.forEach(goalId => {
            if (GOAL_RECOMMENDATIONS[goalId]?.some(r => r.id === id)) {
              reasons.push(`objectif: ${goalId.replace(/_/g, ' ')}`);
            }
          });

          const reasonText = reasons.length > 0 
            ? `Recommandé pour ${reasons.join(' et ')}` 
            : 'Recommandation basée sur votre profil global';

          finalRecommendations.push({
            id,
            name: supplement.name,
            description: `${supplement.name} (${supplement.scientificName})`,
            priority: Math.round(score / 20), // Convertir le score en priorité (1-10)
            matchScore: score,
            benefits: supplement.benefits,
            recommendedDose: dose,
            timeToEffect: supplement.timeToEffect,
            scientificBasis: supplement.scientificBasis,
            confidence: modelData.confidenceScore,
            reason: reasonText
          });
        }
      });

    // Enregistrer ces données pour l'apprentissage
    recordLearningData({
      quizResponses,
      generatedRecommendations: finalRecommendations,
      userProfile: {
        dietaryRestrictions,
        activeSymptoms: userProfile.activeSymptoms,
        activeGoals: personalGoals
      },
      timestamp: new Date().toISOString()
    });

    return finalRecommendations;

  } catch (error) {
    console.error("Erreur lors de la génération des recommandations personnalisées:", error);
    return [];
  }
};

/**
 * Fonction utilitaire pour trouver la dose appropriée d'un supplément
 */
const findDoseForSupplement = (
  supplementId: string,
  doseType: 'standard' | 'vegetarian'
): string | null => {
  // Rechercher dans les recommandations de symptômes
  for (const symptomId in SYMPTOM_RECOMMENDATIONS) {
    const recommendations = SYMPTOM_RECOMMENDATIONS[symptomId];
    const rec = recommendations.find(r => r.id === supplementId);

    if (rec) {
      return doseType === 'vegetarian' && rec.doseVegetarian 
        ? rec.doseVegetarian 
        : rec.doseStandard;
    }
  }

  // Rechercher dans les recommandations d'objectifs
  for (const goalId in GOAL_RECOMMENDATIONS) {
    const recommendations = GOAL_RECOMMENDATIONS[goalId];
    const rec = recommendations.find(r => r.id === supplementId);

    if (rec) {
      return doseType === 'vegetarian' && rec.doseVegetarian 
        ? rec.doseVegetarian 
        : rec.doseStandard;
    }
  }

  // Par défaut, utiliser les informations du catalogue
  const supplement = SUPPLEMENT_CATALOG[supplementId];
  if (supplement) {
    return doseType === 'vegetarian' && supplement.dosageVegetarian
      ? supplement.dosageVegetarian
      : supplement.dosageStandard;
  }

  return null;
};

/**
 * Trouve des profils utilisateurs similaires pour affiner les recommandations
 */
export const findSimilarUserProfiles = (
  currentProfile: any,
  limit: number = 5
): UserProfile[] => {
  try {
    // Récupérer le modèle AI
    const aiModel: AIModel = secureStorageService.getItem('aiModel') || initialAIModel;

    if (aiModel.userProfiles.length === 0) {
      return [];
    }

    // Calculer la similarité pour chaque profil
    const profilesWithSimilarity = aiModel.userProfiles.map(profile => ({
      profile,
      similarity: calculateProfileSimilarity(currentProfile, profile)
    }));

    // Trier par similarité et retourner les plus similaires
    return profilesWithSimilarity
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map(entry => entry.profile);

  } catch (error) {
    console.error("Erreur lors de la recherche de profils similaires:", error);
    return [];
  }
};

/**
 * Réinitialise le modèle AI aux valeurs par défaut
 * (utile pour le développement ou si le modèle devient problématique)
 */
export const resetAIModel = (): void => {
  try {
    // Réinitialiser le modèle avec les valeurs initiales
    secureStorageService.setItem('aiModel', initialAIModel);
    console.log("Modèle AI réinitialisé aux valeurs par défaut");
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du modèle AI:", error);
  }
};

/**
 * Obtient l'état actuel du modèle AI
 */
export const getAIModelState = (): AIModelState => {
  try {
    const aiModel: AIModel = secureStorageService.getItem('aiModel') || initialAIModel;

    return {
      version: aiModel.version,
      trainingIterations: aiModel.trainingIterations,
      profileCount: aiModel.userProfiles.length,
      supplementCount: Object.keys(aiModel.supplementScores).length,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de l'état du modèle AI:", error);
    return {
      version: 0,
      trainingIterations: 0,
      profileCount: 0,
      supplementCount: 0,
      lastUpdated: new Date().toISOString()
    };
  }
};
// La fonction trainAIModel est maintenant définie ci-dessus avec la fonctionnalité complète