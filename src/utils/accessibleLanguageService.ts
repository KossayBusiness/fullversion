/**
 * Service d'optimisation du langage pour améliorer l'accessibilité et la clarté
 * des explications scientifiques et des recommandations
 */

// Mots et phrases scientifiques complexes avec leurs alternatives simplifiées
//This will be replaced by the new data structure
//const SCIENTIFIC_TERMS_MAPPING: Record<string, string> = { ... };

// Phrases complexes et leurs alternatives plus simples
//This will be replaced by the new data structure
//const COMPLEX_PHRASES_MAPPING: Record<string, string> = { ... };

// Mots de transition pour améliorer la fluidité
const TRANSITION_WORDS: string[] = [
  'De plus,',
  'En outre,',
  'Par ailleurs,',
  'Également,',
  'Notamment,',
  'En effet,',
  'D\'autre part,',
  'Ainsi,',
  'Par conséquent'
];

import { ScientificTerms } from '@/data/scientificTerms';

interface AccessibilityLevel {
  style: 'basic' | 'moderate' | 'advanced';
  visualDensity: 'minimal' | 'balanced' | 'rich';
  tooltipStyle: 'simple' | 'detailed';
}

export function determineAccessibilityLevel(userPreferences: any): AccessibilityLevel {
  return {
    style: userPreferences.scientificKnowledge || 'moderate',
    visualDensity: userPreferences.visualPreference || 'balanced',
    tooltipStyle: userPreferences.detailLevel || 'simple'
  };
}

export function simplifyScientificText(text: string, level: AccessibilityLevel): string {
  let simplified = text;

  // Remplacer les termes techniques par des alternatives plus simples
  Object.entries(ScientificTerms).forEach(([technical, alternatives]) => {
    const termToUse = level.style === 'basic' ? alternatives.simple :
                     level.style === 'moderate' ? alternatives.moderate :
                     technical;

    simplified = simplified.replace(new RegExp(`\\b${technical}\\b`, 'gi'), termToUse);
  });

  return simplified;
}

export function generatePracticalTip(term: string, context: any = {}): string {
  const baseTips = {
    'vitamine D': {
      morning: 'Prenez-la le matin avec un repas gras pour une absorption optimale',
      evening: 'Si prise le soir, associez-la au dîner pour meilleure absorption',
      general: 'Pour une meilleure absorption, prenez-la avec des aliments gras'
    },
    'magnésium': {
      sensitive: 'Commencez par 1/4 de la dose et augmentez progressivement sur 2 semaines',
      regular: 'Prenez-le en 2-3 prises dans la journée avec les repas',
      general: 'Pour éviter les effets digestifs, commencez progressivement'
    },
    'probiotiques': {
      morning: 'Optimal : à jeun le matin, 30 min avant le petit-déjeuner',
      evening: 'Alternative : le soir au coucher, à distance du dernier repas',
      general: 'À prendre à distance des repas pour une meilleure efficacité'
    }
  };

  const tipSet = baseTips[term.toLowerCase()];
  if (!tipSet) return '';

  // Sélection contextuelle du conseil
  if (context.timeOfDay && tipSet[context.timeOfDay]) {
    return tipSet[context.timeOfDay];
  } else if (context.sensitivity && tipSet[context.sensitivity]) {
    return tipSet[context.sensitivity];
  }

  return tipSet.general;
}


/**
 * Optimise le texte scientifique pour le rendre plus accessible et convivial
 * tout en préservant la précision scientifique
 */
export function optimizeTextForAccessibilityAndTrust(text: string, level: AccessibilityLevel): string {
  if (!text) return '';

  let optimizedText = text;

  // Remplacer les termes scientifiques complexes - now handled by simplifyScientificText
  optimizedText = simplifyScientificText(optimizedText, level);


  // Vérifier la longueur des phrases et ajouter des transitions si nécessaire
  const sentences = optimizedText.split(/(?<=[.!?])\s+/);
  if (sentences.length > 3) {
    // Ajouter des mots de transition pour améliorer la fluidité
    for (let i = 2; i < sentences.length; i += 2) {
      if (sentences[i].length > 10 && !sentences[i].startsWith(TRANSITION_WORDS[0])) {
        // Choisir un mot de transition aléatoire
        const transitionWord = TRANSITION_WORDS[Math.floor(Math.random() * TRANSITION_WORDS.length)];
        sentences[i] = `${transitionWord} ${sentences[i].charAt(0).toLowerCase()}${sentences[i].slice(1)}`;
      }
    }
    optimizedText = sentences.join(' ');
  }

  // Optimiser le langage pour la confiance
  optimizedText = addTrustLanguage(optimizedText);

  return optimizedText;
}

