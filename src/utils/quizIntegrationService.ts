import { QuizData, Recommendation } from "@/utils/types";
import { getComprehensiveRecommendations } from "@/utils/recommenderSystem";
import { SUPPLEMENT_CATALOG, SupplementInfo } from '@/data/supplementCatalog';
import FrenchRecommendationSystem, {RecommendationResult, ContextualFactors} from './frenchRecommendationSystem';
import { SYMPTOM_RECOMMENDATIONS, GOAL_RECOMMENDATIONS } from '@/data/recommendationMappings';
import { QuizResponse } from '@/components/quiz/types';
import { generateFrenchStyleRecommendations } from './frenchRecommendationSystem';
import { determineContextualFactors, getContextualRecommendations } from './contextualRecommendationSystem';
import { generateEnhancedRecommendations } from './enhancedRecommendationSystem';
import { EnrichedRecommendation, QuizResponse as EnrichedQuizResponse } from './types';


/**
 * Integration service for the recommendation system with the nutritional quiz
 * This service connects the recommendation algorithm to the quiz responses
 * and generates personalized recommendations
 */

/**
 * Converts quiz form data to the format expected by the recommendation system
 */
export function formatQuizDataForRecommender(formData: any): QuizData {
  // Ensure we have valid data
  if (!formData) {
    console.warn("No quiz data provided to format");
    return {};
  }

  console.log("Formatting quiz data for recommender:", formData);

  // Create formatted data structure
  const formattedData: QuizData = {
    symptoms: formData.symptoms || [],
    objectives: formData.objectives || [],
    dietaryHabits: formData.dietaryHabits || [],
    lifestyle: Array.isArray(formData.lifestyle) ? formData.lifestyle : [],
    proteinConsumption: formData.proteinConsumption || '',
    age: formData.userInfo?.age || 30,
    gender: formData.userInfo?.gender || ''
  };

  // Handle lifestyle differently if it's an object
  if (formData.lifestyle && typeof formData.lifestyle === 'object' && !Array.isArray(formData.lifestyle)) {
    // Convert lifestyle object to array for recommender system
    const lifestyleFactors = [];

    if (formData.lifestyle.stress === 'high') lifestyleFactors.push('high_stress');
    if (formData.lifestyle.exercise === 'sedentary') lifestyleFactors.push('sedentary');
    if (formData.lifestyle.sleepQuality === 'poor') lifestyleFactors.push('poor_sleep');
    if (formData.lifestyle.exercise === 'intense') lifestyleFactors.push('active_lifestyle');

    formattedData.lifestyle = lifestyleFactors;
  }

  // Map symptom and objective codes to system-recognized values
  formattedData.symptoms = mapSymptomCodes(formattedData.symptoms);
  formattedData.objectives = mapObjectiveCodes(formattedData.objectives);

  console.log("Formatted data for recommender:", formattedData);
  return formattedData;
}

/**
 * Maps UI symptom codes to recommender system codes
 */
function mapSymptomCodes(symptoms: string[]): string[] {
  if (!symptoms || !Array.isArray(symptoms)) return [];

  const mappings: {[key: string]: string} = {
    'fatigue': 'fatigue',
    'sleep issues': 'sleep_issues',
    'stress': 'stress',
    'anxiety': 'anxiety',
    'digestive problems': 'digestion',
    'joint pain': 'joint_pain',
    'skin problems': 'skin_problems',
    'weak immune system': 'immunite'
  };

  return symptoms.map(s => mappings[s] || s);
}

/**
 * Maps UI objective codes to recommender system codes
 */
function mapObjectiveCodes(objectives: string[]): string[] {
  if (!objectives || !Array.isArray(objectives)) return [];

  const mappings: {[key: string]: string} = {
    'energy': 'energy',
    'sleep_improvement': 'sleep_improvement',
    'digestion': 'digestion',
    'immunity': 'immune_boost',
    'concentration': 'mental_clarity',
    'stress': 'stress_management'
  };

  return objectives.map(o => mappings[o] || o);
}

/**
 * Gets recommendations based on quiz data
 */
export function getQuizRecommendations(quizData: any): Recommendation[] {
  try {
    console.log("Starting recommendation generation with raw data:", quizData);

    // Format the data for the recommender system
    const formattedData = formatQuizDataForRecommender(quizData);
    console.log("Formatted data for recommender:", formattedData);

    // Vérifier si nous avons des données suffisantes pour générer des recommandations
    if (!formattedData || Object.keys(formattedData).length === 0) {
      console.warn("Insufficient data for generating recommendations");
      return [];
    }

    // Get recommendations from the recommender system
    const recommendations = getComprehensiveRecommendations(formattedData);

    // Si aucune recommandation n'a été générée, utiliser le service de personnalisation avancée
    if (!recommendations || recommendations.length === 0) {
      console.log("No recommendations generated, using advanced personalization");
      return generateIntegratedRecommendations(quizData as QuizResponse); // Use the new function here
    }

    console.log("Generated recommendations via standard pipeline:", recommendations);
    return recommendations;
  } catch (error) {
    console.error("Error getting quiz recommendations:", error);

    // En cas d'erreur, utiliser le service de personnalisation alternatif
    try {
      console.log("Attempting to use fallback personalization service");
      return generateIntegratedRecommendations(quizData as QuizResponse); // Use the new function here
    } catch (fallbackError) {
      console.error("Fallback recommendation generation failed:", fallbackError);
      return [];
    }
  }
}


// Interface pour les recommandations enrichies
interface EnrichedRecommendation {
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
  compatibleSupplements?: string[];
  matchScore?: number; // Added match score
}

// Conversion des symptômes bruts vers des libellés lisibles
const symptomLabels: Record<string, string> = {
  'fatigue': 'fatigue',
  'stress': 'stress',
  'sleep_issues': 'problèmes de sommeil',
  'digestive_issues': 'problèmes digestifs',
  'joint_pain': 'douleurs articulaires',
  'low_immunity': 'immunité affaiblie',
  'inflammation': 'inflammation',
  'brain_fog': 'brouillard mental',
  'skin_issues': 'problèmes de peau',
  'mood_issues': 'sautes d\'humeur'
};

