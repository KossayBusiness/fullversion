/**
 * Module d'intégration avancée avec l'API OpenAI pour l'enrichissement
 * des recommandations nutritionnelles
 */

import { secureStorageService } from './secureStorage';
import { 
  QuizResponse, 
  Recommendation, 
  UserProfile,
  SupplementInfo
} from './types';

import SUPPLEMENT_CATALOG from '@/data/supplementCatalog';
import { generatePredictiveInsights } from './predictiveAnalysis';

/**
 * Configuration et contrôle de l'intégration OpenAI
 */
interface OpenAIConfig {
  enabled: boolean;
  model: string; // 'gpt-4', 'gpt-3.5-turbo', etc.
  temperature: number;
  maxTokens: number;
  cacheResponses: boolean;
  cacheExpiry: number; // en heures
}

// Configuration par défaut
const defaultOpenAIConfig: OpenAIConfig = {
  enabled: false,
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 500,
  cacheResponses: true,
  cacheExpiry: 24 // 24 heures
};

/**
 * Récupère la configuration OpenAI, avec valeurs par défaut si non configurée
 */
export const getOpenAIConfig = (): OpenAIConfig => {
  try {
    const config = secureStorageService.getItem('openai_config');
    return config ? { ...defaultOpenAIConfig, ...config } : defaultOpenAIConfig;
  } catch (error) {
    console.error("Erreur lors de la récupération de la configuration OpenAI:", error);
    return defaultOpenAIConfig;
  }
};

/**
 * Met à jour la configuration OpenAI
 */
export const updateOpenAIConfig = (newConfig: Partial<OpenAIConfig>): void => {
  try {
    const currentConfig = getOpenAIConfig();
    const updatedConfig = { ...currentConfig, ...newConfig };
    secureStorageService.setItem('openai_config', updatedConfig);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la configuration OpenAI:", error);
  }
};

/**
 * Vérifie si l'API OpenAI est correctement configurée
 */
export const isOpenAIConfigured = (): boolean => {
  const apiKey = secureStorageService.getItem('openai_api_key');
  const config = getOpenAIConfig();
  return Boolean(apiKey && config.enabled);
};

/**
 * Construit un prompt détaillé pour OpenAI basé sur le profil utilisateur
 */
const buildUserProfilePrompt = (userProfile: UserProfile): string => {
  const {
    activeSymptoms = [],
    activeGoals = [],
    dietaryRestrictions = {},
    demographics = {}
  } = userProfile;

  const { ageRange, gender, activityLevel } = demographics;

  const symptomsList = activeSymptoms.map(symptom => 
    typeof symptom === 'string' ? symptom : symptom.id
  ).join(', ');

  const dietaryList = Object.entries(dietaryRestrictions)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(', ');

  return `
Profil utilisateur:
- Âge: ${ageRange || 'Non spécifié'}
- Genre: ${gender || 'Non spécifié'}
- Niveau d'activité: ${activityLevel ? `${activityLevel}/10` : 'Non spécifié'}
- Symptômes principaux: ${symptomsList || 'Aucun symptôme spécifique'}
- Objectifs personnels: ${activeGoals.join(', ') || 'Non spécifiés'}
- Restrictions alimentaires: ${dietaryList || 'Aucune restriction spécifique'}
  `;
};

/**
 * Récupère une réponse en cache si disponible
 */
const getCachedResponse = (cacheKey: string): any | null => {
  try {
    const cacheData = secureStorageService.getItem(`openai_cache_${cacheKey}`);

    if (cacheData) {
      const { response, timestamp, expiryHours } = cacheData;
      const ageInHours = (Date.now() - timestamp) / (1000 * 60 * 60);

      if (ageInHours < expiryHours) {
        return response;
      }
    }

    return null;
  } catch (error) {
    console.error("Erreur lors de la récupération du cache OpenAI:", error);
    return null;
  }
};

/**
 * Stocke une réponse en cache
 */
