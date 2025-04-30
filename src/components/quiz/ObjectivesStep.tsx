
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ObjectivesStepProps {
  value?: string;
  onChange?: (goal: string) => void;
  selectedObjectives?: string[];
  onUpdate?: (objectives: string[]) => void;
}

export function ObjectivesStep({ 
  value = '', 
  onChange, 
  selectedObjectives = [], 
  onUpdate 
}: ObjectivesStepProps) {
  const objectives = [
    { id: "energy", label: "More energy", description: "Feel more energetic throughout the day" },
    { id: "sleep", label: "Better sleep", description: "Improve sleep quality and duration" },
    { id: "digestion", label: "Support my digestion", description: "Improve digestive health and comfort" },
    { id: "immunity", label: "Strengthen my immunity", description: "Support immune system function" },
    { id: "focus", label: "Improve my concentration", description: "Enhance mental clarity and focus" },
    { id: "stress", label: "Reduce my stress", description: "Support relaxation and stress management" }
  ];

  // Handle both single-selection and multi-selection modes
  const handleChange = (objective: string) => {
    if (onUpdate && selectedObjectives) {
      // Multi-selection mode (array of objectives)
      if (selectedObjectives.includes(objective)) {
        onUpdate(selectedObjectives.filter(item => item !== objective));
      } else {
        onUpdate([...selectedObjectives, objective]);
      }
    } else if (onChange) {
      // Single-selection mode (string value)
      onChange(objective);
    }
  };

  // Determine if an objective is selected
  const isSelected = (objectiveId: string) => {
    if (selectedObjectives && selectedObjectives.length > 0) {
      return selectedObjectives.includes(objectiveId);
    }
    return value === objectiveId;
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-2">What is your primary health goal?</h2>
        <p className="text-muted-foreground mb-4">
          This will help us prioritize the most relevant recommendations for you.
        </p>
      </div>

      <RadioGroup 
        value={value} 
        onValueChange={onChange}
        className="space-y-3"
      >
        {objectives.map((objective) => (
          <div 
            key={objective.id} 
            className={`flex items-start space-x-3 p-3 rounded-md hover:bg-muted/50 cursor-pointer transition-colors ${
              isSelected(objective.id) ? 'bg-muted/70' : ''
            }`}
            onClick={() => handleChange(objective.id)}
          >
            <RadioGroupItem 
              value={objective.id} 
              id={`objective-${objective.id}`} 
              className="mt-1"
              checked={isSelected(objective.id)}
            />
            <div className="flex-1">
              <Label 
                htmlFor={`objective-${objective.id}`}
                className="font-medium text-base cursor-pointer"
              >
                {objective.label}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                {objective.description}
              </p>
            </div>
          </div>
        ))}
      </RadioGroup>

      <div className="text-sm text-muted-foreground mt-4">
        <p>Your primary goal will help us prioritize the most impactful recommendations first.</p>
      </div>
    </div>
  );
}

export default ObjectivesStep;
