
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComplianceAuditDashboard from '@/components/ComplianceAuditDashboard';

const AdGrantCompliance: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Google Ad Grant Compliance | Natural Pure Academy</title>
        <meta name="description" content="Monitoring and ensuring compliance with Google Ad Grant requirements for Natural Pure Academy, a non-profit nutrition research organization." />
        <meta name="keywords" content="Google Ad Grant, non-profit, compliance, Natural Pure Academy" />
        <meta name="organization-type" content="nonprofit" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 py-8">
        <ComplianceAuditDashboard />
      </main>
      
      <Footer />
    </div>
  );
};

export default AdGrantCompliance;