const cacheResponse = (cacheKey: string, response: any, expiryHours: number): void => {
  try {
    const cacheData = {
      response,
      timestamp: Date.now(),
      expiryHours
    };

    secureStorageService.setItem(`openai_cache_${cacheKey}`, cacheData);
  } catch (error) {
    console.error("Erreur lors du stockage en cache OpenAI:", error);
  }
};

/**
 * Appelle l'API OpenAI avec gestion d'erreurs et retry
 */
const callOpenAI = async (
  prompt: string, 
  model: string, 
  temperature: number,
  maxTokens: number
): Promise<any> => {
  const apiKey = secureStorageService.getItem('openai_api_key');

  if (!apiKey) {
    throw new Error("Clé API OpenAI non configurée");
  }

  const requestData = {
    model,
    messages: [
      { 
        role: "system", 
        content: "Vous êtes un expert en nutrition et supplémentation, avec une formation scientifique approfondie. Restez factuel et objectif avec une approche médicale et scientifique." 
      },
      { 
        role: "user", 
        content: prompt 
      }
    ],
    temperature,
    max_tokens: maxTokens
  };

  try {
    // Configuration de la requête
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestData)
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erreur API OpenAI: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API OpenAI:", error);
    throw error;
  }
};

/**
 * Utilise ChatGPT pour enrichir les recommandations avec des explications personnalisées
 */
export const enrichRecommendationsWithExternalAI = async (
  recommendations: Recommendation[],
  userProfile: any
): Promise<Recommendation[]> => {
  // Vérifier si OpenAI est configuré et activé
  if (!isOpenAIConfigured()) {
    console.log("OpenAI n'est pas configuré ou activé. Utilisation des recommandations standard.");
    return recommendations;
  }

  try {
    const config = getOpenAIConfig();
    const enrichedRecommendations = [...recommendations];

    // Génération du cacheKey basé sur les principales caractéristiques du profil
    const profileKeys = [
      ...userProfile.activeSymptoms,
      ...userProfile.activeGoals,
      Object.entries(userProfile.dietaryRestrictions)
        .filter(([_, v]) => Boolean(v))
        .map(([k]) => k)
    ].sort().join('_');

    const cacheKey = `bulk_${profileKeys}_${recommendations.map(r => r.id).join('-')}`;

    // Vérifier si les résultats sont en cache
    if (config.cacheResponses) {
      const cachedResult = getCachedResponse(cacheKey);
      if (cachedResult) {
        console.log("Utilisation des enrichissements en cache pour les recommandations");
        return cachedResult;
      }
    }

    // Préparer le prompt pour l'analyse de masse
    const userProfilePrompt = buildUserProfilePrompt(userProfile);
    const recommendationsList = recommendations.map(rec => {
      const supplement = SUPPLEMENT_CATALOG[rec.id];
      return `- ${supplement?.name || rec.id}: ${supplement?.description || rec.description}`;
    }).join('\n');

    // Insights prédictifs pour enrichir le contexte
    const predictiveInsights = generatePredictiveInsights(userProfile);
    const predictiveContext = predictiveInsights.length > 0 ? 
      `Tendances prédictives identifiées par notre système:\n${
        predictiveInsights.map(insight => `- ${insight.description}`).join('\n')
      }` : 
      'Aucune tendance prédictive significative identifiée.';

    const bulkPrompt = `
En tant que nutritionniste expert, analysez les recommandations suivantes pour ce profil utilisateur et fournissez:
1. Une explication personnalisée de pourquoi chaque supplément est pertinent pour ce profil spécifique
2. Des conseils d'utilisation optimale adaptés à leur situation
3. Des synergies possibles entre les suppléments recommandés
4. Des alternatives naturelles via l'alimentation

${userProfilePrompt}

Suppléments recommandés par notre système:
${recommendationsList}

${predictiveContext}

Répondez au format JSON avec une structure comme suit:
{
  "recommendations": [
    {
      "id": "id_du_supplément",
      "personalizedExplanation": "Explication détaillée personnalisée...",
      "usageTips": "Conseils d'utilisation optimale...",
      "synergies": "Informations sur les synergies...",
      "dietaryAlternatives": "Alternatives alimentaires..."
    },
    ...
  ],
  "overallAnalysis": "Analyse globale de l'ensemble des recommandations..."
}`;

    // Appeler l'API
    const result = await callOpenAI(
      bulkPrompt,
      config.model,
      config.temperature,
      config.maxTokens
    );

    try {
      // Parser le résultat JSON
      const aiResponse = JSON.parse(result);

      // Enrichir les recommandations avec les données de l'IA
      for (const rec of enrichedRecommendations) {
        const aiEnrichment = aiResponse.recommendations.find((r: any) => r.id === rec.id);

        if (aiEnrichment) {
          rec.aiEnhanced = true;
          rec.personalizedExplanation = aiEnrichment.personalizedExplanation;
          rec.usageTips = aiEnrichment.usageTips;
          rec.synergies = aiEnrichment.synergies;
          rec.dietaryAlternatives = aiEnrichment.dietaryAlternatives;
        }
      }

      // Ajouter l'analyse globale
      if (aiResponse.overallAnalysis) {
        for (const rec of enrichedRecommendations) {
          rec.overallAnalysis = aiResponse.overallAnalysis;
        }
      }

      // Mettre en cache si activé
      if (config.cacheResponses) {
        cacheResponse(cacheKey, enrichedRecommendations, config.cacheExpiry);
      }

      return enrichedRecommendations;
    } catch (parseError) {
      console.error("Erreur lors du parsing de la réponse OpenAI:", parseError);
      console.log("Réponse brute:", result);
      return recommendations; // Retourner les recommandations non enrichies
    }
  } catch (error) {
    console.error("Erreur lors de l'enrichissement des recommandations via OpenAI:", error);
    return recommendations;
  }
};

