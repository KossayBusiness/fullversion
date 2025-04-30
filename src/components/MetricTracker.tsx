
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface SiteMetrics {
  pageViews: number;
  sessions: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversionRate: number;
}

const MetricTracker = () => {
  const location = useLocation();
  const [metrics, setMetrics] = useState<SiteMetrics>({
    pageViews: 0,
    sessions: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    conversionRate: 0
  });
  
  // Session tracking
  const sessionStartTime = useRef(Date.now());
  const pageViewCount = useRef(0);
  const hasInteracted = useRef(false);
  const sessionId = useRef(generateSessionId());
  const timer = useRef<NodeJS.Timeout | null>(null);
  
  // Generate a session ID
  function generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
  
  // Start a new session if needed
  useEffect(() => {
    const isNewSession = () => {
      const lastSessionTime = localStorage.getItem('last_session_time');
      // Session timeout: 30 minutes (1800000 ms)
      if (!lastSessionTime || Date.now() - parseInt(lastSessionTime) > 1800000) {
        return true;
      }
      return false;
    };
    
    // Check if this is a new session
    if (isNewSession()) {
      // Reset session data
      sessionStartTime.current = Date.now();
      pageViewCount.current = 0;
      hasInteracted.current = false;
      sessionId.current = generateSessionId();
      
      // Store session start data
      localStorage.setItem('last_session_time', Date.now().toString());
      localStorage.setItem('current_session_id', sessionId.current);
      localStorage.setItem('session_start_time', sessionStartTime.current.toString());
      
      // Track new session
      trackEvent({
        event_name: 'session_start',
        session_id: sessionId.current,
        referrer: document.referrer,
        landing_page: location.pathname
      });
      
      // Update metrics
      updateSessionMetrics(true);
    } else {
      // Continue existing session
      sessionId.current = localStorage.getItem('current_session_id') || sessionId.current;
      const storedStartTime = localStorage.getItem('session_start_time');
      if (storedStartTime) {
        sessionStartTime.current = parseInt(storedStartTime);
      }
      
      // Update last activity time
      localStorage.setItem('last_session_time', Date.now().toString());
    }
    
    // Track page view
    pageViewCount.current += 1;
    localStorage.setItem('session_page_views', pageViewCount.current.toString());
    
    // Track page view event
    trackEvent({
      event_name: 'page_view',
      session_id: sessionId.current,
      page_path: location.pathname,
      page_view_count: pageViewCount.current
    });
    
    // Update metrics on regular intervals
    if (timer.current) {
      clearInterval(timer.current);
    }
    
    timer.current = setInterval(() => {
      updateSessionMetrics();
    }, 60000); // Update every minute
    
    // Clean up timer
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [location.pathname]);
  
  // Track user interactions to calculate bounce rate
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        localStorage.setItem('session_has_interacted', 'true');
      }
    };
    
    // Track meaningful interactions
    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, []);
  
  // Track session end
  useEffect(() => {
    const handleBeforeUnload = () => {
      const sessionDuration = (Date.now() - sessionStartTime.current) / 1000; // in seconds
      
      // Track session duration
      trackEvent({
        event_name: 'session_duration_update',
        session_id: sessionId.current,
        duration_seconds: sessionDuration,
        page_view_count: pageViewCount.current,
        has_interacted: hasInteracted.current
      });
      
      // Save data for bounce rate calculation
      const bounceSessions = JSON.parse(localStorage.getItem('bounce_sessions') || '[]');
      bounceSessions.push({
        session_id: sessionId.current,
        was_bounce: pageViewCount.current === 1 && !hasInteracted.current,
        timestamp: new Date().toISOString()
      });
      
      // Keep only the last 100 sessions for calculation
      localStorage.setItem('bounce_sessions', JSON.stringify(bounceSessions.slice(-100)));
      
      // Add to session durations for average calculation
      const sessionDurations = JSON.parse(localStorage.getItem('session_durations') || '[]');
      sessionDurations.push({
        session_id: sessionId.current,
        duration_seconds: sessionDuration,
        timestamp: new Date().toISOString()
      });
      
      // Keep only the last 100 sessions for calculation
      localStorage.setItem('session_durations', JSON.stringify(sessionDurations.slice(-100)));
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  // Update session metrics
  const updateSessionMetrics = (isNewSession = false) => {
    try {
      // Get stored metrics
      const pageViews = parseInt(localStorage.getItem('total_page_views') || '0');
      const sessions = parseInt(localStorage.getItem('total_sessions') || '0');
      
      // Update totals
      const newPageViews = pageViews + (isNewSession ? 1 : 0);
      const newSessions = sessions + (isNewSession ? 1 : 0);
      
      // Save updated totals
      localStorage.setItem('total_page_views', newPageViews.toString());
      if (isNewSession) {
        localStorage.setItem('total_sessions', newSessions.toString());
      }
      
      // Calculate bounce rate
      const bounceSessions = JSON.parse(localStorage.getItem('bounce_sessions') || '[]');
      const validBounceSessions = bounceSessions.filter((s: any) => 
        new Date(s.timestamp) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
      );
      
      const bounceCount = validBounceSessions.filter((s: any) => s.was_bounce).length;
      const bounceRate = validBounceSessions.length > 0 
        ? (bounceCount / validBounceSessions.length) * 100 
        : 0;
      
      // Calculate average session duration
      const sessionDurations = JSON.parse(localStorage.getItem('session_durations') || '[]');
      const validSessionDurations = sessionDurations.filter((s: any) => 
        new Date(s.timestamp) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
      );
      
      const totalDuration = validSessionDurations.reduce((acc: number, session: any) => 
        acc + session.duration_seconds, 0);
      const avgDuration = validSessionDurations.length > 0 
        ? totalDuration / validSessionDurations.length 
        : 0;
      
      // Calculate conversion rate
      const conversions = JSON.parse(localStorage.getItem('conversion_events') || '[]');
      const validConversions = conversions.filter((c: any) => 
        new Date(c.timestamp) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
      );
      
      const conversionRate = newSessions > 0 
        ? (validConversions.length / newSessions) * 100 
        : 0;
      
      // Update metrics state
      setMetrics({
        pageViews: newPageViews,
        sessions: newSessions,
        bounceRate: Math.round(bounceRate * 10) / 10, // Round to 1 decimal
        avgSessionDuration: Math.round(avgDuration * 10) / 10, // Round to 1 decimal
        conversionRate: Math.round(conversionRate * 10) / 10 // Round to 1 decimal
      });
      
      // Save metrics for Google Ad Grants reporting
      saveMetricsReport();
    } catch (error) {
      console.error('Error updating metrics:', error);
    }
  };
  
  // Generic event tracking function
  const trackEvent = (data: Record<string, any>) => {
    console.log('[GoogleAdGrantsMetric]', data);
    
    // Store events for reporting
    try {
      const metricEvents = JSON.parse(localStorage.getItem('metric_events') || '[]');
      metricEvents.push({
        ...data,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('metric_events', JSON.stringify(metricEvents.slice(-200))); // Keep last 200 events
    } catch (error) {
      console.error('Error storing metric event:', error);
    }
  };
  
  // Save a compiled metrics report for easy access
  const saveMetricsReport = () => {
    const now = new Date();
    const reportDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    
    const report = {
      date: reportDate,
      timestamp: now.toISOString(),
      metrics: {
        pageViews: parseInt(localStorage.getItem('total_page_views') || '0'),
        sessions: parseInt(localStorage.getItem('total_sessions') || '0'),
        bounceRate: metrics.bounceRate,
        avgSessionDuration: metrics.avgSessionDuration,
        conversionRate: metrics.conversionRate
      }
    };
    
    localStorage.setItem('latest_metrics_report', JSON.stringify(report));
    
    // Store historical reports (one per day)
    try {
      const reports = JSON.parse(localStorage.getItem('metrics_reports') || '[]');
      // Only add a new report if we don't have one for today
      if (!reports.some((r: any) => r.date === reportDate)) {
        reports.push(report);
        localStorage.setItem('metrics_reports', JSON.stringify(reports.slice(-30))); // Keep last 30 days
      } else {
        // Update today's report
        const updatedReports = reports.map((r: any) => 
          r.date === reportDate ? report : r
        );
        localStorage.setItem('metrics_reports', JSON.stringify(updatedReports));
      }
    } catch (error) {
      console.error('Error storing metrics report:', error);
    }
  };

  return null; // This is a tracking component with no UI
};

export default MetricTracker;
