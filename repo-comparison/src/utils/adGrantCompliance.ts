/**
 * Google Ad Grant Compliance Utility
 * 
 * This file contains utilities to help ensure our website remains compliant with
 * Google Ad Grant policies, including tracking CTR, maintaining quality content,
 * and ensuring proper conversion tracking.
 */

import { auditPageContent, detectBannedTerms, isUrlCompliant as contentSafetyUrlCheck } from './contentSafety';

// Banned keywords for Google Ad Grants according to policy
const BANNED_SINGLE_KEYWORDS = [
  'donate', 'donation', 'download', 'course', 'training', 'webinar',
  'quiz', 'poll', 'vote', 'news', 'blog', 'event', 'info', 'information',
  'learn', 'report', 'whitepaper', 'guide', 'ebook', 'book'
];

// Exception for single-word keywords (allowed by Google)
const SINGLE_KEYWORD_EXCEPTIONS = [
  // Brand terms
  'naturalpure', 'nonprofit',
  // Medical conditions
  'cancer', 'diabetes', 'alzheimer', 'autism', 'adhd', 'covid',
  // Other allowed exceptions
  'donate', 'volunteer', 'charity'
];

// Types for Google Ad Grant compliance
export interface ComplianceIssue {
  issue: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  affectedElement: string;
  recommendation: string;
  detectedAt: string;
}

export interface ComplianceCheckResult {
  isCompliant: boolean;
  issues: ComplianceIssue[];
  lastChecked: string;
}

// Track Ad performance metrics
export const trackAdPerformance = (data: {
  campaignId: string;
  adGroupId: string;
  adId: string;
  action: 'impression' | 'click' | 'conversion';
  conversionType?: string;
  value?: number;
}) => {
  try {
    // Get or initialize the ad performance tracking data
    const adPerformanceKey = 'ad_grant_performance';
    const performanceData = JSON.parse(localStorage.getItem(adPerformanceKey) || '{}');

    const campaign = performanceData[data.campaignId] || { 
      impressions: 0, 
      clicks: 0, 
      conversions: 0,
      ctr: 0,
      conversionRate: 0,
      adGroups: {}
    };

    const adGroup = campaign.adGroups[data.adGroupId] || {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0,
      conversionRate: 0,
      ads: {}
    };

    const ad = adGroup.ads[data.adId] || {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0,
      conversionRate: 0,
      lastUpdate: new Date().toISOString()
    };

    // Update metrics based on action
    switch(data.action) {
      case 'impression':
        ad.impressions += 1;
        adGroup.impressions += 1;
        campaign.impressions += 1;
        break;
      case 'click':
        ad.clicks += 1;
        adGroup.clicks += 1;
        campaign.clicks += 1;
        break;
      case 'conversion':
        ad.conversions += 1;
        adGroup.conversions += 1;
        campaign.conversions += 1;

        // Track detailed conversion info
        const conversionData = {
          type: data.conversionType || 'general',
          timestamp: new Date().toISOString(),
          value: data.value || 0,
          adId: data.adId,
          adGroupId: data.adGroupId,
          campaignId: data.campaignId
        };

        const conversions = JSON.parse(localStorage.getItem('ad_grant_conversions') || '[]');
        conversions.push(conversionData);
        localStorage.setItem('ad_grant_conversions', JSON.stringify(conversions.slice(-100)));
        break;
    }

    // Calculate rates
    ad.ctr = ad.impressions > 0 ? (ad.clicks / ad.impressions) * 100 : 0;
    ad.conversionRate = ad.clicks > 0 ? (ad.conversions / ad.clicks) * 100 : 0;
    ad.lastUpdate = new Date().toISOString();

    adGroup.ctr = adGroup.impressions > 0 ? (adGroup.clicks / adGroup.impressions) * 100 : 0;
    adGroup.conversionRate = adGroup.clicks > 0 ? (adGroup.conversions / adGroup.clicks) * 100 : 0;
    adGroup.ads[data.adId] = ad;

    campaign.ctr = campaign.impressions > 0 ? (campaign.clicks / campaign.impressions) * 100 : 0;
    campaign.conversionRate = campaign.clicks > 0 ? (campaign.conversions / campaign.clicks) * 100 : 0;
    campaign.adGroups[data.adGroupId] = adGroup;

    performanceData[data.campaignId] = campaign;

    // Save updated data
    localStorage.setItem(adPerformanceKey, JSON.stringify(performanceData));

    // Check for potential compliance issues
    checkAdGrantCompliance(performanceData);

    console.log('[GoogleAdGrants] Tracked ad performance:', data.action);
  } catch (error) {
    console.error('Error tracking ad performance:', error);
  }
};

