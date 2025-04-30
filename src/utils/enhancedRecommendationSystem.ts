
/**
 * Système de recommandation nutritionnelle avancé
 * Ce fichier centralise et améliore les différentes composantes du système de recommandation
 * pour offrir des recommandations personnalisées et priorisées.
 */

import { 
  QuizResponse, 
  Recommendation, 
  EnrichedRecommendation,
  UserContext,
  RecommendationCategory
} from './types';

import { SUPPLEMENT_CATALOG } from '@/data/supplementCatalog';
import { scientificTerms } from '@/data/scientificTerms';
import { 
  SYMPTOM_RECOMMENDATIONS, 
  GOAL_RECOMMENDATIONS, 
  DIETARY_RECOMMENDATIONS
} from '@/data/recommendationMappings';

// Importer les sous-systèmes existants
import { getComprehensiveRecommendations } from './recommenderSystem';
import { prioritizeRecommendations, generateTargetedExplanation } from './prioritizationSystem';

/**
 * Génère des recommandations enrichies et priorisées basées sur les réponses du quiz
 * Cette fonction combine tous les aspects du système pour offrir l'expérience la plus personnalisée
 */
export function generateEnhancedRecommendations(quizResponses: QuizResponse, userContext?: UserContext): EnrichedRecommendation[] {
  try {
    console.log("Génération de recommandations avec les données:", quizResponses);
    
    // Étape 1: Générer les recommandations de base
    const baseRecommendations = getComprehensiveRecommendations({
      symptoms: quizResponses.healthConcerns?.symptoms || [],
      objectives: quizResponses.healthGoals?.objectives || [],
      lifestyle: quizResponses.lifestyle ? [quizResponses.lifestyle.activityLevel || ''] : [],
      dietaryHabits: quizResponses.dietaryHabits ? [quizResponses.dietaryHabits.dietType || ''] : [],
      proteinConsumption: quizResponses.dietaryHabits?.proteinConsumption,
      age: quizResponses.personal?.age,
      gender: quizResponses.personal?.gender
    });
    
    // Étape 2: Enrichir ces recommandations avec des données supplémentaires
    const enrichedRecommendations = enrichRecommendationsWithSupplementData(baseRecommendations, quizResponses);
    
    // Étape 3: Appliquer le système de priorité avancé
    const prioritizedRecommendations = applyAdvancedPrioritization(enrichedRecommendations, quizResponses, userContext);
    
    // Étape 4: Enrichir les descriptions avec des termes scientifiques
    const finalRecommendations = enhanceWithScientificContext(prioritizedRecommendations, quizResponses);
    
    return finalRecommendations;
  } catch (error) {
    console.error("Erreur lors de la génération des recommandations améliorées:", error);
    
    // En cas d'erreur, retourner des recommandations par défaut
    return getDefaultRecommendations(quizResponses);
  }
}

/**
 * Enrichit les recommandations de base avec des données détaillées du catalogue de suppléments
 */
function enrichRecommendationsWithSupplementData(
  recommendations: Recommendation[], 
  quizResponses: QuizResponse
): EnrichedRecommendation[] {
  return recommendations.map(rec => {
    const supplementData = SUPPLEMENT_CATALOG[rec.id];
    
    // Identifier les symptômes correspondants
    const matchedSymptoms = quizResponses.healthConcerns?.symptoms?.filter(symptom => {
      const relatedRecommendations = SYMPTOM_RECOMMENDATIONS[symptom] || [];
      return relatedRecommendations.includes(rec.id);
    });
    
    // Identifier les objectifs correspondants
    const matchedGoals = quizResponses.healthGoals?.objectives?.filter(goal => {
      const relatedRecommendations = GOAL_RECOMMENDATIONS[goal] || [];
      return relatedRecommendations.includes(rec.id);
    });
    
    // Calculer un score d'efficacité basé sur les données scientifiques
    const efficacyScore = supplementData?.efficacyScore || Math.round(rec.relevanceScore * 100);
    
    // Créer une recommandation enrichie
    return {
      ...rec,
      matchedSymptoms,
      matchedGoals,
      efficacyPercentage: efficacyScore,
      scientificEvidence: supplementData ? {
        level: getEvidenceLevel(supplementData),
        keyStudies: supplementData.scientificStudies || []
      } : undefined,
      standardDose: supplementData?.standardDose,
      timeToEffect: supplementData?.timeToEffect,
      warningNotes: supplementData?.contraindications,
      naturalSources: supplementData?.naturalSources,
      mechanisms: supplementData?.mechanismOfAction,
      userContextNotes: generateContextNotes(supplementData, quizResponses)
    };
  });
}

