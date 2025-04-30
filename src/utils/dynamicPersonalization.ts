/**
 * Dynamic personalization service for quiz and recommendations
 */

// Types for personalization
export interface PersonalizationFactors {
  geo?: string;         // User location
  timeOfDay?: number;   // Time of day (0-23)
  dayOfWeek?: number;   // Day of week (0-6, 0 being Sunday)
  scrollDepth?: number; // Scroll depth (0-1)
  refSource?: string;   // Referral source
  quizProgress?: number; // Quiz progression (0-1)
  symptoms?: string[];  // Selected symptoms
  objectives?: string[]; // Selected objectives
}

// Location detection (simulated)
export const detectUserLocation = async (): Promise<{
  country: string;
  city?: string;
  region?: string;
}> => {
  try {
    // In a real environment, we would use a geolocation API
    // For this example, we simulate detection based on probabilities

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));

    // List of cities by probability
    const cities = [
      'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 
      'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'
    ];

    // 85% probability that the user is in France
    const isFrance = Math.random() < 0.85;

    if (isFrance) {
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      return {
        country: 'France',
        city: randomCity,
        region: getRegionFromCity(randomCity)
      };
    } else {
      // List of French-speaking countries
      const countries = ['Belgium', 'Switzerland', 'Canada', 'Luxembourg'];
      const country = countries[Math.floor(Math.random() * countries.length)];

      // Cities by country
      const citiesByCountry: Record<string, string[]> = {
        'Belgium': ['Brussels', 'Liege', 'Charleroi', 'Ghent', 'Antwerp'],
        'Switzerland': ['Geneva', 'Lausanne', 'Zurich', 'Bern', 'Lugano'],
        'Canada': ['Montreal', 'Quebec', 'Ottawa', 'Laval', 'Gatineau'],
        'Luxembourg': ['Luxembourg', 'Esch-sur-Alzette', 'Differdange']
      };

      const randomCity = citiesByCountry[country][Math.floor(Math.random() * citiesByCountry[country].length)];

      return {
        country,
        city: randomCity
      };
    }
  } catch (error) {
    console.error('Location detection error:', error);
    return { country: 'France' };
  }
};

// Get French region based on city
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

// Referral source detection
export const detectReferrerSource = (): string => {
  try {
    const referrer = document.referrer;

    if (!referrer) return 'direct';

    // Detect search engines
    if (referrer.includes('google.')) return 'google';
    if (referrer.includes('bing.')) return 'bing';
    if (referrer.includes('yahoo.')) return 'yahoo';
    if (referrer.includes('qwant.')) return 'qwant';

    // Detect social networks
    if (referrer.includes('facebook.') || referrer.includes('fb.')) return 'facebook';
    if (referrer.includes('twitter.') || referrer.includes('t.co')) return 'twitter';
    if (referrer.includes('linkedin.')) return 'linkedin';
    if (referrer.includes('instagram.')) return 'instagram';

    // Parse URL to get domain
    const url = new URL(referrer);
    return url.hostname;
  } catch (error) {
    console.error('Source detection error:', error);
    return 'unknown';
  }
};

// Collect all personalization factors
export const collectPersonalizationFactors = async (
  quizData?: { symptoms?: string[]; objectives?: string[]; progress?: number }
): Promise<PersonalizationFactors> => {
  try {
    // Get current time
    const now = new Date();
    const timeOfDay = now.getHours();
    const dayOfWeek = now.getDay();

    // Get user location
    const location = await detectUserLocation();

    // Calculate scroll depth
    const scrollDepth = Math.min(
      window.scrollY / (document.documentElement.scrollHeight - window.innerHeight),
      1
    );

    // Get referral source
    const refSource = detectReferrerSource();

    // Compile all factors
    const factors: PersonalizationFactors = {
      geo: location.city || location.country,
      timeOfDay,
      dayOfWeek,
      scrollDepth,
      refSource,
      quizProgress: quizData?.progress || 0
    };

    // Add quiz data if available
    if (quizData) {
      if (quizData.symptoms) factors.symptoms = quizData.symptoms;
      if (quizData.objectives) factors.objectives = quizData.objectives;
    }

    return factors;
  } catch (error) {
    console.error('Error collecting personalization factors:', error);
    return {
      timeOfDay: new Date().getHours(),
      dayOfWeek: new Date().getDay()
    };
  }
};

