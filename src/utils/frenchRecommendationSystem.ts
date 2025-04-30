/**
 * Système de recommandation nutritionnelle amélioré
 * Basé sur l'algorithme français avec des améliorations contextuelles
 */

import { SUPPLEMENT_CATALOG } from '@/data/supplementCatalog';
import { QuizResponse } from '@/components/quiz/types';

// Types pour les facteurs contextuels
export interface ContextualFactors {
  season?: 'spring' | 'summer' | 'fall' | 'winter';
  location?: {
    country?: string;
    latitude?: number; // Pour déterminer l'exposition au soleil
  };
  medications?: string[];
  age?: number;
  gender?: 'male' | 'female' | 'other';
}

// Types pour les symptômes et objectifs
export interface SymptomWeight {
  [key: string]: number; // ex: {'fatigue': 0.8, 'stress': 0.6}
}

export interface GoalWeight {
  [key: string]: number; // ex: {'energy': 0.9, 'sleep': 0.7}
}

// Types pour les recommandations
export interface RecommendationResult {
  supplementId: string;
  name: string;
  matchScore: number;
  reasonSymptoms: string[];
  reasonGoals: string[];
  efficacyPercentage: number;
  dosageRecommendation: string;
  timeToEffect: string;
  naturalAlternatives: string[];
  complementarySupplements?: string[];
  contextualNotes?: string;
  warningNotes?: string[];
  scientificEvidenceLevel: 'high' | 'moderate' | 'preliminary';
  isPrimary: boolean;
}

// Mappages des symptômes aux suppléments appropriés avec pondération
const symptomToSupplementMap: Record<string, {id: string, weight: number}[]> = {
  'fatigue': [
    {id: 'vitamin-d-supplement', weight: 0.8},
    {id: 'vitamin-b-complex', weight: 0.9},
    {id: 'coq10-ubiquinol', weight: 0.7},
    {id: 'magnesium', weight: 0.6},
    {id: 'rhodiola-rosea', weight: 0.8},
    {id: 'ashwagandha-extract', weight: 0.7}
  ],
  'stress': [
    {id: 'magnesium', weight: 0.9},
    {id: 'ashwagandha-extract', weight: 0.95},
    {id: 'rhodiola-rosea', weight: 0.85},
    {id: 'l-theanine', weight: 0.8},
    {id: 'adaptogenic-herbs', weight: 0.75},
    {id: 'vitamin-b-complex', weight: 0.7}
  ],
  'sleep_issues': [
    {id: 'magnesium', weight: 0.9},
    {id: 'melatonin-supplement', weight: 0.9},
    {id: 'l-theanine', weight: 0.7},
    {id: 'ashwagandha-extract', weight: 0.6}
  ],
  'digestive_issues': [
    {id: 'probiotics-daily', weight: 0.95},
    {id: 'magnesium', weight: 0.6},
    {id: 'curcumin-supplement', weight: 0.7}
  ],
  'joint_pain': [
    {id: 'curcumin-supplement', weight: 0.9},
    {id: 'omega3', weight: 0.85},
    {id: 'vitamin-d-supplement', weight: 0.7}
  ],
  'low_immunity': [
    {id: 'vitamin-d-supplement', weight: 0.9},
    {id: 'vitamin-c-complex', weight: 0.9},
    {id: 'zinc-picolinate', weight: 0.85},
    {id: 'probiotics-daily', weight: 0.7}
  ],
  'inflammation': [
    {id: 'curcumin-supplement', weight: 0.95},
    {id: 'omega3', weight: 0.9},
    {id: 'alpha-lipoic-acid', weight: 0.7}
  ],
  'brain_fog': [
    {id: 'vitamin-b-complex', weight: 0.8},
    {id: 'omega3', weight: 0.85},
    {id: 'rhodiola-rosea', weight: 0.75},
    {id: 'l-theanine', weight: 0.7}
  ],
  'skin_issues': [
    {id: 'zinc-picolinate', weight: 0.85},
    {id: 'vitamin-c-complex', weight: 0.8},
    {id: 'omega3', weight: 0.75},
    {id: 'probiotics-daily', weight: 0.7}
  ],
  'mood_issues': [
    {id: 'vitamin-d-supplement', weight: 0.8},
    {id: 'omega3', weight: 0.75},
    {id: 'vitamin-b-complex', weight: 0.85},
    {id: 'ashwagandha-extract', weight: 0.7}
  ]
};

