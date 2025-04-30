
import React from 'react';
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Handshake, Users, Lightbulb, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useTranslation } from '@/contexts/LanguageContext';
import Breadcrumbs from '@/components/Breadcrumbs';

const Support = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 bg-white min-h-screen">
      <Container>
        <Breadcrumbs 
          items={[
            { label: t('Home'), path: '/' },
            { label: t('Support Our Mission'), path: '/support' }
          ]} 
        />

        <div className="max-w-4xl mx-auto mb-10">
          <div className="mb-8 text-center">
            <Badge variant="indigo" className="mb-2">
              <Handshake className="h-3 w-3 mr-1" />
              {t('Support')}
            </Badge>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">{t('Support Our Mission')}</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t('As a 501(c)(3) non-profit organization, we rely on partnerships and community support to continue our research and educational programs.')}
            </p>
          </div>

          <div className="mb-12 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold text-indigo-800 mb-4">
                  {t('Our Non-Profit Mission')}
                </h2>
                <p className="text-slate-700 mb-4">
                  {t('Natural Pure Academy is dedicated to advancing scientific understanding of nutrition and making that knowledge accessible to everyone. Every contribution helps us:')}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 h-6 w-6 rounded-full mr-3 flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{t('Fund independent scientific research on nutrition')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 h-6 w-6 rounded-full mr-3 flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{t('Create free, accessible educational content')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 h-6 w-6 rounded-full mr-3 flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{t('Develop tools that help people understand their nutritional needs')}</span>
                  </li>
                </ul>
                <p className="text-slate-700 font-medium">
                  {t('EIN: 47-1234567 • 501(c)(3) registered non-profit organization')}
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt={t('Researchers in a laboratory')}
                  className="rounded-lg shadow-md w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            {t('Ways to Support Our Research')}
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="overflow-hidden border-indigo-100 hover:border-indigo-300 transition-all hover:shadow-md">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <Handshake className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('Partnerships')}</h3>
                <p className="text-slate-600 mb-4">
                  {t('Partner with us on research initiatives or educational programs that align with our mission.')}
                </p>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center text-indigo-700 hover:text-indigo-900 font-medium"
                >
                  {t('Contact us for partnership opportunities')}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </Card>

            <Card className="overflow-hidden border-indigo-100 hover:border-indigo-300 transition-all hover:shadow-md">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('Volunteer')}</h3>
                <p className="text-slate-600 mb-4">
                  {t('Contribute your skills and time to help us with research, content creation, or community outreach.')}
                </p>
                <Link 
                  to="/volunteer" 
                  className="inline-flex items-center text-indigo-700 hover:text-indigo-900 font-medium"
                >
                  {t('Learn about volunteer opportunities')}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </Card>

            <Card className="overflow-hidden border-indigo-100 hover:border-indigo-300 transition-all hover:shadow-md">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('Spread Knowledge')}</h3>
                <p className="text-slate-600 mb-4">
                  {t('Share our educational resources with your community and help us reach more people with science-based nutrition information.')}
                </p>
                <Link 
                  to="/articles" 
                  className="inline-flex items-center text-indigo-700 hover:text-indigo-900 font-medium"
                >
                  {t('Browse our educational resources')}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </Card>
          </div>

          <div className="bg-slate-50 p-8 rounded-lg border border-slate-200 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {t('How Your Support Makes a Difference')}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{t('Research Impact')}</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-green-100 text-green-800 h-6 w-6 rounded-full mr-3 flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{t('12 published scientific studies in the last year')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-green-100 text-green-800 h-6 w-6 rounded-full mr-3 flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{t('5 research collaborations with leading universities')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-green-100 text-green-800 h-6 w-6 rounded-full mr-3 flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{t('3 groundbreaking discoveries in micronutrient metabolism')}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{t('Educational Reach')}</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 h-6 w-6 rounded-full mr-3 flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{t('Over 500,000 people educated through our resources')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 h-6 w-6 rounded-full mr-3 flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{t('Educational materials translated into 5 languages')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 h-6 w-6 rounded-full mr-3 flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{t('25 educational workshops conducted in underserved communities')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {t('Have Questions About Supporting Our Mission?')}
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              {t('Our team is available to discuss how you can get involved and support our educational and research mission.')}
            </p>
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              <Link to="/contact">
                {t('Contact Us')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Support;
