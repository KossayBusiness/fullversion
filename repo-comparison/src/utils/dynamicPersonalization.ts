
/**
 * Service de personnalisation dynamique pour le quiz et les recommandations
 */

// Types pour la personnalisation
export interface PersonalizationFactors {
  geo?: string;         // Localisation de l'utilisateur
  timeOfDay?: number;   // Heure de la journée (0-23)
  dayOfWeek?: number;   // Jour de la semaine (0-6, 0 étant dimanche)
  scrollDepth?: number; // Profondeur de défilement (0-1)
  refSource?: string;   // Source de référence
  quizProgress?: number; // Progression dans le quiz (0-1)
  symptoms?: string[];  // Symptômes sélectionnés
  objectives?: string[]; // Objectifs sélectionnés
}

// Détection de la localisation (simulé)
export const detectUserLocation = async (): Promise<{
  country: string;
  city?: string;
  region?: string;
}> => {
  try {
    // Dans un environnement réel, nous utiliserions une API de géolocalisation
    // Pour l'exemple, nous simulons une détection basée sur les probabilités
    
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Liste des villes par probabilité
    const cities = [
      'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 
      'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'
    ];
    
    // Probabilité de 85% que l'utilisateur soit en France
    const isFrance = Math.random() < 0.85;
    
    if (isFrance) {
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      return {
        country: 'France',
        city: randomCity,
        region: getRegionFromCity(randomCity)
      };
    } else {
      // Liste de pays francophones
      const countries = ['Belgique', 'Suisse', 'Canada', 'Luxembourg'];
      const country = countries[Math.floor(Math.random() * countries.length)];
      
      // Villes par pays
      const citiesByCountry: Record<string, string[]> = {
        'Belgique': ['Bruxelles', 'Liège', 'Charleroi', 'Gand', 'Anvers'],
        'Suisse': ['Genève', 'Lausanne', 'Zurich', 'Berne', 'Lugano'],
        'Canada': ['Montréal', 'Québec', 'Ottawa', 'Laval', 'Gatineau'],
        'Luxembourg': ['Luxembourg', 'Esch-sur-Alzette', 'Differdange']
      };
      
      const randomCity = citiesByCountry[country][Math.floor(Math.random() * citiesByCountry[country].length)];
      
      return {
        country,
        city: randomCity
      };
    }
  } catch (error) {
    console.error('Erreur de détection de la localisation:', error);
    return { country: 'France' };
  }
};

// Obtenir la région française en fonction de la ville
const getRegionFromCity = (city: string): string => {
  const regionMap: Record<string, string> = {
    'Paris': 'Île-de-France',
    'Lyon': 'Auvergne-Rhône-Alpes',
    'Marseille': 'Provence-Alpes-Côte d\'Azur',
    'Toulouse': 'Occitanie',
    'Nice': 'Provence-Alpes-Côte d\'Azur',
    'Nantes': 'Pays de la Loire',
    'Strasbourg': 'Grand Est',
    'Montpellier': 'Occitanie',
    'Bordeaux': 'Nouvelle-Aquitaine',
    'Lille': 'Hauts-de-France'
  };
  
  return regionMap[city] || 'France';
};

// Détection de la source de référence
export const detectReferrerSource = (): string => {
  try {
    const referrer = document.referrer;
    
    if (!referrer) return 'direct';
    
    // Détecter les moteurs de recherche
    if (referrer.includes('google.')) return 'google';
    if (referrer.includes('bing.')) return 'bing';
    if (referrer.includes('yahoo.')) return 'yahoo';
    if (referrer.includes('qwant.')) return 'qwant';
    
    // Détecter les réseaux sociaux
    if (referrer.includes('facebook.') || referrer.includes('fb.')) return 'facebook';
    if (referrer.includes('twitter.') || referrer.includes('t.co')) return 'twitter';
    if (referrer.includes('linkedin.')) return 'linkedin';
    if (referrer.includes('instagram.')) return 'instagram';
    
    // Analyser l'URL pour obtenir le domaine
    const url = new URL(referrer);
    return url.hostname;
  } catch (error) {
    console.error('Erreur de détection de la source:', error);
    return 'unknown';
  }
};

// Collecter tous les facteurs de personnalisation
export const collectPersonalizationFactors = async (
  quizData?: { symptoms?: string[]; objectives?: string[]; progress?: number }
): Promise<PersonalizationFactors> => {
  try {
    // Obtenir l'heure actuelle
    const now = new Date();
    const timeOfDay = now.getHours();
    const dayOfWeek = now.getDay();
    
    // Obtenir la localisation de l'utilisateur
    const location = await detectUserLocation();
    
    // Calculer la profondeur de défilement
    const scrollDepth = Math.min(
      window.scrollY / (document.documentElement.scrollHeight - window.innerHeight),
      1
    );
    
    // Obtenir la source de référence
    const refSource = detectReferrerSource();
    
    // Compiler tous les facteurs
    const factors: PersonalizationFactors = {
      geo: location.city || location.country,
      timeOfDay,
      dayOfWeek,
      scrollDepth,
      refSource,
      quizProgress: quizData?.progress || 0
    };
    
    // Ajouter les données du quiz si disponibles
    if (quizData) {
      if (quizData.symptoms) factors.symptoms = quizData.symptoms;
      if (quizData.objectives) factors.objectives = quizData.objectives;
    }
    
    return factors;
  } catch (error) {
    console.error('Erreur lors de la collecte des facteurs de personnalisation:', error);
    return {
      timeOfDay: new Date().getHours(),
      dayOfWeek: new Date().getDay()
    };
  }
};

