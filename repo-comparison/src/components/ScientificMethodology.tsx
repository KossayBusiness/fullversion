import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Microscope,
  Search,
  FileText,
  Beaker,
  Award,
  BarChart,
  ChevronRight,
  CheckCircle,
  Users,
  BookOpen,
  LineChart
} from "lucide-react";
import { Flask } from '@/components/ui/icons'; // Import Flask from custom icons


const ScientificMethodology = () => {
  const researchSteps = [
    {
      icon: <Search className="h-8 w-8 text-indigo-600" />,
      title: "Revue systématique",
      description: "Analyse exhaustive de la littérature scientifique existante sur le sujet étudié",
      details: [
        "Méta-analyses des études cliniques existantes",
        "Évaluation critique de la qualité méthodologique",
        "Identification des lacunes dans les connaissances actuelles"
      ],
      time: "1-2 mois"
    },
    {
      icon: <Beaker className="h-8 w-8 text-indigo-600" />,
      title: "Tests in vitro",
      description: "Analyse en laboratoire des composés et de leurs interactions moléculaires",
      details: [
        "Évaluation de la biodisponibilité des nutriments",
        "Tests d'assimilation cellulaire",
        "Mesure de l'activité antioxydante et anti-inflammatoire"
      ],
      time: "2-3 mois"
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: "Étude clinique",
      description: "Tests sur des participants volontaires dans des conditions contrôlées",
      details: [
        "Recrutement de participants selon des critères stricts",
        "Études randomisées contrôlées en double aveugle",
        "Suivi régulier avec analyses sanguines et questionnaires"
      ],
      time: "6-12 mois"
    },
    {
      icon: <BarChart className="h-8 w-8 text-indigo-600" />,
      title: "Analyse des données",
      description: "Traitement statistique rigoureux des résultats obtenus",
      details: [
        "Analyse multivariée des facteurs d'influence",
        "Modélisation prédictive des effets",
        "Vérification des significations statistiques (p<0.05)"
      ],
      time: "1-2 mois"
    },
    {
      icon: <FileText className="h-8 w-8 text-indigo-600" />,
      title: "Publication",
      description: "Rédaction et soumission des résultats à des revues scientifiques à comité de lecture",
      details: [
        "Processus de revue par les pairs",
        "Révisions basées sur les commentaires d'experts",
        "Publication dans des journaux scientifiques indexés"
      ],
      time: "3-6 mois"
    },
    {
      icon: <LineChart className="h-8 w-8 text-indigo-600" />,
      title: "Suivi à long terme",
      description: "Évaluation continue de l'efficacité et de la sécurité sur des périodes prolongées",
      details: [
        "Suivi des participants sur 6, 12 et 24 mois",
        "Analyse des effets à long terme",
        "Ajustements des recommandations basés sur les résultats"
      ],
      time: "1-2 ans"
    }
  ];

  const ethicalPrinciples = [
    {
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      title: "Consentement éclairé",
      description: "Tous les participants sont pleinement informés des objectifs, méthodes et risques potentiels avant de donner leur consentement écrit."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      title: "Confidentialité des données",
      description: "Les données personnelles des participants sont protégées et anonymisées conformément au RGPD."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      title: "Comité d'éthique",
      description: "Toutes nos études sont approuvées par un comité d'éthique indépendant avant leur mise en œuvre."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      title: "Transparence des résultats",
      description: "Nous publions tous les résultats, qu'ils soient positifs, négatifs ou non concluants."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-10">
            <Badge variant="indigo" className="mb-2">
              <Microscope className="h-3 w-3 mr-1" />
              Rigueur Scientifique
            </Badge>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Notre Méthodologie Scientifique
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Découvrez comment nos recherches sont menées selon les standards scientifiques les plus rigoureux
              pour garantir l'efficacité et la fiabilité de nos recommandations.
            </p>
          </div>

          {/* Processus de recherche */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
              Notre processus de recherche en 6 étapes
            </h3>

            <div className="relative">
              {/* Ligne de progression verticale */}
              <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-indigo-100 hidden md:block"></div>

              <div className="space-y-10">
                {researchSteps.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Point sur la timeline (visible uniquement sur desktop) */}
                    <div className="absolute left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-indigo-500 z-10 hidden md:block">
                      <div className="absolute inset-0 rounded-full bg-indigo-200 animate-ping opacity-30"></div>
                    </div>

                    <div className={`md:grid md:grid-cols-2 items-center gap-8 ${
                      index % 2 === 0 ? 'md:text-right' : 'flex flex-row-reverse'
                    }`}>
                      {/* Bloc d'information */}
                      <div className={`bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 shadow-md border border-indigo-100 relative z-20 
                        ${index % 2 === 0 ? 'md:mr-4' : 'md:ml-4'}`}>
                        <div className="flex items-center gap-4 mb-3 md:justify-end">
                          <div className="md:order-2 p-2 rounded-full bg-white shadow-sm">
                            {step.icon}
                          </div>
                          <h4 className="text-xl font-medium text-indigo-800 md:order-1">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-slate-600 mb-4">
                          {step.description}
                        </p>
                        <ul className="space-y-1 text-sm">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-start">
                              <ChevronRight className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 inline-block bg-indigo-100 text-indigo-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Durée : {step.time}
                        </div>
                      </div>

                      {/* Espace pour la timeline sur mobile */}
                      <div className="md:hidden h-8 relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-indigo-100"></div>
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-500"></div>
                      </div>

                      {/* Espace vide pour l'alternance desktop */}
                      <div className="hidden md:block"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comité scientifique */}
          <div className="bg-slate-50 rounded-xl p-8 mb-16">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-slate-800 mb-2">
                Validation par notre comité scientifique
              </h3>
              <p className="text-slate-600">
                Chaque étude et recommandation est validée par un comité indépendant composé d'experts du domaine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-6 w-6 text-indigo-600 mr-3" />
                  <h4 className="text-lg font-medium text-slate-800">Revue critique</h4>
                </div>
                <p className="text-slate-600 text-sm">
                  Chaque protocole d'étude est examiné et validé par au moins trois experts indépendants avant sa mise en œuvre.
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 text-indigo-600 mr-3" />
                  <h4 className="text-lg font-medium text-slate-800">Standards élevés</h4>
                </div>
                <p className="text-slate-600 text-sm">
                  Nos méthodes suivent les directives CONSORT pour les essais cliniques et PRISMA pour les revues systématiques.
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="flex items-center mb-4">
                  <BarChart className="h-6 w-6 text-indigo-600 mr-3" />
                  <h4 className="text-lg font-medium text-slate-800">Analyse indépendante</h4>
                </div>
                <p className="text-slate-600 text-sm">
                  Les données sont analysées par des statisticiens indépendants pour éviter tout biais de confirmation.
                </p>
              </div>
            </div>
          </div>

          {/* Principes éthiques */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
              Nos principes éthiques
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ethicalPrinciples.map((principle, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-lg p-5 hover:border-indigo-200 transition-colors shadow-sm">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4">
                      {principle.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-slate-800 mb-2">{principle.title}</h4>
                      <p className="text-slate-600">{principle.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Études en cours */}
          <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-xl p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-slate-800 mb-2">
                Nos études en cours
              </h3>
              <p className="text-slate-600">
                Découvrez les recherches actuellement menées dans notre laboratoire.
              </p>
            </div>

            <div className="space-y-5">
              {[
                {
                  title: "Impact des polyphénols sur l'inflammation chronique",
                  participants: 186,
                  phase: "Analyse des données",
                  completion: 75
                },
                {
                  title: "Biodisponibilité comparative des formes de magnésium",
                  participants: 120,
                  phase: "Recrutement en cours",
                  completion: 30
                },
                {
                  title: "Influence du microbiome sur l'absorption des vitamines B",
                  participants: 210,
                  phase: "Suivi des participants",
                  completion: 60
                }
              ].map((study, index) => (
                <div key={index} className="bg-white rounded-lg p-5 shadow-sm border border-indigo-100">
                  <h4 className="text-lg font-medium text-indigo-800 mb-2">{study.title}</h4>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-3">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" /> {study.participants} participants
                    </span>
                    <span className="flex items-center">
                      <Beaker className="h-4 w-4 mr-1" /> {study.phase}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${study.completion}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-right text-xs text-slate-600">
                    Avancement: {study.completion}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-slate-600 mb-6">
              Notre approche scientifique rigoureuse garantit que chaque recommandation de notre quiz 
              est basée sur des données validées et des méthodologies éprouvées.
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              <Link to="/quiz">
                Découvrir vos besoins personnalisés
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScientificMethodology;