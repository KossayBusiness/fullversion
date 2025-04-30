
import { useState, useEffect } from 'react';
import { Award, Users, ScrollText, Microscope, Link, Info } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TrustBadge {
  icon: 'award' | 'users' | 'study' | 'microscope' | 'link';
  label: string;
  value: number | string;
  suffix?: string;
  color?: string;
  description?: string;
  source?: string;
}

interface ScientificTrustBadgesProps {
  badges?: TrustBadge[];
  className?: string;
  animated?: boolean;
}

const ScientificTrustBadges = ({
  badges = [
    { 
      icon: 'award', 
      label: 'Taux d\'efficacité', 
      value: 72, 
      suffix: '%', 
      color: 'bg-amber-100 text-amber-800',
      description: 'Efficacité constatée sur la réduction des symptômes inflammatoires après 16 semaines',
      source: 'Étude randomisée en double aveugle, 2023'
    },
    { 
      icon: 'users', 
      label: 'Participants', 
      value: 243, 
      color: 'bg-blue-100 text-blue-800',
      description: 'Nombre de participants à l\'étude clinique, âgés de 25 à 64 ans',
      source: 'Consortium International de Recherche Nutritionnelle'
    },
    { 
      icon: 'study', 
      label: 'Études analysées', 
      value: 87, 
      color: 'bg-green-100 text-green-800',
      description: 'Méta-analyse de 87 études scientifiques sur l\'impact des micronutriments',
      source: 'Journal of Nutritional Science, 2022'
    },
    { 
      icon: 'microscope', 
      label: 'Chercheurs', 
      value: 16, 
      color: 'bg-purple-100 text-purple-800',
      description: 'Équipe pluridisciplinaire de chercheurs en nutrition, immunologie et biochimie',
      source: 'Laboratoire de Recherche en Nutrition Avancée'
    }
  ],
  className = '',
  animated = true
}: ScientificTrustBadgesProps) => {
  const [animatedValues, setAnimatedValues] = useState<(number | string)[]>(
    badges.map(badge => typeof badge.value === 'number' ? 0 : badge.value)
  );
  
  useEffect(() => {
    if (!animated) {
      setAnimatedValues(badges.map(badge => badge.value));
      return;
    }
    
    const finalValues = badges.map(badge => badge.value);
    const duration = 1500; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      
      const newValues = badges.map((badge, index) => {
        if (typeof badge.value === 'number') {
          // Ease out cubic animation
          const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
          return Math.round(progress * (badge.value as number));
        }
        return badge.value;
      });
      
      setAnimatedValues(newValues);
      
      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, frameDuration);
    
    return () => clearInterval(timer);
  }, [badges, animated]);
  
  const getIcon = (iconType: TrustBadge['icon'], className: string = 'h-4 w-4') => {
    switch (iconType) {
      case 'award':
        return <Award className={className} />;
      case 'users':
        return <Users className={className} />;
      case 'study':
        return <ScrollText className={className} />;
      case 'microscope':
        return <Microscope className={className} />;
      case 'link':
        return <Link className={className} />;
    }
  };
  
  return (
    <TooltipProvider>
      <div className={`flex flex-wrap gap-3 ${className}`}>
        {badges.map((badge, index) => (
          <Tooltip key={index} delayDuration={300}>
            <TooltipTrigger asChild>
              <Badge
                variant="secondary"
                className={`flex items-center gap-1 px-3 py-1.5 cursor-help transition-all hover:shadow-md ${badge.color || 'bg-indigo-100 text-indigo-800'}`}
              >
                {getIcon(badge.icon)}
                <span className="font-medium">
                  {animatedValues[index]}
                  {badge.suffix || ''}
                </span>
                <span className="text-xs opacity-80 hidden sm:inline-block"> 
                  {badge.label}
                </span>
                {badge.description && (
                  <Info className="h-3 w-3 ml-1 opacity-70" />
                )}
              </Badge>
            </TooltipTrigger>
            {badge.description && (
              <TooltipContent 
                side="top" 
                align="center"
                className="max-w-xs bg-white p-3 rounded-lg shadow-lg border border-indigo-100"
              >
                <div>
                  <h4 className="font-medium text-natural-800 mb-1 text-sm">{badge.label}</h4>
                  <p className="text-xs text-natural-600 mb-1.5">{badge.description}</p>
                  {badge.source && (
                    <div className="text-[10px] text-natural-500 flex items-center gap-1">
                      <ScrollText className="h-3 w-3" />
                      <span>{badge.source}</span>
                    </div>
                  )}
                </div>
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default ScientificTrustBadges;
