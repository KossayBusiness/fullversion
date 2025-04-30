import React from "react";
import { Helmet } from "react-helmet-async";
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

const OurResearch = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>Our Research | Natural Pure Academy</title>
        <meta name="description" content="Explore the scientific research and methodology behind Natural Pure Academy's nutritional recommendations." />
        <meta name="keywords" content="scientific research, nutrition science, methodology, health studies, natural supplements" />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white overflow-hidden">
        {/* Scientific animated background */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M36 34h-2v-4h2v4zm0-6h-2v-4h2v4zm0-6h-2v-4h2v4zm0-6h-2v-4h2v4zm0-6h-2v-4h2v4zm0-6h-2v-4h2v4z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '16px 16px'
        }}></div>

        {/* Scientific visual effects */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse delay-300"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-white/20 rounded-full backdrop-blur-sm mb-6 shadow-xl">
              <Microscope className="h-5 w-5 text-white mr-2" />
              <span className="text-white text-sm font-medium">Independent Laboratory</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Our Scientific Expertise
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Discover the research, methods, and team behind our scientifically validated nutritional recommendations.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Button 
                size="lg"
                className="bg-white text-indigo-700 hover:bg-indigo-50"
                asChild
              >
                <a href="#methodologie">
                  Discover our methodology
                </a>
              </Button>

              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/20"
                asChild
              >
                <Link to="/quiz">
                  Take the personalized test
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white flex items-center shadow-lg">
                <Award className="h-5 w-5 mr-2 text-amber-300" />
                <span className="text-sm">3 filed patents</span>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white flex items-center shadow-lg">
                <FileText className="h-5 w-5 mr-2 text-amber-300" />
                <span className="text-sm">12 scientific publications</span>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white flex items-center shadow-lg">
                <Users className="h-5 w-5 mr-2 text-amber-300" />
                <span className="text-sm">1200+ study participants</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="laboratoire" className="w-full">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-slate-100 p-1 w-full max-w-4xl mx-auto">
              <TabsTrigger value="laboratoire" className="flex items-center">
                <Beaker className="h-4 w-4 mr-2" />
                <span>Our Laboratory</span>
              </TabsTrigger>
              <TabsTrigger value="methodologie" className="flex items-center">
                <Microscope className="h-4 w-4 mr-2" />
                <span>Methodology</span>
              </TabsTrigger>
              <TabsTrigger value="equipe" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>Scientific Team</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="laboratoire" className="pt-8">
              <div id="laboratoire" className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <Badge variant="indigo" className="mb-2">
                    <Flask className="h-3 w-3 mr-1" /> 
                    Infrastructure
                  </Badge>
                  <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Laboratory</h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    A cutting-edge research environment dedicated to analyzing natural solutions for health.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-medium text-slate-800">High-Tech Facilities</h3>
                    <p className="text-slate-600">
                      Our main laboratory, located in France, is equipped with the most advanced technologies for analyzing 
                      natural active compounds and their impact on human health.
                    </p>
                    <p className="text-slate-600">
                      Our equipment includes state-of-the-art mass spectrometers, high-performance chromatographic systems, 
                      and biochemical analyzers enabling precise analyses of micronutrients and their effects.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Badge variant="outline" className="bg-natural-50">Mass Spectrometry</Badge>
                      <Badge variant="outline" className="bg-natural-50">HPLC Chromatography</Badge>
                      <Badge variant="outline" className="bg-natural-50">Biochemical Analysis</Badge>
                      <Badge variant="outline" className="bg-natural-50">Absorption Tests</Badge>
                    </div>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=600&h=400" 
                      alt="Natural Pure Laboratory" 
                      className="rounded-lg shadow-lg object-cover"
                    />
                    <div className="absolute -bottom-4 -right-4 p-2 bg-white shadow-md rounded">
                      <img 
                        src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=200&h=150"
                        alt="Analysis Equipment"
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
                      Our laboratory is certified according to ISO 9001 and ISO 17025 standards, ensuring quality procedures 
                      and reliability of our analyses.
                    </p>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>ISO 9001:2015 - Quality Management</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>ISO 17025 - Laboratory Competence</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>GLP - Good Laboratory Practices</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-md p-6 border border-indigo-100">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                      <GraduationCap className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-medium text-slate-800 mb-2">Academic Partnerships</h3>
                    <p className="text-slate-600 mb-4">
                      We collaborate with several universities and research institutes to enrich 
                      our expertise and contribute to the advancement of knowledge.
                    </p>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>Paris-Saclay University</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>Pasteur Institute</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>Harvard School of Public Health</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-md p-6 border border-indigo-100">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                      <Dna className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-medium text-slate-800 mb-2">Independent Studies</h3>
                    <p className="text-slate-600 mb-4">
                      All our formulations are validated by independent clinical studies 
                      before being recommended.
                    </p>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>Double-blind randomized studies</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>Advanced biological analyses</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 flex-shrink-0" />
                        <span>Bioavailability assessments</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="methodologie" className="pt-8">
              <div id="methodologie" className="max-w-6xl mx-auto">
                <ScientificMethodology />
              </div>
            </TabsContent>

            <TabsContent value="equipe" className="pt-8">
              <div id="equipe" className="max-w-6xl mx-auto">
                <ScientificTeam />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Scientific Publications */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScientificPublications />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export { OurResearch };
export default OurResearch;