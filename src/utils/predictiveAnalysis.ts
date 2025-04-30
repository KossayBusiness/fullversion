
/**
 * Système d'analyse prédictive pour anticiper les besoins nutritionnels
 * des utilisateurs sur la base des tendances et des données saisonnières
 */

import { secureStorageService } from './secureStorage';
import { UserProfile, QuizResponse, PredictiveInsight } from './types';
import { SYMPTOM_CATEGORIES } from '../data/recommendationMappings';

interface SeasonalPattern {
  name: string;
  startMonth: number;
  endMonth: number;
  relatedSymptoms: string[];
  relatedSupplements: string[];
  description: string;
}

// Motifs saisonniers connus qui affectent les besoins nutritionnels
const SEASONAL_PATTERNS: SeasonalPattern[] = [
  {
    name: 'Hiver',
    startMonth: 12,
    endMonth: 2,
    relatedSymptoms: ['immune', 'energy', 'mood'],
    relatedSupplements: ['vitamin_d', 'vitamin_c', 'zinc', 'echinacea'],
    description: 'Période hivernale avec besoins accrus en soutien immunitaire et énergétique'
  },
  {
    name: 'Printemps',
    startMonth: 3,
    endMonth: 5,
    relatedSymptoms: ['allergies', 'digestion', 'detox'],
    relatedSupplements: ['quercetin', 'nettle', 'milk_thistle', 'probiotics'],
    description: 'Saison des allergies et période de détoxification naturelle'
  },
  {
    name: 'Été',
    startMonth: 6,
    endMonth: 8,
    relatedSymptoms: ['hydration', 'skin', 'energy'],
    relatedSupplements: ['electrolytes', 'antioxidants', 'aloe_vera'],
    description: 'Période de forte chaleur nécessitant une attention à l\'hydratation et la protection cutanée'
  },
  {
    name: 'Automne',
    startMonth: 9,
    endMonth: 11,
    relatedSymptoms: ['immune', 'stress', 'mood'],
    relatedSupplements: ['vitamin_c', 'adaptogens', 'omega3'],
    description: 'Transition vers les mois froids avec besoin de soutien immunitaire et adaptation au stress'
  }
];

/**
 * Détermine les tendances saisonnières actuelles en fonction de la date
 */
export const getCurrentSeasonalTrends = (): SeasonalPattern => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // getMonth() retourne 0-11
  
  const currentSeason = SEASONAL_PATTERNS.find(
    season => 
      (currentMonth >= season.startMonth && currentMonth <= season.endMonth) ||
      (season.startMonth > season.endMonth && (currentMonth >= season.startMonth || currentMonth <= season.endMonth))
  );
  
  return currentSeason || SEASONAL_PATTERNS[0]; // Retourne l'hiver par défaut
};

/**
 * Analyse les données historiques pour identifier des tendances
 */
const analyzeHistoricalData = (): Map<string, number> => {
  // Récupérer les données d'apprentissage
  const learningData = secureStorageService.getItem('aiLearningData') || [];
  
  // Cartographier les symptômes rapportés dans le temps
  const symptomFrequency = new Map<string, number>();
  
  // Parcourir les données historiques
  learningData.forEach((data: any) => {
    const profile = data.userProfile;
    
    if (profile && profile.activeSymptoms) {
      profile.activeSymptoms.forEach((symptom: string) => {
        const currentCount = symptomFrequency.get(symptom) || 0;
        symptomFrequency.set(symptom, currentCount + 1);
      });
    }
  });
  
  return symptomFrequency;
};

/**
 * Génère des insights prédictifs basés sur le profil utilisateur et les tendances saisonnières
 */
