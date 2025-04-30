
import React, { useState } from 'react';
import { getAIModelDetailedStatus, evaluateDataQuality } from '@/utils/recommenderSystem';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  BookOpen, 
  Brain, 
  ChevronDown, 
  ChevronUp, 
  Database, 
  Beaker, 
  LineChart, 
  Microscope, 
  Sparkles,
  Cpu
} from 'lucide-react';
import { FlaskConical } from '@/components/ui/icons';
import { Recommendation } from '@/utils/types';
import { motion } from 'framer-motion';

interface AILearningInsightsProps {
  recommendations: Recommendation[];
}

const AILearningInsights: React.FC<AILearningInsightsProps> = ({ recommendations }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const aiStatus = getAIModelDetailedStatus();
  const dataQuality = evaluateDataQuality();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Cpu className="text-blue-500 mr-2 h-5 w-5" />
          <div>
            <h3 className="font-semibold">Système d'IA NaturalPure v{aiStatus.modelVersion}</h3>
            <p className="text-sm text-gray-500">Dernière mise à jour: {aiStatus.lastUpdate}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <>
              <span className="mr-1">Réduire</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span className="mr-1">Développer</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-lg p-3 flex items-center">
          <Database className="h-8 w-8 text-blue-500 mr-3" />
          <div>
            <div className="text-sm text-slate-600">Base de connaissances</div>
            <div className="font-bold text-lg">{aiStatus.knowledgeBase.toLocaleString()} références</div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-3 flex items-center">
          <Brain className="h-8 w-8 text-indigo-500 mr-3" />
          <div>
            <div className="text-sm text-slate-600">Précision</div>
            <div className="font-bold text-lg">{Math.round(aiStatus.accuracy * 100)}%</div>
            <div className="text-xs text-green-600">+{aiStatus.accuracyImprovement}% depuis la dernière version</div>
          </div>
        </div>
      </div>

      {expanded && (
        <>
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Sparkles className="h-4 w-4 mr-1 text-amber-500" />
                Améliorations récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {aiStatus.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    {improvement}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-lg border p-3 hover:shadow-md transition-shadow"
            >
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Activity className="h-3.5 w-3.5 mr-1 text-blue-500" />
                Satisfaction utilisateur
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold">{aiStatus.userSatisfaction}%</span>
                <Badge variant="outline" className="text-green-600 bg-green-50 border-green-100">
                  +3.2%
                </Badge>
              </div>
              <Progress value={aiStatus.userSatisfaction} className="h-1.5 mt-2" />
              <p className="text-xs text-gray-500 mt-2">
                Basé sur {aiStatus.dataPointsAnalyzed > 1000 ? '1000+' : aiStatus.dataPointsAnalyzed} avis utilisateurs
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white rounded-lg border p-3 hover:shadow-md transition-shadow"
            >
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <BookOpen className="h-3.5 w-3.5 mr-1 text-indigo-500" />
                Couverture des cas
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold">{aiStatus.useCaseCoverage}%</span>
                <Badge variant="outline" className="text-green-600 bg-green-50 border-green-100">
                  +5.8%
                </Badge>
              </div>
              <Progress value={aiStatus.useCaseCoverage} className="h-1.5 mt-2" />
              <p className="text-xs text-gray-500 mt-2">
                {aiStatus.uniqueProfiles} profils nutritionnels uniques identifiés
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white rounded-lg border p-3 hover:shadow-md transition-shadow"
            >
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Beaker className="h-3.5 w-3.5 mr-1 text-purple-500" />
                Efficacité des recommandations
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold">{aiStatus.recommendationEfficiency}%</span>
                <Badge variant="outline" className="text-green-600 bg-green-50 border-green-100">
                  +2.5%
                </Badge>
              </div>
              <Progress value={aiStatus.recommendationEfficiency} className="h-1.5 mt-2" />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  Précision du modèle: {Math.round(aiStatus.accuracy * 100)}%
                </p>
                <p className="text-xs text-gray-500">
                  v{aiStatus.modelVersion}
                </p>
              </div>
            </motion.div>
          </div>

          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <LineChart className="h-4 w-4 mr-1 text-blue-500" />
                Données d'apprentissage
              </CardTitle>
              <CardDescription>Évolution de la qualité des données</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-500">Qualité globale des données</span>
                    <span className="text-sm font-medium">{Math.round(dataQuality.overallQuality * 100)}%</span>
                  </div>
                  <Progress value={dataQuality.overallQuality * 100} className="h-1.5" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-500">Complétude</span>
                    <span className="text-sm font-medium">{Math.round(dataQuality.completeness * 100)}%</span>
                  </div>
                  <Progress value={dataQuality.completeness * 100} className="h-1.5" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-500">Pertinence</span>
                    <span className="text-sm font-medium">{Math.round(dataQuality.relevance * 100)}%</span>
                  </div>
                  <Progress value={dataQuality.relevance * 100} className="h-1.5" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-500">Cohérence</span>
                    <span className="text-sm font-medium">{Math.round(dataQuality.consistency * 100)}%</span>
                  </div>
                  <Progress value={dataQuality.consistency * 100} className="h-1.5" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 text-xs text-gray-500">
              Basé sur l'analyse de {aiStatus.dataPointsAnalyzed.toLocaleString()} points de données
            </CardFooter>
          </Card>

          <div className="mt-4 bg-white border rounded-lg p-4">
            <h3 className="text-sm font-medium flex items-center mb-3">
              <Microscope className="h-4 w-4 mr-1 text-indigo-600" />
              Recommandations les plus efficaces selon les retours utilisateurs
            </h3>
            <div className="space-y-2">
              {aiStatus.topPerformingRecommendations && aiStatus.topPerformingRecommendations.length > 0 ? (
                aiStatus.topPerformingRecommendations.map((rec, index) => (
                  <div key={index} className="flex justify-between items-center text-sm py-1 border-b border-gray-100">
                    <span className="text-gray-700">{rec.id.split('_').join(' ')}</span>
                    <div className="flex items-center">
                      <span className="font-medium">{rec.averageRating.toFixed(1)}/5</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {rec.totalRatings} avis
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">Données insuffisantes</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AILearningInsights;
