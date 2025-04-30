
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Définition des types
interface Translations {
  [key: string]: string;
}

interface LanguageContextType {
  language: 'en' | 'fr';
  setLanguage: (lang: 'en' | 'fr') => void;
  t: (key: string) => string;
}

// Création du contexte avec des valeurs par défaut
export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Données de traduction
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
    // Add more English translations
  },
  fr: {
    'welcome': 'Bienvenue à NaturalPure',
    'quiz.start': 'Commencer l\'Évaluation Nutritionnelle',
    'quiz.question1': 'Quel est votre principal objectif de santé ?',
    'quiz.option.energy': 'Améliorer les Niveaux d\'Énergie',
    'quiz.option.sleep': 'Meilleure Qualité de Sommeil',
    'quiz.option.immunity': 'Renforcer l\'Immunité',
    'quiz.option.digestion': 'Améliorer la Digestion',
    'quiz.option.stress': 'Réduire le Stress',
    'quiz.option.focus': 'Améliorer la Concentration Mentale',
    'next': 'Suivant',
    'previous': 'Précédent',
    'submit': 'Soumettre',
    'home': 'Accueil',
    'articles': 'Articles',
    'quiz': 'Quiz',
    'profile': 'Profil Santé',
    'research': 'Nos Recherches',
    'lab': 'Labo Solutions',
    'nutrition': 'Nutrition',
    'about': 'À Propos',
    'contact': 'Contact',
    // Add more French translations
  },
};

// Hook pour utiliser le contexte de langue
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};

// Hook pour utiliser les traductions (alias de useLanguage pour compatibilité)
export const useTranslation = () => useContext(LanguageContext);

// Composant Provider
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');

  // Fonction de traduction
  const t = (key: string): string => {
    const langTranslations = translations[language] || translations.en;
    return langTranslations[key] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Make useLanguage the default export for backward compatibility
export default useLanguage;
