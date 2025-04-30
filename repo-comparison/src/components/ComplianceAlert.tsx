
import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComplianceAlert: React.FC = () => {
  const [show, setShow] = useState(false);
  const [issues, setIssues] = useState<Array<{
    issue: string;
    severity: string;
  }>>([]);

  useEffect(() => {
    // Check for compliance issues
    const checkForIssues = () => {
      const complianceData = localStorage.getItem('ad_grant_compliance_results');
      if (complianceData) {
        try {
          const parsedData = JSON.parse(complianceData);
          const criticalIssues = parsedData.issues.filter((issue: any) => 
            issue.severity === 'critical' || issue.severity === 'high'
          );
          
          if (criticalIssues.length > 0) {
            setIssues(criticalIssues);
            setShow(true);
          }
        } catch (error) {
          console.error('Error parsing compliance data:', error);
        }
      }
    };
    
    // Check on mount and periodically
    checkForIssues();
    const interval = setInterval(checkForIssues, 300000); // Check every 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  if (!show || issues.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm bg-amber-50 border border-amber-200 rounded-lg shadow-lg p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-amber-800">
            Google Ad Grant Compliance Alert
          </h3>
          <div className="mt-2 text-xs text-amber-700">
            <p>
              {issues.length > 1 
                ? `${issues.length} compliance issues detected that could affect your Google Ad Grant.` 
                : 'A compliance issue was detected that could affect your Google Ad Grant.'}
            </p>
            <ul className="mt-1 list-disc list-inside">
              {issues.slice(0, 2).map((issue, index) => (
                <li key={index}>{issue.issue}</li>
              ))}
              {issues.length > 2 && (
                <li>...and {issues.length - 2} more issues</li>
              )}
            </ul>
          </div>
          <div className="mt-3">
            <Link 
              to="/ad-grant-compliance" 
              className="text-xs font-medium text-amber-800 hover:text-amber-600 underline"
            >
              View Compliance Dashboard
            </Link>
          </div>
        </div>
        <button 
          type="button"
          className="flex-shrink-0 ml-2 text-amber-400 hover:text-amber-500"
          onClick={() => setShow(false)}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ComplianceAlert;