// Mappages des objectifs aux suppléments avec pondération
const goalToSupplementMap: Record<string, {id: string, weight: number}[]> = {
  'energy': [
    {id: 'vitamin-b-complex', weight: 0.9},
    {id: 'coq10-ubiquinol', weight: 0.8},
    {id: 'rhodiola-rosea', weight: 0.85},
    {id: 'vitamin-d-supplement', weight: 0.7},
    {id: 'adaptogenic-herbs', weight: 0.75}
  ],
  'sleep_quality': [
    {id: 'melatonin-supplement', weight: 0.9},
    {id: 'magnesium', weight: 0.85},
    {id: 'l-theanine', weight: 0.8},
    {id: 'ashwagandha-extract', weight: 0.7}
  ],
  'stress_management': [
    {id: 'ashwagandha-extract', weight: 0.95},
    {id: 'rhodiola-rosea', weight: 0.85},
    {id: 'l-theanine', weight: 0.8},
    {id: 'magnesium', weight: 0.85},
    {id: 'adaptogenic-herbs', weight: 0.8}
  ],
  'immune_support': [
    {id: 'vitamin-d-supplement', weight: 0.9},
    {id: 'vitamin-c-complex', weight: 0.9},
    {id: 'zinc-picolinate', weight: 0.9},
    {id: 'probiotics-daily', weight: 0.75}
  ],
  'digestive_health': [
    {id: 'probiotics-daily', weight: 0.95},
    {id: 'n-acetyl-cysteine', weight: 0.6},
    {id: 'magnesium', weight: 0.5}
  ],
  'focus_concentration': [
    {id: 'vitamin-b-complex', weight: 0.8},
    {id: 'l-theanine', weight: 0.8},
    {id: 'omega3', weight: 0.85},
    {id: 'rhodiola-rosea', weight: 0.75}
  ],
  'heart_health': [
    {id: 'coq10-ubiquinol', weight: 0.9},
    {id: 'omega3', weight: 0.95},
    {id: 'magnesium', weight: 0.8}
  ],
  'joint_support': [
    {id: 'curcumin-supplement', weight: 0.95},
    {id: 'omega3', weight: 0.9},
    {id: 'vitamin-d-supplement', weight: 0.75}
  ],
  'skin_health': [
    {id: 'zinc-picolinate', weight: 0.85},
    {id: 'vitamin-c-complex', weight: 0.9},
    {id: 'omega3', weight: 0.75}
  ],
  'detoxification': [
    {id: 'n-acetyl-cysteine', weight: 0.9},
    {id: 'alpha-lipoic-acid', weight: 0.8},
    {id: 'probiotics-daily', weight: 0.7},
    {id: 'curcumin-supplement', weight: 0.6}
  ]
};

// Interactions médicamenteuses à surveiller
const medicationInteractions: Record<string, string[]> = {
  'anticoagulants': ['vitamin-k', 'ginkgo-biloba', 'omega3', 'curcumin-supplement', 'garlic-extract'],
  'antidepressants': ['ashwagandha-extract', 'rhodiola-rosea', 'st-johns-wort', '5-htp'],
  'blood_pressure_meds': ['liquorice-root', 'ashwagandha-extract', 'coq10-ubiquinol', 'magnesium'],
  'statins': ['coq10-ubiquinol', 'red-yeast-rice', 'niacin'],
  'thyroid_meds': ['ashwagandha-extract', 'kelp', 'iodine-supplements'],
  'diabetes_meds': ['alpha-lipoic-acid', 'cinnamon', 'berberine', 'chromium'],
  'antibiotics': ['probiotics-daily', 'zinc-picolinate', 'quercetin']
};

// Facteurs saisonniers à considérer
const seasonalConsiderations: Record<string, Record<string, number>> = {
  'winter': {
    'vitamin-d-supplement': 1.3, // Augmentation de l'importance en hiver
    'vitamin-c-complex': 1.2,
    'zinc-picolinate': 1.2
  },
  'summer': {
    'magnesium': 1.2, // Plus important en été (transpiration)
    'vitamin-d-supplement': 0.8 // Moins crucial (exposition au soleil)
  },
  'spring': {
    'probiotics-daily': 1.1,
    'n-acetyl-cysteine': 1.2 // Pour les allergies
  },
  'fall': {
    'vitamin-c-complex': 1.15,
    'zinc-picolinate': 1.1,
    'adaptogenic-herbs': 1.1
  }
};

// Considérations géographiques
const geographicConsiderations: Record<string, Record<string, number>> = {
  'northern_regions': {
    'vitamin-d-supplement': 1.4, // Très important dans les régions nordiques
    'omega3': 1.2 // Régions avec consommation traditionnelle de poissons
  },
  'tropical_regions': {
    'vitamin-d-supplement': 0.7, // Moins crucial sous les tropiques
    'magnesium': 1.3, // Plus important (transpiration)
    'electrolytes': 1.3
  }
};

