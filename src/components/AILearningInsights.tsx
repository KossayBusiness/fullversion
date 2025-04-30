
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  PieChart, 
  Zap, 
  Lightbulb, 
  Sparkles, 
  TrendingUp, 
  BrainCircuit,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  identifyPatternCorrelations, 
  analyzeRecommendationPerformance 
} from "@/utils/aiLearning";

// Define type for insight
interface Insight {
  id: string;
  title: string;
  description: string;
  relevance: number;
  category: string;
  trend: 'up' | 'down' | 'stable';
  impact: 'high' | 'medium' | 'low';
  discoveryDate: string;
}

const AILearningInsights: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [correlations, setCorrelations] = useState<any>(null);
  const [performances, setPerformances] = useState<any>(null);

  useEffect(() => {
    // Simulate loading insights from the AI learning system
    setLoading(true);
    
    // Get pattern correlations and recommendation performance
    const correlationData = identifyPatternCorrelations();
    const performanceData = analyzeRecommendationPerformance();
    
    setCorrelations(correlationData);
    setPerformances(performanceData);
    
    // Generate insights based on correlations and performance
    const generatedInsights = generateInsights(correlationData, performanceData);
    
    setTimeout(() => {
      setInsights(generatedInsights);
      setLoading(false);
    }, 1000);
  }, []);

  // Generate insights from system data
  const generateInsights = (correlationData: any, performanceData: any): Insight[] => {
    const today = new Date().toISOString();
    const insightsList: Insight[] = [
      {
        id: 'insight-1',
        title: 'Sleep Quality Correlation Pattern',
        description: 'Strong correlation detected between magnesium supplementation and sleep improvement. Neural network detected this pattern across multiple age groups with 86% confidence.',
        relevance: 0.92,
        category: 'correlation',
        trend: 'up',
        impact: 'high',
        discoveryDate: today
      },
      {
        id: 'insight-2',
        title: 'Age-Specific Efficacy Variation',
        description: 'Recommendation efficacy shows significant variation across age groups. The AI model has identified optimal dosage adjustments to compensate for age-related absorption differences.',
        relevance: 0.84,
        category: 'efficacy',
        trend: 'stable',
        impact: 'medium',
        discoveryDate: today
      },
      {
        id: 'insight-3',
        title: 'Symptom Cluster Identification',
        description: 'The neural network has identified three distinct symptom clusters that respond differently to similar interventions. This insight enables more personalized recommendation targeting.',
        relevance: 0.89,
        category: 'pattern',
        trend: 'up',
        impact: 'high',
        discoveryDate: today
      },
      {
        id: 'insight-4',
        title: 'Lifestyle Factor Influence Weighting',
        description: 'Exercise frequency has been re-weighted in the recommendation algorithm based on new correlation strength data. This adjustment improved accuracy by 7% for active users.',
        relevance: 0.76,
        category: 'algorithm',
        trend: 'up',
        impact: 'medium',
        discoveryDate: today
      },
      {
        id: 'insight-5',
        title: 'Supplement Synergy Effect',
        description: 'The model has detected synergistic effects between certain supplement combinations that exceed predicted individual efficacy. This insight has been incorporated into multi-recommendation logic.',
        relevance: 0.88,
        category: 'discovery',
        trend: 'up',
        impact: 'high',
        discoveryDate: today
      },
      {
        id: 'insight-6',
        title: 'Seasonal Variation in Symptom Reporting',
        description: 'Seasonal patterns in symptom reporting and supplement efficacy have been identified. The model now accounts for seasonal adjustments in recommendation relevance scoring.',
        relevance: 0.72,
        category: 'seasonality',
        trend: 'stable',
        impact: 'medium',
        discoveryDate: today
      },
      {
        id: 'insight-7',
        title: 'Gender-Specific Response Patterns',
        description: 'Significant differences in supplement response patterns between gender groups have been identified for specific nutrients. Personalization factors have been updated accordingly.',
        relevance: 0.81,
        category: 'demographic',
        trend: 'up',
        impact: 'medium',
        discoveryDate: today
      }
    ];
    
    // Generate additional insights from correlation data
    if (correlationData && correlationData.factors) {
      correlationData.factors.forEach((factor: any, index: number) => {
        if (index < 2 && factor.correlationStrength > 0.7) {
          insightsList.push({
            id: `correlation-insight-${index}`,
            title: `${factor.name} Pattern Identified`,
            description: `The neural network has identified a strong correlation (${(factor.correlationStrength * 100).toFixed(1)}%) between ${factor.name.toLowerCase()}. This pattern improves recommendation precision for relevant user profiles.`,
            relevance: factor.correlationStrength,
            category: 'correlation',
            trend: 'up',
            impact: 'high',
            discoveryDate: today
          });
        }
      });
    }
    
    // Generate insights from performance data
    if (performanceData && performanceData.categories) {
      // Find the best performing category
      const bestCategory = [...performanceData.categories].sort((a, b) => b.accuracy - a.accuracy)[0];
      
      if (bestCategory && bestCategory.accuracy > 0.8) {
        insightsList.push({
          id: 'performance-insight-1',
          title: `${bestCategory.name} Recommendation Excellence`,
          description: `The model shows exceptional accuracy (${(bestCategory.accuracy * 100).toFixed(1)}%) in ${bestCategory.name} recommendations. Pattern analysis suggests the model has identified subtle correlations between reported symptoms and effective solutions in this category.`,
          relevance: bestCategory.accuracy,
          category: 'performance',
          trend: 'up',
          impact: 'high',
          discoveryDate: today
        });
      }
    }
    
    return insightsList;
  };

  // Filter insights by category
  const getFilteredInsights = () => {
    if (activeTab === 'discover') {
      return insights;
    }
    if (activeTab === 'highImpact') {
      return insights.filter(insight => insight.impact === 'high');
    }
    if (activeTab === 'recent') {
      // Sort by discovery date (most recent first)
      return [...insights].sort((a, b) => 
        new Date(b.discoveryDate).getTime() - new Date(a.discoveryDate).getTime()
      );
    }
    return insights;
  };

  // Get icon for insight category
  const getInsightIcon = (category: string) => {
    switch (category) {
      case 'correlation':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'pattern':
        return <BrainCircuit className="h-5 w-5 text-purple-500" />;
      case 'discovery':
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
      case 'algorithm':
        return <Zap className="h-5 w-5 text-green-500" />;
      case 'performance':
        return <BarChart className="h-5 w-5 text-indigo-500" />;
      default:
        return <Sparkles className="h-5 w-5 text-blue-400" />;
    }
  };

  // Get trend icon
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <BrainCircuit className="h-10 w-10 animate-pulse mx-auto mb-4 text-blue-500" />
          <h2 className="text-xl font-bold mb-2">Analyzing Patterns...</h2>
          <p className="text-muted-foreground">The neural network is processing insights</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Learning Insights</h2>
          <p className="text-muted-foreground">Neural network discovered patterns and insights</p>
        </div>
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full md:w-auto mt-4 md:mt-0"
        >
          <TabsList>
            <TabsTrigger value="discover">All Insights</TabsTrigger>
            <TabsTrigger value="highImpact">High Impact</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <BrainCircuit className="h-5 w-5 mr-2 text-blue-500" />
              Pattern Recognition
            </CardTitle>
            <CardDescription>Neural network pattern identification status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{insights.length}</div>
            <div className="text-sm text-muted-foreground">Actionable insights discovered</div>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pattern strength</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
              
              <div className="flex justify-between text-sm">
                <span>Confidence level</span>
                <span className="font-medium">84%</span>
              </div>
              <Progress value={84} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Zap className="h-5 w-5 mr-2 text-amber-500" />
              Learning Impact
            </CardTitle>
            <CardDescription>How insights affect recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+12.4%</div>
            <div className="text-sm text-muted-foreground">Recommendation accuracy improvement</div>
            
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-md bg-muted p-2">
                <div className="text-xs text-muted-foreground">High Impact</div>
                <div className="text-lg font-semibold">{insights.filter(i => i.impact === 'high').length}</div>
              </div>
              <div className="rounded-md bg-muted p-2">
                <div className="text-xs text-muted-foreground">Medium Impact</div>
                <div className="text-lg font-semibold">{insights.filter(i => i.impact === 'medium').length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
              Discovery Sources
            </CardTitle>
            <CardDescription>Origin of neural network insights</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="h-40 relative">
              {/* This would be an actual chart in production */}
              <div className="absolute inset-0 flex items-center justify-center">
                <PieChart className="h-24 w-24 text-muted-foreground opacity-20" />
              </div>
              <div className="absolute inset-0">
                <div className="h-full flex items-center justify-center">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span>Pattern Analysis (42%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span>User Feedback (28%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                      <span>Efficacy Tracking (18%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span>Other Sources (12%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {getFilteredInsights().map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2">
                    {getInsightIcon(insight.category)}
                    <div>
                      <CardTitle className="text-xl flex items-center">
                        {insight.title}
                        {getTrendIcon(insight.trend) && (
                          <span className="ml-2 flex items-center">
                            {getTrendIcon(insight.trend)}
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {insight.category.charAt(0).toUpperCase() + insight.category.slice(1)} insight • Relevance: {(insight.relevance * 100).toFixed(0)}% • 
                        Impact: <span className={
                          insight.impact === 'high' 
                            ? 'text-green-600 font-medium' 
                            : insight.impact === 'medium' 
                              ? 'text-amber-600 font-medium' 
                              : 'text-blue-600 font-medium'
                        }>
                          {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(insight.discoveryDate).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{insight.description}</p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="ghost" size="sm">
                  Apply to Model
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AILearningInsights;
