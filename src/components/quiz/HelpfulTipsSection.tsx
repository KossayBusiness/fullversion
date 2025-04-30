
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnrichedRecommendation } from '@/utils/quizIntegrationService';
import { InfoCircledIcon, LightningBoltIcon, TimerIcon } from '@radix-ui/react-icons';

interface HelpfulTipsSectionProps {
  recommendations?: EnrichedRecommendation[];
}

const HelpfulTipsSection: React.FC<HelpfulTipsSectionProps> = ({ recommendations = [] }) => {
  // N'afficher que pour les recommandations principales
  const primaryRecommendations = recommendations?.filter(rec => rec.isPrimary) || [];

  if (primaryRecommendations.length === 0) return null;

  // Générer des conseils personnalisés basés sur les recommandations
  const generateTips = (): {title: string; content: string; icon: string;}[] => {
    const tips = [];

    // Conseil sur le timing
    tips.push({
      title: "When to take your supplements",
      content: getTimingAdvice(primaryRecommendations),
      icon: "⏱️"
    });

    // Conseil sur les synergies
    if (primaryRecommendations.length > 1) {
      tips.push({
        title: "Optimal combinations",
        content: getCombinationAdvice(primaryRecommendations),
        icon: "🔄"
      });
    }

    // Conseil sur l'alimentation
    tips.push({
      title: "Complementary food sources",
      content: getDietaryAdvice(primaryRecommendations),
      icon: "🥗"
    });

    // Conseil sur le suivi
    tips.push({
      title: "How to track your progress",
      content: getTrackingAdvice(primaryRecommendations),
      icon: "📊"
    });

    return tips;
  };

  const tips = generateTips();

  return (
    <div className="mt-12 mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Practical advice for better results</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full border-t-4 border-t-blue-400 hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{tip.icon}</span>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{tip.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start">
          <div className="mr-3 mt-1 text-amber-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-amber-800 mb-1">Important reminder</h3>
            <p className="text-amber-700 text-sm">
              These recommendations are personalized according to your quiz responses, but do not replace the advice of a healthcare professional.
              Consult a doctor or nutritionist before starting any new supplement, especially if you are taking medications or have pre-existing medical conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fonction pour générer des conseils de timing
function getTimingAdvice(recommendations: EnrichedRecommendation[]): string {
  const containsVitaminD = recommendations.some(r => r.id?.includes('vitamin-d'));
  const containsMagnesium = recommendations.some(r => r.id?.includes('magnesium'));
  const containsOmega3 = recommendations.some(r => r.id?.includes('omega3'));
  const containsIron = recommendations.some(r => r.id?.includes('iron'));

  let advice = "To optimize absorption and effectiveness: ";

  if (containsVitaminD) {
    advice += "Take vitamin D with a meal containing fats for better absorption. ";
  }

  if (containsMagnesium) {
    advice += "Magnesium is ideally taken in the evening to promote relaxation and sleep. ";
  }

  if (containsOmega3) {
    advice += "Omega-3s are better absorbed with a meal and can be taken at any time of day. ";
  }

  if (containsIron) {
    advice += "Take iron on an empty stomach with vitamin C (orange juice for example) to maximize absorption, but avoid taking it with tea, coffee or dairy products. ";
  }

  if (advice === "To optimize absorption and effectiveness: ") {
    advice += "Most supplements are better absorbed when taken with food. Spread your intake throughout the day to maintain consistent levels.";
  }

  return advice;
}

// Fonction pour générer des conseils de combinaison
function getCombinationAdvice(recommendations: EnrichedRecommendation[]): string {
  // Exemples de synergies connues
  const synergies: {[key: string]: string[]} = {
    'vitamin-d-supplement': ['calcium-supplement', 'magnesium-glycinate'],
    'iron-complex': ['vitamin-c-supplement'],
    'zinc-picolinate': ['copper-supplement'],
    'magnesium-glycinate': ['vitamin-d-supplement', 'vitamin-b-complex'],
    'omega3-supplementation': ['vitamin-e-complex']
  };

  // Vérifier si des synergies existent entre les recommandations
  const recommendationIds = recommendations.map(r => r.id || '');
  let synergyFound = false;
  let advice = "";

  recommendationIds.forEach(id => {
    if (synergies[id]) {
      const potentialSynergies = synergies[id].filter(synId => recommendationIds.includes(synId));

      if (potentialSynergies.length > 0) {
        synergyFound = true;
        const recName = recommendations.find(r => r.id === id)?.name || id;
        const synNames = potentialSynergies.map(synId => 
          recommendations.find(r => r.id === synId)?.name || synId
        );

        advice += `${recName} works particularly well with ${synNames.join(' and ')}. `;
      }
    }
  });

  if (!synergyFound) {
    advice = "Your recommended supplements can be taken together for a holistic approach. To avoid potential interactions, space out the intake of minerals (such as iron, calcium or zinc) by at least 2 hours.";
  } else {
    advice += "These synergistic combinations can significantly improve your results.";
  }

  return advice;
}

// Fonction pour générer des conseils alimentaires
function getDietaryAdvice(recommendations: EnrichedRecommendation[]): string {
  let advice = "Complement your supplementation with these natural food sources: ";

  // Regrouper les sources alimentaires naturelles de toutes les recommandations
  const allNaturalSources = recommendations
    .filter(r => r.naturalSources && r.naturalSources.length > 0)
    .flatMap(r => r.naturalSources || []);

  // Éliminer les doublons
  const uniqueSources = [...new Set(allNaturalSources)];

  if (uniqueSources.length > 0) {
    advice += uniqueSources.slice(0, 5).join(', ');
    if (uniqueSources.length > 5) {
      advice += ` and other nutrient-rich foods`;
    }
    advice += ". These foods naturally contain the nutrients you're looking for and can amplify the effects of your supplements.";
  } else {
    advice = "Focus on a balanced diet rich in fruits, vegetables, lean proteins and whole grains to support the action of your supplements. Unprocessed foods provide natural cofactors that optimize the absorption and effectiveness of nutrients.";
  }

  return advice;
}

// Fonction pour générer des conseils de suivi
function getTrackingAdvice(recommendations: EnrichedRecommendation[]): string {
  const containsEnergySupplements = recommendations.some(r => 
    r.id?.includes('vitamin-b') || r.id?.includes('iron') || r.id?.includes('coq10')
  );

  const containsSleepSupplements = recommendations.some(r => 
    r.id?.includes('magnesium') || r.id?.includes('melatonin') || r.id?.includes('sleep')
  );

  const containsStressSupplements = recommendations.some(r => 
    r.id?.includes('ashwagandha') || r.id?.includes('rhodiola') || r.id?.includes('adaptogenic')
  );

  let tracking = "To track your progress effectively: ";

  if (containsEnergySupplements) {
    tracking += "Note your daily energy level on a scale of 1 to 10. ";
  }

  if (containsSleepSupplements) {
    tracking += "Track your sleep quality and time to fall asleep. ";
  }

  if (containsStressSupplements) {
    tracking += "Evaluate your stress level and ability to handle difficult situations. ";
  }

  tracking += "Document your sensations before, during and after the supplementation period (usually 4-8 weeks) to assess the benefits. Don't hesitate to adjust dosages based on your results, always within recommended limits.";

  return tracking;
}

// Secondary component for step tips
interface StepTipsProps {
  category: string;
}

export function HelpfulTipsSection2({ category = "default" }: StepTipsProps) {
  const tips = getTipsForCategory(category);

  return (
    <div className="bg-slate-50 p-4 rounded-lg mt-4">
      <h3 className="text-lg font-semibold mb-3">Helpful Tips</h3>
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start gap-2">
            {tip.icon}
            <p className="text-sm text-slate-600">{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function getTipsForCategory(category: string) {
  const defaultTips = [
    {
      icon: <InfoCircledIcon className="w-5 h-5 text-blue-500" />,
      text: "Take your time to answer accurately"
    },
    {
      icon: <LightningBoltIcon className="w-5 h-5 text-yellow-500" />,
      text: "Your answers help us personalize our recommendations"
    },
    {
      icon: <TimerIcon className="w-5 h-5 text-green-500" />,
      text: "This section takes about 2-3 minutes to complete"
    }
  ];

  return defaultTips;
}

// Simple version for list of tips
interface SimpleHelpfulTipsProps {
  title: string;
  tips: string[];
}

export const SimpleHelpfulTips: React.FC<SimpleHelpfulTipsProps> = ({ title, tips }) => {
  return (
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
      <h3 className="text-lg font-medium text-slate-800 mb-2">{title}</h3>
      <ul className="list-disc pl-5 space-y-1">
        {tips.map((tip, index) => (
          <li key={index} className="text-slate-700 text-sm">{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export { HelpfulTipsSection };
export default HelpfulTipsSection;
