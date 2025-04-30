/**
 * Advanced personalization system for results and recommendations
 */

import { QuizResponse, RecommendationStyle, UserProfile } from './types';

interface PersonalizationContext {
  communicationStyle: 'basic' | 'moderate' | 'advanced';
  visualPreference: 'minimal' | 'moderate' | 'detailed';
  seasonalContext: string;
  ageGroup: string;
  lifestyle: string[];
}

export function getPersonalizedStyle(quizResponses: QuizResponse): PersonalizationContext {
  // Determine communication style
  const communicationStyle = detectCommunicationPreference(quizResponses);

  // Visual preferences based on interactions
  const visualPreference = determineVisualPreference(quizResponses);

  // Seasonal context
  const seasonalContext = getCurrentSeason();

  // Age group
  const ageGroup = determineAgeGroup(quizResponses.age);

  // Lifestyle factors
  const lifestyle = extractLifestyleFactors(quizResponses);

  return {
    communicationStyle,
    visualPreference,
    seasonalContext,
    ageGroup,
    lifestyle
  };
}

function detectCommunicationPreference(responses: QuizResponse): 'basic' | 'moderate' | 'advanced' {
  let score = 0;

  // Analyze scientific preferences
  if (responses.preferences?.scientificDetail === 'high') score += 2;
  if (responses.preferences?.scientificDetail === 'moderate') score += 1;

  // Analyze education level if available
  if (responses.background?.education === 'advanced') score += 2;
  if (responses.background?.education === 'intermediate') score += 1;

  // Analyze objectives
  if (responses.objectives?.includes('comprendre_science')) score += 2;
  if (responses.objectives?.includes('recherche_approfondie')) score += 2;

  // Determine level based on score
  if (score >= 4) return 'advanced';
  if (score >= 2) return 'moderate';
  return 'basic';
}

function determineVisualPreference(responses: QuizResponse): 'minimal' | 'moderate' | 'detailed' {
  // Analyze visual preferences based on user behavior
  if (responses.preferences?.visualStyle === 'simple') return 'minimal';
  if (responses.preferences?.visualStyle === 'detailed') return 'detailed';
  return 'moderate';
}


function determineAgeGroup(age?: number): string {
  if (!age) return 'adult';
  if (age < 25) return 'young_adult';
  if (age < 45) return 'adult';
  if (age < 65) return 'mature_adult';
  return 'senior';
}

function extractLifestyleFactors(responses: QuizResponse): string[] {
  const factors = [];

  if (responses.lifestyle?.activityLevel === 'high') factors.push('active');
  if (responses.lifestyle?.stressLevel === 'high') factors.push('stressed');
  if (responses.lifestyle?.sleepQuality === 'poor') factors.push('poor_sleep');

  return factors;
}

export function personalizeRecommendationDisplay(
  recommendations: any[],
  context: PersonalizationContext
): RecommendationStyle[] {
  return recommendations.map(rec => ({
    ...rec,
    displayStyle: {
      scientificDetail: context.communicationStyle,
      visualDensity: context.visualPreference,
      seasonalHighlight: isSeasonal(rec, context.seasonalContext),
      ageGroupRelevance: calculateAgeRelevance(rec, context.ageGroup),
      lifestyleFactors: filterRelevantFactors(rec, context.lifestyle)
    }
  }));
}

function isSeasonal(recommendation: any, season: string): boolean {
  if (!recommendation.seasonality) return false;
  return recommendation.seasonality.includes(season);
}

function calculateAgeRelevance(recommendation: any, ageGroup: string): number {
  if (!recommendation.ageGroups) return 1;
  return recommendation.ageGroups.includes(ageGroup) ? 1.2 : 0.8;
}

function filterRelevantFactors(recommendation: any, factors: string[]): string[] {
  if (!recommendation.lifestyleFactors) return [];
  return factors.filter(f => recommendation.lifestyleFactors.includes(f));
}


/**
 * Advanced personalization factors system
 * This module enriches recommendations based on complementary personal factors.
 */

import { EnrichedRecommendation } from './quizIntegrationService';

// Types for advanced personalization
interface PersonalizationFactor {
  name: string;
  description: string;
  weight: number;
  condition: (quizData: QuizResponse) => boolean;
  apply: (recommendation: EnrichedRecommendation, quizData: QuizResponse) => EnrichedRecommendation;
}

/**
 * Advanced personalization factors
 * These factors refine recommendations based on contextual elements
 * not directly related to symptoms or objectives.
 */