/**
 * Applique une logique de priorisation avancée pour ordonner les recommandations
 */
function applyAdvancedPrioritization(
  recommendations: EnrichedRecommendation[],
  quizResponses: QuizResponse,
  userContext?: UserContext
): EnrichedRecommendation[] {
  // Utiliser le système de priorisation existant si disponible
  try {
    const prioritizedRecs = prioritizeRecommendations(recommendations, quizResponses, userContext);
    
    // Vérifier si la priorisation a fonctionné correctement
    const hasValidPriorities = prioritizedRecs.some(rec => rec.priorityScore !== undefined && rec.priorityScore > 0);
    
    if (hasValidPriorities) {
      return prioritizedRecs;
    }
    
    console.warn("Le système de priorisation n'a pas produit de scores valides, utilisation de la méthode alternative");
  } catch (error) {
    console.error("Erreur dans le système de priorisation principal:", error);
  }
  
  // Méthode alternative de priorisation
  return applyFallbackPrioritization(recommendations, quizResponses);
}

/**
 * Méthode alternative de priorisation en cas d'échec du système principal
 */
function applyFallbackPrioritization(
  recommendations: EnrichedRecommendation[],
  quizResponses: QuizResponse
): EnrichedRecommendation[] {
  // Facteurs contextuels qui influencent la priorisation
  const contextualFactors = {
    age: quizResponses.personal?.age ? parseInt(quizResponses.personal.age) : 35,
    gender: quizResponses.personal?.gender || 'unknown',
    hasChronicConditions: quizResponses.healthConditions && Object.values(quizResponses.healthConditions).some(v => v === true),
    stressLevel: quizResponses.healthConcerns?.stressLevel || 'moderate',
    sleepQuality: quizResponses.healthConcerns?.sleepIssues || 'occasional',
    activityLevel: quizResponses.lifestyle?.activityLevel || 'moderate'
  };
  
  // Appliquer des scores de priorité personnalisés
  return recommendations.map(rec => {
    // Base score from initial relevance
    let priorityScore = rec.relevanceScore;
    
    // Ajuster en fonction du nombre de symptômes correspondants
    if (rec.matchedSymptoms && rec.matchedSymptoms.length > 0) {
      priorityScore += rec.matchedSymptoms.length * 0.05;
    }
    
    // Ajuster en fonction du nombre d'objectifs correspondants
    if (rec.matchedGoals && rec.matchedGoals.length > 0) {
      priorityScore += rec.matchedGoals.length * 0.07;
    }
    
    // Ajuster en fonction des facteurs contextuels
    if (contextualFactors.hasChronicConditions && 
        (rec.id === 'omega3-supplementation' || rec.id === 'vitamin-d-supplement' || rec.id === 'anti-inflammatory-diet')) {
      priorityScore += 0.1;
    }
    
    if (contextualFactors.stressLevel === 'high' && 
        (rec.id === 'adaptogenic-herbs' || rec.id === 'magnesium-glycinate' || rec.id === 'mindfulness-meditation')) {
      priorityScore += 0.15;
    }
    
    if (contextualFactors.sleepQuality === 'severe' && 
        (rec.id === 'magnesium-glycinate' || rec.id === 'melatonin-supplement' || rec.id === 'circadian-rhythm-optimization')) {
      priorityScore += 0.15;
    }
    
    // Ajuster en fonction de l'âge
    if (contextualFactors.age > 50 && 
        (rec.id === 'vitamin-d-supplement' || rec.id === 'coq10-ubiquinol' || rec.id === 'omega3-supplementation')) {
      priorityScore += 0.1;
    }
    
    // Normaliser le score entre 0 et 1
    priorityScore = Math.min(1, priorityScore);
    
    // Déterminer la catégorie
    const isPrimary = priorityScore >= 0.75;
    
    // Générer une explication de la priorité
    const priorityExplanation = generatePriorityExplanation(rec, priorityScore, contextualFactors);
    
    return {
      ...rec,
      priorityScore,
      isPrimary,
      categoryLabel: isPrimary ? "Recommandation principale" : "Recommandation complémentaire",
      priorityExplanation
    };
  }).sort((a, b) => (b.priorityScore || 0) - (a.priorityScore || 0));
}

