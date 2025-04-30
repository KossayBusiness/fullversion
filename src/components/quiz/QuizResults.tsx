import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPersonalizedStyle, personalizeRecommendationDisplay } from '@/utils/personalizedFactorSystem';
import { ScientificHighlightedText } from '@/components/ui/scientific-highlighted-text';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface QuizResultsProps {
  recommendations?: any[];
  quizResponses?: any;
  message?: string;
}

export const QuizResults: React.FC<QuizResultsProps> = ({ recommendations = [], quizResponses = {}, message = "" }) => {
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIsLoading(true);

      if (!recommendations || recommendations.length === 0) {
        setError("No recommendations could be generated. Please try the quiz again.");
        setPersonalizedRecommendations([]);
        setIsLoading(false);
        return;
      }

      // Ensure quizResponses is valid
      const validQuizResponses = quizResponses || {};

      // Get personalization context
      const personalizationContext = getPersonalizedStyle ? 
        getPersonalizedStyle(validQuizResponses) : 
        { theme: 'default', density: 'normal', scientificDetail: 'moderate' };

      // Personalize the display of recommendations
      const personalized = personalizeRecommendationDisplay ? 
        personalizeRecommendationDisplay(recommendations, personalizationContext) : 
        recommendations.map(rec => ({
          ...rec,
          displayStyle: {
            visualDensity: 'normal',
            scientificDetail: 'moderate',
            seasonalHighlight: false,
            lifestyleFactors: []
          },
          benefits: rec.primaryBenefits || []
        }));

      setPersonalizedRecommendations(personalized);
      setError(null);
    } catch (err) {
      console.error("Error personalizing recommendations:", err);
      setError("An error occurred while personalizing the recommendations.");
      setPersonalizedRecommendations(recommendations.map(rec => ({
        ...rec,
        displayStyle: {
          visualDensity: 'normal',
          scientificDetail: 'moderate',
          seasonalHighlight: false,
          lifestyleFactors: []
        },
        benefits: rec.primaryBenefits || []
      })));
    } finally {
      setIsLoading(false);
    }
  }, [recommendations, quizResponses]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Analyzing your responses...</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Card>
          <CardContent className="pt-6">
            <p>We recommend retaking the quiz or contacting our support.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!personalizedRecommendations || personalizedRecommendations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>No recommendations</AlertTitle>
          <AlertDescription>
            We couldn't generate recommendations based on your responses.
            Please try the quiz again providing more details.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-4">
        Vos Recommandations Personnalisées
      </h1>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-blue-800">
          Basé sur {recommendations.length} analyses scientifiques
        </p>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-blue-800">
          <p>{message}</p>
        </div>
      )}

      <div className="grid gap-6">
        {personalizedRecommendations.map((rec, index) => (
          <motion.div
            key={`${rec.id}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              className={`
                border-l-4 
                ${rec.isPrimary ? 'border-l-blue-500' : 'border-l-green-400'}
                hover:shadow-lg 
                transition-all 
                duration-300
                bg-gradient-to-r from-white to-gray-50
                hover:from-gray-50 hover:to-white
                ${rec.displayStyle?.visualDensity === 'minimal' ? 'p-4 space-y-3' : 
                  rec.displayStyle?.visualDensity === 'rich' ? 'p-6 space-y-6' : 'p-5 space-y-4'}
              `}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <CardTitle className="text-xl">
                    {rec.name}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {rec.displayStyle?.seasonalHighlight && (
                      <Badge variant="outline" className="bg-amber-50">
                        Seasonal
                      </Badge>
                    )}
                    {rec.isPrimary && (
                      <Badge className="bg-blue-500">
                        Primary Recommendation
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Description adaptée au niveau scientifique */}
                  <div className="mt-2">
                    {rec.description ? (
                      <ScientificHighlightedText
                        text={rec.description}
                        level={rec.displayStyle?.scientificDetail || 'moderate'}
                      />
                    ) : (
                      <p>Information not available</p>
                    )}
                  </div>

                  {/* Bénéfices personnalisés */}
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Personalized Benefits</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {(rec.benefits || rec.primaryBenefits || []).map((benefit: string, i: number) => (
                        <li key={i} className="text-gray-700">
                          <ScientificHighlightedText text={benefit} /> {/* Added ScientificHighlightedText here */}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Facteurs contextuels pertinents */}
                  {rec.displayStyle?.lifestyleFactors && rec.displayStyle.lifestyleFactors.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Relevant Factors</h4>
                      <div className="flex flex-wrap gap-2">
                        {rec.displayStyle.lifestyleFactors.map((factor: string, i: number) => (
                          <Badge key={i} variant="outline">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Posologie si disponible */}
                  {rec.dosage && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Recommended Dosage</h4>
                      <p className="text-gray-700">{rec.dosage}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuizResults;