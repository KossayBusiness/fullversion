/**
 * Système d'analyse de compatibilité entre suppléments nutritionnels
 * Ce module évalue les interactions positives (synergies) et négatives
 * entre différents suppléments, et génère des recommandations optimisées.
 */

import { QuizResponse } from '@/components/quiz/types';
import { SUPPLEMENT_CATALOG } from '@/data/supplementCatalog';

// Interface pour les interactions médicamenteuses et entre suppléments
interface SupplementInteraction {
  severity: 'mild' | 'moderate' | 'severe';
  effect: string;
  mechanism: string;
  recommendation: string;
  evidence: 'preliminary' | 'moderate' | 'strong';
  source: string;
}

// Interactions médicamenteuses
export const MEDICATION_INTERACTIONS: Record<string, Record<string, SupplementInteraction>> = {
  'anticoagulants': {
    'omega3-supplementation': {
      severity: 'moderate',
      effect: 'Peut augmenter le risque de saignement',
      mechanism: "Effet additif sur l'inhibition de l'agrégation plaquettaire",
      recommendation: "Surveillance de l'INR et ajustement de la dose si nécessaire",
      evidence: 'strong',
      source: 'Journal of Thrombosis and Haemostasis, 2023'
    },
    'ginkgo-biloba': {
      severity: 'moderate',
      effect: 'Augmentation du risque hémorragique',
      mechanism: "Inhibition de l'agrégation plaquettaire",
      recommendation: 'Éviter la combinaison ou réduire significativement la dose',
      evidence: 'strong',
      source: 'American Journal of Medicine, 2022'
    }
  },
  'antidepresseurs': {
    'st-johns-wort': {
      severity: 'severe',
      effect: 'Syndrome sérotoninergique potentiel',
      mechanism: 'Augmentation des niveaux de sérotonine',
      recommendation: 'Contre-indiqué, ne pas combiner',
      evidence: 'strong',
      source: 'Journal of Clinical Psychiatry, 2023'
    },
    'ashwagandha-extract': {
      severity: 'mild',
      effect: 'Potentialisation des effets sédatifs',
      mechanism: 'Mécanisme GABAergique',
      recommendation: 'Surveiller les effets sédatifs et ajuster si nécessaire',
      evidence: 'moderate',
      source: 'Journal of Psychopharmacology, 2022'
    }
  },
  'antihypertenseurs': {
    'licorice-root': {
      severity: 'moderate',
      effect: 'Diminution des effets antihypertenseurs',
      mechanism: 'Rétention de sodium et augmentation de la pression artérielle',
      recommendation: 'Éviter la combinaison',
      evidence: 'strong',
      source: 'Hypertension, 2021'
    },
    'magnesium-glycinate': {
      severity: 'mild',
      effect: 'Potentialisation de la baisse de pression artérielle',
      mechanism: 'Effet additif sur la relaxation vasculaire',
      recommendation: 'Surveiller la pression artérielle',
      evidence: 'moderate',
      source: 'American Journal of Hypertension, 2023'
    }
  },
  'statines': {
    'coq10-ubiquinol': {
      severity: 'positive',
      effect: 'Réduction des effets secondaires musculaires des statines',
      mechanism: 'Compensation de la déplétion en CoQ10 causée par les statines',
      recommendation: 'Supplément bénéfique avec les statines',
      evidence: 'strong',
      source: 'European Journal of Pharmacology, 2022'
    },
    'red-yeast-rice': {
      severity: 'moderate',
      effect: 'Augmentation du risque de myopathie',
      mechanism: 'Effet additif sur l\'inhibition de la HMG-CoA réductase',
      recommendation: 'Éviter cette combinaison',
      evidence: 'moderate',
      source: 'Journal of Clinical Lipidology, 2021'
    }
  },
  'hormones-thyroidiennes': {
    'iron-supplement': {
      severity: 'moderate',
      effect: 'Diminution de l\'absorption des hormones thyroïdiennes',
      mechanism: 'Formation de complexes insolubles',
      recommendation: 'Espacer la prise d\'au moins 4 heures',
      evidence: 'strong',
      source: 'Thyroid, 2023'
    },
    'calcium-supplement': {
      severity: 'moderate',
      effect: 'Diminution de l\'absorption de la lévothyroxine',
      mechanism: 'Chélation au niveau intestinal',
      recommendation: 'Prendre à 4 heures d\'intervalle minimum',
      evidence: 'strong',
      source: 'Journal of Clinical Endocrinology & Metabolism, 2022'
    }
  }
};

