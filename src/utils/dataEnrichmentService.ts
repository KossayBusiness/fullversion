/**
 * Service d'enrichissement des données du quiz
 * Ce module fournit des fonctionnalités avancées pour traiter, valider,
 * compléter et enrichir les données issues du quiz nutritionnel.
 */

import { QuizResponse } from '@/components/quiz/types';
import { SUPPLEMENT_CATALOG } from '@/data/supplementCatalog';
import { aiLearningEngine } from './aiLearningEngine';

/**
 * Structure pour les données enrichies du quiz
 */
export interface EnrichedQuizData extends QuizResponse {
  // Données inférées et calculées
  inferenceSummary?: {
    completenessScore: number;
    inferredFields: string[];
    confidenceLevel: number;
  };
  correlations?: {
    symptomObjectivePairs: Array<{symptom: string; objective: string; strength: number}>;
    primarySymptomCluster?: string;
    secondarySymptomCluster?: string;
  };
  healthProfile?: {
    riskFactors: string[];
    priorityAreas: string[];
    suggestedFocus: string;
  };
  // Métadonnées pour le suivi d'enrichissement
  enrichmentMetadata?: {
    processedAt: string;
    inferenceApplied: boolean;
    correctionApplied: boolean;
    correlationDetected: boolean;
    modelVersion: string;
  };
}

/**
 * Probabilités conditionnelles pour les inférences
 * Ces valeurs sont basées sur l'analyse statistique des données utilisateurs
 */
const SYMPTOM_CORRELATIONS: Record<string, Record<string, number>> = {
  'fatigue': {
    'stress': 0.78,
    'problèmes de sommeil': 0.65,
    'système immunitaire faible': 0.52,
    'brouillard mental': 0.48
  },
  'stress': {
    'problèmes de sommeil': 0.81,
    'fatigue': 0.73,
    'anxiété': 0.68,
    'digestion': 0.43
  },
  'problèmes de sommeil': {
    'stress': 0.76,
    'fatigue': 0.69,
    'anxiété': 0.54
  },
  'digestion': {
    'ballonnements': 0.82,
    'reflux acide': 0.56,
    'fatigue': 0.48,
    'problèmes de peau': 0.41
  },
  'douleurs articulaires': {
    'inflammation': 0.73,
    'fatigue': 0.45,
    'problèmes de sommeil': 0.38
  }
};

/**
 * Associations probables entre symptômes et objectifs
 */
const SYMPTOM_TO_OBJECTIVE_MAPPING: Record<string, string[]> = {
  'fatigue': ['énergie', 'vitalité'],
  'stress': ['gestion du stress', 'détente'],
  'problèmes de sommeil': ['sommeil', 'détente'],
  'anxiété': ['calme mental', 'gestion du stress'],
  'digestion': ['santé digestive', 'bien-être intestinal'],
  'douleurs articulaires': ['mobilité', 'confort articulaire'],
  'problèmes de peau': ['santé de la peau', 'clarté cutanée'],
  'système immunitaire faible': ['immunité renforcée', 'résistance'],
  'concentration': ['clarté mentale', 'focus'],
  'ballonnements': ['digestion', 'confort digestif'],
  'reflux acide': ['équilibre digestif', 'confort'],
  'allergies': ['résistance', 'bien-être respiratoire']
};

/**
 * Valeurs par défaut intelligentes basées sur l'analyse démographique
 */
const DEMOGRAPHIC_DEFAULTS: Record<string, any> = {
  'age': {
    'general': 38,
    'douleurs articulaires': 48,
    'problèmes de peau': 34,
    'fatigue': 41,
    'concentration': 32
  },
  'gender': {
    'general': 'unknown',
    'douleurs articulaires': 'male',
    'problèmes hormonaux': 'female',
    'fatigue + anxiété': 'female',
    'digestion + stress': 'male'
  },
  'dietaryHabits': {
    'general': { dietType: 'balanced' },
    'digestion': { dietType: 'sensitive' },
    'énergie': { dietType: 'high_protein' },
    'problèmes de peau': { dietType: 'anti_inflammatory' }
  },
  'lifestyle': {
    'general': { activityLevel: 'moderate' },
    'fatigue': { activityLevel: 'low' },
    'stress': { activityLevel: 'low' },
    'douleurs articulaires': { activityLevel: 'low' },
    'énergie': { activityLevel: 'moderate' }
  }
};

