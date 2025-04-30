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
    id: 'insomnia', 
    name: 'Insomnia', 
    icon: <Moon className="h-5 w-5 text-indigo-500" />,
    description: "Insomnia is characterized by difficulties falling asleep or maintaining sleep. It can be caused by various physiological and environmental factors.",
    color: 'text-indigo-500',
    stats: { affected: '1 in 3', avgAge: '32 years' },
    causes: [
      { 
        title: 'Hormonal imbalance', 
        description: 'Reduced melatonin secretion or elevated cortisol in the evening' 
      },
      { 
        title: 'Mineral deficiency', 
        description: 'Insufficient levels of magnesium and calcium' 
      },
      { 
        title: 'Nervous system hyperactivity', 
        description: 'Excessive activity of the sympathetic nervous system' 
      },
      { 
        title: 'Brain inflammation', 
        description: 'Elevated levels of pro-inflammatory cytokines' 
      }
    ],
    pathways: [
      { from: 'Chronic stress', to: 'Elevated evening cortisol', action: 'increases' },
      { from: 'Elevated evening cortisol', to: 'Melatonin production', action: 'disrupts' },
      { from: 'Melatonin production', to: 'Sleep cycle', action: 'regulates' }
    ]
  },
  { 
    id: 'stress', 
    name: 'Chronic stress', 
    icon: <BrainCircuit className="h-5 w-5 text-rose-500" />,
    description: "Chronic stress corresponds to a prolonged activation of the stress response, with negative consequences on physical and mental health.",
    color: 'text-rose-500',
    stats: { affected: '2 in 5', avgAge: '38 years' }
  },
  { 
    id: 'digestion', 
    name: 'Digestive disorders', 
    icon: <Activity className="h-5 w-5 text-amber-500" />,
    description: "Digestive disorders include a set of symptoms affecting the digestive system, such as bloating, abdominal pain, or transit irregularities.",
    color: 'text-amber-500',
    stats: { affected: '1 in 4', avgAge: '35 years' }
  },
  { 
    id: 'inflammation', 
    name: 'Inflammation', 
    icon: <Flame className="h-5 w-5 text-orange-500" />,
    description: "Chronic inflammation is a prolonged immune system response that can damage healthy tissues and contribute to various pathologies.",
    color: 'text-orange-500',
    stats: { affected: '1 in 3', avgAge: '40 years' }
  },
  { 
    id: 'fatigue', 
    name: 'Chronic fatigue', 
    icon: <Coffee className="h-5 w-5 text-cyan-500" />,
    description: "Chronic fatigue is characterized by a persistent feeling of exhaustion that is not relieved by rest and can significantly limit daily activities.",
    color: 'text-cyan-500',
    stats: { affected: '1 in 10', avgAge: '41 years' }
  }
];

