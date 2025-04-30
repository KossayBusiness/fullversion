
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage} 
      className="flex items-center gap-1 text-xs"
      title={language === 'fr' ? 'Switch to English' : 'Passer au français'}
    >
      <Globe className="h-3.5 w-3.5" />
      <span>{language === 'fr' ? 'EN' : 'FR'}</span>
    </Button>
  );
};

export default LanguageSwitcher;