// Personalize messages based on factors
export const getPersonalizedMessage = (
  factors: PersonalizationFactors,
  messageType: 'welcome' | 'recommendation' | 'urgency' | 'social'
): string => {
  const { timeOfDay, geo, symptoms, objectives } = factors;

  // Personalized welcome messages
  if (messageType === 'welcome') {
    // Greeting based on time
    let greeting = 'Hello';
    if (timeOfDay !== undefined) {
      if (timeOfDay < 6) greeting = 'Good evening';
      else if (timeOfDay < 12) greeting = 'Good morning';
      else if (timeOfDay < 18) greeting = 'Good afternoon';
      else greeting = 'Good evening';
    }

    // Add location if available
    if (geo) {
      return `${greeting} from ${geo}! Discover our personalized nutritional analysis`;
    }

    return `${greeting}! Discover our personalized nutritional analysis`;
  }

  // Personalized recommendation messages
  if (messageType === 'recommendation') {
    if (symptoms && symptoms.length > 0) {
      if (symptoms.includes('fatigue') || symptoms.includes('stress')) {
        return `Our research shows that 78% of people suffering from ${symptoms[0]} have seen significant improvement`;
      }
      if (symptoms.includes('sleep')) {
        return `83% of participants with sleep disorders saw improvement in 10 days`;
      }
      return `Our recommendations are tailored to your specific symptoms`;
    }

    if (objectives && objectives.length > 0) {
      return `Your goal "${objectives[0]}" is achievable according to our study (n=243)`;
    }

    return `Our recommendations are based on a scientific study with 243 participants`;
  }

  // Personalized urgency messages
  if (messageType === 'urgency') {
    if (geo) {
      return `${Math.floor(Math.random() * 15) + 70}% of users from ${geo} have already completed their analysis`;
    }

    if (timeOfDay !== undefined && (timeOfDay >= 18 || timeOfDay <= 7)) {
      return `Last analysis session available today`;
    }

    return `Only ${Math.floor(Math.random() * 10) + 3} spots available for this analysis`;
  }

  // Personalized social proof messages
  if (messageType === 'social') {
    if (geo) {
      return `${Math.floor(Math.random() * 15) + 75}% of participants from ${geo} saw improvement`;
    }

    if (symptoms && symptoms.length > 0) {
      return `87% of people with similar symptoms saw improvement`;
    }

    if (objectives && objectives.length > 0) {
      return `93% satisfaction among users with the same goal as you`;
    }

    return `89% of participants saw significant improvement`;
  }

  return `Our analysis is based on an in-depth scientific study`;
};

// Generate personalized recommendations
export const generatePersonalizedRecommendations = (
  factors: PersonalizationFactors
): { primary: string; secondary: string[] } => {
  const { symptoms, objectives } = factors;

  // Default primary recommendation
  let primary = 'Premium Multivitamin Complex';

  // Default secondary recommendations
  let secondary = ['High Concentration Omega-3', 'Vitamin D3 + K2'];

  // Personalize based on symptoms
  if (symptoms && symptoms.length > 0) {
    if (symptoms.includes('fatigue') || symptoms.includes('stress')) {
      primary = 'Premium Magnesium Complex';
      secondary = ['Active Vitamin B12', 'Rhodiola & Ashwagandha'];
    } else if (symptoms.includes('sleep')) {
      primary = 'Natural Melatonin Plus';
      secondary = ['Magnesium Bisglycinate', 'L-Theanine & GABA'];
    } else if (symptoms.includes('digestion')) {
      primary = 'Advanced Digestive Probiotics';
      secondary = ['Digestive Enzymes', 'Intestinal L-Glutamine'];
    }
  }

  // Personalize based on objectives
  if (objectives && objectives.length > 0) {
    const goalMap: Record<string, { primary: string; secondary: string[] }> = {
      'Improve my energy': {
        primary: 'B-Vitamins & Iron Complex',
        secondary: ['CoQ10 & PQQ', 'Energy Adaptogens']
      },
      'Reduce stress': {
        primary: 'Advanced Anti-Stress Complex',
        secondary: ['Marine Magnesium', 'L-Theanine & GABA']
      },
      'Improve my sleep': {
        primary: 'Melatonin & Relaxing Herbs',
        secondary: ['Premium 5-HTP', 'Magnesium Glycinate']
      },
      'Strengthen my immunity': {
        primary: 'Zinc & Vitamin C Immune Complex',
        secondary: ['High Dose Vitamin D3', 'Immune Probiotics']
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