/**
 * Utilise l'API OpenAI pour générer une explication personnalisée pour un supplément spécifique
 */
export const generatePersonalizedExplanation = async (
  supplementId: string,
  userProfile: any
): Promise<string> => {
  try {
    if (!isOpenAIConfigured()) {
      return "Explication détaillée non disponible (OpenAI non configuré)";
    }

    const config = getOpenAIConfig();
    const supplement = SUPPLEMENT_CATALOG[supplementId];

    if (!supplement) {
      return "Information sur ce supplément non disponible";
    }

    // Générer le cacheKey
    const profileCacheKey = Object.values(userProfile).flat().filter(Boolean).join('_');
    const cacheKey = `explanation_${supplementId}_${profileCacheKey}`;

    // Vérifier si une explication est en cache
    if (config.cacheResponses) {
      const cachedExplanation = getCachedResponse(cacheKey);
      if (cachedExplanation) {
        return cachedExplanation;
      }
    }

    // Construire le prompt
    const userProfilePrompt = buildUserProfilePrompt(userProfile);

    const supplementDetails = `
Nom: ${supplement.name} (${supplement.scientificName})
Description: ${supplement.description}
Bénéfices: ${supplement.benefitsDescription}
Sources naturelles: ${supplement.naturalSources.join(', ')}
Posologie recommandée: ${supplement.recommendedDosage}
Score scientifique: ${supplement.scienceScore}/10
${supplement.detailedMechanism ? `Mécanisme d'action: ${supplement.detailedMechanism}` : ''}
${supplement.clinicalEvidence ? `Preuves cliniques: ${supplement.clinicalEvidence.map(e => `${e.study}: ${e.finding}`).join(', ')}` : ''}
${supplement.formulations ? `Formulations: ${supplement.formulations.map(f => `${f.type} (Biodisponibilité: ${f.bioavailability})`).join(', ')}` : ''}
    `;

    const prompt = `
Générez une explication personnalisée, scientifique et approfondie sur le supplément nutritionnel suivant, spécifiquement adaptée au profil utilisateur fourni. 
L'explication doit être:
1. Scientifiquement précise 
2. Très personnalisée au profil spécifique
3. Éducative mais accessible
4. Structurée avec des sous-sections claires
5. Entre 300 et 400 mots

${userProfilePrompt}

Informations sur le supplément:
${supplementDetails}

Incluez ces sections:
- Pertinence pour votre profil
- Mécanisme d'action (simplifié)
- Comment l'utiliser efficacement
- Ce que la science en dit
- Alternatives alimentaires
    `;

    // Appeler l'API
    const explanation = await callOpenAI(
      prompt,
      config.model,
      config.temperature,
      config.maxTokens
    );

    // Mettre en cache si activé
    if (config.cacheResponses) {
      cacheResponse(cacheKey, explanation, config.cacheExpiry);
    }

    return explanation;
  } catch (error) {
    console.error("Erreur lors de la génération d'explication personnalisée via OpenAI:", error);
    return "Explication détaillée temporairement indisponible. Veuillez réessayer ultérieurement.";
  }
};

/**
 * Génère un plan nutritionnel personnalisé basé sur les recommandations et le profil
 */
export const generatePersonalizedNutritionPlan = async (
  recommendations: Recommendation[],
  userProfile: any
): Promise<string> => {
  if (!isOpenAIConfigured()) {
    return "Plan nutritionnel personnalisé non disponible (OpenAI non configuré)";
  }

  try {
    const config = getOpenAIConfig();

    // Générer le cacheKey
    const recIds = recommendations.map(r => r.id).sort().join('-');
    const profileCacheKey = Object.values(userProfile).flat().filter(Boolean).join('_');
    const cacheKey = `plan_${recIds}_${profileCacheKey}`;

    // Vérifier si un plan est en cache
    if (config.cacheResponses) {
      const cachedPlan = getCachedResponse(cacheKey);
      if (cachedPlan) {
        return cachedPlan;
      }
    }

    // Préparer les informations sur les suppléments recommandés
    const supplementsInfo = recommendations.slice(0, 5).map(rec => {
      const supplement = SUPPLEMENT_CATALOG[rec.id];
      return {
        name: supplement?.name || rec.id,
        description: supplement?.description || rec.description,
        naturalSources: supplement?.naturalSources || [],
        dosage: supplement?.recommendedDosage || 'Non spécifié'
      };
    });

    // Construire le prompt
    const userProfilePrompt = buildUserProfilePrompt(userProfile);

    const prompt = `
En tant que nutritionniste expert, créez un plan nutritionnel personnalisé de 7 jours basé sur le profil utilisateur et les suppléments recommandés.
Le plan doit:
1. Intégrer les sources alimentaires naturelles des nutriments recommandés
2. Prendre en compte les restrictions alimentaires et préférences du profil
3. Structurer les suppléments recommandés dans un calendrier optimal
4. Inclure des recettes simples qui maximisent l'absorption des nutriments
5. Proposer un timing optimal de prise des suppléments

${userProfilePrompt}

Suppléments recommandés:
${JSON.stringify(supplementsInfo, null, 2)}

Fournissez un plan détaillé sous forme de texte structuré, incluant:
- Une introduction personnalisée
- Un plan jour par jour avec repas et suppléments
- Des conseils de mise en œuvre spécifiques au profil
- Des recettes adaptées mettant en avant les sources naturelles des nutriments recommandés
    `;

    // Appeler l'API
    const plan = await callOpenAI(
      prompt,
      config.model,
      config.temperature,
      1500 // Plus de tokens pour un plan complet
    );

    // Mettre en cache si activé
    if (config.cacheResponses) {
      cacheResponse(cacheKey, plan, config.cacheExpiry);
    }

    return plan;
  } catch (error) {
    console.error("Erreur lors de la génération du plan nutritionnel via OpenAI:", error);
    return "Plan nutritionnel personnalisé temporairement indisponible. Veuillez réessayer ultérieurement.";
  }
};