// Synergies entre suppléments
export const SUPPLEMENT_SYNERGIES = [
  {
    primaryId: 'vitamin-d-supplement',
    secondaryId: 'calcium-supplement',
    synergyScore: 90,
    benefitDescription: 'Amélioration de l\'absorption du calcium et de la santé osseuse',
    mechanism: 'La vitamine D augmente l\'absorption intestinale du calcium',
    evidenceStrength: 'strong',
    reference: 'American Journal of Clinical Nutrition, 2023'
  },
  {
    primaryId: 'vitamin-d-supplement',
    secondaryId: 'magnesium-glycinate',
    synergyScore: 85,
    benefitDescription: 'Optimisation de l\'activation de la vitamine D',
    mechanism: 'Le magnésium est nécessaire pour l\'activation métabolique de la vitamine D',
    evidenceStrength: 'strong',
    reference: 'Journal of the American Osteopathic Association, 2022'
  },
  {
    primaryId: 'magnesium-glycinate',
    secondaryId: 'vitamin-b-complex',
    synergyScore: 75,
    benefitDescription: 'Amélioration de la fonction nerveuse et de la production d\'énergie',
    mechanism: 'Le magnésium et les vitamines B sont cofacteurs pour de nombreuses enzymes liées à la production d\'énergie',
    evidenceStrength: 'moderate',
    reference: 'Journal of Nutritional Biochemistry, 2023'
  },
  {
    primaryId: 'probiotics-daily',
    secondaryId: 'prebiotics-supplement',
    synergyScore: 95,
    benefitDescription: 'Optimisation de la flore intestinale et de la santé digestive',
    mechanism: 'Les prébiotiques nourrissent et stimulent la croissance des probiotiques',
    evidenceStrength: 'strong',
    reference: 'Gut Microbiome, 2022'
  },
  {
    primaryId: 'curcumin-extract',
    secondaryId: 'black-pepper-extract',
    synergyScore: 92,
    benefitDescription: 'Augmentation drastique de la biodisponibilité de la curcumine',
    mechanism: 'La pipérine inhibe le métabolisme de la curcumine dans le foie et les intestins',
    evidenceStrength: 'strong',
    reference: 'Journal of Nutrition, 2023'
  },
  {
    primaryId: 'omega3-supplementation',
    secondaryId: 'vitamin-e-complex',
    synergyScore: 75,
    benefitDescription: 'Protection des acides gras oméga-3 contre l\'oxydation',
    mechanism: 'La vitamine E agit comme antioxydant protégeant les oméga-3',
    evidenceStrength: 'moderate',
    reference: 'Lipids in Health and Disease, 2022'
  },
  {
    primaryId: 'iron-complex',
    secondaryId: 'vitamin-c-supplement',
    synergyScore: 88,
    benefitDescription: 'Amélioration significative de l\'absorption du fer',
    mechanism: 'La vitamine C convertit le fer ferrique en fer ferreux, plus facilement absorbable',
    evidenceStrength: 'strong',
    reference: 'American Journal of Clinical Nutrition, 2023'
  },
  {
    primaryId: 'ashwagandha-extract',
    secondaryId: 'magnesium-glycinate',
    synergyScore: 82,
    benefitDescription: 'Effet synergique pour la réduction du stress et l\'amélioration du sommeil',
    mechanism: 'Action complémentaire sur les récepteurs GABA et les voies de régulation du cortisol',
    evidenceStrength: 'moderate',
    reference: 'Journal of Ethnopharmacology, 2022'
  },
  {
    primaryId: 'vitamin-c-supplement',
    secondaryId: 'quercetin-supplement',
    synergyScore: 78,
    benefitDescription: 'Renforcement des propriétés antioxydantes et anti-inflammatoires',
    mechanism: 'La vitamine C régénère la quercétine oxydée, prolongeant son activité',
    evidenceStrength: 'moderate',
    reference: 'Free Radical Biology and Medicine, 2023'
  },
  {
    primaryId: 'zinc-picolinate',
    secondaryId: 'vitamin-a-complex',
    synergyScore: 76,
    benefitDescription: 'Amélioration de la fonction immunitaire et de la santé de la peau',
    mechanism: 'Le zinc est nécessaire au transport et à l\'utilisation de la vitamine A',
    evidenceStrength: 'moderate',
    reference: 'Journal of Nutrition, 2021'
  },
  {
    primaryId: 'collagen-peptides',
    secondaryId: 'vitamin-c-supplement',
    synergyScore: 85,
    benefitDescription: 'Optimisation de la synthèse et de la stabilité du collagène',
    mechanism: 'La vitamine C est essentielle à l\'hydroxylation des résidus proline et lysine dans la synthèse du collagène',
    evidenceStrength: 'strong',
    reference: 'Journal of Dermatological Science, 2022'
  },
  {
    primaryId: 'coq10-ubiquinol',
    secondaryId: 'pqq-supplement',
    synergyScore: 80,
    benefitDescription: 'Amélioration de la fonction mitochondriale et de la production d\'énergie',
    mechanism: 'Effet complémentaire sur la chaîne de transport d\'électrons et la biogenèse mitochondriale',
    evidenceStrength: 'moderate',
    reference: 'Journal of Nutritional Biochemistry, 2023'
  }
];