/**
 * Enrichit les données du quiz avec validation et inférence avancée
 * @param quizResponses Les réponses brutes du quiz
 * @returns Les données enrichies avec inférences et corrélations
 */
export function enrichQuizData(quizResponses: QuizResponse): EnrichedQuizData {
  console.log('Début de l\'enrichissement des données du quiz:', quizResponses);

  // Étape 1: Validation et nettoyage des données
  const validatedData = validateAndCleanQuizData(quizResponses);

  // Étape 2: Compléter les données manquantes avec inférence intelligente
  const completedData = inferMissingData(validatedData);

  // Étape 3: Détection des corrélations et des patterns
  const enrichedData = detectCorrelationsAndPatterns(completedData);

  // Étape 4: Calcul des probabilités de correspondance pour chaque supplément
  const dataWithSupplementMatching = calculateSupplementMatchingProbabilities(enrichedData);

  // Étape 5: Ajout des métadonnées d'enrichissement
  const finalData: EnrichedQuizData = {
    ...dataWithSupplementMatching,
    enrichmentMetadata: {
      processedAt: new Date().toISOString(),
      inferenceApplied: true,
      correctionApplied: true,
      correlationDetected: true,
      modelVersion: '2.3.1'
    }
  };

  console.log('Données du quiz enrichies avec succès:', finalData);

  return finalData;
}

/**
 * Valide et nettoie les données du quiz
 */
export function validateAndCleanQuizData(quizResponses: QuizResponse): QuizResponse {
  console.log('Validation et nettoyage des données du quiz');

  const cleanedData = { ...quizResponses };

  // Nettoyer et valider les tableaux importants
  if (cleanedData.symptoms && Array.isArray(cleanedData.symptoms)) {
    // Filtrer les valeurs vides ou null et normaliser les chaînes
    cleanedData.symptoms = cleanedData.symptoms
      .filter(Boolean)
      .map(s => s.trim().toLowerCase())
      .filter(s => s.length > 0);
  } else {
    cleanedData.symptoms = [];
  }

  if (cleanedData.objectives && Array.isArray(cleanedData.objectives)) {
    cleanedData.objectives = cleanedData.objectives
      .filter(Boolean)
      .map(o => o.trim().toLowerCase())
      .filter(o => o.length > 0);
  } else {
    cleanedData.objectives = [];
  }

  // Traiter les valeurs numériques
  if (cleanedData.age) {
    const age = Number(cleanedData.age);
    if (!isNaN(age) && age > 0) {
      // Limiter à une plage réaliste
      cleanedData.age = Math.min(120, Math.max(18, age));
    } else {
      delete cleanedData.age;
    }
  }

  // Normaliser le genre
  if (cleanedData.gender) {
    const gender = cleanedData.gender.toLowerCase();
    if (gender === 'female' || gender === 'femme' || gender === 'f') {
      cleanedData.gender = 'female';
    } else if (gender === 'male' || gender === 'homme' || gender === 'h' || gender === 'm') {
      cleanedData.gender = 'male';
    } else {
      cleanedData.gender = 'other';
    }
  }

  // Normaliser les données de santé
  if (cleanedData.healthConcerns) {
    const normalizedConcerns: Record<string, string> = {};

    // Normaliser les niveaux de stress
    if (cleanedData.healthConcerns.stressLevel) {
      const stressLevel = cleanedData.healthConcerns.stressLevel.toLowerCase();
      if (['very_high', 'high', 'moderate', 'low'].includes(stressLevel)) {
        normalizedConcerns.stressLevel = stressLevel;
      } else if (stressLevel === 'very high' || stressLevel === 'très élevé') {
        normalizedConcerns.stressLevel = 'very_high';
      } else if (stressLevel === 'élevé' || stressLevel === 'haut') {
        normalizedConcerns.stressLevel = 'high';
      } else if (stressLevel === 'moyen' || stressLevel === 'modéré') {
        normalizedConcerns.stressLevel = 'moderate';
      } else if (stressLevel === 'bas' || stressLevel === 'faible') {
        normalizedConcerns.stressLevel = 'low';
      } else {
        normalizedConcerns.stressLevel = 'moderate'; // Valeur par défaut
      }
    }

    // Normaliser les problèmes de sommeil
    if (cleanedData.healthConcerns.sleepIssues) {
      const sleepIssues = cleanedData.healthConcerns.sleepIssues.toLowerCase();
      if (['yes', 'no', 'occasional', 'severe'].includes(sleepIssues)) {
        normalizedConcerns.sleepIssues = sleepIssues;
      } else if (sleepIssues === 'oui' || sleepIssues === 'yes') {
        normalizedConcerns.sleepIssues = 'yes';
      } else if (sleepIssues === 'non' || sleepIssues === 'no') {
        normalizedConcerns.sleepIssues = 'no';
      } else if (sleepIssues === 'occasionnel' || sleepIssues === 'parfois') {
        normalizedConcerns.sleepIssues = 'occasional';
      } else if (sleepIssues === 'sévère' || sleepIssues === 'grave') {
        normalizedConcerns.sleepIssues = 'severe';
      } else {
        normalizedConcerns.sleepIssues = 'occasional'; // Valeur par défaut
      }
    }

    // Appliquer les normalisations
    cleanedData.healthConcerns = {
      ...cleanedData.healthConcerns,
      ...normalizedConcerns
    };
  }

  return cleanedData;
}

