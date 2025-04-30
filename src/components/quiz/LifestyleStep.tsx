import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface LifestyleStepProps {
  value?: string[];
  diet?: string;
  stressLevel?: string;
  exerciseFrequency?: string;
  sleepQuality?: string;
  onChange?: (data: Partial<{
    lifestyle: string[];
    diet: string;
    stressLevel: string;
    exerciseFrequency: string;
    sleepQuality: string;
  }>) => void;
  lifestyleData?: {
    sleep?: number;
    stress?: string;
    exercise?: string;
  };
  onUpdate?: (data: any) => void;
}

export function LifestyleStep({
  value = [],
  diet = '',
  stressLevel = '',
  exerciseFrequency = '',
  sleepQuality = '',
  onChange,
  lifestyleData,
  onUpdate
}: LifestyleStepProps) {

  const handleLifestyleChange = (lifestyle: string) => {
    const newValue = value.includes(lifestyle)
      ? value.filter(v => v !== lifestyle)
      : [...value, lifestyle];

    if (onChange) {
      onChange({ lifestyle: newValue });
    } else if (onUpdate) {
      onUpdate({ 
        ...lifestyleData,
        lifestyleFactors: newValue
      });
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    // Ensure lifestyleData is properly initialized
    const currentData = lifestyleData || {};

    const updatedData = {
      ...currentData,
      [field]: value,
    };
    onUpdate(updatedData);
  };

  const lifestyleOptions = [
    { id: "high_stress", label: "High stress lifestyle" },
    { id: "sedentary", label: "Sedentary (sitting most of the day)" },
    { id: "poor_sleep", label: "Poor sleep quality" },
    { id: "screen_time", label: "Extended screen time" },
    { id: "active", label: "Regular physical activity" },
    { id: "smoke", label: "Smoking" },
    { id: "alcohol", label: "Regular alcohol consumption" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Tell us about your lifestyle</h2>
        <p className="text-muted-foreground mb-4">
          These details help us tailor recommendations to your specific needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="diet-select">Diet Type</Label>
          <Select
            value={diet}
            onValueChange={(value) => handleFieldChange('diet', value)}
          >
            <SelectTrigger id="diet-select">
              <SelectValue placeholder="Select your diet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="omnivore">Regular (omnivore)</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="pescatarian">Pescatarian</SelectItem>
              <SelectItem value="keto">Ketogenic</SelectItem>
              <SelectItem value="paleo">Paleo</SelectItem>
              <SelectItem value="mediterranean">Mediterranean</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stress-select">Stress Level</Label>
          <Select
            value={stressLevel}
            onValueChange={(value) => handleFieldChange('stressLevel', value)}
          >
            <SelectTrigger id="stress-select">
              <SelectValue placeholder="Select your stress level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low (rarely feel stressed)</SelectItem>
              <SelectItem value="moderate">Moderate (occasional stress)</SelectItem>
              <SelectItem value="high">High (frequently stressed)</SelectItem>
              <SelectItem value="severe">Severe (constant stress)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="exercise-select">Exercise Frequency</Label>
          <Select
            value={exerciseFrequency}
            onValueChange={(value) => handleFieldChange('exerciseFrequency', value)}
          >
            <SelectTrigger id="exercise-select">
              <SelectValue placeholder="Select your exercise frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rarely">Rarely (less than once a week)</SelectItem>
              <SelectItem value="occasional">Occasional (1-2 times a week)</SelectItem>
              <SelectItem value="regular">Regular (3-4 times a week)</SelectItem>
              <SelectItem value="daily">Daily (5+ times a week)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sleep-select">Sleep Quality</Label>
          <Select
            value={sleepQuality}
            onValueChange={(value) => handleFieldChange('sleepQuality', value)}
          >
            <SelectTrigger id="sleep-select">
              <SelectValue placeholder="Select your sleep quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="poor">Poor (often wake up tired)</SelectItem>
              <SelectItem value="fair">Fair (sometimes wake up rested)</SelectItem>
              <SelectItem value="good">Good (usually wake up rested)</SelectItem>
              <SelectItem value="excellent">Excellent (consistently great sleep)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="p-4">
        <h3 className="font-medium mb-3">Lifestyle Factors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {lifestyleOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={`lifestyle-${option.id}`}
                checked={value.includes(option.id)}
                onCheckedChange={() => handleLifestyleChange(option.id)}
              />
              <Label
                htmlFor={`lifestyle-${option.id}`}
                className="text-base cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      <div className="text-sm text-muted-foreground mt-4">
        <p>Your lifestyle information helps us tailor our recommendations to your daily routine.</p>
      </div>
    </div>
  );
}

export default LifestyleStep;