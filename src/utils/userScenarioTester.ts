
/**
 * Service de test de scénarios utilisateur
 * Ce module permet de tester le système de recommandation avec différents profils d'utilisateurs
 */

import { QuizResponse } from "@/components/quiz/types";
import { generateUserRecommendations } from "./quizIntegrationService";
import { getPrioritizedRecommendations } from "./prioritizationSystem";
import { getSupplementCompatibilityInfo } from "./supplementCompatibilitySystem";
import { generatePersonalizedWarnings } from "./warningGenerationService";

// Types pour les résultats de test
export interface TestResult {
  scenarioName: string;
  userProfile: QuizResponse;
  recommendations: string[];
  warnings: number;
  compatibility: number;
  success: boolean;
  issues: string[];
}

// Scénarios de test prédéfinis
const testScenarios: Record<string, QuizResponse> = {
  "athlete_performance": {
    age: "30",
    gender: "male",
    height: "185",
    weight: "82",
    objectives: ["improve_sports_performance", "increase_energy"],
    symptoms: ["fatigue", "muscle_recovery"],
    healthConditions: [],
    medications: [],
    dietaryHabits: ["balanced", "high_protein"],
    lifestyle: ["active", "regular_exercise"],
    sleepQuality: "moderate",
    stressLevel: "moderate",
    digestion: "good",
    allergies: [],
    seasonalIssues: false
  },
  
  "senior_joint_health": {
    age: "68",
    gender: "female",
    height: "165",
    weight: "70",
    objectives: ["reduce_pain", "improve_mobility"],
    symptoms: ["joint_pain", "inflammation"],
    healthConditions: ["arthritis"],
    medications: ["anti_inflammatory"],
    dietaryHabits: ["traditional", "low_meat"],
    lifestyle: ["sedentary"],
    sleepQuality: "poor",
    stressLevel: "low",
    digestion: "moderate",
    allergies: [],
    seasonalIssues: false
  },
  
  "stressed_professional": {
    age: "42",
    gender: "female",
    height: "170",
    weight: "65",
    objectives: ["reduce_stress", "improve_sleep", "increase_focus"],
    symptoms: ["anxiety", "insomnia", "concentration_issues"],
    healthConditions: [],
    medications: [],
    dietaryHabits: ["irregular", "frequent_restaurant"],
    lifestyle: ["sedentary", "high_stress"],
    sleepQuality: "poor",
    stressLevel: "high",
    digestion: "moderate",
    allergies: [],
    seasonalIssues: false
  },
  
  "digestive_issues": {
    age: "35",
    gender: "male",
    height: "175",
    weight: "80",
    objectives: ["improve_digestion", "reduce_bloating"],
    symptoms: ["bloating", "gas", "irregular_bowel"],
    healthConditions: ["ibs"],
    medications: [],
    dietaryHabits: ["gluten_sensitive", "dairy_sensitive"],
    lifestyle: ["moderate_active"],
    sleepQuality: "moderate",
    stressLevel: "moderate",
    digestion: "poor",
    allergies: ["gluten"],
    seasonalIssues: false
  },
  
  "pregnant_woman": {
    age: "29",
    gender: "female",
    height: "168",
    weight: "72",
    objectives: ["support_pregnancy", "maintain_energy"],
    symptoms: ["fatigue", "nausea"],
    healthConditions: [],
    medications: ["prenatal_vitamins"],
    dietaryHabits: ["balanced", "vegetarian"],
    lifestyle: ["light_active"],
    sleepQuality: "moderate",
    stressLevel: "moderate",
    digestion: "moderate",
    allergies: [],
    pregnancy: true,
    seasonalIssues: false
  },
  
  "diabetic_health": {
    age: "55",
    gender: "male",
    height: "178",
    weight: "90",
    objectives: ["manage_blood_sugar", "weight_management"],
    symptoms: ["fatigue", "thirst"],
    healthConditions: ["diabetes_type_2", "hypertension"],
    medications: ["metformin", "anti_hypertenseurs"],
    dietaryHabits: ["low_carb", "low_sugar"],
    lifestyle: ["moderate_active"],
    sleepQuality: "moderate",
    stressLevel: "moderate",
    digestion: "good",
    allergies: [],
    seasonalIssues: false
  },
  
  "seasonal_allergies": {
    age: "32",
    gender: "female",
    height: "172",
    weight: "63",
    objectives: ["reduce_allergies", "improve_immunity"],
    symptoms: ["congestion", "itchy_eyes", "sneezing"],
    healthConditions: [],
    medications: ["antihistamines"],
    dietaryHabits: ["balanced"],
    lifestyle: ["moderate_active"],
    sleepQuality: "good",
    stressLevel: "low",
    digestion: "good",
    allergies: ["pollen", "dust"],
    seasonalIssues: true
  },
  
  "complex_medication_case": {
    age: "72",
    gender: "male",
    height: "175",
    weight: "83",
    objectives: ["heart_health", "energy"],
    symptoms: ["fatigue", "shortness_of_breath"],
    healthConditions: ["heart_disease", "hypertension", "high_cholesterol"],
    medications: ["statines", "anti_hypertenseurs", "anticoagulants"],
    dietaryHabits: ["low_salt", "heart_healthy"],
    lifestyle: ["light_active"],
    sleepQuality: "moderate",
    stressLevel: "moderate",
    digestion: "moderate",
    allergies: [],
    seasonalIssues: false
  }
};

