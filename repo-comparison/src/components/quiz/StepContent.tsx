
import { Card, CardContent } from "@/components/ui/card";
import UserInfoStep from "./UserInfoStep";
import ObjectivesStep from "./ObjectivesStep";
import DietaryHabitsStep from "./DietaryHabitsStep";
import ProteinConsumptionStep from "./ProteinConsumptionStep";
import LifestyleStep from "./LifestyleStep";
import SymptomsStep from "./SymptomsStep";
import { QuizStep, QuizResponse } from "./types";

interface StepContentProps {
  currentStep: QuizStep;
  currentStepIndex: number;
  responses: QuizResponse;
  updateResponse: (field: string, value: any) => void;
}

const StepContent = ({ 
  currentStep, 
  currentStepIndex, 
  responses, 
  updateResponse 
}: StepContentProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-2">
          {currentStep.title}
        </h2>
        <p className="text-muted-foreground mb-6">
          {currentStep.description}
        </p>

        {currentStepIndex === 0 && (
          <UserInfoStep responses={responses} updateResponse={updateResponse} />
        )}

        {currentStepIndex === 1 && (
          <ObjectivesStep responses={responses} updateResponse={updateResponse} />
        )}

        {currentStepIndex === 2 && (
          <DietaryHabitsStep responses={responses} updateResponse={updateResponse} />
        )}

        {currentStepIndex === 3 && (
          <ProteinConsumptionStep responses={responses} updateResponse={updateResponse} />
        )}

        {currentStepIndex === 4 && (
          <LifestyleStep responses={responses} updateResponse={updateResponse} />
        )}

        {currentStepIndex === 5 && (
          <SymptomsStep responses={responses} updateResponse={updateResponse} />
        )}
      </CardContent>
    </Card>
  );
};

export default StepContent;