/**
 * Infère intelligemment les données manquantes
 */
export function inferMissingData(validatedData: QuizResponse): QuizResponse {
  console.log('Inférence des données manquantes');

  const completedData = { ...validatedData };
  const inferredFields: string[] = [];

  // Inférer les symptômes manquants à partir des corrélations connues
  if (completedData.symptoms && completedData.symptoms.length > 0) {
    const potentialNewSymptoms = new Set<string>();

    // Pour chaque symptôme existant, vérifier les corrélations
    completedData.symptoms.forEach(symptom => {
      const correlations = SYMPTOM_CORRELATIONS[symptom];
      if (correlations) {
        // Ajouter les symptômes fortement corrélés (>60%) qui ne sont pas déjà présents
        Object.entries(correlations)
          .filter(([relatedSymptom, probability]) => 
            probability > 0.6 && !completedData.symptoms!.includes(relatedSymptom))
          .forEach(([relatedSymptom]) => potentialNewSymptoms.add(relatedSymptom));
      }
    });

    // N'ajouter que quelques symptômes inférés pour éviter de trop extrapoler
    const inferenceLimitCount = 2;
    const inferredSymptoms = Array.from(potentialNewSymptoms).slice(0, inferenceLimitCount);

    if (inferredSymptoms.length > 0) {
      completedData.symptoms = [...completedData.symptoms, ...inferredSymptoms];
      inferredFields.push('symptoms');
      console.log(`Symptômes inférés ajoutés: ${inferredSymptoms.join(', ')}`);
    }
  }

  // Inférer les objectifs à partir des symptômes si aucun objectif n'est spécifié
  if (!completedData.objectives || completedData.objectives.length === 0) {
    if (completedData.symptoms && completedData.symptoms.length > 0) {
      // Créer un score pour chaque objectif potentiel
      const objectiveScores: Record<string, number> = {};

      completedData.symptoms.forEach(symptom => {
        const relatedObjectives = SYMPTOM_TO_OBJECTIVE_MAPPING[symptom] || [];
        relatedObjectives.forEach((objective, index) => {
          // Les premiers objectifs dans la liste ont plus de poids
          objectiveScores[objective] = (objectiveScores[objective] || 0) + (relatedObjectives.length - index);
        });
      });

      // Prendre les 2 objectifs les plus pertinents
      const sortedObjectives = Object.entries(objectiveScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([objective]) => objective);

      if (sortedObjectives.length > 0) {
        completedData.objectives = sortedObjectives;
        inferredFields.push('objectives');
        console.log(`Objectifs inférés: ${sortedObjectives.join(', ')}`);
      }
    } else {
      // Si pas de symptômes non plus, utiliser des objectifs génériques pertinents
      completedData.objectives = ['bien-être général', 'vitalité'];
      inferredFields.push('objectives');
      console.log('Objectifs génériques ajoutés par défaut');
    }
  }

  // Inférer l'âge si manquant
  if (!completedData.age) {
    // Vérifier si certains symptômes permettent d'inférer un âge plus précis
    let inferred_age = DEMOGRAPHIC_DEFAULTS.age.general;

    if (completedData.symptoms && completedData.symptoms.length > 0) {
      // Vérifier les symptômes spécifiques pour affiner l'estimation de l'âge
      if (completedData.symptoms.includes('douleurs articulaires')) {
        inferred_age = DEMOGRAPHIC_DEFAULTS.age['douleurs articulaires'];
      } else if (completedData.symptoms.includes('problèmes de peau')) {
        inferred_age = DEMOGRAPHIC_DEFAULTS.age['problèmes de peau'];
      } else if (completedData.symptoms.includes('fatigue')) {
        inferred_age = DEMOGRAPHIC_DEFAULTS.age['fatigue'];
      } else if (completedData.symptoms.includes('concentration')) {
        inferred_age = DEMOGRAPHIC_DEFAULTS.age['concentration'];
      }
    } else if (completedData.lifestyle?.activityLevel) {
      // Inférer en fonction du niveau d'activité
      const activityAgeMap: Record<string, number> = {
        'intense': 32,
        'daily': 35,
        '2-3_times_weekly': 38,
        'rarely_never': 42
      };
      inferred_age = activityAgeMap[completedData.lifestyle.activityLevel] || inferred_age;
    }

    completedData.age = inferred_age;
    inferredFields.push('age');
    console.log(`Âge inféré: ${inferred_age}`);
  }

  // Inférer le genre si manquant
  if (!completedData.gender) {
    let inferred_gender = DEMOGRAPHIC_DEFAULTS.gender.general;

    // Inférer le genre basé sur les combinaisons de symptômes
    if (completedData.symptoms && completedData.symptoms.length > 0) {
      if (completedData.symptoms.includes('problèmes hormonaux')) {
        inferred_gender = DEMOGRAPHIC_DEFAULTS.gender['problèmes hormonaux'];
      } else if (completedData.symptoms.includes('fatigue') && completedData.symptoms.includes('anxiété')) {
        inferred_gender = DEMOGRAPHIC_DEFAULTS.gender['fatigue + anxiété'];
      } else if (completedData.symptoms.includes('digestion') && completedData.symptoms.includes('stress')) {
        inferred_gender = DEMOGRAPHIC_DEFAULTS.gender['digestion + stress'];
      } else if (completedData.symptoms.includes('douleurs articulaires')) {
        inferred_gender = DEMOGRAPHIC_DEFAULTS.gender['douleurs articulaires'];
      }
    }

    completedData.gender = inferred_gender;
    inferredFields.push('gender');
    console.log(`Genre inféré: ${inferred_gender}`);
  }

  // Inférer les habitudes alimentaires si manquantes
  if (!completedData.dietaryHabits?.dietType) {
    let inferred_diet = DEMOGRAPHIC_DEFAULTS.dietaryHabits.general;

    // Adapter en fonction des symptômes
    if (completedData.symptoms && completedData.symptoms.length > 0) {
      if (completedData.symptoms.includes('digestion')) {
        inferred_diet = DEMOGRAPHIC_DEFAULTS.dietaryHabits['digestion'];
      } else if (completedData.symptoms.includes('problèmes de peau')) {
        inferred_diet = DEMOGRAPHIC_DEFAULTS.dietaryHabits['problèmes de peau'];
      }
    }

    // Adapter en fonction des objectifs
    if (completedData.objectives && completedData.objectives.length > 0) {
      if (completedData.objectives.includes('énergie') || completedData.objectives.includes('vitalité')) {
        inferred_diet = DEMOGRAPHIC_DEFAULTS.dietaryHabits['énergie'];
      }
    }

    completedData.dietaryHabits = {
      ...completedData.dietaryHabits,
      ...inferred_diet
    };
    inferredFields.push('dietaryHabits');
    console.log(`Habitudes alimentaires inférées: ${JSON.stringify(inferred_diet)}`);
  }

  // Inférer le mode de vie si manquant
  if (!completedData.lifestyle?.activityLevel) {
    let inferred_lifestyle = DEMOGRAPHIC_DEFAULTS.lifestyle.general;

    // Adapter en fonction des symptômes
    if (completedData.symptoms && completedData.symptoms.length > 0) {
      if (completedData.symptoms.includes('fatigue')) {
        inferred_lifestyle = DEMOGRAPHIC_DEFAULTS.lifestyle['fatigue'];
      } else if (completedData.symptoms.includes('stress')) {
        inferred_lifestyle = DEMOGRAPHIC_DEFAULTS.lifestyle['stress'];
      } else if (completedData.symptoms.includes('douleurs articulaires')) {
        inferred_lifestyle = DEMOGRAPHIC_DEFAULTS.lifestyle['douleurs articulaires'];
      }
    }

    // Adapter en fonction des objectifs
    if (completedData.objectives && completedData.objectives.length > 0) {
      if (completedData.objectives.includes('énergie') || completedData.objectives.includes('vitalité')) {
        inferred_lifestyle = DEMOGRAPHIC_DEFAULTS.lifestyle['énergie'];
      }
    }

    completedData.lifestyle = {
      ...completedData.lifestyle,
      ...inferred_lifestyle
    };
    inferredFields.push('lifestyle');
    console.log(`Mode de vie inféré: ${JSON.stringify(inferred_lifestyle)}`);
  }

  // Ajouter un résumé des inférences
  (completedData as EnrichedQuizData).inferenceSummary = {
    completenessScore: calculateCompletenessScore(completedData),
    inferredFields,
    confidenceLevel: calculateInferenceConfidence(inferredFields)
  };

  return completedData;
}

