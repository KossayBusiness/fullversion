/**
 * Système de recommandation contextuel
 * Ce module prend en compte les facteurs contextuels comme la saison, la localisation géographique,
 * et les interactions médicamenteuses pour personnaliser les recommandations nutritionnelles.
 */

import { SUPPLEMENT_CATALOG } from '@/data/supplementCatalog';
import { QuizResponse } from '@/components/quiz/types';

// Interfaces pour le typage des facteurs contextuels
export interface GeoLocation {
  country?: string;
  region?: string;
  city?: string;
  latitude?: number; // Pour déterminer l'exposition au soleil
  hemisphere?: 'north' | 'south'; // Hémisphère nord ou sud
}

export interface SeasonalFactors {
  currentSeason: 'winter' | 'spring' | 'summer' | 'fall';
  sunExposure: 'low' | 'moderate' | 'high';
  seasonalHealthConcerns?: string[]; // Ex: allergies au printemps, dépression saisonnière en hiver
}

export interface MedicationFactors {
  currentMedications?: string[];
  knownInteractions?: Record<string, string[]>; // Médicament -> [suppléments à éviter]
  healthConditions?: string[];
}

export interface ContextualFactors {
  geo?: GeoLocation;
  seasonal?: SeasonalFactors;
  medications?: MedicationFactors;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  timeOfYear?: string;
  localTrends?: string[];
}

// Facteurs d'ajustement saisonnier pour les suppléments
const SEASONAL_ADJUSTMENTS: Record<string, Record<string, number>> = {
  'winter': {
    'vitamin-d-supplement': 1.5, // Très important en hiver (moins d'exposition au soleil)
    'vitamin-c-complex': 1.3, // Important pour l'immunité en hiver
    'zinc-picolinate': 1.2, // Soutien immunitaire supplémentaire en hiver
    'elderberry': 1.4, // Particulièrement utile pendant la saison des rhumes et de la grippe
    'vitamin-a': 1.1 // Support supplémentaire pour les muqueuses en hiver
  },
  'spring': {
    'vitamin-d-supplement': 1.2, // Encore important au début du printemps
    'probiotics-daily': 1.2, // Soutien au microbiome pendant les changements saisonniers
    'quercetin': 1.3, // Aide pour les allergies saisonnières
    'n-acetyl-cysteine': 1.3, // Support contre les allergies printanières
    'vitamin-c-complex': 1.1 // Soutien immunitaire continu pendant la transition
  },
  'summer': {
    'vitamin-d-supplement': 0.7, // Moins important en été (plus d'exposition au soleil)
    'magnesium': 1.3, // Plus important en été (transpiration, activité)
    'electrolytes': 1.3, // Important pour l'hydratation
    'probiotics-daily': 1.1, // Soutien digestif pendant les voyages estivaux
    'antioxidants': 1.2 // Protection contre les dommages oxydatifs liés au soleil
  },
  'fall': {
    'vitamin-d-supplement': 1.2, // Importance croissante avec la diminution du soleil
    'omega3-supplementation': 1.1, // Soutien à l'humeur pendant la transition vers l'hiver
    'adaptogenic-herbs': 1.2, // Aide à l'adaptation au stress du changement de saison
    'vitamin-c-complex': 1.2, // Préparation pour la saison des rhumes
    'zinc-picolinate': 1.1 // Préparation immunitaire pour l'hiver
  }
};

// Facteurs d'ajustement géographique
const GEOGRAPHIC_ADJUSTMENTS: Record<string, Record<string, number>> = {
  // Régions nordiques (latitude > 50°)
  'northern_regions': {
    'vitamin-d-supplement': 1.5, // Crucial dans les régions avec peu de soleil
    'vitamin-k2': 1.2, // Synergie avec la vitamine D
    'omega3-supplementation': 1.2, // Traditionnellement consommé dans ces régions
    'vitamin-a': 1.1, // Support supplémentaire pendant les longs hivers
    'magnesium': 1.1 // Support pour l'humeur pendant les périodes sombres
  },
  // Régions tempérées (latitude 35-50°)
  'temperate_regions': {
    'vitamin-d-supplement': 1.2, // Important selon la saison
    'probiotics-daily': 1.1, // Équilibre du microbiome à travers les saisons
    'adaptogenic-herbs': 1.1, // Aide à l'adaptation aux changements saisonniers
    'seasonal_allergies': 1.2 // Support pour les allergies variables
  },
  // Régions méditerranéennes (latitude 30-40°)
  'mediterranean_regions': {
    'vitamin-d-supplement': 0.9, // Moins critique, mais toujours important
    'antioxidants': 1.2, // Complémentaire au régime méditerranéen
    'magnesium': 1.1, // Support pendant les périodes chaudes
    'probiotics-daily': 1.0 // Support digestif équilibré
  },
  // Régions tropicales (latitude < 30°)
  'tropical_regions': {
    'vitamin-d-supplement': 0.8, // Moins critique grâce au soleil abondant
    'vitamin-c-complex': 1.1, // Soutien immunitaire dans les climats humides
    'electrolytes': 1.4, // Très important pour l'hydratation
    'magnesium': 1.3, // Support pour la récupération dans les climats chauds
    'probiotics-daily': 1.2 // Support digestif dans les climats chauds et humides
  }
};

