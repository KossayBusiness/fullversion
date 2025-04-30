
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ExternalLink, Download, BookOpen, ChevronDown, ChevronUp, Share2, BookmarkPlus, FileCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

interface PublicationCardProps {
  title: string;
  authors: string;
  journal: string;
  year: string;
  type: string;
  abstract: string;
  doi?: string;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({
  title,
  authors,
  journal,
  year,
  type,
  abstract,
  doi
}) => {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleDownloadClick = () => {
    if (doi) {
      window.open(`https://doi.org/${doi}`, '_blank');
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all group border-natural-200 bg-gradient-to-br from-white to-natural-50">
        <CardContent className="p-0">
          <div className="flex gap-4 p-5">
            <div className="hidden sm:flex items-start pt-1">
              <div className={cn(
                "p-3 rounded-full transition-colors",
                type.toLowerCase().includes('revue') 
                  ? "bg-indigo-50 border border-indigo-100" 
                  : "bg-natural-50 border border-natural-100"
              )}>
                {type.toLowerCase().includes('revue') ? (
                  <BookOpen className={cn("h-5 w-5", type.toLowerCase().includes('revue') ? "text-indigo-600" : "text-natural-600")} />
                ) : (
                  <FileText className="h-5 w-5 text-natural-600" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-display text-lg md:text-xl font-semibold text-natural-800 mb-2 leading-tight group-hover:text-natural-600 transition-colors">
                  {title}
                </h3>
                <button 
                  onClick={handleSave} 
                  className="flex-shrink-0 ml-2 p-1.5 rounded-full hover:bg-natural-100 transition-colors"
                  aria-label={saved ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  <BookmarkPlus className={cn("h-5 w-5", saved ? "fill-natural-600 text-natural-600" : "text-natural-400")} />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3 text-sm">
                <div className="flex items-center text-natural-600">
                  <FileCheck className="h-3.5 w-3.5 mr-1.5 text-natural-500" />
                  <span>{authors}</span>
                </div>
                <span className="text-natural-600 italic flex items-center">
                  <BookOpen className="h-3.5 w-3.5 mr-1.5 text-natural-500" />
                  {journal}, {year}
                </span>
                <Badge variant="outline" className={cn(
                  "px-2.5 py-0.5 border-natural-200 font-medium",
                  type.toLowerCase().includes('revue') 
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200" 
                    : "bg-natural-50 text-natural-700 border-natural-200"
                )}>
                  {type}
                </Badge>
              </div>
              
              <div 
                className={cn(
                  "relative text-sm text-natural-600 bg-gradient-to-br from-natural-50 to-white p-4 rounded-lg border-l-2 border-natural-300 overflow-hidden transition-all duration-300",
                  expanded ? "max-h-96" : "max-h-24"
                )}
              >
                <p className={cn(expanded ? "" : "line-clamp-2")}>{abstract}</p>
                {!expanded && (
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent"></div>
                )}
              </div>
              
              <button 
                onClick={toggleExpanded}
                className="mt-2 text-xs text-natural-500 hover:text-natural-700 flex items-center gap-1 font-medium group/btn"
              >
                {expanded ? (
                  <>
                    <span>Voir moins</span>
                    <ChevronUp className="h-3.5 w-3.5 group-hover/btn:translate-y-[-2px] transition-transform" />
                  </>
                ) : (
                  <>
                    <span>Voir plus</span>
                    <ChevronDown className="h-3.5 w-3.5 group-hover/btn:translate-y-[2px] transition-transform" />
                  </>
                )}
              </button>
              
              <div className="flex justify-between items-center pt-4">
                {doi ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a 
                          href={`https://doi.org/${doi}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-natural-500 hover:text-natural-700 flex items-center gap-1 group-hover:underline"
                        >
                          <FileText className="h-3 w-3" /> DOI: {doi}
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Accéder à la publication originale</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <span className="text-xs text-natural-500 flex items-center gap-1">
                    <FileText className="h-3 w-3" /> Pré-publication
                  </span>
                )}
                
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-full text-natural-600 hover:text-natural-800 border-natural-200 hover:bg-natural-50"
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            // Vous pouvez ajouter une notification toast ici
                          }}
                        >
                          <Share2 className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Partager cette publication</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-natural-600 hover:text-natural-800 text-xs flex items-center gap-1 transition-colors border-natural-200 hover:bg-natural-50 px-3"
                    onClick={handleDownloadClick}
                  >
                    <Download className="h-3 w-3" />
                    Télécharger
                  </Button>
                  
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="text-xs bg-natural-600 hover:bg-natural-700 flex items-center gap-1 px-3 group/btn"
                  >
                    Article complet
                    <ExternalLink className="h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
