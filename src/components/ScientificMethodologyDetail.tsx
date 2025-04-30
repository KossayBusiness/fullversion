
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Microscope, FileText, Users, Calendar, Award, Shield, Check, Beaker, ClipboardList, LineChart, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ScientificMethodologyDetail: React.FC = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const researchSteps = [
    {
      id: 1,
      title: "Revue systématique",
      icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
      duration: "1-2 mois",
      color: "from-blue-100 to-indigo-100",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      description: "Analyse exhaustive de la littérature scientifique existante sur le sujet étudié.",
      details: [
        "Méta-analyses des études cliniques existantes",
        "Évaluation critique de la qualité méthodologique",
        "Identification des lacunes dans les connaissances actuelles"
      ]
    },
    {
      id: 2,
      title: "Tests in vitro",
      icon: <Beaker className="h-6 w-6 text-emerald-600" />,
      duration: "2-3 mois",
      color: "from-green-100 to-emerald-100",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      description: "Analyse en laboratoire des composés et de leurs interactions moléculaires.",
      details: [
        "Évaluation de la biodisponibilité des nutriments",
        "Tests d'assimilation cellulaire",
        "Mesure de l'activité antioxydante et anti-inflammatoire"
      ]
    },
    {
      id: 3,
      title: "Étude clinique",
      icon: <Users className="h-6 w-6 text-purple-600" />,
      duration: "6-12 mois",
      color: "from-purple-100 to-fuchsia-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      description: "Tests sur des participants volontaires dans des conditions contrôlées.",
      details: [
        "Recrutement de participants selon des critères stricts",
        "Études randomisées contrôlées en double aveugle",
        "Suivi régulier avec analyses sanguines et questionnaires"
      ]
    },
    {
      id: 4,
      title: "Analyse des données",
      icon: <LineChart className="h-6 w-6 text-blue-600" />,
      duration: "1-2 mois",
      color: "from-sky-100 to-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      description: "Traitement statistique rigoureux des résultats obtenus.",
      details: [
        "Analyse multivariée des facteurs d'influence",
        "Modélisation prédictive des effets",
        "Vérification des significations statistiques (p<0.05)"
      ]
    },
    {
      id: 5,
      title: "Publication",
      icon: <FileText className="h-6 w-6 text-orange-600" />,
      duration: "3-6 mois",
      color: "from-orange-100 to-amber-100",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      description: "Rédaction et soumission des résultats à des revues scientifiques à comité de lecture.",
      details: [
        "Processus de revue par les pairs",
        "Révisions basées sur les commentaires d'experts",
        "Publication dans des journaux scientifiques indexés"
      ]
    },
    {
      id: 6,
      title: "Suivi à long terme",
      icon: <Clock className="h-6 w-6 text-teal-600" />,
      duration: "1-2 ans",
      color: "from-teal-100 to-cyan-100",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      description: "Évaluation continue de l'efficacité et de la sécurité sur des périodes prolongées.",
      details: [
        "Suivi des participants sur 6, 12 et 24 mois",
        "Analyse des effets à long terme",
        "Ajustements des recommandations basés sur les résultats"
      ]
    }
  ];

  const validationPrinciples = [
    {
      title: "Revue critique",
      icon: <ClipboardList className="h-5 w-5" />,
      description: "Chaque protocole d'étude est examiné et validé par au moins trois experts indépendants avant sa mise en œuvre."
    },
    {
      title: "Standards élevés",
      icon: <Award className="h-5 w-5" />,
      description: "Nos méthodes suivent les directives CONSORT pour les essais cliniques et PRISMA pour les revues systématiques."
    },
    {
      title: "Analyse indépendante",
      icon: <Users className="h-5 w-5" />,
      description: "Les données sont analysées par des statisticiens indépendants pour éviter tout biais de confirmation."
    }
  ];

  const ethicalPrinciples = [
    {
      title: "Consentement éclairé",
      icon: <Check className="h-5 w-5" />,
      description: "Tous les participants sont pleinement informés des objectifs, méthodes et risques potentiels avant de donner leur consentement écrit."
    },
    {
      title: "Confidentialité des données",
      icon: <Shield className="h-5 w-5" />,
      description: "Les données personnelles des participants sont protégées et anonymisées conformément au RGPD."
    },
    {
      title: "Comité d'éthique",
      icon: <Users className="h-5 w-5" />,
      description: "Toutes nos études sont approuvées par un comité d'éthique indépendant avant leur mise en œuvre."
    },
    {
      title: "Transparence des résultats",
      icon: <FileText className="h-5 w-5" />,
      description: "Nous publions tous les résultats, qu'ils soient positifs, négatifs ou non concluants."
    }
  ];

  const currentStudies = [
    {
      title: "Impact des polyphénols sur l'inflammation chronique",
      participants: 186,
      stage: "Analyse des données",
      progress: 75,
      color: "bg-indigo-600"
    },
    {
      title: "Biodisponibilité comparative des formes de magnésium",
      participants: 120,
      stage: "Recrutement en cours",
      progress: 30,
      color: "bg-emerald-600"
    },
    {
      title: "Influence du microbiome sur l'absorption des vitamines B",
      participants: 210,
      stage: "Suivi des participants",
      progress: 60,
      color: "bg-purple-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2 border-indigo-200 bg-indigo-50 text-indigo-700">
              <Microscope className="h-3 w-3 mr-1" />
              Rigueur Scientifique
            </Badge>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Notre Méthodologie Scientifique
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Découvrez comment nos recherches sont menées selon les standards scientifiques les plus rigoureux pour garantir l'efficacité et la fiabilité de nos recommandations.
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
              Notre processus de recherche en 6 étapes
            </h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-100 hidden md:block"></div>

              {/* Steps */}
              <div className="space-y-8 relative">
                {researchSteps.map((step, index) => (
                  <motion.div 
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                  >
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-indigo-200 z-10"></div>
                    
                    {/* Content */}
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div 
                        className={`bg-gradient-to-br ${step.color} p-6 rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md`}
                        onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                      >
                        <div className="flex items-center mb-3 gap-3">
                          <div className={`h-12 w-12 rounded-full ${step.iconBg} flex items-center justify-center shrink-0 ${index % 2 === 0 ? 'md:order-2' : ''}`}>
                            {step.icon}
                          </div>
                          <div className={`${index % 2 === 0 ? 'md:text-right md:mr-3' : 'md:ml-0'}`}>
                            <h4 className="font-bold text-lg text-slate-800">{step.title}</h4>
                            <div className="flex items-center text-sm text-slate-600 mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              Durée : {step.duration}
                            </div>
                          </div>
                        </div>
                        
                        <p className={`text-slate-700 mb-3 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                          {step.description}
                        </p>

                        {expandedStep === step.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                            className={`mt-4 space-y-2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                          >
                            {step.details.map((detail, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <Check className={`h-4 w-4 ${step.iconColor} mt-0.5 ${index % 2 === 0 ? 'md:order-2' : ''}`} />
                                <p className="text-sm text-slate-700">{detail}</p>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </div>
                    
                    {/* Empty space for alignment */}
                    <div className="md:w-1/2 hidden md:block"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <Tabs defaultValue="validation" className="mb-16">
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="validation">Validation Scientifique</TabsTrigger>
                <TabsTrigger value="ethics">Principes Éthiques</TabsTrigger>
                <TabsTrigger value="studies">Études En Cours</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="validation" className="border border-slate-200 rounded-xl p-8 bg-white shadow-sm">
              <div className="text-center mb-6">
                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Validation par notre comité scientifique
                </h3>
                <p className="text-slate-600">
                  Chaque étude et recommandation est validée par un comité indépendant composé d'experts du domaine.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {validationPrinciples.map((principle, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full p-6 bg-gradient-to-br from-slate-50 to-white hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                          {principle.icon}
                        </div>
                        <h4 className="font-semibold text-slate-800">{principle.title}</h4>
                      </div>
                      <p className="text-slate-600 text-sm">
                        {principle.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ethics" className="border border-slate-200 rounded-xl p-8 bg-white shadow-sm">
              <div className="text-center mb-6">
                <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Nos principes éthiques
                </h3>
                <p className="text-slate-600">
                  La recherche scientifique requiert les plus hauts standards éthiques pour protéger les participants et garantir l'intégrité des résultats.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {ethicalPrinciples.map((principle, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full p-6 bg-gradient-to-br from-slate-50 to-white hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                          {principle.icon}
                        </div>
                        <h4 className="font-semibold text-slate-800">{principle.title}</h4>
                      </div>
                      <p className="text-slate-600 text-sm">
                        {principle.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="studies" className="border border-slate-200 rounded-xl p-8 bg-white shadow-sm">
              <div className="text-center mb-6">
                <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Microscope className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Nos études en cours
                </h3>
                <p className="text-slate-600">
                  Découvrez les recherches actuellement menées dans notre laboratoire.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {currentStudies.map((study, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full p-6 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-slate-800 mb-3 line-clamp-2">{study.title}</h4>
                      
                      <div className="flex items-center mb-3 text-sm text-slate-600">
                        <Users className="h-4 w-4 mr-1 text-slate-400" />
                        <span>{study.participants} participants</span>
                      </div>
                      
                      <Badge variant="outline" className="mb-4">
                        {study.stage}
                      </Badge>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-600">Avancement</span>
                          <span className="font-medium">{study.progress}%</span>
                        </div>
                        <Progress value={study.progress} className={study.color} />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline" className="group">
                  En savoir plus sur nos recherches
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-100 text-center">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Intéressé par nos recherches scientifiques ?
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Découvrez nos publications scientifiques ou explorez des opportunités de collaboration avec notre équipe de recherche.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="default">
                <BookOpen className="mr-2 h-4 w-4" />
                Publications scientifiques
              </Button>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Collaborer avec nous
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScientificMethodologyDetail;
