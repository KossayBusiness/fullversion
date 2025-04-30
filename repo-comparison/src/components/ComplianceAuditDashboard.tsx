import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { getComplianceSummary, autoCheckCompliance, ComplianceIssue } from "@/utils/adGrantCompliance";
import { detectBannedTerms, detectWarningTerms, bannedTerms, warningTerms } from "@/utils/contentSafety";

const ComplianceAuditDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [complianceSummary, setComplianceSummary] = useState({
    isCompliant: false,
    criticalIssuesCount: 0,
    highIssuesCount: 0,
    mediumIssuesCount: 0,
    lastChecked: 'Never'
  });
  const [issues, setIssues] = useState<ComplianceIssue[]>([]);
  const [isRunningCheck, setIsRunningCheck] = useState(false);

  useEffect(() => {
    // Load existing compliance data
    const summary = getComplianceSummary();
    setComplianceSummary(summary);

    // Load issues from localStorage
    const storedIssues = localStorage.getItem('ad_grant_compliance_results');
    if (storedIssues) {
      try {
        const parsedData = JSON.parse(storedIssues);
        setIssues(parsedData.issues || []);
      } catch (error) {
        console.error('Error parsing stored compliance issues:', error);
      }
    }
  }, []);

  const runComplianceCheck = () => {
    setIsRunningCheck(true);
    setTimeout(() => {
      const result = autoCheckCompliance();
      setComplianceSummary({
        isCompliant: result.isCompliant,
        criticalIssuesCount: result.issues.filter(i => i.severity === 'critical').length,
        highIssuesCount: result.issues.filter(i => i.severity === 'high').length,
        mediumIssuesCount: result.issues.filter(i => i.severity === 'medium').length,
        lastChecked: result.lastChecked
      });
      setIssues(result.issues);
      setIsRunningCheck(false);
    }, 1500);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Google Ad Grant Compliance Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Compliance Status</CardTitle>
            <CardDescription>Overall Ad Grant compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              {complianceSummary.isCompliant ? (
                <CheckCircle className="h-16 w-16 text-green-500" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500" />
              )}
            </div>
            <p className="text-center text-xl font-medium">
              {complianceSummary.isCompliant ? 'Compliant' : 'Not Compliant'}
            </p>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Last checked: {new Date(complianceSummary.lastChecked).toLocaleString()}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Issues Summary</CardTitle>
            <CardDescription>Breakdown by severity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  <span>Critical Issues</span>
                </div>
                <span className="font-bold">{complianceSummary.criticalIssuesCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                  <span>High Severity</span>
                </div>
                <span className="font-bold">{complianceSummary.highIssuesCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Medium Severity</span>
                </div>
                <span className="font-bold">{complianceSummary.mediumIssuesCount}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={runComplianceCheck}
              disabled={isRunningCheck}
            >
              {isRunningCheck ? 'Running check...' : 'Run New Check'}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Terms to Avoid</CardTitle>
            <CardDescription>Per Google Ad Grant policy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm mb-1">Banned Terms</h3>
                <div className="flex flex-wrap gap-1">
                  {bannedTerms.slice(0, 8).map((term, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-xs"
                    >
                      {term}
                    </span>
                  ))}
                  {bannedTerms.length > 8 && (
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                      +{bannedTerms.length - 8} more
                    </span>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1">Warning Terms</h3>
                <div className="flex flex-wrap gap-1">
                  {warningTerms.slice(0, 8).map((term, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs"
                    >
                      {term}
                    </span>
                  ))}
                  {warningTerms.length > 8 && (
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                      +{warningTerms.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="issues">Detected Issues</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Overview</CardTitle>
              <CardDescription>
                Summary of your Google Ad Grant compliance status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Key Requirements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-5 w-5 mr-2 mt-0.5">
                        {complianceSummary.isCompliant ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">Valid Non-profit Status</p>
                        <p className="text-sm text-muted-foreground">
                          Organization must be a valid 501(c)(3) with proper verification
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 mr-2 mt-0.5">
                        {complianceSummary.highIssuesCount === 0 ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">No Single-word Keywords</p>
                        <p className="text-sm text-muted-foreground">
                          Keywords must contain 2+ words (except for branded terms)
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 mr-2 mt-0.5">
                        {complianceSummary.criticalIssuesCount === 0 ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">No Commercial Content</p>
                        <p className="text-sm text-muted-foreground">
                          Site cannot contain e-commerce, product sales, or donation solicitations
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 mr-2 mt-0.5">
                        {complianceSummary.mediumIssuesCount === 0 ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">Quality Content</p>
                        <p className="text-sm text-muted-foreground">
                          Site must provide high-quality, original educational content
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={runComplianceCheck}>
                Refresh Compliance Status
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detected Compliance Issues</CardTitle>
              <CardDescription>
                These issues may affect your Google Ad Grant eligibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              {issues.length === 0 ? (
                <div className="py-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-medium">No issues detected!</p>
                  <p className="text-muted-foreground">
                    Your site appears to be compliant with Google Ad Grant policies.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {issues.map((issue, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <div className="flex items-start">
                        <div className="mt-1 mr-3">
                          {getSeverityIcon(issue.severity)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{issue.issue}</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Affected: <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">{issue.affectedElement}</code>
                          </p>
                          <p className="text-sm">{issue.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={runComplianceCheck}>
                Run New Compliance Check
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="guidelines" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Google Ad Grant Guidelines</CardTitle>
              <CardDescription>
                Key policies to maintain compliance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Account Structure Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Maintain a minimum 5% click-through rate (CTR)</li>
                  <li>Have at least 2 ad groups per campaign</li>
                  <li>Have at least 2 ads per ad group</li>
                  <li>Have at least 2 sitelink ad extensions</li>
                  <li>Set up geo-targeting appropriate for your organization</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Keyword Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>No single-word keywords (except for branded terms)</li>
                  <li>No overly generic keywords</li>
                  <li>All keywords must have quality scores of 3 or higher</li>
                  <li>Maintain keyword relevance to your organization's mission</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Website Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Commercial activity restricted (no sales, donations via ads)</li>
                  <li>Clear declaration of non-profit status</li>
                  <li>High-quality, relevant content related to your mission</li>
                  <li>Secure website with HTTPS enabled</li>
                  <li>Good user experience with minimal ads</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Maintenance Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Log in to your Google Ads account monthly</li>
                  <li>Implement conversion tracking</li>
                  <li>Respond to program surveys</li>
                  <li>Keep accurate and up-to-date contact information</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <a 
                href="https://support.google.com/grants/answer/9042207" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                View Complete Google Ad Grant Policies →
              </a>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceAuditDashboard;