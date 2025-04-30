import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ProteinConsumptionStepProps {
  value?: string;
  onChange?: (proteinConsumption: string) => void;
  selected?: string;
  onUpdate?: (proteinConsumption: string) => void;
}

export function ProteinConsumptionStep({ value = '', onChange, selected = '', onUpdate }: ProteinConsumptionStepProps) {
  const proteinOptions = [
    { 
      id: "low", 
      label: "Low", 
      description: "Less than 0.5g per kg of body weight (e.g., <35g for a 70kg person)",
      examples: "Low protein diet with few animal products, legumes or protein supplements"
    },
    { 
      id: "moderate", 
      label: "Moderate", 
      description: "Around 0.8g per kg of body weight (e.g., ~55g for a 70kg person)",
      examples: "Typical mixed diet with some animal products, legumes or plant proteins"
    },
    { 
      id: "high", 
      label: "High", 
      description: "More than 1.2g per kg of body weight (e.g., >85g for a 70kg person)",
      examples: "Diet focused on protein sources, possibly with supplements"
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-2">How would you describe your protein consumption?</h2>
        <p className="text-muted-foreground mb-4">
          Protein intake plays an important role in your overall nutritional needs.
        </p>
      </div>

      <RadioGroup 
        value={selected || value} 
        onValueChange={(val) => {
          if (onUpdate) onUpdate(val);
          if (onChange) onChange(val);
        }}
        className="space-y-4"
      >
        {proteinOptions.map((option) => (
          <div key={option.id} className="flex items-start space-x-3 p-4 rounded-md border hover:border-primary transition-colors cursor-pointer">
            <RadioGroupItem 
              value={option.id} 
              id={`protein-${option.id}`} 
              className="mt-1"
            />
            <div>
              <Label 
                htmlFor={`protein-${option.id}`}
                className="font-medium text-base cursor-pointer"
              >
                {option.label}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                {option.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1 italic">
                Examples: {option.examples}
              </p>
            </div>
          </div>
        ))}
      </RadioGroup>

      <div className="text-sm text-muted-foreground mt-4">
        <p>Your protein intake information helps us tailor nutritional recommendations to ensure adequate intake of essential nutrients.</p>
      </div>
    </div>
  );
}

export default ProteinConsumptionStep;