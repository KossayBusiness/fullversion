
/**
 * Service de génération d'avertissements personnalisés
 * Ce module génère des avertissements de précaution basés sur le profil de l'utilisateur,
 * les recommandations de suppléments, et d'autres facteurs contextuels.
 */

import { QuizResponse } from '@/components/quiz/types';

export interface Warning {
  type: 'medication' | 'condition' | 'nutrient' | 'timing' | 'dosage' | 'general';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  icon?: React.ReactNode;
  source?: string;
  recommendations?: string[];
  timeRelevant?: boolean;
}

// Base de données d'interactions médicamenteuses et de précautions connues
const MEDICATION_WARNING_INTERACTIONS: Record<string, Record<string, Warning>> = {
  'anticoagulants': {
    'omega3': {
      type: 'medication',
      title: 'Interaction potentielle avec anticoagulants',
      description: 'Les oméga-3 à haute dose peuvent augmenter l\'effet des médicaments anticoagulants. Surveillance requise.',
      severity: 'high',
      source: 'Journal of Thrombosis and Haemostasis, 2022',
      recommendations: [
        'Consulter votre médecin avant de commencer une supplémentation',
        'Envisager une dose plus faible initialement (1g/jour)',
        'Surveiller les signes de saignement anormal'
      ]
    },
    'vitamine-e': {
      type: 'medication',
      title: 'Interaction avec la vitamine E',
      description: 'La vitamine E à forte dose peut augmenter l\'effet anticoagulant et le risque de saignement.',
      severity: 'high',
      source: 'Blood Reviews, 2023',
      recommendations: [
        'Limiter la dose de vitamine E à 200 UI par jour',
        'Consulter votre médecin avant toute supplémentation',
        'Informer votre médecin avant toute intervention chirurgicale'
      ]
    },
    'ginkgo-biloba': {
      type: 'medication',
      title: 'Interaction avec le Ginkgo biloba',
      description: 'Le Ginkgo biloba peut augmenter le risque de saignement lorsqu\'il est pris avec des anticoagulants.',
      severity: 'high',
      source: 'European Journal of Clinical Pharmacology, 2021',
      recommendations: [
        'Éviter cette combinaison sauf sous supervision médicale',
        'Surveiller tout signe de saignement anormal'
      ]
    }
  },
  'antidepresseurs': {
    'millepertuis': {
      type: 'medication',
      title: 'Interaction grave avec antidépresseurs',
      description: 'Le millepertuis peut interagir sévèrement avec les antidépresseurs ISRS et IRSN, causant un syndrome sérotoninergique potentiellement grave.',
      severity: 'high',
      source: 'Journal of Psychiatric Research, 2023',
      recommendations: [
        'Éviter complètement cette combinaison',
        'Consulter un médecin avant toute supplémentation si vous prenez des antidépresseurs'
      ]
    },
    'tryptophane': {
      type: 'medication',
      title: 'Interaction avec le L-tryptophane',
      description: 'Le L-tryptophane peut augmenter les niveaux de sérotonine lorsqu\'il est combiné avec des antidépresseurs.',
      severity: 'high',
      source: 'CNS Drugs, 2022',
      recommendations: [
        'Éviter cette combinaison sauf sous supervision médicale stricte',
        'Consulter votre médecin avant toute supplémentation'
      ]
    }
  },
  'statines': {
    'pamplemousse': {
      type: 'medication',
      title: 'Interaction avec le pamplemousse',
      description: 'Le jus de pamplemousse peut interférer avec le métabolisme des statines, augmentant le risque d\'effets secondaires.',
      severity: 'medium',
      source: 'European Journal of Clinical Pharmacology, 2022',
      recommendations: [
        'Éviter le jus de pamplemousse et les suppléments contenant de l\'extrait de pamplemousse',
        'Consulter votre médecin pour des alternatives'
      ]
    },
    'coq10': {
      type: 'medication',
      title: 'Supplémentation recommandée en CoQ10',
      description: 'Les statines peuvent réduire les niveaux de CoQ10. Une supplémentation peut être bénéfique.',
      severity: 'low',
      source: 'Journal of the American College of Cardiology, 2022',
      recommendations: [
        'Envisager une supplémentation en CoQ10 de 100-200mg par jour',
        'Discuter avec votre médecin avant de commencer'
      ]
    }
  },
  'anti-hypertenseurs': {
    'potassium': {
      type: 'medication',
      title: 'Surveillance du potassium requise',
      description: 'Certains anti-hypertenseurs (notamment les diurétiques épargneurs de potassium) peuvent causer une hyperkaliémie lorsque combinés avec des suppléments de potassium.',
      severity: 'high',
      source: 'American Journal of Kidney Diseases, 2022',
      recommendations: [
        'Éviter les suppléments de potassium sauf sous supervision médicale',
        'Surveiller régulièrement vos niveaux de potassium'
      ]
    },
    'reglisse': {
      type: 'medication',
      title: 'Interaction avec la réglisse',
      description: 'La réglisse peut diminuer l\'efficacité des médicaments anti-hypertenseurs et augmenter la pression artérielle.',
      severity: 'medium',
      source: 'Journal of Human Hypertension, 2021',
      recommendations: [
        'Éviter les suppléments contenant de la réglisse',
        'Limiter la consommation de réglisse alimentaire'
      ]
    }
  },
  'hypothyroïdie': {
    'fer': {
      type: 'medication',
      title: 'Interaction avec le fer et médicaments thyroïdiens',
      description: 'Le fer peut réduire l\'absorption des médicaments pour l\'hypothyroïdie (lévothyroxine).',
      severity: 'medium',
      source: 'Thyroid, 2023',
      recommendations: [
        'Séparer la prise de suppléments de fer et de médicaments thyroïdiens d\'au moins 4 heures',
        'Consulter votre médecin pour ajuster le moment de prise'
      ]
    },
    'calcium': {
      type: 'medication',
      title: 'Interaction avec le calcium',
      description: 'Le calcium peut interférer avec l\'absorption des médicaments thyroïdiens.',
      severity: 'medium',
      source: 'Thyroid, 2022',
      recommendations: [
        'Prendre le calcium au moins 4 heures après les médicaments thyroïdiens',
        'Discuter avec votre médecin du meilleur moment pour la supplémentation'
      ]
    }
  }
};

