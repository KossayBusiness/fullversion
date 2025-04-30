
import React from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEOHead';
import Sitemap from '@/components/Sitemap';
import QuickNavigationCards from '@/components/QuickNavigationCards';
import Breadcrumbs from '@/components/Breadcrumbs';

const SiteMap: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title={t('Site Map - Natural Pure Academy')}
        description={t('Navigate our scientific resources, research, and educational content with our comprehensive site map.')}
        keywords={['site map', 'navigation', 'scientific resources', 'research', 'educational content', 'non-profit']}
      />
      <main className="min-h-screen pt-4 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs />
        </div>
        <Sitemap />
        <QuickNavigationCards />
      </main>
    </div>
  );
};

export default SiteMap;