export function HealthConditions({ onSelectCondition }: HealthConditionProps) {
  const [activeCondition, setActiveCondition] = useState('insomnia');
  const [activeTab, setActiveTab] = useState('mechanisms');
  
  const handleConditionSelect = (conditionId: string) => {
    setActiveCondition(conditionId);
    onSelectCondition(conditionId);
    toast({
      title: "Condition selected",
      description: `Exploring "${conditions.find(c => c.id === conditionId)?.name}"`,
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
              Explore by condition
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
              <h4 className="text-sm font-medium text-slate-500 mb-3">Quick statistics</h4>
              <div className="space-y-3">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-500">People affected in France</p>
                  <p className="text-xl font-semibold text-indigo-700">{condition.stats.affected}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-500">Average age of onset</p>
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
                  value="mechanisms" 
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Mechanisms
                </TabsTrigger>
                <TabsTrigger 
                  value="solutions"
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
                >
                  <Pill className="h-4 w-4 mr-2" />
                  Solutions
                </TabsTrigger>
                <TabsTrigger 
                  value="studies"
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm" 
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Scientific studies
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mechanisms" className="pt-6 animate-in fade-in-50">
                <div className="mb-8">
                  <h3 className="flex items-center text-indigo-700 mb-4 font-medium">
                    <Zap className="h-4 w-4 mr-2" />
                    Physiological causes
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
                      Physiological pathway
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
                            Animate the process <ArrowRight className="h-3 w-3 ml-1" />
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
                    Recommended natural solutions
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-all">
                      <div className="flex items-center mb-2">
                        <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mr-3">
                          <Pill className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800">Magnesium Bisglycinate</h4>
                          <p className="text-xs text-slate-500">300-400mg per day</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mt-2">Facilitates nervous and muscular relaxation, helps regulate melatonin secretion</p>
                      <Badge variant="pill" className="mt-3">Highly recommended</Badge>
                    </div>
                    
                    <div className="p-4 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-all">
                      <div className="flex items-center mb-2">
                        <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-3">
                          <Pill className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800">Ashwagandha</h4>
                          <p className="text-xs text-slate-500">300-600mg per day</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mt-2">Adaptogen that reduces cortisol and promotes restorative sleep</p>
                      <Badge variant="pill" className="mt-3">Proven effectiveness</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="flex items-center text-indigo-700 mb-4 font-medium">
                      <Heart className="h-4 w-4 mr-2" />
                      Natural Solutions Complete Formula
                    </h3>
                    
                    <Card className="border-indigo-100 bg-gradient-to-r from-indigo-50 to-white">
                      <CardContent className="p-4">
                        <div className="flex items-center mb-4">
                          <div className="h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center text-white mr-4">
                            <Moon className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-medium text-indigo-700">Sleep Recovery Complex</h4>
                            <p className="text-sm text-slate-600">Advanced formula to restore natural and restorative sleep</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-4 mb-6">
                          <div className="bg-white p-2 rounded border border-slate-100 text-center">
                            <p className="text-xs text-slate-500">Time to effect</p>
                            <p className="text-sm font-medium text-indigo-700">2-3 days</p>
                          </div>
                          <div className="bg-white p-2 rounded border border-slate-100 text-center">
                            <p className="text-xs text-slate-500">Satisfaction</p>
                            <p className="text-sm font-medium text-indigo-700">92%</p>
                          </div>
                          <div className="bg-white p-2 rounded border border-slate-100 text-center">
                            <p className="text-xs text-slate-500">Bioavailability</p>
                            <p className="text-sm font-medium text-indigo-700">Optimal</p>
                          </div>
                          <div className="bg-white p-2 rounded border border-slate-100 text-center">
                            <p className="text-xs text-slate-500">Clinical studies</p>
                            <p className="text-sm font-medium text-indigo-700">3</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-center mt-4">
                          <Button variant="purple">
                            Discover this solution
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="studies" className="pt-6 animate-in fade-in-50">
                <div className="space-y-6">
                  <h3 className="flex items-center text-indigo-700 mb-4 font-medium">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Recent scientific studies
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-white border border-slate-200 rounded-lg hover:border-indigo-200 hover:shadow-sm transition-all">
                      <Badge variant="outline" className="mb-2">Journal of Sleep Research</Badge>
                      <h4 className="font-medium text-indigo-700 mb-1">Magnesium supplementation improves sleep quality in adults with insomnia</h4>
                      <p className="text-sm text-slate-600 mb-3">Double-blind, placebo-controlled study showing significant improvement in sleep quality with magnesium supplementation.</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>2023</span>
                        <span>243 participants</span>
                        <span>8 weeks</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white border border-slate-200 rounded-lg hover:border-indigo-200 hover:shadow-sm transition-all">
                      <Badge variant="outline" className="mb-2">Frontiers in Neuroscience</Badge>
                      <h4 className="font-medium text-indigo-700 mb-1">Effects of Ashwagandha on stress and sleep parameters</h4>
                      <p className="text-sm text-slate-600 mb-3">Clinical trial demonstrating significant reduction in cortisol levels and improvement in sleep onset latency.</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>2022</span>
                        <span>125 participants</span>
                        <span>6 weeks</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Button variant="outline" className="gap-2">
                      View all studies
                      <ArrowRight className="h-4 w-4" />
                    </Button>
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
