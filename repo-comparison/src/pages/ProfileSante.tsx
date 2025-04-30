
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginPrompt from "@/components/profile/LoginPrompt";
import ReadingHistory from "@/components/profile/ReadingHistory";
import Challenges from "@/components/profile/Challenges";
import Recommendations from "@/components/profile/Recommendations";
import HealthSync from "@/components/profile/HealthSync";
import { mockProfileData } from "@/components/profile/ProfileData";
import { BookOpen, Trophy, Sparkles, Activity, Calendar, Target, Bell, ChevronRight, Star, Shield, Heart, Zap, HeartPulse, Dumbbell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import ProfileStatCard from "@/components/profile/ProfileStatCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import HealthScore from "@/components/profile/HealthScore";

const ProfileSante = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Setting to true for demo purposes
  const { toast } = useToast();

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast({
      title: "Connexion réussie",
      description: "Bienvenue sur votre profil santé personnalisé",
    });
  };

  if (!isLoggedIn) {
    return <LoginPrompt onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-teal-50/30 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <ProfileHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ProfileStatCard 
            title="Score de santé"
            value="78"
            icon={<HeartPulse className="h-5 w-5 text-rose-500" />}
            trend="up"
            bgClass="bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200"
            onClick={() => toast({ title: "Votre score de santé", description: "Calculé à partir de vos habitudes et symptômes" })}
          />
          
          <ProfileStatCard 
            title="Défis complétés"
            value="12"
            icon={<Trophy className="h-5 w-5 text-amber-500" />}
            trend="up"
            bgClass="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200"
            onClick={() => toast({ title: "Vos défis complétés", description: "Continuez pour obtenir plus de médailles!" })}
          />
          
          <ProfileStatCard 
            title="Jours consécutifs"
            value="8"
            icon={<Calendar className="h-5 w-5 text-teal-500" />}
            trend="stable"
            bgClass="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200"
            onClick={() => toast({ title: "Votre série actuelle", description: "Continuez pour maintenir votre série!" })}
          />
        </div>
        
        <HealthScore />
        
        <Tabs defaultValue="history" className="space-y-8">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 h-auto bg-white p-1 rounded-lg shadow-sm mb-2">
            <TabsTrigger value="history" className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500/10 data-[state=active]:to-cyan-500/10">
              <BookOpen className="h-4 w-4" />
              <span>Historique</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500/10 data-[state=active]:to-orange-500/10">
              <Trophy className="h-4 w-4" />
              <span>Défis</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500/10 data-[state=active]:to-blue-500/10">
              <Sparkles className="h-4 w-4" />
              <span>Recommandations</span>
            </TabsTrigger>
            <TabsTrigger value="health-sync" className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500/10 data-[state=active]:to-pink-500/10">
              <Activity className="h-4 w-4" />
              <span>Santé connectée</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="space-y-6 animate-fadeIn">
            <Card className="border-none shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 p-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Zap className="h-5 w-5 text-teal-600" />
                  Résumé de votre activité récente
                </h3>
              </div>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-white to-teal-50 p-4 rounded-lg border border-teal-100 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-teal-100 rounded-full">
                        <BookOpen className="h-5 w-5 text-teal-600" />
                      </div>
                      <Badge variant="teal">Cette semaine</Badge>
                    </div>
                    <h4 className="text-2xl font-bold mt-3">7</h4>
                    <p className="text-sm text-muted-foreground">Articles lus</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-white to-sky-50 p-4 rounded-lg border border-sky-100 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-sky-100 rounded-full">
                        <Target className="h-5 w-5 text-sky-600" />
                      </div>
                      <Badge variant="sky">Cette semaine</Badge>
                    </div>
                    <h4 className="text-2xl font-bold mt-3">3</h4>
                    <p className="text-sm text-muted-foreground">Objectifs atteints</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-white to-amber-50 p-4 rounded-lg border border-amber-100 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-amber-100 rounded-full">
                        <Star className="h-5 w-5 text-amber-600" />
                      </div>
                      <Badge variant="amber">Total</Badge>
                    </div>
                    <h4 className="text-2xl font-bold mt-3">145</h4>
                    <p className="text-sm text-muted-foreground">Points gagnés</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <ReadingHistory articles={mockProfileData.articles} />
          </TabsContent>
          
          <TabsContent value="challenges" className="space-y-6 animate-fadeIn">
            <Challenges challenges={mockProfileData.defis} />
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-6 animate-fadeIn">
            <Card className="border-none shadow-sm overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-sky-500/20 to-blue-500/20 p-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Shield className="h-5 w-5 text-sky-600" />
                  Conseils personnalisés
                </h3>
              </div>
              <CardContent className="p-4">
                <div className="rounded-lg border border-sky-100 p-4 mb-4 bg-sky-50/50">
                  <div className="flex gap-3 items-start">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                      <Heart className="h-5 w-5 text-rose-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-base">Suivi de votre tension artérielle</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        D'après vos dernières mesures, nous vous recommandons de surveiller votre tension artérielle quotidiennement.
                      </p>
                      <Button variant="soft" size="sm" className="mt-3" onClick={() => toast({ 
                        title: "Conseil enregistré",
                        description: "Un rappel a été ajouté à votre calendrier"
                      })}>
                        Ajouter un rappel <Bell className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-teal-100 p-4 bg-teal-50/50">
                  <div className="flex gap-3 items-start">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                      <Dumbbell className="h-5 w-5 text-teal-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-base">Programme d'activité physique adapté</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Un programme de 4 semaines adapté à votre profil a été créé pour améliorer votre endurance.
                      </p>
                      <Button variant="soft" size="sm" className="mt-3" onClick={() => toast({ 
                        title: "Programme activé",
                        description: "Vous pouvez maintenant accéder à votre programme personnalisé"
                      })}>
                        Voir le programme <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Recommendations recommendations={mockProfileData.recommendations} />
          </TabsContent>
          
          <TabsContent value="health-sync" className="space-y-6 animate-fadeIn">
            <HealthSync />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileSante;
