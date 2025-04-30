
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, Brain, ArrowRight, Award, BarChart3, 
  Shield, Clock, Activity, ThumbsUp, Leaf, HeartPulse
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const solutions = [
  {
    id: 1,
    name: "Sleep Recovery Complex",
    description: "Formule complète pour restaurer un sommeil profond et réparateur",
    image: "/lovable-uploads/181492cf-3c62-402e-b203-ee4b362e5d6c.png",
    icon: <Clock className="h-6 w-6 text-indigo-500" />,
    benefits: ["Endormissement facilité", "Sommeil profond", "Réduction du stress nocturne"],
    efficacy: 92,
    color: "bg-indigo-600",
    tag: "Sommeil"
  },
  {
    id: 2,
    name: "Neuro Focus",
    description: "Soutien cognitif pour la concentration et la clarté mentale",
    image: "/placeholder.svg",
    icon: <Brain className="h-6 w-6 text-teal-500" />,
    benefits: ["Concentration améliorée", "Mémoire de travail", "Énergie mentale"],
    efficacy: 89,
    color: "bg-teal-600",
    tag: "Cognition"
  },
  {
    id: 3,
    name: "Immunité Plus",
    description: "Renforce les défenses naturelles et la résilience immunitaire",
    image: "/placeholder.svg",
    icon: <Shield className="h-6 w-6 text-amber-500" />,
    benefits: ["Protection cellulaire", "Activité immunitaire", "Réponse antivirale"],
    efficacy: 94,
    color: "bg-amber-600",
    tag: "Immunité"
  },
  {
    id: 4,
    name: "Vitalité Hormone",
    description: "Équilibre hormonal et soutien des fonctions vitales",
    image: "/placeholder.svg",
    icon: <Activity className="h-6 w-6 text-rose-500" />,
    benefits: ["Équilibre hormonal", "Énergie durable", "Anti-âge"],
    efficacy: 87,
    color: "bg-rose-600",
    tag: "Hormones"
  }
];

export function NaturalSolutionsCards() {
  const handleViewSolution = (solutionId: number) => {
    toast({
      title: "Solution sélectionnée",
      description: `Vous consultez les détails de "${solutions.find(s => s.id === solutionId)?.name}"`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Badge variant="purple" className="mb-2">
          <Award className="h-3 w-3 mr-1" />
          Solutions scientifiques
        </Badge>
        <h2 className="text-2xl font-medium text-slate-800 mb-2">Nos formules ciblées</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Des solutions naturelles développées par notre équipe scientifique pour répondre aux problématiques de santé les plus courantes
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {solutions.map((solution) => (
          <Card key={solution.id} className="border-slate-200 bg-white hover:shadow-md hover:border-indigo-200 transition-all overflow-hidden">
            <div className={`h-2 w-full ${solution.color}`}></div>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="pill" className="bg-slate-100">
                  {solution.tag}
                </Badge>
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-medium ml-1">{solution.efficacy}%</span>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white mr-3 ${solution.color}`}>
                  {solution.icon}
                </div>
                <h3 className="font-medium text-slate-800">{solution.name}</h3>
              </div>
              
              <p className="text-sm text-slate-600 mb-4">{solution.description}</p>
              
              <div className="space-y-2 mb-5">
                {solution.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <Leaf className="h-3 w-3 text-green-500 mr-2" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full justify-between border-slate-200 hover:border-indigo-200 hover:text-indigo-600 group"
                onClick={() => handleViewSolution(solution.id)}
              >
                <span>Découvrir</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button variant="purple" size="lg" className="mt-6">
          <HeartPulse className="mr-2 h-5 w-5" />
          Voir toutes nos solutions
        </Button>
      </div>
    </div>
  );
}

export default NaturalSolutionsCards;
