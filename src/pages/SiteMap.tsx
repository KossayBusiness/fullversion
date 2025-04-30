import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';

const SiteMap: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container className="py-8 px-4">
      <Helmet>
        <title>Site Map - Natural Pure Academy</title>
        <meta 
          name="description" 
          content="Complete site map of Natural Pure Academy scientific resources, research, and educational content on nutrition and health."
        />
      </Helmet>

      <h1 className="text-3xl font-bold mb-8 text-center">Site Map</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Main Pages</h2>
            <ul className="space-y-2">
              <li><Link to="/" className="text-blue-600 hover:underline">Home</Link></li>
              <li><Link to="/about" className="text-blue-600 hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="text-blue-600 hover:underline">Contact</Link></li>
              <li><Link to="/scientific-library" className="text-blue-600 hover:underline">Scientific Library</Link></li>
              <li><Link to="/our-research" className="text-blue-600 hover:underline">Our Research</Link></li>
              <li><Link to="/lab-solutions" className="text-blue-600 hover:underline">Lab Solutions</Link></li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Health & Nutrition</h2>
            <ul className="space-y-2">
              <li><Link to="/health-profile" className="text-blue-600 hover:underline">Health Profile</Link></li>
              <li><Link to="/quiz" className="text-blue-600 hover:underline">Nutritional Assessment</Link></li>
              <li><Link to="/nutrition" className="text-blue-600 hover:underline">Nutrition Basics</Link></li>
              <li><Link to="/articles" className="text-blue-600 hover:underline">Articles</Link></li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Scientific Methods</h2>
            <ul className="space-y-2">
              <li><Link to="/scientific-methodology" className="text-blue-600 hover:underline">Our Methodology</Link></li>
              <li><Link to="/impact" className="text-blue-600 hover:underline">Research Impact</Link></li>
              <li><Link to="/volunteer" className="text-blue-600 hover:underline">Volunteer for Studies</Link></li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Support</h2>
            <ul className="space-y-2">
              <li><Link to="/support" className="text-blue-600 hover:underline">Help Center</Link></li>
              <li><Link to="/accessibility" className="text-blue-600 hover:underline">Accessibility</Link></li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Legal Information</h2>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use" className="text-blue-600 hover:underline">Terms of Use</Link></li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Resources</h2>
            <ul className="space-y-2">
              <li><a href="https://www.instagram.com/naturalpure_academy/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><Link to="/social-redirect?target=youtube" className="text-blue-600 hover:underline">YouTube Channel</Link></li>
              <li><Link to="/social-redirect?target=newsletter" className="text-blue-600 hover:underline">Newsletter</Link></li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        <p>
          This site map provides a complete overview of all the resources available on Natural Pure Academy.
          <br />
          For questions or assistance, please <Link to="/contact" className="text-blue-600 hover:underline">contact us</Link>.
        </p>
      </div>
    </Container>
  );
};

export default SiteMap;