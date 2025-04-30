import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flask } from '@/components/ui/icons';
import { 
  Microscope, 
  Beaker, 
  BookOpen, 
  Users, 
  Award, 
  FileText, 
  ChevronRight,
  GraduationCap,
  Dna
} from "lucide-react";
import ScientificMethodology from "@/components/ScientificMethodology";
import ScientificTeam from "@/components/ScientificTeam";
import ScientificPublications from "@/components/ScientificPublications";

const NosRecherches = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white overflow-hidden">
        {/* Arrière-plan scientifique animé */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M36 34h-2v-4h2v4zm0-6h-2v-4h2v4zm0-6h-2v-4h2v4zm0-6h-2v-4h2v4zm0-6h-2v-4h2v4zm0-6h-2v-4h2v4z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '16px 16px'
        }}></div>

        {/* Effets visuels scientifiques */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse delay-300"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-white/20 rounded-full backdrop-blur-sm mb-6 shadow-xl">
              <Microscope className="h-5 w-5 text-white mr-2" />
              <span className="text-white text-sm font-medium">Laboratoire Indépendant</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Notre Expertise Scientifique
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Découvrez les recherches, les méthodes et l'équipe derrière nos recommandations nutritionnelles validées scientifiquement.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Button 
                size="lg"
                className="bg-white text-indigo-700 hover:bg-indigo-50"
                asChild
              >
                <a href="#methodologie">
                  Découvrir notre méthodologie
                </a>
              </Button>

              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/20"
                asChild
              >
                <Link to="/quiz">
                  Faire le test personnalisé
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white flex items-center shadow-lg">
                <Award className="h-5 w-5 mr-2 text-amber-300" />
                <span className="text-sm">3 brevets déposés</span>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white flex items-center shadow-lg">
                <FileText className="h-5 w-5 mr-2 text-amber-300" />
                <span className="text-sm">12 publications scientifiques</span>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white flex items-center shadow-lg">
                <Users className="h-5 w-5 mr-2 text-amber-300" />
                <span className="text-sm">1200+ participants aux études</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation par onglets */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="laboratoire" className="w-full">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-slate-100 p-1 w-full max-w-4xl mx-auto">
              <TabsTrigger value="laboratoire" className="flex items-center">
                <Beaker className="h-4 w-4 mr-2" />
                <span>Notre Laboratoire</span>
              </TabsTrigger>
              <TabsTrigger value="methodologie" className="flex items-center">
                <Microscope className="h-4 w-4 mr-2" />
                <span>Méthodologie</span>
              </TabsTrigger>
              <TabsTrigger value="equipe" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>Équipe Scientifique</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="laboratoire" className="pt-8">
              <div id="laboratoire" className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <Badge variant="indigo" className="mb-2">
                    <Flask className="h-3 w-3 mr-1" /> 
                    Infrastructure
                  </Badge>
                  <h2 className="text-3xl font-bold text-slate-800 mb-4">Notre Laboratoire</h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Un environnement de recherche de pointe dédié à l'analyse des solutions naturelles pour la santé.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-medium text-slate-800">Installations de haute technologie</h3>
                    <p className="text-slate-600">
                      Notre laboratoire principal, situé en France, est équipé des technologies les plus avancées pour l'analyse 
                      des composés actifs naturels et leur impact sur la santé humaine.
                    </p>
                    <p className="text-slate-600">
                      Nos équipements comprennent des spectromètres de masse de dernière génération, des systèmes 
                      chromatographiques haute performance et des analyseurs biochimiques permettant des 
                      analyses précises des micronutriments et de leurs effets.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Badge variant="outline" className="bg-natural-50">Spectrométrie de masse</Badge>
                      <Badge variant="outline" className="bg-natural-50">Chromatographie HPLC</Badge>
                      <Badge variant="outline" className="bg-natural-50">Analyse biochimique</Badge>
                      <Badge variant="outline" className="bg-natural-50">Tests d'absorption</Badge>
                    </div>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=600&h=400" 
                      alt="Laboratoire Natural Pure" 
                      className="rounded-lg shadow-lg object-cover"
                    />
                    <div className="absolute -bottom-4 -right-4 p-2 bg-white shadow-md rounded">
                      <img 
                        src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=200&h=150"
                        alt="Équipement d'analyse"
                        className="rounded"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-md p-6 border border-indigo-100">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                      <Award className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-medium text-slate-800 mb-2">Certifications</h3>
                    <p className="text-slate-600 mb-4">
                      Notre laboratoire est certifié selon les normes ISO 9001 et ISO 17025, garantissant des procédures 
                      de qualité et la fiabilité de nos analyses.
                    </p>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>ISO 9001:2015 - Management de la qualité</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>ISO 17025 - Compétences des laboratoires</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>BPL - Bonnes Pratiques de Laboratoire</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-md p-6 border border-indigo-100">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                      <GraduationCap className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-medium text-slate-800 mb-2">Partenariats académiques</h3>
                    <p className="text-slate-600 mb-4">
                      Nous collaborons avec plusieurs universités et instituts de recherche pour enrichir 
                      notre expertise et participer à l'avancement des connaissances.
                    </p>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>Université de Lyon - Département Nutrition</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>Institut Pasteur - Microbiome intestinal</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>INSERM - Étude des biomarqueurs</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-md p-6 border border-indigo-100">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                      <Dna className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-medium text-slate-800 mb-2">Domaines de recherche</h3>
                    <p className="text-slate-600 mb-4">
                      Nos recherches se concentrent sur plusieurs domaines clés de la nutrition et de la santé naturelle 
                      pour des applications concrètes.
                    </p>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>Biodisponibilité des micronutriments</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>Impact du microbiome sur l'immunité</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>Modulation naturelle du stress oxydatif</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-2xl p-8 mb-12">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-medium text-slate-800 mb-2">Notre histoire</h3>
                    <p className="text-slate-600 max-w-3xl mx-auto">
                      De la vision initiale à notre réseau actuel de recherche, découvrez comment notre laboratoire 
                      s'est développé pour devenir une référence en nutrition scientifique.
                    </p>
                  </div>

                  <div className="relative">
                    {/* Timeline */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                      {/* 2015 */}
                      <div className="md:text-right md:pr-8">
                        <div className="bg-white p-5 rounded-lg shadow-md inline-block">
                          <h4 className="text-lg font-medium text-indigo-700 mb-1">2015</h4>
                          <h5 className="text-slate-800 font-medium mb-2">Fondation du laboratoire</h5>
                          <p className="text-slate-600 text-sm">
                            Création de Natural Pure par Dr. Marie Dubois après 10 ans de recherche universitaire en nutrition.
                          </p>
                        </div>
                      </div>
                      <div className="md:pl-8 hidden md:block"></div>

                      {/* 2017 */}
                      <div className="md:text-right md:pr-8 hidden md:block"></div>
                      <div className="md:pl-8">
                        <div className="bg-white p-5 rounded-lg shadow-md inline-block">
                          <h4 className="text-lg font-medium text-indigo-700 mb-1">2017</h4>
                          <h5 className="text-slate-800 font-medium mb-2">Première étude clinique</h5>
                          <p className="text-slate-600 text-sm">
                            Lancement de notre première étude sur l'impact des antioxydants naturels sur le stress oxydatif.
                          </p>
                        </div>
                      </div>

                      {/* 2019 */}
                      <div className="md:text-right md:pr-8">
                        <div className="bg-white p-5 rounded-lg shadow-md inline-block">
                          <h4 className="text-lg font-medium text-indigo-700 mb-1">2019</h4>
                          <h5 className="text-slate-800 font-medium mb-2">Publication majeure</h5>
                          <p className="text-slate-600 text-sm">
                            Notre étude sur l'absorption du magnésium est publiée dans le Journal of Nutritional Biochemistry.
                          </p>
                        </div>
                      </div>
                      <div className="md:pl-8 hidden md:block"></div>

                      {/* 2021 */}
                      <div className="md:text-right md:pr-8 hidden md:block"></div>
                      <div className="md:pl-8">
                        <div className="bg-white p-5 rounded-lg shadow-md inline-block">
                          <h4 className="text-lg font-medium text-indigo-700 mb-1">2021</h4>
                          <h5 className="text-slate-800 font-medium mb-2">Expansion des installations</h5>
                          <p className="text-slate-600 text-sm">
                            Agrandissement du laboratoire et acquisition d'équipements de pointe pour l'analyse du microbiome.
                          </p>
                        </div>
                      </div>

                      {/* 2023 */}
                      <div className="md:text-right md:pr-8">
                        <div className="bg-white p-5 rounded-lg shadow-md inline-block">
                          <h4 className="text-lg font-medium text-indigo-700 mb-1">2023</h4>
                          <h5 className="text-slate-800 font-medium mb-2">Lancement du quiz scientifique</h5>
                          <p className="text-slate-600 text-sm">
                            Développement d'un algorithme basé sur nos recherches pour des recommandations personnalisées.
                          </p>
                        </div>
                      </div>
                      <div className="md:pl-8 hidden md:block"></div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    asChild
                  >
                    <Link to="/publications">
                      Découvrir nos publications scientifiques
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="methodologie" className="pt-8">
              <div id="methodologie">
                <ScientificMethodology />
              </div>
            </TabsContent>

            <TabsContent value="equipe" className="pt-8">
              <div id="equipe">
                <ScientificTeam />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Publications récentes */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <ScientificPublications limit={3} showCta={true} />
        </div>
      </section>

      {/* CTA Quiz */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '16px 16px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Découvrez vos besoins nutritionnels personnalisés
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Notre quiz scientifique, basé sur nos recherches en laboratoire, analyse votre profil pour vous 
              proposer des recommandations adaptées à vos besoins spécifiques.
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <h3 className="text-2xl font-bold mb-1">3 min</h3>
                  <p className="text-white/80 text-sm">Temps nécessaire</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">98%</h3>
                  <p className="text-white/80 text-sm">Taux de satisfaction</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">1200+</h3>
                  <p className="text-white/80 text-sm">Profils analysés</p>
                </div>
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg pulse-animation"
              asChild
            >
              <Link to="/quiz">
                Faire le test personnalisé
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes pulse-animation {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }

        .pulse-animation {
          animation: pulse-animation 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default NosRecherches;