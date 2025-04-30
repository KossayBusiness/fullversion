
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, FileText, Beaker, Calculator, ArrowRight, 
  ChevronDown, Users, Award, Microscope, PieChart, Clock
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

// Données d'études scientifiques
const studies = [
  {
    id: 1,
    title: "Efficacité du magnésium bisglycinate sur la qualité du sommeil",
    authors: "Martin et al.",
    year: 2023,
    journal: "Journal of Sleep Research",
    participants: 120,
    duration: "8 semaines",
    findings: [
      "Amélioration significative du PSQI (Pittsburgh Sleep Quality Index)",
      "Réduction du temps d'endormissement de 25 minutes en moyenne",
      "Augmentation de 18% de la durée de sommeil profond"
    ],
    efficacy: 87
  },
  {
    id: 2,
    title: "Impact des adaptogènes sur les marqueurs biologiques du stress",
    authors: "Dubois et al.",
    year: 2022,
    journal: "Phytomedicine",
    participants: 85,
    duration: "12 semaines",
    findings: [
      "Réduction moyenne de 23% du cortisol salivaire matinal",
      "Amélioration significative des scores d'anxiété (STAI)",
      "Augmentation des niveaux de DHEA-S"
    ],
    efficacy: 82
  },
  {
    id: 3,
    title: "Synergies entre micronutriments et phytonutriments pour la fonction cognitive",
    authors: "Chen et al.",
    year: 2023,
    journal: "Nutrients",
    participants: 105,
    duration: "16 semaines",
    findings: [
      "Amélioration de 14% des scores de mémoire de travail",
      "Réduction du stress oxydatif cérébral",
      "Effets potentialisés avec la combinaison vs. composants isolés"
    ],
    efficacy: 91
  }
];

// Données de recherche et développement
const researchTopics = [
  {
    title: "Biodisponibilité des nutriments",
    progress: 85,
    description: "Optimisation des formes chimiques et des systèmes de livraison pour maximiser l'absorption des composés actifs",
    icon: <Beaker className="h-5 w-5 text-indigo-500" />
  },
  {
    title: "Synergies entre composés actifs",
    progress: 72,
    description: "Étude des interactions positives entre nutriments et phytonutriments pour des effets potentialisés",
    icon: <PieChart className="h-5 w-5 text-teal-500" />
  },
  {
    title: "Approches chronobiologiques",
    progress: 68,
    description: "Développement de formulations adaptées aux rythmes circadiens pour une efficacité optimale",
    icon: <Clock className="h-5 w-5 text-amber-500" />
  }
];

