
import React from 'react';
import { Container } from "@/components/ui/container";
import { Users, BookOpen, School, Globe, Heart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from '@/contexts/LanguageContext';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEOHead from '@/components/SEOHead';

type VolunteerOpportunity = {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  commitmentHours: string;
  location: string;
  category: 'research' | 'education' | 'translation' | 'community' | 'technology';
  icon: React.ReactNode;
};

const volunteerOpportunities: VolunteerOpportunity[] = [
  {
    id: 'vol-001',
    title: 'Research Assistant',
    description: 'Support our research team in literature reviews, data collection, and analysis for nutrition and health studies.',
    requirements: [
      'Background in nutritional science, health sciences, or related field',
      'Experience with scientific literature searches',
      'Attention to detail and analytical skills',
      'Familiarity with research methodologies'
    ],
    commitmentHours: '5-10 hours per week',
    location: 'Remote',
    category: 'research',
    icon: <BookOpen className="h-6 w-6 text-indigo-600" />
  },
  {
    id: 'vol-002',
    title: 'Educational Content Developer',
    description: 'Create accessible, scientifically accurate educational materials about nutrition and health topics.',
    requirements: [
      'Strong writing and communication skills',
      'Understanding of scientific concepts',
      'Ability to explain complex information clearly',
      'Experience in content creation preferred'
    ],
    commitmentHours: '3-8 hours per week',
    location: 'Remote',
    category: 'education',
    icon: <School className="h-6 w-6 text-green-600" />
  },
  {
    id: 'vol-003',
    title: 'Translation Volunteer',
    description: 'Help translate our educational materials into multiple languages to increase global accessibility.',
    requirements: [
      'Fluency in English and at least one additional language',
      'Attention to detail',
      'Understanding of health and nutrition terminology',
      'Previous translation experience preferred'
    ],
    commitmentHours: 'Flexible',
    location: 'Remote',
    category: 'translation',
    icon: <Globe className="h-6 w-6 text-blue-600" />
  },
  {
    id: 'vol-004',
    title: 'Community Outreach Coordinator',
    description: 'Organize and facilitate educational workshops and community events about nutrition and health.',
    requirements: [
      'Strong communication and interpersonal skills',
      'Event planning experience',
      'Passionate about community education',
      'Ability to engage diverse audiences'
    ],
    commitmentHours: '5-15 hours per month',
    location: 'Various locations or virtual',
    category: 'community',
    icon: <Heart className="h-6 w-6 text-rose-600" />
  },
  {
    id: 'vol-005',
    title: 'Web Development Support',
    description: 'Assist with maintaining and improving our educational website and digital resources.',
    requirements: [
      'Experience with web development',
      'Knowledge of HTML, CSS, and JavaScript',
      'Understanding of accessibility standards',
      'Problem-solving skills'
    ],
    commitmentHours: 'Flexible, project-based',
    location: 'Remote',
    category: 'technology',
    icon: <div className="h-6 w-6 text-purple-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    </div>
  }
];

const Volunteer = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  
  const categories = [
    { id: 'all', name: t('All Opportunities') },
    { id: 'research', name: t('Research') },
    { id: 'education', name: t('Education') },
    { id: 'translation', name: t('Translation') },
    { id: 'community', name: t('Community') },
    { id: 'technology', name: t('Technology') }
  ];
  
  const filteredOpportunities = selectedCategory === 'all'
    ? volunteerOpportunities
    : volunteerOpportunities.filter(opp => opp.category === selectedCategory);

  return (
    <>
      <SEOHead
        title={t('Volunteer Opportunities - Natural Pure Academy')}
        description={t('Explore volunteer opportunities with Natural Pure Academy and help advance nutrition education and research as a non-profit organization.')}
        keywords={t('volunteer, non-profit, nutrition education, research volunteer, community outreach')}
      />
      
      <section className="py-12 bg-white min-h-screen">
        <Container>
          <Breadcrumbs 
            items={[
              { label: t('Home'), path: '/' },
              { label: t('Support'), path: '/support' },
              { label: t('Volunteer Opportunities'), path: '/volunteer' }
            ]} 
          />

          <div className="max-w-4xl mx-auto mb-10">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-indigo-100 text-indigo-800 hover:bg-indigo-200/80 mb-2">
                <Users className="h-3 w-3 mr-1" />
                {t('Get Involved')}
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-3">{t('Volunteer Opportunities')}</h1>
              <p className="text-slate-600 max-w-2xl mx-auto">
                {t('Join our team of dedicated volunteers who help advance our mission of nutrition education and research as a non-profit organization.')}
              </p>
            </div>

            {/* Hero section with impact stats */}
            <div className="mb-10 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-indigo-900 mb-2">
                  {t('The Impact of Our Volunteers')}
                </h2>
                <p className="text-slate-700">
                  {t('Our volunteers are essential to fulfilling our non-profit mission.')}
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600">120+</div>
                  <div className="text-sm text-slate-600">{t('Active Volunteers')}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600">15k+</div>
                  <div className="text-sm text-slate-600">{t('Volunteer Hours')}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600">40+</div>
                  <div className="text-sm text-slate-600">{t('Countries')}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600">8</div>
                  <div className="text-sm text-slate-600">{t('Languages')}</div>
                </div>
              </div>
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

            {/* Opportunities List */}
            <div className="space-y-6">
              {filteredOpportunities.map(opportunity => (
                <div
                  key={opportunity.id}
                  className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="mr-4 p-2 bg-indigo-50 rounded-full">
                        {opportunity.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                          {opportunity.title}
                        </h3>
                        <p className="text-slate-700 mb-4">
                          {opportunity.description}
                        </p>
                        
                        <div className="mb-4">
                          <div className="text-sm font-medium text-slate-800 mb-2">
                            {t('Requirements')}:
                          </div>
                          <ul className="space-y-1">
                            {opportunity.requirements.map((req, index) => (
                              <li key={index} className="flex items-start text-sm text-slate-600">
                                <span className="inline-block h-5 w-5 flex-shrink-0 text-indigo-500 mr-1">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700 mb-4">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {opportunity.commitmentHours}
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {opportunity.location}
                          </div>
                        </div>
                        
                        <div>
                          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                            <Link to="/contact?subject=Volunteer">
                              {t('Apply for this Role')}
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Volunteer benefits */}
            <div className="mt-12 p-6 border border-slate-200 rounded-lg bg-slate-50">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                {t('Benefits of Volunteering')}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 h-6 w-6 rounded-full mr-3 flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>{t('Gain experience in scientific research and education')}</span>
                </div>
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 h-6 w-6 rounded-full mr-3 flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>{t('Network with professionals in nutrition and health fields')}</span>
                </div>
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 h-6 w-6 rounded-full mr-3 flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>{t('Contribute to improved global nutrition education')}</span>
                </div>
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 h-6 w-6 rounded-full mr-3 flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>{t('Receive letters of recommendation for academic/professional pursuits')}</span>
                </div>
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 h-6 w-6 rounded-full mr-3 flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>{t('Access to educational resources and professional development')}</span>
                </div>
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 h-6 w-6 rounded-full mr-3 flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>{t('Be part of a global community passionate about health and nutrition')}</span>
                </div>
              </div>
            </div>
            
            {/* Call to action */}
            <div className="mt-10 text-center">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">
                {t('Ready to Make a Difference?')}
              </h2>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                {t('If you don\'t see a specific role that matches your skills, we\'d still love to hear from you. We often have additional opportunities and can work with you to find the best fit.')}
              </p>
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                <Link to="/contact?subject=Volunteering">
                  {t('Contact Us to Volunteer')}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Volunteer;
