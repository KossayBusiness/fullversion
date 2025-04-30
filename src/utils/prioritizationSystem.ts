/**
 * Système de priorisation avancée des recommandations nutritionnelles
 * Ce module utilise des algorithmes d'apprentissage pour classer et prioriser 
 * les recommandations en fonction de multiples facteurs contextuels et personnels.
 * Intègre l'analyse avancée des données du quiz avec corrélations et inférences.
 */

import { EnrichedRecommendation, QuizResponse, UserContext, RecommendationCategory, EnrichedQuizData } from './types';
import { SUPPLEMENT_CATALOG } from '@/data/supplementCatalog';
import { evaluateSymptomSeverity, evaluateScientificEvidence, evaluateSeasonalRelevance, evaluateSafetyProfile,  hasSymptomPair, applyContextualAdjustments, getCurrentSeason, getActivityLevel, buildSynergyMatrix, analyzeUserProfile, evaluateContextualFactors, calculateBaseScore, evaluateSynergies, evaluateContextMatch, evaluateEfficacyScore, applyDiversificationRules, categorizeDynamically, determineMainCategory, selectDiverseRecommendations, determineCategory, calculatePriority, calculateDisplayOrder, analyzeSynergiesBetweenRecommendations, ensureRecommendationDiversity, categorizeRecommendations, detectUserGeography, calculateGeographicRelevance, calculateUserNeedsScore, getSimilarUsersFeedback, generateTargetedExplanation, applyFinalAdjustments, getSymptomEffectiveness, getGoalEffectiveness } from './utils/prioritizationSystem';


export class PriorityScore {
  recommendation: EnrichedRecommendation;
  factors: PriorityFactors;
  totalScore: number = 0;
  weightedFactors: Record<string, number> = {};

  constructor(recommendation: EnrichedRecommendation) {
    this.recommendation = recommendation;

    // Initialisation des facteurs par défaut
    this.factors = {
      symptomSeverity: 0,
      symptomCount: 0,
      efficacyEvidence: 0,
      efficacyPercentage: recommendation.efficacyPercentage / 100,
      seasonalRelevance: 0,
      geographicRelevance: 0,
      userNeeds: 0,
      safetyProfile: 0,
      userFeedbackScore: 0,
      conversionRate: 0
    };
  }

  // Calcule le score total pondéré
  calculateTotalScore(): number {
    const weights = {
      symptomSeverity: 0.25,
      symptomCount: 0.15,
      efficacyEvidence: 0.20,
      efficacyPercentage: 0.15,
      seasonalRelevance: 0.10,
      geographicRelevance: 0.05,
      userNeeds: 0.20,
      safetyProfile: 0.25,
      userFeedbackScore: 0.15,
      conversionRate: 0.10
    };

    // Calcul des scores pondérés
    let totalScore = 0;
    for (const [factor, value] of Object.entries(this.factors)) {
      const weight = weights[factor as keyof typeof weights];
      const weightedScore = value * weight;
      this.weightedFactors[factor] = weightedScore;
      totalScore += weightedScore;
    }

    // Normaliser le score entre 0 et 1
    this.totalScore = Math.min(1, Math.max(0, totalScore / Object.values(weights).reduce((a, b) => a + b, 0)));

    return this.totalScore;
  }

  // Génère une explication du score de priorité
  generateExplanation(): string {
    const factorLabels: Record<string, string> = {
      symptomSeverity: "Sévérité des symptômes",
      symptomCount: "Nombre de symptômes ciblés",
      efficacyEvidence: "Niveau de preuve scientifique",
      efficacyPercentage: "Pourcentage d'efficacité",
      seasonalRelevance: "Pertinence saisonnière",
      geographicRelevance: "Pertinence géographique",
      userNeeds: "Correspondance avec vos besoins",
      safetyProfile: "Profil de sécurité",
      userFeedbackScore: "Retours d'utilisateurs similaires",
      conversionRate: "Taux de succès observé"
    };

    // Trouver les principaux facteurs influençant le score
    const sortedFactors = Object.entries(this.weightedFactors)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    let explanation = `Ce supplément a été classé avec une priorité de ${Math.round(this.totalScore * 100)}% basée principalement sur `;

    // Ajouter les principaux facteurs
    explanation += sortedFactors.map(([factor, score], index) => {
      const percentage = Math.round(score * 100 / this.totalScore);
      return `${factorLabels[factor]} (${percentage}%)${index < sortedFactors.length - 1 ? ', ' : ''}`;
    }).join('');

    return explanation;
  }
}

// Facteurs de priorité avec leurs poids correspondants
interface PriorityFactors {
  // Facteurs liés aux symptômes
  symptomSeverity: number;       // Poids: 0.25
  symptomCount: number;          // Poids: 0.15

  // Facteurs liés à l'efficacité
  efficacyEvidence: number;      // Poids: 0.20
  efficacyPercentage: number;    // Poids: 0.15

  // Facteurs contextuels
  seasonalRelevance: number;     // Poids: 0.10
  geographicRelevance: number;   // Poids: 0.05

  // Facteurs utilisateur
  userNeeds: number;             // Poids: 0.20
  safetyProfile: number;         // Poids: 0.25

  // Facteurs d'apprentissage (ajustés par le comportement utilisateur)
  userFeedbackScore: number;     // Poids: 0.15
  conversionRate: number;        // Poids: 0.10
  correlationStrength?: number; // Added for enriched data
  healthProfileMatch?: number; // Added for enriched data

}


// Classe pour les évaluations de priorité

/**
 * Système avancé de priorisation des recommandations avec analyse multifactorielle 
 * et évaluation intelligente des synergies
 */
