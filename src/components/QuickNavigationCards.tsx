
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Microscope, BookOpen, Heart, Brain, Users, 
  ScrollText, ShieldCheck, Globe
} from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const QuickNavigationCards: React.FC = () => {
  const { t } = useTranslation();

  const navigationCards = [
    {
      title: t('Scientific Research'),
      description: t('Explore our scientific research and publications'),
      icon: <Microscope className="h-6 w-6 text-indigo-600" />,
      path: '/bibliotheque-scientifique',
      color: 'bg-indigo-50 border-indigo-100'
    },
    {
      title: t('Educational Resources'),
      description: t('Articles and educational content about nutrition'),
      icon: <BookOpen className="h-6 w-6 text-emerald-600" />,
      path: '/articles',
      color: 'bg-emerald-50 border-emerald-100'
    },
    {
      title: t('Health Assessment'),
      description: t('Take our interactive quiz for personalized insights'),
      icon: <Heart className="h-6 w-6 text-rose-600" />,
      path: '/quiz',
      color: 'bg-rose-50 border-rose-100'
    },
    {
      title: t('Our Organization'),
      description: t('Learn about our mission, team, and non-profit status'),
      icon: <Users className="h-6 w-6 text-amber-600" />,
      path: '/about',
      color: 'bg-amber-50 border-amber-100'
    },
    {
      title: t('Scientific Methodology'),
      description: t('Understand our rigorous scientific approach'),
      icon: <Brain className="h-6 w-6 text-blue-600" />,
      path: '/scientific-methodology',
      color: 'bg-blue-50 border-blue-100'
    },
    {
      title: t('Legal Information'),
      description: t('Privacy policy, terms of use, and accessibility'),
      icon: <ShieldCheck className="h-6 w-6 text-gray-600" />,
      path: '/privacy-policy',
      color: 'bg-gray-50 border-gray-100'
    },
    {
      title: t('Impact Reports'),
      description: t('See the impact of our research and programs'),
      icon: <Globe className="h-6 w-6 text-green-600" />,
      path: '/impact',
      color: 'bg-green-50 border-green-100'
    },
    {
      title: t('Complete Site Map'),
      description: t('View a complete list of all pages and resources'),
      icon: <ScrollText className="h-6 w-6 text-purple-600" />,
      path: '/site-map',
      color: 'bg-purple-50 border-purple-100'
    }
  ];

  return (
    <section className="py-12">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t('Quick Navigation')}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {t('Find the information you need through these key sections of our website')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {navigationCards.map((card, index) => (
            <Link to={card.path} key={index}>
              <Card className={`h-full transition-all hover:shadow-md hover:translate-y-[-2px] ${card.color}`}>
                <CardHeader className="pb-2">
                  <div className="bg-white p-2 rounded-full w-fit shadow-sm mb-2">
                    {card.icon}
                  </div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <CardDescription>{card.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <span className="text-sm font-medium flex items-center">
                    {t('Explore')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default QuickNavigationCards;
