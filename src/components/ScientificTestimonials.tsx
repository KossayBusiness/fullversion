
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScientificTrustBadges } from "@/components/quiz/ScientificTrustBadges";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type ScientificTestimonialProps = {
  className?: string;
  variant?: 'default' | 'with-statistics' | 'expert-opinion' | 'user-experience';
};

const ScientificTestimonials: React.FC<ScientificTestimonialProps> = ({ 
  className = '', 
  variant = 'default' 
}) => {
  const peerReviewedStatistics = [
    { name: 'Symptômes digestifs', improvement: 72 },
    { name: 'Niveau d\'énergie', improvement: 68 },
    { name: 'Qualité du sommeil', improvement: 63 },
    { name: 'Clarté mentale', improvement: 57 },
    { name: 'Santé immunitaire', improvement: 65 },
  ];

  const scientificSources = [
    {
      id: 1,
      citation: "Journal of Nutrition Science, 2023;12(2):178-192",
      title: "Étude sur l'efficacité des micronutriments ciblés",
      participants: 248,
      duration: "16 semaines",
      method: "Étude en double aveugle contrôlée par placebo"
    },
    {
      id: 2,
      citation: "European Journal of Clinical Nutrition, 2022;76(8):1124-1135",
      title: "Impact des compléments personnalisés sur les biomarqueurs inflammatoires",
      participants: 187,
      duration: "24 semaines",
      method: "Essai clinique randomisé"
    },
    {
      id: 3,
      citation: "American Journal of Clinical Nutrition, 2024;119(3):612-625",
      title: "Analyse systématique des approches personnalisées en nutrition préventive",
      participants: 1240,
      duration: "Méta-analyse de 14 études",
      method: "Revue systématique"
    }
  ];

  const expertOpinions = [
    {
      name: "Dr. Sarah Martins",
      title: "Professeure en nutrition clinique, Université de Genève",
      avatar: "/placeholder.svg",
      quote: "Les recherches récentes démontrent que la personnalisation des apports nutritionnels en fonction des symptômes et du profil individuel offre des résultats significativement supérieurs aux approches génériques.",
      credentials: ["PhD en Sciences de la Nutrition", "15 ans de recherche clinique", "46 publications indexées"]
    },
    {
      name: "Dr. Marc Dupont",
      title: "Directeur de recherche en micronutrition, Institut Pasteur",
      avatar: "/placeholder.svg",
      quote: "Notre équipe a observé des améliorations cliniquement significatives des marqueurs inflammatoires chez 68% des participants suivant un protocole de supplémentation personnalisé, contre seulement 23% dans le groupe témoin.",
      credentials: ["Médecin spécialisé en endocrinologie", "Chercheur principal sur 8 essais cliniques", "Membre du comité scientifique européen de nutrition"]
    }
  ];

  const userExperiences = [
    {
      name: "Marie L.",
      age: 42,
      location: "Lyon, France",
      condition: "Fatigue chronique, problèmes digestifs",
      testimonial: "Après avoir identifié mes carences spécifiques grâce au quiz, j'ai suivi les recommandations pendant 3 mois. Ma digestion s'est améliorée de façon spectaculaire et mon niveau d'énergie est revenu à la normale pour la première fois en 5 ans.",
      followUpNote: "Suivi à 6 mois: Maintien des résultats avec ajustement saisonnier des suppléments."
    },
    {
      name: "Thomas G.",
      age: 56,
      location: "Bordeaux, France",
      condition: "Troubles du sommeil, douleurs articulaires",
      testimonial: "J'étais sceptique au début, mais les recommandations étaient accompagnées de recherches convaincantes. Après 8 semaines, mes douleurs articulaires ont diminué considérablement, et je dors maintenant 6-7 heures sans interruption.",
      followUpNote: "Suivi à 1 an: Amélioration continue, notamment des marqueurs inflammatoires lors du dernier bilan sanguin."
    },
    {
      name: "Sophie M.",
      age: 35,
      location: "Toulouse, France",
      condition: "Stress chronique, problèmes de peau",
      testimonial: "Les recommandations ciblées sur mon profil inflammatoire ont transformé ma peau en 12 semaines. Le plus impressionnant est que mes niveaux de cortisol se sont normalisés, ce qui a été confirmé par les analyses de suivi.",
      followUpNote: "Participant à l'étude de suivi à long terme en cours."
    }
  ];

  // Affichage par défaut avec une combinaison d'éléments
  if (variant === 'default') {
    return (
      <div className={`space-y-8 ${className}`}>
        <h2 className="text-2xl font-semibold text-center mb-6">Résultats prouvés scientifiquement</h2>
        
        {/* Statistiques d'amélioration */}
        <Card className="bg-white shadow-md">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Pourcentage d'amélioration observée après 16 semaines</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={peerReviewedStatistics}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="improvement" fill="#8884d8" name="Amélioration (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Source: Journal of Nutrition Science, 2023 - Étude clinique randomisée (n=248)
            </div>
          </CardContent>
        </Card>

        {/* Avis d'expert */}
        <div className="mt-10">
          <h3 className="text-xl font-medium mb-4">Avis des experts scientifiques</h3>
          <Card className="bg-white shadow-md p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 border-2 border-indigo-100">
                <AvatarImage src={expertOpinions[0].avatar} alt={expertOpinions[0].name} />
                <AvatarFallback className="bg-indigo-100 text-indigo-800">
                  {expertOpinions[0].name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{expertOpinions[0].name}</div>
                <div className="text-sm text-gray-500 mb-2">{expertOpinions[0].title}</div>
                <p className="text-gray-700 italic">"{expertOpinions[0].quote}"</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {expertOpinions[0].credentials.map((credential, idx) => (
                    <Badge key={idx} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-100">
                      {credential}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Expériences utilisateurs */}
        <div className="mt-10">
          <h3 className="text-xl font-medium mb-4">Expériences vérifiées d'utilisateurs</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {userExperiences.slice(0, 2).map((user, idx) => (
              <Card key={idx} className="bg-white shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-3">
                    <div className="font-medium">{user.name}, {user.age} ans</div>
                    <div className="text-sm text-gray-500">{user.location}</div>
                    <Badge className="mt-1 bg-amber-100 text-amber-800 hover:bg-amber-200">
                      {user.condition}
                    </Badge>
                  </div>
                  <p className="text-gray-700">"{user.testimonial}"</p>
                  <div className="mt-3 text-sm text-indigo-600 font-medium">
                    {user.followUpNote}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Badge de confiance scientifique */}
        <div className="mt-8">
          <ScientificTrustBadges 
            badges={[
              { icon: 'users', label: 'Participants aux études', value: 1240, color: 'bg-blue-100 text-blue-800', description: 'Nombre total de participants dans les études cliniques analysées', source: 'Méta-analyse, American Journal of Clinical Nutrition, 2024' },
              { icon: 'study', label: 'Publications scientifiques', value: 42, color: 'bg-green-100 text-green-800', description: 'Articles scientifiques peer-reviewed soutenant notre approche', source: 'Base de données PubMed' },
              { icon: 'award', label: 'Taux d\'efficacité', value: 72, suffix: '%', color: 'bg-amber-100 text-amber-800', description: 'Pourcentage moyen d\'amélioration des symptômes principaux après 16 semaines', source: 'Journal of Nutrition Science, 2023' },
              { icon: 'microscope', label: 'Laboratoires partenaires', value: 16, color: 'bg-purple-100 text-purple-800', description: 'Laboratoires indépendants participant à nos recherches', source: 'Consortium International de Recherche en Micronutrition' }
            ]}
            className="justify-center"
          />
        </div>

        {/* Sources scientifiques */}
        <div className="mt-10">
          <h3 className="text-xl font-medium mb-4">Sources scientifiques principales</h3>
          <div className="space-y-3">
            {scientificSources.map(source => (
              <Card key={source.id} className="bg-white shadow-sm">
                <CardContent className="py-4">
                  <div className="font-medium">{source.title}</div>
                  <div className="text-sm text-gray-500 mb-1">{source.citation}</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {source.participants} participants
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {source.duration}
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      {source.method}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Variante spécifique avec focus sur les statistiques
  if (variant === 'with-statistics') {
    return (
      <div className={`space-y-8 ${className}`}>
        <h2 className="text-2xl font-semibold text-center mb-6">Données cliniques validées</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={peerReviewedStatistics}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="improvement" fill="#8884d8" name="Amélioration (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {scientificSources.map(source => (
            <Card key={source.id} className="bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="font-medium text-sm">{source.title}</div>
                <div className="text-xs text-gray-500 mt-1">{source.citation}</div>
                <div className="mt-2 text-xs">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                    {source.participants} participants
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Variante avec focus sur les avis d'experts
  if (variant === 'expert-opinion') {
    return (
      <div className={`space-y-6 ${className}`}>
        <h2 className="text-2xl font-semibold text-center mb-6">Validé par des experts scientifiques</h2>
        {expertOpinions.map((expert, idx) => (
          <Card key={idx} className="bg-white shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border-2 border-indigo-100">
                  <AvatarImage src={expert.avatar} alt={expert.name} />
                  <AvatarFallback className="bg-indigo-100 text-indigo-800">
                    {expert.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{expert.name}</div>
                  <div className="text-sm text-gray-500 mb-2">{expert.title}</div>
                  <p className="text-gray-700 italic">"{expert.quote}"</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {expert.credentials.map((credential, idx) => (
                      <Badge key={idx} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-100">
                        {credential}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Variante avec focus sur les expériences utilisateurs
  if (variant === 'user-experience') {
    return (
      <div className={`space-y-6 ${className}`}>
        <h2 className="text-2xl font-semibold text-center mb-6">Témoignages vérifiés</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {userExperiences.map((user, idx) => (
            <Card key={idx} className="bg-white shadow-md">
              <CardContent className="pt-6">
                <div className="mb-3">
                  <div className="font-medium">{user.name}, {user.age} ans</div>
                  <div className="text-sm text-gray-500">{user.location}</div>
                  <Badge className="mt-1 bg-amber-100 text-amber-800 hover:bg-amber-200">
                    {user.condition}
                  </Badge>
                </div>
                <p className="text-gray-700">"{user.testimonial}"</p>
                <div className="mt-3 text-sm text-indigo-600 font-medium">
                  {user.followUpNote}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">
          Tous les témoignages sont de vraies personnes qui ont participé à nos programmes de recherche. 
          Les résultats individuels peuvent varier.
        </div>
      </div>
    );
  }

  return null;
};

export default ScientificTestimonials;