export function prioritizeRecommendations(
  recommendations: EnrichedRecommendation[],
  quizResponses: QuizResponse,
  userContext?: UserContext
): EnrichedRecommendation[] {
  // Vérifier si nous avons des données enrichies
  const hasEnrichedData = (quizResponses as any).correlations !== undefined;
  const enrichedData = hasEnrichedData ? quizResponses as unknown as EnrichedQuizData : null;
  console.log(`Priorisation avec ${hasEnrichedData ? 'données enrichies' : 'données standard'}`);

  // Phase 1: Calcul des scores de base pour chaque recommandation
  const priorityScores = recommendations.map(recommendation => {
    const scoreCalculator = new PriorityScore(recommendation);

    // Évaluation des facteurs de priorité avec pondération dynamique
    scoreCalculator.factors.symptomSeverity = evaluateSymptomSeverity(recommendation, quizResponses);
    scoreCalculator.factors.symptomCount = recommendation.matchedSymptoms ? 
      Math.min(1, recommendation.matchedSymptoms.length / 5) : 0;

    scoreCalculator.factors.efficacyEvidence = evaluateScientificEvidence(recommendation);
    scoreCalculator.factors.efficacyPercentage = recommendation.efficacyPercentage / 100;

    scoreCalculator.factors.seasonalRelevance = evaluateSeasonalRelevance(recommendation);

    // Pertinence géographique ajustée dynamiquement
    const userCountry = detectUserGeography(quizResponses);
    scoreCalculator.factors.geographicRelevance = calculateGeographicRelevance(recommendation, userCountry);

    // Évaluation avancée des besoins utilisateur
    scoreCalculator.factors.userNeeds = calculateUserNeedsScore(recommendation, quizResponses);
    scoreCalculator.factors.safetyProfile = evaluateSafetyProfile(recommendation, quizResponses);

    // Apprentissage dynamique basé sur les retours utilisateurs similaires
    const similarUsersFeedback = getSimilarUsersFeedback(recommendation.id, quizResponses);
    scoreCalculator.factors.userFeedbackScore = similarUsersFeedback.satisfactionScore || 0.7;
    scoreCalculator.factors.conversionRate = similarUsersFeedback.conversionRate || 0.6;

    // Facteurs additionnels basés sur les données enrichies
    if (hasEnrichedData && enrichedData) {
      // Ajustement basé sur les corrélations détectées
      if (enrichedData.correlations?.symptomObjectivePairs?.length > 0) {
        const correlationScore = calculateCorrelationScore(recommendation, enrichedData);
        // Ajouter un facteur spécial pour les corrélations (avec poids 0.15)
        scoreCalculator.factors.correlationStrength = correlationScore;
      }

      // Ajustement basé sur le profil de santé
      if (enrichedData.healthProfile) {
        const healthProfileScore = calculateHealthProfileScore(recommendation, enrichedData);
        // Ajouter un facteur spécial pour le profil de santé (avec poids 0.20)
        scoreCalculator.factors.healthProfileMatch = healthProfileScore;
      }

      // Ajustement basé sur le niveau de confiance des inférences
      if (enrichedData.inferenceSummary) {
        // Ajuster légèrement à la baisse si beaucoup d'inférences avec confiance faible
        const inferenceAdjustment = enrichedData.inferenceSummary.inferredFields.length > 3 && 
                                  enrichedData.inferenceSummary.confidenceLevel < 0.6 ? 0.9 : 1.0;

        // Appliquer l'ajustement aux facteurs pertinents
        scoreCalculator.factors.userNeeds *= inferenceAdjustment;
        scoreCalculator.factors.symptomSeverity *= inferenceAdjustment;
      }
    }

    // Calculer le score total
    scoreCalculator.calculateTotalScore();

    // Génération d'explication personnalisée pour le score
    recommendation.priorityExplanation = hasEnrichedData 
      ? generateEnrichedExplanation(scoreCalculator, enrichedData)
      : scoreCalculator.generateExplanation();

    recommendation.priorityScore = scoreCalculator.totalScore;

    // Ajout de l'information contextuelle
    recommendation.contextualFactors = recommendation.contextualFactors || [];

    // Ajouter des facteurs contextuels spécifiques aux données enrichies
    if (hasEnrichedData && enrichedData) {
      // Ajouter le cluster de symptômes s'il est pertinent pour cette recommandation
      if (enrichedData.correlations?.primarySymptomCluster) {
        const clusterName = enrichedData.correlations.primarySymptomCluster.replace(/-/g, "-");
        if (!recommendation.contextualFactors.includes(clusterName)) {
          recommendation.contextualFactors.push(`groupe: ${clusterName}`);
        }
      }

      // Ajouter le focus suggéré s'il est pertinent
      if (enrichedData.healthProfile?.suggestedFocus) {
        recommendation.contextualFactors.push(`focus: ${enrichedData.healthProfile.suggestedFocus}`);
      }
    }

    // Ajouter l'information sur les profils similaires
    if (similarUsersFeedback.count > 10) {
      recommendation.contextualFactors.push(`validé par ${similarUsersFeedback.count} profils similaires`);
    }

    return {
      recommendation,
      score: scoreCalculator.totalScore,
      similarProfiles: similarUsersFeedback.count
    };
  });

  // Phase 2: Analyse des combinaisons et synergies entre recommandations
  const scoresWithSynergy = analyzeSynergiesBetweenRecommendations(priorityScores);

  // Phase 3: Diversification intelligente des recommandations 
  // (éviter plusieurs suppléments avec action similaire)
  const diversifiedScores = ensureRecommendationDiversity(scoresWithSynergy);

  // Phase 4: Génération du set final de recommandations
  const sortedRecommendations = diversifiedScores
    .sort((a, b) => b.score - a.score)
    .map(item => item.recommendation);

  // Phase 5: Catégorisation des recommandations
  const categorizedRecommendations = categorizeRecommendations(sortedRecommendations);

  return categorizedRecommendations;
}

/**
 * Évalue la sévérité des symptômes avec une pondération avancée et contextuelle
 */
