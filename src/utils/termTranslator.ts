
/**
 * Medical and scientific term translator utility
 * Provides consistent translations for medical and scientific terminology
 */

export type TermGlossary = {
  [key: string]: {
    en: string;
    fr: string;
    context?: string;
  }
};

// Comprehensive glossary of medical and scientific terms
export const medicalTermGlossary: TermGlossary = {
  // Nutrients and supplements
  'vitamin_d': {
    en: 'Vitamin D',
    fr: 'Vitamine D',
    context: 'Fat-soluble secosteroid responsible for intestinal absorption of calcium'
  },
  'vitamin_b_complex': {
    en: 'Vitamin B Complex',
    fr: 'Complexe de Vitamines B',
    context: 'Group of water-soluble vitamins that play important roles in cell metabolism'
  },
  'magnesium_glycinate': {
    en: 'Magnesium Glycinate',
    fr: 'Glycinate de Magnésium',
    context: 'Highly bioavailable form of magnesium'
  },
  'iron_complex': {
    en: 'Iron Complex',
    fr: 'Complexe de Fer',
    context: 'Supplement containing iron with supporting nutrients'
  },
  'coq10': {
    en: 'Coenzyme Q10',
    fr: 'Coenzyme Q10',
    context: 'Antioxidant naturally produced by the body'
  },
  'probiotics': {
    en: 'Probiotics',
    fr: 'Probiotiques',
    context: 'Live microorganisms that provide health benefits'
  },
  'melatonin': {
    en: 'Melatonin',
    fr: 'Mélatonine',
    context: 'Hormone regulating sleep-wake cycles'
  },
  'omega3': {
    en: 'Omega-3 Fatty Acids',
    fr: 'Acides Gras Oméga-3',
    context: 'Essential polyunsaturated fatty acids'
  },
  'ashwagandha': {
    en: 'Ashwagandha',
    fr: 'Ashwagandha',
    context: 'Adaptogenic herb used in Ayurvedic medicine'
  },
  
  // Biological processes
  'inflammation': {
    en: 'Inflammation',
    fr: 'Inflammation',
    context: 'Protective response involving immune cells, blood vessels, and molecular mediators'
  },
  'oxidative_stress': {
    en: 'Oxidative Stress',
    fr: 'Stress Oxydatif',
    context: 'Imbalance between free radicals and antioxidants in the body'
  },
  'gut_microbiome': {
    en: 'Gut Microbiome',
    fr: 'Microbiome Intestinal',
    context: 'Collection of microorganisms living in the digestive tract'
  },
  'circadian_rhythm': {
    en: 'Circadian Rhythm',
    fr: 'Rythme Circadien',
    context: 'Natural, internal process that regulates the sleep-wake cycle'
  },
  'immune_function': {
    en: 'Immune Function',
    fr: 'Fonction Immunitaire',
    context: 'Body\'s defense against pathogens'
  },
  
  // Symptoms and conditions
  'fatigue': {
    en: 'Fatigue',
    fr: 'Fatigue',
    context: 'Extreme tiredness resulting from mental or physical exertion'
  },
  'sleep_disorders': {
    en: 'Sleep Disorders',
    fr: 'Troubles du Sommeil',
    context: 'Conditions that affect the ability to sleep well'
  },
  'joint_pain': {
    en: 'Joint Pain',
    fr: 'Douleurs Articulaires',
    context: 'Discomfort, aches, and soreness in joints'
  },
  'digestive_problems': {
    en: 'Digestive Problems',
    fr: 'Problèmes Digestifs',
    context: 'Issues affecting the digestive system'
  },
  'stress': {
    en: 'Stress',
    fr: 'Stress',
    context: 'Physiological response to mental or emotional pressure'
  },
  
  // Scientific terms
  'bioavailability': {
    en: 'Bioavailability',
    fr: 'Biodisponibilité',
    context: 'Proportion of a substance that enters circulation'
  },
  'antioxidant': {
    en: 'Antioxidant',
    fr: 'Antioxydant',
    context: 'Molecule that inhibits oxidation of other molecules'
  },
  'neurotransmitter': {
    en: 'Neurotransmitter',
    fr: 'Neurotransmetteur',
    context: 'Chemical messenger that transmits signals across a chemical synapse'
  },
  'metabolism': {
    en: 'Metabolism',
    fr: 'Métabolisme',
    context: 'Chemical processes that occur to maintain life'
  },
  'micronutrient': {
    en: 'Micronutrient',
    fr: 'Micronutriment',
    context: 'Vitamins and minerals required in small amounts'
  }
};