// Précautions liées aux conditions de santé
const HEALTH_CONDITION_WARNINGS: Record<string, Warning> = {
  'hypertension': {
    type: 'condition',
    title: 'Précaution pour l\'hypertension',
    description: 'Les personnes souffrant d\'hypertension devraient limiter la consommation de suppléments contenant de la caféine, de l\'éphédra ou de la yohimbine.',
    severity: 'medium',
    source: 'American Heart Association, 2023',
    recommendations: [
      'Éviter les suppléments stimulants',
      'Surveiller régulièrement votre pression artérielle',
      'Privilégier les suppléments ayant des effets hypotenseurs comme le magnésium et la CoQ10'
    ]
  },
  'problèmes_rénaux': {
    type: 'condition',
    title: 'Précaution pour insuffisance rénale',
    description: 'Les personnes souffrant d\'insuffisance rénale doivent être prudentes avec les suppléments riches en potassium, phosphore ou magnésium.',
    severity: 'high',
    source: 'Kidney International, 2023',
    recommendations: [
      'Consulter un néphrologue avant toute supplémentation',
      'Éviter les formules multivitamines standard',
      'Utiliser uniquement des formules adaptées aux problèmes rénaux'
    ]
  },
  'diabète': {
    type: 'condition',
    title: 'Surveillance glycémique recommandée',
    description: 'Certains suppléments peuvent affecter la glycémie. Une surveillance plus fréquente est recommandée lors de l\'initiation d\'une supplémentation.',
    severity: 'medium',
    source: 'American Diabetes Association, 2023',
    recommendations: [
      'Surveiller votre glycémie plus fréquemment lors de l\'initiation d\'un nouveau supplément',
      'Informer votre médecin de toute supplémentation'
    ]
  },
  'troubles_coagulation': {
    type: 'condition',
    title: 'Précaution pour troubles de la coagulation',
    description: 'Les personnes souffrant de troubles de la coagulation doivent éviter les suppléments qui affectent la coagulation sanguine.',
    severity: 'high',
    source: 'Journal of Thrombosis and Haemostasis, 2022',
    recommendations: [
      'Éviter les suppléments d\'ail concentré, gingembre, ginkgo biloba à forte dose',
      'Consulter un hématologue avant toute supplémentation',
      'Être particulièrement prudent avec les oméga-3 à haute dose'
    ]
  }
};