// Check for Ad Grant compliance issues
export const checkAdGrantCompliance = (performanceData: any) => {
  try {
    if (!performanceData || typeof performanceData !== 'object') {
      console.error('Invalid performance data provided to checkAdGrantCompliance');
      return;
    }

    const issues: Array<ComplianceIssue> = [];

    // Check CTR across campaigns (Google requires 5% CTR)
    Object.entries(performanceData).forEach(([campaignId, campaign]: [string, any]) => {
      // Check campaign-level CTR compliance
      if (campaign && campaign.impressions > 100 && campaign.ctr < 5) {
        issues.push({
          issue: `Campaign ${campaignId} has CTR below 5% (${campaign.ctr.toFixed(2)}%)`,
          severity: 'critical',
          affectedElement: `campaign:${campaignId}`,
          recommendation: 'Review ad copy, keywords, and landing pages. Consider pausing underperforming ads.',
          detectedAt: new Date().toISOString()
        });
      }

      // Check for keywords with Quality Score < 3
      if (campaign && campaign.adGroups) {
        Object.entries(campaign.adGroups).forEach(([adGroupId, adGroup]: [string, any]) => {
          if (adGroup && adGroup.qualityScore && adGroup.qualityScore < 3) {
            issues.push({
              issue: `Ad Group ${adGroupId} in Campaign ${campaignId} has low Quality Score (${adGroup.qualityScore})`,
              severity: 'high',
              affectedElement: `adgroup:${campaignId}:${adGroupId}`,
              recommendation: 'Improve landing page relevance and ad quality for this ad group.',
              detectedAt: new Date().toISOString()
            });
          }

          // Check for single-word keywords
          if (adGroup && adGroup.keywords) {
            adGroup.keywords.forEach((keyword: any) => {
              if (keyword && keyword.text && keyword.text.split(' ').length === 1) {
                issues.push({
                  issue: `Single-word keyword detected: "${keyword.text}"`,
                  severity: 'high',
                  affectedElement: `keyword:${keyword.id}`,
                  recommendation: 'Remove or expand this single-word keyword to comply with Google Ad Grant policy.',
                  detectedAt: new Date().toISOString()
                });
              }
            });
          }
        });
      }
    });

    // Check for geographic targeting
    const geoTargetingData = JSON.parse(localStorage.getItem('ad_grant_geo_targeting') || '{}');
    if (!geoTargetingData.isConfigured) {
      issues.push({
        issue: 'Geographic targeting not properly configured',
        severity: 'medium',
        affectedElement: 'account:settings',
        recommendation: 'Set up proper geographic targeting for all campaigns to comply with Google Ad Grant requirements.',
        detectedAt: new Date().toISOString()
      });
    }

    // Utilisation de la fonction importée de contentSafety
    // pour la vérification de conformité des URLs

// Check for conversion tracking
    const conversionTrackingData = JSON.parse(localStorage.getItem('ad_grant_conversion_tracking') || '{}');
    if (!conversionTrackingData.isConfigured) {
      issues.push({
        issue: 'Conversion tracking not properly configured',
        severity: 'high',
        affectedElement: 'account:settings',
        recommendation: 'Set up at least one conversion action to comply with Google Ad Grant requirements.',
        detectedAt: new Date().toISOString()
      });
    }

    // Store compliance issues for reporting
    if (issues.length > 0) {
      const complianceIssues = JSON.parse(localStorage.getItem('ad_grant_compliance_issues') || '[]');

      issues.forEach(issue => {
        complianceIssues.push({
          ...issue,
          detectedAt: new Date().toISOString()
        });
      });

      // Keep only last 100 issues
      const recentIssues = complianceIssues.slice(-100);
      localStorage.setItem('ad_grant_compliance_issues', JSON.stringify(recentIssues));
    }

    return issues;
  } catch (error) {
    console.error('Error checking Ad Grant compliance:', error);
    return [];
  }
};

