
import React, { useState, useEffect } from 'react';
import { Utensils, Scale, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface MealPlansProps {
  calculatedCalories: number | null;
}

export const MealPlans = ({ calculatedCalories }: MealPlansProps) => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string>('perte');

  const dietTypes = [
    { id: 'perte', label: 'Perte de Poids', icon: <Scale className="h-5 w-5" /> },
    { id: 'masse', label: 'Prise de Masse', icon: <Plus className="h-5 w-5" /> },
    { id: 'maintien', label: 'Maintien', icon: <Utensils className="h-5 w-5" /> },
  ];

  const handleDownloadPlan = () => {
    toast({
      title: "Plan alimentaire",
      description: "Votre plan va être téléchargé au format PDF.",
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Utensils className="h-6 w-6 text-natural-600" />
        <h2 className="font-display text-2xl font-medium">Plans Alimentaires</h2>
      </div>

      <p className="text-muted-foreground mb-8">
        Calculez vos besoins caloriques pour obtenir des plans alimentaires personnalisés
      </p>

      {/* Sélection du type de régime */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {dietTypes.map((diet) => (
          <Button
            key={diet.id}
            variant="outline"
            className={cn(
              "h-auto flex-col py-4 border-border",
              selectedPlan === diet.id && "bg-natural-50 border-natural-200"
            )}
            onClick={() => setSelectedPlan(diet.id)}
          >
            <div className="w-10 h-10 rounded-full bg-natural-100 flex items-center justify-center mb-2 text-natural-700">
              {diet.icon}
            </div>
            <span className="text-foreground">{diet.label}</span>
          </Button>
        ))}
      </div>

      {/* Affichage du plan ou demande de calcul */}
      {!calculatedCalories ? (
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <div className="flex items-center justify-center text-muted-foreground mb-4">
            <Scale className="h-8 w-8 mr-2" />
          </div>
          <h3 className="text-lg font-medium mb-2">Calcul requis</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Pour obtenir un plan alimentaire personnalisé, veuillez d'abord calculer vos besoins caloriques quotidiens.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-natural-50 border border-natural-100 rounded-lg p-4 text-center mb-6">
            <p className="text-natural-700 mb-1">Plan alimentaire basé sur</p>
            <p className="text-2xl font-semibold">{calculatedCalories} calories / jour</p>
          </div>

          <div className="space-y-6">
            {/* Exemple de plan pour la journée */}
            {['Petit-déjeuner', 'Collation', 'Déjeuner', 'Goûter', 'Dîner'].map((meal, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-0">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{meal}</h4>
                  <Badge variant="outline" className="bg-natural-50">
                    {selectedPlan === 'perte' 
                      ? Math.round(calculatedCalories * [0.25, 0.1, 0.35, 0.1, 0.2][index]) 
                      : selectedPlan === 'masse'
                        ? Math.round(calculatedCalories * [0.2, 0.15, 0.3, 0.15, 0.2][index])
                        : Math.round(calculatedCalories * [0.25, 0.1, 0.3, 0.1, 0.25][index])
                    } cal
                  </Badge>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {selectedPlan === 'perte' && (
                    meal === 'Petit-déjeuner' ? (
                      <>
                        <li>Omelette aux blancs d'œufs et légumes</li>
                        <li>1 tranche de pain complet</li>
                        <li>Thé vert sans sucre</li>
                      </>
                    ) : meal === 'Déjeuner' ? (
                      <>
                        <li>Salade de poulet grillé et quinoa</li>
                        <li>Légumes vapeur assaisonnés au citron</li>
                        <li>1 fruit de saison</li>
                      </>
                    ) : meal === 'Dîner' ? (
                      <>
                        <li>Poisson au four avec herbes</li>
                        <li>Purée de patate douce</li>
                        <li>Légumes verts</li>
                      </>
                    ) : (
                      <>
                        <li>Yaourt grec nature</li>
                        <li>Quelques amandes</li>
                      </>
                    )
                  )}
                  {selectedPlan === 'masse' && (
                    meal === 'Petit-déjeuner' ? (
                      <>
                        <li>Smoothie protéiné aux fruits rouges</li>
                        <li>Porridge d'avoine aux fruits secs</li>
                        <li>2 œufs entiers</li>
                      </>
                    ) : meal === 'Déjeuner' ? (
                      <>
                        <li>Poulet grillé (200g)</li>
                        <li>Riz complet (100g cuit)</li>
                        <li>Légumes sautés à l'huile d'olive</li>
                      </>
                    ) : meal === 'Dîner' ? (
                      <>
                        <li>Steak de bœuf maigre</li>
                        <li>Patates douces rôties</li>
                        <li>Salade d'avocat</li>
                      </>
                    ) : (
                      <>
                        <li>Fromage blanc</li>
                        <li>Mélange de noix et fruits secs</li>
                        <li>1 banane</li>
                      </>
                    )
                  )}
                  {selectedPlan === 'maintien' && (
                    meal === 'Petit-déjeuner' ? (
                      <>
                        <li>Bol de céréales complètes au lait végétal</li>
                        <li>1 fruit frais</li>
                        <li>Café ou thé</li>
                      </>
                    ) : meal === 'Déjeuner' ? (
                      <>
                        <li>Wrap au saumon fumé et avocat</li>
                        <li>Salade verte</li>
                        <li>Yaourt nature</li>
                      </>
                    ) : meal === 'Dîner' ? (
                      <>
                        <li>Tofu sauté aux légumes</li>
                        <li>Quinoa</li>
                        <li>Soupe de légumes</li>
                      </>
                    ) : (
                      <>
                        <li>Compote sans sucre ajouté</li>
                        <li>Une poignée d'oléagineux</li>
                      </>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>

          <Button 
            className="w-full mt-4 bg-gradient-to-r from-natural-500 to-natural-600 hover:from-natural-600 hover:to-natural-700"
            onClick={handleDownloadPlan}
          >
            Télécharger ce plan alimentaire (PDF)
          </Button>
          
          <p className="text-sm text-muted-foreground text-center mt-2">
            Les plans sont personnalisés selon vos besoins calculés et votre objectif.
          </p>
        </div>
      )}
    </div>
  );
};
