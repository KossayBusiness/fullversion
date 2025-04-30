import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScientificMethodology from '@/components/ScientificMethodology';
import ScientificMethodologyDetail from '@/components/ScientificMethodologyDetail';

const ScientificMethodologyPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Méthodologie Scientifique | Natural Pure Academy"
        description="Découvrez notre approche scientifique rigoureuse qui guide nos recherches et nos recommandations en nutrition et santé."
        canonicalUrl="/methodologie-scientifique"
      />
      <Navbar />
      <ScientificMethodology />
      <ScientificMethodologyDetail />
      <Footer />
    </>
  );
};

export default ScientificMethodologyPage;