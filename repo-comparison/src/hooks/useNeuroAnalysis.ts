
import { useState, useEffect } from 'react';
import { analyzeUserBehavior, generateRecommendations } from '@/utils/NeuroEngine';
import { QuizResponse } from '@/components/quiz/types';

export const useNeuroAnalysis = (responses: QuizResponse) => {
  const [behavioralData, setBehavioralData] = useState({
    timePerQuestion: [],
    changeFrequency: 0,
    hesitationPatterns: [],
    scrollBehavior: {
      speed: 0,
      direction_changes: 0
    }
  });

  useEffect(() => {
    const trackScrollBehavior = () => {
      let lastScrollTop = 0;
      let directionChanges = 0;
      let scrollSpeed = 0;

      const handleScroll = () => {
        const st = window.pageYOffset;
        if (st > lastScrollTop) {
          directionChanges++;
        }
        scrollSpeed = Math.abs(st - lastScrollTop);
        lastScrollTop = st;

        setBehavioralData(prev => ({
          ...prev,
          scrollBehavior: {
            speed: scrollSpeed,
            direction_changes: directionChanges
          }
        }));
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    };

    return trackScrollBehavior();
  }, []);

  const neuroProfile = analyzeUserBehavior(behavioralData);
  const recommendations = generateRecommendations(responses, neuroProfile);

  return {
    neuroProfile,
    recommendations,
    behavioralData
  };
};