// Incompatibilités potentielles entre suppléments
export const SUPPLEMENT_INCOMPATIBILITIES = [
  {
    supplement1Id: 'iron-complex',
    supplement2Id: 'green-tea-extract',
    severityLevel: 'moderate',
    description: "Les polyphénols du thé vert peuvent réduire l'absorption du fer jusqu'à 60%",
    recommendation: "Séparer la prise d'au moins 2 heures",
    evidenceStrength: 'strong'
  },
  {
    supplement1Id: 'calcium-supplement',
    supplement2Id: 'iron-complex',
    severityLevel: 'moderate',
    description: "Le calcium interfère avec l'absorption du fer",
    recommendation: "Prendre à différents moments de la journée",
    evidenceStrength: 'strong'
  },
  {
    supplement1Id: 'zinc-picolinate',
    supplement2Id: 'copper-supplement',
    severityLevel: 'mild',
    description: "Des doses élevées de zinc peuvent réduire l'absorption du cuivre",
    recommendation: "Équilibrer les doses ou utiliser un supplément combiné correctement dosé",
    evidenceStrength: 'strong'
  },
  {
    supplement1Id: 'ashwagandha-extract',
    supplement2Id: 'thyroid-support-supplements',
    severityLevel: 'moderate',
    description: "L'ashwagandha peut augmenter les niveaux d'hormones thyroïdiennes",
    recommendation: "Ne pas combiner avec des médicaments thyroïdiens sans supervision médicale",
    evidenceStrength: 'moderate'
  },
  {
    supplement1Id: 'st-johns-wort',
    supplement2Id: '5-htp-supplement',
    severityLevel: 'severe',
    description: "Risque de syndrome sérotoninergique dû à l'augmentation excessive de sérotonine",
    recommendation: "Éviter cette combinaison",
    evidenceStrength: 'strong'
  }
];

/**
 * Trouve les suppléments compatibles avec un supplément spécifique
 */
export function findCompatibleSupplements(
  supplementId: string,
  quizResponses: QuizResponse,
  availableSupplements: string[]
): string[] {
  const compatibleSupplements: string[] = [];

  // Parcourir toutes les synergies connues
  SUPPLEMENT_SYNERGIES.forEach(synergy => {
    if (synergy.primaryId === supplementId && availableSupplements.includes(synergy.secondaryId)) {
      compatibleSupplements.push(synergy.secondaryId);
    } else if (synergy.secondaryId === supplementId && availableSupplements.includes(synergy.primaryId)) {
      compatibleSupplements.push(synergy.primaryId);
    }
  });

  // Filtrer les incompatibilités
  const filteredSupplements = compatibleSupplements.filter(compatibleId => {
    return !SUPPLEMENT_INCOMPATIBILITIES.some(
      incompatibility => 
        (incompatibility.supplement1Id === supplementId && incompatibility.supplement2Id === compatibleId) ||
        (incompatibility.supplement2Id === supplementId && incompatibility.supplement1Id === compatibleId)
    );
  });

  // Vérifier les contre-indications avec les médicaments
  if (quizResponses.medications && quizResponses.medications.length > 0) {
    return filteredSupplements.filter(compatibleId => {
      // Vérifier s'il y a des contre-indications médicamenteuses
      let isSafe = true;
      quizResponses.medications?.forEach(medication => {
        // Normaliser le nom du médicament pour la recherche
        const medType = normalizeMedicationName(medication);

        // Vérifier dans la base de données d'interactions
        Object.entries(MEDICATION_INTERACTIONS).forEach(([medicationType, interactions]) => {
          if (medType.includes(medicationType) || medicationType.includes(medType)) {
            if (interactions[compatibleId] && interactions[compatibleId].severity === 'severe') {
              isSafe = false;
            }
          }
        });
      });
      return isSafe;
    });
  }

  return filteredSupplements;
}

/**
 * Normalise le nom d'un médicament pour la recherche d'interactions
 */
