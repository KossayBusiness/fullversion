
import React from 'react';
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslation } from '@/contexts/LanguageContext';
import Breadcrumbs from '@/components/Breadcrumbs';

const Accessibility = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 bg-white min-h-screen">
      <Container>
        <Breadcrumbs 
          items={[
            { label: t('Home'), path: '/' },
            { label: t('Accessibility'), path: '/accessibility' }
          ]} 
        />

        <div className="max-w-4xl mx-auto mb-10">
          <div className="mb-8 text-center">
            <Badge variant="indigo" className="mb-2">
              <Eye className="h-3 w-3 mr-1" />
              {t('Accessibility')}
            </Badge>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">{t('Accessibility Statement')}</h1>
            <p className="text-slate-600">
              {t('Making science accessible to everyone')}
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <h2>{t('Our Commitment to Accessibility')}</h2>
            <p>
              {t('Natural Pure Academy is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.')}
            </p>

            <h2>{t('Compliance Status')}</h2>
            <p>
              {t('We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines explain how to make web content more accessible to people with a wide array of disabilities, including visual, auditory, physical, speech, cognitive, language, learning, and neurological disabilities.')}
            </p>

            <div className="bg-green-50 p-6 rounded-lg border border-green-100 my-6">
              <h3 className="flex items-center text-green-800 font-semibold mb-2">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                {t('Features We\'ve Implemented')}
              </h3>
              <ul className="space-y-2 text-green-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('Semantic HTML structure for better screen reader compatibility')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('Keyboard navigation for all interactive elements')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('Sufficient color contrast ratios for text and interactive elements')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('Text alternatives for non-text content')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('Resizable text without loss of functionality')}</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100 my-6">
              <h3 className="flex items-center text-amber-800 font-semibold mb-2">
                <AlertCircle className="h-5 w-5 mr-2 text-amber-600" />
                {t('Areas We\'re Improving')}
              </h3>
              <ul className="space-y-2 text-amber-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('Enhanced screen reader compatibility for interactive elements')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('Improved focus indicators for keyboard navigation')}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{t('Audio descriptions for video content')}</span>
                </li>
              </ul>
            </div>

            <h2>{t('Feedback and Contact Information')}</h2>
            <p>
              {t('We welcome your feedback on the accessibility of the Natural Pure Academy website. Please let us know if you encounter accessibility barriers on our site:')}
            </p>
            <ul>
              <li>{t('Email: accessibility@naturalpureacademy.org')}</li>
              <li>{t('Phone: +1 (555) 123-4567')}</li>
              <li>{t('Address: 123 Science Way, San Francisco, CA 94107')}</li>
            </ul>
            <p>
              {t('We aim to respond to feedback within 3 business days.')}
            </p>

            <h2>{t('Compatibility with Assistive Technologies')}</h2>
            <p>
              {t('The Natural Pure Academy website is designed to be compatible with the following assistive technologies:')}
            </p>
            <ul>
              <li>{t('Screen readers (NVDA, JAWS, VoiceOver)')}</li>
              <li>{t('Speech recognition software')}</li>
              <li>{t('Screen magnifiers')}</li>
              <li>{t('Alternative keyboard devices')}</li>
            </ul>

            <h2>{t('Technical Specifications')}</h2>
            <p>
              {t('Accessibility of the Natural Pure Academy website relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:')}
            </p>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>WAI-ARIA</li>
            </ul>
            <p>
              {t('These technologies are relied upon for conformance with the accessibility standards used.')}
            </p>

            <h2>{t('Assessment Approach')}</h2>
            <p>
              {t('Natural Pure Academy assessed the accessibility of this website by the following approaches:')}
            </p>
            <ul>
              <li>{t('Self-evaluation')}</li>
              <li>{t('External audit by accessibility experts')}</li>
              <li>{t('User testing with people who use assistive technologies')}</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Accessibility;