// Facteurs d'ajustement pour les interactions médicamenteuses - Defined locally to avoid import conflicts
const medicationInteractionLists: Record<string, string[]> = {
  'anticoagulants': ['vitamin-k', 'ginkgo-biloba', 'omega3-supplementation', 'curcumin-supplement', 'garlic-extract'],
  'antidepressants': ['ashwagandha-extract', 'rhodiola-rosea', 'st-johns-wort', '5-htp'],
  'blood_pressure_meds': ['liquorice-root', 'ashwagandha-extract', 'coq10-ubiquinol', 'magnesium'],
  'statins': ['coq10-ubiquinol', 'red-yeast-rice', 'niacin'],
  'thyroid_meds': ['ashwagandha-extract', 'kelp', 'iodine-supplements'],
  'diabetes_meds': ['alpha-lipoic-acid', 'cinnamon', 'berberine', 'chromium'],
  'antibiotics': ['probiotics-daily', 'zinc-picolinate', 'quercetin'],
  'immunosuppressants': ['echinacea', 'elderberry', 'astragalus', 'medicinal-mushrooms'],
  'nsaids': ['ginger', 'curcumin-supplement', 'white-willow-bark', 'omega3-supplementation'],
  'birth_control': ['st-johns-wort', 'milk-thistle', 'activated-charcoal', 'triphala']
};

// Warnings sur les interactions médicamenteuses
const MEDICATION_WARNINGS: Record<string, Record<string, string>> = {
  'anticoagulants': {
    'omega3-supplementation': "Les suppléments d'oméga-3 peuvent augmenter l'effet anticoagulant. Consultez votre médecin avant utilisation.",
    'curcumin-supplement': "La curcumine peut augmenter le risque de saignement lorsqu'elle est combinée avec des anticoagulants.",
    'ginkgo-biloba': "Le Ginkgo biloba a des propriétés anticoagulantes et peut amplifier l'effet des médicaments anticoagulants.",
    'vitamin-e': "Des doses élevées de vitamine E peuvent augmenter le risque de saignement chez les personnes prenant des anticoagulants."
  },
  'blood_pressure_meds': {
    'magnesium': "Le magnésium peut potentialiser l'effet des médicaments contre l'hypertension. Une surveillance de la pression artérielle est recommandée.",
    'coq10-ubiquinol': "Le CoQ10 peut modifier l'efficacité des médicaments pour la pression artérielle. Consultez votre médecin.",
    'liquorice-root': "La réglisse peut diminuer l'efficacité de certains médicaments contre l'hypertension et augmenter la pression artérielle."
  },
  'statins': {
    'coq10-ubiquinol': "Recommandé avec les statines pour réduire les effets secondaires musculaires, mais consultez votre médecin pour le dosage approprié.",
    'red-yeast-rice': "Contient des composés similaires aux statines. Ne pas combiner avec des statines pour éviter une toxicité hépatique et musculaire."
  },
  'antidepressants': {
    'st-johns-wort': "Le millepertuis peut réduire l'efficacité de nombreux antidépresseurs et provoquer un syndrome sérotoninergique.",
    '5-htp': "Peut augmenter les niveaux de sérotonine lorsqu'il est combiné avec des antidépresseurs, risquant un syndrome sérotoninergique.",
    'ashwagandha-extract': "Peut amplifier les effets des médicaments anxiolytiques et sédatifs."
  },
  'thyroid_meds': {
    'kelp': "Les suppléments contenant de l'iode comme le kelp peuvent interférer avec les médicaments pour la thyroïde.",
    'iron': "Le fer peut réduire l'absorption des médicaments thyroïdiens. Séparez leur prise d'au moins 4 heures."
  },
  'nsaids': {
    'omega3-supplementation': "La combinaison d'oméga-3 et d'AINS peut augmenter le risque de saignement.",
    'ginger': "Le gingembre peut amplifier l'effet anticoagulant des AINS et augmenter le risque de saignement.",
    'curcumin-supplement': "La curcumine peut augmenter le risque de saignement lorsqu'elle est combinée avec des AINS."
  },
  'diabetes_meds': {
    'cinnamon': "La cannelle peut renforcer l'effet hypoglycémiant des médicaments antidiabétiques.",
    'chromium': "Le chrome peut améliorer la sensibilité à l'insuline et potentiellement provoquer une hypoglycémie en combinaison avec des médicaments antidiabétiques.",
    'berberine': "Peut augmenter l'effet hypoglycémiant des médicaments antidiabétiques."
  },
  'antibiotics': {
    'probiotics-daily': "Prenez les probiotiques 2-3 heures avant ou après les antibiotiques pour minimiser l'impact des antibiotiques sur les bactéries bénéfiques.",
    'zinc-picolinate': "Le zinc peut réduire l'absorption de certains antibiotiques comme les quinolones et les tétracyclines."
  }
};