/**
 * Translates a medical or scientific term from French to English or vice versa
 * @param term The term to translate
 * @param targetLanguage The target language ('en' or 'fr')
 * @returns The translated term, or the original if no translation is found
 */
export function translateTerm(term: string, targetLanguage: 'en' | 'fr'): string {
  // First, try to find the term as a key in the glossary
  if (medicalTermGlossary[term]) {
    return medicalTermGlossary[term][targetLanguage];
  }
  
  // Next, try to find it by matching against French or English values
  const sourceLanguage = targetLanguage === 'en' ? 'fr' : 'en';
  const entry = Object.values(medicalTermGlossary).find(
    entry => entry[sourceLanguage].toLowerCase() === term.toLowerCase()
  );
  
  if (entry) {
    return entry[targetLanguage];
  }
  
  // If no translation is found, return the original term
  return term;
}

/**
 * Translates all medical and scientific terms in a text
 * @param text The text to translate
 * @param targetLanguage The target language ('en' or 'fr')
 * @returns The text with all known terms translated
 */
export function translateMedicalText(text: string, targetLanguage: 'en' | 'fr'): string {
  let translatedText = text;
  
  // Create a list of terms to translate, ordered by length (longest first)
  // This prevents partial term matches
  const sourceLanguage = targetLanguage === 'en' ? 'fr' : 'en';
  const terms = Object.values(medicalTermGlossary)
    .map(entry => entry[sourceLanguage])
    .sort((a, b) => b.length - a.length);
  
  // Replace each term with its translation
  for (const term of terms) {
    const translation = translateTerm(term, targetLanguage);
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    translatedText = translatedText.replace(regex, translation);
  }
  
  return translatedText;
}

export default {
  translateTerm,
  translateMedicalText,
  medicalTermGlossary
};
/**
 * Medical Terminology Translation Utility
 * 
 * This utility ensures consistent translation of scientific and medical terms
 * across the application. It provides translation functions for commonly
 * used medical terminology.
 */

interface TermGlossary {
  [key: string]: {
    en: string;
    fr: string;
    definition?: string;
  };
}