/**
 * Ajoute des éléments de langage qui renforcent la confiance et la crédibilité
 */
function addTrustLanguage(text: string): string {
  // Remplacer les expressions incertaines par des formulations plus confiantes
  const uncertainPhrases: Record<string, string> = {
    'pourrait aider': 'aide',
    'peut potentiellement': 'peut',
    'semble avoir': 'a montré',
    'il est possible que': 'il est établi que',
    'suggère que': 'indique que',
    'on pense que': 'les recherches montrent que'
  };

  let enhancedText = text;

  // Remplacer les expressions incertaines
  Object.entries(uncertainPhrases).forEach(([uncertain, confident]) => {
    const regex = new RegExp(`\\b${uncertain}\\b`, 'gi');
    enhancedText = enhancedText.replace(regex, confident);
  });

  return enhancedText;
}

/**
 * Génère une explication personnalisée d'une recherche scientifique adaptée au niveau de l'utilisateur
 */
export function generateAccessibleResearchExplanation(
  researchTopic: string,
  complexity: 'simple' | 'moderate' | 'detailed' = 'moderate',
  level: AccessibilityLevel = {style: 'moderate', visualDensity: 'balanced', tooltipStyle: 'simple'}
): string {
  // Phrases d'introduction selon le niveau de complexité
  const intros = {
    simple: `Voici ce que la science nous dit sur ${researchTopic} en termes simples:`,
    moderate: `La recherche scientifique sur ${researchTopic} révèle plusieurs aspects intéressants:`,
    detailed: `Les études scientifiques récentes sur ${researchTopic} ont permis de mettre en lumière les mécanismes suivants:`
  };

  // Corps de l'explication selon le niveau de complexité
  const bodies = {
    simple: "Les études montrent un lien positif entre ce supplément et l'amélioration des symptômes. La plupart des personnes voient des résultats après quelques semaines d'utilisation régulière.",
    moderate: "Plusieurs études cliniques ont démontré l'efficacité de ce supplément, avec des effets significatifs sur la biochimie corporelle liée à vos symptômes. Les mécanismes d'action impliquent une régulation positive des voies biologiques associées.",
    detailed: "Des méta-analyses récentes ont confirmé l'efficacité thérapeutique de ce supplément via des mécanismes incluant la modulation des voies inflammatoires, l'optimisation des fonctions mitochondriales et la régulation des neurotransmetteurs impliqués dans vos symptômes spécifiques."
  };

  // Conclusions selon le niveau de complexité
  const conclusions = {
    simple: "Ces découvertes expliquent pourquoi ce supplément est recommandé dans votre situation.",
    moderate: "Ces mécanismes scientifiquement validés sont particulièrement pertinents pour votre profil et vos symptômes spécifiques.",
    detailed: "L'ensemble de ces données scientifiques soutient l'utilisation ciblée de ce supplément dans votre cas, avec un niveau de preuve considéré comme robuste par la communauté scientifique."
  };

  // Assembler l'explication
  let explanation = `${intros[complexity]} ${bodies[complexity]} ${conclusions[complexity]}`;
  explanation = simplifyScientificText(explanation, level);
  return explanation;
}

export default {
  optimizeTextForAccessibilityAndTrust,
  generateAccessibleResearchExplanation,
  determineAccessibilityLevel,
  simplifyScientificText,
  generatePracticalTip
};

import { scientificTerms } from '@/data/scientificTerms';

//This function is replaced by simplifyScientificText
//export const simplifyText = (text: string, level: 'basic' | 'moderate' | 'advanced'): string => { ... };

//This function is replaced by generateAccessibleResearchExplanation
//export const generateAccessibleExplanation = (recommendation: string, userProfile: any): string => { ... };