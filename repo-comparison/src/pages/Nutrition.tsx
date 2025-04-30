
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CalorieCalculator } from '@/components/CalorieCalculator';
import { MealPlans } from '@/components/MealPlans';
import { Utensils, Lightbulb, Calendar } from 'lucide-react';

const Nutrition = () => {
  const [calculatedCalories, setCalculatedCalories] = useState<number | null>(null);
  
  const handleCalorieCalculation = (calories: number) => {
    setCalculatedCalories(calories);
    // Faire défiler jusqu'aux plans alimentaires
    document.getElementById('meal-plans')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-natural-50 to-white -z-10"></div>
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 bg-natural-100 text-natural-700 rounded-full text-sm font-medium mb-4">
            Alimentation saine
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-medium mb-6">
            Nutrition Personnalisée
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez des plans alimentaires adaptés à vos objectifs et à vos besoins caloriques
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Calculateur de Calories */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="bg-background rounded-xl border border-border p-6 shadow-sm sticky top-24">
              <CalorieCalculator onCalculate={handleCalorieCalculation} />
            </div>
          </div>

          {/* Plans et Conseils */}
          <div className="md:col-span-7 lg:col-span-8 space-y-10">
            {/* Plans Alimentaires */}
            <section id="meal-plans" className="bg-white rounded-xl border border-border p-8 shadow-sm">
              <MealPlans calculatedCalories={calculatedCalories} />
            </section>

            {/* Conseils Nutritionnels */}
            <section className="bg-white rounded-xl border border-border p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Utensils className="h-6 w-6 text-natural-600" />
                <h2 className="font-display text-2xl font-medium">Conseils Nutritionnels</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Privilégiez les aliments non transformés, riches en nutriments. Buvez au moins 2 litres d'eau par jour et limitez votre consommation de sucres ajoutés.
              </p>
              <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                <li>Augmentez votre consommation de légumes et fruits frais (5 portions par jour)</li>
                <li>Choisissez des protéines maigres comme le poulet, le poisson ou les légumineuses</li>
                <li>Limitez les aliments ultra-transformés et riches en additifs</li>
                <li>Optez pour des céréales complètes plutôt que raffinées</li>
                <li>Hydratez-vous régulièrement tout au long de la journée</li>
              </ul>
            </section>

            {/* Jours de Triche */}
            <section className="bg-white rounded-xl border border-border p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="h-6 w-6 text-natural-600" />
                <h2 className="font-display text-2xl font-medium">Jours de Triche</h2>
              </div>
              <p className="text-muted-foreground">
                Autorisez-vous un repas libre par semaine pour maintenir votre motivation et éviter les frustrations. Cela peut aider à maintenir votre régime sur le long terme.
              </p>
            </section>

            {/* Conseils de la semaine */}
            <section className="bg-natural-50 rounded-xl border border-natural-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="h-6 w-6 text-natural-600" />
                <h2 className="font-display text-2xl font-medium">Conseil de la semaine</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Savez-vous pourquoi les aliments fermentés sont excellents pour votre santé digestive? Les probiotiques qu'ils contiennent favorisent l'équilibre de votre microbiote intestinal.
              </p>
              <p className="text-natural-700 font-medium">
                Essayez d'incorporer du yaourt nature, du kéfir, du kimchi ou de la choucroute dans votre alimentation hebdomadaire.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Nutrition;