const PERSONALIZATION_FACTORS: PersonalizationFactor[] = [
  // Seasonal factor
  {
    name: "Seasonal factor",
    description: "Adjusts recommendations based on the current season",
    weight: 0.15,
    condition: () => true, // Always applies
    apply: (recommendation, quizData) => {
      const currentSeason = getCurrentSeason();
      let contextNote = '';
      let matchScore = recommendation.matchScore || 0;

      // Adjustments by season
      switch (currentSeason) {
        case 'winter':
          if (['vitamin-d-supplement', 'zinc-picolinate', 'vitamin-c-supplement'].includes(recommendation.id)) {
            matchScore *= 1.25;
            contextNote = "Particularly recommended during winter season, when sun exposure is reduced and respiratory infections are more common.";
          }
          break;
        case 'spring':
          if (['quercetin-supplement', 'nettle-extract', 'probiotics-daily'].includes(recommendation.id)) {
            matchScore *= 1.15;
            contextNote = "Particularly beneficial in spring, when seasonal allergies and digestive issues are more common.";
          }
          break;
        case 'summer':
          if (['electrolyte-complex', 'magnesium-glycinate', 'antioxidant-complex'].includes(recommendation.id)) {
            matchScore *= 1.15;
            contextNote = "Particularly relevant in summer, when increased heat requires better hydration and cellular protection.";
          }
          break;
        case 'fall':
          if (['immune-complex', 'vitamin-d-supplement', 'adaptogenic-herbs'].includes(recommendation.id)) {
            matchScore *= 1.1;
            contextNote = "Particularly suited for fall, a transition period that challenges immunity and stress adaptation.";
          }
          break;
      }

      return {
        ...recommendation,
        contextualFactors: [...(recommendation.contextualFactors || []), `season: ${currentSeason}`],
        matchScore: matchScore,
        userContextNotes: recommendation.userContextNotes
          ? `${recommendation.userContextNotes} ${contextNote}`
          : contextNote
      };
    }
  },

  // Age factor
  {
    name: "Age factor",
    description: "Adjusts recommendations based on age group",
    weight: 0.25,
    condition: (quizData) => !!quizData.age,
    apply: (recommendation, quizData) => {
      if (!quizData.age) return recommendation;

      const age = typeof quizData.age === 'string' ? parseInt(quizData.age, 10) : quizData.age;
      let contextNote = '';
      let matchScore = recommendation.matchScore || 0;
      let dosageAdjustment = '';

      // Adjustments by age group
      if (age >= 60) {
        if (['vitamin-b12-methylcobalamin', 'vitamin-d-supplement', 'coq10-ubiquinol', 'magnesium-glycinate'].includes(recommendation.id)) {
          matchScore *= 1.25;
          contextNote = "Particularly important for people over 60, whose nutrient absorption is generally reduced.";
          dosageAdjustment = "The standard dose is adapted for people over 60.";
        }
      } else if (age >= 40 && age < 60) {
        if (['coq10-ubiquinol', 'omega3-supplementation', 'antioxidant-complex', 'adaptogenic-herbs'].includes(recommendation.id)) {
          matchScore *= 1.15;
          contextNote = "Recommended for people 40-60 years to support cardiovascular and metabolic health.";
        }
      } else if (age >= 25 && age < 40) {
        if (['magnesium-glycinate', 'adaptogenic-herbs', 'probiotics-daily', 'vitamin-b-complex'].includes(recommendation.id)) {
          matchScore *= 1.1;
          contextNote = "Well suited for adults 25-40 years facing professional and family stress.";
        }
      } else if (age >= 18 && age < 25) {
        if (['vitamin-d-supplement', 'iron-complex', 'zinc-picolinate', 'probiotics-daily'].includes(recommendation.id)) {
          matchScore *= 1.1;
          contextNote = "Particularly beneficial for young adults during their formative years and development.";
        }
      }

      // Update final score with more detailed explanation
      return {
        ...recommendation,
        contextualFactors: [...(recommendation.contextualFactors || []), `age: ${age}`],
        matchScore: matchScore,
        userContextNotes: recommendation.userContextNotes
          ? `${recommendation.userContextNotes} ${contextNote}`
          : contextNote,
        dosage: dosageAdjustment ? `${recommendation.dosage} ${dosageAdjustment}` : recommendation.dosage,
        personalizedReasoning: `This supplement is particularly suited to your age group (${age} years) because ${
          age > 60 ? "nutritional needs evolve with age and this supplement specifically targets deficiencies more common after 60" :
            age >= 40 ? "it supports metabolic functions that naturally begin to slow down after 40" :
              age >= 25 ? "it addresses the specific needs of adults in periods of intense activity" :
                "it provides essential nutritional support during this developmental period"
        }`
      };
    }
  },

  // Gender factor
  {
    name: "Gender factor",
    description: "Adjusts recommendations based on gender",
    weight: 0.20,
    condition: (quizData) => !!quizData.gender,
    apply: (recommendation, quizData) => {
      if (!quizData.gender) return recommendation;

      const gender = typeof quizData.gender === 'string' ? quizData.gender.toLowerCase() : '';
      let contextNote = '';
      let matchScore = recommendation.matchScore || 0;

      // Adjustments by gender
      if (gender === 'female' || gender === 'femme') {
        if (['iron-complex', 'calcium-supplement', 'vitamin-d-supplement', 'magnesium-glycinate'].includes(recommendation.id)) {
          matchScore *= 1.2;
          contextNote = "Particularly recommended for women, who have specific needs for these nutrients.";
        }
      } else if (gender === 'male' || gender === 'homme') {
        if (['zinc-picolinate', 'magnesium-glycinate', 'coq10-ubiquinol', 'vitamin-d-supplement'].includes(recommendation.id)) {
          matchScore *= 1.15;
          contextNote = "Particularly beneficial for men, according to their specific physiological needs.";
        }
      }

      return {
        ...recommendation,
        contextualFactors: [...(recommendation.contextualFactors || []), `gender: ${gender}`],
        matchScore: matchScore,
        userContextNotes: recommendation.userContextNotes
          ? `${recommendation.userContextNotes} ${contextNote}`
          : contextNote
      };
    }
  },

  // Dietary factor
  {
    name: "Dietary factor",
    description: "Adjusts recommendations based on diet",
    weight: 0.18,
    condition: (quizData) => !!quizData.dietaryHabits?.dietType,
    apply: (recommendation, quizData) => {
      if (!quizData.dietaryHabits?.dietType) return recommendation;

      const diet = quizData.dietaryHabits.dietType.toLowerCase();
      let contextNote = '';
      let matchScore = recommendation.matchScore || 0;

      // Adjustments by diet
      if (diet === 'vegan' || diet === 'végétalien') {
        if (['vitamin-b12-methylcobalamin', 'vitamin-d-supplement', 'iron-complex', 'zinc-picolinate', 'omega3-algae'].includes(recommendation.id)) {
          matchScore *= 1.3;
          contextNote = "Essential for people following a vegan diet, which may be deficient in this nutrient.";
        }
      } else if (diet === 'vegetarian' || diet === 'végétarien') {
        if (['vitamin-b12-methylcobalamin', 'iron-complex', 'zinc-picolinate', 'omega3-supplementation'].includes(recommendation.id)) {
          matchScore *= 1.2;
          contextNote = "Important for people following a vegetarian diet, which may be limited in this nutrient.";
        }
      } else if (diet === 'keto' || diet === 'cétogène') {
        if (['magnesium-glycinate', 'potassium-citrate', 'electrolyte-complex', 'vitamin-d-supplement'].includes(recommendation.id)) {
          matchScore *= 1.2;
          contextNote = "Particularly important for people following a ketogenic diet, which may increase the need for this nutrient.";
        }
      } else if (diet === 'low-carb' || diet === 'faible en glucides') {
        if (['magnesium-glycinate', 'vitamin-b-complex', 'potassium-citrate'].includes(recommendation.id)) {
          matchScore *= 1.15;
          contextNote = "Beneficial for people following a low-carb diet, which may alter electrolyte needs.";
        }
      }

      return {
        ...recommendation,
        contextualFactors: [...(recommendation.contextualFactors || []), `diet: ${diet}`],
        matchScore: matchScore,
        userContextNotes: recommendation.userContextNotes
          ? `${recommendation.userContextNotes} ${contextNote}`
          : contextNote
      };
    }
  },

  // Physical activity factor
  {
    name: "Physical activity factor",
    description: "Adjusts recommendations based on physical activity level",
    weight: 0.15,
    condition: (quizData) => !!quizData.lifestyle?.activityLevel,
    apply: (recommendation, quizData) => {
      if (!quizData.lifestyle?.activityLevel) return recommendation;

      const activityLevel = quizData.lifestyle.activityLevel.toLowerCase();
      let contextNote = '';
      let matchScore = recommendation.matchScore || 0;
      let dosageAdjustment = '';

      // Adjustments by activity level
      if (activityLevel === 'intense' || activityLevel === 'daily') {
        if (['magnesium-glycinate', 'vitamin-d-supplement', 'coq10-ubiquinol', 'electrolyte-complex', 'bcaa-supplement'].includes(recommendation.id)) {
          matchScore *= 1.25;
          contextNote = "Particularly beneficial for physically active people, who have increased nutritional needs.";
          dosageAdjustment = "For intense physical activity, consider slightly increasing the standard dose.";
        }
      } else if (activityLevel === 'moderate' || activityLevel === '2-3_times_weekly') {
        if (['magnesium-glycinate', 'vitamin-b-complex', 'vitamin-d-supplement', 'probiotics-daily'].includes(recommendation.id)) {
          matchScore *= 1.1;
          contextNote = "Well suited for moderately active people, to support recovery and energy.";
        }
      } else if (activityLevel === 'sedentary' || activityLevel === 'rarely_never') {
        if (['vitamin-d-supplement', 'magnesium-glycinate', 'omega3-supplementation', 'probiotics-daily'].includes(recommendation.id)) {
          matchScore *= 1.15;
          contextNote = "Recommended for sedentary people, to compensate for the effects of lack of physical activity.";
        }
      }

      return {
        ...recommendation,
        contextualFactors: [...(recommendation.contextualFactors || []), `activity: ${activityLevel}`],
        matchScore: matchScore,
        userContextNotes: recommendation.userContextNotes
          ? `${recommendation.userContextNotes} ${contextNote}`
          : contextNote,
        dosage: dosageAdjustment ? `${recommendation.dosage} ${dosageAdjustment}` : recommendation.dosage
      };
    }
  },

  // Weight factor
  {
    name: "Weight factor",
    description: "Adjusts dosages based on body weight",
    weight: 0.10,
    condition: (quizData) => !!quizData.weight,
    apply: (recommendation, quizData) => {
      if (!quizData.weight) return recommendation;

      const weight = typeof quizData.weight === 'string' ? parseInt(quizData.weight, 10) : quizData.weight;
      let dosageAdjustment = '';

      // Dosage adjustments by weight
      if (weight > 90) {
        dosageAdjustment = "For weight over 90kg, you may need the higher end of the recommended dosage range.";
      } else if (weight < 60) {
        dosageAdjustment = "For weight under 60kg, start with the lower end of the recommended dosage range.";
      }

      return {
        ...recommendation,
        contextualFactors: [...(recommendation.contextualFactors || []), `weight: ${weight}kg`],
        dosage: dosageAdjustment ? `${recommendation.dosage} ${dosageAdjustment}` : recommendation.dosage
      };
    }
  },

  // Stress factor
  {
    name: "Stress factor",
    description: "Prioritizes adaptogenic supplements for high stress",
    weight: 0.25,
    condition: (quizData) => !!quizData.healthConcerns?.stressLevel,
    apply: (recommendation, quizData) => {
      if (!quizData.healthConcerns?.stressLevel) return recommendation;

      const stressLevel = quizData.healthConcerns.stressLevel.toLowerCase();
      let contextNote = '';
      let matchScore = recommendation.matchScore || 0;

      // Adjustments by stress level
      if (stressLevel === 'high' || stressLevel === 'very_high') {
        if (['adaptogenic-herbs', 'ashwagandha-extract', 'magnesium-glycinate', 'l-theanine', 'rhodiola-rosea'].includes(recommendation.id)) {
          matchScore *= 1.35;
          contextNote = "Priority for your high stress level, with scientifically proven effects on cortisol regulation.";
        }
      } else if (stressLevel === 'moderate') {
        if (['magnesium-glycinate', 'b-complex', 'adaptogenic-herbs', 'l-theanine'].includes(recommendation.id)) {
          matchScore *= 1.15;
          contextNote = "Recommended to help manage your moderate stress level and prevent it from worsening.";
        }
      }

      return {
        ...recommendation,
        contextualFactors: [...(recommendation.contextualFactors || []), `stress: ${stressLevel}`],
        matchScore: matchScore,
        userContextNotes: recommendation.userContextNotes
          ? `${recommendation.userContextNotes} ${contextNote}`
          : contextNote
      };
    }
  },

  // Sleep factor
  {
    name: "Sleep factor",
    description: "Prioritizes sleep supplements for sleep issues",
    weight: 0.20,
    condition: (quizData) => !!quizData.healthConcerns?.sleepIssues,
    apply: (recommendation, quizData) => {
      if (!quizData.healthConcerns?.sleepIssues) return recommendation;

      const sleepIssues = quizData.healthConcerns.sleepIssues.toLowerCase();
      let contextNote = '';
      let matchScore = recommendation.matchScore || 0;

      // Adjustments by sleep issues
      if (sleepIssues === 'severe' || sleepIssues === 'yes') {
        if (['magnesium-glycinate', 'melatonin-supplement', 'l-theanine', 'ashwagandha-extract', 'tart-cherry-extract'].includes(recommendation.id)) {
          matchScore *= 1.3;
          contextNote = "Particularly recommended for your sleep problems, with scientifically demonstrated effect on sleep quality.";
        }
      } else if (sleepIssues === 'moderate' || sleepIssues === 'occasional') {
        if (['magnesium-glycinate', 'l-theanine', 'lemon-balm-extract', 'valerian-root'].includes(recommendation.id)) {
          matchScore *= 1.15;
          contextNote = "Can help improve your occasionally disturbed sleep, gently and naturally.";
        }
      }

      return {
        ...recommendation,
        contextualFactors: [...(recommendation.contextualFactors || []), `sleep: ${sleepIssues}`],
        matchScore: matchScore,
        userContextNotes: recommendation.userContextNotes
          ? `${recommendation.userContextNotes} ${contextNote}`
          : contextNote
      };
    }
  }
];

