import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { InfoIcon, Heart, Brain, Dumbbell, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const HealthScore = () => {
  const { toast } = useToast();

  const handleScoreExplanation = () => {
    toast({
      title: "Votre score de santé",
      description: "Ce score est calculé en fonction de vos habitudes quotidiennes, symptômes et mesures biologiques."
    });
  };

  return (
    <Card className="mb-8 border-none shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 p-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-600" />
          Votre score de santé global
        </h3>
      </div>

      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-52 h-52 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * 78) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold">78</span>
                <span className="text-sm text-muted-foreground">sur 100</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-4 flex items-center gap-1"
              onClick={handleScoreExplanation}
            >
              <InfoIcon className="h-4 w-4" />
              Comment ce score est-il calculé?
            </Button>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-rose-500" />
                  <span className="font-medium">Santé cardiaque</span>
                </div>
                <Badge variant="outline" className="bg-rose-50">82/100</Badge>
              </div>
              <Progress value={82} className="h-2 bg-rose-100" indicatorClassName="bg-rose-500" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Santé mentale</span>
                </div>
                <Badge variant="outline" className="bg-blue-50">68/100</Badge>
              </div>
              <Progress value={68} className="h-2 bg-blue-100" indicatorClassName="bg-blue-500" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">Activité physique</span>
                </div>
                <Badge variant="outline" className="bg-amber-50">75/100</Badge>
              </div>
              <Progress value={75} className="h-2 bg-amber-100" indicatorClassName="bg-amber-500" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Nutrition</span>
                </div>
                <Badge variant="outline" className="bg-green-50">86/100</Badge>
              </div>
              <Progress value={86} className="h-2 bg-green-100" indicatorClassName="bg-green-500" />
            </div>

            <Button variant="outline" size="sm" className="mt-2 w-full">
              Voir analyse détaillée
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthScore;