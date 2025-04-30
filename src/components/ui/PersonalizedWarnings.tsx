
import React from 'react';
import { AlertTriangle, Info, ShieldAlert, AlertCircle, HelpCircle, Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface Warning {
  type: 'medication' | 'condition' | 'nutrient' | 'timing' | 'dosage' | 'general';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  icon?: React.ReactNode;
  source?: string;
  recommendations?: string[];
  timeRelevant?: boolean;
}

interface PersonalizedWarningsProps {
  warnings: Warning[];
  className?: string;
  variant?: 'compact' | 'detailed' | 'accordion';
  onDismiss?: (warningIndex: number) => void;
}

const PersonalizedWarnings: React.FC<PersonalizedWarningsProps> = ({
  warnings,
  className = '',
  variant = 'detailed',
  onDismiss
}) => {
  if (!warnings || warnings.length === 0) return null;

  const getIcon = (type: Warning['type'], severity: Warning['severity']) => {
    switch (type) {
      case 'medication':
        return severity === 'high' ? <ShieldAlert className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />;
      case 'condition':
        return <AlertTriangle className="h-5 w-5" />;
      case 'timing':
        return <Clock className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getSeverityStyles = (severity: Warning['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'medium':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIconStyles = (severity: Warning['severity']) => {
    switch (severity) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-amber-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`space-y-2 ${className}`}>
        {warnings.map((warning, index) => (
          <Alert key={index} className={`${getSeverityStyles(warning.severity)} border`}>
            <div className={`${getIconStyles(warning.severity)} mr-2`}>
              {warning.icon || getIcon(warning.type, warning.severity)}
            </div>
            <AlertTitle className="font-medium text-sm">{warning.title}</AlertTitle>
          </Alert>
        ))}
      </div>
    );
  }

  if (variant === 'accordion') {
    return (
      <div className={className}>
        <h3 className="text-lg font-medium mb-2">Précautions importantes</h3>
        <Accordion type="single" collapsible className="w-full">
          {warnings.map((warning, index) => (
            <AccordionItem key={index} value={`warning-${index}`} className="border-b">
              <AccordionTrigger className="flex items-center py-3">
                <div className="flex items-center">
                  <span className={`mr-2 ${getIconStyles(warning.severity)}`}>
                    {warning.icon || getIcon(warning.type, warning.severity)}
                  </span>
                  <span className="font-medium text-sm">{warning.title}</span>
                  {warning.timeRelevant && (
                    <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                      Actuel
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="py-2 px-2">
                  <p className="text-sm mb-2">{warning.description}</p>
                  
                  {warning.recommendations && warning.recommendations.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-1">Recommandations</h4>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        {warning.recommendations.map((rec, recIndex) => (
                          <li key={recIndex}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {warning.source && (
                    <div className="mt-2 text-xs text-gray-500">
                      Source: {warning.source}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }

  // Default detailed view
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-medium">Précautions personnalisées</h3>
      {warnings.map((warning, index) => (
        <Card key={index} className={`border ${getSeverityStyles(warning.severity)}`}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <div className={`mr-3 mt-0.5 ${getIconStyles(warning.severity)}`}>
                  {warning.icon || getIcon(warning.type, warning.severity)}
                </div>
                <div>
                  <h4 className="font-medium flex items-center">
                    {warning.title}
                    {warning.timeRelevant && (
                      <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                        Information saisonnière
                      </span>
                    )}
                  </h4>
                  <p className="text-sm mt-1">{warning.description}</p>
                  
                  {warning.recommendations && warning.recommendations.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-xs uppercase tracking-wide text-gray-500 mb-1">Recommandations</h5>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        {warning.recommendations.map((rec, recIndex) => (
                          <li key={recIndex}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {warning.source && (
                    <div className="mt-2 text-xs text-gray-500 flex items-center">
                      <span>Source: {warning.source}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                              <HelpCircle className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs max-w-xs">Ces informations proviennent de sources scientifiques vérifiées et de directives cliniques à jour.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>
              </div>
              
              {onDismiss && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onDismiss(index)} 
                  className="text-xs opacity-70 hover:opacity-100"
                >
                  Compris
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PersonalizedWarnings;