export const generatePredictiveInsights = (
  userProfile: UserProfile
): PredictiveInsight[] => {
  // Obtenir les tendances saisonnières actuelles
  const currentSeason = getCurrentSeasonalTrends();
  
  // Analyser les données historiques
  const symptomFrequency = analyzeHistoricalData();
  
  // Identifier les besoins probables basés sur la saison et l'historique
  const predictiveInsights: PredictiveInsight[] = [];
  
  // Ajouter les insights saisonniers
  currentSeason.relatedSymptoms.forEach(symptom => {
    // Vérifier si l'utilisateur a déjà ce symptôme actif
    const userHasSymptom = userProfile.activeSymptoms.includes(symptom);
    
    if (!userHasSymptom) {
      // Trouver les suppléments recommandés pour ce symptôme saisonnier
      const seasonalSupplements = currentSeason.relatedSupplements.filter(
        supplement => SYMPTOM_CATEGORIES[symptom]?.includes(supplement)
      );
      
      if (seasonalSupplements.length > 0) {
        predictiveInsights.push({
          type: 'seasonal',
          symptom,
          relevance: 0.8, // Haute relevance pour les tendances saisonnières
          supplements: seasonalSupplements,
          description: `En cette saison (${currentSeason.name}), de nombreuses personnes connaissent des problèmes de ${symptom}. Considérez un soutien nutritionnel préventif.`
        });
      }
    }
  });
  
  // Ajouter des insights basés sur les données historiques
  // Trouver les symptômes les plus fréquents qui ne sont pas actifs chez l'utilisateur
  const topHistoricalSymptoms = Array.from(symptomFrequency.entries())
    .filter(([symptom]) => !userProfile.activeSymptoms.includes(symptom))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([symptom, frequency]) => ({
      symptom,
      frequency
    }));
  
  topHistoricalSymptoms.forEach(({ symptom, frequency }) => {
    const totalEntries = learningData?.length || 1;
    const prevalence = frequency / totalEntries;
    
    if (prevalence > 0.3) { // Plus de 30% des utilisateurs rapportent ce symptôme
      predictiveInsights.push({
        type: 'statistical',
        symptom,
        relevance: prevalence,
        supplements: SYMPTOM_CATEGORIES[symptom] || [],
        description: `${Math.round(prevalence * 100)}% des utilisateurs avec un profil similaire ont signalé des problèmes de ${symptom}. Un soutien nutritionnel préventif pourrait être bénéfique.`
      });
    }
  });
  
  return predictiveInsights;
};

/**
 * Intègre les insights prédictifs dans les recommandations
 */
export const enhanceRecommendationsWithPredictiveInsights = (
  recommendations: any[],
  userProfile: UserProfile
): any[] => {
  // Générer les insights prédictifs
  const predictiveInsights = generatePredictiveInsights(userProfile);
  
  // Marquer les recommandations qui correspondent aux insights prédictifs
  const enhancedRecommendations = recommendations.map(rec => {
    const matchingInsights = predictiveInsights.filter(insight =>
      insight.supplements.includes(rec.id)
    );
    
    if (matchingInsights.length > 0) {
      return {
        ...rec,
        predictiveInsights: matchingInsights,
        isPredictive: true
      };
    }
    
    return rec;
  });
  
  // Ajouter des nouvelles recommandations basées uniquement sur les prédictions
  // si elles ne sont pas déjà incluses
  const existingSupplementIds = new Set(enhancedRecommendations.map(r => r.id));
  
  predictiveInsights.forEach(insight => {
    insight.supplements.forEach(supplementId => {
      if (!existingSupplementIds.has(supplementId)) {
        enhancedRecommendations.push({
          id: supplementId,
          title: `${supplementId} (Recommandation préventive)`,
          description: insight.description,
          reasons: [`Basé sur l'analyse prédictive: ${insight.description}`],
          score: 70 * insight.relevance, // Score proportionnel à la pertinence
          isPredictive: true,
          predictiveInsights: [insight]
        });
        
        existingSupplementIds.add(supplementId);
      }
    });
  });
  
  // Trier les recommandations avec une préférence pour les non-prédictives
  return enhancedRecommendations.sort((a, b) => {
    // D'abord par score
    if (a.isPredictive !== b.isPredictive) {
      return a.isPredictive ? 1 : -1; // Les non-prédictives en premier
    }
    // Ensuite par score
    return b.score - a.score;
  });
};