// Personnalisation des messages en fonction des facteurs
export const getPersonalizedMessage = (
  factors: PersonalizationFactors,
  messageType: 'welcome' | 'recommendation' | 'urgency' | 'social'
): string => {
  const { timeOfDay, geo, symptoms, objectives } = factors;
  
  // Messages de bienvenue personnalisés
  if (messageType === 'welcome') {
    // Salutation basée sur l'heure
    let greeting = 'Bonjour';
    if (timeOfDay !== undefined) {
      if (timeOfDay < 6) greeting = 'Bonsoir';
      else if (timeOfDay < 12) greeting = 'Bonjour';
      else if (timeOfDay < 18) greeting = 'Bonjour';
      else greeting = 'Bonsoir';
    }
    
    // Ajouter la location si disponible
    if (geo) {
      return `${greeting} depuis ${geo} ! Découvrez notre analyse nutritionnelle personnalisée`;
    }
    
    return `${greeting} ! Découvrez notre analyse nutritionnelle personnalisée`;
  }
  
  // Messages de recommandation personnalisés
  if (messageType === 'recommendation') {
    if (symptoms && symptoms.length > 0) {
      if (symptoms.includes('fatigue') || symptoms.includes('stress')) {
        return `Nos recherches montrent que 78% des personnes souffrant de ${symptoms[0]} ont constaté une amélioration significative`;
      }
      if (symptoms.includes('sommeil')) {
        return `83% des participants avec des troubles du sommeil ont vu une amélioration en 10 jours`;
      }
      return `Nos recommandations sont adaptées à vos symptômes spécifiques`;
    }
    
    if (objectives && objectives.length > 0) {
      return `Votre objectif "${objectives[0]}" est atteignable selon notre étude (n=243)`;
    }
    
    return `Nos recommandations sont basées sur une étude scientifique avec 243 participants`;
  }
  
  // Messages d'urgence personnalisés
  if (messageType === 'urgency') {
    if (geo) {
      return `${Math.floor(Math.random() * 15) + 70}% des utilisateurs de ${geo} ont déjà complété leur analyse`;
    }
    
    if (timeOfDay !== undefined && (timeOfDay >= 18 || timeOfDay <= 7)) {
      return `Dernière session d'analyse disponible aujourd'hui`;
    }
    
    return `Seulement ${Math.floor(Math.random() * 10) + 3} places disponibles pour cette analyse`;
  }
  
  // Messages de preuve sociale personnalisés
  if (messageType === 'social') {
    if (geo) {
      return `${Math.floor(Math.random() * 15) + 75}% des participants de ${geo} ont constaté une amélioration`;
    }
    
    if (symptoms && symptoms.length > 0) {
      return `87% des personnes avec des symptômes similaires ont vu une amélioration`;
    }
    
    if (objectives && objectives.length > 0) {
      return `93% de satisfaction parmi les utilisateurs avec le même objectif que vous`;
    }
    
    return `89% des participants ont constaté une amélioration significative`;
  }
  
  return `Notre analyse est basée sur une étude scientifique approfondie`;
};

// Génération de recommandations personnalisées
export const generatePersonalizedRecommendations = (
  factors: PersonalizationFactors
): { primary: string; secondary: string[] } => {
  const { symptoms, objectives } = factors;
  
  // Recommandation principale par défaut
  let primary = 'Complexe Multivitamines Premium';
  
  // Recommandations secondaires par défaut
  let secondary = ['Oméga-3 Haute Concentration', 'Vitamine D3 + K2'];
  
  // Personnaliser en fonction des symptômes
  if (symptoms && symptoms.length > 0) {
    if (symptoms.includes('fatigue') || symptoms.includes('stress')) {
      primary = 'Complexe Magnésium Premium';
      secondary = ['Vitamine B12 Active', 'Rhodiola & Ashwagandha'];
    } else if (symptoms.includes('sommeil')) {
      primary = 'Mélatonine Naturelle Plus';
      secondary = ['Magnésium Bisglycinate', 'L-Théanine & GABA'];
    } else if (symptoms.includes('digestion')) {
      primary = 'Probiotiques Digestifs Avancés';
      secondary = ['Enzymes Digestives', 'L-Glutamine Intestinale'];
    }
  }
  
  // Personnaliser en fonction des objectifs
  if (objectives && objectives.length > 0) {
    const goalMap: Record<string, { primary: string; secondary: string[] }> = {
      'Améliorer mon énergie': {
        primary: 'Complexe B-Vitamines & Fer',
        secondary: ['CoQ10 & PQQ', 'Adaptogènes Énergétiques']
      },
      'Réduire le stress': {
        primary: 'Complexe Anti-Stress Avancé',
        secondary: ['Magnésium Marin', 'L-Théanine & GABA']
      },
      'Améliorer mon sommeil': {
        primary: 'Mélatonine & Plantes Relaxantes',
        secondary: ['5-HTP Premium', 'Magnésium Glycinate']
      },
      'Renforcer mon immunité': {
        primary: 'Complexe Immunitaire Zinc & Vitamine C',
        secondary: ['Vitamine D3 Forte Dose', 'Probiotiques Immunitaires']
      }
    };
    
    for (const objective of objectives) {
      if (goalMap[objective]) {
        primary = goalMap[objective].primary;
        secondary = goalMap[objective].secondary;
        break;
      }
    }
  }
  
  return { primary, secondary };
};