/**
 * Enrichit les recommandations avec des termes scientifiques dans leurs descriptions
 */
function enhanceWithScientificContext(
  recommendations: EnrichedRecommendation[],
  quizResponses: QuizResponse
): EnrichedRecommendation[] {
  return recommendations.map(rec => {
    // Trouver des termes scientifiques pertinents pour cette recommandation
    const relevantTerms = scientificTerms.filter(term => {
      // Vérifier si le terme est lié à cette recommandation
      if (rec.relatedTerms && rec.relatedTerms.includes(term.id)) {
        return true;
      }
      
      // Vérifier si le terme est lié aux catégories de la recommandation
      if (rec.categories && term.categories) {
        return rec.categories.some(cat => term.categories.includes(cat));
      }
      
      return false;
    }).slice(0, 2); // Limiter à 2 termes pour ne pas surcharger
    
    // Enrichir la description avec les termes scientifiques
    let enrichedDescription = rec.description;
    
    relevantTerms.forEach(term => {
      // Éviter de remplacer si le terme est déjà balisé
      if (!enrichedDescription.includes(`[[${term.id}:`)) {
        // Remplacer le terme s'il existe déjà dans la description
        const termRegex = new RegExp(`\\b${term.title}\\b`, 'i');
        
        if (enrichedDescription.match(termRegex)) {
          enrichedDescription = enrichedDescription.replace(
            termRegex,
            `[[${term.id}:${term.title}]]`
          );
        } else {
          // Ajouter le terme à la fin si pertinent
          if (!enrichedDescription.endsWith('.')) {
            enrichedDescription += '. ';
          } else if (!enrichedDescription.endsWith(' ')) {
            enrichedDescription += ' ';
          }
          
          enrichedDescription += `Cette approche est liée au concept de [[${term.id}:${term.title}]].`;
        }
      }
    });
    
    // Générer une explication détaillée et personnalisée
    const detailedExplanation = generateTargetedExplanation(rec, quizResponses);
    
    return {
      ...rec,
      description: enrichedDescription,
      detailedExplanation
    };
  });
}

/**
 * Génère des recommandations par défaut en cas d'échec du processus principal
 */
function getDefaultRecommendations(quizResponses: QuizResponse): EnrichedRecommendation[] {
  const defaultRecs = [
    {
      id: "vitamin-d-supplement",
      title: "Vitamine D3",
      description: "Un apport quotidien en [[vitamin-d:Vitamine D]] peut aider à renforcer votre système immunitaire et à améliorer votre santé osseuse.",
      scientificBasis: "Des études cliniques montrent qu'une supplémentation en vitamine D peut réduire le risque d'infections respiratoires de 30% chez les personnes carencées.",
      relevanceScore: 0.8,
      categories: ["immunité", "os", "nutrition"],
      relatedTerms: ["vitamin-d"],
      efficacyPercentage: 85,
      priorityScore: 0.9,
      isPrimary: true,
      categoryLabel: "Recommandation principale"
    },
    {
      id: "probiotics-daily",
      title: "Probiotiques quotidiens",
      description: "L'intégration de [[probiotics:Probiotiques]] dans votre alimentation peut améliorer votre digestion et renforcer votre immunité intestinale. Cette approche est liée au concept de [[microbiome:Microbiome Intestinal]].",
      scientificBasis: "Des recherches récentes indiquent que certaines souches de probiotiques peuvent réduire l'inflammation intestinale et améliorer la barrière intestinale.",
      relevanceScore: 0.75,
      categories: ["digestion", "immunité", "nutrition"],
      relatedTerms: ["microbiome", "probiotics"],
      efficacyPercentage: 80,
      priorityScore: 0.85,
      isPrimary: true,
      categoryLabel: "Recommandation principale"
    },
    {
      id: "anti-inflammatory-diet",
      title: "Alimentation anti-inflammatoire",
      description: "Adopter une alimentation riche en [[antioxidant:Antioxydants]] et pauvre en aliments transformés peut réduire l'[[inflammation:Inflammation Chronique]] dans l'organisme.",
      scientificBasis: "Des études observationnelles montrent une corrélation entre la consommation d'aliments anti-inflammatoires et la réduction des marqueurs inflammatoires sanguins.",
      relevanceScore: 0.7,
      categories: ["nutrition", "immunité", "inflammation"],
      relatedTerms: ["inflammation", "antioxidant"],
      efficacyPercentage: 75,
      priorityScore: 0.8,
      isPrimary: true,
      categoryLabel: "Recommandation principale"
    }
  ] as EnrichedRecommendation[];
  
  // Ajouter une note expliquant qu'il s'agit de recommandations par défaut
  return defaultRecs.map(rec => ({
    ...rec,
    priorityExplanation: "Recommandation générale basée sur des principes nutritionnels fondamentaux. Complétez votre profil pour des recommandations plus personnalisées."
  }));
}