/**
 * Détermine les facteurs contextuels actuels en fonction de la date, de la localisation
 * et des informations fournies par l'utilisateur
 */
export function determineContextualFactors(quizResponses: QuizResponse): ContextualFactors {
  const contextFactors: ContextualFactors = {};

  // Déterminer la saison actuelle
  const now = new Date();
  const month = now.getMonth(); // 0-11

  // Localisation par défaut si non disponible via la géolocalisation
  let latitude = 48.8566; // Paris par défaut
  let hemisphere = 'north' as 'north' | 'south';

  // Déterminer l'hémisphère et les saisons en fonction du mois
  const isNorthernHemisphere = true; // Par défaut, hémisphère nord

  let currentSeason: 'winter' | 'spring' | 'summer' | 'fall';
  if (isNorthernHemisphere) {
    if (month >= 2 && month <= 4) currentSeason = 'spring';
    else if (month >= 5 && month <= 7) currentSeason = 'summer';
    else if (month >= 8 && month <= 10) currentSeason = 'fall';
    else currentSeason = 'winter';
  } else {
    if (month >= 2 && month <= 4) currentSeason = 'fall';
    else if (month >= 5 && month <= 7) currentSeason = 'winter';
    else if (month >= 8 && month <= 10) currentSeason = 'spring';
    else currentSeason = 'summer';
  }

  // Estimer l'exposition au soleil en fonction de la saison et de la latitude
  let sunExposure: 'low' | 'moderate' | 'high' = 'moderate';
  if (currentSeason === 'winter') {
    sunExposure = 'low';
  } else if (currentSeason === 'summer') {
    sunExposure = 'high';
  } else {
    sunExposure = 'moderate';
  }

  // Ajuster en fonction de la latitude
  if (Math.abs(latitude) > 50) {
    // Régions nordiques/australes: diminuer l'exposition présumée au soleil
    if (sunExposure === 'moderate') sunExposure = 'low';
    if (sunExposure === 'high') sunExposure = 'moderate';
  } else if (Math.abs(latitude) < 30) {
    // Régions tropicales: augmenter l'exposition présumée au soleil
    if (sunExposure === 'moderate') sunExposure = 'high';
    if (sunExposure === 'low') sunExposure = 'moderate';
  }

  // Créer les facteurs saisonniers
  const seasonalFactors: SeasonalFactors = {
    currentSeason,
    sunExposure
  };

  // Ajouter les préoccupations de santé saisonnières
  if (currentSeason === 'spring') {
    seasonalFactors.seasonalHealthConcerns = ['allergies', 'fatigue_printanière'];
  } else if (currentSeason === 'winter') {
    seasonalFactors.seasonalHealthConcerns = ['dépression_saisonnière', 'immunité_hivernale', 'sécheresse_cutanée'];
  } else if (currentSeason === 'summer') {
    seasonalFactors.seasonalHealthConcerns = ['déshydratation', 'exposition_solaire', 'troubles_sommeil_chaleur'];
  } else {
    seasonalFactors.seasonalHealthConcerns = ['transition_saisonnière', 'baisse_énergie'];
  }

  // Déterminer la région géographique en fonction de la latitude
  let geoRegion: string;
  if (Math.abs(latitude) > 50) {
    geoRegion = 'northern_regions';
  } else if (Math.abs(latitude) < 30) {
    geoRegion = 'tropical_regions';
  } else if (Math.abs(latitude) >= 35 && Math.abs(latitude) <= 45) {
    geoRegion = 'mediterranean_regions';
  } else {
    geoRegion = 'temperate_regions';
  }

  // Informations de localisation
  contextFactors.geo = {
    latitude,
    hemisphere,
    region: geoRegion
  };

  // Informations saisonnières
  contextFactors.seasonal = seasonalFactors;

  // Informations démographiques
  if (quizResponses.age) {
    contextFactors.age = Number(quizResponses.age);
  }

  if (quizResponses.gender) {
    contextFactors.gender = quizResponses.gender as 'male' | 'female' | 'other';
  }

  // Informations sur les médicaments
  if (quizResponses.medications && quizResponses.medications.length > 0) {
    contextFactors.medications = {
      currentMedications: quizResponses.medications,
      knownInteractions: {}
    };

    // Analyser les interactions potentielles
    quizResponses.medications.forEach(medication => {
      const key = medication.toLowerCase().replace(/ /g, '_');
      if (medicationInteractionLists[key]) {
        if (!contextFactors.medications!.knownInteractions) {
          contextFactors.medications!.knownInteractions = {};
        }
        contextFactors.medications!.knownInteractions![medication] = medicationInteractionLists[key];
      }
    });
  }

  return contextFactors;
}

