
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, Moon, BrainCircuit, Flame, Heart, AlertCircle, Coffee, 
  ScrollText, Pill, Activity, Puzzle, ArrowRight
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface HealthConditionProps {
  onSelectCondition: (condition: string) => void;
}

const conditions = [
  { 
    id: 'insomnie', 
    name: 'Insomnie', 
    icon: <Moon className="h-5 w-5 text-indigo-500" />,
    description: "L'insomnie est caractérisée par des difficultés à s'endormir ou à maintenir le sommeil. Elle peut être causée par divers facteurs physiologiques et environnementaux.",
    color: 'text-indigo-500',
    stats: { affected: '1 sur 3', avgAge: '32 ans' },
    causes: [
      { 
        title: 'Déséquilibre hormonal', 
        description: 'Sécrétion réduite de mélatonine ou cortisol élevé le soir' 
      },
      { 
        title: 'Carence en minéraux', 
        description: 'Niveaux insuffisants de magnésium et calcium' 
      },
      { 
        title: 'Hyperactivité du système nerveux', 
        description: 'Activité excessive du système nerveux sympathique' 
      },
      { 
        title: 'Inflammation cérébrale', 
        description: 'Niveaux élevés de cytokines pro-inflammatoires' 
      }
    ],
    pathways: [
      { from: 'Stress chronique', to: 'Cortisol élevé le soir', action: 'augmente' },
      { from: 'Cortisol élevé le soir', to: 'Production de mélatonine', action: 'perturbe' },
      { from: 'Production de mélatonine', to: 'Cycle du sommeil', action: 'régule' }
    ]
  },
  { 
    id: 'stress', 
    name: 'Stress chronique', 
    icon: <BrainCircuit className="h-5 w-5 text-rose-500" />,
    description: "Le stress chronique correspond à une activation prolongée de la réponse au stress, avec des conséquences négatives sur la santé physique et mentale.",
    color: 'text-rose-500',
    stats: { affected: '2 sur 5', avgAge: '38 ans' }
  },
  { 
    id: 'digestion', 
    name: 'Troubles digestifs', 
    icon: <Activity className="h-5 w-5 text-amber-500" />,
    description: "Les troubles digestifs comprennent un ensemble de symptômes affectant le système digestif, comme les ballonnements, les douleurs abdominales ou les irrégularités du transit.",
    color: 'text-amber-500',
    stats: { affected: '1 sur 4', avgAge: '35 ans' }
  },
  { 
    id: 'inflammation', 
    name: 'Inflammation', 
    icon: <Flame className="h-5 w-5 text-orange-500" />,
    description: "L'inflammation chronique est une réponse prolongée du système immunitaire qui peut endommager les tissus sains et contribuer à diverses pathologies.",
    color: 'text-orange-500',
    stats: { affected: '1 sur 3', avgAge: '40 ans' }
  },
  { 
    id: 'fatigue', 
    name: 'Fatigue chronique', 
    icon: <Coffee className="h-5 w-5 text-cyan-500" />,
    description: "La fatigue chronique est caractérisée par une sensation persistante d'épuisement qui n'est pas soulagée par le repos et qui peut limiter considérablement les activités quotidiennes.",
    color: 'text-cyan-500',
    stats: { affected: '1 sur 10', avgAge: '41 ans' }
  }
];