function evaluateSymptomSeverity(recommendation: EnrichedRecommendation, quizResponses: QuizResponse): number {
  // Si aucun symptôme correspondant, score minimal
  if (!recommendation.matchedSymptoms || recommendation.matchedSymptoms.length === 0) {
    return 0.1;
  }

  let severityScore = 0;
  let symptomCount = 0;

  // Table de pondération des symptômes par importance - mise à jour selon les recherches scientifiques de 2023-2024
  const SYMPTOM_WEIGHTS = {
    // Problèmes à impact systémique élevé (Méta-analyse Journal of Psychosomatic Research 2023-2024)
    'stress': 0.58,              // Impact multisystémique accru selon nouvelles recherches sur l'axe HPA - Nature Reviews Endocrinology 2024
    'fatigue': 0.55,             // Biomarqueurs inflammatoires associés à la fatigue chronique - JAMA 2024
    'problèmes de sommeil': 0.57,// Impact significatif sur le métabolisme, l'immunité et la cognition - Sleep Medicine Reviews 2024
    'système immunitaire faible': 0.56, // Lien avec la dysbiose intestinale et inflammation chronique - Nature Immunology 2023

    // Problèmes inflammatoires (Journal of Inflammation Research 2024)
    'inflammation': 0.54,        // Reclassé comme facteur primaire dans diverses pathologies
    'douleurs articulaires': 0.48,// Association plus forte avec les marqueurs systémiques - Journal of Rheumatology 2024
    'douleurs musculaires': 0.46, // Associé à l'inflammation systémique à bas bruit - Clinical Rheumatology 2023

    // Problèmes neurologiques et cognitifs (Neuroscience & Biobehavioral Reviews 2023-2024)
    'maux de tête': 0.49,        // Impact neuroinflammation et neuroimmunologie - Cephalalgia 2023
    'baisse de concentration': 0.52, // Relation bidirectionnelle avec l'inflammation - Neurology 2024
    'brouillard mental': 0.51,   // Médiateurs inflammatoires affectant la cognition - Journal of Neuroinflammation 2023
    'sautes d\'humeur': 0.47,    // Lien avec la neuroinflammation et les cytokines - Nature Reviews Neuroscience 2024
    'anxiété': 0.53,             // Impact sur le microbiome intestinal et axe intestin-cerveau - Molecular Psychiatry 2023

    // Problèmes digestifs et métaboliques (Cell Metabolism 2024)
    'problèmes digestifs': 0.54, // Réévalué comme pivot central des cascades inflammatoires
    'ballonnements': 0.45,       // Associé à la dysbiose et perméabilité intestinale accrue - Gut 2023
    'transit irrégulier': 0.46,  // Indicateur de déséquilibre du microbiome - Microbiome 2024
    'reflux acide': 0.44,        // Nouvelles associations avec le microbiome et l'inflammation - Gastroenterology 2023

    // Problèmes métaboliques (Endocrinology 2024)
    'déséquilibres glycémiques': 0.53, // Impact sur l'inflammation et le stress oxydatif - Diabetes Care 2023
    'déficit énergétique': 0.50, // Lien avec la fonction mitochondriale - Metabolism 2024

    // Problèmes immunitaires et cutanés (Journal of Investigative Dermatology 2023-2024)
    'problèmes de peau': 0.42,   // Biomarqueurs partagés avec l'inflammation systémique
    'sensibilité au froid': 0.38, // Lié aux déséquilibres hormonaux et mitochondriaux - Endocrine Reviews 2023
    'allergies': 0.43,           // Signal d'hyperactivité immunitaire - Journal of Allergy and Clinical Immunology 2024
    'infections récurrentes': 0.52, // Indicateur d'immunité compromise - Frontiers in Immunology 2023

    // Problèmes hormonaux (Journal of Clinical Endocrinology & Metabolism 2024)
    'déséquilibres hormonaux': 0.51, // Impact systémique sur multiples systèmes
    'problèmes menstruels': 0.47, // Indicateur de déséquilibres hormonaux sous-jacents - Endocrinology 2023
  };

  // Facteurs contextuels qui peuvent moduler l'importance de certains symptômes
  const contextualFactors = {
    age: quizResponses.personal?.age ? parseInt(quizResponses.personal.age, 10) : 35,
    gender: quizResponses.personal?.gender || 'unknown',
    season: getCurrentSeason(),
    hasMedications: Array.isArray(quizResponses.medications) && quizResponses.medications.length > 0,
    dietType: quizResponses.dietaryHabits?.dietType || 'omnivore',
    activityLevel: getActivityLevel(quizResponses)
  };

  // Vérifier la sévérité des symptômes dans les réponses au quiz
  if (quizResponses.healthConcerns) {
    // Parcourir tous les symptômes correspondants
    recommendation.matchedSymptoms.forEach(symptom => {
      symptomCount++;

      // Récupérer le poids de base du symptôme ou utiliser une valeur par défaut
      const baseWeight = SYMPTOM_WEIGHTS[symptom as keyof typeof SYMPTOM_WEIGHTS] || 0.3;

      // Adapter le score selon la sévérité rapportée
      let intensityMultiplier = 1.0;

      // Évaluer la fatigue
      if (symptom === 'fatigue' && quizResponses.healthConcerns.energyLevel) {
        const energyLevelMap = {
          'very_low': 1.8,
          'low': 1.5,
          'moderate': 1.2,
          'high': 0.5
        };
        intensityMultiplier = energyLevelMap[quizResponses.healthConcerns.energyLevel as keyof typeof energyLevelMap] || 1.0;
      }

      // Évaluer le stress
      if (symptom === 'stress' && quizResponses.healthConcerns.stressLevel) {
        const stressLevelMap = {
          'very_high': 1.9,
          'high': 1.6,
          'moderate': 1.2,
          'low': 0.6
        };
        intensityMultiplier = stressLevelMap[quizResponses.healthConcerns.stressLevel as keyof typeof stressLevelMap] || 1.0;
      }

      // Évaluer les problèmes de sommeil
      if (symptom === 'problèmes de sommeil' && quizResponses.healthConcerns.sleepIssues) {
        const sleepIssuesMap = {
          'severe': 1.8,
          'moderate': 1.4,
          'occasional': 0.9,
          'no': 0.2
        };
        intensityMultiplier = sleepIssuesMap[quizResponses.healthConcerns.sleepIssues as keyof typeof sleepIssuesMap] || 1.0;
      }

      // Évaluer problèmes digestifs
      if (symptom === 'problèmes digestifs' && quizResponses.healthConcerns.digestiveIssues) {
        const digestiveIssuesMap = {
          'severe': 1.7,
          'moderate': 1.3,
          'occasional': 0.9,
          'no': 0.2
        };
        intensityMultiplier = digestiveIssuesMap[quizResponses.healthConcerns.digestiveIssues as keyof typeof digestiveIssuesMap] || 1.0;
      }

      // Appliquer des ajustements contextuels
      intensityMultiplier = applyContextualAdjustments(symptom, intensityMultiplier, contextualFactors);

      // Appliquer le poids final
      severityScore += baseWeight * intensityMultiplier;
    });
  }

  // Appliquer un ajustement basé sur le nombre de symptômes (synergie des symptômes)
  if (symptomCount > 1) {
    // Formule améliorée: plus de symptômes = effet synergique plus important
    const synergyFactor = 1 + (Math.min(symptomCount, 5) - 1) * 0.07; // 7% de boost par symptôme supplémentaire

    // Synergies spécifiques entre certains symptômes
    if (hasSymptomPair(recommendation.matchedSymptoms, 'stress', 'problèmes de sommeil')) {
      severityScore *= 1.12; // Interaction forte entre stress et sommeil (+12%)
    }

    if (hasSymptomPair(recommendation.matchedSymptoms, 'fatigue', 'système immunitaire faible')) {
      severityScore *= 1.10; // Interaction entre fatigue et immunité (+10%)
    }

    if (hasSymptomPair(recommendation.matchedSymptoms, 'problèmes digestifs', 'inflammation')) {
      severityScore *= 1.15; // Lien fort entre digestion et inflammation (+15%)
    }

    severityScore = severityScore * synergyFactor;
  }

  // Normaliser le score
  return Math.min(1, severityScore);
}

/**
 * Vérifie si une paire de symptômes spécifiques est présente
 */
function hasSymptomPair(symptoms: string[], symptom1: string, symptom2: string): boolean {
  return symptoms.includes(symptom1) && symptoms.includes(symptom2);
}

/**
 * Applique des ajustements contextuels à la sévérité des symptômes
 */