// Medical terminology glossary with translations and definitions
export const medicalTermGlossary: TermGlossary = {
  'vitamine': {
    en: 'vitamin',
    fr: 'vitamine',
    definition: 'Organic compounds essential for normal growth and nutrition'
  },
  'magnésium': {
    en: 'magnesium',
    fr: 'magnésium',
    definition: 'Essential mineral involved in over 300 enzymatic reactions'
  },
  'probiotiques': {
    en: 'probiotics',
    fr: 'probiotiques',
    definition: 'Live microorganisms that provide health benefits when consumed'
  },
  'oméga': {
    en: 'omega',
    fr: 'oméga',
    definition: 'Essential fatty acids important for brain health and inflammation reduction'
  },
  'inflammation': {
    en: 'inflammation',
    fr: 'inflammation',
    definition: 'Protective response involving immune cells, blood vessels, and molecular mediators'
  },
  'métabolisme': {
    en: 'metabolism',
    fr: 'métabolisme',
    definition: 'Set of life-sustaining chemical reactions in organisms'
  },
  'digestion': {
    en: 'digestion',
    fr: 'digestion',
    definition: 'Process of breaking down food for nutrient absorption and energy'
  },
  'système immunitaire': {
    en: 'immune system',
    fr: 'système immunitaire',
    definition: 'Network of cells and proteins that defend the body against infection'
  },
  'microbiome': {
    en: 'microbiome',
    fr: 'microbiome',
    definition: 'Community of microorganisms living in a specific environment'
  },
  'cortisol': {
    en: 'cortisol',
    fr: 'cortisol',
    definition: 'Primary stress hormone that increases sugar in the bloodstream'
  },
  'mélatonine': {
    en: 'melatonin',
    fr: 'mélatonine',
    definition: 'Hormone that regulates sleep-wake cycles'
  },
  'sérotonine': {
    en: 'serotonin',
    fr: 'sérotonine',
    definition: 'Neurotransmitter contributing to feelings of well-being and happiness'
  },
  'homéostasie': {
    en: 'homeostasis',
    fr: 'homéostasie',
    definition: 'Process of maintaining a stable internal state despite changes in external conditions'
  },
  'antioxydant': {
    en: 'antioxidant',
    fr: 'antioxydant',
    definition: 'Substance that inhibits oxidation, especially one used to counteract deterioration'
  },
  'profil santé': {
    en: 'health profile',
    fr: 'profil santé',
    definition: 'Comprehensive overview of an individual\'s health status'
  },
  'région française': {
    en: 'French region',
    fr: 'région française',
    definition: 'Geographic area within France'
  }
};

/**
 * Translates a medical term from French to English
 * 
 * @param term - The French medical term to translate
 * @returns The English translation or the original term if no translation exists
 */
export const translateMedicalTerm = (term: string): string => {
  const lowercaseTerm = term.toLowerCase();
  
  // Look for exact matches first
  for (const [frenchTerm, data] of Object.entries(medicalTermGlossary)) {
    if (frenchTerm.toLowerCase() === lowercaseTerm) {
      return data.en;
    }
  }
  
  // Look for partial matches within the text
  for (const [frenchTerm, data] of Object.entries(medicalTermGlossary)) {
    if (lowercaseTerm.includes(frenchTerm.toLowerCase())) {
      return term.replace(new RegExp(frenchTerm, 'gi'), data.en);
    }
  }
  
  return term;
};

/**
 * Translates a complete text containing medical terms from French to English
 * 
 * @param text - The French text to translate
 * @returns The text with medical terms translated to English
 */
export const translateMedicalText = (text: string): string => {
  let translatedText = text;
  
  // Replace all medical terms in the text
  Object.entries(medicalTermGlossary).forEach(([frenchTerm, data]) => {
    translatedText = translatedText.replace(
      new RegExp(frenchTerm, 'gi'),
      match => {
        // Preserve original casing
        if (match === match.toUpperCase()) return data.en.toUpperCase();
        if (match[0] === match[0].toUpperCase()) {
          return data.en.charAt(0).toUpperCase() + data.en.slice(1);
        }
        return data.en;
      }
    );
  });
  
  return translatedText;
};

/**
 * Gets the definition for a medical term
 * 
 * @param term - The term to look up (can be in English or French)
 * @returns The definition or undefined if not found
 */
export const getMedicalTermDefinition = (term: string): string | undefined => {
  const lowercaseTerm = term.toLowerCase();
  
  // Check French terms
  for (const [frenchTerm, data] of Object.entries(medicalTermGlossary)) {
    if (frenchTerm.toLowerCase() === lowercaseTerm) {
      return data.definition;
    }
  }
  
  // Check English terms
  for (const [_, data] of Object.entries(medicalTermGlossary)) {
    if (data.en.toLowerCase() === lowercaseTerm) {
      return data.definition;
    }
  }
  
  return undefined;
};

export default {
  translateMedicalTerm,
  translateMedicalText,
  getMedicalTermDefinition,
  medicalTermGlossary
};
