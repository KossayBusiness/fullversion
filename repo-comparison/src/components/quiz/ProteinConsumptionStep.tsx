import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { QuizStepProps } from "./types";

const frequencyOptions = [
  { value: "daily", label: "Quotidiennement" },
  { value: "weekly", label: "Plusieurs fois par semaine" },
  { value: "monthly", label: "Quelques fois par mois" },
  { value: "rarely", label: "Rarement ou jamais" },
];

const fruitVegOptions = [
  { value: "0-1", label: "0 à 1 portion" },
  { value: "2-3", label: "2 à 3 portions" },
  { value: "4-5", label: "4 à 5 portions" },
  { value: "6+", label: "6 portions ou plus" },
];

const ProteinConsumptionStep = ({ responses, updateResponse }: QuizStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-medium mb-3">À quelle fréquence consommez-vous de la viande ?</p>
        <RadioGroup
          value={responses.meatConsumption}
          onValueChange={(value) => updateResponse("meatConsumption", value)}
          className="space-y-3"
        >
          {frequencyOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`meat-${option.value}`} />
              <Label htmlFor={`meat-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <p className="font-medium mb-3">À quelle fréquence consommez-vous du poisson ou des fruits de mer ?</p>
        <RadioGroup
          value={responses.fishConsumption}
          onValueChange={(value) => updateResponse("fishConsumption", value)}
          className="space-y-3"
        >
          {frequencyOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`fish-${option.value}`} />
              <Label htmlFor={`fish-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <p className="font-medium mb-3">Combien de portions de fruits et légumes consommez-vous par jour ?</p>
        <RadioGroup
          value={responses.fruitVegConsumption}
          onValueChange={(value) => updateResponse("fruitVegConsumption", value)}
          className="space-y-3"
        >
          {fruitVegOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`fruitveg-${option.value}`} />
              <Label htmlFor={`fruitveg-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default ProteinConsumptionStep;