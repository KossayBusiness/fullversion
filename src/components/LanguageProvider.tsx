
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { language } = useTranslation();
  
  return (
    <div lang={language} className="antialiased">
      {children}
    </div>
  );
};

export default LanguageProvider;
