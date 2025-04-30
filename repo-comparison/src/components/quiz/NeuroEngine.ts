
/**
 * Moteur neuroscientifique pour le quiz nutritionnel
 * Analyse les patterns utilisateur pour personnaliser les résultats
 */

// Calcule le niveau de stress cognitif basé sur les patterns de navigation
export const calculateCortisolLevel = (userBehaviorData: {
  scrollSpeed?: number;
  timeSpent?: number;
  clickPatterns?: number[];
}): number => {
  // Valeurs par défaut si les données ne sont pas disponibles
  const { 
    scrollSpeed = Math.random() * 3 + 1, 
    timeSpent = Math.random() * 120 + 60,
    clickPatterns = [Math.random(), Math.random(), Math.random() * 2]
  } = userBehaviorData;
  
  // Algorithme neuroscientifique simplifié
  const baseLevel = 50; // Niveau de base
  const scrollFactor = scrollSpeed > 2 ? scrollSpeed * 5 : scrollSpeed * 2;
  const timeFactor = Math.min(timeSpent / 30, 5) * 6;
  const clickIntensity = clickPatterns.reduce((sum, val) => sum + val, 0) / clickPatterns.length;
  
  // Calcul avec pondération
  let cortisolLevel = baseLevel + scrollFactor + timeFactor + (clickIntensity * 15);
  
  // Normalisation entre 20 et 90
  cortisolLevel = Math.min(Math.max(cortisolLevel, 20), 90);
  
  // Ajout d'une variation aléatoire pour rendre les résultats moins prévisibles
  const randomVariation = Math.random() * 10 - 5;
  return Math.round(cortisolLevel + randomVariation);
};

// Mesure l'attention portée à des termes spécifiques
export const measureAttention = (
  keyTerms: string[],
  userInteractions: {
    hoverTime?: Record<string, number>;
    dwellTime?: number;
    rereadCount?: number;
  }
): number => {
  // Valeurs par défaut
  const { 
    hoverTime = {}, 
    dwellTime = Math.random() * 180 + 60,
    rereadCount = Math.floor(Math.random() * 3)
  } = userInteractions;
  
  // Calcul d'un score d'attention
  let attentionScore = 50; // Score de base
  
  // Analyser le temps passé sur les termes clés
  const termAttention = keyTerms.reduce((score, term) => {
    const timeOnTerm = hoverTime[term] || Math.random() * 5;
    return score + (timeOnTerm * 2);
  }, 0);
  
  // Considérer le temps total passé sur le questionnaire
  const dwellFactor = Math.min(dwellTime / 60, 3) * 10;
  
  // Impact de la relecture (indique un intérêt)
  const rereadFactor = rereadCount * 5;
  
  // Compilation du score final
  attentionScore += termAttention + dwellFactor + rereadFactor;
  
  // Normalisation entre 30 et 95
  attentionScore = Math.min(Math.max(attentionScore, 30), 95);
  
  // Variation aléatoire
  const randomFactor = Math.random() * 8 - 4;
  return Math.round(attentionScore + randomFactor);
};

// Analyse le profil neuropsychologique complet
export const generateNeuroProfile = (
  responses: any,
  userBehavior = {
    scrollSpeed: Math.random() * 3 + 1,
    timeSpent: Math.random() * 180 + 60,
    clickPatterns: [Math.random(), Math.random(), Math.random() * 2],
    hoverTime: {},
    rereadCount: Math.floor(Math.random() * 3)
  }
): {
  stressLevel: number;
  attentionScore: number; 
  focusAreas: string[];
  cognitiveStrength: string;
  learningStyle: string;
} => {
  // Déterminer les termes clés basés sur les réponses
  const keyTerms = ['magnésium', 'vitamine', 'sommeil', 'stress', 'énergie'];
  
  // Calculer les scores
  const stressLevel = calculateCortisolLevel(userBehavior);
  const attentionScore = measureAttention(keyTerms, userBehavior);
  
  // Déterminer les domaines d'intérêt/focus basés sur les objectifs
  const focusAreas = (responses.objectives || []).slice(0, 3);
  if (focusAreas.length === 0) {
    focusAreas.push('Bien-être général');
  }
  
  // Déterminer la force cognitive principale
  const cognitiveStrengths = [
    'Analyse détaillée', 
    'Vision globale', 
    'Réflexion intuitive',
    'Pensée structurée',
    'Adaptabilité cognitive'
  ];
  const cognitiveStrength = cognitiveStrengths[Math.floor(Math.random() * cognitiveStrengths.length)];
  
  // Déterminer le style d'apprentissage
  const learningStyles = [
    'Visuel', 
    'Auditif', 
    'Kinesthésique',
    'Logique-mathématique',
    'Verbal-linguistique'
  ];
  const learningStyle = learningStyles[Math.floor(Math.random() * learningStyles.length)];
  
  return {
    stressLevel,
    attentionScore,
    focusAreas,
    cognitiveStrength,
    learningStyle
  };
};

// Urgence contextuelle pour influencer les décisions
export const getUrgencyMessage = (
  context: {
    userProfile?: any;
    timeOfDay?: number;
    currentTraffic?: 'low' | 'medium' | 'high';
    userLocation?: string;
  }
): {
  message: string;
  level: 'low' | 'medium' | 'high';
  countdownMinutes?: number;
} => {
  // Valeurs par défaut si non fournies
  const { 
    userProfile = {},
    timeOfDay = new Date().getHours(),
    currentTraffic = Math.random() > 0.6 ? 'high' : 'low',
    userLocation = 'France'
  } = context;
  
  // Urgence basée sur le trafic
  if (currentTraffic === 'low') {
    const placesLeft = Math.floor(Math.random() * 10) + 3;
    return {
      message: `Seulement ${placesLeft} places disponibles dans l'étude en cours`,
      level: 'high',
      countdownMinutes: Math.floor(Math.random() * 30) + 15
    };
  }
  
  // Urgence basée sur le profil utilisateur
  if (userProfile.attentionScore && userProfile.attentionScore > 70) {
    const percentile = Math.floor(Math.random() * 12) + 3;
    return {
      message: `Votre profil est dans le top ${percentile}% des participants`,
      level: 'medium'
    };
  }
  
  // Urgence basée sur l'heure
  if (timeOfDay >= 18 || timeOfDay <= 7) {
    return {
      message: `Dernière session d'analyse disponible aujourd'hui`,
      level: 'medium',
      countdownMinutes: 45
    };
  }
  
  // Urgence basée sur la localisation
  if (userLocation) {
    const localPercentage = Math.floor(Math.random() * 20) + 70;
    return {
      message: `${localPercentage}% des utilisateurs de ${userLocation} ont déjà complété l'analyse`,
      level: 'low'
    };
  }
  
  // Message par défaut
  return {
    message: "Complétez votre analyse pour recevoir vos recommandations personnalisées",
    level: 'low'
  };
};

// Calcul optimisé du délai d'engagement stratégique
export const getStrategicDelay = (userType: 'quick_reader' | 'deep_reader' | 'scanner' | 'unknown'): number => {
  switch (userType) {
    case 'quick_reader':
      return Math.random() * (12.7 - 8.2) + 8.2;
    case 'deep_reader':
      return Math.random() * (5.4 - 3.1) + 3.1;
    case 'scanner':
      return Math.random() * (15.3 - 10.8) + 10.8;
    default:
      return Math.random() * (8.5 - 5.2) + 5.2;
  }
};
