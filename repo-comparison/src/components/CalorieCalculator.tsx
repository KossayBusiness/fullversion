
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CalorieCalculatorProps {
  onCalculate: (calories: number) => void;
}

export const CalorieCalculator = ({ onCalculate }: CalorieCalculatorProps) => {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('homme');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('modéré');
  const [goal, setGoal] = useState<string>('maintien');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    // Validation des champs
    if (!age || !weight || !height) {
      return;
    }

    // Calcul BMR (Basal Metabolic Rate) avec la formule de Mifflin-St Jeor
    let bmr = 0;
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (gender === 'homme') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    // Facteur d'activité
    let activityFactor = 1.2; // Sédentaire
    switch (activityLevel) {
      case 'sédentaire':
        activityFactor = 1.2;
        break;
      case 'léger':
        activityFactor = 1.375;
        break;
      case 'modéré':
        activityFactor = 1.55;
        break;
      case 'actif':
        activityFactor = 1.725;
        break;
      case 'très actif':
        activityFactor = 1.9;
        break;
    }

    let totalCalories = Math.round(bmr * activityFactor);

    // Ajustement selon l'objectif
    switch (goal) {
      case 'perte':
        totalCalories = Math.round(totalCalories * 0.8); // Déficit de 20%
        break;
      case 'prise':
        totalCalories = Math.round(totalCalories * 1.15); // Surplus de 15%
        break;
      // Maintien: pas d'ajustement
    }

    setResult(totalCalories);
    onCalculate(totalCalories);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-natural-600" />
        <h2 className="font-display text-xl font-medium">Calculateur de Calories</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Estimez vos besoins caloriques quotidiens
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="age">Âge</Label>
          <Input 
            id="age" 
            type="number" 
            placeholder="Ex: 30" 
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div>
          <Label>Sexe</Label>
          <RadioGroup 
            value={gender} 
            onValueChange={setGender}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="homme" id="homme" />
              <Label htmlFor="homme">Homme</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="femme" id="femme" />
              <Label htmlFor="femme">Femme</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="weight">Poids (kg)</Label>
          <Input 
            id="weight" 
            type="number" 
            placeholder="Ex: 70" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="height">Taille (cm)</Label>
          <Input 
            id="height" 
            type="number" 
            placeholder="Ex: 175" 
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="activity">Niveau d'activité</Label>
          <Select 
            value={activityLevel} 
            onValueChange={setActivityLevel}
          >
            <SelectTrigger id="activity">
              <SelectValue placeholder="Sélectionnez un niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sédentaire">Sédentaire (peu ou pas d'exercice)</SelectItem>
              <SelectItem value="léger">Légèrement actif (1-3 jours/semaine)</SelectItem>
              <SelectItem value="modéré">Modérément actif (3-5 jours/semaine)</SelectItem>
              <SelectItem value="actif">Très actif (6-7 jours/semaine)</SelectItem>
              <SelectItem value="très actif">Extrêmement actif (athlètes)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="goal">Objectif</Label>
          <Select 
            value={goal} 
            onValueChange={setGoal}
          >
            <SelectTrigger id="goal">
              <SelectValue placeholder="Sélectionnez un objectif" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="perte">Perte de poids</SelectItem>
              <SelectItem value="maintien">Maintien du poids</SelectItem>
              <SelectItem value="prise">Prise de masse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-natural-500 to-natural-600 hover:from-natural-600 hover:to-natural-700 mt-2"
          onClick={handleCalculate}
        >
          Calculer mes besoins caloriques
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-natural-50 border border-natural-100 rounded-md text-center">
            <p className="text-sm text-muted-foreground mb-1">Vos besoins quotidiens estimés</p>
            <p className="text-2xl font-semibold text-natural-700">{result} calories</p>
          </div>
        )}
      </div>
    </div>
  );
};