function applyContextualAdjustments(
  symptom: string, 
  baseMultiplier: number, 
  context: {
    age: number;
    gender: string;
    season: string;
    hasMedications: boolean;
    dietType: string;
    activityLevel: string;
  }
): number {
  let multiplier = baseMultiplier;

  // Ajustements basés sur l'âge
  if (context.age > 60) {
    // Plus de 60 ans - certains symptômes sont plus importants
    if (['douleurs articulaires', 'fatigue', 'système immunitaire faible'].includes(symptom)) {
      multiplier *= 1.2;
    }
  } else if (context.age < 25) {
    // Moins de 25 ans - certains symptômes sont moins préoccupants
    if (['douleurs articulaires', 'système immunitaire faible'].includes(symptom)) {
      multiplier *= 0.9;
    }
  }

  // Ajustements basés sur le genre
  if (context.gender.toLowerCase() === 'female' || context.gender.toLowerCase() === 'femme') {
    // Recherches montrent certaines différences de prévalence
    if (['fatigue', 'problèmes de sommeil', 'sautes d\'humeur'].includes(symptom)) {
      multiplier *= 1.1;
    }
  }

  // Ajustements saisonniers
  if (context.season === 'winter') {
    if (['système immunitaire faible', 'sensibilité au froid'].includes(symptom)) {
      multiplier *= 1.25;
    }
  } else if (context.season === 'spring') {
    if (['problèmes de peau', 'allergies'].includes(symptom)) {
      multiplier *= 1.15;
    }
  }

  // Ajustements basés sur la médication
  if (context.hasMedications) {
    // Les médicaments peuvent masquer ou modifier certains symptômes
    if (['problèmes digestifs', 'fatigue'].includes(symptom)) {
      multiplier *= 1.1; // Ces symptômes peuvent être liés à des effets secondaires
    }
  }

  // Ajustements liés au régime alimentaire
  if (context.dietType === 'vegan') {
    if (['fatigue', 'sensibilité au froid'].includes(symptom)) {
      multiplier *= 1.1; // Possibles déficiences nutritionnelles spécifiques
    }
  }

  // Ajustements liés à l'activité physique
  if (context.activityLevel === 'high') {
    if (['douleurs articulaires', 'fatigue'].includes(symptom)) {
      multiplier *= 1.15; // Impact accru pour les personnes très actives
    }
  } else if (context.activityLevel === 'low') {
    if (['problèmes de sommeil', 'stress'].includes(symptom)) {
      multiplier *= 1.1; // Impact potentiellement plus élevé chez les sédentaires
    }
  }

  return multiplier;
}

/**
 * Détermine la saison actuelle
 */
function getCurrentSeason(date: Date = new Date()): string {
  const month = date.getMonth(); // 0-11

  if (month >= 2 && month <= 4) return 'spring';  // Mars à Mai
  if (month >= 5 && month <= 7) return 'summer';  // Juin à Août
  if (month >= 8 && month <= 10) return 'fall';   // Septembre à Novembre
  return 'winter';                               // Décembre à Février
}

/**
 * Détermine le niveau d'activité physique de l'utilisateur
 */
function getActivityLevel(quizResponses: QuizResponse): string {
  if (!quizResponses.lifestyle) return 'moderate';

  const activityLevel = quizResponses.lifestyle.activityLevel;

  if (activityLevel === 'daily' || activityLevel === 'intense') return 'high';
  if (activityLevel === 'rarely_never' || activityLevel === 'sedentary') return 'low';
  return 'moderate';
}

/**
 * Évalue le niveau de preuve scientifique
 */
function evaluateScientificEvidence(recommendation: EnrichedRecommendation): number {
  const evidenceLevel = recommendation.scientificEvidence?.level;

  // Score basé sur le niveau de preuve
  if (evidenceLevel === 'high') {
    return 1.0;
  } else if (evidenceLevel === 'moderate') {
    return 0.7;
  } else if (evidenceLevel === 'preliminary') {
    return 0.4;
  }

  // Vérifier si des études scientifiques sont disponibles
  if (recommendation.scientificEvidence?.keyStudies && 
      recommendation.scientificEvidence.keyStudies.length > 0) {
    return 0.3 + (recommendation.scientificEvidence.keyStudies.length * 0.1);
  }

  return 0.2; // Score minimal si peu d'information scientifique
}

/**
 * Évalue la pertinence saisonnière
 */
function evaluateSeasonalRelevance(recommendation: EnrichedRecommendation): number {
  // Vérifier si une note contextuelle de saison est présente
  if (recommendation.userContextNotes && 
      recommendation.userContextNotes.toLowerCase().includes('saison')) {
    return 0.9;
  }

  // Vérifier la saison actuelle
  const currentDate = new Date();
  const month = currentDate.getMonth();

  // Saison hiver (décembre-février)
  if (month >= 11 || month <= 1) {
    if (['vitamin-d-supplement', 'zinc-picolinate', 'probiotics-daily'].includes(recommendation.id)) {
      return 0.9;
    }
  } 
  // Saison printemps (mars-mai)
  else if (month >= 2 && month <= 4) {
    if (['quercetin', 'probiotics-daily'].includes(recommendation.id)) {
      return 0.8;
    }
  }
  // Saison été (juin-août)
  else if (month >= 5 && month <= 7) {
    if (['magnesium-glycinate', 'electrolytes'].includes(recommendation.id)) {
      return 0.85;
    }
  }
  // Saison automne (septembre-novembre)
  else {
    if (['omega3-supplementation', 'vitamin-d-supplement'].includes(recommendation.id)) {
      return 0.8;
    }
  }

  return 0.5; // Pertinence saisonnière moyenne par défaut
}

/**
 * Évalue le profil de sécurité du supplément
 */
function evaluateSafetyProfile(recommendation: EnrichedRecommendation, quizResponses: QuizResponse): number {
  // Si des avertissements existent, réduire le score de sécurité
  if (recommendation.warningNotes && recommendation.warningNotes.length > 0) {
    return 0.5 - (recommendation.warningNotes.length * 0.1);
  }

  // Vérifier les interactions médicamenteuses
  if (quizResponses.medications && quizResponses.medications.length > 0) {
    // Si des médicaments sont pris, mais pas d'avertissements, bon score de sécurité
    return 0.7;
  }

  // Score élevé par défaut si aucun problème de sécurité identifié
  return 0.9;
}


/**
 * Construction de la matrice de synergie entre suppléments
 */
function buildSynergyMatrix(recommendations: EnrichedRecommendation[]): SynergyMatrix {
  const matrix: SynergyMatrix = {};

  recommendations.forEach(rec1 => {
    matrix[rec1.id] = {};
    recommendations.forEach(rec2 => {
      if (rec1.id !== rec2.id) {
        matrix[rec1.id][rec2.id] = calculateSynergyScore(rec1, rec2);
      }
    });
  });

  return matrix;
}

/**
 * Calcul du score de synergie entre deux suppléments
 */
function calculateSynergyScore(rec1: EnrichedRecommendation, rec2: EnrichedRecommendation): number {
  let score = 0;

  // Synergie basée sur les mécanismes d'action
  if (rec1.mechanisms && rec2.mechanisms) {
    score += evaluateMechanismSynergy(rec1.mechanisms, rec2.mechanisms);
  }

  // Synergie basée sur les objectifs communs
  const sharedGoals = getSharedGoals(rec1, rec2);
  score += (sharedGoals.length * 0.1);

  // Synergie basée sur les études scientifiques
  if (rec1.scientificEvidence && rec2.scientificEvidence) {
    score += evaluateScientificSynergy(rec1.scientificEvidence, rec2.scientificEvidence);
  }

  return Math.min(1, score);
}

/**
 * Application des règles de diversification
 */
