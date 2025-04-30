
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Beaker, Search, Dna, Microscope, 
  ChevronRight, ArrowUpRight, GraduationCap, BookOpen 
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import HeroSection from '@/components/labo/HeroSection';
import HealthConditions from '@/components/labo/HealthConditions';
import NaturalSolutionsCards from '@/components/labo/NaturalSolutionsCards';
import ScientificInsights from '@/components/labo/ScientificInsights';

const LaboSolutions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    // Pour simuler un chargement initial des données
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  // Gérer la recherche
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Logique de recherche supplémentaire si nécessaire
  };

  // Gérer la souscription à la newsletter
  const handleSubscribe = async () => {
    if (!emailInput || !emailInput.includes('@')) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // Simuler une requête d'inscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Inscription réussie!",
        description: "Vous recevrez bientôt nos dernières découvertes et solutions.",
      });
      setEmailInput('');
    } catch (error) {
      toast({
        title: "Erreur lors de l'inscription",
        description: "Veuillez réessayer ultérieurement.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer la sélection d'une condition de santé
  const handleSelectCondition = (condition: string) => {
    console.log(`Condition sélectionnée: ${condition}`);
    // Logique supplémentaire si nécessaire
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection onSearch={handleSearch} />

        {/* Introduction et Explorer par condition */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-16">
              <div className="text-center mb-10">
                <Badge variant="purple" className="mb-3">Notre approche</Badge>
                <h2 className="text-3xl font-medium text-slate-800 mb-4">
                  Solutions scientifiques pour votre bien-être
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Notre laboratoire développe des formules naturelles basées sur la science, rigoureusement testées 
                  et optimisées pour répondre efficacement à vos problématiques de santé.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
                  <div className="w-14 h-14 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <Microscope className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-medium text-slate-800 mb-2">Testé cliniquement</h3>
                  <p className="text-sm text-slate-600">Toutes nos formules sont validées par des études cliniques indépendantes pour garantir leur efficacité</p>
                </div>
                
                <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
                  <div className="w-14 h-14 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <Dna className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-medium text-slate-800 mb-2">Biodisponibilité optimale</h3>
                  <p className="text-sm text-slate-600">Nous utilisons les formes les plus absorbables et les plus efficaces de chaque nutriment</p>
                </div>
                
                <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
                  <div className="w-14 h-14 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <Beaker className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-medium text-slate-800 mb-2">Synergie d'actifs</h3>
                  <p className="text-sm text-slate-600">Nos formules combinent des actifs qui travaillent en synergie pour des résultats optimaux</p>
                </div>
              </div>
            </div>
            
            {/* Exploration par condition */}
            <div className="max-w-6xl mx-auto">
              <HealthConditions onSelectCondition={handleSelectCondition} />
            </div>
          </div>
        </section>

        {/* Nos solutions naturelles */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <NaturalSolutionsCards />
            </div>
          </div>
        </section>
        
        {/* Section études scientifiques */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <ScientificInsights />
            </div>
          </div>
        </section>
        
        {/* Newsletter et FAQ */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Newsletter */}
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl p-8 text-white shadow-lg mb-16">
                <div className="text-center mb-6">
                  <Beaker className="h-10 w-10 mx-auto mb-4 text-indigo-200" />
                  <h3 className="text-2xl font-medium mb-2">Recevez nos dernières découvertes</h3>
                  <p className="text-indigo-100 max-w-lg mx-auto">
                    Inscrivez-vous pour recevoir en avant-première nos publications scientifiques et découvertes en nutrition.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Votre email"
                    className="bg-white/20 text-white placeholder:text-indigo-200 border-indigo-300"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                  <Button 
                    className="bg-white text-indigo-700 hover:bg-indigo-50"
                    onClick={handleSubscribe}
                    disabled={isLoading}
                  >
                    {isLoading ? "Inscription..." : "S'inscrire"}
                  </Button>
                </div>
              </div>
              
              {/* FAQ Section */}
              <div className="text-center mb-10">
                <Badge variant="purple" className="mb-3">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  FAQ
                </Badge>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">Questions fréquentes</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    q: "Comment vos formules sont-elles testées?", 
                    a: "Nos formules subissent des tests en laboratoire indépendant et des études cliniques pour garantir leur efficacité et leur sécurité. Chaque formulation passe par des tests in vitro puis par des essais cliniques sur des volontaires."
                  },
                  { 
                    q: "Quels sont vos critères de sélection des ingrédients?", 
                    a: "Nous sélectionnons uniquement des ingrédients naturels avec une concentration optimale d'actifs, provenant de sources durables et éthiques. Nous privilégions les ingrédients biologiques lorsque c'est possible."
                  },
                  { 
                    q: "Comment garantissez-vous la qualité de vos produits?", 
                    a: "Chaque lot de production est testé pour sa pureté, sa concentration en principes actifs et l'absence de contaminants. Nous utilisons des méthodes analytiques avancées pour contrôler la qualité."
                  }
                ].map((faq, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg p-6 border border-slate-200 hover:border-indigo-200 hover:shadow-sm transition-all"
                    onClick={() => {
                      toast({
                        title: "Réponse déployée",
                        description: "Consultez la réponse à votre question."
                      });
                    }}
                  >
                    <h3 className="font-medium text-slate-800 mb-3 flex items-center">
                      <BookOpen className="h-5 w-5 text-indigo-500 mr-3" />
                      {faq.q}
                    </h3>
                    <p className="text-slate-600 pl-8">{faq.a}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button variant="purple">
                  Voir toutes les questions
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTIuNWEuNS41IDAgMDAtLjUtLjVoLTd2LTJoLTV2Mmgtd2EuNS41IDAgMDAtLjUuNVYyOGgydi02aDE0djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
          
          {/* Cercles décoratifs */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20">
                Solutions prouvées
              </Badge>
              <h2 className="text-3xl md:text-4xl font-medium mb-4">
                Des compléments qui font vraiment la différence
              </h2>
              <p className="text-indigo-100 mb-8">
                Découvrez nos formules scientifiquement validées pour répondre à vos besoins spécifiques en matière de santé et de bien-être.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50">
                  Découvrir nos solutions
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/40 hover:bg-white/10">
                  Consulter nos études
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LaboSolutions;