export function HealthConditions({ onSelectCondition }: HealthConditionProps) {
  const [activeCondition, setActiveCondition] = useState('insomnie');
  const [activeTab, setActiveTab] = useState('mecanismes');
  
  const handleConditionSelect = (conditionId: string) => {
    setActiveCondition(conditionId);
    onSelectCondition(conditionId);
    toast({
      title: "Condition sélectionnée",
      description: `Exploration de "${conditions.find(c => c.id === conditionId)?.name}"`,
    });
  };
  
  const condition = conditions.find(c => c.id === activeCondition) || conditions[0];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <Card className="bg-white shadow-sm border-slate-100">
          <CardContent className="p-4">
            <h3 className="text-indigo-700 flex items-center mb-4 font-medium">
              <ScrollText className="h-4 w-4 mr-2" />
              Explorer par condition
            </h3>
            <div className="space-y-2">
              {conditions.map((cond) => (
                <Button
                  key={cond.id}
                  variant={activeCondition === cond.id ? "conditionActive" : "condition"}
                  className="w-full text-left"
                  onClick={() => handleConditionSelect(cond.id)}
                >
                  <span className="mr-3">{cond.icon}</span>
                  <span>{cond.name}</span>
                </Button>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-100">
              <h4 className="text-sm font-medium text-slate-500 mb-3">Statistiques rapides</h4>
              <div className="space-y-3">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-500">Personnes concernées en France</p>
                  <p className="text-xl font-semibold text-indigo-700">{condition.stats.affected}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-500">Âge moyen d'apparition</p>
                  <p className="text-xl font-semibold text-indigo-700">{condition.stats.avgAge}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-3">
        <Card className="bg-white shadow-sm border-slate-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                {condition.icon}
              </div>
              <div>
                <h2 className="text-2xl font-medium text-indigo-700">{condition.name}</h2>
                <p className="text-slate-600">{condition.description}</p>
              </div>
            </div>
            
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="mt-6"
            >
              <TabsList className="bg-slate-50 p-1">
                <TabsTrigger 
                  value="mecanismes" 
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Mécanismes
                </TabsTrigger>
                <TabsTrigger 
                  value="solutions"
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                >
                  <Pill className="h-4 w-4 mr-2" />
                  Solutions
                </TabsTrigger>
                <TabsTrigger 
                  value="etudes"
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm" 
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Études scientifiques
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mecanismes" className="pt-6 animate-in fade-in-50">
                <div className="mb-8">
                  <h3 className="flex items-center text-indigo-700 mb-4 font-medium">
                    <Zap className="h-4 w-4 mr-2" />
                    Causes physiologiques
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {condition.causes && condition.causes.map((cause, index) => (
                      <div key={index} className="p-4 bg-white border border-slate-200 rounded-lg hover:border-indigo-200 hover:shadow-sm transition-all">
                        <h4 className="text-indigo-700 font-medium mb-1">{cause.title}</h4>
                        <p className="text-sm text-slate-600">{cause.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {condition.pathways && (
                  <div>
                    <h3 className="flex items-center text-indigo-700 mb-4 font-medium">
                      <Puzzle className="h-4 w-4 mr-2" />
                      Voie physiologique
                    </h3>
                    
                    <div className="bg-indigo-50 p-6 rounded-lg">
                      <div className="flex flex-col space-y-6">
                        {condition.pathways.map((pathway, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-indigo-100 mb-2 w-full max-w-sm text-center">
                              <span className="font-medium text-indigo-700">{pathway.from}</span>
                            </div>
                            <div className="flex items-center text-indigo-400 py-1">
                              <span className="px-3 py-1 bg-indigo-100 rounded-full text-xs text-indigo-600 mx-2">
                                {pathway.action} ↓
                              </span>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm border border-indigo-100 w-full max-w-sm text-center">
                              <span className="font-medium text-indigo-700">{pathway.to}</span>
                            </div>
                          </div>
                        ))}
                        
                        <div className="flex justify-center mt-4">
                          <Button variant="pill" size="sm" className="text-indigo-600">
                            Animer le processus <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="solutions" className="pt-6 animate-in fade-in-50">
                <div className="space-y-6">
                  <h3 className="flex items-center text-indigo-700 mb-4 font-medium">
                    <Pill className="h-4 w-4 mr-2" />
                    Solutions naturelles recommandées
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-all">
                      <div className="flex items-center mb-2">
                        <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mr-3">
                          <Pill className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800">Magnésium Bisglycinate</h4>
                          <p className="text-xs text-slate-500">300-400mg par jour</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mt-2">Facilite la relaxation nerveuse et musculaire, aide à réguler la sécrétion de mélatonine</p>
                      <Badge variant="pill" className="mt-3">Fortement recommandé</Badge>
                    </div>
                    
                    <div className="p-4 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-all">
                      <div className="flex items-center mb-2">
                        <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-3">
                          <Pill className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800">Ashwagandha</h4>
                          <p className="text-xs text-slate-500">300-600mg par jour</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mt-2">Adaptogène qui réduit le cortisol et favorise un sommeil réparateur</p>
                      <Badge variant="pill" className="mt-3">Efficacité prouvée</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="flex items-center text-indigo-700 mb-4 font-medium">
                      <Heart className="h-4 w-4 mr-2" />
                      Formule complète Natural Solutions
                    </h3>
                    
                    <Card className="border-indigo-100 bg-gradient-to-r from-indigo-50 to-white">
                      <CardContent className="p-4">
                        <div className="flex items-center mb-4">
                          <div className="h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center text-white mr-4">
                            <Moon className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-medium text-indigo-700">Sleep Recovery Complex</h4>
                            <p className="text-sm text-slate-600">Formule avancée pour restaurer un sommeil naturel et réparateur</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-4 mb-6">
                          <div className="bg-white p-2 rounded border border-slate-100 text-center">
                            <p className="text-xs text-slate-500">Délai d'action</p>
                            <p className="text-sm font-medium text-indigo-700">2-3 jours</p>
                          </div>
                          <div className="bg-white p-2 rounded border border-slate-100 text-center">
                            <p className="text-xs text-slate-500">Satisfaction</p>
                            <p className="text-sm font-medium text-indigo-700">92%</p>
                          </div>
                          <div className="bg-white p-2 rounded border border-slate-100 text-center">
                            <p className="text-xs text-slate-500">Biodisponibilité</p>
                            <p className="text-sm font-medium text-indigo-700">Optimale</p>
                          </div>
                          <div className="bg-white p-2 rounded border border-slate-100 text-center">
                            <p className="text-xs text-slate-500">Études cliniques</p>
                            <p className="text-sm font-medium text-indigo-700">3</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-center mt-4">
                          <Button variant="purple">
                            Découvrir cette solution
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="etudes" className="pt-6 animate-in fade-in-50">
                <div className="space-y-6">
                  <h3 className="flex items-center text-indigo-700 mb-4 font-medium">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Études scientifiques récentes
                  </h3>
                  
                  <div className="space-y-4">
                    <Card className="border-slate-200 hover:border-indigo-200 transition-all">
                      <CardContent className="p-4">
                        <Badge variant="indigo" className="mb-2">2023</Badge>
                        <h4 className="font-medium text-slate-800 mb-1">Effets du magnésium et ashwagandha sur les troubles du sommeil</h4>
                        <p className="text-sm text-slate-600 mb-3">Étude clinique randomisée sur 120 participants souffrant d'insomnie légère à modérée</p>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-slate-500">Journal of Sleep Research</p>
                          <Button variant="pill" size="sm" className="text-indigo-600">
                            Voir l'étude
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-slate-200 hover:border-indigo-200 transition-all">
                      <CardContent className="p-4">
                        <Badge variant="indigo" className="mb-2">2022</Badge>
                        <h4 className="font-medium text-slate-800 mb-1">Impact des adaptogènes sur les niveaux de cortisol et la qualité du sommeil</h4>
                        <p className="text-sm text-slate-600 mb-3">Méta-analyse de 15 études cliniques évaluant l'efficacité des adaptogènes</p>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-slate-500">Phytomedicine</p>
                          <Button variant="pill" size="sm" className="text-indigo-600">
                            Voir l'étude
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HealthConditions;