/**
 * Ajuste les scores de recommandation en fonction des facteurs contextuels
 */
export function applyContextualAdjustments(
  recommendations: any[],
  contextFactors: ContextualFactors
): any[] {
  // Copie profonde des recommandations pour éviter de modifier l'original
  const adjustedRecommendations = JSON.parse(JSON.stringify(recommendations));

  // Ajustements saisonniers
  if (contextFactors.seasonal) {
    const seasonalAdjustments = SEASONAL_ADJUSTMENTS[contextFactors.seasonal.currentSeason];
    if (seasonalAdjustments) {
      adjustedRecommendations.forEach((rec: any) => {
        if (seasonalAdjustments[rec.supplementId]) {
          // Ajuster le score de correspondance
          rec.matchScore = rec.matchScore * seasonalAdjustments[rec.supplementId];

          // Ajouter une note contextuelle saisonnière
          const adjustmentPercent = Math.round((seasonalAdjustments[rec.supplementId] - 1) * 100);
          if (adjustmentPercent !== 0) {
            const seasonText = contextFactors.seasonal?.currentSeason === 'winter' ? 'en hiver' :
                              contextFactors.seasonal?.currentSeason === 'spring' ? 'au printemps' :
                              contextFactors.seasonal?.currentSeason === 'summer' ? 'en été' : 'en automne';

            const directionText = adjustmentPercent > 0 ? 'plus' : 'moins';

            if (!rec.contextualNotes) {
              rec.contextualNotes = '';
            } else {
              rec.contextualNotes += ' ';
            }

            rec.contextualNotes += `${Math.abs(adjustmentPercent)}% ${directionText} important ${seasonText}.`;
          }
        }
      });
    }
  }

  // Ajustements géographiques
  if (contextFactors.geo && contextFactors.geo.region) {
    const geoAdjustments = GEOGRAPHIC_ADJUSTMENTS[contextFactors.geo.region];
    if (geoAdjustments) {
      adjustedRecommendations.forEach((rec: any) => {
        if (geoAdjustments[rec.supplementId]) {
          // Ajuster le score de correspondance
          rec.matchScore = rec.matchScore * geoAdjustments[rec.supplementId];

          // Ajouter une note contextuelle géographique
          const adjustmentPercent = Math.round((geoAdjustments[rec.supplementId] - 1) * 100);
          if (adjustmentPercent !== 0) {
            const regionText = contextFactors.geo?.region === 'northern_regions' ? 'dans les régions nordiques' :
                              contextFactors.geo?.region === 'tropical_regions' ? 'dans les régions tropicales' :
                              contextFactors.geo?.region === 'mediterranean_regions' ? 'dans les régions méditerranéennes' : 
                              'dans votre région';

            const directionText = adjustmentPercent > 0 ? 'plus' : 'moins';

            if (!rec.contextualNotes) {
              rec.contextualNotes = '';
            } else {
              rec.contextualNotes += ' ';
            }

            rec.contextualNotes += `${Math.abs(adjustmentPercent)}% ${directionText} important ${regionText}.`;
          }
        }
      });
    }
  }

  // Ajouter des avertissements sur les interactions médicamenteuses
  if (contextFactors.medications && contextFactors.medications.currentMedications) {
    adjustedRecommendations.forEach((rec: any) => {
      contextFactors.medications?.currentMedications?.forEach(medication => {
        const medKey = medication.toLowerCase().replace(/ /g, '_');

        if (MEDICATION_WARNINGS[medKey] && MEDICATION_WARNINGS[medKey][rec.supplementId]) {
          if (!rec.warningNotes) {
            rec.warningNotes = [];
          }

          rec.warningNotes.push(MEDICATION_WARNINGS[medKey][rec.supplementId]);
        }
      });
    });
  }

  // Ajustements basés sur l'âge
  if (contextFactors.age) {
    adjustedRecommendations.forEach((rec: any) => {
      // Ajustements pour les personnes âgées (> 65 ans)
      if (contextFactors.age! > 65) {
        if (rec.supplementId === 'vitamin-d-supplement' || 
            rec.supplementId === 'coq10-ubiquinol' || 
            rec.supplementId === 'magnesium') {
          rec.matchScore = rec.matchScore * 1.2;

          if (!rec.contextualNotes) {
            rec.contextualNotes = '';
          } else {
            rec.contextualNotes += ' ';
          }

          rec.contextualNotes += 'Particulièrement important après 65 ans.';
        }
      }

      // Ajustements pour les jeunes adultes (18-30 ans)
      if (contextFactors.age! >= 18 && contextFactors.age! <= 30) {
        if (rec.supplementId === 'iron' && contextFactors.gender === 'female') {
          rec.matchScore = rec.matchScore * 1.15;

          if (!rec.contextualNotes) {
            rec.contextualNotes = '';
          } else {
            rec.contextualNotes += ' ';
          }

          rec.contextualNotes += 'Particulièrement important pour les femmes jeunes.';
        }
      }
    });
  }

  // Ajustements basés sur le genre
  if (contextFactors.gender) {
    adjustedRecommendations.forEach((rec: any) => {
      if (contextFactors.gender === 'female') {
        if (rec.supplementId === 'iron' || rec.supplementId === 'calcium') {
          rec.matchScore = rec.matchScore * 1.15;

          if (!rec.contextualNotes) {
            rec.contextualNotes = '';
          } else {
            rec.contextualNotes += ' ';
          }

          rec.contextualNotes += 'Généralement plus nécessaire pour les femmes.';
        }
      } else if (contextFactors.gender === 'male') {
        if (rec.supplementId === 'zinc-picolinate' || rec.supplementId === 'magnesium') {
          rec.matchScore = rec.matchScore * 1.1;

          if (!rec.contextualNotes) {
            rec.contextualNotes = '';
          } else {
            rec.contextualNotes += ' ';
          }

          rec.contextualNotes += 'Particulièrement bénéfique pour les hommes.';
        }
      }
    });
  }

  // Retrier en fonction des scores ajustés
  return adjustedRecommendations.sort((a: any, b: any) => b.matchScore - a.matchScore);
}

