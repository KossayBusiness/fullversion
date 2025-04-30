
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Database, 
  ChartBar, 
  ArrowUpRight, 
  UserCheck, 
  Award, 
  Activity, 
  BarChart, 
  Calendar,
  LineChart,
  ArrowRight,
  CheckCircle,
  RefreshCw,
  PercentSquare,
  Zap
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { evaluateDataQuality, getAILearningStatus, identifyPatternCorrelations, trainAIModel } from '@/utils/aiLearningEngine';
import SUPPLEMENT_CATALOG from '@/data/supplementCatalog';
import { analyzeRecommendationPerformance } from '@/utils/aiLearningEngine';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AILearningDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isTrainingModel, setIsTrainingModel] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [modelStatus, setModelStatus] = useState<any>(null);
  const [dataQuality, setDataQuality] = useState<any>(null);
  const [correlations, setCorrelations] = useState<any>(null);
  const [performances, setPerformances] = useState<any>(null);
  const [showTrainingSuccess, setShowTrainingSuccess] = useState(false);

  useEffect(() => {
    // Charger toutes les données pertinentes
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Chargement de l'état du modèle IA
    setModelStatus(getAILearningStatus());
    
    // Chargement de la qualité des données
    setDataQuality(evaluateDataQuality());
    
    // Chargement des corrélations de motifs
    setCorrelations(identifyPatternCorrelations());
    
    // Chargement des performances de recommandations
    setPerformances(analyzeRecommendationPerformance());
  };

  const handleTrainModel = async () => {
    setIsTrainingModel(true);
    setTrainingProgress(0);
    
    // Simulation de progression
    const intervalId = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 98) {
          clearInterval(intervalId);
          return 98;
        }
        return prev + Math.random() * 5;
      });
    }, 300);
    
    try {
      // Appel réel à l'entraînement du modèle
      await trainAIModel(true);
      
      // Finalisation
      setTrainingProgress(100);
      setTimeout(() => {
        setIsTrainingModel(false);
        loadDashboardData();
        setShowTrainingSuccess(true);
        setTimeout(() => setShowTrainingSuccess(false), 5000);
      }, 500);
      
    } catch (error) {
      console.error("Erreur lors de l'entraînement du modèle:", error);
      setIsTrainingModel(false);
      clearInterval(intervalId);
    }
  };

  if (!modelStatus) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Brain className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <h2 className="text-xl font-semibold mb-2">Chargement des données IA...</h2>
          <p className="text-muted-foreground">Récupération des métriques d'apprentissage</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container py-8 max-w-6xl mx-auto px-4"
    >
      {showTrainingSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Entraînement réussi</AlertTitle>
          <AlertDescription className="text-green-700">
            Le modèle a été entraîné avec succès. Nouvelle version: {modelStatus.modelVersion}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tableau de Bord d'Apprentissage IA</h1>
          <p className="text-muted-foreground mt-1">
            Supervision et optimisation du système d'apprentissage automatique
          </p>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadDashboardData}
            className="flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          
          <Button 
            size="sm" 
            onClick={handleTrainModel}
            disabled={isTrainingModel}
            className="flex items-center"
          >
            <Brain className="h-4 w-4 mr-2" />
            {isTrainingModel ? 'Entraînement en cours...' : 'Entraîner le modèle'}
          </Button>
        </div>
      </div>

      {isTrainingModel && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Entraînement du modèle en cours</p>
                  <p className="text-sm text-muted-foreground">Progression: {Math.round(trainingProgress)}%</p>
                </div>
                <span className="text-sm font-bold">{Math.round(trainingProgress)}%</span>
              </div>
              <Progress value={trainingProgress} className="h-2" />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <div className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg">
                  <Database className="h-5 w-5 text-blue-600 mb-1" />
                  <span className="text-xs text-blue-600">Préparation des données</span>
                  <span className="text-xs font-semibold">{trainingProgress > 20 ? 'Complété' : 'En cours'}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-purple-50 rounded-lg">
                  <Brain className="h-5 w-5 text-purple-600 mb-1" />
                  <span className="text-xs text-purple-600">Entraînement du réseau</span>
                  <span className="text-xs font-semibold">{trainingProgress > 60 ? (trainingProgress >= 98 ? 'Complété' : 'En cours') : 'En attente'}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-green-50 rounded-lg">
                  <Activity className="h-5 w-5 text-green-600 mb-1" />
                  <span className="text-xs text-green-600">Validation</span>
                  <span className="text-xs font-semibold">{trainingProgress > 85 ? (trainingProgress >= 98 ? 'En cours' : 'En attente') : 'En attente'}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-amber-50 rounded-lg">
                  <Award className="h-5 w-5 text-amber-600 mb-1" />
                  <span className="text-xs text-amber-600">Finalisation</span>
                  <span className="text-xs font-semibold">{trainingProgress >= 100 ? 'Complété' : 'En attente'}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-4 mb-8">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="data-quality">Qualité des données</TabsTrigger>
          <TabsTrigger value="correlations">Corrélations</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-primary" /> État du modèle d'IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Version du modèle</span>
                    <Badge variant="outline" className="font-mono">{modelStatus.modelVersion}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Précision</span>
                    <span className="font-semibold">{(modelStatus.accuracy * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dernier entraînement</span>
                    <span className="text-sm">{formatDate(modelStatus.lastTrainingDate)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Nombre de données</span>
                    <span className="font-semibold">{modelStatus.dataPointsCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Profils uniques</span>
                    <span className="font-semibold">{modelStatus.uniqueProfilesCount.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">Voir les détails <ArrowRight className="ml-1 h-4 w-4" /></Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Détails du modèle d'IA - v{modelStatus.modelVersion}</DialogTitle>
                      <DialogDescription>
                        Informations techniques et historique d'entraînement
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <h3 className="font-medium mb-2">Historique d'entraînement</h3>
                        <div className="bg-muted p-3 rounded-md max-h-60 overflow-y-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-muted-foreground/20">
                                <th className="text-left pb-2">Date</th>
                                <th className="text-left pb-2">Durée</th>
                                <th className="text-left pb-2">Échantillons</th>
                                <th className="text-left pb-2">Précision</th>
                                <th className="text-left pb-2">Type</th>
                              </tr>
                            </thead>
                            <tbody>
                              {modelStatus.trainingHistory.slice().reverse().map((entry: any, index: number) => (
                                <tr key={index} className="border-b border-muted-foreground/10 last:border-0">
                                  <td className="py-2">{formatDate(entry.date)}</td>
                                  <td>{entry.duration.toFixed(1)}s</td>
                                  <td>{entry.dataPoints}</td>
                                  <td>{(entry.accuracy * 100).toFixed(1)}%</td>
                                  <td>{entry.fullTraining ? 'Complet' : 'Incrémental'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Améliorations récentes</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {modelStatus.improvements.map((improvement: string, index: number) => (
                            <li key={index} className="text-sm">{improvement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ChartBar className="mr-2 h-5 w-5 text-indigo-500" /> Métriques d'apprentissage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-36 w-full flex items-center justify-center bg-indigo-50 rounded-md mb-4">
                  <div className="text-center text-gray-500">
                    <LineChart className="h-8 w-8 mx-auto mb-2 text-indigo-400" />
                    <p className="text-sm">Évolution de la précision du modèle</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Qualité des données</span>
                      <span className="text-sm font-semibold">{dataQuality?.overallQuality || 0}%</span>
                    </div>
                    <Progress value={dataQuality?.overallQuality || 0} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Couverture des retours</span>
                      <span className="text-sm font-semibold">{dataQuality?.feedbackCoverage.toFixed(1) || 0}%</span>
                    </div>
                    <Progress value={dataQuality?.feedbackCoverage || 0} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Diversité des profils</span>
                      <span className="text-sm font-semibold">{dataQuality?.profileDiversity.toFixed(1) || 0}%</span>
                    </div>
                    <Progress value={dataQuality?.profileDiversity || 0} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600 mb-1" />
                    <span className="text-xs text-blue-600">Fréquence d'entraînement</span>
                    <span className="text-xs font-semibold">Hebdomadaire</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-green-50 rounded-lg">
                    <Zap className="h-5 w-5 text-green-600 mb-1" />
                    <span className="text-xs text-green-600">Méthode d'entraînement</span>
                    <span className="text-xs font-semibold">Transfer Learning</span>
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Award className="mr-2 h-5 w-5 text-amber-500" /> Top 5 Recommandations les plus efficaces
                </CardTitle>
                <CardDescription>
                  Basé sur les retours utilisateurs et les données d'efficacité
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performances && Object.entries(performances).length > 0 ? (
                    Object.entries(performances)
                      .filter(([id, data]: [string, any]) => data.totalRatings >= 3)
                      .sort(([idA, dataA]: [string, any], [idB, dataB]: [string, any]) => dataB.averageRating - dataA.averageRating)
                      .slice(0, 5)
                      .map(([supplementId, data]: [string, any], index: number) => {
                        const supplementName = SUPPLEMENT_CATALOG[supplementId]?.name || supplementId;
                        return (
                          <div key={supplementId} className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-semibold mr-3">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{supplementName}</p>
                              <div className="w-full h-2 bg-gray-100 rounded-full mt-1">
                                <div 
                                  className="h-full bg-amber-500 rounded-full" 
                                  style={{ width: `${(data.averageRating / 5) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="ml-3 flex flex-col items-end">
                              <span className="text-sm font-semibold">{(data.averageRating).toFixed(1)}/5</span>
                              <span className="text-xs text-muted-foreground">{data.totalRatings} avis</span>
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>Pas assez de données pour afficher les recommandations les plus performantes</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data-quality">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PercentSquare className="mr-2 h-5 w-5 text-blue-500" /> Qualité des données
                </CardTitle>
                <CardDescription>
                  Évaluation de la qualité des données d'apprentissage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-700 font-medium">Qualité globale</span>
                      <Badge variant="outline" className="bg-blue-100 text-blue-700">
                        {dataQuality?.overallQuality || 0}%
                      </Badge>
                    </div>
                    <Progress value={dataQuality?.overallQuality || 0} className="h-2 mb-3" />
                    <p className="text-sm text-blue-700/80">
                      Évaluation combinée de la couverture, diversité et volume des données.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-700 font-medium">Couverture des retours</span>
                      <Badge variant="outline" className="bg-green-100 text-green-700">
                        {dataQuality?.feedbackCoverage.toFixed(1) || 0}%
                      </Badge>
                    </div>
                    <Progress value={dataQuality?.feedbackCoverage || 0} className="h-2 mb-3" />
                    <p className="text-sm text-green-700/80">
                      Pourcentage de données d'apprentissage avec retours utilisateurs.
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-700 font-medium">Diversité des profils</span>
                      <Badge variant="outline" className="bg-purple-100 text-purple-700">
                        {dataQuality?.profileDiversity.toFixed(1) || 0}%
                      </Badge>
                    </div>
                    <Progress value={dataQuality?.profileDiversity || 0} className="h-2 mb-3" />
                    <p className="text-sm text-purple-700/80">
                      Variété de profils différents dans les données d'apprentissage.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Qualité des données par recommandation</CardTitle>
                <CardDescription>
                  Évaluation de la qualité des données pour chaque complément
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto max-h-96">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b">
                        <th className="text-left py-2">Complément</th>
                        <th className="text-left py-2">Qualité des données</th>
                        <th className="text-center py-2">Échantillons</th>
                        <th className="text-center py-2">Couverture</th>
                        <th className="text-center py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataQuality?.recommendations?.map((rec: any) => (
                        <tr key={rec.id} className="border-b">
                          <td className="py-2">{rec.name}</td>
                          <td>
                            <div className="flex items-center gap-2">
                              <Progress value={rec.dataQuality} className="h-2 w-32" />
                              <span>{rec.dataQuality.toFixed(0)}%</span>
                            </div>
                          </td>
                          <td className="text-center">{rec.sampleSize}</td>
                          <td className="text-center">
                            <Badge variant={rec.dataQuality > 50 ? 'default' : 'outline'} className={`
                              ${rec.dataQuality > 70 ? 'bg-green-100 text-green-700 hover:bg-green-100' : 
                                rec.dataQuality > 30 ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' : 
                                'bg-red-100 text-red-700 hover:bg-red-100'}
                            `}>
                              {rec.dataQuality > 70 ? 'Bonne' : rec.dataQuality > 30 ? 'Moyenne' : 'Faible'}
                            </Badge>
                          </td>
                          <td className="text-center">
                            <Button variant="ghost" size="sm">Analyse</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  La qualité des données impacte directement la précision des recommandations. Un minimum de 30 échantillons avec retours est recommandé pour chaque complément.
                </p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="correlations">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5 text-primary" /> Corrélations découvertes
                </CardTitle>
                <CardDescription>
                  Motifs détectés par l'IA dans les données d'apprentissage
                </CardDescription>
              </CardHeader>
              <CardContent>
                {correlations?.sufficientData ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-medium mb-3">Corrélations par tranches d'âge</h3>
                      {Object.keys(correlations.ageCorrelations).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {Object.entries(correlations.ageCorrelations).map(([age, recommendations]: [string, any]) => (
                            <Card key={age} className="border shadow-none">
                              <CardHeader className="py-3 px-4">
                                <CardTitle className="text-sm font-medium">{age} ans</CardTitle>
                              </CardHeader>
                              <CardContent className="py-2 px-4">
                                <ul className="space-y-2">
                                  {recommendations.slice(0, 3).map((rec: any) => {
                                    const supplement = SUPPLEMENT_CATALOG[rec.recommendationId];
                                    return (
                                      <li key={rec.recommendationId} className="flex items-center justify-between">
                                        <span className="text-sm">{supplement?.name || rec.recommendationId}</span>
                                        <Badge variant="outline" className="bg-green-50 text-green-700">
                                          {rec.rating.toFixed(1)}/5
                                        </Badge>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 bg-muted/20 rounded-lg">
                          <p className="text-sm text-muted-foreground">Pas assez de données pour identifier des corrélations par âge</p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-base font-medium mb-3">Corrélations par symptômes</h3>
                      {Object.keys(correlations.symptomCorrelations).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(correlations.symptomCorrelations).map(([symptom, recommendations]: [string, any]) => {
                            // Formatage du nom du symptôme
                            const symptomName = symptom
                              .replace(/([A-Z])/g, ' $1')
                              .replace(/_/g, ' ')
                              .replace(/^./, str => str.toUpperCase());
                              
                            return (
                              <Card key={symptom} className="border shadow-none">
                                <CardHeader className="py-3 px-4">
                                  <CardTitle className="text-sm font-medium">{symptomName}</CardTitle>
                                </CardHeader>
                                <CardContent className="py-2 px-4">
                                  <ul className="space-y-2">
                                    {recommendations.slice(0, 3).map((rec: any) => {
                                      const supplement = SUPPLEMENT_CATALOG[rec.recommendationId];
                                      return (
                                        <li key={rec.recommendationId} className="flex items-center justify-between">
                                          <span className="text-sm">{supplement?.name || rec.recommendationId}</span>
                                          <Badge variant="outline" className="bg-green-50 text-green-700">
                                            {rec.rating.toFixed(1)}/5
                                          </Badge>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-4 bg-muted/20 rounded-lg">
                          <p className="text-sm text-muted-foreground">Pas assez de données pour identifier des corrélations par symptôme</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Database className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <h3 className="text-lg font-medium mb-1">Données insuffisantes</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Nous avons besoin de plus de données pour identifier des corrélations significatives.
                      Un minimum de 20 profils avec retours est nécessaire.
                    </p>
                    <div className="mt-4 flex justify-center">
                      <Button variant="outline" size="sm">
                        <ArrowUpRight className="h-4 w-4 mr-2" />
                        Explorer les données actuelles
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-green-500" /> Performance des recommandations
                </CardTitle>
                <CardDescription>
                  Efficacité des recommandations selon les retours utilisateurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                {performances && Object.keys(performances).length > 0 ? (
                  <div className="overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Complément</th>
                          <th className="text-left py-2">Note moyenne</th>
                          <th className="text-center py-2">Recommandations</th>
                          <th className="text-center py-2">Avis</th>
                          <th className="text-center py-2">Taux d'avis</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(performances)
                          .sort(([idA, dataA]: [string, any], [idB, dataB]: [string, any]) => {
                            if (dataB.totalRatings === 0 && dataA.totalRatings === 0) {
                              return dataB.recommendationCount - dataA.recommendationCount;
                            }
                            if (dataB.totalRatings === 0) return -1;
                            if (dataA.totalRatings === 0) return 1;
                            return dataB.averageRating - dataA.averageRating;
                          })
                          .filter(([_, data]: [string, any]) => data.recommendationCount > 0)
                          .map(([supplementId, data]: [string, any]) => {
                            const supplementName = SUPPLEMENT_CATALOG[supplementId]?.name || supplementId;
                            const ratingRatio = data.recommendationCount > 0 
                              ? (data.totalRatings / data.recommendationCount) * 100 
                              : 0;
                              
                            return (
                              <tr key={supplementId} className="border-b">
                                <td className="py-2">{supplementName}</td>
                                <td>
                                  {data.totalRatings > 0 ? (
                                    <div className="flex items-center gap-2">
                                      <div className="flex">
                                        {[1, 2, 3, 4, 5].map(star => (
                                          <Award 
                                            key={star} 
                                            className={`h-4 w-4 ${star <= Math.round(data.averageRating) 
                                              ? 'text-amber-500' 
                                              : 'text-gray-300'}`} 
                                            fill={star <= Math.round(data.averageRating) ? 'currentColor' : 'none'}
                                          />
                                        ))}
                                      </div>
                                      <span>{data.averageRating.toFixed(1)}/5</span>
                                    </div>
                                  ) : (
                                    <span className="text-muted-foreground">Aucun avis</span>
                                  )}
                                </td>
                                <td className="text-center">{data.recommendationCount}</td>
                                <td className="text-center">{data.totalRatings}</td>
                                <td className="text-center">
                                  <Badge variant={ratingRatio > 0 ? 'default' : 'outline'} className={`
                                    ${ratingRatio > 50 ? 'bg-green-100 text-green-700 hover:bg-green-100' : 
                                      ratingRatio > 20 ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' : 
                                      'bg-red-100 text-red-700 hover:bg-red-100'}
                                  `}>
                                    {ratingRatio.toFixed(0)}%
                                  </Badge>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Aucune données de recommandation disponible</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Les données de performance sont utilisées pour améliorer les recommandations futures
                  en accordant plus de poids aux compléments bien notés pour des profils similaires.
                </p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
