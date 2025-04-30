import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileStatCard } from "@/components/profile/ProfileStatCard";
import { ReadingHistory } from "@/components/profile/ReadingHistory";
import { Recommendations } from "@/components/profile/Recommendations";
import { Challenges } from "@/components/profile/Challenges";
import { HealthScore } from "@/components/profile/HealthScore";
import { HealthSync } from "@/components/profile/HealthSync";
import { LoginPrompt } from "@/components/profile/LoginPrompt";
import { Activity, Brain, Calendar, Dumbbell, Trophy, Sparkles, HeartPulse, Bell, ChevronRight, Star, Shield, Heart, Zap, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { mockProfileData } from "@/components/profile/ProfileData";
import PersonalizedWarnings from "@/components/ui/PersonalizedWarnings"; // Placeholder component


const mockUserData = {
  loggedIn: true,
  profile: {
    name: "Sarah",
    joinDate: "March 2023",
    quizCompleted: true,
    healthScore: 76,
    streak: 18
  }
};

const HealthProfile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const { toast } = useToast();

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast({
      title: "Login successful",
      description: "Welcome to your personalized health profile",
    });
  };

  const handleSyncClick = () => {
    toast({
      title: "Health data sync initiated",
      description: "Connecting to your health app...",
      duration: 3000
    });
  };

  if (!isLoggedIn) {
    return <LoginPrompt onLogin={handleLogin} />;
  }

  return (
    <>
      <Helmet>
        <title>Health Profile | Natural Pure Academy</title>
        <meta 
          name="description" 
          content="View your personalized health insights, recommendations, and progress tracking." 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-teal-50/30 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <ProfileHeader />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ProfileStatCard 
              title="Health Score"
              value="78"
              icon={<HeartPulse className="h-5 w-5 text-rose-500" />}
              trend="up"
              bgClass="bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200"
              onClick={() => toast({ title: "Your health score", description: "Calculated from your habits and symptoms" })}
            />

            <ProfileStatCard 
              title="Challenges completed"
              value="12"
              icon={<Trophy className="h-5 w-5 text-amber-500" />}
              trend="up"
              bgClass="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200"
              onClick={() => toast({ title: "Your completed challenges", description: "Continue to earn more medals!" })}
            />

            <ProfileStatCard 
              title="Consecutive days"
              value="8"
              icon={<Calendar className="h-5 w-5 text-teal-500" />}
              trend="stable"
              bgClass="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200"
              onClick={() => toast({ title: "Your current streak", description: "Keep going to maintain your streak!" })}
            />
          </div>

          <HealthScore />

          <Tabs defaultValue="history" className="space-y-8">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 h-auto bg-white p-1 rounded-lg shadow-sm mb-2">
              <TabsTrigger value="history" className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500/10 data-[state=active]:to-cyan-500/10">
                <BookOpen className="h-4 w-4" />
                <span>History</span>
              </TabsTrigger>
              <TabsTrigger value="challenges" className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500/10 data-[state=active]:to-orange-500/10">
                <Trophy className="h-4 w-4" />
                <span>Challenges</span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500/10 data-[state=active]:to-blue-500/10">
                <Sparkles className="h-4 w-4" />
                <span>Recommendations</span>
              </TabsTrigger>
              <TabsTrigger value="health-sync" className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500/10 data-[state=active]:to-pink-500/10">
                <Activity className="h-4 w-4" />
                <span>Connected Health</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="space-y-6 animate-fadeIn">
              <Card className="border-none shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 p-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Zap className="h-5 w-5 text-teal-600" />
                    Summary of your recent activity
                  </h3>
                </div>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-white to-teal-50 p-4 rounded-lg border border-teal-100 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="p-2 bg-teal-100 rounded-full">
                          <BookOpen className="h-5 w-5 text-teal-600" />
                        </div>
                        <Badge variant="teal">This week</Badge>
                      </div>
                      <h4 className="text-2xl font-bold mt-3">7</h4>
                      <p className="text-sm text-muted-foreground">Articles read</p>
                    </div>

                    <div className="bg-gradient-to-br from-white to-sky-50 p-4 rounded-lg border border-sky-100 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="p-2 bg-sky-100 rounded-full">
                          <Star className="h-5 w-5 text-sky-600" /> {/* Replaced Target with Star as Target is not defined */}
                        </div>
                        <Badge variant="sky">This week</Badge>
                      </div>
                      <h4 className="text-2xl font-bold mt-3">3</h4>
                      <p className="text-sm text-muted-foreground">Goals achieved</p>
                    </div>

                    <div className="bg-gradient-to-br from-white to-amber-50 p-4 rounded-lg border border-amber-100 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="p-2 bg-amber-100 rounded-full">
                          <Star className="h-5 w-5 text-amber-600" />
                        </div>
                        <Badge variant="amber">Total</Badge>
                      </div>
                      <h4 className="text-2xl font-bold mt-3">145</h4>
                      <p className="text-sm text-muted-foreground">Points earned</p>
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
                    Personalized advice
                  </h3>
                </div>
                <CardContent className="p-4">
                  <div className="rounded-lg border border-sky-100 p-4 mb-4 bg-sky-50/50">
                    <div className="flex gap-3 items-start">
                      <div className="p-2 bg-white rounded-full shadow-sm">
                        <Heart className="h-5 w-5 text-rose-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-base">Blood pressure monitoring</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Based on your latest measurements, we recommend monitoring your blood pressure daily.
                        </p>
                        <Button variant="soft" size="sm" className="mt-3" onClick={() => toast({ 
                          title: "Advice saved",
                          description: "A reminder has been added to your calendar"
                        })}>
                          Add reminder <Bell className="h-3 w-3" />
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
                        <h4 className="font-medium text-base">Tailored physical activity program</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          A 4-week program adapted to your profile has been created to improve your endurance.
                        </p>
                        <Button variant="soft" size="sm" className="mt-3" onClick={() => toast({ 
                          title: "Program activated",
                          description: "You can now access your personalized program"
                        })}>
                          View program <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                      <p className="text-sm text-indigo-800">
                        Ces informations sont générées en fonction de vos réponses au quiz et de notre base de données scientifiques.
                      </p>
                    </div>

                    {/* Section d'avertissements personnalisés */}
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">Précautions personnalisées</h3>
                      <PersonalizedWarnings 
                        warnings={[
                          {
                            type: 'medication',
                            title: 'Interaction potentielle avec médicaments',
                            description: 'Certains de vos médicaments peuvent interagir avec les suppléments recommandés. Consultez votre médecin avant de commencer.',
                            severity: 'medium',
                            source: 'Journal of Clinical Pharmacology, 2023',
                            recommendations: [
                              'Discutez de ces suppléments avec votre médecin',
                              'Commencez avec des doses plus faibles pour tester la tolérance'
                            ]
                          },
                          {
                            type: 'timing',
                            title: 'Ajustement saisonnier recommandé',
                            description: 'Les besoins en certains micronutriments varient selon la saison. Un ajustement peut être nécessaire dans les prochains mois.',
                            severity: 'low',
                            timeRelevant: true,
                            recommendations: [
                              'Augmentez votre vitamine D en hiver',
                              'Considérez un test sanguin saisonnier pour les nutriments clés'
                            ]
                          }
                        ]}
                        variant="detailed"
                      />
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
    </>
  );
};

export default HealthProfile;