/**
 * Fonction principale pour générer des recommandations contextuelles
 */
export function getContextualRecommendations(
  baseRecommendations: any[],
  quizResponses: QuizResponse
): any[] {
  try {
    // Déterminer les facteurs contextuels actuels
    const contextFactors = determineContextualFactors(quizResponses);

    // Appliquer les ajustements contextuels
    const adjustedRecommendations = applyContextualAdjustments(baseRecommendations, contextFactors);

    return adjustedRecommendations;
  } catch (error) {
    console.error("Erreur lors de l'application des ajustements contextuels:", error);
    return baseRecommendations; // Retourner les recommandations non ajustées en cas d'erreur
  }
}

// Added code starts here.  Note that types like RecommendationResult are assumed to exist.  Adjust as needed for your project.

interface RecommendationResult {
  supplementId: string;
  matchScore: number;
  reasonSymptoms?: string[];
  reasonGoals?: string[];
  contextualNotes?: string;
  warningNotes?: string[];
}

// Function implementation moved to avoid duplication

/**
 * Applique des ajustements basés sur les corrélations symptômes-objectifs
 */
function applyCorrelationAdjustments(
  recommendation: RecommendationResult,
  enrichedData: any
): RecommendationResult {
  // Clone la recommandation
  const adjustedRec = { ...recommendation };

  // Récupérer les paires de corrélations fortes
  const strongCorrelations = enrichedData.correlations.symptomObjectivePairs
    .filter((pair: any) => pair.strength > 0.7);

  if (strongCorrelations.length === 0) return adjustedRec;

  // Vérifier si cette recommandation correspond à des symptômes et objectifs fortement corrélés
  let correlationBoost = 0;

  strongCorrelations.forEach((corr: any) => {
    const matchesSymptom = adjustedRec.reasonSymptoms?.includes(corr.symptom);
    const matchesObjective = adjustedRec.reasonGoals?.includes(corr.objective);

    // Si la recommandation correspond à la fois au symptôme et à l'objectif fortement corrélés
    if (matchesSymptom && matchesObjective) {
      // Boost proportionnel à la force de la corrélation
      correlationBoost += corr.strength * 0.15; // Max +15% boost par corrélation
    }
  });

  // Appliquer le boost avec un plafond de 30%
  if (correlationBoost > 0) {
    adjustedRec.matchScore = Math.min(1, adjustedRec.matchScore * (1 + Math.min(0.3, correlationBoost)));

    // Ajouter une note sur la corrélation
    if (!adjustedRec.contextualNotes) {
      adjustedRec.contextualNotes = "";
    }

    if (!adjustedRec.contextualNotes.includes("corrélation")) {
      adjustedRec.contextualNotes += " Cette recommandation est particulièrement pertinente car elle cible simultanément des symptômes et objectifs fortement corrélés dans votre profil.";
    }
  }

  return adjustedRec;
}