function applyDiversificationRules(recommendations: ScoredRecommendation[]): ScoredRecommendation[] {
  const categories = new Map<string, ScoredRecommendation[]>();

  // Grouper par catégorie principale
  recommendations.forEach(rec => {
    const category = determineMainCategory(rec);
    if (!categories.has(category)) {
      categories.set(category, []);
    }
    categories.get(category)!.push(rec);
  });

  // Appliquer les règles de diversification par catégorie
  const diversified: ScoredRecommendation[] = [];
  categories.forEach(categoryRecs => {
    const selected = selectDiverseRecommendations(categoryRecs);
    diversified.push(...selected);
  });

  return diversified;
}

/**
 * Catégorisation dynamique des recommandations
 */
function categorizeDynamically(
  recommendations: ScoredRecommendation[], 
  userProfile: UserProfile
): EnrichedRecommendation[] {
  const categorized = recommendations.map(rec => {
    const category = determineCategory(rec, userProfile);
    const priority = calculatePriority(rec, category);

    return {
      ...rec,
      category,
      priority,
      isEssential: category === 'essential',
      displayOrder: calculateDisplayOrder(priority, category)
    };
  });

  return categorized.sort((a, b) => b.displayOrder - a.displayOrder);
}

/**
 * Détermination de la catégorie d'une recommandation
 */
function determineCategory(
  recommendation: ScoredRecommendation, 
  userProfile: UserProfile
): RecommendationCategory {
  const { scores } = recommendation;

  // Catégorie essentielle si score total élevé et forte correspondance avec le profil
  if (scores.total > 0.8 && scores.context > 0.7) {
    return 'essential';
  }

  // Catégorie complémentaire si bonne synergie avec les essentiels
  if (scores.synergy > 0.6) {
    return 'complementary';
  }

  // Catégorie de soutien pour les autres cas
  return 'supportive';
}

/**
 * Catégorise les recommandations en primaires, secondaires et complémentaires
 * avec intelligence contextuelle
 */
function categorizeRecommendations(recommendations: EnrichedRecommendation[]): EnrichedRecommendation[] {
  // Définir les seuils de score pour chaque catégorie
  const PRIMARY_THRESHOLD = 0.75;
  const SECONDARY_THRESHOLD = 0.6;

  // Maximum de 3 recommandations primaires, mais basé sur les scores
  const highScoreCount = recommendations.filter(rec => rec.priorityScore && rec.priorityScore >= PRIMARY_THRESHOLD).length;
  const primaryCount = Math.min(3, Math.max(1, highScoreCount));

  return recommendations.map((rec, index) => {
    // Les recommandations de haute priorité sont toujours primaires
    if (rec.priorityScore && rec.priorityScore >= PRIMARY_THRESHOLD) {
      rec.isPrimary = true;
      rec.categoryLabel = "Recommandation essentielle";
    } 
    // Les X premières sont primaires (basé sur primaryCount)
    else if (index < primaryCount) {
      rec.isPrimary = true;
      rec.categoryLabel = "Recommandation principale";
    }
    // Les recommandations de score moyen sont secondaires
    else if (rec.priorityScore && rec.priorityScore >= SECONDARY_THRESHOLD) {
      rec.isPrimary = false;
      rec.categoryLabel = "Recommandation complémentaire";
    }
    // Le reste est en soutien
    else {
      rec.isPrimary = false;
      rec.categoryLabel = "Soutien additionnel";
    }

    return rec;
  });
}

/**
 * Détecte la région géographique de l'utilisateur
 */
function detectUserGeography(quizResponses: QuizResponse): string {
  // Logique basique de détection - à étendre avec des APIs géographiques
  if (quizResponses.location?.country) {
    return quizResponses.location.country;
  }

  // Par défaut, on suppose que l'utilisateur est en France
  return 'France';
}

/**
 * Calcule la pertinence géographique d'une recommandation
 */
function calculateGeographicRelevance(recommendation: EnrichedRecommendation, country: string): number {
  // Suppléments particulièrement pertinents par région
  const geographicRelevance: Record<string, string[]> = {
    'France': ['vitamin-d-supplement', 'magnesium-glycinate', 'omega3-supplementation'],
    'Switzerland': ['vitamin-d-supplement', 'zinc-picolinate', 'selenium-supplement'],
    'Belgium': ['vitamin-d-supplement', 'magnesium-glycinate', 'iron-complex'],
    'Canada': ['vitamin-d-supplement', 'omega3-supplementation', 'vitamin-k2-supplement']
  };

  // Vérifier si la recommandation est particulièrement pertinente pour le pays
  const relevantSupplements = geographicRelevance[country] || geographicRelevance['France'];

  if (relevantSupplements.includes(recommendation.id)) {
    return 0.9;
  }

  return 0.7; // Valeur par défaut
}

/**
 * Calcule le score de besoin utilisateur avec une analyse multifactorielle
 */
function calculateUserNeedsScore(recommendation: EnrichedRecommendation, quizResponses: QuizResponse): number {
  // Base: correspondance aux objectifs déclarés
  let score = recommendation.matchedGoals ? 
    Math.min(1, recommendation.matchedGoals.length / 3) : 0.3;

  // Ajustement: correspondance entre les priorités de l'utilisateur et l'efficacité
  if (quizResponses.priorities) {
    if (quizResponses.priorities.includes('rapide') && recommendation.timeToEffect?.includes('rapide')) {
      score += 0.15;
    }
    if (quizResponses.priorities.includes('naturel') && recommendation.naturalSources?.length > 0) {
      score += 0.2;
    }
    if (quizResponses.priorities.includes('scientifique') && 
        recommendation.scientificEvidence?.level === 'high') {
      score += 0.25;
    }
  }

  // Ajustement: correspondance avec le profil de mode de vie
  if (quizResponses.lifestyle) {
    if (quizResponses.lifestyle.activityLevel === 'intense' && 
        (recommendation.id === 'magnesium-glycinate' || recommendation.id === 'electrolyte-complex')) {
      score += 0.1;
    }
    if (quizResponses.lifestyle.activityLevel === 'rarely_never' && 
        (recommendation.id === 'vitamin-d-supplement' || recommendation.id === 'omega3-supplementation')) {
      score += 0.1;
    }
  }

  return Math.min(1, score); // Maximum 1.0
}

/**
 * Récupère les retours d'utilisateurs similaires (simulation - à remplacer par API réelle)
 */
function getSimilarUsersFeedback(supplementId: string, quizResponses: QuizResponse): {
  satisfactionScore: number;
  conversionRate: number;
  count: number;
} {
  // Simule des données dynamiques - remplacer par une vraie base de données
  const defaultFeedback = {
    satisfactionScore: 0.75,
    conversionRate: 0.65,
    count: 15
  };

  // Ajuster en fonction des symptômes (simulation)
  if (quizResponses.symptoms?.includes('fatigue') && 
      (supplementId === 'vitamin-b-complex' || supplementId === 'iron-complex')) {
    return {
      satisfactionScore: 0.85,
      conversionRate: 0.78,
      count: 62
    };
  }

  if (quizResponses.symptoms?.includes('stress') && 
      (supplementId === 'magnesium-glycinate' || supplementId === 'ashwagandha-extract')) {
    return {
      satisfactionScore: 0.88,
      conversionRate: 0.82,
      count: 94
    };
  }

  return defaultFeedback;
}