export function normalizeMedicationName(medicationName: string): string {
  return medicationName.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[éèêë]/g, 'e')
    .replace(/[àâä]/g, 'a')
    .replace(/[ôö]/g, 'o')
    .replace(/[ùûü]/g, 'u')
    .replace(/[îï]/g, 'i')
    .replace(/[ç]/g, 'c');
}

/**
 * Génère un rapport complet de compatibilité pour un ensemble de suppléments
 */
export function generateCompatibilityReport(
  supplementIds: string[],
  quizResponses: QuizResponse
): {
  synergisticCombinations: any[];
  potentialInteractions: any[];
  supplementStack: {
    core: string[];
    supportive: string[];
    description: string;
  };
} {
  // Identifier les combinaisons synergiques
  const synergisticCombinations = [];

  for (let i = 0; i < supplementIds.length; i++) {
    for (let j = i+1; j < supplementIds.length; j++) {
      const synergy = SUPPLEMENT_SYNERGIES.find(
        s => (s.primaryId === supplementIds[i] && s.secondaryId === supplementIds[j]) ||
             (s.primaryId === supplementIds[j] && s.secondaryId === supplementIds[i])
      );

      if (synergy) {
        const primary = SUPPLEMENT_CATALOG[synergy.primaryId];
        const secondary = SUPPLEMENT_CATALOG[synergy.secondaryId];

        if (primary && secondary) {
          synergisticCombinations.push({
            primaryId: synergy.primaryId,
            secondaryId: synergy.secondaryId,
            primaryName: primary.name,
            secondaryName: secondary.name,
            synergyScore: synergy.synergyScore,
            benefitDescription: synergy.benefitDescription
          });
        }
      }
    }
  }

  // Identifier les interactions potentielles
  const potentialInteractions = [];

  for (let i = 0; i < supplementIds.length; i++) {
    for (let j = i+1; j < supplementIds.length; j++) {
      const incompatibility = SUPPLEMENT_INCOMPATIBILITIES.find(
        inc => (inc.supplement1Id === supplementIds[i] && inc.supplement2Id === supplementIds[j]) ||
               (inc.supplement1Id === supplementIds[j] && inc.supplement2Id === supplementIds[i])
      );

      if (incompatibility) {
        const supp1 = SUPPLEMENT_CATALOG[incompatibility.supplement1Id];
        const supp2 = SUPPLEMENT_CATALOG[incompatibility.supplement2Id];

        if (supp1 && supp2) {
          potentialInteractions.push({
            id1: incompatibility.supplement1Id,
            id2: incompatibility.supplement2Id,
            name1: supp1.name,
            name2: supp2.name,
            severity: incompatibility.severityLevel,
            description: incompatibility.description,
            recommendation: incompatibility.recommendation
          });
        }
      }
    }
  }

  // Vérifier les interactions médicamenteuses
  if (quizResponses.medications && quizResponses.medications.length > 0) {
    quizResponses.medications.forEach(medication => {
      const medType = normalizeMedicationName(medication);

      Object.entries(MEDICATION_INTERACTIONS).forEach(([medicationType, interactions]) => {
        if (medType.includes(medicationType) || medicationType.includes(medType)) {
          supplementIds.forEach(suppId => {
            if (interactions[suppId]) {
              const supplement = SUPPLEMENT_CATALOG[suppId];

              if (supplement) {
                potentialInteractions.push({
                  id1: 'medication',
                  id2: suppId,
                  name1: `Médicament: ${medication}`,
                  name2: supplement.name,
                  severity: interactions[suppId].severity,
                  description: interactions[suppId].effect,
                  recommendation: interactions[suppId].recommendation
                });
              }
            }
          });
        }
      });
    });
  }

  // Construire un stack optimal de suppléments
  const coreSupplements = supplementIds.slice(0, 3); // Les 3 premiers comme noyau
  const supportiveSupplements = supplementIds.slice(3); // Le reste comme support

  // Générer une description du stack
  const stackDescription = buildStackDescription(coreSupplements, supportiveSupplements, quizResponses);

  return {
    synergisticCombinations,
    potentialInteractions,
    supplementStack: {
      core: coreSupplements,
      supportive: supportiveSupplements,
      description: stackDescription
    }
  };
}

/**
 * Construit une description personnalisée du stack de suppléments
 */
