import React from 'react';
import { Container } from '@/components/ui/container';
import { Filter, SlidersHorizontal, BookOpen } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import ResearchPublications from '@/components/ResearchPublications';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEOHead from '@/components/SEOHead';

const BibliothequeScientifique = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead
        title={t('Scientific Library - Natural Pure Academy')}
        description={t('Explore peer-reviewed scientific publications and research by Natural Pure Academy on nutrition, health, and micronutrients.')}
        keywords={t('scientific research, nutrition studies, health publications, micronutrients research')}
      />

      <section className="py-12 bg-white">
        <Container>
          <Breadcrumbs 
            items={[
              { label: t('Home'), path: '/' },
              { label: t('Scientific Library'), path: '/bibliotheque-scientifique' }
            ]} 
          />

          <div className="max-w-4xl mx-auto mb-12 text-center">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-indigo-100 text-indigo-800 hover:bg-indigo-200/80 mb-2">
              <BookOpen className="h-3 w-3 mr-1" />
              {t('Non-Profit Research')}
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              {t('Scientific Library')}
            </h1>
            <p className="text-slate-600">
              {t('Explore our scientific publications and research findings. All content is provided for educational purposes only.')}
            </p>
            <div className="mt-4 inline-flex items-center justify-center bg-natural-50 text-natural-800 px-4 py-2 rounded-full text-sm font-medium">
              <Filter className="h-4 w-4 mr-2" />
              {t('Scientific content only - No product sales')}
            </div>
          </div>
        </Container>
      </section>

      <ResearchPublications />
    </>
  );
};

export default BibliothequeScientifique;