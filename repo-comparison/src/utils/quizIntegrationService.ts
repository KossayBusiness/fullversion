
/**
 * Service d'intégration du système de recommandation au quiz nutritionnel
 * Ce service connecte l'algorithme de recommandation aux réponses du quiz
 * et génère des recommandations personnalisées
 */

import SUPPLEMENT_CATALOG from '@/data/supplementCatalog';
import { QuizData, Recommendation } from '@/utils/types';
import { SYMPTOM_RECOMMENDATIONS, GOAL_RECOMMENDATIONS } from '@/data/recommendationMappings';

/**
 * Convertit les données du quiz en format exploitable pour le système de recommandation
 */
const enrichQuizData = (quizData: QuizData) => {
  // Copier les données de base
  const enrichedData = { ...quizData };
  
  // Ajouter des catégories de santé basées sur les symptômes
  const healthCategories: string[] = [];
  
  if (quizData.symptoms?.includes('Fatigue')) {
    healthCategories.push('energy_issues');
  }
  
  if (quizData.symptoms?.includes('Troubles du sommeil')) {
    healthCategories.push('sleep_issues');
  }
  
  if (quizData.symptoms?.includes('Stress') || quizData.symptoms?.includes('Anxiété')) {
    healthCategories.push('stress_issues');
  }
  
  if (quizData.symptoms?.includes('Problèmes digestifs')) {
    healthCategories.push('digestive_issues');
  }
  
  if (quizData.symptoms?.includes('Douleurs articulaires')) {
    healthCategories.push('joint_issues');
  }
  
  if (quizData.symptoms?.includes('Problèmes de peau')) {
    healthCategories.push('skin_issues');
  }
  
  if (quizData.symptoms?.includes('Système immunitaire faible')) {
    healthCategories.push('immune_issues');
  }
  
  // Ajouter des profils alimentaires basés sur les habitudes
  let dietProfile = 'balanced';
  
  if (quizData.dietaryHabits?.includes('Végétarien')) {
    dietProfile = 'vegetarian';
  } else if (quizData.dietaryHabits?.includes('Végan')) {
    dietProfile = 'vegan';
  } else if (quizData.dietaryHabits?.includes('Pescetarien')) {
    dietProfile = 'pescetarian';
  } else if (quizData.dietaryHabits?.includes('Flexitarien')) {
    dietProfile = 'flexitarian';
  }
  
  // Ajouter les catégories au data enrichi
  return {
    ...enrichedData,
    healthCategories,
    dietProfile
  };
};

/**
 * Obtenir des recommandations personnalisées basées sur les réponses au quiz
 */
