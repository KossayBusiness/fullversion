import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { QuizProgress } from './QuizProgress';
import { ScientificHighlightedText as EnhancedScientificText } from '@/components/ui/scientific-highlighted-text'; 
import { UserInfoStep } from './UserInfoStep';
import { HelpfulTipsSection } from './HelpfulTipsSection';
import { DietaryHabitsStep } from './DietaryHabitsStep';
import { ObjectivesStep } from './ObjectivesStep';
import { SymptomsStep } from './SymptomsStep';
import { LifestyleStep } from './LifestyleStep';
import { ProteinConsumptionStep } from './ProteinConsumptionStep';
import MedicationsStep from './MedicationsStep'; 
import { ScientificTrustBadges } from './ScientificTrustBadges';
import QuizResultsComponent from './QuizResults'; 

interface QuizState {
  currentStep: number;
  userInfo: {
    name: string;
    age: number;
    gender: string;
    email: string;
  };
  dietaryHabits: string[];
  objectives: string[];
  symptoms: string[];
  lifestyle: {
    sleep: number;
    stress: string;
    exercise: string;
    sleepQuality?: string; 
    lifestyleFactors?: string[]; 
    diet?: string; 
  };
  proteinConsumption: string;
  medications: string[]; 
}

const QuizForm: React.FC = () => {
  const navigate = useNavigate();
  const [quizState, setQuizState] = useState<QuizState>({
    currentStep: 0,
    userInfo: {
      name: '',
      age: 0,
      gender: '',
      email: '',
    },
    dietaryHabits: [],
    objectives: [],
    symptoms: [],
    lifestyle: {
      sleep: 7,
      stress: 'moderate',
      exercise: 'light',
    },
    proteinConsumption: '',
    medications: [], 
  });

  const updateQuizState = (key: keyof QuizState, value: any) => {
    setQuizState(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNextStep = () => {
    if (quizState.currentStep < steps.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }));
    } else {
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    if (quizState.currentStep > 0) {
      setQuizState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1,
      }));
    }
  };

  const handleSubmit = () => {
    console.log('Quiz submission:', quizState);

    let lifestyleData = quizState.lifestyle;
    if (!lifestyleData.lifestyleFactors) {
      lifestyleData.lifestyleFactors = [];
    }

    const lifestyleFactors = [];
    if (lifestyleData.stress === 'high' || lifestyleData.stress === 'severe') lifestyleFactors.push('high_stress');
    if (lifestyleData.exercise === 'sedentary' || lifestyleData.exercise === 'never') lifestyleFactors.push('sedentary');
    if (lifestyleData.sleepQuality === 'poor') lifestyleFactors.push('poor_sleep');
    if (lifestyleData.exercise === 'intense' || lifestyleData.exercise === 'daily') lifestyleFactors.push('active_lifestyle');

    const objectives = quizState.objectives.length > 0 ? 
      quizState.objectives : ['energy']; 

    const quizData = {
      symptoms: quizState.symptoms || [],
      objectives: objectives,
      dietaryHabits: quizState.dietaryHabits || [],
      lifestyle: {
        ...lifestyleData,
        lifestyleFactors: lifestyleFactors
      },
      proteinConsumption: quizState.proteinConsumption || 'moderate', 
      userInfo: quizState.userInfo || {},
      stressLevel: lifestyleData.stress, 
      exerciseFrequency: lifestyleData.exercise, 
      sleepQuality: lifestyleData.sleepQuality, 
      diet: quizState.dietaryHabits.includes('vegan') ? 'vegan' : 
            quizState.dietaryHabits.includes('vegetarian') ? 'vegetarian' : 'regular',
      goal: objectives[0], 
      medications: quizState.medications 
    };

    console.log('Formatted quiz data for submission:', quizData);

    if (!quizData || typeof quizData !== 'object') {
      console.error("Invalid quiz data:", quizData);
      alert("An error occurred while preparing your results. Please try again.");
      return;
    }

    if (!quizData.symptoms || quizData.symptoms.length === 0) {
      if (!confirm("You haven't selected any symptoms. Continue anyway?")) {
        return;
      }
    }

    if (!quizData.objectives || quizData.objectives.length === 0) {
      if (!confirm("You haven't defined any objectives. Continue anyway?")) {
        return;
      }
    }

    try {
      const safeQuizData = {
        ...quizData,
        symptoms: quizData.symptoms || [],
        objectives: quizData.objectives || [],
        medications: quizData.medications || []
      };

      navigate('/quiz-results', { state: safeQuizData });
    } catch (error) {
      console.error("Error navigating to results:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const steps = [
    {
      title: "About You",
      description: "Tell us about yourself so we can personalize your plan",
      component: <UserInfoStep 
                  userData={quizState.userInfo} 
                  onUpdate={(data) => updateQuizState('userInfo', data)} 
                />
    },
    {
      title: "Dietary Habits",
      description: "Your current eating habits help us understand your preferences",
      component: <DietaryHabitsStep 
                  value={quizState.dietaryHabits}
                  onChange={(habits) => updateQuizState('dietaryHabits', habits)}
                  selectedHabits={quizState.dietaryHabits}
                  onUpdate={(habits) => updateQuizState('dietaryHabits', habits)}
                />
    },
    {
      title: "Health Objectives",
      description: "What are you looking to improve?",
      component: <ObjectivesStep 
                  value={quizState.objectives.length > 0 ? quizState.objectives[0] : ''}
                  onChange={(objective) => updateQuizState('objectives', [objective])}
                  selectedObjectives={quizState.objectives}
                  onUpdate={(objectives) => updateQuizState('objectives', objectives)}
                />
    },
    {
      title: "Current Symptoms",
      description: "Are you experiencing any of these symptoms?",
      component: <SymptomsStep
                  selectedSymptoms={quizState.symptoms}
                  onUpdate={(symptoms) => updateQuizState('symptoms', symptoms)}
                  onNext={handleNextStep}
                  onBack={handlePrevStep}
                />
    },
    {
      title: "Lifestyle Factors",
      description: "Your daily habits impact your nutritional needs",
      component: <LifestyleStep
                  diet={quizState.lifestyle.diet}
                  stressLevel={quizState.lifestyle.stress}
                  exerciseFrequency={quizState.lifestyle.exercise}
                  sleepQuality={quizState.lifestyle.sleepQuality}
                  value={quizState.lifestyle.lifestyleFactors || []}
                  lifestyleData={quizState.lifestyle}
                  onUpdate={(lifestyle) => updateQuizState('lifestyle', lifestyle)}
                />
    },
    {
      title: "Medications",
      description: "List any medications you are currently taking.",
      component: <MedicationsStep 
                  selectedMedications={quizState.medications}
                  onUpdate={(medications) => updateQuizState('medications', medications)}
                />
    }, 
    {
      title: "Protein Intake",
      description: "Protein is essential for various bodily functions",
      component: <ProteinConsumptionStep
                  value={quizState.proteinConsumption}
                  onChange={(value) => updateQuizState('proteinConsumption', value)}
                  selected={quizState.proteinConsumption}
                  onUpdate={(value) => updateQuizState('proteinConsumption', value)}
                />
    }
  ];

  const currentStep = steps[quizState.currentStep];
  const progress = ((quizState.currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3">Personalized Nutrition Assessment</h1>
        <p className="text-muted-foreground">
          <EnhancedScientificText 
            content="Our advanced nutritional analysis is based on peer-reviewed research and personalized to your unique biochemistry."
            highlightColor="bg-amber-100"
          />
        </p>
      </div>

      <Card className="border-0 shadow-md">
        <CardContent className="pt-6">
          <QuizProgress 
            currentStep={quizState.currentStep + 1} 
            totalSteps={steps.length} 
          />

          <Tabs defaultValue="questions" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="questions">Assessment</TabsTrigger>
              <TabsTrigger value="info">Why We Ask</TabsTrigger>
            </TabsList>

            <TabsContent value="questions" className="py-4 space-y-4">
              <h2 className="text-xl font-semibold mb-2">{currentStep.title}</h2>
              <p className="text-muted-foreground mb-6">{currentStep.description}</p>

              {currentStep.component}

              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={handlePrevStep}
                  disabled={quizState.currentStep === 0}
                >
                  Previous
                </Button>

                <Button onClick={handleNextStep}>
                  {quizState.currentStep < steps.length - 1 ? "Continue" : "Get Your Results"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="info" className="py-4">
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Why This Information Matters</h2>
                <p>
                  <EnhancedScientificText 
                    content="The questions in this assessment are designed based on clinical research to identify your specific nutritional needs and potential imbalances."
                    highlightColor="bg-amber-100"
                  />
                </p>
                <p className="text-muted-foreground">
                  Your responses help our system generate evidence-based recommendations tailored to your unique profile.
                </p>

                <ScientificTrustBadges />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const ResultsView: React.FC<{ quizData: QuizState }> = ({ quizData }) => {
  return (
    <div>
      <h1>Quiz Results</h1>
      <pre>{JSON.stringify(quizData, null, 2)}</pre> 
    </div>
  );
};

export { QuizForm, ResultsView };
export default QuizForm;