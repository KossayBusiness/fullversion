import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { QuizStepProps } from "./types";

const exerciseOptions = [
  { value: "daily", label: "Quotidiennement" },
  { value: "weekly", label: "2-3 fois par semaine" },
  { value: "monthly", label: "Quelques fois par mois" },
  { value: "rarely", label: "Rarement ou jamais" },
];

const sleepOptions = [
  { value: "excellent", label: "Excellent - Je me réveille frais et dispos" },
  { value: "good", label: "Bon - Quelques difficultés occasionnelles" },
  { value: "average", label: "Moyen - Difficultés fréquentes (endormissement, réveils)" },
  { value: "poor", label: "Mauvais - Problèmes chroniques de sommeil" },
];

const stressOptions = [
  { value: "low", label: "Faible - Je me sens généralement détendu" },
  { value: "moderate", label: "Modéré - Stress occasionnel" },
  { value: "high", label: "Élevé - Stress fréquent" },
  { value: "severe", label: "Sévère - Stress chronique" },
];

const LifestyleStep = ({ responses, updateResponse }: QuizStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-medium mb-3">À quelle fréquence pratiquez-vous une activité physique ?</p>
        <RadioGroup
          value={responses.exerciseFrequency}
          onValueChange={(value) => updateResponse("exerciseFrequency", value)}
          className="space-y-3"
        >
          {exerciseOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`exercise-${option.value}`} />
              <Label htmlFor={`exercise-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <p className="font-medium mb-3">Comment évaluez-vous la qualité de votre sommeil ?</p>
        <RadioGroup
          value={responses.sleepQuality}
          onValueChange={(value) => updateResponse("sleepQuality", value)}
          className="space-y-3"
        >
          {sleepOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`sleep-${option.value}`} />
              <Label htmlFor={`sleep-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <p className="font-medium mb-3">Comment évaluez-vous votre niveau de stress ?</p>
        <RadioGroup
          value={responses.stressLevel}
          onValueChange={(value) => updateResponse("stressLevel", value)}
          className="space-y-3"
        >
          {stressOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`stress-${option.value}`} />
              <Label htmlFor={`stress-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default LifestyleStep;