/**
 * Fonction principale pour tester un scénario utilisateur
 * 
 * @param scenarioName Nom du scénario prédéfini ou "custom" pour un scénario personnalisé
 * @param customProfile Profil personnalisé (uniquement si scenarioName est "custom")
 * @returns Résultats du test
 */
export function testUserScenario(
  scenarioName: string = Object.keys(testScenarios)[0],
  customProfile?: QuizResponse
): TestResult {
  // Déterminer le profil à utiliser
  const userProfile = scenarioName === "custom" 
    ? customProfile || testScenarios[Object.keys(testScenarios)[0]] 
    : testScenarios[scenarioName] || testScenarios[Object.keys(testScenarios)[0]];
  
  const issues: string[] = [];
  
  try {
    // Générer des recommandations
    const recommendations = generateUserRecommendations(userProfile);
    
    // Vérifier que des recommandations ont été générées
    if (!recommendations || recommendations.length === 0) {
      issues.push("Aucune recommandation générée pour ce profil");
    }
    
    // Vérifier la priorisation
    const prioritizedRecs = getPrioritizedRecommendations(recommendations, userProfile);
    if (!prioritizedRecs || prioritizedRecs.length === 0) {
      issues.push("Échec de la priorisation des recommandations");
    }
    
    // Vérifier que la priorisation maintient ou réduit le nombre de recommandations
    if (prioritizedRecs.length > recommendations.length) {
      issues.push("La priorisation a augmenté le nombre de recommandations");
    }
    
    // Vérifier la compatibilité
    const recommendationIds = recommendations.map(rec => rec.id);
    const compatibilityInfo = getSupplementCompatibilityInfo(recommendationIds);
    const compatibilityCount = Object.keys(compatibilityInfo).length;
    
    // Vérifier les avertissements
    const warnings = generatePersonalizedWarnings(
      userProfile,
      recommendationIds,
      "spring" // Saison arbitraire pour le test
    );
    
    // Vérifier si des avertissements ont été générés pour les profils à risque
    const hasRiskConditions = (userProfile.healthConditions && userProfile.healthConditions.length > 0) ||
                              (userProfile.medications && userProfile.medications.length > 0);
    
    if (hasRiskConditions && warnings.length === 0) {
      issues.push("Aucun avertissement généré malgré des conditions à risque");
    }
    
    // Vérifier les interactions médicamenteuses
    if (userProfile.medications && 
        userProfile.medications.includes("anticoagulants") && 
        recommendationIds.includes("omega3") &&
        !warnings.some(w => w.title.toLowerCase().includes("anticoagulant"))) {
      issues.push("Interaction médicamenteuse non détectée (anticoagulants + omega3)");
    }
    
    return {
      scenarioName,
      userProfile,
      recommendations: recommendationIds,
      warnings: warnings.length,
      compatibility: compatibilityCount,
      success: issues.length === 0,
      issues
    };
  } catch (error) {
    return {
      scenarioName,
      userProfile,
      recommendations: [],
      warnings: 0,
      compatibility: 0,
      success: false,
      issues: [`Erreur lors du test: ${error instanceof Error ? error.message : String(error)}`]
    };
  }
}

/**
 * Exécute tous les scénarios de test et renvoie les résultats
 * 
 * @returns Résultats des tests pour tous les scénarios
 */
export function runAllScenarioTests(): Record<string, TestResult> {
  const results: Record<string, TestResult> = {};
  
  Object.keys(testScenarios).forEach(scenarioName => {
    results[scenarioName] = testUserScenario(scenarioName);
  });
  
  return results;
}

/**
 * Vérifie si tous les tests ont réussi
 * 
 * @param results Résultats des tests
 * @returns true si tous les tests ont réussi, sinon false
 */
export function allTestsPassed(results: Record<string, TestResult>): boolean {
  return Object.values(results).every(result => result.success);
}

/**
 * Résume les résultats des tests
 * 
 * @param results Résultats des tests
 * @returns Résumé des résultats
 */
export function summarizeTestResults(results: Record<string, TestResult>): {
  totalScenarios: number;
  successfulScenarios: number;
  failedScenarios: number;
  allPassed: boolean;
  failureDetails: Record<string, string[]>;
} {
  const totalScenarios = Object.keys(results).length;
  const successfulScenarios = Object.values(results).filter(r => r.success).length;
  const failedScenarios = totalScenarios - successfulScenarios;
  
  const failureDetails: Record<string, string[]> = {};
  Object.entries(results)
    .filter(([_, result]) => !result.success)
    .forEach(([name, result]) => {
      failureDetails[name] = result.issues;
    });
  
  return {
    totalScenarios,
    successfulScenarios,
    failedScenarios,
    allPassed: failedScenarios === 0,
    failureDetails
  };
}