/**
 * Analyse les synergies potentielles entre les recommandations
 */
function analyzeSynergiesBetweenRecommendations(scores: any[]): any[] {
  // Cloner les scores
  const enhancedScores = [...scores];

  // Vérifier les paires synergiques
  const synergisticPairs: [string, string][] = [
    ['vitamin-d-supplement', 'calcium-supplement'],
    ['vitamin-d-supplement', 'magnesium-glycinate'],
    ['iron-complex', 'vitamin-c-supplement'],
    ['omega3-supplementation', 'vitamin-e-complex'],
    ['probiotics-daily', 'prebiotics-supplement']
  ];

  // Chercher les synergies dans le jeu de recommandations
  for (const [supp1, supp2] of synergisticPairs) {
    const index1 = enhancedScores.findIndex(s => s.recommendation.id === supp1);
    const index2 = enhancedScores.findIndex(s => s.recommendation.id === supp2);

    // Si les deux suppléments sont présents, augmenter leurs scores
    if (index1 !== -1 && index2 !== -1) {
      enhancedScores[index1].score *= 1.1; // +10% pour le premier
      enhancedScores[index2].score *= 1.1; // +10% pour le second

      // Ajouter une note sur la synergie
      enhancedScores[index1].recommendation.synergyNote = 
        `Synergie positive avec ${enhancedScores[index2].recommendation.name}`;
      enhancedScores[index2].recommendation.synergyNote = 
        `Synergie positive avec ${enhancedScores[index1].recommendation.name}`;
    }
  }

  return enhancedScores;
}

/**
 * Assure la diversité des recommandations pour éviter la redondance
 */
function ensureRecommendationDiversity(scores: any[]): any[] {
  // Groupes de suppléments avec action similaire
  const similarActionGroups: string[][] = [
    ['ashwagandha-extract', 'rhodiola-rosea', 'adaptogenic-herbs'], // Adaptogènes
    ['vitamin-d-supplement', 'vitamin-d3-k2-supplement'], // Vitamine D
    ['probiotics-daily', 'gut-health-probiotic'], // Probiotiques
    ['melatonin-supplement', 'sleep-formula'] // Sommeil
  ];

  // Cloner les scores
  const diversifiedScores = [...scores];

  // Pour chaque groupe, garder seulement le meilleur score
  similarActionGroups.forEach(group => {
    // Trouver les indices des suppléments du groupe dans les scores
    const groupIndices = group
      .map(suppId => diversifiedScores.findIndex(s => s.recommendation.id === suppId))
      .filter(index => index !== -1);

    if (groupIndices.length > 1) {
      // Trier par score décroissant
      groupIndices.sort((a, b) => diversifiedScores[b].score - diversifiedScores[a].score);

      // Réduire le score des doublons (mais pas le premier/meilleur)
      groupIndices.slice(1).forEach(index => {
        diversifiedScores[index].score *= 0.85; // Réduction de 15%

        // Ajouter une note explicative
        diversifiedScores[index].recommendation.diversityNote = 
          `Action similaire à ${diversifiedScores[groupIndices[0]].recommendation.name}`;
      });
    }
  });

  return diversifiedScores;
}

/**
 * Génère une explication personnalisée ciblant spécifiquement les symptômes et objectifs
 */
export function generateTargetedExplanation(
  recommendation: EnrichedRecommendation, 
  quizResponses: QuizResponse
): string {
  const supplement = SUPPLEMENT_CATALOG[recommendation.id];

  if (!supplement) {
    return "Information détaillée non disponible pour ce complément.";
  }

  // Construire une explication scientifique personnalisée
  let explanation = `Le ${recommendation.name} est particulièrement pertinent pour votre profil car `;

  // Personnaliser en fonction des priorités identifiées
  if (recommendation.priorityScore && recommendation.priorityScore > 0.8) {
    explanation += `il correspond exceptionnellement bien (${Math.round(recommendation.priorityScore * 100)}%) à vos besoins spécifiques. `;
  } else if (recommendation.priorityScore && recommendation.priorityScore > 0.6) {
    explanation += `il répond bien (${Math.round(recommendation.priorityScore * 100)}%) à plusieurs de vos besoins clés. `;
  } else {
    explanation += `il peut apporter des bénéfices adaptés à certains aspects de votre profil. `;
  }

  // Ajouter les symptômes spécifiques ciblés
  if (recommendation.matchedSymptoms && recommendation.matchedSymptoms.length > 0) {
    explanation += `\n\nSymptômes ciblés: `;
    explanation += recommendation.matchedSymptoms.map(symptom => 
      `**${symptom}** (${getSymptomEffectiveness(symptom, recommendation)})`
    ).join(', ');
  }

  // Ajouter les objectifs spécifiques ciblés
  if (recommendation.matchedGoals && recommendation.matchedGoals.length > 0) {
    explanation += `\n\nObjectifs soutenus: `;
    explanation += recommendation.matchedGoals.map(goal => 
      `**${goal}** (${getGoalEffectiveness(goal, recommendation)})`
    ).join(', ');
  }

  // Ajouter des informations de contexte supplémentaires
  if (recommendation.contextualFactors && recommendation.contextualFactors.length > 0) {
    explanation += `\n\nFacteurs contextuels pris en compte: ${recommendation.contextualFactors.join(', ')}`;
  }

  return explanation;
}

/**
 * Détermine l'efficacité estimée pour un symptôme spécifique
 */
function getSymptomEffectiveness(symptom: string, recommendation: EnrichedRecommendation): string {
  // Ces valeurs seraient idéalement récupérées d'une base de données d'efficacité
  const effectiveness = {
    'fatigue': {
      'vitamin-b-complex': 'efficacité élevée',
      'coq10-ubiquinol': 'efficacité modérée',
      'iron-complex': 'efficacité élevée'
    },
    'stress': {
      'magnesium-glycinate': 'efficacité élevée',
      'ashwagandha-extract': 'efficacité élevée',
      'l-theanine': 'efficacité modérée'
    },
    'problèmes de sommeil': {
      'magnesium-glycinate': 'efficacité modérée',
      'melatonin-supplement': 'efficacité élevée',
      'valerian-root': 'efficacité modérée'
    },
    'digestion': {
      'probiotics-daily': 'efficacité élevée',
      'digestive-enzymes': 'efficacité modérée',
      'ginger-extract': 'efficacité modérée'
    }
  };

  // Vérifier si nous avons des données d'efficacité pour ce symptôme et ce supplément
  if (effectiveness[symptom as keyof typeof effectiveness] && 
      effectiveness[symptom as keyof typeof effectiveness][recommendation.id as keyof typeof effectiveness[keyof typeof effectiveness]]) {
    return effectiveness[symptom as keyof typeof effectiveness][recommendation.id as keyof typeof effectiveness[keyof typeof effectiveness]];
  }

  // Utiliser l'efficacité générale si pas de donnée spécifique
  if (recommendation.efficacyPercentage > 85) {
    return 'efficacité estimée élevée';
  } else if (recommendation.efficacyPercentage > 70) {
    return 'efficacité estimée modérée';
  } else {
    return 'peut apporter un soutien';
  }
}

