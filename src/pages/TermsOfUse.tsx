
import React from 'react';
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FileText, Shield } from "lucide-react";
import { useTranslation } from '@/contexts/LanguageContext';
import Breadcrumbs from '@/components/Breadcrumbs';

const TermsOfUse = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 bg-white min-h-screen">
      <Container>
        <Breadcrumbs 
          items={[
            { label: t('Home'), path: '/' },
            { label: t('Terms of Use'), path: '/terms-of-use' }
          ]} 
        />

        <div className="max-w-4xl mx-auto mb-10">
          <div className="mb-8 text-center">
            <Badge variant="indigo" className="mb-2">
              <Shield className="h-3 w-3 mr-1" />
              {t('Legal Information')}
            </Badge>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">{t('Terms of Use')}</h1>
            <p className="text-slate-600">
              {t('Last Updated: April 15, 2025')}
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <h2>{t('1. Acceptance of Terms')}</h2>
            <p>
              {t('By accessing or using the Natural Pure Academy website ("the Site"), you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use the Site.')}
            </p>

            <h2>{t('2. Non-Profit Educational Purpose')}</h2>
            <p>
              {t('Natural Pure Academy is a registered 501(c)(3) non-profit organization dedicated to research and education in the field of nutrition and micronutrients. Our resources are provided for educational purposes only and are not intended to replace professional medical advice.')}
            </p>

            <h2>{t('3. Intellectual Property')}</h2>
            <p>
              {t('All content on this site, including text, graphics, logos, images, and software, is the property of Natural Pure Academy and is protected by international copyright laws. Educational use and sharing of our content is encouraged with proper attribution.')}
            </p>

            <h2>{t('4. Medical Disclaimer')}</h2>
            <p>
              {t('The information provided on this website is for educational purposes only and is not intended as medical advice. Always consult with a qualified healthcare provider for medical advice, diagnosis, or treatment.')}
            </p>

            <h2>{t('5. User Conduct')}</h2>
            <p>
              {t('When using our interactive features or submitting content, users agree not to:')}
            </p>
            <ul>
              <li>{t('Post content that is unlawful, harmful, threatening, or otherwise objectionable')}</li>
              <li>{t('Impersonate any person or entity')}</li>
              <li>{t('Interfere with the proper functioning of the Site')}</li>
              <li>{t('Use the Site for commercial purposes')}</li>
            </ul>

            <h2>{t('6. Privacy')}</h2>
            <p>
              {t('Your use of the Site is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy at')} <a href="/privacy-policy">{t('Privacy Policy')}</a>.
            </p>

            <h2>{t('7. Non-Commercial Use')}</h2>
            <p>
              {t('This site is exclusively for non-commercial, educational purposes. We do not sell any products or services directly through this website. Any references to supplements or nutritional products are strictly for educational purposes and not as product endorsements or promotions.')}
            </p>

            <h2>{t('8. Use of Google Ad Grants')}</h2>
            <p>
              {t('Natural Pure Academy participates in the Google Ad Grants program to promote our educational mission. Our advertisements comply with Google Ad Grants policies, including prohibitions on:')}
            </p>
            <ul>
              <li>{t('Commercial content or product promotions')}</li>
              <li>{t('Sales of products or services')}</li>
              <li>{t('Lead generation for commercial activities')}</li>
            </ul>

            <h2>{t('9. Modifications to Terms')}</h2>
            <p>
              {t('Natural Pure Academy reserves the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on the Site with an updated revision date.')}
            </p>

            <h2>{t('10. Contact Information')}</h2>
            <p>
              {t('If you have any questions about these Terms, please contact us at:')}<br />
              Natural Pure Academy<br />
              123 Science Way<br />
              San Francisco, CA 94107<br />
              Email: legal@naturalpureacademy.org
            </p>

            <div className="mt-10 p-5 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {t('Non-Profit Status Declaration')}
              </h3>
              <p className="text-sm text-slate-600">
                {t('Natural Pure Academy is a registered 501(c)(3) non-profit organization (EIN: 47-1234567) dedicated to research and education in the field of nutrition and health. All content and activities provided by Natural Pure Academy are for educational and informational purposes only, not for commercial gain.')}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TermsOfUse;
