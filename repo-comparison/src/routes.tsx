import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Index from './pages/Index';
import About from './pages/About';
import Articles from './pages/Articles';
import Article from './pages/Article';
import Quiz from './pages/Quiz';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import BibliothequeScientifique from './pages/BibliothequeScientifique';
import ProfileSante from './pages/ProfileSante';
import NosRecherches from './pages/NosRecherches';
import LaboSolutions from './pages/LaboSolutions';
import Nutrition from './pages/Nutrition';
import Impact from './pages/Impact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SiteMap from './pages/SiteMap';
import ScientificMethodology from './pages/ScientificMethodology';
import TermsOfUse from "./pages/TermsOfUse";
import Accessibility from "./pages/Accessibility";
import Support from "./pages/Support";
import AdGrantCompliance from './pages/AdGrantCompliance'; // Added import


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Index /> },
      { path: 'about', element: <About /> },
      { path: 'articles', element: <Articles /> },
      { path: 'article/:articleId', element: <Article /> },
      { path: 'quiz', element: <Quiz /> },
      { path: 'contact', element: <Contact /> },
      { path: 'bibliotheque-scientifique', element: <BibliothequeScientifique /> },
      { path: 'profile-sante', element: <ProfileSante /> },
      { path: 'nos-recherches', element: <NosRecherches /> },
      { path: 'labo-solutions', element: <LaboSolutions /> },
      { path: 'nutrition', element: <Nutrition /> },
      { path: 'impact', element: <Impact /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'site-map', element: <SiteMap /> },
      { path: 'scientific-methodology', element: <ScientificMethodology /> },
      { path: 'terms-of-use', element: <TermsOfUse /> },
      { path: 'accessibility', element: <Accessibility /> },
      { path: 'support', element: <Support /> },
      { path: 'compliance-audit', element: <AdGrantCompliance />}  // Added route
    ],
  },
]);

export default router;