const getPersonalizedRecommendations = (enrichedQuizData: any): Recommendation[] => {
  console.log("Génération de recommandations complètes avec les données:", enrichedQuizData);
  
  // Tableau pour stocker toutes les recommandations candidates
  const recommendationCandidates: any[] = [];
  
  // Traiter les symptômes
  if (enrichedQuizData.symptoms && enrichedQuizData.symptoms.length > 0) {
    console.log("Génération de recommandations avec les données:", enrichedQuizData);
    console.log("Analyse des données du quiz pour les recommandations:", enrichedQuizData);
    
    enrichedQuizData.symptoms.forEach((symptom: string) => {
      // Récupérer les recommandations liées aux symptômes depuis les mappings
      const symptomRecs = SYMPTOM_RECOMMENDATIONS[symptom] || [];
      
      symptomRecs.forEach((recId: string) => {
        const supplement = SUPPLEMENT_CATALOG[recId];
        
        if (supplement) {
          recommendationCandidates.push({
            id: recId,
            title: supplement.name,
            description: supplement.description,
            scientificBasis: supplement.scientificBasis,
            relevanceScore: 0.6 + Math.random() * 0.3, // Score de base + facteur aléatoire
            categories: supplement.categories || ['nutrition'],
            relatedTerms: supplement.relatedTerms || []
          });
        }
      });
    });
  }
  
  // Traiter les objectifs
  if (enrichedQuizData.objectives && enrichedQuizData.objectives.length > 0) {
    enrichedQuizData.objectives.forEach((objective: string) => {
      // Récupérer les recommandations liées aux objectifs depuis les mappings
      const goalRecs = GOAL_RECOMMENDATIONS[objective] || [];
      
      goalRecs.forEach((recId: string) => {
        const supplement = SUPPLEMENT_CATALOG[recId];
        
        if (supplement) {
          recommendationCandidates.push({
            id: recId,
            title: supplement.name,
            description: supplement.description,
            scientificBasis: supplement.scientificBasis,
            relevanceScore: 0.7 + Math.random() * 0.3, // Score légèrement plus élevé pour les objectifs
            categories: supplement.categories || ['nutrition'],
            relatedTerms: supplement.relatedTerms || []
          });
        }
      });
    });
  }
  
  // Si aucune recommandation n'a été trouvée, ajouter des recommandations par défaut
  if (recommendationCandidates.length === 0) {
    // Recommandations de base
    const defaultRecommendations = [
      "vitamin_d3", "magnesium_glycinate", "omega3-supplementation", 
      "vitamin_b_complex", "probiotics"
    ];
    
    defaultRecommendations.forEach(recId => {
      const supplement = SUPPLEMENT_CATALOG[recId];
      if (supplement) {
        recommendationCandidates.push({
          id: recId,
          title: supplement.name,
          description: supplement.description,
          scientificBasis: supplement.scientificBasis,
          relevanceScore: 0.5 + Math.random() * 0.2, // Score de base pour les recommandations par défaut
          categories: supplement.categories || ['nutrition'],
          relatedTerms: supplement.relatedTerms || []
        });
      }
    });
  }
  
  // Éliminer les doublons en conservant celui avec le score de pertinence le plus élevé
  const uniqueRecommendations = recommendationCandidates.reduce((acc: any[], current: any) => {
    const duplicate = acc.find(item => item.id === current.id);
    
    if (!duplicate) {
      return [...acc, current];
    } else if (duplicate.relevanceScore < current.relevanceScore) {
      return acc.map(item => item.id === current.id ? current : item);
    }
    return acc;
  }, []);
  
  // Enrichir les descriptions avec du texte scientifique
  const enrichedRecommendations = uniqueRecommendations.map((rec: any) => {
    // Ajouter des balises pour le traitement des termes scientifiques
    let enrichedDescription = rec.description;
    
    // Si la description ne contient pas déjà de balises scientifiques
    if (!enrichedDescription.includes('[[')) {
      // Exemples de termes scientifiques à mettre en évidence
      const termPairs = [
        ['vitamine D', 'vitamin-d'],
        ['antioxydants', 'antioxidant'],
        ['inflammation', 'inflammation'],
        ['magnésium', 'magnesium'],
        ['probiotiques', 'probiotics'],
        ['oméga-3', 'omega3']
      ];
      
      // Rechercher et remplacer les termes scientifiques
      termPairs.forEach(([term, tag]) => {
        const regex = new RegExp(`\\b${term}\\b`, 'i');
        if (regex.test(enrichedDescription)) {
          enrichedDescription = enrichedDescription.replace(
            regex, 
            `[[${tag}:${term}]]`
          );
        }
      });
    }
    
    return {
      ...rec,
      description: enrichedDescription
    };
  });
  
  // Trier par score de pertinence et limiter à 5 recommandations
  const finalRecommendations = enrichedRecommendations
    .sort((a: any, b: any) => b.relevanceScore - a.relevanceScore)
    .slice(0, 5);
  
  console.log("Recommandations de base générées:", finalRecommendations.length);
  console.log("Recommandations enrichies générées:", finalRecommendations.length);
  
  return finalRecommendations;
};

// Fonction d'intégration pour générer des explications détaillées pour chaque recommandation
const generateDetailedExplanation = (recommendation: Recommendation, quizData: QuizData): string => {
  const supplement = SUPPLEMENT_CATALOG[recommendation.id];
  
  if (!supplement) {
    return `Aucune information détaillée n'est disponible pour cette recommandation.`;
  }
  
  // Construire une explication personnalisée
  let explanation = `<strong>${supplement.name}</strong>\n\n`;
  
  // Ajouter la base scientifique
  explanation += `<p class="scientific-basis"><strong>Base scientifique:</strong> ${supplement.scientificBasis}</p>\n\n`;
  
  // Ajouter le mode d'action
  explanation += `<p><strong>Comment ça fonctionne:</strong> `;
  
  // Personnaliser selon les symptômes de l'utilisateur
  const relevantSymptoms = quizData.symptoms?.filter(symptom => 
    supplement.targetSymptoms?.includes(symptom)
  ) || [];
  
  if (relevantSymptoms.length > 0) {
    explanation += `Ce complément est particulièrement adapté pour aider avec vos symptômes de ${relevantSymptoms.join(', ')}. `;
  }
  
  // Ajouter le dosage recommandé
  explanation += `</p>\n\n<p><strong>Dosage recommandé:</strong> ${supplement.recommendedDosage}</p>`;
  
  // Ajouter le délai d'efficacité
  explanation += `\n\n<p><strong>Délai d'efficacité:</strong> Généralement, les effets commencent à se faire sentir après ${supplement.timeToEffect}.</p>`;
  
  // Ajouter les sources naturelles
  if (supplement.naturalSources && supplement.naturalSources.length > 0) {
    explanation += `\n\n<p><strong>Sources naturelles:</strong> ${supplement.naturalSources.join(', ')}</p>`;
  }
  
  // Ajouter les précautions si elles existent
  if (supplement.cautions) {
    explanation += `\n\n<p><strong>Précautions:</strong> ${supplement.cautions}</p>`;
  }
  
  return explanation;
};

// Exporter les fonctions du service
export default {
  enrichQuizData,
  getPersonalizedRecommendations,
  generateDetailedExplanation
};
