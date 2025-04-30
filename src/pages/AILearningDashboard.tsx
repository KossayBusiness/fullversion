
import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  getAILearningStatus, 
  getAIModelDetailedStatus, 
  trainAIModel, 
  identifyPatternCorrelations,
  analyzeRecommendationPerformance,
  evaluateDataQuality,
  optimizeAIParameters,
  resetLearningSystem
} from "@/utils/aiLearning";
import { 
  BarChart, 
  LineChart, 
  RefreshCw, 
  Info, 
  AlertTriangle, 
  Lock,
  Database, 
  Brain, 
  AlertCircle, 
  Loader2, 
  CheckCircle2, 
  Settings,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Zap,
  BookOpen
} from "lucide-react";
import AILearningInsights from "@/components/AILearningInsights";

// Define chart types
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    fill?: boolean;
  }[];
}

export default function AILearningDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [aiStatus, setAiStatus] = useState<any>(null);
  const [detailedStatus, setDetailedStatus] = useState<any>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainingResult, setTrainingResult] = useState<any>(null);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [dataQuality, setDataQuality] = useState<any>(null);
  const [correlations, setCorrelations] = useState<any>(null);
  const [performances, setPerformances] = useState<any>(null);
  const [aiParameters, setAIParameters] = useState({
    learningRate: 0.001,
    batchSize: 64,
    epochCount: 20,
    optimizerType: 'adam',
    dropoutRate: 0.2,
    patientCount: 100
  });
  const [refreshing, setRefreshing] = useState(false);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [performanceChartData, setPerformanceChartData] = useState<ChartData | null>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // Load all dashboard data
  const loadDashboardData = useCallback(async () => {
    setRefreshing(true);
    try {
      // Get AI status
      const status = getAILearningStatus();
      setAiStatus(status);

      // Get detailed model status
      const modelStatus = getAIModelDetailedStatus();
      setDetailedStatus(modelStatus);
      
      // Get data quality metrics
      const qualityData = evaluateDataQuality();
      setDataQuality(qualityData);
      
      // Get pattern correlations
      const patternData = identifyPatternCorrelations();
      setCorrelations(patternData);
      
      // Get recommendation performance
      const performanceData = analyzeRecommendationPerformance();
      setPerformances(performanceData);

      // Prepare chart data for correlations
      const correlationChartData: ChartData = {
        labels: patternData.factors.map((f: any) => f.name),
        datasets: [
          {
            label: 'Correlation Strength',
            data: patternData.factors.map((f: any) => f.correlationStrength),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgb(75, 192, 192)',
          }
        ]
      };
      setChartData(correlationChartData);

      // Prepare performance chart data
      const perfChartData: ChartData = {
        labels: performanceData.history.map((h: any) => h.date),
        datasets: [
          {
            label: 'Accuracy',
            data: performanceData.history.map((h: any) => h.accuracy * 100),
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            fill: true
          },
          {
            label: 'Precision',
            data: performanceData.history.map((h: any) => h.precision * 100),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            fill: true
          }
        ]
      };
      setPerformanceChartData(perfChartData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const handleTrainModel = async () => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    // Simulation of training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 300);
    
    try {
      const result = await trainAIModel({ 
        newDatapoints: 150,
        parameters: aiParameters
      });
      
      setTrainingResult(result);
      clearInterval(interval);
      setTrainingProgress(100);

      // Reload data after training
      setTimeout(() => {
        loadDashboardData();
      }, 1000);
    } catch (error) {
      console.error("Error training model:", error);
      clearInterval(interval);
    } finally {
      setTimeout(() => {
        setIsTraining(false);
      }, 1000);
    }
  };

  const handleParameterOptimization = async () => {
    try {
      const optimizedParams = await optimizeAIParameters();
      setAIParameters(optimizedParams);
    } catch (error) {
      console.error("Error optimizing parameters:", error);
    }
  };

  const handleReset = async () => {
    try {
      await resetLearningSystem();
      setResetConfirmOpen(false);
      loadDashboardData();
    } catch (error) {
      console.error("Error resetting system:", error);
    }
  };

  if (!aiStatus || !detailedStatus || !dataQuality || !correlations || !performances) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
            <h2 className="text-xl font-bold mb-2">Loading AI System Status...</h2>
            <p className="text-muted-foreground">Fetching neural network data and analytics</p>
          </div>
        </div>
      </div>
    );
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="container mx-auto px-4 py-8"
    >
      <Helmet>
        <title>AI Learning Dashboard - Natural Pure Academy</title>
        <meta name="description" content="Advanced AI learning system status and management dashboard for nutritional recommendations" />
      </Helmet>

      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Learning System Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Neural network recommendation engine monitoring and management
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={loadDashboardData}
              disabled={refreshing}
            >
              {refreshing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Data
                </>
              )}
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => setResetConfirmOpen(true)}
            >
              <Lock className="mr-2 h-4 w-4" />
              Reset System
            </Button>
          </div>
        </div>
        
        {trainingResult && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md"
          >
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
              <div>
                <h3 className="font-medium text-green-800">Training Completed Successfully</h3>
                <p className="mt-1 text-sm text-green-700">
                  {trainingResult.message} New accuracy: {(trainingResult.newAccuracy * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {/* Card 1: Learning Progress */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-500" />
              Learning Progress
            </CardTitle>
            <CardDescription>Overall neural network training progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{aiStatus.learningProgress}%</span>
              </div>
              <Progress value={aiStatus.learningProgress} className="h-2" />
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Epochs</p>
                  <p className="font-medium">{detailedStatus.epochs} / {aiParameters.epochCount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Iterations</p>
                  <p className="font-medium">{detailedStatus.iterations}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Loss</p>
                  <p className="font-medium">{detailedStatus.loss.toFixed(4)}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-1 text-xs text-muted-foreground flex justify-between">
            <span>Last updated: {new Date(aiStatus.lastUpdated).toLocaleString()}</span>
            <span className="flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              {detailedStatus.convergenceRate}% convergence
            </span>
          </CardFooter>
        </Card>

        {/* Card 2: Data Collection */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Database className="h-5 w-5 mr-2 text-indigo-500" />
              Data Collection
            </CardTitle>
            <CardDescription>Neural network training data points</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-3xl font-bold">{aiStatus.dataPointsCollected.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">User profiles processed for training</div>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-md bg-muted p-2">
                <div className="text-xs text-muted-foreground">Quality Score</div>
                <div className="text-lg font-semibold">{(dataQuality.overallQuality * 100).toFixed(1)}%</div>
              </div>
              <div className="rounded-md bg-muted p-2">
                <div className="text-xs text-muted-foreground">Diversity Index</div>
                <div className="text-lg font-semibold">{dataQuality.diversityIndex.toFixed(2)}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <span className="text-sm">Status: <span className="text-green-500 font-medium">Active Collection</span></span>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
              {dataQuality.newPointsPerDay} pts/day
            </div>
          </CardFooter>
        </Card>

        {/* Card 3: Model Accuracy */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Zap className="h-5 w-5 mr-2 text-amber-500" />
              Model Performance
            </CardTitle>
            <CardDescription>Neural network predictive metrics</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-3xl font-bold">{(detailedStatus.accuracy * 100).toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-1">Overall recommendation accuracy</div>
            
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Precision</div>
                <div className="font-medium">{(performances.precision * 100).toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Recall</div>
                <div className="font-medium">{(performances.recall * 100).toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">F1 Score</div>
                <div className="font-medium">{(performances.f1Score * 100).toFixed(1)}%</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <span className="text-sm">Version: <span className="font-medium">{detailedStatus.version}</span></span>
            <Button size="sm" onClick={handleTrainModel} disabled={isTraining}>
              {isTraining ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {trainingProgress}%
                </>
              ) : (
                "Train Model"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="performance" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 grid w-full grid-cols-5">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="patterns">Pattern Analysis</TabsTrigger>
          <TabsTrigger value="parameters">Neural Parameters</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recommendation Precision by Category</CardTitle>
                <CardDescription>Accuracy analysis by recommendation type</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4">
                  {performances.categories.map((category: any) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">{(category.accuracy * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={category.accuracy * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">View Details</Button>
                <div className="text-xs text-muted-foreground">
                  Last evaluation: {new Date(performances.lastEvaluation).toLocaleDateString()}
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Historical Performance</CardTitle>
                <CardDescription>Accuracy and precision trends over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                {performanceChartData ? (
                  <div className="w-full h-full relative">
                    {/* This would be a real chart in production */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <LineChart className="h-40 w-40 text-primary opacity-20" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0">
                      <div className="grid grid-cols-6 gap-1">
                        {performanceChartData.datasets[0].data.map((value, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className="w-full h-32 relative">
                              <div 
                                className="absolute bottom-0 w-6 bg-blue-500 opacity-70 rounded-t"
                                style={{ height: `${value}%`, maxHeight: '100%' }}
                              ></div>
                            </div>
                            <span className="text-xs mt-1 text-muted-foreground">{performanceChartData.labels[i]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Feedback Analysis</CardTitle>
              <CardDescription>How users rate the quality of AI recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                {performances.userFeedback.map((feedback: any) => (
                  <div key={feedback.type} className="rounded-lg border p-3">
                    <div className="text-sm font-medium">{feedback.type}</div>
                    <div className="mt-1 flex items-baseline">
                      <span className="text-2xl font-bold">{(feedback.score * 5).toFixed(1)}</span>
                      <span className="ml-1 text-xs text-muted-foreground">/5</span>
                    </div>
                    <div className="mt-2">
                      <Progress value={feedback.score * 100} className="h-1" />
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {feedback.responseCount} responses
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pattern Analysis Tab */}
        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Pattern Correlations</CardTitle>
              <CardDescription>Top factors affecting recommendation relevance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {correlations.factors.map((factor: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-2 rounded-full bg-primary h-6 w-6 flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium">{factor.name}</h4>
                          <span className={`ml-2 text-sm ${factor.correlationStrength > 0.7 ? 'text-green-600' : factor.correlationStrength > 0.4 ? 'text-amber-600' : 'text-red-600'}`}>
                            {(factor.correlationStrength * 100).toFixed(1)}% correlation
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{factor.description}</p>
                      </div>
                    </div>
                    <Progress value={factor.correlationStrength * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Based on analysis of {correlations.sampleSize} user profiles and recommendations
              </div>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cross-factor Influence Matrix</CardTitle>
                <CardDescription>How different health factors interact</CardDescription>
              </CardHeader>
              <CardContent className="h-80 relative">
                {/* This would be a real matrix visualization in production */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-md grid grid-cols-5 gap-1">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="aspect-square rounded" 
                        style={{ 
                          backgroundColor: `rgba(59, 130, 246, ${0.2 + (Math.random() * 0.8)})` 
                        }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Discovered Pattern Clusters</CardTitle>
                <CardDescription>User profile clusters with similar recommendation patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {correlations.clusters.map((cluster: any) => (
                    <div key={cluster.id} className="rounded-lg border p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{cluster.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{cluster.description}</p>
                        </div>
                        <div className="text-sm font-medium text-blue-600">
                          {cluster.userCount} users
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {cluster.topTraits.map((trait: string) => (
                          <div key={trait} className="bg-blue-50 text-blue-800 rounded-full px-2 py-1 text-xs">
                            {trait}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Neural Parameters Tab */}
        <TabsContent value="parameters" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Neural Network Parameters</CardTitle>
                <CardDescription>Configure AI learning system parameters</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              >
                {showAdvancedSettings ? (
                  <>
                    <ChevronUp className="mr-1 h-4 w-4" />
                    Hide Advanced
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-1 h-4 w-4" />
                    Show Advanced
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="learningRate">Learning Rate</Label>
                    <div className="flex items-center space-x-2">
                      <Slider
                        id="learningRate"
                        defaultValue={[aiParameters.learningRate * 1000]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(value) => setAIParameters({
                          ...aiParameters,
                          learningRate: value[0] / 1000
                        })}
                      />
                      <span className="w-12 text-sm">{aiParameters.learningRate}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batchSize">Batch Size</Label>
                    <Select
                      defaultValue={aiParameters.batchSize.toString()}
                      onValueChange={(value) => setAIParameters({
                        ...aiParameters,
                        batchSize: parseInt(value)
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select batch size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="16">16</SelectItem>
                        <SelectItem value="32">32</SelectItem>
                        <SelectItem value="64">64</SelectItem>
                        <SelectItem value="128">128</SelectItem>
                        <SelectItem value="256">256</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="epochCount">Training Epochs</Label>
                    <Input
                      id="epochCount"
                      type="number"
                      min={5}
                      max={100}
                      value={aiParameters.epochCount}
                      onChange={(e) => setAIParameters({
                        ...aiParameters,
                        epochCount: parseInt(e.target.value)
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="optimizerType">Optimizer</Label>
                    <Select
                      defaultValue={aiParameters.optimizerType}
                      onValueChange={(value) => setAIParameters({
                        ...aiParameters,
                        optimizerType: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select optimizer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sgd">SGD</SelectItem>
                        <SelectItem value="adam">Adam</SelectItem>
                        <SelectItem value="rmsprop">RMSprop</SelectItem>
                        <SelectItem value="adagrad">Adagrad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {showAdvancedSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 pt-4 border-t"
                  >
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="dropoutRate">Dropout Rate</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            id="dropoutRate"
                            defaultValue={[aiParameters.dropoutRate * 100]}
                            min={0}
                            max={50}
                            step={5}
                            onValueChange={(value) => setAIParameters({
                              ...aiParameters,
                              dropoutRate: value[0] / 100
                            })}
                          />
                          <span className="w-12 text-sm">{aiParameters.dropoutRate}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patientCount">Early Stopping Patience</Label>
                        <Input
                          id="patientCount"
                          type="number"
                          min={1}
                          max={200}
                          value={aiParameters.patientCount}
                          onChange={(e) => setAIParameters({
                            ...aiParameters,
                            patientCount: parseInt(e.target.value)
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center">
                          <span className="mr-2">L2 Regularization</span>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </Label>
                        <Select defaultValue="0.01">
                          <SelectTrigger>
                            <SelectValue placeholder="Select value" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0.001">0.001 (Low)</SelectItem>
                            <SelectItem value="0.01">0.01 (Medium)</SelectItem>
                            <SelectItem value="0.1">0.1 (High)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <span className="mr-2">Network Architecture</span>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </Label>
                      <Select defaultValue="gru">
                        <SelectTrigger>
                          <SelectValue placeholder="Select architecture" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mlp">Multi-layer Perceptron</SelectItem>
                          <SelectItem value="cnn">Convolutional Network</SelectItem>
                          <SelectItem value="lstm">LSTM</SelectItem>
                          <SelectItem value="gru">GRU</SelectItem>
                          <SelectItem value="transformer">Transformer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Changing advanced parameters may significantly impact model performance. 
                        Consider using automated parameter optimization instead.
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleParameterOptimization}>
                <Settings className="mr-2 h-4 w-4" />
                Auto-optimize Parameters
              </Button>
              <Button onClick={handleTrainModel} disabled={isTraining}>
                {isTraining ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Training...
                  </>
                ) : (
                  "Apply & Train Model"
                )}
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Feature Importance</CardTitle>
                <CardDescription>Top influential features for the model</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {correlations.features.map((feature: any) => (
                    <div key={feature.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{feature.name}</span>
                        <span className="font-medium">{feature.importance.toFixed(3)}</span>
                      </div>
                      <Progress
                        value={feature.importance * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Curve</CardTitle>
                <CardDescription>Model performance as data increases</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                {/* This would be a real chart in production */}
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LineChart className="h-40 w-40 text-muted-foreground opacity-20" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 border-b border-l h-48">
                    <div className="absolute bottom-0 left-0 right-0 h-full">
                      <div className="relative h-full">
                        <svg className="w-full h-full overflow-visible">
                          <path 
                            d="M0,150 C50,120 100,80 150,60 C200,40 250,30 300,25 C350,20 400,15 450,12" 
                            fill="none" 
                            stroke="rgb(59, 130, 246)" 
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <AILearningInsights />
        </TabsContent>

        {/* Documentation Tab */}
        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Learning System Documentation</CardTitle>
              <CardDescription>Technical overview of the recommendation neural network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <h3>System Architecture</h3>
                <p>
                  The AI recommendation system uses a hybrid neural network architecture combining
                  collaborative filtering with content-based learning. The system continuously improves
                  by analyzing user profiles, health data, quiz responses, and feedback on provided
                  recommendations.
                </p>
                
                <h3>Learning Methodology</h3>
                <p>
                  Our system employs supervised learning with semi-supervised extensions for unlabeled
                  data. The core neural network uses a transformer-based architecture to capture
                  complex patterns between health indicators and effective nutritional interventions.
                </p>
                
                <h3>Data Processing Pipeline</h3>
                <ul>
                  <li>User profile generation and anonymization</li>
                  <li>Feature extraction and normalization</li>
                  <li>Training/validation/test split management</li>
                  <li>Model training with cross-validation</li>
                  <li>Hyperparameter optimization</li>
                  <li>Model evaluation and deployment</li>
                </ul>
                
                <h3>API Usage</h3>
                <pre className="bg-muted p-4 rounded-md text-xs">
                  <code>
{`import { enhanceRecommendationsWithLocalAI } from "@/utils/aiLearning";

// Example usage
const enhancedRecommendations = enhanceRecommendationsWithAI(
  basicRecommendations,
  quizData
);`}
                  </code>
                </pre>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                View Full Technical Documentation
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {resetConfirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              Reset AI Learning System
            </h3>
            <p className="my-4">
              This will reset all learning progress, delete collected data, and restore default parameters.
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setResetConfirmOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReset}>
                Reset System
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
