import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Index from './pages/Index';
import About from './pages/About';
import Articles from './pages/Articles';
import Article from './pages/Article';
import Contact from './pages/Contact';
import ScientificMethodology from './pages/ScientificMethodology';
import NotFound from './pages/NotFound';
import Impact from './pages/Impact';
import Support from './pages/Support';
import Quiz from './pages/Quiz';
// Import explicite de la page de résultats de quiz
import QuizResultsPage from './pages/QuizResults';
import LabSolutions from './pages/LabSolutions';
import BibliothequeScientifique from './pages/BibliothequeScientifique';
import NosRecherches from './pages/NosRecherches';
import ProfileSante from './pages/ProfileSante';
import SiteMap from './pages/SiteMap';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import SocialRedirect from './pages/SocialRedirect';
import AILearningDashboard from './pages/AILearningDashboard';
import AdGrantCompliance from './pages/AdGrantCompliance';
import ScientificLibrary from './pages/ScientificLibrary';
import OurResearch from './pages/OurResearch';
import HealthProfile from './pages/HealthProfile';
import Accessibility from './pages/Accessibility';
import Volunteer from './pages/Volunteer';
import AISystem from './pages/AISystem';
import AIConfigurationDashboard from './pages/AIConfigurationDashboard';
import ScenarioTester from "./pages/ScenarioTester"; // Added import for ScenarioTester

// Create router with all application routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Index />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/articles',
        element: <Articles />,
      },
      {
        path: '/article/:slug',
        element: <Article />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/scientific-methodology',
        element: <ScientificMethodology />,
      },
      {
        path: '/impact',
        element: <Impact />
      },
      {
        path: '/support',
        element: <Support />
      },
      {
        path: '/quiz',
        element: <Quiz />
      },
      {
        path: '/quiz-results',
        element: <QuizResultsPage />
      },
      {
        path: '/lab-solutions',
        element: <LabSolutions />
      },
      {
        path: '/bibliotheque-scientifique',
        element: <BibliothequeScientifique />
      },
      {
        path: '/scientific-library',
        element: <ScientificLibrary />
      },
      {
        path: '/our-research',
        element: <OurResearch />
      },
      {
        path: '/nos-recherches',
        element: <NosRecherches />
      },
      {
        path: '/profile-sante',
        element: <ProfileSante />
      },
      {
        path: '/health-profile',
        element: <HealthProfile />
      },
      {
        path: '/sitemap',
        element: <SiteMap />
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />
      },
      {
        path: '/terms-of-use',
        element: <TermsOfUse />
      },
      {
        path: '/social-redirect/:platform',
        element: <SocialRedirect />
      },
      {
        path: '/ai-learning-dashboard',
        element: <AILearningDashboard />
      },
      {
        path: '/ai-system',
        element: <AISystem />
      },
      {
        path: '/ai-configuration',
        element: <AIConfigurationDashboard />
      },
      {
        path: '/ad-grant-compliance',
        element: <AdGrantCompliance />
      },
      {
        path: '/accessibility',
        element: <Accessibility />
      },
      {
        path: '/volunteer',
        element: <Volunteer />
      },
      {
        path: '/scenario-tester', // Added route for ScenarioTester
        element: <ScenarioTester />
      }
    ],
  },
]);

export default router;