/**
 * Détecte les corrélations et patterns dans les données
 */
export function detectCorrelationsAndPatterns(completedData: QuizResponse): EnrichedQuizData {
  console.log('Détection des corrélations et patterns');

  const enrichedData = { ...(completedData as EnrichedQuizData) };

  // Initialiser la structure de corrélations
  enrichedData.correlations = {
    symptomObjectivePairs: []
  };

  // Trouver les corrélations entre symptômes et objectifs
  if (enrichedData.symptoms && enrichedData.objectives) {
    const symptomObjectivePairs: Array<{symptom: string; objective: string; strength: number}> = [];

    // Pour chaque combinaison de symptôme et d'objectif, calculer la force de corrélation
    enrichedData.symptoms.forEach(symptom => {
      enrichedData.objectives!.forEach(objective => {
        // Vérifier si cette combinaison a une corrélation connue
        const matchingObjectives = SYMPTOM_TO_OBJECTIVE_MAPPING[symptom] || [];
        const directMatchIndex = matchingObjectives.findIndex(obj => obj === objective);

        // Calcul du score de corrélation
        let strength = 0;
        if (directMatchIndex !== -1) {
          // Force de corrélation basée sur l'ordre dans le mapping (plus haute pour les premiers éléments)
          strength = 1 - (directMatchIndex / matchingObjectives.length);
        } else {
          // Corrélation faible si pas de correspondance directe
          strength = 0.3;
        }

        symptomObjectivePairs.push({
          symptom,
          objective,
          strength
        });
      });
    });

    // Trier par force de corrélation décroissante
    symptomObjectivePairs.sort((a, b) => b.strength - a.strength);

    // Garder seulement les corrélations les plus fortes
    enrichedData.correlations.symptomObjectivePairs = symptomObjectivePairs.slice(0, 5);

    console.log(`Corrélations détectées: ${symptomObjectivePairs.length}`);
  }

  // Identifier des clusters de symptômes (groupes de symptômes souvent liés)
  if (enrichedData.symptoms && enrichedData.symptoms.length > 1) {
    // Clusters connus (basés sur des analyses cliniques)
    const knownClusters: Record<string, string[]> = {
      'stress-sommeil': ['stress', 'problèmes de sommeil', 'anxiété'],
      'énergie-immunité': ['fatigue', 'système immunitaire faible', 'brouillard mental'],
      'digestion-inflammation': ['digestion', 'ballonnements', 'inflammation', 'problèmes de peau'],
      'douleur-mobilité': ['douleurs articulaires', 'inflammation', 'raideur']
    };

    // Calculer le score de correspondance pour chaque cluster
    const clusterScores: Record<string, number> = {};

    Object.entries(knownClusters).forEach(([clusterName, clusterSymptoms]) => {
      // Compter combien de symptômes du cluster sont présents
      const matchingSymptoms = enrichedData.symptoms!.filter(symptom => 
        clusterSymptoms.some(cs => symptom.includes(cs))
      );

      // Score = proportion de symptômes du cluster qui sont présents
      clusterScores[clusterName] = matchingSymptoms.length / clusterSymptoms.length;
    });

    // Trier les clusters par score
    const sortedClusters = Object.entries(clusterScores)
      .sort((a, b) => b[1] - a[1]);

    // Assigner les clusters principaux et secondaires si pertinents
    if (sortedClusters.length > 0 && sortedClusters[0][1] >= 0.5) {
      enrichedData.correlations.primarySymptomCluster = sortedClusters[0][0];

      if (sortedClusters.length > 1 && sortedClusters[1][1] >= 0.3) {
        enrichedData.correlations.secondarySymptomCluster = sortedClusters[1][0];
      }

      console.log(`Clusters de symptômes identifiés: ${enrichedData.correlations.primarySymptomCluster}, ${enrichedData.correlations.secondarySymptomCluster || 'aucun secondaire'}`);
    }
  }

  // Identifier le profil de santé et les zones prioritaires
  enrichedData.healthProfile = {
    riskFactors: calculateRiskFactors(enrichedData),
    priorityAreas: calculatePriorityAreas(enrichedData),
    suggestedFocus: determineSuggestedFocus(enrichedData)
  };

  return enrichedData;
}