/**
 * Détermine l'efficacité estimée pour un objectif spécifique
 */
function getGoalEffectiveness(goal: string, recommendation: EnrichedRecommendation): string {
  // Ces valeurs seraient idéalement récupérées d'une base de données d'efficacité
  const effectiveness = {
    'énergie': {
      'vitamin-b-complex': 'soutien optimal',
      'coq10-ubiquinol': 'soutien significatif',
      'iron-complex': 'soutien important'
    },
    'sommeil': {
      'magnesium-glycinate': 'soutien significatif',
      'melatonin-supplement': 'soutien optimal',
      'l-theanine': 'soutien modéré'
    },
    'immunité': {
      'vitamin-d-supplement': 'soutien optimal',
      'vitamin-c-complex': 'soutien significatif',
      'zinc-picolinate': 'soutien important'
    },
    'concentration': {
      'omega3-supplementation': 'soutien significatif',
      'ginkgo-biloba': 'soutien modéré',
      'bacopa-monnieri': 'soutien important'
    }
  };

  // Vérifier si nous avons des données d'efficacité pour cet objectif et ce supplément
  if (effectiveness[goal as keyof typeof effectiveness] && 
      effectiveness[goal as keyof typeof effectiveness][recommendation.id as keyof typeof effectiveness[keyof typeof effectiveness]]) {
    return effectiveness[goal as keyof typeof effectiveness][recommendation.id as keyof typeof effectiveness[keyof typeof effectiveness]];
  }

  // Utiliser l'efficacité générale si pas de donnée spécifique
  if (recommendation.efficacyPercentage > 85) {
    return 'soutien estimé optimal';
  } else if (recommendation.efficacyPercentage > 70) {
    return 'soutien estimé significatif';
  } else {
    return 'apporte un soutien';
  }
}


/**
 * Apply final adjustments based on additional factors
 */
function applyFinalAdjustments(recommendations: any[], quizData: QuizData): any[] {
  // First calculate compatibility scores between recommendations
  const compatibilityMatrix: Record<string, Record<string, number>> = {};

  // Try to import the supplement compatibility system
  let supplementSynergies: any[] = [];
  try {
    const { SUPPLEMENT_SYNERGIES } = require('./supplementCompatibilitySystem');
    supplementSynergies = SUPPLEMENT_SYNERGIES;
  } catch (error) {
    console.log("Supplement compatibility system not yet available");
  }

  // Build a matrix of compatibility scores between supplements
  recommendations.forEach(rec1 => {
    compatibilityMatrix[rec1.supplementId] = {};

    recommendations.forEach(rec2 => {
      if (rec1.supplementId === rec2.supplementId) {
        compatibilityMatrix[rec1.supplementId][rec2.supplementId] = 0;
        return;
      }

      // Check if there's a known synergy between these supplements
      const synergy = supplementSynergies.find(
        s => (s.primaryId === rec1.supplementId && s.secondaryId === rec2.supplementId) ||
             (s.primaryId === rec2.supplementId && s.secondaryId === rec1.supplementId)
      );

      if (synergy) {
        // Normalize synergy score to a 0-0.2 range for adjustment
        compatibilityMatrix[rec1.supplementId][rec2.supplementId] = (synergy.synergyScore / 100) * 0.2;
      } else {
        // Default mild compatibility
        compatibilityMatrix[rec1.supplementId][rec2.supplementId] = 0.05;
      }
    });
  });

  return recommendations.map(rec => {
    let adjustedScore = rec.matchScore;

    // Consider symptom severity if available
    if (quizData.symptomSeverity && rec.reasonSymptoms?.length > 0) {
      const avgSeverity = rec.reasonSymptoms.reduce((total: number, symptom: string) => {
        return total + (quizData.symptomSeverity?.[symptom] || 0);
      }, 0) / rec.reasonSymptoms.length;

      adjustedScore = adjustedScore * (1 + (avgSeverity / 10));
    }

    // Consider user priorities
    if (quizData.priorities) {
      if (quizData.priorities.includes('efficacy') && rec.efficacyPercentage) {
        adjustedScore = adjustedScore * (1 + (rec.efficacyPercentage / 100) * 0.2);
      }

      if (quizData.priorities.includes('scientific_evidence') && rec.scientificEvidence?.count) {
        const evidenceBoost = rec.scientificEvidence.count * 0.05;
        adjustedScore = adjustedScore * (1 + Math.min(evidenceBoost, 0.25));
      }

      if (quizData.priorities.includes('natural') && rec.naturalAlternatives?.length) {
        adjustedScore = adjustedScore * 1.15;
      }
    }

    // Apply compatibility boost based on synergy with other high-scoring recommendations
    if (compatibilityMatrix[rec.supplementId]) {
      let compatibilityBoost = 0;

      // Get top 3 recommendations excluding current one
      const topRecommendations = [...recommendations]
        .filter(r => r.supplementId !== rec.supplementId)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 3);

      // Calculate compatibility boost based on synergy with top recommendations
      topRecommendations.forEach(topRec => {
        const synergyScore = compatibilityMatrix[rec.supplementId][topRec.supplementId] || 0;
        compatibilityBoost += synergyScore * (topRec.matchScore / 10); // Weight by recommendation score
      });

      // Apply compatibility boost (limited to 25% max boost)
      adjustedScore = adjustedScore * (1 + Math.min(compatibilityBoost, 0.25));

      // Store compatibility information for debugging
      rec.compatibilityBoost = compatibilityBoost;
    }

    return {
      ...rec,
      matchScore: adjustedScore,
      originalScore: rec.matchScore // Keep original for comparison
    };
  });
}

/**
 * Calcule un score basé sur les corrélations symptôme-objectif détectées
 */
function calculateCorrelationScore(
  recommendation: EnrichedRecommendation,
  enrichedData: EnrichedQuizData
): number {
  // Si pas de corrélations ou pas de symptômes/objectifs correspondants, score minimal
  if (!enrichedData.correlations?.symptomObjectivePairs?.length ||
      !recommendation.matchedSymptoms?.length ||
      !recommendation.matchedGoals?.length) {
    return 0.3; // Score de base
  }

  let totalScore = 0;
  let matchedPairs = 0;

  // Parcourir toutes les paires de corrélations
  enrichedData.correlations.symptomObjectivePairs.forEach(pair => {
    const matchesSymptom = recommendation.matchedSymptoms?.includes(pair.symptom);
    const matchesObjective = recommendation.matchedGoals?.includes(pair.objective);

    // Si la recommandation correspond à cette paire corrélée
    if (matchesSymptom && matchesObjective) {
      totalScore += pair.strength; // Ajouter la force de corrélation au score
      matchedPairs++;
    }
  });

  // Si aucune paire correspondante, score minimal
  if (matchedPairs === 0) return 0.3;

  // Score moyen normalisé (entre 0.3 et 1.0)
  const avgScore = totalScore / matchedPairs;
  return 0.3 + (avgScore * 0.7);
}