// Generate a compliance report for monitoring
export const generateComplianceReport = () => {
  try {
    const performanceData = JSON.parse(localStorage.getItem('ad_grant_performance') || '{}');
    const complianceIssues = JSON.parse(localStorage.getItem('ad_grant_compliance_issues') || '[]');
    const conversions = JSON.parse(localStorage.getItem('ad_grant_conversions') || '[]');
    const contentMetrics = JSON.parse(localStorage.getItem('content_quality_metrics') || '{}');

    // Calculate overall metrics
    let totalImpressions = 0;
    let totalClicks = 0;
    let totalConversions = 0;

    Object.values(performanceData).forEach((campaign: any) => {
      totalImpressions += campaign.impressions || 0;
      totalClicks += campaign.clicks || 0;
      totalConversions += campaign.conversions || 0;
    });

    const overallCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const overallConversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

    // Count open issues by severity
    const openIssuesBySeverity = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0
    };

    complianceIssues
      .filter((issue: any) => issue.status === 'open')
      .forEach((issue: any) => {
        if (issue.severity) {
          openIssuesBySeverity[issue.severity]++;
        }
      });

    // Evaluate content quality
    const contentQualityScore = Object.values(contentMetrics).reduce((sum: number, page: any) => {
      // Calculate page quality score (0-100)
      let pageScore = 0;
      if (page.wordCount >= 300) pageScore += 25;
      if (page.readTime >= 2) pageScore += 25;
      if (page.hasScientificCitations) pageScore += 25;
      if (page.hasStructuredData) pageScore += 25;
      return sum + pageScore;
    }, 0) / (Object.keys(contentMetrics).length || 1);

    // Generate report
    const report = {
      timestamp: new Date().toISOString(),
      metrics: {
        impressions: totalImpressions,
        clicks: totalClicks,
        conversions: totalConversions,
        ctr: overallCTR,
        conversionRate: overallConversionRate
      },
      compliance: {
        isCTRCompliant: overallCTR >= 5,
        openIssuesCount: complianceIssues.filter((issue: any) => issue.status === 'open').length,
        openIssuesBySeverity,
        hasActiveConversions: conversions.length > 0,
        lastConversion: conversions.length > 0 ? conversions[conversions.length - 1].timestamp : null,
        contentQualityScore,
        isFullyCompliant: overallCTR >= 5 && 
                          openIssuesBySeverity.critical === 0 && 
                          openIssuesBySeverity.high === 0 &&
                          conversions.length > 0 &&
                          contentQualityScore >= 70
      },
      websiteAudit: {
        // Run a live audit on the current page
        currentPage: window.location.pathname,
        contentSafetyCheck: auditPageContent(document.body.innerHTML),
        urlCompliance: contentSafetyUrlCheck(window.location.href), // Using the imported function
        detectedBannedTerms: detectBannedTerms(document.body.textContent || '')
      },
      recommendations: generateComplianceRecommendations(
        openIssuesBySeverity, 
        overallCTR, 
        contentQualityScore, 
        conversions.length > 0
      )
    };

    // Store the report
    const reports = JSON.parse(localStorage.getItem('ad_grant_compliance_reports') || '[]');
    reports.push(report);
    localStorage.setItem('ad_grant_compliance_reports', JSON.stringify(reports.slice(-20)));

    console.log('[GoogleAdGrants] Generated compliance report:', report);
    return report;
  } catch (error) {
    console.error('Error generating compliance report:', error);
    return null;
  }
};