/**
 * Utilitaires pour générer des explications et obtenir des métadonnées
 */

/**
 * Détermine le niveau de preuve scientifique pour un supplément
 */
function getEvidenceLevel(supplementData: any): string {
  if (!supplementData) return 'preliminary';
  
  // Baser sur le nombre d'études disponibles
  const studiesCount = supplementData.scientificStudies?.length || 0;
  
  if (studiesCount >= 3) return 'high';
  if (studiesCount >= 1) return 'moderate';
  return 'preliminary';
}

/**
 * Génère des notes contextuelles pour un supplément en fonction du profil utilisateur
 */
function generateContextNotes(supplementData: any, quizResponses: QuizResponse): string {
  if (!supplementData) return '';
  
  const notes = [];
  
  // Ajouter des notes saisonnières si pertinent
  const currentMonth = new Date().getMonth();
  const isWinter = currentMonth >= 10 || currentMonth <= 2;
  
  if (isWinter && 
      (supplementData.id === 'vitamin-d-supplement' || 
       supplementData.id === 'elderberry')) {
    notes.push("Particulièrement recommandé pendant la saison hivernale");
  }
  
  // Ajouter des notes basées sur l'activité physique
  if (quizResponses.lifestyle?.activityLevel === 'intense' && 
      (supplementData.id === 'magnesium-glycinate' || 
       supplementData.id === 'electrolytes')) {
    notes.push("Bénéfique pour votre niveau d'activité physique élevé");
  }
  
  // Ajouter des notes basées sur le régime alimentaire
  if (quizResponses.dietaryHabits?.dietType === 'vegetarian' && 
      (supplementData.id === 'vitamin-b-complex' || 
       supplementData.id === 'iron')) {
    notes.push("Important pour compléter votre alimentation végétarienne");
  }
  
  if (quizResponses.dietaryHabits?.dietType === 'vegan' && 
      (supplementData.id === 'vitamin-b-complex' || 
       supplementData.id === 'vitamin-d-supplement' ||
       supplementData.id === 'omega3-supplementation')) {
    notes.push("Essentiel pour compléter votre alimentation végétalienne");
  }
  
  return notes.join('. ');
}

/**
 * Génère une explication détaillée du score de priorité
 */
function generatePriorityExplanation(
  recommendation: EnrichedRecommendation,
  priorityScore: number,
  contextFactors: any
): string {
  const scorePercentage = Math.round(priorityScore * 100);
  
  let explanation = `Ce supplément a été classé avec une priorité de ${scorePercentage}% `;
  
  // Ajouter des facteurs spécifiques
  const factors = [];
  
  if (recommendation.matchedSymptoms && recommendation.matchedSymptoms.length > 0) {
    factors.push(`cible directement ${recommendation.matchedSymptoms.length} de vos symptômes clés`);
  }
  
  if (recommendation.matchedGoals && recommendation.matchedGoals.length > 0) {
    factors.push(`correspond à ${recommendation.matchedGoals.length} de vos objectifs de santé`);
  }
  
  if (recommendation.efficacyPercentage && recommendation.efficacyPercentage > 80) {
    factors.push(`présente une efficacité prouvée de ${recommendation.efficacyPercentage}%`);
  }
  
  if (factors.length > 0) {
    explanation += `car il ${factors.join(' et ')}`;
  } else {
    explanation += `basé sur votre profil global`;
  }
  
  // Ajouter facteurs contextuels si pertinents
  if (contextFactors.age > 50 && 
      (recommendation.id === 'vitamin-d-supplement' || 
       recommendation.id === 'coq10-ubiquinol')) {
    explanation += `. Ce supplément est particulièrement important pour votre groupe d'âge`;
  }
  
  if (contextFactors.stressLevel === 'high' && 
      (recommendation.id === 'adaptogenic-herbs' || 
       recommendation.id === 'magnesium-glycinate')) {
    explanation += `. Cette recommandation est très pertinente compte tenu de votre niveau de stress`;
  }
  
  return explanation;
}

export default {
  generateEnhancedRecommendations
};