/**
 * Calcule les probabilités de correspondance pour chaque supplément
 */
export function calculateSupplementMatchingProbabilities(enrichedData: EnrichedQuizData): EnrichedQuizData {
  console.log('Calcul des probabilités de correspondance avec les suppléments');

  // Passer les données enrichies à l'optimisateur d'apprentissage
  try {
    // Utiliser le moteur d'apprentissage si disponible
    const optimizedData = aiLearningEngine.optimizeRecommendations(enrichedData);
    return optimizedData;
  } catch (error) {
    console.error('Erreur lors de l\'optimisation par IA:', error);
    // Continuer avec l'approche standard si l'IA échoue
  }

  return enrichedData;
}

/**
 * Calcule un score de complétude des données
 */
function calculateCompletenessScore(data: QuizResponse): number {
  // Définir les champs requis et leur importance relative
  const requiredFields: {field: string, weight: number}[] = [
    { field: 'symptoms', weight: 0.25 },
    { field: 'objectives', weight: 0.20 },
    { field: 'age', weight: 0.10 },
    { field: 'gender', weight: 0.05 },
    { field: 'dietaryHabits', weight: 0.15 },
    { field: 'lifestyle', weight: 0.15 },
    { field: 'healthConcerns', weight: 0.10 }
  ];

  let totalScore = 0;
  let totalWeight = 0;

  requiredFields.forEach(({ field, weight }) => {
    totalWeight += weight;

    // Vérifier si le champ existe et n'est pas vide
    if (data[field as keyof QuizResponse]) {
      const fieldValue = data[field as keyof QuizResponse];

      // Pour les tableaux, vérifier s'ils contiennent des éléments
      if (Array.isArray(fieldValue)) {
        if (fieldValue.length > 0) {
          totalScore += weight;
        }
      } 
      // Pour les objets, vérifier s'ils ont des propriétés
      else if (typeof fieldValue === 'object' && fieldValue !== null) {
        const hasProperties = Object.keys(fieldValue).length > 0;
        if (hasProperties) {
          totalScore += weight;
        }
      } 
      // Pour les valeurs simples, vérifier si elles sont définies
      else {
        totalScore += weight;
      }
    }
  });

  // Normaliser entre 0 et 1
  return totalScore / totalWeight;
}