// Précautions liées aux suppléments spécifiques
const SUPPLEMENT_SPECIFIC_WARNINGS: Record<string, Warning> = {
  'fer': {
    type: 'nutrient',
    title: 'Précaution avec le fer',
    description: 'La supplémentation en fer ne devrait être utilisée qu\'en cas de carence confirmée. Un excès de fer peut être nocif.',
    severity: 'medium',
    source: 'World Journal of Gastroenterology, 2022',
    recommendations: [
      'Confirmer la carence par un test sanguin avant supplémentation',
      'Stocker hors de portée des enfants (risque toxique élevé)',
      'Éviter si vous souffrez d\'hémochromatose ou de maladies inflammatoires chroniques'
    ]
  },
  'vitamine-a': {
    type: 'nutrient',
    title: 'Risque de toxicité de la vitamine A',
    description: 'La vitamine A peut s\'accumuler dans le corps et devenir toxique à doses élevées, en particulier sous forme de rétinol.',
    severity: 'medium',
    source: 'American Journal of Clinical Nutrition, 2023',
    recommendations: [
      'Ne pas dépasser 10,000 UI par jour',
      'Éviter complètement pendant la grossesse (sauf sous supervision médicale)',
      'Préférer le bêta-carotène au rétinol comme source de vitamine A'
    ]
  },
  'zinc': {
    type: 'nutrient',
    title: 'Équilibre zinc-cuivre',
    description: 'Une supplémentation à long terme en zinc sans cuivre peut entraîner une carence en cuivre.',
    severity: 'low',
    source: 'Journal of Trace Elements in Medicine and Biology, 2022',
    recommendations: [
      'Pour une supplémentation de plus de 3 mois, inclure 1-2mg de cuivre pour chaque 15mg de zinc',
      'Limiter la dose quotidienne de zinc à 40mg maximum'
    ]
  }
};

// Avertissements saisonniers ou temporels
const SEASONAL_WARNINGS: Record<string, Warning> = {
  'vitamine-d-hiver': {
    type: 'timing',
    title: 'Besoin accru en vitamine D en hiver',
    description: 'Pendant les mois d\'hiver, les besoins en vitamine D augmentent en raison de l\'exposition réduite au soleil.',
    severity: 'low',
    source: 'Journal of Clinical Endocrinology & Metabolism, 2023',
    recommendations: [
      'Augmenter la dose de vitamine D de 25-50% pendant les mois d\'hiver',
      'Considérer un test sanguin en fin d\'hiver pour ajuster la dose'
    ],
    timeRelevant: true
  },
  'probiotiques-été': {
    type: 'timing',
    title: 'Conservation des probiotiques en été',
    description: 'Les températures élevées de l\'été peuvent réduire l\'efficacité des probiotiques si mal conservés.',
    severity: 'low',
    source: 'Journal of Pharmacy and Pharmaceutical Sciences, 2022',
    recommendations: [
      'Conserver les probiotiques au réfrigérateur pendant les mois chauds',
      'Vérifier que le produit utilise des technologies de protection contre la chaleur'
    ],
    timeRelevant: true
  },
  'allergies-printemps': {
    type: 'timing',
    title: 'Support immunitaire pour la saison des allergies',
    description: 'La saison du printemps augmente les besoins en suppléments anti-inflammatoires naturels.',
    severity: 'low',
    source: 'Allergy, 2023',
    recommendations: [
      'Considérer l\'ajout de quercétine et vitamine C pendant la saison des allergies',
      'Commencer la supplémentation 2-4 semaines avant la saison des allergies'
    ],
    timeRelevant: true
  }
};

/**
 * Génère des avertissements personnalisés basés sur le profil de l'utilisateur
 * et les suppléments recommandés
 * 
 * @param userProfile Le profil utilisateur issu du quiz
 * @param recommendedSupplements Liste des suppléments recommandés
 * @param currentSeason Saison actuelle (optionnel)
 * @returns Liste d'avertissements personnalisés
 */