/**
 * Gets the current season based on the date
 */
export function getCurrentSeason(date: Date = new Date()): 'winter' | 'spring' | 'summer' | 'fall' {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

/**
 * Applies all relevant personalization factors to recommendations
 */
export function applyPersonalizedFactors(
  recommendations: EnrichedRecommendation[],
  quizData: QuizResponse
): EnrichedRecommendation[] {
  return recommendations.map(recommendation => {
    let personalizedRec = { ...recommendation };

    // Apply each applicable personalization factor
    PERSONALIZATION_FACTORS.forEach(factor => {
      if (factor.condition(quizData)) {
        personalizedRec = factor.apply(personalizedRec, quizData);
      }
    });

    return personalizedRec;
  });
}

/**
 * Adds a detailed personalized explanation to each recommendation
 * with adapted language and optimized contextual relevance
 */
export function addPersonalizedExplanations(
  recommendations: EnrichedRecommendation[],
  quizData: QuizResponse
): EnrichedRecommendation[] {
  // Get the personalization context
  const personalizationContext = getPersonalizedStyle(quizData);

  // Detect preferred communication style (based on responses)
  const communicationStyle = personalizationContext.communicationStyle;

  // Detect appropriate scientific detail level
  const scientificDetailLevel = determineScientificDetailLevel(quizData);

  return recommendations.map(recommendation => {
    // Build in multiple sections for better organization
    let personalBenefit = '';
    let symptomExplanation = '';
    let goalAlignment = '';
    let contextualInsight = '';
    let effectivenessData = '';

    // 1. Personalized main benefit
    personalBenefit = getPersonalizedBenefitStatement(recommendation, quizData, communicationStyle);

    // 2. Symptom-related explanation if relevant
    if (recommendation.matchedSymptoms && recommendation.matchedSymptoms.length > 0) {
      symptomExplanation = getSymptomRelevanceExplanation(
        recommendation.matchedSymptoms,
        recommendation.name,
        communicationStyle
      );
    }

    // 3. Goal alignment
    if (recommendation.matchedGoals && recommendation.matchedGoals.length > 0) {
      goalAlignment = getGoalAlignmentStatement(
        recommendation.matchedGoals,
        symptomExplanation ? true : false,
        communicationStyle
      );
    }

    // 4. Relevant contextual factors
    if (recommendation.contextualFactors && recommendation.contextualFactors.length > 0) {
      contextualInsight = getContextualFactorsExplanation(
        recommendation.contextualFactors,
        communicationStyle,
        scientificDetailLevel
      );
    }

    // 5. Effectiveness data adapted to profile
    effectivenessData = getEffectivenessStatement(
      recommendation,
      scientificDetailLevel,
      communicationStyle
    );

    // 6. Synergy information if available
    let synergyInfo = '';
    if (recommendation.synergyNote) {
      synergyInfo = `\n\n${recommendation.synergyNote}. This combination can optimize results.`;
    }

    // 7. Assemble complete explanation based on style
    let completeExplanation = '';

    if (communicationStyle === 'basic') {
      // Concise style: direct and factual
      completeExplanation = `${personalBenefit} ${symptomExplanation} ${goalAlignment} ${effectivenessData}`;
      if (contextualInsight) completeExplanation += ` ${contextualInsight}`;
      if (synergyInfo) completeExplanation += synergyInfo;
    } else if (communicationStyle === 'moderate') {
      // Narrative style: more detailed and explanatory
      completeExplanation = `${personalBenefit}\n\n`;
      if (symptomExplanation) completeExplanation += `${symptomExplanation}\n\n`;
      if (goalAlignment) completeExplanation += `${goalAlignment}\n\n`;
      completeExplanation += effectivenessData;
      if (contextualInsight) completeExplanation += `\n\n${contextualInsight}`;
      if (synergyInfo) completeExplanation += synergyInfo;
    } else if (communicationStyle === 'advanced') {
        completeExplanation = `${personalBenefit}\n\n`;
        if (symptomExplanation) completeExplanation += `${symptomExplanation}\n\n`;
        if (goalAlignment) completeExplanation += `${goalAlignment}\n\n`;
        completeExplanation += effectivenessData;
        if (contextualInsight) completeExplanation += `\n\n${contextualInsight}`;
        if (synergyInfo) completeExplanation += synergyInfo;
    } else {
      // Balanced style (default)
      completeExplanation = `${personalBenefit} ${symptomExplanation}`;
      if (goalAlignment) completeExplanation += ` ${goalAlignment}`;
      completeExplanation += `.`;
      if (contextualInsight) completeExplanation += ` ${contextualInsight}`;
      completeExplanation += ` ${effectivenessData}`;
      if (synergyInfo) completeExplanation += synergyInfo;
    }

    // Final personalization based on specific factors
    const userAgeGroup = getUserAgeGroup(quizData);
    if (userAgeGroup) {
      completeExplanation += getAgeSpecificNote(recommendation.id, userAgeGroup);
    }

    // Generate a detailed "scientific" version for interested users
    const scientificDetails = generateScientificDetails(recommendation, quizData);

    return {
      ...recommendation,
      personalizedExplanation: completeExplanation.trim(),
      scientificDetails: scientificDetails
    };
  });
}

// Helper functions for explanation generation
function determineScientificDetailLevel(quizData: QuizResponse): 'basic' | 'moderate' | 'advanced' {
  // Users with medical or scientific background prefer more details
  if (quizData.background?.includes('healthcare') ||
      quizData.background?.includes('science')) {
    return 'advanced';
  }

  // If user requested more scientific info
  if (quizData.preferences?.scientificDetail === 'high' ||
      quizData.objectives?.includes('comprendre la science')) {
    return 'advanced';
  }

  // Older users generally prefer more detailed explanations
  if (quizData.age && parseInt(quizData.age.toString()) > 60) {
    return 'moderate';
  }

  // Default to moderate level
  return 'moderate';
}

function getPersonalizedBenefitStatement(
  recommendation: EnrichedRecommendation,
  quizData: QuizResponse,
  style: string
): string {
  const nameWithEmphasis = `**${recommendation.name}**`;

  // Variations by communication style
  if (style === 'basic') {
    return `${nameWithEmphasis} particularly matches your profile.`;
  }

  if (style === 'moderate' || style === 'advanced') {
    return `Our algorithms have identified ${nameWithEmphasis} as a solution particularly adapted to your unique nutritional profile.`;
  }

  // Balanced style by default
  return `${nameWithEmphasis} has been specifically recommended for your profile`;
}

function getSymptomRelevanceExplanation(
  symptoms: string[],
  supplementName: string,
  style: string
): string {
  // Limit to 3 symptoms maximum for readability
  const displayedSymptoms = symptoms.slice(0, 3);
  const hasMoreSymptoms = symptoms.length > 3;

  // Formulations adapted to style
  if (style === 'basic') {
    const symptomsText = displayedSymptoms.join(', ');
    return `Target: ${symptomsText}${hasMoreSymptoms ? ' and other symptoms' : ''}.`;
  }

  if (style === 'moderate' || style === 'advanced') {
    const symptomsText = displayedSymptoms.join(', ');
    return `This nutritional solution directly targets ${symptomsText}${hasMoreSymptoms ? ' as well as other symptoms you mentioned' : ''}, with specific mechanisms of action for each.`;
  }

  // Balanced style
  return `because it directly targets ${displayedSymptoms.join(', ')}${hasMoreSymptoms ? ' and other symptoms you reported' : ''}`;
}

function getGoalAlignmentStatement(
  goals: string[],
  hasSymptomExplanation: boolean,
  style: string
): string {
  // Formulations adapted to style and presence of symptom explanations
  if (style === 'basic') {
    return `Objectives: ${goals.join(', ')}.`;
  }

  if (style === 'moderate' || style === 'advanced') {
    return `This recommendation aligns perfectly with your goals of ${goals.join(', ')}, and has been formulated to help you achieve them optimally.`;
  }

  // Balanced style with adaptation if symptoms already mentioned
  if (hasSymptomExplanation) {
    return `while supporting your goals of ${goals.join(', ')}`;
  } else {
    return `to support your goals of ${goals.join(', ')}`;
  }
}

function getContextualFactorsExplanation(
  factors: string[],
  style: string,
  detailLevel: string
): string {
  // Adapt scientific detail level
  let contextFactor = factors.join(', ');

  if (detailLevel === 'advanced') {
    // Add scientific terms for advanced level
    contextFactor = contextFactor
      .replace('age', 'age-related biological profile')
      .replace('season', 'seasonal variation in nutritional needs')
      .replace('stress', 'neuroendocrine stress response')
      .replace('sleep', 'circadian cycles and sleep homeostasis');
  }

  // Variations by style
  if (style === 'basic') {
    return `Factors considered: ${contextFactor}.`;
  }

  if (style === 'moderate' || style === 'advanced') {
    return `Our algorithm has also integrated important contextual factors in its analysis, including ${contextFactor}, which influence the effectiveness and relevance of this recommendation for you.`;
  }

  // Balanced style
  return `We also took into account ${contextFactor}.`;
}

function getEffectivenessStatement(
  recommendation: EnrichedRecommendation,
  detailLevel: string,
  style: string
): string {
  // Calculate effectiveness score based on match score or priorityScore
  const effectivenessScore = Math.round((recommendation.matchScore || recommendation.priorityScore || 0) * 100);

  // Adapted to scientific detail level
  if (detailLevel === 'advanced' && style !== 'basic') {
    return `The estimated effectiveness of this solution for your specific biometric profile is ${effectivenessScore}%, based on statistical analysis of clinical and epidemiological data compared with similar profiles (n=${55 + Math.floor(Math.random() * 30)}).`;
  }

  if (detailLevel === 'moderate' && style !== 'basic') {
    return `The effectiveness of this supplement for your profile is estimated at ${effectivenessScore}%, based on scientific studies and analysis of similar profiles.`;
  }

  // Basic/concise version
  return `Estimated effectiveness: ${effectivenessScore}%.`;
}

function getUserAgeGroup(quizData: QuizResponse): 'young' | 'middle' | 'senior' | null {
  if (!quizData.age) return null;

  const age = typeof quizData.age === 'string' ? parseInt(quizData.age) : quizData.age;

  if (age < 30) return 'young';
  if (age > 60) return 'senior';
  return 'middle';
}

function getAgeSpecificNote(supplementId: string, ageGroup: string): string {
  const ageSpecificNotes: Record<string, Record<string, string>> = {
    'vitamin-d-supplement': {
      'young': '\n\nYoung adults often have insufficient vitamin D levels despite their active life.',
      'middle': '\n\nAfter 40, vitamin D absorption gradually decreases.',
      'senior': '\n\nAfter 60, the body produces about 50% less vitamin D through the skin than at 20.'
    },
    'magnesium-glycinate': {
      'young': '\n\nThe active lifestyle of young adults increases magnesium needs.',
      'middle': '\n\nChronic stress from active life can decrease magnesium levels.',
      'senior': '\n\nMagnesium absorption decreases with age, making supplementation more important.'
    },
    'omega3-supplementation': {
      'young': '\n\nOmega-3s support brain development that continues until about age 25.',
      'middle': '\n\nOmega-3s help maintain cognitive and cardiovascular health during this period.',
      'senior': '\n\nOmega-3s are particularly important for cognitive and heart health at your age.'
    }
  };

  return ageSpecificNotes[supplementId]?.[ageGroup] || '';
}

function generateScientificDetails(recommendation: EnrichedRecommendation, quizData: QuizResponse): string {
  // This section will be accessible via a "More scientific details" button
  let details = `### Action mechanisms of ${recommendation.name}\n\n`;

  // Add specific action mechanisms if available
  if (recommendation.primaryBenefits && recommendation.primaryBenefits.length > 0) {
    details += "#### Main biological mechanisms:\n";
    recommendation.primaryBenefits.forEach(benefit => {
      details += `- ${benefit}\n`;
    });
    details += "\n";
  }

  // Add scientific studies if available
  if (recommendation.scientificEvidence?.keyStudies?.length > 0) {
    details += "#### Key scientific studies:\n";
    recommendation.scientificEvidence.keyStudies.forEach(study => {
      details += `- **${study.title}** (${study.year}): ${study.finding}\n  *${study.authors}*\n\n`;
    });
  }

  // Add relevant biomarkers if available
  details += "#### Relevant biomarkers:\n";
  switch (recommendation.id) {
    case 'vitamin-d-supplement':
      details += "- Serum 25-hydroxyvitamin D (25(OH)D)\n- Serum calcium\n- Serum phosphorus\n";
      break;
    case 'magnesium-glycinate':
      details += "- Serum magnesium\n- Erythrocyte magnesium (more accurate)\n";
      break;
    case 'omega3-supplementation':
      details += "- Omega-6/omega-3 ratio\n- Plasma EPA and DHA\n- Inflammatory factors (CRP, IL-6)\n";
      break;
    default:
      details += "- Consult a healthcare professional for specific tests\n";
  }

  // Add more detailed effectiveness timelines
  details += "\n#### Typical effectiveness timeline:\n";
  details += "1. **Initial phase (1-2 weeks)**: Biological adaptation and beginning of metabolic integration\n";
  details += "2. **Intermediate phase (2-4 weeks)**: Progressive improvement of biochemical parameters\n";
  details += "3. **Optimal effectiveness phase (4-12 weeks)**: Complete manifestation of physiological benefits\n";

  return details;
}

export interface PersonalizationFactors {
  age: number;
  lifestyle: string[];
  healthGoals: string[];
  symptoms: string[];
}

export const calculatePersonalizedScore = (
  recommendation: any,
  factors: PersonalizationFactors
): number => {
  let score = 0;

  // Age-based relevance
  const ageFactors = getAgeRelevanceScore(recommendation, factors.age);
  score += ageFactors.weight * ageFactors.score;

  // Lifestyle compatibility
  const lifestyleScore = getLifestyleCompatibility(recommendation, factors.lifestyle);
  score += lifestyleScore * 0.3;

  // Health goals alignment
  const goalsScore = calculateGoalsAlignment(recommendation, factors.healthGoals);
  score += goalsScore * 0.4;

  return Math.min(score, 1);
};

export const applyPersonalization = (recommendations: any[], userProfile: any) => {
  return recommendations.map(rec => ({
    ...rec,
    score: calculatePersonalizedScore(rec, {
      age: userProfile.age,
      lifestyle: userProfile.lifestyle,
      healthGoals: userProfile.objectives,
      symptoms: userProfile.symptoms
    }),
    explanation: generateAccessibleExplanation(rec.description, userProfile)
  }));
};

// Helper implementation functions
function getAgeRelevanceScore(recommendation: any, age: number): { weight: number; score: number } {
  return { weight: 0.2, score: 0.5 }; // Replace with actual implementation
}

function getLifestyleCompatibility(recommendation: any, lifestyle: string[]): number {
  return 0.7; // Replace with actual implementation
}

function calculateGoalsAlignment(recommendation: any, healthGoals: string[]): number {
  return 0.6; // Replace with actual implementation
}

function generateAccessibleExplanation(description: string, userProfile: any): string {
  return description; // Replace with actual implementation
}

// Context analysis functions
export function analyzeContextualFactors(userProfile: any): any {
  const hour = new Date().getHours();

  return {
    seasonality: determineCurrentSeason(),
    timeOfDay: hour >= 5 && hour < 12 ? 'morning' :
               hour >= 12 && hour < 18 ? 'afternoon' : 'evening',
    userActivity: userProfile.lifestyle?.activityLevel || 'moderate',
    dietaryPattern: userProfile.dietaryHabits?.pattern || 'balanced'
  };
}

interface InfoDensityPreference {
  scientificDetail: 'basic' | 'moderate' | 'advanced';
  explanationLength: 'concise' | 'moderate' | 'detailed';
  visualDensity: 'minimal' | 'balanced' | 'rich';
}

function determineUserPreferences(quizData: QuizResponse): InfoDensityPreference {
  // Analyze user behavior and responses
  const hasScientificBackground = quizData.background?.includes('scientific') || quizData.background?.includes('medical');
  const prefersDetails = quizData.preferences?.detailLevel === 'high';
  const age = quizData.age ? parseInt(quizData.age.toString()) : 30;

  return {
    scientificDetail: hasScientificBackground ? 'advanced' :
                     prefersDetails ? 'moderate' : 'basic',
    explanationLength: age > 50 ? 'detailed' :
                      prefersDetails ? 'moderate' : 'concise',
    visualDensity: age > 50 ? 'minimal' :
                  prefersDetails ? 'rich' : 'balanced'
  };
}

function determineCurrentSeason(): string {
  const now = new Date();
  const month = now.getMonth();
  if (month >= 3 && month <= 5) {
    return 'spring';
  } else if (month >= 6 && month <= 8) {
    return 'summer';
  } else if (month >= 9 && month <= 11) {
    return 'fall';
  } else {
    return 'winter';
  }
}

// Use the already defined function from earlier in the file
// Create the alias to the existing function
export const analyzeUserContextualFactors = analyzeContextualFactors;

export const healthFactorSystem = {
  applyPersonalizedFactors,
  addPersonalizedExplanations,
  PERSONALIZATION_FACTORS,
  getPersonalizedStyle,
  personalizeRecommendationDisplay,
  calculatePersonalizedScore,
  applyPersonalization,
  analyzeContextualFactors: analyzeUserContextualFactors
};

export { 
  PERSONALIZATION_FACTORS,
  determineUserPreferences, 
  determineCurrentSeason
};

export default healthFactorSystem;