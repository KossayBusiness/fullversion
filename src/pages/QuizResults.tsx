
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QuizResults as QuizResultsComponent } from '@/components/quiz/QuizResults';
import { getQuizRecommendations } from '@/utils/quizIntegrationService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const QuizResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get quiz responses from location state
  const quizResponses = location.state || {};

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Check if we have quiz data
        if (!quizResponses || Object.keys(quizResponses).length === 0) {
          setError("No quiz data found. Please retake the quiz.");
          setIsLoading(false);
          return;
        }

        console.log("Generating recommendations with quiz data:", quizResponses);
        
        // Use the quiz integration service to get recommendations
        const result = await getQuizRecommendations(quizResponses);
        
        if (Array.isArray(result)) {
          // If the result is an array, it's a direct list of recommendations
          setRecommendations(result);
          setMessage("Voici vos recommandations personnalisées basées sur vos réponses.");
        } else if (result && typeof result === 'object') {
          // If the result is an object, it might have recommendations and a message
          if (result.recommendations && Array.isArray(result.recommendations)) {
            setRecommendations(result.recommendations);
          }
          
          if (result.message) {
            setMessage(result.message);
          }
        } else {
          setError("Unable to generate recommendations. Unexpected data format.");
        }
      } catch (err) {
        console.error("Error getting quiz recommendations:", err);
        setError("An error occurred while generating recommendations.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [quizResponses]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-8">Analyzing your responses...</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="flex gap-4 justify-center mt-6">
          <Button variant="outline" onClick={() => navigate('/quiz')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to quiz
          </Button>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <QuizResultsComponent 
        recommendations={recommendations} 
        quizResponses={quizResponses}
        message={message}
      />
      <div className="mt-8 text-center">
        <Button variant="outline" onClick={() => navigate('/quiz')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Retake the quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