// Generate recommendations based on compliance status
const generateComplianceRecommendations = (
  issues: {critical: number, high: number, medium: number, low: number},
  ctr: number,
  contentQualityScore: number,
  hasConversions: boolean
) => {
  const recommendations: string[] = [];

  // Critical issues
  if (issues.critical > 0) {
    recommendations.push('Immediately address critical compliance issues to avoid account suspension.');
  }

  // CTR issues
  if (ctr < 5) {
    recommendations.push('Improve overall CTR by optimizing ad copy, keywords, and landing pages.');
    if (ctr < 3) {
      recommendations.push('Consider pausing campaigns with extremely low CTR to avoid account suspension.');
    }
  }

  // Conversion tracking
  if (!hasConversions) {
    recommendations.push('Set up conversion tracking and ensure at least one meaningful conversion action is configured.');
  }

  // Content quality
  if (contentQualityScore < 70) {
    recommendations.push('Improve content quality by adding more detailed information, scientific citations, and structured data.');
  }

  // Account structure
  if (issues.medium > 0) {
    recommendations.push('Review account structure to ensure each campaign has at least 2 ad groups and each ad group has at least 2 ads.');
  }

  // Keywords
  if (issues.high > 0) {
    recommendations.push('Check for and remove single-word keywords (except allowed exceptions like brand terms and medical conditions).');
  }

  return recommendations;
};

// Track content quality metrics (important for Ad Grants)
export const trackContentQuality = (path: string, metrics: {
  wordCount: number;
  readTime: number;
  hasScientificCitations: boolean;
  hasStructuredData: boolean;
}) => {
  try {
    const contentMetrics = JSON.parse(localStorage.getItem('content_quality_metrics') || '{}');

    contentMetrics[path] = {
      ...metrics,
      lastUpdated: new Date().toISOString()
    };

    localStorage.setItem('content_quality_metrics', JSON.stringify(contentMetrics));
    console.log('[GoogleAdGrants] Tracked content quality for:', path);
  } catch (error) {
    console.error('Error tracking content quality:', error);
  }
};

// Check if a keyword is compliant with Google Ad Grant policies
export const isKeywordCompliant = (keyword: string): {
  isCompliant: boolean;
  reason?: string;
  suggestion?: string;
} => {
  // Check if it's a single-word keyword
  const words = keyword.trim().split(/\s+/);

  if (words.length === 1) {
    // Check if it's an allowed exception
    if (SINGLE_KEYWORD_EXCEPTIONS.includes(keyword.toLowerCase())) {
      return { 
        isCompliant: true 
      };
    }

    return {
      isCompliant: false,
      reason: 'Single-word keywords are not allowed by Google Ad Grant policies (with some exceptions)',
      suggestion: `Consider expanding "${keyword}" to a more specific phrase like "${keyword} research" or "${keyword} nonprofit"`
    };
  }

  // Check if it's a common banned keyword
  if (BANNED_SINGLE_KEYWORDS.includes(words[0].toLowerCase())) {
    return {
      isCompliant: false,
      reason: `"${words[0]}" is a commonly banned term for Google Ad Grants when used as the first word`,
      suggestion: `Consider rephrasing to be more specific about your organization's offering`
    };
  }

  // Check for generic or overly broad terms
  const genericPhrases = [
    'free videos', 'cool videos', 'today news', 'youtube videos',
    'email', 'video', 'facebook', 'twitter', 'latest', 'online',
    'actus', 'vidéos gratuites', 'vidéos cool', 'nouvelles du jour'
  ];

  if (genericPhrases.some(phrase => keyword.toLowerCase().includes(phrase))) {
    return {
      isCompliant: false,
      reason: 'Keyword contains generic or overly broad terms',
      suggestion: 'Replace with more specific terms related to your mission'
    };
  }

  return {
    isCompliant: true
  };
};

