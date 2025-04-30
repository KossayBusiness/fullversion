import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QuizStepProps } from "./types";

const dietaryOptions = [
  { value: "omnivore", label: "Omnivore (je mange de tout)" },
  { value: "flexitarian", label: "Flexitarien (je limite ma consommation de viande)" },
  { value: "pescatarian", label: "Pescetarien (je mange du poisson mais pas de viande)" },
  { value: "vegetarian", label: "Végétarien (pas de viande ni poisson)" },
  { value: "vegan", label: "Végan (aucun produit animal)" },
];

const DietaryHabitsStep = ({ responses = { dietaryHabits: '' }, updateResponse }: QuizStepProps) => {
  return (
    <div>
      <p className="font-medium mb-4">Quel régime alimentaire suivez-vous ?</p>
      <RadioGroup
        value={responses.dietaryHabits}
        onValueChange={(value) => updateResponse("dietaryHabits", value)}
        className="space-y-3"
      >
        {dietaryOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default DietaryHabitsStep;