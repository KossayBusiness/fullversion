
import { useState, useEffect, useRef } from 'react';

// Types
interface ArticleEngagementOptions {
  articleId: string;
  articleLength: number; // in words
  averageReadingTime?: number; // in minutes per 1000 words
}

interface ArticleEngagementMetrics {
  readPercentage: number;
  readTime: number; // in seconds
  scrollDepth: number;
  interactionPoints: string[];
  isEngaged: boolean;
  isPrimeForConversion: boolean;
}

/**
 * Hook that measures user engagement on an article
 * and determines the best moments to suggest a quiz
 */
export const useArticleEngagement = ({
  articleId,
  articleLength,
  averageReadingTime = 3
}: ArticleEngagementOptions) => {
  // Vérifier si articleId est défini
  if (!articleId) {
    console.warn('useArticleEngagement: articleId is undefined or null');
    // Retourner des métriques par défaut
    return { 
      metrics: {
        readPercentage: 0,
        readTime: 0,
        scrollDepth: 0,
        interactionPoints: [],
        isEngaged: false,
        isPrimeForConversion: false
      } 
    };
  }

  const [metrics, setMetrics] = useState<ArticleEngagementMetrics>({
    readPercentage: 0,
    readTime: 0,
    scrollDepth: 0,
    interactionPoints: [],
    isEngaged: false,
    isPrimeForConversion: false
  });

  // References to track state
  const startTime = useRef<number>(Date.now());
  const isReading = useRef<boolean>(true);
  const maxScrollDepth = useRef<number>(0);
  const interactionCount = useRef<number>(0);
  const readingInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Scroll handler
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Calculate scroll depth (0-100%)
    const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

    // Update max scroll depth
    if (scrollPercentage > maxScrollDepth.current) {
      maxScrollDepth.current = scrollPercentage;
    }

    // Update metrics
    setMetrics(prev => ({
      ...prev,
      scrollDepth: maxScrollDepth.current
    }));

    // Record interaction
    interactionCount.current += 1;
  };

  // Click handler 
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const targetId = target.id || target.tagName || 'unknown';

    setMetrics(prev => ({
      ...prev,
      interactionPoints: [...prev.interactionPoints, targetId]
    }));

    interactionCount.current += 1;
  };

  // Visibility handler
  const handleVisibilityChange = () => {
    isReading.current = document.visibilityState === 'visible';
  };

  // Check engagement periodically
  const checkEngagement = () => {
    if (!isReading.current) return;

    const now = Date.now();
    const elapsedSeconds = (now - startTime.current) / 1000;

    // Estimate read percentage based on time and content length
    // Average reading speed: 250 words per minute
    const wordsPerSecond = 250 / 60; 
    const estimatedWordsRead = elapsedSeconds * wordsPerSecond;
    const readPercentage = Math.min((estimatedWordsRead / articleLength) * 100, 100);

    // Determine if user is engaged
    const isEngaged = (
      maxScrollDepth.current > 30 || // Scrolled more than 30%
      interactionCount.current > 2 || // Had at least 3 interactions
      elapsedSeconds > 30 // Spent at least 30 seconds on page
    );

    // Determine if this is a good moment for conversion
    const isPrimeForConversion = (
      (readPercentage > 70 || maxScrollDepth.current > 80) && // Read most of content
      isEngaged && // Is engaged
      interactionCount.current > 5 // Had multiple interactions
    );

    setMetrics({
      readPercentage,
      readTime: elapsedSeconds,
      scrollDepth: maxScrollDepth.current,
      interactionPoints: metrics.interactionPoints,
      isEngaged,
      isPrimeForConversion
    });
  };

  // Track engagement
  useEffect(() => {
    // Initialize
    startTime.current = Date.now();
    maxScrollDepth.current = 0;
    interactionCount.current = 0;

    // Set up event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Set up interval to check engagement
    readingInterval.current = setInterval(checkEngagement, 5000);

    // Log initial view
    console.log(`[ArticleEngagement] Article ${articleId} view started`);

    return () => {
      // Remove event listeners
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Clear interval
      if (readingInterval.current) {
        clearInterval(readingInterval.current);
      }

      // Log final metrics
      console.log(`[ArticleEngagement] Article ${articleId} view ended:`, {
        readTime: (Date.now() - startTime.current) / 1000,
        scrollDepth: maxScrollDepth.current,
        interactions: interactionCount.current
      });
    };
  }, [articleId]);

  return { metrics };
};

export default useArticleEngagement;