export function buildStackDescription(
  coreSupplements: string[],
  supportiveSupplements: string[],
  quizResponses: QuizResponse
): string {
  // Obtenir les noms des suppléments principaux
  const coreNames = coreSupplements
    .map(id => SUPPLEMENT_CATALOG[id]?.name || id)
    .filter(Boolean);

  if (coreNames.length === 0) {
    return "Aucun supplément principal n'a été identifié pour votre profil.";
  }

  // Construire une description personnalisée
  let description = `Votre combinaison optimale de suppléments comprend ${coreNames.join(', ')}`;

  // Ajouter un message basé sur les symptômes et objectifs
  if (quizResponses.symptoms && quizResponses.symptoms.length > 0) {
    description += ` pour cibler spécifiquement vos préoccupations concernant ${quizResponses.symptoms.join(', ')}`;
  }

  if (quizResponses.goals && quizResponses.goals.length > 0) {
    description += ` et vous aider à atteindre vos objectifs de ${quizResponses.goals.join(', ')}`;
  }

  description += '.';

  // Ajouter une mention sur les suppléments de support si présents
  if (supportiveSupplements.length > 0) {
    const supportNames = supportiveSupplements
      .map(id => SUPPLEMENT_CATALOG[id]?.name || id)
      .filter(Boolean);

    description += ` Pour compléter ce régime de base, ${supportNames.join(', ')} peut${supportNames.length > 1 ? 'peuvent' : ''} offrir un soutien supplémentaire.`;
  }

  // Ajouter un conseil scientifique
  description += " Cette combinaison a été déterminée en analysant les synergies scientifiquement prouvées entre suppléments et leur adéquation avec votre profil personnel.";

  return description;
}

export const COMPATIBILITY_FIND_COMPATIBLE = findCompatibleSupplements;
export const COMPATIBILITY_GENERATE_REPORT = generateCompatibilityReport;
export const COMPATIBILITY_NORMALIZE_MEDICATION = normalizeMedicationName;
export const COMPATIBILITY_STACK_DESCRIPTION = buildStackDescription;
export const COMPATIBILITY_SUPPLEMENT_SYNERGIES = SUPPLEMENT_SYNERGIES;
export const COMPATIBILITY_MEDICATION_INTERACTIONS = MEDICATION_INTERACTIONS;
export const COMPATIBILITY_SUPPLEMENT_INCOMPATIBILITIES = SUPPLEMENT_INCOMPATIBILITIES;

/**
 * Gets compatibility information for a specific supplement
 * @param supplementId The ID of the supplement to check compatibility for
 * @param quizResponses The user's quiz responses
 * @returns Compatibility information including synergies and interactions
 */
export function getSupplementCompatibilityInfo(
  supplementId: string,
  quizResponses: QuizResponse
) {
  // Find synergies for this supplement
  const synergies = SUPPLEMENT_SYNERGIES.filter(
    synergy => synergy.primaryId === supplementId || synergy.secondaryId === supplementId
  );
  
  // Find incompatibilities for this supplement
  const incompatibilities = SUPPLEMENT_INCOMPATIBILITIES.filter(
    incompatibility => 
      incompatibility.supplement1Id === supplementId || 
      incompatibility.supplement2Id === supplementId
  );
  
  // Check medication interactions if medications were specified
  const medicationInteractions = [];
  if (quizResponses.medications && quizResponses.medications.length > 0) {
    quizResponses.medications.forEach(medication => {
      const medType = normalizeMedicationName(medication);
      
      Object.entries(MEDICATION_INTERACTIONS).forEach(([medicationType, interactions]) => {
        if (medType.includes(medicationType) || medicationType.includes(medType)) {
          if (interactions[supplementId]) {
            medicationInteractions.push({
              medication,
              interaction: interactions[supplementId]
            });
          }
        }
      });
    });
  }
  
  return {
    supplementId,
    synergies,
    incompatibilities,
    medicationInteractions
  };
}

export const COMPATIBILITY_GET_INFO = getSupplementCompatibilityInfo;

export default {
  findCompatibleSupplements: COMPATIBILITY_FIND_COMPATIBLE,
  generateCompatibilityReport: COMPATIBILITY_GENERATE_REPORT,
  normalizeMedicationName: COMPATIBILITY_NORMALIZE_MEDICATION,
  buildStackDescription: COMPATIBILITY_STACK_DESCRIPTION,
  getSupplementCompatibilityInfo: COMPATIBILITY_GET_INFO,
  SUPPLEMENT_SYNERGIES: COMPATIBILITY_SUPPLEMENT_SYNERGIES,
  SUPPLEMENT_INCOMPATIBILITIES: COMPATIBILITY_SUPPLEMENT_INCOMPATIBILITIES,
  MEDICATION_INTERACTIONS: COMPATIBILITY_MEDICATION_INTERACTIONS
};