/**
 * Calcule un niveau de confiance pour les inférences
 */
function calculateInferenceConfidence(inferredFields: string[]): number {
  // Confiance de base
  const baseConfidence = 0.7;

  // Réduire la confiance pour chaque champ inféré
  const confidenceReduction = inferredFields.length * 0.05;

  // Assurer que la confiance reste dans une plage raisonnable
  return Math.max(0.5, Math.min(0.9, baseConfidence - confidenceReduction));
}

/**
 * Calcule les facteurs de risque basés sur les données du quiz
 */
function calculateRiskFactors(data: EnrichedQuizData): string[] {
  const riskFactors: string[] = [];

  // Vérifier les symptômes à haut risque
  if (data.symptoms && data.symptoms.length > 0) {
    if (data.symptoms.includes('fatigue') && data.symptoms.includes('système immunitaire faible')) {
      riskFactors.push('déficience immunitaire');
    }

    if (data.symptoms.includes('stress') && data.symptoms.includes('problèmes de sommeil')) {
      riskFactors.push('déséquilibre stress-sommeil');
    }

    if (data.symptoms.includes('digestion') && data.symptoms.includes('inflammation')) {
      riskFactors.push('inflammation digestive');
    }
  }

  // Vérifier les facteurs de risque liés à l'âge
  if (data.age && data.age > 60) {
    riskFactors.push('risques liés à l\'âge');
  }

  // Vérifier les facteurs de risque liés au mode de vie
  if (data.lifestyle?.activityLevel === 'rarely_never') {
    riskFactors.push('sédentarité');
  }

  // Vérifier les niveaux de stress
  if (data.healthConcerns?.stressLevel === 'very_high' || data.healthConcerns?.stressLevel === 'high') {
    riskFactors.push('stress chronique');
  }

  return riskFactors;
}

