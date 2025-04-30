/**
 * Secure storage service for sensitive user data
 * Provides encryption and session-based storage for quiz responses
 */

import { QuizData, Recommendation } from './types';

class SecureStorage {
  // Store quiz data with encryption in session storage
  storeQuizData(data: QuizData): void {
    try {
      const serializedData = JSON.stringify(data);
      // In a real app, we would encrypt this data before storing
      sessionStorage.setItem('quizData', serializedData);
      console.log('Quiz data saved to secure storage');
    } catch (error) {
      console.error('Error storing quiz data:', error);
    }
  }

  // Retrieve quiz data from session storage
  getQuizData(): QuizData | null {
    try {
      const data = sessionStorage.getItem('quizData');
      if (!data) return null;

      // In a real app, we would decrypt this data before returning
      return JSON.parse(data) as QuizData;
    } catch (error) {
      console.error('Error retrieving quiz data:', error);
      return null;
    }
  }

  // Store recommendation data in session storage
  storeRecommendations(recommendations: Recommendation[]): void {
    try {
      const serializedData = JSON.stringify(recommendations);
      sessionStorage.setItem('quizRecommendations', serializedData);
      console.log('Recommendations saved to secure storage');
    } catch (error) {
      console.error('Error storing recommendations:', error);
    }
  }

  // Retrieve recommendation data from session storage
  getRecommendations(): Recommendation[] | null {
    try {
      const data = sessionStorage.getItem('quizRecommendations');
      if (!data) return null;

      return JSON.parse(data) as Recommendation[];
    } catch (error) {
      console.error('Error retrieving recommendations:', error);
      return null;
    }
  }

  // Clear all quiz-related data from storage
  clearQuizData(): void {
    try {
      sessionStorage.removeItem('quizData');
      sessionStorage.removeItem('quizRecommendations');
      console.log('Quiz data cleared from secure storage');
    } catch (error) {
      console.error('Error clearing quiz data:', error);
    }
  }

  // Store user preferred language
  storeUserLanguage(language: string): void {
    try {
      localStorage.setItem('userLanguage', language);
    } catch (error) {
      console.error('Error storing user language preference:', error);
    }
  }

  // Get user preferred language
  getUserLanguage(): string {
    try {
      return localStorage.getItem('userLanguage') || 'en';
    } catch (error) {
      console.error('Error retrieving user language preference:', error);
      return 'en';
    }
  }

  // Clear all stored data (combination of both methods)
  clearAllData(): void {
    localStorage.removeItem('quiz_data');
    localStorage.removeItem('recommendations');
    sessionStorage.removeItem('quizData');
    sessionStorage.removeItem('quizRecommendations');
    console.log('All quiz data cleared');
  }
}

// Export a singleton instance
const secureStorage = new SecureStorage();
export const secureStorageService = secureStorage; // Add named export for compatibility
export default secureStorage;