import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface DietaryHabitsStepProps {
  value?: string[];
  onChange?: (habits: string[]) => void;
  selectedHabits?: string[];
  onUpdate?: (habits: string[]) => void;
}

export function DietaryHabitsStep({ 
  value = [], 
  onChange, 
  selectedHabits = [], 
  onUpdate 
}: DietaryHabitsStepProps) {
  // Use the correct props depending on what's passed
  const habitsValue = selectedHabits.length > 0 ? selectedHabits : value;
  const handleHabitsChange = onUpdate || onChange || (() => {});
  const dietaryOptions = [
    {
      category: "Diet Type",
      items: [
        { id: "omnivore", label: "Regular (omnivore)" },
        { id: "vegetarian", label: "Vegetarian" },
        { id: "vegan", label: "Vegan" },
        { id: "pescatarian", label: "Pescatarian" },
        { id: "keto", label: "Ketogenic" },
        { id: "paleo", label: "Paleo" },
        { id: "mediterranean", label: "Mediterranean" }
      ]
    },
    {
      category: "Eating Habits",
      items: [
        { id: "processed", label: "Regularly consume processed foods" },
        { id: "low_variety", label: "Limited food variety" },
        { id: "irregular_meals", label: "Irregular meal times" },
        { id: "high_sugar", label: "High sugar consumption" },
        { id: "high_salt", label: "High salt consumption" },
        { id: "fast_eater", label: "Eat quickly" },
        { id: "late_night", label: "Often eat late at night" }
      ]
    }
  ];

  const handleChange = (habit: string) => {
    // For diet type category, allow only one selection
    if (dietaryOptions[0].items.some(item => item.id === habit)) {
      // If a diet type is selected, filter out any previous diet type
      const otherDietTypes = dietaryOptions[0].items.map(item => item.id);
      const habitsWithoutDiets = habitsValue.filter(v => !otherDietTypes.includes(v));

      // If the clicked diet is already selected, just remove it
      if (habitsValue.includes(habit)) {
        handleHabitsChange(habitsWithoutDiets);
      } else {
        // Otherwise add the new diet type
        handleHabitsChange([...habitsWithoutDiets, habit]);
      }
    } else {
      // For eating habits, allow multiple selections
      const newValue = habitsValue.includes(habit)
        ? habitsValue.filter(v => v !== habit)
        : [...habitsValue, habit];

      handleHabitsChange(newValue);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-2">What are your dietary habits?</h2>
        <p className="text-muted-foreground mb-4">
          Select your diet type and any eating habits that apply to you.
        </p>
      </div>

      <div className="space-y-6">
        {dietaryOptions.map((group) => (
          <Card key={group.category} className="p-4">
            <h3 className="font-medium mb-3">{group.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.items.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`diet-${option.id}`}
                    checked={habitsValue.includes(option.id)}
                    onCheckedChange={() => handleChange(option.id)}
                  />
                  <Label
                    htmlFor={`diet-${option.id}`}
                    className="text-base cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="text-sm text-muted-foreground mt-4">
        <p>Your dietary habits help us understand your nutritional needs better.</p>
      </div>
    </div>
  );
}

export default DietaryHabitsStep;