import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { complianceTracker, useComplianceTracker } from '../utils/complianceTracker';
import { getComplianceSummary, runComprehensiveAdGrantAudit } from '../utils/adGrantCompliance';

/**
 * Dashboard displaying Google Ad Grant compliance information
 */
export const ComplianceAuditDashboard = () => {
  const { issues, generateReport } = useComplianceTracker();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize compliance tracker
    complianceTracker.initialize();

    // Load report data
    const loadData = async () => {
      try {
        setLoading(true);
        const auditResults = await runComprehensiveAdGrantAudit();
        const summary = getComplianceSummary();

        setReport({
          auditResults,
          summary,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error loading compliance data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const runNewAudit = async () => {
    setLoading(true);
    try {
      const auditResults = await runComprehensiveAdGrantAudit();
      const newReport = generateReport();
      setReport({
        auditResults,
        summary: getComplianceSummary(),
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error running audit:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p className="text-gray-600">Analyzing compliance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Google Ad Grant Compliance Dashboard</h1>
        <button
          onClick={runNewAudit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Run New Audit
        </button>
      </div>

      {report && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-2">Overall Status</h3>
              <div className={`text-xl font-bold mb-2 ${
                report.auditResults?.overallStatus === 'compliant' 
                  ? 'text-green-600' 
                  : report.auditResults?.overallStatus === 'at_risk' 
                    ? 'text-yellow-600' 
                    : 'text-red-600'
              }`}>
                {report.auditResults?.overallStatus === 'compliant' 
                  ? 'Compliant' 
                  : report.auditResults?.overallStatus === 'at_risk' 
                    ? 'At Risk' 
                    : 'Non-Compliant'}
              </div>
              <p className="text-sm text-gray-600">
                Last updated: {new Date(report.timestamp).toLocaleString()}
              </p>
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-medium mb-2">Open Issues</h3>
              <div className="text-xl font-bold mb-2">
                {issues.length}
              </div>
              <div className="space-y-1 mt-4">
                <div className="flex justify-between text-xs">
                  <span>Critical</span>
                  <span>{issues.filter(i => i.severity === 'critical').length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>High</span>
                  <span>{issues.filter(i => i.severity === 'high').length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Medium</span>
                  <span>{issues.filter(i => i.severity === 'medium').length}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-medium mb-2">CTR Performance</h3>
              <div className="text-xl font-bold mb-2">
                {report.auditResults?.performance?.overallCTR?.toFixed(2)}%
              </div>
              <Progress 
                value={Math.min(report.auditResults?.performance?.overallCTR || 0, 10) * 10} 
                className="h-2"
              />
              <p className="text-xs text-gray-600 mt-2">
                {report.auditResults?.performance?.overallCTR >= 5 
                  ? 'Above the 5% minimum requirement' 
                  : 'Below the 5% minimum requirement'}
              </p>
            </Card>
          </div>

          <Tabs defaultValue="issues">
            <TabsList>
              <TabsTrigger value="issues">Compliance Issues</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="content">Content Quality</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="issues" className="mt-4">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Active Compliance Issues</h3>

                {issues.length === 0 ? (
                  <p className="text-gray-600">No active compliance issues found.</p>
                ) : (
                  <div className="divide-y">
                    {issues.map((issue, index) => (
                      <div key={index} className="py-4">
                        <div className="flex items-start">
                          <div className={`w-3 h-3 rounded-full mt-1.5 mr-3 ${
                            issue.severity === 'critical' ? 'bg-red-500' :
                            issue.severity === 'high' ? 'bg-orange-500' :
                            issue.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`} />
                          <div>
                            <h4 className="font-medium">{issue.message}</h4>
                            <p className="text-sm text-gray-600 mt-1">{issue.location}</p>
                            <p className="text-sm mt-2">{issue.recommendation}</p>
                            <div className="mt-2 flex items-center text-xs text-gray-500">
                              <span>{new Date(issue.timestamp).toLocaleString()}</span>
                              <button
                                onClick={() => complianceTracker.resolveIssue(issue.id)}
                                className="ml-4 text-blue-600 hover:text-blue-800"
                              >
                                Mark as Resolved
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="keywords" className="mt-4">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Keyword Analysis</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Single-Word Keywords</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Google Ad Grants prohibits most single-word keywords (with some exceptions).
                    </p>
                    <div className="flex items-center">
                      <div className="w-full">
                        <Progress 
                          value={Math.min(
                            report.auditResults?.keywords?.singleWordCount > 0 ? 100 : 0, 
                            100
                          )} 
                          className="h-2" 
                        />
                      </div>
                      <span className="ml-4 font-medium">
                        {report.auditResults?.keywords?.singleWordCount || 0}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium">Low Quality Score Keywords</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Keywords with Quality Scores below 3 can impact account performance.
                    </p>
                    <div className="flex items-center">
                      <div className="w-full">
                        <Progress 
                          value={Math.min(
                            report.auditResults?.keywords?.lowQualityScoreCount > 0 ? 100 : 0, 
                            100
                          )} 
                          className="h-2" 
                        />
                      </div>
                      <span className="ml-4 font-medium">
                        {report.auditResults?.keywords?.lowQualityScoreCount || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="mt-4">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Website Content Quality</h3>

                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Quality Score</span>
                  <span className="text-sm font-medium">
                    {Math.round(report.auditResults?.contentQuality?.averageWordCount / 10 || 0)}%
                  </span>
                </div>
                <Progress value={Math.round(report.auditResults?.contentQuality?.averageWordCount / 10 || 0)} className="h-2" />

                <p className="mt-4 text-sm text-gray-600">
                  This score is based on content length, scientific citations, structured data implementation, 
                  and other quality factors that impact Google Ad Grant eligibility.
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="mt-4">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Recommendations</h3>

                <ul className="space-y-2 list-disc list-inside">
                  {report.auditResults?.recommendations?.map((recommendation: string, index: number) => (
                    <li key={index} className="text-gray-700">{recommendation}</li>
                  ))}

                  {(!report.auditResults?.recommendations || report.auditResults.recommendations.length === 0) && (
                    <p className="text-gray-600">No specific recommendations at this time.</p>
                  )}
                </ul>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default ComplianceAuditDashboard;