
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Type definitions
interface Translations {
  [key: string]: string;
}

interface LanguageContextType {
  language: 'en' | 'fr';
  setLanguage: (lang: 'en' | 'fr') => void;
  t: (key: string) => string;
}

// Creating context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Translation data
const translations: Record<string, Translations> = {
  en: {
    'welcome': 'Welcome to NaturalPure',
    'quiz.start': 'Start the Nutritional Assessment',
    'quiz.question1': 'What is your main health goal?',
    'quiz.option.energy': 'Improve Energy Levels',
    'quiz.option.sleep': 'Better Sleep Quality',
    'quiz.option.immunity': 'Strengthen Immunity',
    'quiz.option.digestion': 'Improve Digestion',
    'quiz.option.stress': 'Reduce Stress',
    'quiz.option.focus': 'Enhance Mental Focus',
    'next': 'Next',
    'previous': 'Previous',
    'submit': 'Submit',
    'home': 'Home',
    'articles': 'Articles',
    'quiz': 'Quiz',
    'profile': 'Health Profile',
    'research': 'Our Research',
    'lab': 'Lab Solutions',
    'nutrition': 'Nutrition',
    'about': 'About',
    'contact': 'Contact',
    'Scientific Library - Natural Pure Academy': 'Scientific Library - Natural Pure Academy',
    'Explore peer-reviewed scientific publications and research by Natural Pure Academy on nutrition, health, and micronutrients.': 'Explore peer-reviewed scientific publications and research by Natural Pure Academy on nutrition, health, and micronutrients.',
    'scientific research, nutrition studies, health publications, micronutrients research': 'scientific research, nutrition studies, health publications, micronutrients research',
    'Home': 'Home',
    'Scientific Library': 'Scientific Library',
    'Non-Profit Research': 'Non-Profit Research',
    'Explore our scientific publications and research findings. All content is provided for educational purposes only.': 'Explore our scientific publications and research findings. All content is provided for educational purposes only.',
    'Scientific content only - No product sales': 'Scientific content only - No product sales',
    'International Resources': 'International Resources',
    'Our research and educational resources are available in multiple languages to support a global audience.': 'Our research and educational resources are available in multiple languages to support a global audience.',
  },
  fr: {
    'welcome': 'Welcome to NaturalPure',
    'quiz.start': 'Start the Nutritional Assessment',
    'quiz.question1': 'What is your main health goal?',
    'quiz.option.energy': 'Improve Energy Levels',
    'quiz.option.sleep': 'Better Sleep Quality',
    'quiz.option.immunity': 'Strengthen Immunity',
    'quiz.option.digestion': 'Improve Digestion',
    'quiz.option.stress': 'Reduce Stress',
    'quiz.option.focus': 'Enhance Mental Focus',
    'next': 'Next',
    'previous': 'Previous',
    'submit': 'Submit',
    'home': 'Home',
    'articles': 'Articles',
    'quiz': 'Quiz',
    'profile': 'Health Profile',
    'research': 'Our Research',
    'lab': 'Lab Solutions',
    'nutrition': 'Nutrition',
    'about': 'About',
    'contact': 'Contact',
    'Scientific Library - Natural Pure Academy': 'Bibliothèque Scientifique - Natural Pure Academy',
    'Explore peer-reviewed scientific publications and research by Natural Pure Academy on nutrition, health, and micronutrients.': 'Explorez les publications scientifiques et les recherches de Natural Pure Academy sur la nutrition, la santé et les micronutriments.',
    'scientific research, nutrition studies, health publications, micronutrients research': 'recherche scientifique, études nutritionnelles, publications sur la santé, recherche sur les micronutriments',
    'Home': 'Accueil',
    'Scientific Library': 'Bibliothèque Scientifique',
    'Non-Profit Research': 'Recherche à but non lucratif',
    'Explore our scientific publications and research findings. All content is provided for educational purposes only.': 'Explorez nos publications scientifiques et nos résultats de recherche. Tout le contenu est fourni à des fins éducatives uniquement.',
    'Scientific content only - No product sales': 'Contenu scientifique uniquement - Pas de vente de produits',
    'International Resources': 'Ressources Internationales',
    'Our research and educational resources are available in multiple languages to support a global audience.': 'Nos recherches et ressources éducatives sont disponibles en plusieurs langues pour soutenir un public mondial.',
  },
};

// Hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');

  // Translation function
  const t = (key: string): string => {
    if (!translations[language]) {
      return key;
    }
    
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for easier context consumption
export const useTranslation = () => useContext(LanguageContext);
