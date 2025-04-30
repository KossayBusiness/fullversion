
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
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Google Ad Grant Compliance Dashboard</h1>
          <p className="mb-8">Monitor and manage your Google Ad Grant compliance status to maintain eligibility for the program.</p>
          <ComplianceAuditDashboard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdGrantCompliance;