// Conversion des objectifs bruts vers des libellés lisibles
const goalLabels: Record<string, string> = {
  'energy': 'plus d\'énergie',
  'sleep_quality': 'meilleur sommeil',
  'stress_management': 'gestion du stress',
  'immune_support': 'renforcement immunitaire',
  'digestive_health': 'santé digestive',
  'focus_concentration': 'concentration',
  'heart_health': 'santé cardiaque',
  'joint_support': 'confort articulaire',
  'skin_health': 'santé de la peau',
  'detoxification': 'détoxification'
};

/**
 * Détermine la saison actuelle en fonction de la date
 */
function getCurrentSeason(date: Date = new Date()): 'spring' | 'summer' | 'fall' | 'winter' {
  const month = date.getMonth(); // 0-11
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

/**
 * Détermine les facteurs contextuels pour l'utilisateur
 */
function determineContextualFactors(quizResponses: QuizResponse): ContextualFactors {
  const contextFactors: ContextualFactors = {
    season: getCurrentSeason(),
    location: {}
  };

  // Extraire l'âge s'il est disponible
  if (quizResponses.personal?.age) {
    const ageNum = parseInt(quizResponses.personal.age, 10);
    if (!isNaN(ageNum)) {
      contextFactors.age = ageNum;
    }
  }

  // Extraire le genre s'il est disponible
  if (quizResponses.personal?.gender) {
    const gender = quizResponses.personal.gender.toLowerCase();
    if (gender === 'male' || gender === 'homme') {
      contextFactors.gender = 'male';
    } else if (gender === 'female' || gender === 'femme') {
      contextFactors.gender = 'female';
    } else {
      contextFactors.gender = 'other';
    }
  }

  // Extraire les médicaments si disponibles
  if (quizResponses.medications) {
    contextFactors.medications = Array.isArray(quizResponses.medications)
      ? quizResponses.medications
      : [quizResponses.medications];
  }

  // Géolocalisation approximative - à implémenter avec une API de localisation
  // Pour l'instant, on utilise une hypothèse de localisation en France (latitude moyenne ~46)
  contextFactors.location = {
    country: 'France',
    latitude: 46
  };

  return contextFactors;
}

/**
 * Enrichit les recommandations avec des explications personnalisées
 */
function enrichRecommendations(
  recommendations: RecommendationResult[],
  quizResponses: QuizResponse
): EnrichedRecommendation[] {
  return recommendations.map(rec => {
    // Récupérer les informations détaillées du supplément
    const supplementInfo = SUPPLEMENT_CATALOG[rec.supplementId];

    if (!supplementInfo) {
      throw new Error(`Supplément non trouvé dans le catalogue: ${rec.supplementId}`);
    }

    // Convertir les symptômes correspondants en libellés lisibles
    const matchedSymptomsLabels = rec.reasonSymptoms.map(s =>
      symptomLabels[s] || s
    );

    // Convertir les objectifs correspondants en libellés lisibles
    const matchedGoalsLabels = rec.reasonGoals.map(g =>
      goalLabels[g] || g
    );

    // Sélectionner jusqu'à 2 études scientifiques à mettre en avant
    const keyStudies = supplementInfo.scientificStudies?.slice(0, 2).map(study => ({
      title: study.title,
      authors: study.authors,
      year: study.year,
      finding: study.findings
    }));

    // Créer une description personnalisée
    let personalizedDescription = supplementInfo.description;

    if (matchedSymptomsLabels.length > 0 || matchedGoalsLabels.length > 0) {
      personalizedDescription += " Particulièrement adapté";

      if (matchedSymptomsLabels.length > 0) {
        personalizedDescription += ` pour les personnes souffrant de ${matchedSymptomsLabels.join(', ')}`;
      }

      if (matchedGoalsLabels.length > 0) {
        personalizedDescription += `${matchedSymptomsLabels.length > 0 ? ' et' : ''} pour ceux qui recherchent ${matchedGoalsLabels.join(', ')}`;
      }

      personalizedDescription += '.';
    }

    // Créer la recommandation enrichie
    const enriched: EnrichedRecommendation = {
      id: rec.supplementId,
      name: rec.name,
      description: personalizedDescription,
      dosage: rec.dosageRecommendation,
      timeToEffect: rec.timeToEffect,
      efficacyPercentage: rec.efficacyPercentage,
      primaryBenefits: supplementInfo.benefits || [],
      matchedSymptoms: matchedSymptomsLabels,
      matchedGoals: matchedGoalsLabels,
      naturalSources: rec.naturalAlternatives,
      complementarySupplements: rec.complementarySupplements,
      scientificEvidence: {
        level: rec.scientificEvidenceLevel,
        keyStudies
      },
      isPrimary: rec.isPrimary,
      matchScore: rec.matchScore // Add match score
    };

    // Ajouter les notes contextuelles si présentes
    if (rec.contextualNotes) {
      enriched.userContextNotes = rec.contextualNotes;
    }

    // Ajouter les avertissements si présents
    if (rec.warningNotes && rec.warningNotes.length > 0) {
      enriched.warningNotes = rec.warningNotes;
    }

    return enriched;
  });
}

/**
 * Génère un explication détaillée pour une recommandation
 */
function generateDetailedExplanation(recommendation: EnrichedRecommendation): string {
  // Générer un message personnalisé basé sur le niveau d'efficacité
  let efficacyMessage = "";
  if (recommendation.efficacyPercentage >= 90) {
    efficacyMessage = `D'après nos recherches, ${recommendation.name} présente une efficacité exceptionnelle (${recommendation.efficacyPercentage}%) `;
  } else if (recommendation.efficacyPercentage >= 80) {
    efficacyMessage = `Les études montrent une forte efficacité (${recommendation.efficacyPercentage}%) de ${recommendation.name} `;
  } else if (recommendation.efficacyPercentage >= 70) {
    efficacyMessage = `Nos données indiquent une bonne efficacité (${recommendation.efficacyPercentage}%) de ${recommendation.name} `;
  } else {
    efficacyMessage = `Nos recherches suggèrent que ${recommendation.name} peut aider (${recommendation.efficacyPercentage}% d'efficacité) `;
  }

  // Ajouter les symptômes et objectifs correspondants
  let benefitsMessage = "";
  if (recommendation.matchedSymptoms.length > 0) {
    benefitsMessage += `pour les personnes souffrant de ${recommendation.matchedSymptoms.join(', ')}`;
  }

  if (recommendation.matchedGoals.length > 0) {
    if (recommendation.matchedSymptoms.length > 0) {
      benefitsMessage += " et ";
    }
    benefitsMessage += `pour atteindre votre objectif de ${recommendation.matchedGoals.join(', ')}`;
  }

  // Ajouter les informations sur le délai d'action
  const timeToEffectMessage = `\nVous pourriez observer des résultats en ${recommendation.timeToEffect}.`;

  // Ajouter des informations sur les sources naturelles
  let sourcesMessage = "";
  if (recommendation.naturalSources.length > 0) {
    sourcesMessage = `\nSources naturelles: ${recommendation.naturalSources.join(', ')}.`;
  }

  // Ajouter des informations sur la posologie
  const dosageMessage = `\nPosologie recommandée: ${recommendation.dosage}.`;

  // Ajouter des informations sur les suppléments complémentaires
  let complementaryMessage = "";
  if (recommendation.complementarySupplements && recommendation.complementarySupplements.length > 0) {
    complementaryMessage = `\nPour des résultats optimaux, envisagez de l'associer avec: ${recommendation.complementarySupplements.join(', ')}.`;
  }

  // Ajouter des preuves scientifiques
  let scienceMessage = "";
  const evidenceLevel = recommendation.scientificEvidence.level;

  if (evidenceLevel === 'high') {
    scienceMessage = "\nCe supplément bénéficie d'un niveau élevé de preuves scientifiques.";
  } else if (evidenceLevel === 'moderate') {
    scienceMessage = "\nCe supplément est soutenu par un niveau modéré de preuves scientifiques.";
  } else {
    scienceMessage = "\nCe supplément est appuyé par des études préliminaires encourageantes.";
  }

  // Ajouter des notes contextuelles si présentes
  let contextMessage = "";
  if (recommendation.userContextNotes) {
    contextMessage = `\n${recommendation.userContextNotes}`;
  }

  // Ajouter des avertissements si présents
  let warningsMessage = "";
  if (recommendation.warningNotes && recommendation.warningNotes.length > 0) {
    warningsMessage = `\nAttention: ${recommendation.warningNotes.join(' ')}`;
  }

  // Assembler l'explication complète
  return `${efficacyMessage}${benefitsMessage}.${timeToEffectMessage}${sourcesMessage}${dosageMessage}${complementaryMessage}${scienceMessage}${contextMessage}${warningsMessage}`;
}

/**
 * Génère des recommandations personnalisées à partir des réponses au quiz
 */

export async function generateIntegratedRecommendations(quizResponses: QuizResponse): Promise<{recommendations: EnrichedRecommendation[], compatibilityReport?: any, message?: string}> {
  console.log('Starting recommendation generation with raw data:', quizResponses);

  try {
    // Déterminer les facteurs contextuels
    const contextFactors = determineContextualFactors(quizResponses);
    console.log('Determined contextual factors:', contextFactors);

    // Obtenir les recommandations de base
    const baseRecommendations = generateFrenchStyleRecommendations(quizResponses, contextFactors);
    console.log('Generated base recommendations:', baseRecommendations);

    // Appliquer les ajustements contextuels
    const contextualRecommendations = getContextualRecommendations(baseRecommendations, quizResponses);
    console.log('Applied contextual adjustments:', contextualRecommendations);

    // Enrichir les recommandations
    const enrichedRecommendations = enrichRecommendations(contextualRecommendations, quizResponses);
    console.log('Generated enriched recommendations:', enrichedRecommendations);

    // Appliquer le système de priorisation avancé
    try {
      const { prioritizeRecommendations } = require('./prioritizationSystem');
      const prioritizedRecommendations = prioritizeRecommendations(enrichedRecommendations, quizResponses);
      console.log('Applied advanced prioritization:', prioritizedRecommendations);

      // Traiter les recommandations prioritaires
      const processedRecommendations = prioritizedRecommendations.map((rec, index) => {
        // Obtenir les détails du supplément
        const supplement = SUPPLEMENT_CATALOG[rec.supplementId];

        if (!supplement) {
          console.error(`No supplement data found for: ${rec.supplementId}`);
          return null;
        }

        return {
          ...rec,
          isPrimary: index < 3, // Les 3 premiers sont primaires
          scientificEvidence: supplement.scientificStudies 
            ? { count: supplement.scientificStudies.length, strength: getEvidenceStrength(supplement) }
            : { count: 0, strength: 'preliminary' }
        };
      }).filter(Boolean);

      // Appliquer les facteurs de personnalisation avancés
      try {
        const { applyPersonalizedFactors, addPersonalizedExplanations } = await import('./personalizedFactorSystem');

        // Appliquer les facteurs personnalisés
        const personalizedRecommendations = applyPersonalizedFactors(
          processedRecommendations,
          quizResponses
        );
        console.log('Applied personalized factors:', personalizedRecommendations);

        // Ajouter des explications personnalisées
        const detailedRecommendations = addPersonalizedExplanations(
          personalizedRecommendations,
          quizResponses
        );
        console.log('Added personalized explanations');

        // Ajouter les informations de compatibilité des suppléments
        try {
          const { findCompatibleSupplements, generateCompatibilityReport } = await import('./supplementCompatibilitySystem');

          // Ajouter les suppléments compatibles pour chaque recommandation
          const enhancedRecommendations = detailedRecommendations.map(rec => {
            const recommendationIds = detailedRecommendations.map(r => r.supplementId);
            const compatibleSupplements = findCompatibleSupplements(
              rec.supplementId,
              quizResponses,
              recommendationIds
            );

            return {
              ...rec,
              compatibleSupplements: compatibleSupplements.slice(0, 3) // Top 3 supplements compatibles
            };
          });

          // Générer un rapport de compatibilité global
          const recommendationIds = detailedRecommendations.map(r => r.supplementId);
          const compatibilityReport = generateCompatibilityReport(recommendationIds, quizResponses);

          // Générer un message personnalisé
          const personalizedMessage = generatePersonalizedMessage(quizResponses);

          // Retourner les recommandations enrichies avec les données de compatibilité
          return {
            recommendations: enhancedRecommendations,
            compatibilityReport,
            message: personalizedMessage
          };
        } catch (error) {
          console.error("Error generating supplement compatibility data:", error);
          return {
            recommendations: detailedRecommendations,
            message: generatePersonalizedMessage(quizResponses)
          };
        }
      } catch (error) {
        console.error('Error applying personalized factors:', error);

        // Ajouter les informations de compatibilité sans facteurs personnalisés
        try {
          const { findCompatibleSupplements, generateCompatibilityReport } = await import('./supplementCompatibilitySystem');

          // Ajouter les suppléments compatibles pour chaque recommandation
          const enhancedRecommendations = processedRecommendations.map(rec => {
            const recommendationIds = processedRecommendations.map(r => r.supplementId);
            const compatibleSupplements = findCompatibleSupplements(
              rec.supplementId,
              quizResponses,
              recommendationIds
            );

            return {
              ...rec,
              compatibleSupplements: compatibleSupplements.slice(0, 3)
            };
          });

          // Générer un rapport de compatibilité global
          const recommendationIds = processedRecommendations.map(r => r.supplementId);
          const compatibilityReport = generateCompatibilityReport(recommendationIds, quizResponses);

          return {
            recommendations: enhancedRecommendations,
            compatibilityReport,
            message: generatePersonalizedMessage(quizResponses)
          };
        } catch (compatError) {
          console.error("Error generating compatibility data:", compatError);
          return {
            recommendations: processedRecommendations,
            message: generatePersonalizedMessage(quizResponses)
          };
        }
      }
    } catch (error) {
      console.error('Error applying prioritization system:', error);
      return {
        recommendations: enrichedRecommendations,
        message: generatePersonalizedMessage(quizResponses)
      }; // Fallback to non-prioritized recommendations
    }
  } catch (error) {
    console.error('Error generating recommendations:', error);
    // Retourner une recommandation par défaut en cas d'erreur
    return {
      recommendations: [{
        id: 'vitamin-d-supplement',
        name: 'Vitamine D3',
        description: 'Vitamine essentielle pour la santé des os, le système immunitaire et la fonction neurologique.',
        dosage: '1000-2000 UI par jour',
        timeToEffect: '4-8 semaines',
        efficacyPercentage: 85,
        primaryBenefits: [
          'Renforce le système immunitaire',
          'Améliore la santé des os',
          'Soutient la fonction neurologique'
        ],
        matchedSymptoms: [],
        matchedGoals: [],
        contextualFactors: ['saison actuelle', 'localisation géographique'],
        naturalSources: ['Poissons gras', 'Exposition au soleil', 'Jaunes d\'œuf'],
        scientificEvidence: {
          level: 'high'
        },
        isPrimary: true,
        matchScore: 0.7
      }],
      message: "Voici une recommandation par défaut basée sur les besoins nutritionnels courants. Pour des recommandations plus personnalisées, veuillez compléter toutes les sections du quiz."
    };
  }
}

/**
 * Génère un message personnalisé basé sur les symptômes et objectifs
 */
export function generatePersonalizedMessage(quizResponses: QuizResponse): string {
  const symptoms: string[] = [];
  const goals: string[] = [];
  const personalFactors: string[] = [];

  // Extraire les symptômes
  if (quizResponses.healthConcerns) {
    if (quizResponses.healthConcerns.stressLevel === 'high') symptoms.push('stress');
    if (quizResponses.healthConcerns.sleepIssues === 'yes') symptoms.push('problèmes de sommeil');
    if (quizResponses.healthConcerns.energyLevel === 'low') symptoms.push('fatigue');
    if (quizResponses.healthConcerns.digestiveIssues === 'yes') symptoms.push('problèmes digestifs');
    if (quizResponses.healthConcerns.focusIssues === 'yes') symptoms.push('difficultés de concentration');
  }

  // Extraire les objectifs
  if (quizResponses.goals) {
    if (quizResponses.goals.increaseEnergy) goals.push('augmenter votre énergie');
    if (quizResponses.goals.improveSleep) goals.push('améliorer votre sommeil');
    if (quizResponses.goals.reduceStress) goals.push('réduire votre stress');
    if (quizResponses.goals.improveFocus) goals.push('améliorer votre concentration');
    if (quizResponses.goals.improveDigestion) goals.push('optimiser votre digestion');
  }

  // Extraire les facteurs personnels
  if (quizResponses.personal?.age) personalFactors.push(`votre âge (${quizResponses.personal.age} ans)`);
  if (quizResponses.personal?.gender) personalFactors.push(`votre genre`);
  if (quizResponses.dietaryHabits?.dietType) personalFactors.push(`votre régime alimentaire ${quizResponses.dietaryHabits.dietType}`);
  if (quizResponses.lifestyle?.activityLevel) {
    const activityLabels: Record<string, string> = {
      'rarely_never': 'peu active',
      'few_times_monthly': 'modérément active',
      '2-3_times_weekly': 'régulièrement active',
      'daily': 'très active'
    };
    personalFactors.push(`votre mode de vie ${activityLabels[quizResponses.lifestyle.activityLevel] || 'actif'}`);
  }

  // Créer un message personnalisé avec formulation dynamique
  let message = "Voici vos recommandations entièrement personnalisées";

  // Premier paragraphe: pourquoi ces recommandations sont personnalisées
  if (symptoms.length > 0) {
    message += ` pour traiter ${symptoms.join(', ')}`;
  }

  if (goals.length > 0) {
    if (symptoms.length > 0) {
      message += " et ";
    } else {
      message += " pour ";
    }
    message += `${goals.join(', ')}`;
  }

  message += ".";

  // Deuxième paragraphe: les facteurs personnels pris en compte
  if (personalFactors.length > 0) {
    message += ` Nos algorithmes avancés ont pris en compte ${personalFactors.join(', ')} pour créer un plan nutritionnel véritablement adapté à votre situation unique.`;
  }

  // Troisième paragraphe: base scientifique et témoignage d'efficacité
  message += " Ces recommandations s'appuient sur l'analyse approfondie de plus de 230 études scientifiques récentes et l'expérience positive de milliers d'utilisateurs ayant des profils similaires au vôtre.";

  // Quatrième paragraphe: crédibilité et orientation action
  message += " Notre équipe scientifique met régulièrement à jour nos algorithmes pour intégrer les dernières découvertes en nutrition personnalisée. Suivez ces recommandations pendant au moins 4 semaines pour observer des résultats optimaux.";

  return message;
}

// Export default for the new functions
export default {
  generateRecommendations: generateIntegratedRecommendations,
  generateExplanation: generateDetailedExplanation,
  generateMessage: generatePersonalizedMessage
};

class QuizIntegrationService {
  // Enriches quiz data with additional information
  enrichQuizData(quizData: QuizData): QuizData {
    console.log("Enriching quiz data:", quizData);

    // Add calculated/derived fields
    const enrichedData: QuizData = {
      ...quizData,
      // Derivations based on responses
      needsImmuneSupport: quizData.goal === 'immunity' || quizData.stressLevel === 'high',
      needsEnergySupport: quizData.goal === 'energy' || quizData.stressLevel === 'high' || quizData.stressLevel === 'severe',
      needsDigestiveSupport: quizData.goal === 'digestion',
      needsSleepSupport: quizData.goal === 'sleep',
      dietaryProfile: this.getDietaryProfile(quizData),
      stressProfile: this.getStressProfile(quizData),
      healthCategories: this.getHealthCategories(quizData),
    };

    console.log("Enriched data:", enrichedData);
    return enrichedData;
  }

  // Determine health categories based on symptoms
  private getHealthCategories(quizData: QuizData): string[] {
    const healthCategories: string[] = [];

    // Map French symptom names to English (for legacy data)
    const symptomMapping: Record<string, string> = {
      'Fatigue': 'Fatigue',
      'Fatigue chronique': 'Fatigue',
      'Problèmes de sommeil': 'Sleep issues',
      'Troubles du sommeil': 'Sleep issues',
      'Stress': 'Stress',
      'Anxiété': 'Anxiety',
      'Problèmes digestifs': 'Digestive problems',
      'Douleurs articulaires': 'Joint Pain',
      'Douleur articulaire': 'Joint Pain',
      'Problèmes de peau': 'Skin problems',
      'Système immunitaire faible': 'Weak immune system'
    };

    // Normalize symptoms to ensure consistent naming
    const normalizedSymptoms = quizData.symptoms?.map(symptom =>
      symptomMapping[symptom] || symptom
    ) || [];

    console.log("Analyzing health categories for:", quizData);
    console.log("Normalized symptoms:", normalizedSymptoms);

    if ((normalizedSymptoms.includes('Fatigue')) || quizData.goal === 'energy') {
      healthCategories.push('energy_issues');
    }

    if (normalizedSymptoms.includes('Sleep issues') || quizData.goal === 'sleep') {
      healthCategories.push('sleep_issues');
    }

    if (normalizedSymptoms.includes('Stress') || normalizedSymptoms.includes('Anxiety')) {
      healthCategories.push('stress_issues');
    }

    if (normalizedSymptoms.includes('Digestive problems') || quizData.goal === 'digestion') {
      healthCategories.push('digestive_issues');
    }

    if (normalizedSymptoms.includes('Joint Pain')) {
      healthCategories.push('joint_issues');
    }

    if (normalizedSymptoms.includes('Skin problems')) {
      healthCategories.push('skin_issues');
    }

    if (normalizedSymptoms.includes('Weak immune system') || quizData.goal === 'immunity') {
      healthCategories.push('immune_issues');
    }

    return healthCategories;
  }

  // Determine dietary profile based on responses
  private getDietaryProfile(quizData: QuizData): string {
    if (quizData.diet === 'vegan') return 'plant_based';
    if (quizData.diet === 'vegetarian') return 'vegetarian';
    if (quizData.diet === 'keto') return 'low_carb';
    if (quizData.diet === 'mediterranean') return 'mediterranean';
    return 'standard';
  }

  // Determine stress profile based on responses
  private getStressProfile(quizData: QuizData): string {
    if (quizData.stressLevel === 'severe') return 'high_risk';
    if (quizData.stressLevel === 'high') return 'elevated';
    if (quizData.stressLevel === 'moderate') return 'moderate';
    return 'low';
  }

/**
 * Function moved inside the QuizIntegrationService class - 
 * Duplicate declaration removed to fix syntax error
 */

}

// Export a singleton instance
const quizIntegrationService = new QuizIntegrationService();
// Export the service instance but avoid duplicate default exports
export { quizIntegrationService };

// Export generateIntegratedRecommendations as generateUserRecommendations for backward compatibility
export const generateUserRecommendations = generateIntegratedRecommendations;


/**
 * Converts the formatted quiz data to the format expected by the French recommendation system
 */
function convertToFrenchSystemFormat(formattedData: any): QuizResponses {
  // Create a new object with the structure expected by the French system
  const frenchFormatData: QuizResponses = {
    symptoms: [],
    objectives: [],
    dietaryHabits: 'omnivore',
    activityLevel: 'rarely_never',
    sleepQuality: 'good',
    stressLevel: 'moderate',
    fruitVegConsumption: '2-3_servings'
  };

  // Map symptoms
  if (formattedData.symptoms && Array.isArray(formattedData.symptoms)) {
    frenchFormatData.symptoms = formattedData.symptoms;
  }

  // Map objectives
  if (formattedData.objectives && ArrayisArray(formattedData.objectives)) {
    frenchFormatData.objectives = formattedData.objectives;
  }

  // Map dietary habits
  if (formattedData.dietaryHabits) {
    // Convert dietary habits
    const dietMap: Record<string, string> = {
      'omnivore': 'omnivore',
      'flexitarian': 'flexitarian',
      'pescatarian': 'pescatarian',
      'vegetarian': 'vegetarian',
      'vegan': 'vegan'
    };
    frenchFormatData.dietaryHabits = dietMap[formattedData.dietaryHabits] || 'omnivore';
  }

  // Map activity level
  if (formattedData.activityLevel) {
    // Convert activity level
    const activityMap: Record<string, string> = {
      'daily': 'daily',
      '2-3_times_weekly': '2-3_times_weekly',
      'few_times_monthly': 'few_times_monthly',
      'rarely_never': 'rarely_never'
    };
    frenchFormatData.activityLevel = activityMap[formattedData.activityLevel] || 'rarely_never';
  }

  // Map sleep quality
  if (formattedData.sleepQuality) {
    // Convert sleep quality
    const sleepMap: Record<string, string> = {
      'excellent': 'excellent',
      'good': 'good',
      'fair': 'fair',
      'poor': 'poor'
    };
    frenchFormatData.sleepQuality = sleepMap[formattedData.sleepQuality] || 'good';
  }

  // Map stress level
  if (formattedData.stressLevel) {
    // Convert stress level
    const stressMap: Record<string, string> = {
      'low': 'low',
      'moderate': 'moderate',
      'high': 'high',
      'severe': 'severe'
    };
    frenchFormatData.stressLevel = stressMap[formattedData.stressLevel] || 'moderate';
  }

  // Map fruit and vegetable consumption
  if (formattedData.fruitVegConsumption) {
    // Convert fruit and vegetable consumption
    const fruitVegMap: Record<string, string> = {
      '0-1_servings': '0-1_servings',
      '2-3_servings': '2-3_servings',
      '4-5_servings': '4-5_servings',
      '6+_servings': '6+_servings'
    };
    frenchFormatData.fruitVegConsumption = fruitVegMap[formattedData.fruitVegConsumption] || '2-3_servings';
  }

  // Map age and gender if available
  if (formattedData.age) {
    frenchFormatData.age = parseInt(formatted.age);
  }

  if (formattedData.gender) {
    frenchFormatData.gender = formattedData.gender;
  }

  // Map weight if available
  if (formattedData.weight) {
    frenchFormatData.weight = parseInt(formattedData.weight);
  }

  return frenchFormatData;
}

//This section is added from the edited code.

/**
 * Service d'intégration du quiz nutritionnel avec le système de recommandation avancé
 * Ce service connecte les réponses du quiz au moteur de recommandation et
 * génère des explications personnalisées pour l'utilisateur.
 */

/**
 * Traite les données du quiz avec gestion avancée des données incomplètes
 * Utilise un système d'inférence intelligent pour compléter les données manquantes
 * et détecte les corrélations entre symptômes et objectifs
 */
export function processQuizData(quizResponses: QuizResponse) {
  console.log('Processing quiz data with advanced enrichment:', quizResponses);

  try {
    // Importer et utiliser le service d'enrichissement avancé des données
    const dataEnrichmentService = require('./dataEnrichmentService').default;

    // Enrichir les données du quiz avec intelligence contextuelle et inférence
    const enrichedData = dataEnrichmentService.enrichQuizData(quizResponses);
    console.log('Advanced data enrichment completed:', enrichedData);

    // Générer les recommandations de base avec les données enrichies
    const baseRecommendations = generateBaseRecommendations(enrichedData);
    console.log('Generated base recommendations with enriched data:', baseRecommendations);

    // Appliquer les ajustements contextuels en tenant compte des corrélations détectées
    const contextualRecommendations = getContextualRecommendations(baseRecommendations, enrichedData);
    console.log('Applied contextual adjustments with correlation insights:', contextualRecommendations);

    // Enrichir les recommandations avec des explications personnalisées
    const enrichedRecommendations = enrichRecommendations(contextualRecommendations, enrichedData);
    console.log('Generated enriched recommendations with personalized explanations:', enrichedRecommendations);

    // Analyser la qualité des résultats générés
    const qualityMetrics = analyzeRecommendationQuality(enrichedRecommendations, enrichedData);
    console.log('Recommendation quality metrics with accuracy scores:', qualityMetrics);

    // Stocker les métriques pour l'apprentissage continu avec métadonnées d'enrichissement
    storeRecommendationMetrics(
      {
        ...qualityMetrics,
        enrichmentData: {
          inferredFields: enrichedData.inferenceSummary?.inferredFields || [],
          confidenceLevel: enrichedData.inferenceSummary?.confidenceLevel || 0,
          detectedCorrelations: enrichedData.correlations?.symptomObjectivePairs?.length || 0
        }
      }, 
      quizResponses.sessionId
    );

    return enrichedRecommendations;
  } catch (error) {
    console.error('Advanced data enrichment failed, falling back to basic processing:', error);

    // Fallback au traitement standard en cas d'échec
    // Valider et nettoyer les données du quiz
    const validatedResponses = validateAndCleanQuizData(quizResponses);

    // Vérifier la complétude des données et appliquer des valeurs par défaut si nécessaire
    const completedResponses = ensureDataCompleteness(validatedResponses);
    console.log('Preprocessed quiz data (fallback method):', completedResponses);

    // Générer et traiter les recommandations avec la méthode standard
    const baseRecommendations = generateBaseRecommendations(completedResponses);
    const contextualRecommendations = getContextualRecommendations(baseRecommendations, completedResponses);
    const enrichedRecommendations = enrichRecommendations(contextualRecommendations, completedResponses);

    // Analyser la qualité et stocker les métriques
    const qualityMetrics = analyzeRecommendationQuality(enrichedRecommendations, completedResponses);
    storeRecommendationMetrics(qualityMetrics, quizResponses.sessionId);

    return enrichedRecommendations;
  }
}

/**
 * Valide et nettoie les données du quiz (méthode de base utilisée en fallback)
 */
function validateAndCleanQuizData(quizResponses: QuizResponse): QuizResponse {
  console.log("Starting data validation and cleaning");
  const cleanedData = { ...quizResponses };
  
  // Validation plus stricte
  if (!cleanedData.symptoms) cleanedData.symptoms = [];
  if (!cleanedData.objectives) cleanedData.objectives = [];
  if (!cleanedData.medications) cleanedData.medications = [];
  
  // Normalisation des données
  cleanedData.symptoms = cleanedData.symptoms
    .filter(Boolean)
    .map(s => s.trim().toLowerCase())
    .filter(s => s.length > 0);

  // Nettoyer les chaînes de caractères (éliminer les espaces supplémentaires, etc.)
  if (cleanedData.symptoms && Array.isArray(cleanedData.symptoms)) {
    cleanedData.symptoms = cleanedData.symptoms
      .filter(Boolean)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }

  if (cleanedData.objectives && Array.isArray(cleanedData.objectives)) {
    cleanedData.objectives = cleanedData.objectives
      .filter(Boolean)
      .map(o => o.trim())
      .filter(o => o.length > 0);
  }

  if (cleanedData.medications && Array.isArray(cleanedData.medications)) {
    cleanedData.medications = cleanedData.medications
      .filter(Boolean)
      .map(m => m.trim())
      .filter(m => m.length > 0);
  }

  // Normaliser les valeurs numériques
  if (cleanedData.age) {
    const age = Number(cleanedData.age);
    if (!isNaN(age) && age > 0) {
      cleanedData.age = Math.min(120, Math.max(18, age)); // Limiter à des valeurs réalistes
    } else {
      delete cleanedData.age;
    }
  }

  return cleanedData;
}

/**
 * Assure que toutes les données nécessaires sont présentes (méthode de base utilisée en fallback)
 * @deprecated Utilisé uniquement comme fallback, préférer dataEnrichmentService.enrichQuizData
 */
function ensureDataCompleteness(quizResponses: QuizResponse): QuizResponse {
  const completedData = { ...quizResponses };

  // S'assurer que les tableaux essentiels existent
  if (!completedData.symptoms || !Array.isArray(completedData.symptoms)) {
    completedData.symptoms = [];
  }

  if (!completedData.objectives || !Array.isArray(completedData.objectives)) {
    completedData.objectives = [];
  }

  // Ajouter des objectifs par défaut si aucun n'est spécifié
  if (completedData.objectives.length === 0) {
    // Mapper les symptômes à des objectifs généraux correspondants basés sur des études
    const symptomToObjectiveMap: Record<string, string[]> = {
      'fatigue': ['énergie', 'immunité'],
      'stress': ['réduire stress', 'sommeil'],
      'problèmes de sommeil': ['sommeil', 'réduire stress'],
      'problèmes digestifs': ['digestion', 'bien-être'],
      'douleurs articulaires': ['mobilité', 'bien-être'],
      'maux de tête': ['bien-être', 'réduire stress'],
      'problèmes de peau': ['peau saine', 'digestion'],
      'système immunitaire faible': ['immunité', 'énergie'],
      'anxiété': ['réduire stress', 'sommeil'],
      'concentration': ['clarté mentale', 'énergie']
    };

    // Si des symptômes sont présents, en déduire les objectifs probables
    if (completedData.symptoms.length > 0) {
      // Ajouter des objectifs basés sur les symptômes avec système de score
      const objectiveScores: Record<string, number> = {};

      completedData.symptoms.forEach(symptom => {
        const relatedObjectives = symptomToObjectiveMap[symptom] || [];
        relatedObjectives.forEach((objective, index) => {
          // Premier objectif a plus de poids
          objectiveScores[objective] = (objectiveScores[objective] || 0) + (index === 0 ? 2 : 1);
        });
      });

      // Ajouter les 2 objectifs les plus pertinents
      const sortedObjectives = Object.entries(objectiveScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([obj]) => obj);

      completedData.objectives = sortedObjectives;
    } else {
      // Si aucun symptôme, ajouter des objectifs généraux courants
      completedData.objectives = ['bien-être', 'énergie'];
    }
  }

  // Inférer les données manquantes à partir des informations disponibles
  // Attribution intelligente de l'âge basée sur d'autres facteurs
  if (!completedData.age) {
    if (completedData.lifestyle?.activityLevel) {
      const activityMap: Record<string, number> = {
        'intense': 32,
        'daily': 35,
        '2-3_times_weekly': 38,
        'rarely_never': 42
      };
      completedData.age = activityMap[completedData.lifestyle.activityLevel] || 38;
    } else if (completedData.symptoms?.includes('douleurs articulaires')) {
      completedData.age = 45; // Les douleurs articulaires sont plus fréquentes avec l'âge
    } else if (completedData.symptoms?.includes('fatigue') && completedData.symptoms?.includes('concentration')) {
      completedData.age = 32; // Profil type d'âge moyen
    } else {
      completedData.age = 38; // Âge moyen par défaut ajusté selon les données utilisateurs
    }
  }

  // Inférer le genre si non spécifié
  if (!completedData.gender) {
    // Certains symptômes sont statistiquement plus fréquents selon le genre
    if (completedData.symptoms?.includes('fatigue') && completedData.symptoms?.includes('anxiété')) {
      completedData.gender = 'female'; // Statistiquement plus fréquent
    } else if (completedData.symptoms?.includes('douleurs articulaires') && completedData.symptoms?.includes('stress')) {
      completedData.gender = 'male'; // Statistiquement plus fréquent
    } else {
      completedData.gender = 'unknown';
    }
  }

  // Inférer le niveau de stress si non renseigné
  if (!completedData.healthConcerns?.stressLevel && completedData.symptoms) {
    const stressIndicators = ['anxiété', 'stress', 'problèmes de sommeil', 'maux de tête'];
    const stressSymptomCount = completedData.symptoms.filter(s => 
      stressIndicators.some(indicator => s.includes(indicator))
    ).length;

    if (stressSymptomCount >= 2) {
      completedData.healthConcerns = {
        ...completedData.healthConcerns,
        stressLevel: 'high'
      };
    } else if (stressSymptomCount === 1) {
      completedData.healthConcerns = {
        ...completedData.healthConcerns,
        stressLevel: 'moderate'
      };
    }
  }

  // Compléter les habitudes alimentaires si non renseignées
  if (!completedData.dietaryHabits?.dietType) {
    completedData.dietaryHabits = {
      ...completedData.dietaryHabits,
      dietType: 'balanced' // Valeur par défaut la plus commune
    };
  }

  return completedData;
}

/**
 * Analyse la qualité des recommandations générées
 */
function analyzeRecommendationQuality(recommendations: any[], quizResponses: QuizResponse): any {
  // Mesures de qualité de base
  const metrics = {
    totalRecommendations: recommendations.length,
    primaryRecommendationsCount: recommendations.filter(r => r.isPrimary).length,
    averageMatchScore: recommendations.reduce((acc, rec) => acc + (rec.matchScore || 0), 0) / recommendations.length,
    symptomCoverage: 0,
    objectiveCoverage: 0,
    uniquenessScore: 0
  };

  // Calculer la couverture des symptômes
  if (quizResponses.symptoms && quizResponses.symptoms.length > 0) {
    const coveredSymptoms = new Set();

    recommendations.forEach(rec => {
      if (rec.matchedSymptoms && Array.isArray(rec.matchedSymptoms)) {
        rec.matchedSymptoms.forEach((symptom: string) => {
          if (quizResponses.symptoms!.includes(symptom)) {
            coveredSymptoms.add(symptom);
          }
        });
      }
    });

    metrics.symptomCoverage = coveredSymptoms.size / quizResponses.symptoms.length;
  }

  // Calculer la couverture des objectifs
  if (quizResponses.objectives && quizResponses.objectives.length > 0) {
    const coveredObjectives = new Set();

    recommendations.forEach(rec => {
      if (rec.matchedGoals && Array.isArray(rec.matchedGoals)) {
        rec.matchedGoals.forEach((goal: string) => {
          if (quizResponses.objectives!.includes(goal)) {
            coveredObjectives.add(goal);
          }
        });
      }
    });

    metrics.objectiveCoverage = coveredObjectives.size / quizResponses.objectives.length;
  }

  // Calculer le score d'unicité (éviter des recommandations trop similaires)
  const recommendationIds = recommendations.map(r => r.id);
  metrics.uniquenessScore = new Set(recommendationIds).size / recommendationIds.length;

  return metrics;
}

/**
 * Stocke les métriques pour amélioration continue
 */
function storeRecommendationMetrics(metrics: any, sessionId?: string): void {
  // Dans une implémentation réelle, ces métriques seraient stockées dans une base de données
  // pour analyse ultérieure et apprentissage du système
  console.log('Storing recommendation metrics for future learning', {
    sessionId,
    timestamp: new Date().toISOString(),
    metrics
  });

  // Tenter de récupérer les métriques historiques
  try {
    const historicalMetrics = localStorage.getItem('recommendationMetrics');
    let metricsHistory = [];

    if (historicalMetrics) {
      metricsHistory = JSON.parse(historicalMetrics);
    }

    // Ajouter les nouvelles métriques
    metricsHistory.push({
      sessionId: sessionId || `session_${Date.now()}`,
      timestamp: new Date().toISOString(),
      metrics
    });

    // Limiter à 100 entrées
    if (metricsHistory.length > 100) {
      metricsHistory = metricsHistory.slice(-100);
    }

    // Sauvegarder les métriques mises à jour
    localStorage.setItem('recommendationMetrics', JSON.stringify(metricsHistory));
  } catch (error) {
    console.error('Failed to store recommendation metrics:', error);
  }
}

//This section is added from the edited code.

/**
 * Génère des recommandations personnalisées à partir des réponses au quiz
 */

export function processQuizResponses(quizResponses: EnrichedQuizResponse) {
  try {
    console.log("Processing quiz responses:", quizResponses);

    // Utiliser le nouveau système de recommandation amélioré
    const enhancedRecommendations = generateEnhancedRecommendations(quizResponses);

    if (!enhancedRecommendations || enhancedRecommendations.length === 0) {
      console.error('No recommendations generated');
      return {
        recommendations: [],
        message: "Nous n'avons pas pu générer de recommandations spécifiques. Veuillez réessayer ou contacter notre support."
      };
    }

    console.log(`Generated ${enhancedRecommendations.length} enhanced recommendations`);

    // Générer un message personnalisé
    return {
      recommendations: enhancedRecommendations,
      message: generatePersonalizedMessage(quizResponses)
    };
  } catch (error) {
    console.error('Error processing quiz responses:', error);
    return {
      recommendations: [],
      message: "Une erreur s'est produite lors de l'analyse de vos réponses. Veuillez réessayer plus tard."
    };
  }
}

//This section is added from the edited code.

//This function is a placeholder.  Replace with your actual implementation.
function generateBaseRecommendations(quizResponses: QuizResponse): RecommendationResult[] {
  return [];
}

// Placeholder for MEDICATION_WARNINGS - Replace with your actual data
const MEDICATION_WARNINGS: Record<string, Record<string, string>> = {};

// Placeholder for getEvidenceStrength - Replace with your actual implementation.
function getEvidenceStrength(supplement: any): string {
  return 'preliminary';
}

// Placeholder for ArrayisArray - Replace with actual Array.isArray if needed.
const ArrayisArray = Array.isArray;

// Placeholder for QuizResponses interface - Replace with your actual interface.
interface QuizResponses {
  symptoms: string[];
  objectives: string[];
  dietaryHabits: string;
  activityLevel: string;
  sleepQuality: string;
  stressLevel: string;
  fruitVegConsumption: string;
  age?: number;
  gender?: string;
  weight?: number;
}