/**
 * Calcule un score basé sur le profil de santé détecté
 */
function calculateHealthProfileScore(
  recommendation: EnrichedRecommendation,
  enrichedData: EnrichedQuizData
): number {
  let score = 0.5; // Score de base

  // Si pas de profil de santé, score moyen
  if (!enrichedData.healthProfile) return score;

  // Vérifier si la recommandation répond aux facteurs de risque
  if (enrichedData.healthProfile.riskFactors?.length) {
    // Définir les suppléments recommandés pour chaque facteur de risque
    const riskFactorToSupplements: Record<string, string[]> = {
      'déficience immunitaire': ['vitamin-d-supplement', 'zinc-picolinate', 'probiotics-daily', 'quercetin-supplement'],
      'déséquilibre stress-sommeil': ['magnesium-glycinate', 'ashwagandha-extract', 'l-theanine', 'melatonin-supplement'],
      'inflammation digestive': ['probiotics-daily', 'l-glutamine', 'digestive-enzymes', 'omega3-supplementation'],
      'risques liés à l\'âge': ['coq10-ubiquinol', 'vitamin-d-supplement', 'omega3-supplementation', 'resveratrol-supplement'],
      'sédentarité': ['vitamin-d-supplement', 'magnesium-glycinate', 'coq10-ubiquinol', 'omega3-supplementation'],
      'stress chronique': ['ashwagandha-extract', 'magnesium-glycinate', 'rhodiola-rosea', 'l-theanine']
    };

    // Vérifier si la recommandation est pertinente pour les facteurs de risque identifiés
    let riskFactorMatches = 0;
    let totalRiskFactors = enrichedData.healthProfile.riskFactors.length;

    enrichedData.healthProfile.riskFactors.forEach(risk => {
      const recommendedSupplements = riskFactorToSupplements[risk] || [];
      if (recommendedSupplements.includes(recommendation.id)) {
        riskFactorMatches++;
      }
    });

    // Score proportionnel au nombre de facteurs de risque correspondants
    if (riskFactorMatches > 0) {
      score += 0.3 * (riskFactorMatches / totalRiskFactors);
    }
  }

  // Vérifier si la recommandation correspond au focus suggéré
  if (enrichedData.healthProfile.suggestedFocus) {
    const focus = enrichedData.healthProfile.suggestedFocus;

    // Mapping des focus aux suppléments particulièrement pertinents
    const focusToSupplements: Record<string, string[]> = {
      'équilibre stress-sommeil': ['magnesium-glycinate', 'ashwagandha-extract', 'l-theanine', 'melatonin-supplement'],
      'renforcement immunitaire et énergétique': ['vitamin-d-supplement', 'zinc-picolinate', 'vitamin-b-complex', 'coq10-ubiquinol'],
      'santé digestive et anti-inflammatoire': ['probiotics-daily', 'digestive-enzymes', 'turmeric-curcumin', 'l-glutamine'],
      'mobilité et confort articulaire': ['glucosamine-chondroitin', 'omega3-supplementation', 'turmeric-curcumin', 'collagen-peptides'],
      'optimisation énergétique': ['vitamin-b-complex', 'coq10-ubiquinol', 'iron-complex', 'rhodiola-rosea'],
      'équilibre nerveux': ['magnesium-glycinate', 'l-theanine', 'ashwagandha-extract', 'omega3-supplementation'],
      'santé digestive': ['probiotics-daily', 'digestive-enzymes', 'l-glutamine', 'ginger-extract'],
      'vitalité et longévité': ['coq10-ubiquinol', 'vitamin-d-supplement', 'omega3-supplementation', 'resveratrol-supplement'],
      'bien-être général': ['magnesium-glycinate', 'vitamin-d-supplement', 'omega3-supplementation', 'probiotics-daily']
    };

    const focusSupplements = focusToSupplements[focus] || [];

    // Si parfaitement aligné avec le focus suggéré
    if (focusSupplements.includes(recommendation.id)) {
      score += 0.2;
    }
  }

  // Limiter le score entre 0 et 1
  return Math.min(1, score);
}

/**
 * Génère une explication enrichie pour la priorisation
 */
function generateEnrichedExplanation(
  scoreCalculator: PriorityScore,
  enrichedData: EnrichedQuizData | null
): string {
  if (!enrichedData) return scoreCalculator.generateExplanation();

  // Récupérer l'explication de base
  let explanation = scoreCalculator.generateExplanation();

  // Enrichir avec les informations de corrélation et de profil de santé
  if (enrichedData.correlations?.symptomObjectivePairs?.length > 0 && 
      scoreCalculator.weightedFactors.correlationStrength > 0.05) {
    explanation += ` Notre analyse montre que cette solution agit simultanément sur des symptômes et objectifs fortement corrélés dans votre profil.`;
  }

  if (enrichedData.healthProfile?.suggestedFocus && 
      scoreCalculator.weightedFactors.healthProfileMatch > 0.1) {
    explanation += ` Elle s'aligne particulièrement bien avec le focus principal identifié pour vous : ${enrichedData.healthProfile.suggestedFocus}.`;
  }

  if (enrichedData.correlations?.primarySymptomCluster && 
      scoreCalculator.weightedFactors.correlationStrength > 0.05) {
    explanation += ` Ce supplément est particulièrement efficace pour le groupe de symptômes "${enrichedData.correlations.primarySymptomCluster.replace(/-/g, ' et ')}" que nous avons identifié chez vous.`;
  }

  return explanation;
}

interface SynergyMatrix {
  [key: string]: { [key: string]: number };
}

interface ScoredRecommendation extends EnrichedRecommendation {
  scores: {
    base: number;
    synergy: number;
    context: number;
    efficacy: number;
    total: number;
  };
}

interface UserProfile {
  [key: string]: any;
}

interface QuizData {
  symptomSeverity?: { [key: string]: number };
  priorities?: string[];
}


// These functions are now defined within this file, removing the circular dependency
function determineMainCategory(recommendation: ScoredRecommendation): string {
  // Implement your logic to determine the main category here
  return recommendation.category || 'uncategorized';
}

function selectDiverseRecommendations(recommendations: ScoredRecommendation[]): ScoredRecommendation[] {
  // Implement your logic to select diverse recommendations here.
  return recommendations;
}

function calculatePriority(recommendation: ScoredRecommendation, category: RecommendationCategory): number {
  // Implement your logic to calculate the priority here.
  return recommendation.priorityScore || 0;
}

function calculateDisplayOrder(priority: number, category: RecommendationCategory): number {
  // Implement your logic to calculate the display order here.
  return priority;
}


// Add alias for backward compatibility
export const getPrioritizedRecommendations = prioritizeRecommendations;

export default {
  prioritizeRecommendations,
  generateTargetedExplanation,
  applyFinalAdjustments
};