// Run a comprehensive audit of the Google Ad Grant account
export const runComprehensiveAdGrantAudit = async () => {
  const auditResults = {
    timestamp: new Date().toISOString(),
    accountStructure: {
      campaigns: 0,
      adGroups: 0,
      ads: 0,
      keywords: 0,
      issues: [] as string[]
    },
    performance: {
      overallCTR: 0,
      conversionRate: 0,
      issues: [] as string[]
    },
    keywords: {
      singleWordCount: 0,
      lowQualityScoreCount: 0,
      issues: [] as string[]
    },
    contentQuality: {
      averageWordCount: 0,
      pagesWithCitations: 0,
      issues: [] as string[]
    },
    websiteCompliance: {
      scannedPages: 0,
      pagesWithIssues: 0,
      issues: [] as string[]
    },
    overallStatus: 'unknown' as 'compliant' | 'at_risk' | 'non_compliant' | 'unknown'
  };

  try {
    // Analyze account structure
    const performanceData = JSON.parse(localStorage.getItem('ad_grant_performance') || '{}');

    let totalCampaigns = Object.keys(performanceData).length;
    let totalAdGroups = 0;
    let totalAds = 0;
    let totalImpressions = 0;
    let totalClicks = 0;
    let totalConversions = 0;

    Object.values(performanceData).forEach((campaign: any) => {
      totalImpressions += campaign.impressions || 0;
      totalClicks += campaign.clicks || 0;
      totalConversions += campaign.conversions || 0;

      if (campaign.adGroups) {
        const adGroupCount = Object.keys(campaign.adGroups).length;
        totalAdGroups += adGroupCount;

        if (adGroupCount < 2) {
          auditResults.accountStructure.issues.push(
            `Campaign ${campaign.id || 'unknown'} has only ${adGroupCount} ad group(s) (minimum 2 required)`
          );
        }

        Object.values(campaign.adGroups).forEach((adGroup: any) => {
          if (adGroup.ads) {
            const adCount = Object.keys(adGroup.ads).length;
            totalAds += adCount;

            if (adCount < 2) {
              auditResults.accountStructure.issues.push(
                `Ad Group ${adGroup.id || 'unknown'} has only ${adCount} ad(s) (minimum 2 required)`
              );
            }
          }
        });
      }
    });

    auditResults.accountStructure.campaigns = totalCampaigns;
    auditResults.accountStructure.adGroups = totalAdGroups;
    auditResults.accountStructure.ads = totalAds;

    if (totalCampaigns < 1) {
      auditResults.accountStructure.issues.push('No campaigns found in the account');
    }

    // Analyze performance
    auditResults.performance.overallCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    auditResults.performance.conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

    if (auditResults.performance.overallCTR < 5 && totalImpressions > 100) {
      auditResults.performance.issues.push(`Overall CTR (${auditResults.performance.overallCTR.toFixed(2)}%) is below the 5% minimum requirement`);
    }

    if (totalConversions === 0 && totalClicks > 0) {
      auditResults.performance.issues.push('No conversions recorded - conversion tracking may not be properly set up');
    }

    // Analyze keywords
    const keywordsData = JSON.parse(localStorage.getItem('ad_grant_keywords') || '[]');

    auditResults.keywords.singleWordCount = keywordsData.filter((kw: any) => 
      kw.text.split(/\s+/).length === 1 && 
      !SINGLE_KEYWORD_EXCEPTIONS.includes(kw.text.toLowerCase())
    ).length;

    auditResults.keywords.lowQualityScoreCount = keywordsData.filter((kw: any) => 
      kw.qualityScore && kw.qualityScore < 3
    ).length;

    if (auditResults.keywords.singleWordCount > 0) {
      auditResults.keywords.issues.push(`Found ${auditResults.keywords.singleWordCount} non-compliant single-word keywords`);
    }

    if (auditResults.keywords.lowQualityScoreCount > 0) {
      auditResults.keywords.issues.push(`Found ${auditResults.keywords.lowQualityScoreCount} keywords with Quality Score below 3`);
    }

    // Analyze content quality
    const contentMetrics = JSON.parse(localStorage.getItem('content_quality_metrics') || '{}');
    const pages = Object.values(contentMetrics);

    if (pages.length > 0) {
      auditResults.contentQuality.averageWordCount = pages.reduce((sum: number, page: any) => sum + (page.wordCount || 0), 0) / pages.length;
      auditResults.contentQuality.pagesWithCitations = pages.filter((page: any) => page.hasScientificCitations).length;

      if (auditResults.contentQuality.averageWordCount < 300) {
        auditResults.contentQuality.issues.push('Average page word count is below 300 words, which may be considered thin content');
      }
    } else {
      auditResults.contentQuality.issues.push('No content quality metrics recorded - consider implementing tracking');
    }

    // Analyze website compliance based on stored issues
    const complianceIssues = JSON.parse(localStorage.getItem('ad_grant_compliance_issues') || '[]');
    const websiteIssues = complianceIssues.filter((issue: any) => 
      issue.status === 'open' && 
      issue.timestamp && 
      new Date(issue.timestamp) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
    );

    if (websiteIssues.length > 0) {
      auditResults.websiteCompliance.pagesWithIssues = websiteIssues.length;
      auditResults.websiteCompliance.issues = websiteIssues.map((issue: any) => issue.issue);
    }

    // Determine overall status
    const criticalIssues = [
      auditResults.performance.overallCTR < 5 && totalImpressions > 100,
      auditResults.keywords.singleWordCount > 0,
      auditResults.accountStructure.campaigns === 0
    ];

    const highRiskIssues = [
      auditResults.keywords.lowQualityScoreCount > 0,
      totalConversions === 0 && totalClicks > 50,
      auditResults.accountStructure.issues.length > 0
    ];

    if (criticalIssues.some(issue => issue)) {
      auditResults.overallStatus = 'non_compliant';
    } else if (highRiskIssues.some(issue => issue)) {
      auditResults.overallStatus = 'at_risk';
    } else if (auditResults.accountStructure.campaigns > 0) {
      auditResults.overallStatus = 'compliant';
    }

    // Store the audit results
    const audits = JSON.parse(localStorage.getItem('ad_grant_audits') || '[]');
    audits.push(auditResults);
    localStorage.setItem('ad_grant_audits', JSON.stringify(audits.slice(-10)));

    console.log('[GoogleAdGrants] Comprehensive audit completed:', auditResults);
    return auditResults;
  } catch (error) {
    console.error('Error performing comprehensive audit:', error);
    return {
      ...auditResults,
      error: String(error)
    };
  }
};

