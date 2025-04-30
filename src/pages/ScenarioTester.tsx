
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { runAllScenarioTests, TestResult, testUserScenario, summarizeTestResults } from '@/utils/userScenarioTester';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlignLeft, CheckCircle, AlertTriangle, RotateCw, Play, CheckSquare, Download } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ScenarioTester = () => {
  const [testResults, setTestResults] = useState<Record<string, TestResult>>({});
  const [summary, setSummary] = useState<{
    totalScenarios: number;
    successfulScenarios: number;
    failedScenarios: number;
    allPassed: boolean;
    failureDetails: Record<string, string[]>;
  } | null>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [selectedTab, setSelectedTab] = useState('summary');
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const handleRunTests = async () => {
    setIsRunningTests(true);
    
    // Simuler un délai pour donner l'impression de tests en cours
    setTimeout(() => {
      const results = runAllScenarioTests();
      setTestResults(results);
      setSummary(summarizeTestResults(results));
      setIsRunningTests(false);
    }, 1500);
  };

  const exportTestResults = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      results: testResults,
      summary
    }, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "scenario_test_results.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  useEffect(() => {
    // Exécuter les tests automatiquement au chargement de la page
    handleRunTests();
  }, []);

  return (
    <>
      <Helmet>
        <title>Testeur de Scénarios | Natural Pure Academy</title>
        <meta 
          name="description" 
          content="Outil interne pour tester le système de recommandation avec différents profils utilisateurs" 
        />
      </Helmet>

      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Testeur de Scénarios</h1>
          <p className="text-gray-600">
            Cet outil permet de tester le système de recommandation avec différents profils utilisateur.
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Button 
              onClick={handleRunTests} 
              disabled={isRunningTests}
              className="flex items-center gap-2"
            >
              {isRunningTests ? <RotateCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              {isRunningTests ? 'Exécution des tests...' : 'Lancer tous les tests'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={exportTestResults}
              disabled={!summary || isRunningTests}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Exporter les résultats
            </Button>
          </div>
          
          {summary && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Tests réussis:</span>
              <Progress 
                value={(summary.successfulScenarios / summary.totalScenarios) * 100} 
                className="w-32 h-2"
              />
              <span className="text-sm font-medium">
                {summary.successfulScenarios}/{summary.totalScenarios}
              </span>
            </div>
          )}
        </div>

        {isRunningTests ? (
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col items-center justify-center">
                <RotateCw className="h-10 w-10 text-primary animate-spin mb-4" />
                <h3 className="text-xl font-medium mb-2">Exécution des tests en cours</h3>
                <p className="text-gray-500">Veuillez patienter pendant l'analyse des scénarios...</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          summary && (
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="summary" className="flex items-center gap-2">
                  <AlignLeft className="h-4 w-4" />
                  Résumé
                </TabsTrigger>
                <TabsTrigger value="scenarios" className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4" />
                  Scénarios Testés
                </TabsTrigger>
                <TabsTrigger value="details" className="flex items-center gap-2" disabled={!selectedScenario}>
                  <AlignLeft className="h-4 w-4" />
                  Détails du Scénario
                </TabsTrigger>
              </TabsList>

              <TabsContent value="summary">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Résumé des Tests
                      <Badge className={summary.allPassed ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                        {summary.allPassed ? 'Tous les tests réussis' : 'Certains tests ont échoué'}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Vue d'ensemble des résultats des tests pour tous les scénarios
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Card className="bg-green-50 border-green-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-green-800">Tests Réussis</h3>
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <p className="text-3xl font-bold text-green-700">{summary.successfulScenarios}</p>
                        </CardContent>
                      </Card>
                      
                      <Card className={summary.failedScenarios > 0 ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-red-800">Tests Échoués</h3>
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          </div>
                          <p className="text-3xl font-bold text-red-700">{summary.failedScenarios}</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-blue-800">Total Scénarios</h3>
                            <span className="text-blue-600 font-bold">∑</span>
                          </div>
                          <p className="text-3xl font-bold text-blue-700">{summary.totalScenarios}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {summary.failedScenarios > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3">Détails des échecs</h3>
                        <div className="space-y-3">
                          {Object.entries(summary.failureDetails).map(([scenario, issues]) => (
                            <Alert key={scenario} variant="destructive">
                              <AlertTitle className="flex items-center justify-between">
                                <span>Échec du scénario: {scenario}</span>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => {
                                    setSelectedScenario(scenario);
                                    setSelectedTab('details');
                                  }}
                                >
                                  Voir détails
                                </Button>
                              </AlertTitle>
                              <AlertDescription>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                  {issues.map((issue, index) => (
                                    <li key={index} className="text-sm">{issue}</li>
                                  ))}
                                </ul>
                              </AlertDescription>
                            </Alert>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scenarios">
                <Card>
                  <CardHeader>
                    <CardTitle>Scénarios Testés</CardTitle>
                    <CardDescription>
                      Liste de tous les scénarios utilisateur testés
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Scénario</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Recommandations</TableHead>
                          <TableHead>Avertissements</TableHead>
                          <TableHead>Compatibilité</TableHead>
                          <TableHead className="w-24">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(testResults).map(([scenarioName, result]) => (
                          <TableRow key={scenarioName}>
                            <TableCell className="font-medium">{scenarioName}</TableCell>
                            <TableCell>
                              <Badge className={result.success 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                              }>
                                {result.success ? 'Réussi' : 'Échoué'}
                              </Badge>
                            </TableCell>
                            <TableCell>{result.recommendations.length}</TableCell>
                            <TableCell>{result.warnings}</TableCell>
                            <TableCell>{result.compatibility}</TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => {
                                  setSelectedScenario(scenarioName);
                                  setSelectedTab('details');
                                }}
                              >
                                Détails
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details">
                {selectedScenario && testResults[selectedScenario] && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Détails du Scénario: {selectedScenario}
                        <Badge className={testResults[selectedScenario].success 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                        }>
                          {testResults[selectedScenario].success ? 'Réussi' : 'Échoué'}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Analyse complète des résultats pour ce scénario utilisateur
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-3">Profil Utilisateur</h3>
                          <Card>
                            <CardContent className="p-4 overflow-auto max-h-60">
                              <pre className="text-xs">
                                {JSON.stringify(testResults[selectedScenario].userProfile, null, 2)}
                              </pre>
                            </CardContent>
                          </Card>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-3">Recommandations Générées</h3>
                          {testResults[selectedScenario].recommendations.length > 0 ? (
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                              {testResults[selectedScenario].recommendations.map((rec, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded border border-gray-200">
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <Alert>
                              <AlertDescription>
                                Aucune recommandation n'a été générée pour ce scénario.
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>

                        {!testResults[selectedScenario].success && (
                          <div>
                            <h3 className="text-lg font-medium mb-3 text-red-600">Problèmes Détectés</h3>
                            <ul className="space-y-2">
                              {testResults[selectedScenario].issues.map((issue, index) => (
                                <li key={index} className="flex items-start gap-2 bg-red-50 p-3 rounded border border-red-200">
                                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-red-700">{issue}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedTab('scenarios')}
                      >
                        Retour aux scénarios
                      </Button>
                      
                      <Button 
                        onClick={() => {
                          const result = testUserScenario(selectedScenario);
                          setTestResults({
                            ...testResults,
                            [selectedScenario]: result
                          });
                          setSummary(summarizeTestResults({
                            ...testResults,
                            [selectedScenario]: result
                          }));
                        }}
                        className="flex items-center gap-2"
                      >
                        <RotateCw className="h-4 w-4" />
                        Retester ce scénario
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          )
        )}
      </main>

      <Footer />
    </>
  );
};

export default ScenarioTester;
