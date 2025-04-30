
import { useState, ReactNode } from 'react';
import { Info, BookOpen, ExternalLink } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface ScienceTerm {
  title: string;
  definition: string;
  source?: string;
  url?: string;
  category?: string;
}

interface ScienceTooltipProps {
  term: ScienceTerm;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
  variant?: 'default' | 'academic' | 'medical';
}

const ScienceTooltip = ({ 
  term, 
  children, 
  className = "", 
  showIcon = true,
  variant = 'default'
}: ScienceTooltipProps) => {
  const [expanded, setExpanded] = useState(false);
  
  // Déterminer les couleurs en fonction du variant
  const getVariantStyles = () => {
    switch(variant) {
      case 'academic':
        return {
          border: 'border-amber-200',
          title: 'text-amber-800',
          icon: 'text-amber-500',
          background: 'bg-gradient-to-r from-amber-50 to-white',
          highlight: 'border-amber-400'
        };
      case 'medical':
        return {
          border: 'border-emerald-200',
          title: 'text-emerald-800',
          icon: 'text-emerald-500',
          background: 'bg-gradient-to-r from-emerald-50 to-white',
          highlight: 'border-emerald-400'
        };
      default:
        return {
          border: 'border-indigo-100',
          title: 'text-indigo-800',
          icon: 'text-indigo-500',
          background: 'bg-white',
          highlight: 'border-indigo-400'
        };
    }
  };
  
  const styles = getVariantStyles();
  
  const handleSourceClick = (e: React.MouseEvent) => {
    // Éviter que le clic sur la source ne ferme le tooltip
    e.stopPropagation();
    e.preventDefault();
    
    if (term.url) {
      window.open(term.url, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300} open={expanded} onOpenChange={setExpanded}>
        <TooltipTrigger asChild onClick={() => setExpanded(!expanded)}>
          <span 
            className={`relative inline-flex items-center cursor-help border-b border-dotted ${styles.highlight} group ${className}`}
          >
            {children}
            {showIcon && (
              <span className="ml-0.5 opacity-70">
                <Info className={`h-3.5 w-3.5 inline ${styles.icon}`} />
              </span>
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          align="center" 
          className={`max-w-sm ${styles.background} ${styles.border} shadow-lg p-3 rounded-lg transition-all duration-200`}
          sideOffset={5}
        >
          <div className="science-tooltip-content">
            <h4 className={`text-sm font-medium ${styles.title} mb-1 flex items-center gap-1.5`}>
              {term.category && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700 mr-1">
                  {term.category}
                </span>
              )}
              {term.title}
            </h4>
            <p className="text-xs text-natural-700 mb-2">{term.definition}</p>
            {term.source && (
              <div className="flex items-center justify-between">
                <small className="text-[10px] text-natural-500 flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  Source : {term.source}
                </small>
                {term.url && (
                  <button 
                    onClick={handleSourceClick}
                    className="text-[10px] text-indigo-600 flex items-center hover:underline"
                  >
                    <ExternalLink className="h-3 w-3 mr-0.5" />
                    Lire plus
                  </button>
                )}
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ScienceTooltip;