// Automatically check for Ad Grant compliance issues based on site content
export const autoCheckCompliance = (): ComplianceCheckResult => {
  console.log('[GoogleAdGrantsSafety] Running automatic compliance check...');

  const issues: ComplianceIssue[] = [];

  // Check for single-word keywords in meta tags
  const metaTags = document.querySelectorAll('meta[name="keywords"]');
  metaTags.forEach(tag => {
    const content = tag.getAttribute('content') || '';
    const keywords = content.split(',').map(k => k.trim());

    keywords.forEach(keyword => {
      if (keyword.split(' ').length === 1 && keyword.length > 2) {
        issues.push({
          issue: `Single-word keyword detected: "${keyword}"`,
          severity: 'high',
          affectedElement: 'meta:keywords',
          recommendation: 'Remove or expand this single-word keyword to comply with Google Ad Grant policy.',
          detectedAt: new Date().toISOString()
        });
      }
    });
  });

  // Check for commercial content
  const bodyText = document.body.textContent?.toLowerCase() || '';
  const commercialPatterns = [
    /buy now|acheter maintenant|add to cart|ajouter au panier|purchase|achat|shopping cart|panier d'achat/gi,
    /\$\d+|\d+\s?\$|€\d+|\d+\s?€|\d+\s?USD|\d+\s?EUR/gi
  ];

  commercialPatterns.forEach((pattern, index) => {
    const matches = bodyText.match(pattern);
    if (matches && matches.length > 0) {
      issues.push({
        issue: `Commercial content detected: ${matches.slice(0, 3).join(', ')}${matches.length > 3 ? '...' : ''}`,
        severity: 'critical',
        affectedElement: 'body:content',
        recommendation: index === 0 ? 'Remove commercial calls-to-action to comply with Google Ad Grant policy.' : 'Remove pricing information to comply with Google Ad Grant policy.',
        detectedAt: new Date().toISOString()
      });
    }
  });

  // Check for non-profit status verification
  const hasNonprofitMeta = document.querySelector('meta[name="organization-type"][content="nonprofit"]');
  if (!hasNonprofitMeta) {
    issues.push({
      issue: 'Missing explicit non-profit status declaration',
      severity: 'medium',
      affectedElement: 'meta:organization-type',
      recommendation: 'Add a meta tag declaring your organization type as non-profit for Google Ad Grant compliance.',
      detectedAt: new Date().toISOString()
    });
  }

  // Check for educational content quality
  const paragraphs = document.querySelectorAll('p');
  let shortParagraphCount = 0;

  paragraphs.forEach(paragraph => {
    const text = paragraph.textContent || '';
    if (text.split(' ').length < 15 && text.length > 10) {
      shortParagraphCount++;
    }
  });

  if (paragraphs.length > 5 && shortParagraphCount / paragraphs.length > 0.7) {
    issues.push({
      issue: 'Content quality may be insufficient for Google Ad Grant',
      severity: 'medium',
      affectedElement: 'content:quality',
      recommendation: 'Improve content depth and educational value by expanding paragraphs with more substantial information.',
      detectedAt: new Date().toISOString()
    });
  }

  // Store results in localStorage for dashboard
  const result: ComplianceCheckResult = {
    isCompliant: issues.length === 0,
    issues,
    lastChecked: new Date().toISOString()
  };

  localStorage.setItem('ad_grant_compliance_results', JSON.stringify(result));
  console.log(`[GoogleAdGrantsSafety] Compliance check complete. Found ${issues.length} issues.`);

  return result;
};

