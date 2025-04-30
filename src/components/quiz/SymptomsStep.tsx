import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface SymptomsStepProps {
  selectedSymptoms: string[];
  onUpdate: (symptoms: string[]) => void;
  onNext?: () => void;
  onBack?: () => void;
}

function SymptomsStep({
  selectedSymptoms,
  onUpdate,
  onNext,
  onBack
}: SymptomsStepProps) {
  const symptomsOptions = [
    { id: 'Fatigue', label: 'Fatigue' },
    { id: 'Sleep issues', label: 'Sleep issues' },
    { id: 'Stress', label: 'Stress' },
    { id: 'Anxiety', label: 'Anxiety' },
    { id: 'Digestive problems', label: 'Digestive problems' },
    { id: 'Joint Pain', label: 'Joint Pain' },
    { id: 'Skin problems', label: 'Skin problems' },
    { id: 'Weak immune system', label: 'Weak immune system' }
  ];

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    if (checked) {
      onUpdate([...selectedSymptoms, symptomId]);
    } else {
      onUpdate(selectedSymptoms.filter(s => s !== symptomId));
    }
    console.log("Updated symptoms:", selectedSymptoms);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Current Symptoms</h2>
        <p className="text-muted-foreground mb-4">
          Select any symptoms you're currently experiencing (multiple selections allowed)
        </p>
        <p className="text-sm text-muted-foreground italic mb-4">
          Understanding your symptoms helps us create personalized recommendations based on scientific research
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {symptomsOptions.map((symptom) => (
          <div 
            key={symptom.id} 
            className={`flex items-start space-x-3 p-3 border rounded-md hover:bg-muted/50 transition-colors ${selectedSymptoms.includes(symptom.id) ? 'border-primary bg-primary/5' : 'border-muted'}`}
            onClick={() => handleSymptomChange(symptom.id, !selectedSymptoms.includes(symptom.id))}
          >
            <Checkbox
              id={`symptom-${symptom.id}`}
              checked={selectedSymptoms.includes(symptom.id)}
              onCheckedChange={(checked) => 
                handleSymptomChange(symptom.id, checked as boolean)
              }
            />
            <Label
              htmlFor={`symptom-${symptom.id}`}
              className="text-base cursor-pointer flex-1"
            >
              {symptom.label}
            </Label>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext}>
            Continue
          </Button>
        </div>
    </div>
  );
};

export { SymptomsStep };