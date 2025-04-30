import React from 'react';
import { Link } from 'react-router-dom';
import { Microscope, FileText, Users as UsersIcon, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const publications = [
  {
    id: "1",
    title: "Impact des Polyphénols sur l'Inflammation Systémique",
    journal: "Journal of Nutritional Biochemistry",
    date: "Mars 2023",
    authors: 3,
    excerpt: "Cette étude examine comment certains polyphénols peuvent moduler les voies inflammatoires...",
    link: "/article/1"
  },
  {
    id: "2",
    title: "Biodisponibilité des Compléments de Magnésium: Analyse Comparative",
    journal: "European Journal of Nutrition",
    date: "Janvier 2023",
    authors: 5,
    excerpt: "Comparaison de l'absorption et de l'efficacité de différentes formes de magnésium...",
    link: "/article/2"
  },
  {
    id: "3",
    title: "Les Adaptogènes et leur Impact sur le Cortisol",
    journal: "Journal of Ethnopharmacology",
    date: "Novembre 2022",
    authors: 4,
    excerpt: "Évaluation clinique des effets de certaines plantes adaptogènes sur les niveaux de cortisol...",
    link: "/article/3"
  }
];

const ScientificPublications = () => {
  return (
    <div className="py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center">
          <FileText className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Nos Publications Scientifiques</h2>
          <p className="text-gray-600">Recherches validées par nos pairs</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {publications.map((pub, index) => (
          <motion.div 
            key={pub.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={pub.link}>
              <Card className="h-full hover:shadow-md transition-shadow border-natural-200 hover:border-indigo-200">
                <CardContent className="p-5">
                  <Badge variant="outline" className="mb-3 bg-indigo-50 border-indigo-100 text-indigo-700">
                    {pub.journal}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-natural-800">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-natural-600 mb-4 line-clamp-2">
                    {pub.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-natural-500">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {pub.date}
                    </span>
                    <span className="flex items-center">
                      <UsersIcon className="h-3 w-3 mr-1" />
                      {pub.authors} chercheurs
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScientificPublications;