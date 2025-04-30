
import { useState, useEffect, useCallback } from 'react';
import { QuizResponse, BehavioralMetrics, Recommendation, NeuroProfile } from '@/utils/types';
import { 
  generateRecommendations, 
  generateRecommendationExplanation,
  recordLearningData
} from '@/utils/recommenderSystem';

interface UseAdvancedRecommendationsProps {
  quizResponses: QuizResponse;
  behavioralMetrics: BehavioralMetrics;
  neuroProfile: NeuroProfile;
}

interface UseAdvancedRecommendationsResult {
  recommendations: Recommendation[];
  explanation: string;
  isLoading: boolean;
  isPrioritized: boolean;
  precision: number;
  recalculateRecommendations: () => void;
  prioritizeByMetric: (metric: 'scientific' | 'popular' | 'quickEffect') => void;
  recordFeedback: (recommendation: Recommendation, feedback: { helpful: boolean; purchaseIntent: number; additionalComments?: string }) => void;
}

/**
 * Trie les recommandations selon un critère spécifique
 */
function sortRecommendations(
  recommendations: Recommendation[],
  sortCriteria: 'scientific' | 'popular' | 'quickEffect'
): Recommendation[] {
  const sortedRecommendations = [...recommendations];

  switch (sortCriteria) {
    case 'scientific':
      // Prioritiser les recommandations avec des bases scientifiques solides
      return sortedRecommendations.sort((a, b) => {
        // Si la base scientifique est présente, donner un bonus
        const aHasScience = a.scientificBasis ? 0.2 : 0;
        const bHasScience = b.scientificBasis ? 0.2 : 0;
        return (b.confidence + bHasScience) - (a.confidence + aHasScience);
      });

    case 'popular':
      // Prioritiser les recommandations populaires
      return sortedRecommendations.sort((a, b) => {
        return (b.popularity || 0) - (a.popularity || 0);
      });

    case 'quickEffect':
      // Prioritiser les recommandations à effet rapide
      return sortedRecommendations.sort((a, b) => {
        // Convertir timeToEffect en valeur numérique pour le tri
        const getWeeksValue = (timeStr: string): number => {
          const match = timeStr.match(/(\d+)-?(\d+)?/);
          if (!match) return 99; // Valeur élevée par défaut
          return parseInt(match[1]); // Utiliser la valeur inférieure de la plage
        };
        
        return getWeeksValue(a.timeToEffect) - getWeeksValue(b.timeToEffect);
      });

    default:
      return sortedRecommendations;
  }
}

/**
 * Hook avancé pour générer et gérer les recommandations personnalisées
 * avec système d'apprentissage automatique
 */
