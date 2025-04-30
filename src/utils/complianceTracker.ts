
/**
 * Google Ad Grant Compliance Tracker
 * 
 * This utility helps monitor and enforce compliance with Google Ad Grant
 * policies throughout the application. It integrates with other compliance
 * modules to provide centralized monitoring.
 */

import { detectBannedTerms, auditPageContent } from './contentSafety';
import { checkAdGrantCompliance, generateComplianceReport } from './adGrantCompliance';

// Interface for compliance issues
export interface ComplianceIssue {
  id: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  location: string;
  recommendation: string;
  resolved: boolean;
}

class ComplianceTracker {
  private static instance: ComplianceTracker;
  private issues: ComplianceIssue[] = [];
  private listeners: Array<(issues: ComplianceIssue[]) => void> = [];
  private initialized = false;

  private constructor() {
    // Private constructor to enforce singleton
  }

  public static getInstance(): ComplianceTracker {
    if (!ComplianceTracker.instance) {
      ComplianceTracker.instance = new ComplianceTracker();
    }
    return ComplianceTracker.instance;
  }

  /**
   * Initialize the compliance tracker
   */
  public initialize(): void {
    if (this.initialized) return;
    
    // Load any previously stored issues
    try {
      const storedIssues = localStorage.getItem('compliance_issues');
      if (storedIssues) {
        this.issues = JSON.parse(storedIssues);
      }
    } catch (error) {
      console.error('Error loading compliance issues:', error);
    }

    // Set up periodic scanning
    this.setupPeriodicScanning();
    
    this.initialized = true;
    console.log('[ComplianceTracker] Initialized');
  }

  /**
   * Scan the current page for compliance issues
   */
  public scanCurrentPage(): void {
    try {
      const bodyContent = document.body.textContent || '';
      const bannedTerms = detectBannedTerms(bodyContent);
      
      if (bannedTerms.length > 0) {
        const auditResults = auditPageContent(document.body.innerHTML);
        
        this.addIssue({
          id: `page-${window.location.pathname}-${Date.now()}`,
          timestamp: new Date().toISOString(),
          severity: 'high',
          message: `Page contains banned terms: ${bannedTerms.join(', ')}`,
          location: window.location.pathname,
          recommendation: 'Review and replace commercial terms with educational alternatives',
          resolved: false
        });
        
        console.warn('[ComplianceTracker] Detected banned terms:', bannedTerms);
      }
    } catch (error) {
      console.error('Error scanning current page:', error);
    }
  }

  /**
   * Add a compliance issue
   */
  public addIssue(issue: ComplianceIssue): void {
    this.issues.push(issue);
    this.save();
    this.notifyListeners();
  }

  /**
   * Get all active (unresolved) issues
   */
  public getActiveIssues(): ComplianceIssue[] {
    return this.issues.filter(issue => !issue.resolved);
  }

  /**
   * Mark an issue as resolved
   */
  public resolveIssue(id: string): void {
    const issue = this.issues.find(i => i.id === id);
    if (issue) {
      issue.resolved = true;
      this.save();
      this.notifyListeners();
    }
  }

  /**
   * Generate a full compliance report
   */
  public generateReport(): any {
    return generateComplianceReport();
  }

  /**
   * Subscribe to changes in compliance issues
   */
  public subscribe(callback: (issues: ComplianceIssue[]) => void): () => void {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  /**
   * Set up periodic scanning for compliance issues
   */
  private setupPeriodicScanning(): void {
    // Scan on route changes
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      const result = originalPushState.apply(this, args);
      // Wait for DOM to update
      setTimeout(() => ComplianceTracker.getInstance().scanCurrentPage(), 500);
      return result;
    };

    // Scan periodically (every 60 seconds)
    setInterval(() => {
      this.scanCurrentPage();
    }, 60000);

    // Run initial scan
    this.scanCurrentPage();
  }

  /**
   * Save issues to local storage
   */
  private save(): void {
    try {
      localStorage.setItem('compliance_issues', JSON.stringify(this.issues));
    } catch (error) {
      console.error('Error saving compliance issues:', error);
    }
  }

  /**
   * Notify all listeners of changes
   */
  private notifyListeners(): void {
    const activeIssues = this.getActiveIssues();
    this.listeners.forEach(listener => listener(activeIssues));
  }
}

// Export singleton instance
export const complianceTracker = ComplianceTracker.getInstance();

// Export a hook for React components
export const useComplianceTracker = () => {
  const [issues, setIssues] = React.useState<ComplianceIssue[]>([]);
  
  React.useEffect(() => {
    complianceTracker.initialize();
    setIssues(complianceTracker.getActiveIssues());
    
    const unsubscribe = complianceTracker.subscribe(newIssues => {
      setIssues(newIssues);
    });
    
    return unsubscribe;
  }, []);
  
  return {
    issues,
    scanCurrentPage: () => complianceTracker.scanCurrentPage(),
    resolveIssue: (id: string) => complianceTracker.resolveIssue(id),
    generateReport: () => complianceTracker.generateReport()
  };
};
