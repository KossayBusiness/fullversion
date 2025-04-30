
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Challenge } from "./types";
import { Trophy, Plus, ArrowRight, Flame, Award, Target } from "lucide-react";

interface ChallengesProps {
  challenges: Challenge[];
}

const getChallengeIcon = (name: string) => {
  if (name.includes("Hydratation")) return <Flame className="h-5 w-5 text-blue-500" />;
  if (name.includes("Alimentation")) return <Award className="h-5 w-5 text-green-500" />;
  return <Target className="h-5 w-5 text-indigo-500" />;
};

const Challenges = ({ challenges }: ChallengesProps) => {
  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg border-b border-indigo-100">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-indigo-600" />
          <CardTitle className="text-indigo-700">Vos défis en cours</CardTitle>
        </div>
        <CardDescription>Suivez votre progression et relevez de nouveaux défis pour améliorer votre santé</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-2">
          {challenges.map((defi) => (
            <div 
              key={defi.id} 
              className="bg-white border rounded-lg p-5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-indigo-50">
                    {getChallengeIcon(defi.name)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{defi.name}</h3>
                    <Badge variant="outline" className="bg-primary/5 mt-1">{defi.days} jours</Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-3 mt-4">
                <Progress value={defi.progress} className="h-3 bg-indigo-100" />
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Progression: {defi.progress}%</span>
                  <span className={`font-medium ${defi.progress < 50 ? "text-amber-500" : "text-emerald-500"}`}>
                    {defi.progress < 50 ? "Continuez vos efforts!" : "Excellente progression!"}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 group"
                >
                  <span>Voir détails</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-dashed border-indigo-200 rounded-lg p-5 flex flex-col items-center justify-center text-center min-h-[220px] cursor-pointer hover:bg-indigo-100/50 transition-colors transform hover:-translate-y-1 duration-300">
            <div className="bg-indigo-100 text-indigo-600 rounded-full p-3 mb-4 shadow-sm">
              <Plus className="h-6 w-6" />
            </div>
            <h3 className="font-medium text-lg mb-2 text-indigo-700">Nouveau défi personnalisé</h3>
            <p className="text-sm text-indigo-600/80 mb-4">Relevez un nouveau défi adapté à vos objectifs de santé</p>
            <Button variant="outline" className="bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50">
              Commencer un défi
            </Button>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
            <span>Découvrir tous les défis</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Challenges;