/**
 * Applique des ajustements basés sur les clusters de symptômes
 */
function applyClusterAdjustments(
  recommendation: RecommendationResult,
  enrichedData: any
): RecommendationResult {
  // Clone la recommandation
  const adjustedRec = { ...recommendation };

  // Définir les suppléments optimaux pour chaque cluster
  const clusterToSupplements: Record<string, string[]> = {
    'stress-sommeil': ['magnesium-glycinate', 'ashwagandha-extract', 'l-theanine', 'valerian-root'],
    'énergie-immunité': ['vitamin-d-supplement', 'vitamin-b-complex', 'zinc-picolinate', 'coq10-ubiquinol'],
    'digestion-inflammation': ['probiotics-daily', 'digestive-enzymes', 'turmeric-curcumin', 'l-glutamine'],
    'douleur-mobilité': ['omega3-supplementation', 'glucosamine-chondroitin', 'turmeric-curcumin', 'collagen-peptides']
  };

  // Vérifier si cette recommandation fait partie des suppléments optimaux pour le cluster principal
  const primaryCluster = enrichedData.correlations.primarySymptomCluster;
  const optimalSupplements = clusterToSupplements[primaryCluster] || [];

  if (optimalSupplements.includes(adjustedRec.supplementId)) {
    // Boost pour les suppléments optimaux du cluster principal
    adjustedRec.matchScore = Math.min(1, adjustedRec.matchScore * 1.2); // +20% boost

    // Ajouter une note sur le cluster
    if (!adjustedRec.contextualNotes) {
      adjustedRec.contextualNotes = "";
    }

    if (!adjustedRec.contextualNotes.includes("groupe de symptômes")) {
      adjustedRec.contextualNotes += ` Ce supplément est particulièrement recommandé pour votre groupe de symptômes "${primaryCluster.replace(/-/g, " et ")}".`;
    }
  }

  // Vérifier le cluster secondaire également
  const secondaryCluster = enrichedData.correlations.secondarySymptomCluster;
  if (secondaryCluster) {
    const secondaryOptimalSupplements = clusterToSupplements[secondaryCluster] || [];

    if (secondaryOptimalSupplements.includes(adjustedRec.supplementId)) {
      // Boost plus petit pour les suppléments optimaux du cluster secondaire
      adjustedRec.matchScore = Math.min(1, adjustedRec.matchScore * 1.1); // +10% boost

      // Ajouter une note sur le cluster secondaire
      if (!adjustedRec.contextualNotes) {
        adjustedRec.contextualNotes = "";
      }

      if (!adjustedRec.contextualNotes.includes(secondaryCluster)) {
        adjustedRec.contextualNotes += ` Ce supplément est également utile pour votre groupe de symptômes secondaire "${secondaryCluster.replace(/-/g, " et ")}".`;
      }
    }
  }

  return adjustedRec;
}

/**
 * Applique des ajustements basés sur le profil de santé
 */