export function useAdvancedRecommendations({
  quizResponses,
  behavioralMetrics,
  neuroProfile
}: UseAdvancedRecommendationsProps): UseAdvancedRecommendationsResult {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPrioritized, setIsPrioritized] = useState<boolean>(false);
  const [priorityMetric, setPriorityMetric] = useState<'scientific' | 'popular' | 'quickEffect' | null>(null);
  const [precision, setPrecision] = useState<number>(85); // Précision estimée du système de recommandation

  // Fonction pour calculer les recommandations
  const calculateRecommendations = useCallback(() => {
    setIsLoading(true);

    // Simuler un délai réaliste d'analyse avec un temps variable basé sur la complexité
    const complexityFactor = Object.keys(quizResponses).length * 100;
    const analysisTime = Math.min(2000, Math.max(800, complexityFactor));

    setTimeout(() => {
      try {
        // Générer les recommandations de base
        let generatedRecommendations = generateRecommendations(
          quizResponses,
          behavioralMetrics,
          neuroProfile
        );

        // Appliquer la priorisation si nécessaire
        if (priorityMetric) {
          generatedRecommendations = sortRecommendations(generatedRecommendations, priorityMetric);
        }

        // Générer l'explication
        const generatedExplanation = generateRecommendationExplanation(
          generatedRecommendations,
          quizResponses
        );

        setRecommendations(generatedRecommendations);
        setExplanation(generatedExplanation);
        setIsPrioritized(!!priorityMetric);
        
        // Calculer la précision estimée basée sur la qualité des données
        const completenessScore = calculateQuizCompleteness(quizResponses);
        const newPrecision = Math.min(98, 75 + completenessScore * 20);
        setPrecision(Math.round(newPrecision));
      } catch (error) {
        console.error('Erreur lors du calcul des recommandations:', error);
        
        // Recommandations par défaut en cas d'erreur
        setRecommendations([
          {
            title: 'Complexe Nutritionnel Standard',
            description: 'Formule équilibrée pour les besoins quotidiens',
            confidence: 0.65,
            benefits: [
              'Soutien nutritionnel général',
              'Équilibre des vitamines et minéraux essentiels'
            ],
            timeToEffect: '3-4 semaines',
            popularity: 60
          }
        ]);
        
        setExplanation("Nous avons préparé une recommandation générale basée sur les informations disponibles. Pour des conseils plus précis, n'hésitez pas à consulter un professionnel de santé.");
        setPrecision(65);
      } finally {
        setIsLoading(false);
      }
    }, analysisTime);
  }, [quizResponses, behavioralMetrics, neuroProfile, priorityMetric]);

  // Calcul du score de complétude du quiz
  const calculateQuizCompleteness = (responses: QuizResponse): number => {
    // Définir les sections clés du quiz
    const keySections = ['personal', 'diet', 'lifestyle', 'wellbeing', 'goals', 'symptoms'];
    const sectionWeights = {
      personal: 0.2,
      diet: 0.2,
      lifestyle: 0.15,
      wellbeing: 0.2,
      goals: 0.15,
      symptoms: 0.1
    };
    
    let totalScore = 0;
    
    // Évaluer chaque section
    for (const section of keySections) {
      if (responses[section]) {
        const sectionData = responses[section];
        const fields = Object.keys(sectionData).length;
        const filledFields = Object.values(sectionData).filter(value => value !== null && value !== undefined && value !== '').length;
        
        if (fields > 0) {
          const sectionCompleteness = filledFields / fields;
          totalScore += sectionCompleteness * (sectionWeights[section as keyof typeof sectionWeights] || 0.1);
        }
      }
    }
    
    // Normaliser le score sur 0-1
    return Math.min(1, totalScore);
  };

  // Prioritiser les recommandations selon un critère
  const prioritizeByMetric = useCallback((metric: 'scientific' | 'popular' | 'quickEffect') => {
    setPriorityMetric(metric);
    
    // Réappliquer le tri aux recommandations existantes
    const sortedRecommendations = sortRecommendations(recommendations, metric);
    setRecommendations(sortedRecommendations);
    setIsPrioritized(true);
    
    // Mettre à jour l'explication avec la nouvelle recommandation principale
    if (sortedRecommendations.length > 0) {
      const newExplanation = generateRecommendationExplanation(sortedRecommendations, quizResponses);
      setExplanation(newExplanation);
    }
  }, [recommendations, quizResponses]);

  // Enregistrer le feedback utilisateur pour améliorer les recommandations futures
  const recordFeedback = useCallback((recommendation: Recommendation, feedback: { helpful: boolean; purchaseIntent: number; additionalComments?: string }) => {
    recordLearningData(quizResponses, recommendation, feedback);
    
    // Mise à jour de la précision estimée basée sur le feedback
    if (feedback.helpful) {
      setPrecision(prev => Math.min(99, prev + 1));
    } else {
      setPrecision(prev => Math.max(70, prev - 1));
    }
  }, [quizResponses]);

  // Générer les recommandations au chargement initial
  useEffect(() => {
    calculateRecommendations();
  }, [calculateRecommendations]);

  return {
    recommendations,
    explanation,
    isLoading,
    isPrioritized,
    precision,
    recalculateRecommendations: calculateRecommendations,
    prioritizeByMetric,
    recordFeedback
  };
}
