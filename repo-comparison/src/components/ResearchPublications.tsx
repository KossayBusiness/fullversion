
import React from 'react';
import { Container } from '@/components/ui/container';
import { Link } from 'react-router-dom';
import { ExternalLink, BookOpen, Download, FileText } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export type Publication = {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  abstract: string;
  doi: string;
  url: string;
  pdfUrl?: string;
  keywords: string[];
  category: 'Nutrition' | 'Micronutrients' | 'Health' | 'Education' | 'Methodology';
};

const publications: Publication[] = [
  {
    id: 'pub001',
    title: 'Nutritional Knowledge and Educational Interventions: A Systematic Review',
    authors: ['Jennifer R. Smith, PhD', 'Michael Chen, MD', 'Sarah Johnson, PhD'],
    journal: 'Journal of Nutrition Education and Behavior',
    year: 2023,
    abstract: 'This systematic review evaluated the effectiveness of educational interventions aimed at improving nutritional knowledge across different populations. Findings indicate that targeted educational programs significantly improve nutritional literacy and dietary choices.',
    doi: '10.1016/j.jneb.2023.02.003',
    url: 'https://example.org/publications/nutrition-education-review',
    pdfUrl: '/publications/nutrition-education-review.pdf',
    keywords: ['nutrition education', 'dietary knowledge', 'health literacy'],
    category: 'Education'
  },
  {
    id: 'pub002',
    title: 'Micronutrient Deficiencies in Urban and Rural Communities: Comparative Analysis',
    authors: ['Robert Wilson, MD', 'Emma Davis, PhD', 'Thomas Brown, MSc'],
    journal: 'American Journal of Clinical Nutrition',
    year: 2022,
    abstract: 'This study compared micronutrient deficiency patterns between urban and rural communities across five geographical regions. Results show distinct patterns of deficiency that require targeted intervention strategies.',
    doi: '10.1093/ajcn/nqac054',
    url: 'https://example.org/publications/micronutrient-deficiencies',
    keywords: ['micronutrients', 'dietary deficiencies', 'public health', 'community nutrition'],
    category: 'Micronutrients'
  },
  {
    id: 'pub003',
    title: 'Efficacy of Magnesium Supplementation on Sleep Quality: A Randomized Controlled Trial',
    authors: ['Laura Thompson, PhD', 'Daniel Robinson, MD', 'Sophia Lee, PharmD'],
    journal: 'Journal of Sleep Research',
    year: 2023,
    abstract: 'This randomized controlled trial evaluated the effects of magnesium supplementation on sleep quality metrics in adults with mild insomnia. Results indicate significant improvements in sleep onset latency and sleep efficiency.',
    doi: '10.1111/jsr.13644',
    url: 'https://example.org/publications/magnesium-sleep-quality',
    pdfUrl: '/publications/magnesium-sleep.pdf',
    keywords: ['magnesium', 'sleep quality', 'insomnia', 'supplementation'],
    category: 'Health'
  },
  {
    id: 'pub004',
    title: 'Novel Methodologies for Assessing Nutritional Status in Community Settings',
    authors: ['James Miller, PhD', 'Emily Clark, RD', 'David Martin, MPH'],
    journal: 'European Journal of Clinical Nutrition',
    year: 2021,
    abstract: 'This paper describes innovative, cost-effective methods for assessing nutritional status in resource-limited community settings. The proposed methodologies were validated across diverse populations and show high reliability.',
    doi: '10.1038/s41430-021-0892-5',
    url: 'https://example.org/publications/nutritional-assessment-methods',
    keywords: ['nutritional assessment', 'methodology', 'community health', 'field research'],
    category: 'Methodology'
  },
  {
    id: 'pub005',
    title: 'Impact of Dietary Patterns on Inflammatory Biomarkers: A Cross-Sectional Study',
    authors: ['Olivia Parker, PhD', 'Nathan White, MD', 'Grace Taylor, PhD'],
    journal: 'Nutrition Research',
    year: 2022,
    abstract: 'This cross-sectional study investigated associations between dietary patterns and inflammatory biomarkers in a cohort of 1,200 adults. Results reveal significant inverse associations between plant-based diets and inflammation markers.',
    doi: '10.1016/j.nutres.2022.07.002',
    url: 'https://example.org/publications/dietary-patterns-inflammation',
    pdfUrl: '/publications/dietary-inflammation.pdf',
    keywords: ['dietary patterns', 'inflammation', 'biomarkers', 'nutritional epidemiology'],
    category: 'Nutrition'
  },
  {
    id: 'pub006',
    title: 'Vitamin D Status and Respiratory Infections: A Population-Based Study',
    authors: ['Christopher Anderson, MD', 'Rachel Green, PhD', 'Mark Thompson, MD'],
    journal: 'BMJ Open',
    year: 2023,
    abstract: 'This population-based study examined the relationship between vitamin D status and incidence of respiratory infections in a cohort of 5,000 individuals. Results indicate a significant protective effect of optimal vitamin D levels.',
    doi: '10.1136/bmjopen-2022-065432',
    url: 'https://example.org/publications/vitamin-d-respiratory',
    keywords: ['vitamin D', 'respiratory infections', 'immunity', 'public health'],
    category: 'Health'
  },
  {
    id: 'pub007',
    title: 'Zinc Supplementation in the Elderly: Effects on Immune Function and Quality of Life',
    authors: ['Patricia Harris, PhD', 'Joseph Brown, MD', 'Alice Wong, PhD'],
    journal: 'Journal of Gerontology',
    year: 2022,
    abstract: 'This intervention study assessed the impact of zinc supplementation on immune function and quality of life in adults over 65 years. Results show improvements in immune markers and self-reported well-being.',
    doi: '10.1093/gerona/glac089',
    url: 'https://example.org/publications/zinc-elderly',
    pdfUrl: '/publications/zinc-elderly-immune.pdf',
    keywords: ['zinc', 'elderly', 'immune function', 'quality of life', 'aging'],
    category: 'Micronutrients'
  },
  {
    id: 'pub008',
    title: 'Educational Tools for Nutritional Literacy in Low-Resource Settings',
    authors: ['William Garcia, PhD', 'Karen Martinez, MPH', 'John Lewis, EdD'],
    journal: 'Global Health Education',
    year: 2021,
    abstract: 'This paper presents the development and validation of educational tools designed to improve nutritional literacy in low-resource settings. Field testing in three countries demonstrated significant gains in knowledge and behavior change.',
    doi: '10.1186/s41043-021-00256-9',
    url: 'https://example.org/publications/nutritional-literacy-tools',
    keywords: ['health education', 'nutritional literacy', 'low-resource settings', 'global health'],
    category: 'Education'
  }
];