function applyHealthProfileAdjustments(
  recommendation: RecommendationResult,
  enrichedData: any
): RecommendationResult {
  // Clone la recommandation
  const adjustedRec = { ...recommendation };

  // Définir les suppléments recommandés pour chaque facteur de risque
  const riskFactorToSupplements: Record<string, string[]> = {
    'déficience immunitaire': ['vitamin-d-supplement', 'zinc-picolinate', 'probiotics-daily', 'quercetin-supplement'],
    'déséquilibre stress-sommeil': ['magnesium-glycinate', 'ashwagandha-extract', 'l-theanine', 'melatonin-supplement'],
    'inflammation digestive': ['probiotics-daily', 'l-glutamine', 'digestive-enzymes', 'omega3-supplementation'],
    'risques liés à l\'âge': ['coq10-ubiquinol', 'vitamin-d-supplement', 'omega3-supplementation', 'resveratrol-supplement'],
    'sédentarité': ['vitamin-d-supplement', 'magnesium-glycinate', 'coq10-ubiquinol', 'omega3-supplementation'],
    'stress chronique': ['ashwagandha-extract', 'magnesium-glycinate', 'rhodiola-rosea', 'l-theanine']
  };

  // Vérifier si la recommandation répond à un facteur de risque
  if (enrichedData.healthProfile.riskFactors.length > 0) {
    let riskFactorBoost = 0;

    enrichedData.healthProfile.riskFactors.forEach((risk: string) => {
      const recommendedSupplements = riskFactorToSupplements[risk] || [];

      if (recommendedSupplements.includes(adjustedRec.supplementId)) {
        // Boost plus important pour les suppléments qui répondent à des facteurs de risque
        riskFactorBoost += 0.15; // +15% boost par facteur de risque

        // Ajouter une note sur le facteur de risque
        if (!adjustedRec.contextualNotes) {
          adjustedRec.contextualNotes = "";
        }

        if (!adjustedRec.contextualNotes.includes(risk)) {
          adjustedRec.contextualNotes += ` Ce supplément est particulièrement recommandé pour réduire votre facteur de risque: ${risk}.`;
        }
      }
    });

    // Appliquer le boost avec un plafond de 30%
    if (riskFactorBoost > 0) {
      adjustedRec.matchScore = Math.min(1, adjustedRec.matchScore * (1 + Math.min(0.3, riskFactorBoost)));
    }
  }

  // Vérifier si la recommandation correspond à une zone prioritaire
  if (enrichedData.healthProfile.priorityAreas.length > 0) {
    // Mapping entre systèmes et suppléments recommandés
    const systemToSupplements: Record<string, string[]> = {
      'système nerveux': ['magnesium-glycinate', 'ashwagandha-extract', 'l-theanine', 'omega3-supplementation'],
      'système digestif': ['probiotics-daily', 'digestive-enzymes', 'l-glutamine', 'ginger-extract'],
      'système immunitaire': ['vitamin-d-supplement', 'zinc-picolinate', 'vitamin-c-supplement', 'mushroom-complex'],
      'système musculo-squelettique': ['glucosamine-chondroitin', 'omega3-supplementation', 'collagen-peptides', 'magnesium-glycinate'],
      'système endocrinien': ['ashwagandha-extract', 'vitamin-d-supplement', 'zinc-picolinate', 'iodine-supplement']
    };

    enrichedData.healthProfile.priorityAreas.forEach((area: string) => {
      const recommendedSupplements = systemToSupplements[area] || [];

      if (recommendedSupplements.includes(adjustedRec.supplementId)) {
        // Boost pour les suppléments qui soutiennent les zones prioritaires
        adjustedRec.matchScore = Math.min(1, adjustedRec.matchScore * 1.1); // +10% boost

        // Ajouter une note sur la zone prioritaire
        if (!adjustedRec.contextualNotes) {
          adjustedRec.contextualNotes = "";
        }

        if (!adjustedRec.contextualNotes.includes(area)) {
          adjustedRec.contextualNotes += ` Ce supplément aide à soutenir votre ${area}, une zone prioritaire identifiée.`;
        }
      }
    });
  }

  return adjustedRec;
}

/**
 * Ajoute des notes contextuelles enrichies aux recommandations
 */
function addEnrichedContextualNotes(
  recommendation: RecommendationResult,
  quizResponses: QuizResponse,
  enrichedData: any = null
): RecommendationResult {
  // D'abord, appliquer les notes contextuelles standards
  let updatedRec = addContextualNotes(recommendation, quizResponses);

  // Si pas de données enrichies, retourner les notes standards
  if (!enrichedData) return updatedRec;

  // Ajouter des notes liées aux données enrichies
  if (!updatedRec.contextualNotes) {
    updatedRec.contextualNotes = "";
  }

  // Si un focus suggéré est disponible et pertinent pour cette recommandation
  if (enrichedData.healthProfile?.suggestedFocus) {
    const focus = enrichedData.healthProfile.suggestedFocus;

    // Mapping des focus aux suppléments particulièrement pertinents
    const focusToSupplements: Record<string, string[]> = {
      'équilibre stress-sommeil': ['magnesium-glycinate', 'ashwagandha-extract', 'l-theanine', 'melatonin-supplement'],
      'renforcement immunitaire et énergétique': ['vitamin-d-supplement', 'zinc-picolinate', 'vitamin-b-complex', 'coq10-ubiquinol'],
      'santé digestive et anti-inflammatoire': ['probiotics-daily', 'digestive-enzymes', 'turmeric-curcumin', 'l-glutamine'],
      'mobilité et confort articulaire': ['glucosamine-chondroitin', 'omega3-supplementation', 'turmericcurcumin', 'collagen-peptides'],
      'optimisation énergétique': ['vitamin-b-complex', 'coq10-ubiquinol', 'iron-complex', 'rhodiola-rosea'],
      'équilibre nerveux': ['magnesium-glycinate', 'l-theanine', 'ashwagandha-extract', 'omega3-supplementation'],
      'santé digestive': ['probiotics-daily', 'digestive-enzymes', 'l-glutamine', 'ginger-extract'],
      'vitalité et longévité': ['coq10-ubiquinol', 'vitamin-d-supplement', 'omega3-supplementation', 'resveratrol-supplement'],
      'bien-être général': ['magnesium-glycinate', 'vitamin-d-supplement', 'omega3-supplementation', 'probiotics-daily']
    };

    const relevantSupplements = focusToSupplements[focus] || [];

    if (relevantSupplements.includes(updatedRec.supplementId) && 
        !updatedRec.contextualNotes.includes(focus)) {
      updatedRec.contextualNotes += ` Ce supplément s'aligne parfaitement avec le focus principal identifié pour vous : ${focus}.`;
    }
  }

  // Ajouter des informations sur le niveau de confiance des inférences
  if (enrichedData.inferenceSummary && enrichedData.inferenceSummary.inferredFields.length > 0) {
    const inferredRelevantFields = ["age", "gender", "lifestyle", "dietaryHabits"]
      .filter(field => enrichedData.inferenceSummary.inferredFields.includes(field));

    if (inferredRelevantFields.length > 0 && !updatedRec.contextualNotes.includes("inférées")) {
      updatedRec.contextualNotes += ` Cette recommandation tient compte des informations inférées avec un niveau de confiance de ${Math.round(enrichedData.inferenceSummary.confidenceLevel * 100)}%.`;
    }
  }

  return updatedRec;
}

