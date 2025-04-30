
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
    // Scroll to the meal plans
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
            Healthy Eating
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-medium mb-6">
            Personalized Nutrition
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover meal plans tailored to your goals and caloric needs
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Calorie Calculator */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="bg-background rounded-xl border border-border p-6 shadow-sm sticky top-24">
              <CalorieCalculator onCalculate={handleCalorieCalculation} />
            </div>
          </div>

          {/* Plans and Advice */}
          <div className="md:col-span-7 lg:col-span-8 space-y-10">
            {/* Meal Plans */}
            <section id="meal-plans" className="bg-white rounded-xl border border-border p-8 shadow-sm">
              <MealPlans calculatedCalories={calculatedCalories} />
            </section>

            {/* Nutritional Advice */}
            <section className="bg-white rounded-xl border border-border p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Utensils className="h-6 w-6 text-natural-600" />
                <h2 className="font-display text-2xl font-medium">Nutritional Advice</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Prioritize unprocessed, nutrient-rich foods. Drink at least 2 liters of water daily and limit your consumption of added sugars.
              </p>
              <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                <li>Increase your consumption of fresh vegetables and fruits (5 servings per day)</li>
                <li>Choose lean proteins such as chicken, fish, or legumes</li>
                <li>Limit ultra-processed foods high in additives</li>
                <li>Opt for whole grains rather than refined ones</li>
                <li>Stay hydrated throughout the day</li>
              </ul>
            </section>

            {/* Cheat Days */}
            <section className="bg-white rounded-xl border border-border p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="h-6 w-6 text-natural-600" />
                <h2 className="font-display text-2xl font-medium">Cheat Days</h2>
              </div>
              <p className="text-muted-foreground">
                Allow yourself one free meal per week to maintain your motivation and avoid frustrations. This can help maintain your diet in the long term.
              </p>
            </section>

            {/* Weekly Tip */}
            <section className="bg-natural-50 rounded-xl border border-natural-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="h-6 w-6 text-natural-600" />
                <h2 className="font-display text-2xl font-medium">Tip of the Week</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Do you know why fermented foods are excellent for your digestive health? The probiotics they contain promote the balance of your gut microbiome.
              </p>
              <p className="text-natural-700 font-medium">
                Try incorporating plain yogurt, kefir, kimchi, or sauerkraut into your weekly diet.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export { Nutrition };
export default Nutrition;