export function ScientificInsights() {
  const [activeStudy, setActiveStudy] = useState(studies[0]);
  
  const handleViewStudy = (study) => {
    setActiveStudy(study);
    toast({
      title: "Étude sélectionnée",
      description: `Consultation des détails de l'étude: "${study.title}"`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Badge variant="indigo" className="mb-2">
          <BookOpen className="h-3 w-3 mr-1" />
          Base scientifique
        </Badge>
        <h2 className="text-2xl font-medium text-slate-800 mb-2">Recherche et innovation</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Découvrez les études scientifiques et les avancées de recherche qui soutiennent nos formulations
        </p>
      </div>
      
      <Tabs defaultValue="etudes" className="space-y-6">
        <TabsList className="bg-slate-50 p-1 flex justify-center">
          <TabsTrigger 
            value="etudes" 
            className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
          >
            <Microscope className="h-4 w-4 mr-2" />
            Études cliniques
          </TabsTrigger>
          <TabsTrigger 
            value="recherche"
            className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm"
          >
            <Beaker className="h-4 w-4 mr-2" />
            R&D en cours
          </TabsTrigger>
          <TabsTrigger 
            value="publications"
            className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm" 
          >
            <FileText className="h-4 w-4 mr-2" />
            Publications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="etudes" className="animate-in fade-in-50">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="space-y-3">
                {studies.map((study) => (
                  <Card 
                    key={study.id} 
                    className={`border-slate-200 hover:border-indigo-200 transition-all cursor-pointer ${activeStudy.id === study.id ? 'border-indigo-300 bg-indigo-50' : 'bg-white'}`}
                    onClick={() => handleViewStudy(study)}
                  >
                    <CardContent className="p-4">
                      <Badge variant="pill" className="mb-2">{study.year}</Badge>
                      <h3 className="font-medium text-slate-800 line-clamp-2 mb-1">{study.title}</h3>
                      <p className="text-xs text-slate-500 mb-2">{study.authors} • {study.journal}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="h-3 w-3 text-slate-400 mr-1" />
                          <span className="text-xs text-slate-600">{study.participants}</span>
                        </div>
                        <div>
                          <Badge variant="pill" className="bg-indigo-100 text-indigo-700">
                            {study.efficacy}% efficacité
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <Card className="border-indigo-200 bg-gradient-to-br from-white to-indigo-50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Badge variant="indigo" className="mb-2">{activeStudy.year}</Badge>
                      <h3 className="text-xl font-medium text-slate-800 mb-1">{activeStudy.title}</h3>
                      <p className="text-sm text-slate-600">{activeStudy.authors} • {activeStudy.journal}</p>
                    </div>
                    <Award className="h-10 w-10 text-indigo-400" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 my-5">
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">Participants</p>
                      <p className="text-lg font-medium text-indigo-700 flex items-center">
                        <Users className="h-4 w-4 mr-2 text-indigo-500" />
                        {activeStudy.participants}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">Durée</p>
                      <p className="text-lg font-medium text-indigo-700 flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                        {activeStudy.duration}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-slate-200 mb-5">
                    <h4 className="text-sm font-medium text-slate-800 mb-3">Principales découvertes</h4>
                    <ul className="space-y-2">
                      {activeStudy.findings.map((finding, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mr-3 mt-0.5">✓</div>
                          <span className="text-sm text-slate-700">{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-slate-600 mb-2">Efficacité globale</p>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-xl font-medium text-indigo-700">{activeStudy.efficacy}%</span>
                      <div className="w-40">
                        <Progress value={activeStudy.efficacy} className="h-2.5" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Button variant="purple" size="sm">
                      Accéder à l'étude complète
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="recherche" className="animate-in fade-in-50">
          <div className="grid md:grid-cols-3 gap-6">
            {researchTopics.map((topic, index) => (
              <Card key={index} className="border-slate-200 bg-white hover:border-indigo-200 hover:shadow-sm transition-all">
                <CardContent className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      {topic.icon}
                    </div>
                    <h3 className="font-medium text-slate-800">{topic.title}</h3>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4">{topic.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Avancement</span>
                      <span className="text-xs font-medium text-indigo-700">{topic.progress}%</span>
                    </div>
                    <Progress value={topic.progress} className="h-2" />
                  </div>
                  
                  <Button variant="pill" size="sm" className="mt-4 w-full">
                    <Beaker className="h-3 w-3 mr-1" />
                    En savoir plus
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <Card className="border-indigo-200 bg-indigo-50 p-5 max-w-2xl">
              <div className="flex items-start">
                <div className="mr-4">
                  <Award className="h-12 w-12 text-indigo-500" />
                </div>
                <div>
                  <h3 className="font-medium text-indigo-700 mb-2">Collaborations académiques</h3>
                  <p className="text-sm text-slate-700 mb-3">
                    Notre laboratoire travaille en partenariat avec des institutions de recherche renommées pour faire avancer la science de la nutrition et de la santé naturelle.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="purple">Université Paris-Saclay</Badge>
                    <Badge variant="purple">INSERM</Badge>
                    <Badge variant="purple">Institut Pasteur</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="publications" className="animate-in fade-in-50">
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="border-slate-200 hover:border-indigo-200 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start">
                    <div className="mr-4 hidden md:block">
                      <div className="h-14 w-14 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <Badge variant="pill" className="mb-2">2023</Badge>
                      <h3 className="font-medium text-slate-800 mb-1">Synergies entre composés bioactifs des adaptogènes: une analyse systématique</h3>
                      <p className="text-sm text-slate-600 mb-2">Cette revue examine les mécanismes d'action synergiques entre différents composés bioactifs présents dans les plantes adaptogènes, avec un focus particulier sur leur impact sur l'axe HPA et la régulation du stress.</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-slate-500">Journal of Ethnopharmacology • Vol. 152, pp. 28-43</p>
                        </div>
                        <Button variant="pill" size="sm" className="text-indigo-600">
                          Lire l'article
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <Button variant="outline" className="border-slate-200 group">
              <span>Voir toutes les publications</span>
              <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ScientificInsights;