/**
 * Optimise l'ordre des recommandations en fonction des facteurs de risque et priorités
 */
function optimizeRecommendationOrder(
  sortedRecommendations: RecommendationResult[],
  enrichedData: any
): RecommendationResult[] {
  // Si pas de facteurs de risque, retourner l'ordre basé uniquement sur le score
  if (!enrichedData.healthProfile?.riskFactors || enrichedData.healthProfile.riskFactors.length === 0) {
    return sortedRecommendations;
  }

  // Définir les suppléments recommandés pour chaque facteur de risque
  const riskFactorToSupplements: Record<string, string[]> = {
    'déficience immunitaire': ['vitamin-d-supplement', 'zinc-picolinate', 'probiotics-daily', 'quercetin-supplement'],
    'déséquilibre stress-sommeil': ['magnesium-glycinate', 'ashwagandha-extract', 'l-theanine', 'melatonin-supplement'],
    'inflammation digestive': ['probiotics-daily', 'l-glutamine', 'digestive-enzymes', 'omega3-supplementation'],
    'risques liés à l\'âge': ['coq10-ubiquinol', 'vitamin-d-supplement', 'omega3-supplementation', 'resveratrol-supplement'],
    'sédentarité': ['vitamin-d-supplement', 'magnesium-glycinate', 'coq10-ubiquinol', 'omega3-supplementation'],
    'stress chronique': ['ashwagandha-extract', 'magnesium-glycinate', 'rhodiola-rosea', 'l-theanine']
  };

  // Calculer un score de priorité pour chaque recommandation basé sur les facteurs de risque
  const recWithPriority = sortedRecommendations.map(rec => {
    let riskAddressScore = 0;

    enrichedData.healthProfile.riskFactors.forEach((risk: string, index: number) => {
      const recommendedSupplements = riskFactorToSupplements[risk] || [];
      // Les premiers facteurs de risque ont plus de poids
      const riskWeight = 1 - (index * 0.2); // 1.0, 0.8, 0.6...

      if (recommendedSupplements.includes(rec.supplementId)) {
        riskAddressScore += riskWeight;
      }
    });

    return {
      recommendation: rec,
      riskAddressScore
    };
  });

  // Trier d'abord par score de risque, puis par score de correspondance
  recWithPriority.sort((a, b) => {
    // Si la différence de score de risque est significative
    if (Math.abs(a.riskAddressScore - b.riskAddressScore) > 0.5) {
      return b.riskAddressScore - a.riskAddressScore;
    }
    // Sinon, utiliser le score de correspondance standard
    return b.recommendation.matchScore - a.recommendation.matchScore;
  });

  // Extraire les recommandations réorganisées
  return recWithPriority.map(item => item.recommendation);
}

// Placeholder functions -  Replace with your actual implementations
function applyAgeAdjustments(rec: RecommendationResult, age: number): RecommendationResult {
  return rec;
}

function applyGenderAdjustments(rec: RecommendationResult, gender: string): RecommendationResult {
  return rec;
}

function applyDietaryAdjustments(rec: RecommendationResult, dietType: string): RecommendationResult {
  return rec;
}

function applySeasonalAdjustments(rec: RecommendationResult): RecommendationResult {
  return rec;
}

function addContextualNotes(rec: RecommendationResult, quizResponses: QuizResponse): RecommendationResult {
  return rec;
}

// Export the main functions for use in other modules
export { applyCorrelationAdjustments, applyClusterAdjustments, applyHealthProfileAdjustments, addEnrichedContextualNotes, optimizeRecommendationOrder };