// Get compliance summary for dashboard
export const getComplianceSummary = (): {
  isCompliant: boolean;
  criticalIssuesCount: number;
  highIssuesCount: number;
  mediumIssuesCount: number;
  lastChecked: string;
} => {
  try {
    const resultJson = localStorage.getItem('ad_grant_compliance_results');
    if (!resultJson) {
      return {
        isCompliant: false,
        criticalIssuesCount: 0,
        highIssuesCount: 0,
        mediumIssuesCount: 0,
        lastChecked: 'Never'
      };
    }

    const result: ComplianceCheckResult = JSON.parse(resultJson);

    return {
      isCompliant: result.isCompliant,
      criticalIssuesCount: result.issues.filter(i => i.severity === 'critical').length,
      highIssuesCount: result.issues.filter(i => i.severity === 'high').length,
      mediumIssuesCount: result.issues.filter(i => i.severity === 'medium').length,
      lastChecked: result.lastChecked
    };
  } catch (error) {
    console.error('Error getting compliance summary:', error);
    return {
      isCompliant: false,
      criticalIssuesCount: 0,
      highIssuesCount: 0,
      mediumIssuesCount: 0,
      lastChecked: 'Error'
    };
  }
};

// Simplified function to automatically run a compliance check
export const simplifiedAutoCheckCompliance = () => {
  try {
    // Check content compliance on the current page
    const pageContent = document.body.textContent?.toLowerCase() || '';
    const foundTerms = detectBannedTerms(pageContent);

    if (foundTerms.length > 0) {
      console.warn("[GoogleAdGrantsSafety] Detected potentially problematic terms:", foundTerms);
      const auditResults = auditPageContent(document.body.innerHTML);

      // Store the content issue for reporting
      const complianceIssues = JSON.parse(localStorage.getItem('ad_grant_compliance_issues') || '[]');

      complianceIssues.push({
        issue: `Page ${window.location.pathname} contains banned terms: ${foundTerms.join(', ')}`,
        severity: 'high',
        affectedElement: `page:${window.location.pathname}`,
        recommendation: 'Review and remove these terms to maintain Google Ad Grant compliance',
        detectedAt: new Date().toISOString(),
        status: 'open'
      });

      localStorage.setItem('ad_grant_compliance_issues', JSON.stringify(complianceIssues.slice(-100)));
    }

    // Check ad performance and CTR compliance periodically
    const performanceData = JSON.parse(localStorage.getItem('ad_grant_performance') || '{}');
    checkAdGrantCompliance(performanceData);

    // Generate regular compliance reports
    if (Math.random() < 0.1) { // 10% chance to generate a report (to avoid too frequent reports)
      generateComplianceReport();
    }

    // Run comprehensive audit less frequently (approximately weekly)
    const lastAuditTime = localStorage.getItem('last_comprehensive_audit_time');
    if (!lastAuditTime || new Date(lastAuditTime) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
      runComprehensiveAdGrantAudit();
      localStorage.setItem('last_comprehensive_audit_time', new Date().toISOString());
    }
  } catch (error) {
    console.error('Error in automatic compliance check:', error);
  }
};