export function generatePersonalizedWarnings(
  userProfile: QuizResponse,
  recommendedSupplements: string[],
  currentSeason?: 'winter' | 'spring' | 'summer' | 'fall'
): Warning[] {
  const warnings: Warning[] = [];

  // 1. Vérifier les interactions médicamenteuses
  if (userProfile.medications && userProfile.medications.length > 0) {
    userProfile.medications.forEach(medication => {
      const medicationKey = medication.toLowerCase().replace(/ /g, '_');
      const interactions = MEDICATION_WARNING_INTERACTIONS[medicationKey];
      
      if (interactions) {
        // Vérifier si des suppléments recommandés interagissent avec ce médicament
        recommendedSupplements.forEach(supplement => {
          const supplementKey = supplement.toLowerCase().replace(/-/g, '_');
          if (interactions[supplementKey]) {
            warnings.push(interactions[supplementKey]);
          }
        });
      }
    });
  }

  // 2. Vérifier les précautions liées aux conditions de santé
  if (userProfile.healthConditions && userProfile.healthConditions.length > 0) {
    userProfile.healthConditions.forEach(condition => {
      const conditionKey = condition.toLowerCase().replace(/ /g, '_');
      if (HEALTH_CONDITION_WARNINGS[conditionKey]) {
        warnings.push(HEALTH_CONDITION_WARNINGS[conditionKey]);
      }
    });
  }

  // 3. Vérifier les précautions spécifiques aux suppléments
  recommendedSupplements.forEach(supplement => {
    if (SUPPLEMENT_SPECIFIC_WARNINGS[supplement]) {
      warnings.push(SUPPLEMENT_SPECIFIC_WARNINGS[supplement]);
    }
  });

  // 4. Ajouter des avertissements saisonniers si la saison est spécifiée
  if (currentSeason) {
    // Avertissements pour l'hiver
    if (currentSeason === 'winter' && recommendedSupplements.includes('vitamin-d-supplement')) {
      warnings.push(SEASONAL_WARNINGS['vitamine-d-hiver']);
    }
    
    // Avertissements pour l'été
    if (currentSeason === 'summer' && recommendedSupplements.includes('probiotics-daily')) {
      warnings.push(SEASONAL_WARNINGS['probiotiques-été']);
    }
    
    // Avertissements pour le printemps
    if (currentSeason === 'spring') {
      warnings.push(SEASONAL_WARNINGS['allergies-printemps']);
    }
  }

  // 5. Ajouter des avertissements liés à l'âge si nécessaire
  if (userProfile.age) {
    const age = parseInt(userProfile.age);
    
    if (age > 65 && recommendedSupplements.includes('vitamin-d-supplement')) {
      warnings.push({
        type: 'dosage',
        title: 'Ajustement de dose pour personnes âgées',
        description: 'Les personnes de plus de 65 ans peuvent nécessiter des doses plus élevées de vitamine D en raison d\'une synthèse cutanée réduite.',
        severity: 'low',
        source: 'Journal of the American Geriatrics Society, 2023',
        recommendations: [
          'Considérer une dose de 1000-2000 UI par jour',
          'Contrôler les niveaux sanguins annuellement'
        ]
      });
    }
    
    if (age < 18) {
      warnings.push({
        type: 'general',
        title: 'Précaution pour adolescents',
        description: 'Les besoins nutritionnels des adolescents sont différents de ceux des adultes. Les doses recommandées peuvent nécessiter un ajustement.',
        severity: 'medium',
        source: 'Journal of Adolescent Health, 2023',
        recommendations: [
          'Consulter un médecin avant toute supplémentation',
          'Utiliser des formules adaptées à l\'âge quand disponibles',
          'Éviter les suppléments stimulants'
        ]
      });
    }
  }

  // 6. Avertissements spécifiques pour les femmes enceintes ou allaitantes
  if (userProfile.gender === 'female' && userProfile.pregnancy === true) {
    warnings.push({
      type: 'condition',
      title: 'Précautions importantes pendant la grossesse',
      description: 'De nombreux suppléments n\'ont pas été évalués pour leur sécurité pendant la grossesse et l\'allaitement.',
      severity: 'high',
      source: 'American Journal of Obstetrics and Gynecology, 2023',
      recommendations: [
        'Consulter un obstétricien avant de prendre tout supplément',
        'Utiliser uniquement des suppléments prénataux approuvés',
        'Éviter les suppléments à base de plantes sauf sous supervision médicale'
      ]
    });
  }

  return warnings;
}

/**
 * Filtre les avertissements en fonction de leur sévérité
 * Utile pour afficher uniquement les alertes importantes
 * 
 * @param warnings Liste d'avertissements à filtrer
 * @param minSeverity Sévérité minimale à retenir
 * @returns Liste filtrée d'avertissements
 */
export function filterWarningsBySeverity(
  warnings: Warning[],
  minSeverity: 'low' | 'medium' | 'high' = 'medium'
): Warning[] {
  const severityWeight = {
    'low': 1,
    'medium': 2,
    'high': 3
  };

  return warnings.filter(warning => 
    severityWeight[warning.severity] >= severityWeight[minSeverity]
  );
}

/**
 * Trie les avertissements par ordre de sévérité
 * 
 * @param warnings Liste d'avertissements à trier
 * @returns Liste triée d'avertissements
 */
export function sortWarningsBySeverity(warnings: Warning[]): Warning[] {
  const severityWeight = {
    'low': 1,
    'medium': 2,
    'high': 3
  };

  return [...warnings].sort((a, b) => 
    severityWeight[b.severity] - severityWeight[a.severity]
  );
}
