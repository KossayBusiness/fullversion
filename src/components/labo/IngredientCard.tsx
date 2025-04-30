
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Beaker, Leaf, PlusCircle, Star, Dna, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IngredientCardProps {
  name: string;
  scientificName: string;
  description: string;
  benefits: string[];
  activeCompounds: string[];
  dosage: string;
  imageUrl?: string;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({
  name,
  scientificName,
  description,
  benefits,
  activeCompounds,
  dosage,
  imageUrl
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border-natural-200 h-full flex flex-col animate-fadeIn">
      <CardHeader className="bg-gradient-to-r from-natural-100 to-natural-50 pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-natural-800 flex items-center gap-2">
              {name}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-natural-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <div className="text-xs italic text-natural-500 mt-0.5 flex items-center gap-1">
              <Dna className="h-3 w-3" />
              {scientificName}
            </div>
          </div>
          <div className="p-2 bg-white rounded-full shadow-sm border border-natural-100 group-hover:bg-natural-50 transition-colors">
            <Leaf className="h-4 w-4 text-natural-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 flex-grow flex flex-col">
        <p className="text-sm text-natural-600 mb-3 bg-natural-50 p-3 rounded-lg">{description}</p>
        
        <div className="space-y-4 flex-grow">
          <div>
            <h4 className="text-xs font-medium uppercase text-natural-500 mb-2 flex items-center">
              <Star className="h-3 w-3 mr-1 text-natural-400" /> Bénéfices principaux
            </h4>
            <ul className="list-none text-sm text-natural-700 space-y-1.5">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <PlusCircle className="h-3 w-3 text-natural-500 mt-1 flex-shrink-0" />
                  <span className="text-xs">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-medium uppercase text-natural-500 mb-2 flex items-center">
              <Beaker className="h-3 w-3 mr-1 text-natural-400" /> Composés actifs
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {activeCompounds.map((compound, idx) => (
                <Badge key={idx} variant="outline" className="bg-natural-50 text-natural-700 border-natural-200">
                  {compound}
                </Badge>
              ))}
            </div>
          </div>
          
          {expanded && (
            <div className="animate-fadeIn">
              <h4 className="text-xs font-medium uppercase text-natural-500 mb-2 flex items-center">
                <Beaker className="h-3 w-3 mr-1 text-natural-400" /> Mode d'action
              </h4>
              <p className="text-xs text-natural-600 bg-natural-50 p-2 rounded-lg">
                Les composés actifs de {name} agissent principalement en {benefits[0].toLowerCase()} 
                grâce à leurs propriétés antioxydantes et anti-inflammatoires, contribuant ainsi à 
                maintenir l'équilibre cellulaire et à soutenir les défenses naturelles de l'organisme.
              </p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex-col items-stretch gap-3">
        <Separator className="my-2" />
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-natural-700 flex items-center font-medium">
            <PlusCircle className="h-3 w-3 mr-1 text-natural-500" />
            <span>Dosage:</span> <span className="ml-1 text-natural-600 font-normal">{dosage}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-natural-600 hover:text-natural-800 p-0 h-auto"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>Réduire <ChevronUp className="h-3 w-3 ml-1" /></>
            ) : (
              <>Plus d'infos <ChevronDown className="h-3 w-3 ml-1" /></>
            )}
          </Button>
        </div>
        
        {expanded && (
          <Button 
            variant="default" 
            size="sm" 
            className="w-full mt-2 bg-natural-600 hover:bg-natural-700 text-xs"
          >
            Découvrir nos produits avec {name}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
