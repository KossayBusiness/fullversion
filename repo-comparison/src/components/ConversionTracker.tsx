
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConversionTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const conversionTracked = useRef<Record<string, boolean>>({});

  // Track page views for conversion reporting
  useEffect(() => {
    const path = location.pathname;
    const referrer = document.referrer;
    const source = new URLSearchParams(location.search).get('utm_source') || 'direct';
    const campaign = new URLSearchParams(location.search).get('utm_campaign') || 'none';
    
    // Track page view
    trackEvent({
      event_name: 'page_view',
      page_path: path,
      referrer: referrer,
      source: source,
      campaign: campaign
    });
    
    // Track thank you pages as conversions
    if (path.includes('/thank-you') && !conversionTracked.current['thank_you']) {
      trackConversion('form_submission', {
        conversion_page: path,
        source: source,
        campaign: campaign
      });
      conversionTracked.current['thank_you'] = true;
    }
    
    // Track quiz completion
    if (path.includes('/quiz-results') && !conversionTracked.current['quiz_completed']) {
      trackConversion('quiz_completion', {
        conversion_page: path,
        source: source,
        campaign: campaign
      });
      conversionTracked.current['quiz_completed'] = true;
    }
    
    // Track newsletter signup success
    if (path.includes('/newsletter-confirmed') && !conversionTracked.current['newsletter']) {
      trackConversion('newsletter_signup', {
        conversion_page: path,
        source: source,
        campaign: campaign
      });
      conversionTracked.current['newsletter'] = true;
    }
  }, [location]);

  // Track form submissions
  useEffect(() => {
    const trackFormSubmission = (event: Event) => {
      const form = event.target as HTMLFormElement;
      const formName = form.getAttribute('data-form-name') || form.getAttribute('name') || 'unknown';
      
      // Don't track search forms - not a meaningful conversion
      if (formName.includes('search') || form.action.includes('search')) {
        return;
      }
      
      // Track the conversion
      trackConversion('form_submission', {
        form_name: formName,
        form_action: form.action,
        page_path: location.pathname
      });
      
      // If this is a newsletter form, set a cookie/session flag
      if (formName.includes('newsletter') || formName.includes('subscribe')) {
        sessionStorage.setItem('newsletter_submitted', 'true');
      }
      
      // If this is a contact form, set a cookie/session flag
      if (formName.includes('contact')) {
        sessionStorage.setItem('contact_submitted', 'true');
      }
    };

    // Add listeners to all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', trackFormSubmission);
    });

    // Clean up
    return () => {
      forms.forEach(form => {
        form.removeEventListener('submit', trackFormSubmission);
      });
    };
  }, [location]);

  // Track button clicks that might lead to conversions
  useEffect(() => {
    const trackButtonClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const button = target.closest('button, a') as HTMLElement;
      
      if (!button) return;
      
      // Check if this is a CTA button
      const isCTA = button.classList.contains('cta') || 
                   button.getAttribute('data-cta') === 'true' ||
                   button.innerText.toLowerCase().includes('sign up') ||
                   button.innerText.toLowerCase().includes('subscribe') ||
                   button.innerText.toLowerCase().includes('start quiz');
      
      if (isCTA) {
        trackEvent({
          event_name: 'cta_click',
          cta_text: button.innerText.trim(),
          cta_type: button.tagName.toLowerCase(),
          page_path: location.pathname
        });
      }
    };
    
    document.addEventListener('click', trackButtonClick);
    
    return () => {
      document.removeEventListener('click', trackButtonClick);
    };
  }, []);

  // Track successful conversions that redirect to thank you pages
  useEffect(() => {
    // Check for form submission indicators
    const checkPostSubmissionState = () => {
      if (sessionStorage.getItem('newsletter_submitted') === 'true' && 
          !conversionTracked.current['newsletter_conversion']) {
        trackConversion('newsletter_signup_complete', {
          method: 'redirect_detected',
          page_path: location.pathname
        });
        conversionTracked.current['newsletter_conversion'] = true;
        sessionStorage.removeItem('newsletter_submitted');
      }
      
      if (sessionStorage.getItem('contact_submitted') === 'true' && 
          !conversionTracked.current['contact_conversion']) {
        trackConversion('contact_form_complete', {
          method: 'redirect_detected',
          page_path: location.pathname
        });
        conversionTracked.current['contact_conversion'] = true;
        sessionStorage.removeItem('contact_submitted');
      }
    };
    
    checkPostSubmissionState();
  }, [location]);

  // Generic event tracking function
  const trackEvent = (data: Record<string, any>) => {
    console.log('[GoogleAdGrantsTrack]', data);
    
    // Store events for reporting
    try {
      const events = JSON.parse(localStorage.getItem('tracking_events') || '[]');
      events.push({
        ...data,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('tracking_events', JSON.stringify(events.slice(-100))); // Keep last 100 events
    } catch (error) {
      console.error('Error storing event:', error);
    }
  };

  // Conversion tracking function
  const trackConversion = (conversionType: string, data: Record<string, any>) => {
    console.log('[GoogleAdGrantsConversion]', conversionType, data);
    
    // Store conversion for reporting
    try {
      const conversions = JSON.parse(localStorage.getItem('conversion_events') || '[]');
      conversions.push({
        conversion_type: conversionType,
        ...data,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('conversion_events', JSON.stringify(conversions));
    } catch (error) {
      console.error('Error storing conversion:', error);
    }
  };

  return null; // This is a tracking component with no UI
};

export default ConversionTracker;