// Complémentarité entre suppléments
const supplementarySynergies: Record<string, string[]> = {
  'vitamin-d-supplement': ['vitamin-k2', 'magnesium', 'calcium'],
  'omega3': ['vitamin-e', 'curcumin-supplement'],
  'magnesium': ['vitamin-d-supplement', 'vitamin-b-complex', 'potassium'],
  'zinc-picolinate': ['copper', 'vitamin-c-complex'],
  'probiotics-daily': ['prebiotics', 'digestive-enzymes'],
  'curcumin-supplement': ['black-pepper-extract', 'omega3'],
  'ashwagandha-extract': ['rhodiola-rosea', 'magnesium'],
  'coq10-ubiquinol': ['omega3', 'magnesium'],
  'vitamin-c-complex': ['zinc-picolinate', 'quercetin']
};

/**
 * Génère des recommandations personnalisées basées sur les réponses au quiz
 * et facteurs contextuels
 */
export function generateFrenchStyleRecommendations(
  quizResponses: QuizResponse,
  contextFactors?: ContextualFactors
): RecommendationResult[] {
  // Initialiser les tableaux de symptômes et objectifs
  const symptoms: string[] = [];
  const goals: string[] = [];

  // Extraire les symptômes des réponses au quiz
  if (quizResponses.healthConcerns) {
    if (quizResponses.healthConcerns.stressLevel === 'high') symptoms.push('stress');
    if (quizResponses.healthConcerns.sleepIssues === 'yes') symptoms.push('sleep_issues');
    if (quizResponses.healthConcerns.energyLevel === 'low') symptoms.push('fatigue');
    if (quizResponses.healthConcerns.digestiveIssues === 'yes') symptoms.push('digestive_issues');
    if (quizResponses.healthConcerns.focusIssues === 'yes') symptoms.push('brain_fog');

    // Extraire d'autres symptômes si présents
    Object.entries(quizResponses.healthConcerns).forEach(([key, value]) => {
      if (value === 'yes' || value === 'high') {
        if (key === 'jointPain') symptoms.push('joint_pain');
        if (key === 'immuneSystem') symptoms.push('low_immunity');
        if (key === 'inflammation') symptoms.push('inflammation');
        if (key === 'skinProblems') symptoms.push('skin_issues');
        if (key === 'moodSwings') symptoms.push('mood_issues');
      }
    });
  }

  // Extraire les objectifs des réponses au quiz
  if (quizResponses.goals) {
    if (quizResponses.goals.increaseEnergy) goals.push('energy');
    if (quizResponses.goals.improveSleep) goals.push('sleep_quality');
    if (quizResponses.goals.reduceStress) goals.push('stress_management');
    if (quizResponses.goals.boostImmunity) goals.push('immune_support');
    if (quizResponses.goals.improveDigestion) goals.push('digestive_health');
    if (quizResponses.goals.improveFocus) goals.push('focus_concentration');
    if (quizResponses.goals.supportHeartHealth) goals.push('heart_health');
    if (quizResponses.goals.reduceJointPain) goals.push('joint_support');
    if (quizResponses.goals.improveSkin) goals.push('skin_health');
    if (quizResponses.goals.detoxify) goals.push('detoxification');
  }

  // Calcul des scores pour chaque supplément
  const supplementScores: Record<string, {
    total: number,
    symptomMatches: string[],
    goalMatches: string[],
    contextualBonus: number
  }> = {};

  // Évaluer les suppléments pour les symptômes
  symptoms.forEach(symptom => {
    const matchingSupplements = symptomToSupplementMap[symptom] || [];
    matchingSupplements.forEach(({ id, weight }) => {
      if (!supplementScores[id]) {
        supplementScores[id] = { total: 0, symptomMatches: [], goalMatches: [], contextualBonus: 0 };
      }
      supplementScores[id].total += weight;
      supplementScores[id].symptomMatches.push(symptom);
    });
  });

  // Évaluer les suppléments pour les objectifs
  goals.forEach(goal => {
    const matchingSupplements = goalToSupplementMap[goal] || [];
    matchingSupplements.forEach(({ id, weight }) => {
      if (!supplementScores[id]) {
        supplementScores[id] = { total: 0, symptomMatches: [], goalMatches: [], contextualBonus: 0 };
      }
      supplementScores[id].total += weight;
      supplementScores[id].goalMatches.push(goal);
    });
  });

  // Appliquer les modificateurs contextuels
  if (contextFactors) {
    // Facteurs saisonniers
    if (contextFactors.season) {
      const seasonModifiers = seasonalConsiderations[contextFactors.season];
      if (seasonModifiers) {
        Object.entries(seasonModifiers).forEach(([supplementId, modifier]) => {
          if (supplementScores[supplementId]) {
            supplementScores[supplementId].total *= modifier;
            supplementScores[supplementId].contextualBonus += (modifier - 1) * 100; // Pourcentage de bonus
          }
        });
      }
    }

    // Facteurs géographiques
    if (contextFactors.location && contextFactors.location.latitude) {
      // Logique simplifiée basée sur la latitude
      let region = 'temperate';
      if (contextFactors.location.latitude > 50) {
        region = 'northern_regions';
      } else if (contextFactors.location.latitude < 23.5) {
        region = 'tropical_regions';
      }

      const geoModifiers = geographicConsiderations[region];
      if (geoModifiers) {
        Object.entries(geoModifiers).forEach(([supplementId, modifier]) => {
          if (supplementScores[supplementId]) {
            supplementScores[supplementId].total *= modifier;
            supplementScores[supplementId].contextualBonus += (modifier - 1) * 100; // Pourcentage de bonus
          }
        });
      }
    }

    // Ajustements basés sur l'âge
    if (contextFactors.age) {
      // Les besoins en vitamine D augmentent avec l'âge
      if (contextFactors.age > 50 && supplementScores['vitamin-d-supplement']) {
        supplementScores['vitamin-d-supplement'].total *= 1.2;
        supplementScores['vitamin-d-supplement'].contextualBonus += 20;
      }

      // Les besoins en CoQ10 augmentent avec l'âge
      if (contextFactors.age > 45 && supplementScores['coq10-ubiquinol']) {
        supplementScores['coq10-ubiquinol'].total *= 1.3;
        supplementScores['coq10-ubiquinol'].contextualBonus += 30;
      }
    }
  }

  // Convertir les scores en résultats de recommandation
  const recommendations: RecommendationResult[] = [];

  Object.entries(supplementScores)
    .sort((a, b) => b[1].total - a[1].total) // Trier par score descendant
    .slice(0, 5) // Prendre les 5 meilleurs
    .forEach(([supplementId, scoreData], index) => {
      // S'assurer que le supplément existe dans notre catalogue
      const supplement = SUPPLEMENT_CATALOG[supplementId];
      if (supplement) {
        // Identifier les suppléments complémentaires
        const complementary = supplementarySynergies[supplementId] || [];
        const complementaryNames = complementary
          .map(id => SUPPLEMENT_CATALOG[id]?.name || id)
          .filter(name => !!name);

        // Calculer un pourcentage d'efficacité basé sur le score
        const efficacyBase = 70 + Math.min(25, Math.round(scoreData.total * 30));

        // Identifier les avertissements concernant les interactions médicamenteuses
        const warnings: string[] = [];
        if (contextFactors?.medications?.length) {
          contextFactors.medications.forEach(med => {
            const interactions = medicationInteractions[med] || [];
            if (interactions.includes(supplementId)) {
              warnings.push(`Peut interagir avec votre médicament ${med}. Consultez un professionnel de santé.`);
            }
          });
        }

        // Calculer un niveau de preuves scientifiques
        let evidenceLevel: 'high' | 'moderate' | 'preliminary' = 'moderate';
        const scientificStudiesCount = supplement.scientificStudies?.length || 0;
        if (scientificStudiesCount > 2) {
          evidenceLevel = 'high';
        } else if (scientificStudiesCount <= 1) {
          evidenceLevel = 'preliminary';
        }

        // Créer la recommandation
        recommendations.push({
          supplementId,
          name: supplement.name,
          matchScore: Math.round(scoreData.total * 100) / 100,
          reasonSymptoms: scoreData.symptomMatches,
          reasonGoals: scoreData.goalMatches,
          efficacyPercentage: efficacyBase,
          dosageRecommendation: supplement.recommendedDosage || supplement.standardDose,
          timeToEffect: supplement.timeToEffect || "2-4 semaines",
          naturalAlternatives: supplement.naturalSources || [],
          complementarySupplements: complementaryNames.length > 0 ? complementaryNames : undefined,
          contextualNotes: scoreData.contextualBonus > 0 
            ? `Particulièrement recommandé dans votre situation actuelle (+${Math.round(scoreData.contextualBonus)}% d'importance)`
            : undefined,
          warningNotes: warnings.length > 0 ? warnings : undefined,
          scientificEvidenceLevel: evidenceLevel,
          isPrimary: index < 2 // Les deux premiers sont considérés comme recommandations principales
        });
      }
    });

  return recommendations;
}

// Export named exports
export { RecommendationResult, ContextualFactors };

// Export default with alias to avoid duplicate exports
export default {
  generateRecommendations: generateFrenchStyleRecommendations
};