const ResearchPublications = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  
  const categories = [
    { id: 'all', name: t('All Publications') },
    { id: 'Nutrition', name: t('Nutrition') },
    { id: 'Micronutrients', name: t('Micronutrients') },
    { id: 'Health', name: t('Health') },
    { id: 'Education', name: t('Education') },
    { id: 'Methodology', name: t('Methodology') },
  ];
  
  const filteredPublications = selectedCategory === 'all' 
    ? publications 
    : publications.filter(pub => pub.category === selectedCategory);

  return (
    <section className="py-12 bg-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-indigo-100 text-indigo-800 hover:bg-indigo-200/80 mb-2">
              <BookOpen className="h-3 w-3 mr-1" />
              {t('Research')}
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">{t('Scientific Publications')}</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t('Our peer-reviewed research publications reflect our commitment to advancing scientific knowledge in nutrition and health.')}
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Publications List */}
          <div className="space-y-6">
            {filteredPublications.map(publication => (
              <div
                key={publication.id}
                className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-2">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                    {publication.category}
                  </span>
                  <span className="ml-2 inline-flex items-center rounded-full bg-natural-50 px-2.5 py-0.5 text-xs font-medium text-natural-700">
                    {publication.year}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {publication.title}
                </h3>
                
                <p className="text-slate-600 text-sm mb-3">
                  {publication.authors.join(', ')}
                </p>
                
                <p className="text-slate-700 italic text-sm mb-4">
                  {publication.journal} • DOI: {publication.doi}
                </p>
                
                <p className="text-slate-700 mb-4">
                  {publication.abstract}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {publication.keywords.map(keyword => (
                    <span
                      key={keyword}
                      className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <a
                    href={publication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    {t('View Publication')}
                  </a>
                  
                  {publication.pdfUrl && (
                    <a
                      href={publication.pdfUrl}
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      {t('Download PDF')}
                    </a>
                  )}
                  
                  <Link
                    to={`/article/${publication.id}`}
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    {t('Read Summary')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-indigo-50 rounded-lg border border-indigo-100 text-center">
            <h2 className="text-xl font-semibold text-indigo-900 mb-2">
              {t('Research Collaborations')}
            </h2>
            <p className="text-slate-700 mb-4">
              {t('Natural Pure Academy actively collaborates with universities and research institutions. If you\'re interested in research partnerships, please contact our team.')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              {t('Contact Research Team')}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ResearchPublications;