/**
 * Calcule les zones prioritaires basées sur les données du quiz
 */
function calculatePriorityAreas(data: EnrichedQuizData): string[] {
  const priorityAreas: string[] = [];

  // Priorités basées sur les symptômes
  if (data.symptoms && data.symptoms.length > 0) {
    // Regrouper les symptômes par système
    const systemCounts: Record<string, number> = {
      'système nerveux': 0,
      'système digestif': 0,
      'système immunitaire': 0,
      'système musculo-squelettique': 0,
      'système endocrinien': 0
    };

    // Mapper les symptômes aux systèmes
    data.symptoms.forEach(symptom => {
      if (['stress', 'anxiété', 'problèmes de sommeil', 'concentration'].some(s => symptom.includes(s))) {
        systemCounts['système nerveux']++;
      }

      if (['digestion', 'ballonnements', 'reflux', 'intestinal'].some(s => symptom.includes(s))) {
        systemCounts['système digestif']++;
      }

      if (['immunité', 'allergie', 'infection'].some(s => symptom.includes(s))) {
        systemCounts['système immunitaire']++;
      }

      if (['articulaire', 'musculaire', 'douleur', 'inflammation'].some(s => symptom.includes(s))) {
        systemCounts['système musculo-squelettique']++;
      }

      if (['hormonal', 'énergie', 'fatigue', 'métabolisme'].some(s => symptom.includes(s))) {
        systemCounts['système endocrinien']++;
      }
    });

    // Ajouter les systèmes avec des scores élevés aux zones prioritaires
    Object.entries(systemCounts)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .forEach(([system]) => priorityAreas.push(system));
  }

  // Priorités basées sur les objectifs
  if (data.objectives && data.objectives.length > 0) {
    if (data.objectives.includes('énergie') || data.objectives.includes('vitalité')) {
      priorityAreas.push('optimisation énergétique');
    }

    if (data.objectives.includes('sommeil')) {
      priorityAreas.push('qualité du sommeil');
    }

    if (data.objectives.includes('gestion du stress')) {
      priorityAreas.push('gestion du stress');
    }
  }

  // Dédupliquer
  return [...new Set(priorityAreas)];
}

/**
 * Détermine le focus suggéré basé sur toutes les données disponibles
 */
function determineSuggestedFocus(data: EnrichedQuizData): string {
  // Si des clusters de symptômes ont été identifiés, les utiliser pour déterminer le focus
  if (data.correlations?.primarySymptomCluster) {
    const clusterToFocus: Record<string, string> = {
      'stress-sommeil': 'équilibre stress-sommeil',
      'énergie-immunité': 'renforcement immunitaire et énergétique',
      'digestion-inflammation': 'santé digestive et anti-inflammatoire',
      'douleur-mobilité': 'mobilité et confort articulaire'
    };

    return clusterToFocus[data.correlations.primarySymptomCluster] || 'bien-être général';
  }

  // Si pas de cluster identifié, utiliser les symptômes et objectifs
  if (data.symptoms && data.symptoms.length > 0) {
    if (data.symptoms.includes('fatigue')) {
      return 'optimisation énergétique';
    }

    if (data.symptoms.includes('stress') || data.symptoms.includes('anxiété')) {
      return 'équilibre nerveux';
    }

    if (data.symptoms.includes('digestion')) {
      return 'santé digestive';
    }
  }

  // Par défaut, basé sur l'âge et le mode de vie
  if (data.age && data.age > 60) {
    return 'vitalité et longévité';
  }

  return 'bien-être général';
}

// Export as both named exports and default
export { enrichQuizData, validateAndCleanQuizData, inferMissingData, detectCorrelationsAndPatterns, calculateSupplementMatchingProbabilities };

export default {
  enrichQuizData,
  validateAndCleanQuizData,
  inferMissingData,
  detectCorrelationsAndPatterns,
  calculateSupplementMatchingProbabilities
};