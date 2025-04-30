
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '../components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { AlertCircle, CheckCircle2, Settings, Database, Key, BrainCircuit } from 'lucide-react';
import { getOpenAIConfig, updateOpenAIConfig, isOpenAIConfigured } from '../utils/openAiIntegration';
import AILearningInsights from '../components/AILearningInsights';
import { secureStorageService } from '../utils/secureStorage';
import { trainAIModel } from '../utils/aiLearning';

const AIConfigurationDashboard = () => {
  const [openAIKey, setOpenAIKey] = useState('');
  const [openAIConfig, setOpenAIConfig] = useState({
    enabled: false,
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 500,
    cacheResponses: true,
    cacheExpiry: 24
  });
  const [maintenanceMode, setMaintenanceMode] = useState({
    enabled: false,
    message: 'Le système d\'IA est actuellement en maintenance. Certaines fonctionnalités avancées peuvent être temporairement indisponibles.'
  });
  const [isConfigSaved, setIsConfigSaved] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState('openai');
  const [isTraining, setIsTraining] = useState(falsese);

  useEffect(() => {
    // Charger la configuration OpenAI
    try {
      const config = getOpenAIConfig();
      setOpenAIConfig(config);
      
      // Charger la clé API (masquée si elle existe)
      const apiKey = secureStorageService.getItem('openai_api_key');
      if (apiKey) {
        setOpenAIKey('••••••••••••••••••••••••••••••');
      }
      
      // Charger le mode maintenance
      const maintenanceSettings = secureStorageService.getItem('ai_maintenance_mode');
      if (maintenanceSettings) {
        setMaintenanceMode(maintenanceSettings);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de la configuration:", error);
      setStatusMessage({
        type: 'error',
        message: 'Erreur lors du chargement de la configuration'
      });
    }
  }, []);

  const handleOpenAIConfigChange = (key: string, value: any) => {
    setOpenAIConfig(prev => ({
      ...prev,
      [key]: value
    }));
    setIsConfigSaved(false);
  };

  const handleMaintenanceModeChange = (key: string, value: any) => {
    setMaintenanceMode(prev => ({
      ...prev,
      [key]: value
    }));
    setIsConfigSaved(false);
  };

  const saveOpenAIConfig = () => {
    try {
      // Sauvegarder la clé API si elle a été modifiée (et n'est pas masquée)
      if (openAIKey && !openAIKey.includes('•')) {
        secureStorageService.setItem('openai_api_key', openAIKey);
      }
      
      // Sauvegarder la configuration
      updateOpenAIConfig(openAIConfig);
      
      // Sauvegarder le mode maintenance
      secureStorageService.setItem('ai_maintenance_mode', maintenanceMode);
      
      setIsConfigSaved(true);
      setStatusMessage({
        type: 'success',
        message: 'Configuration sauvegardée avec succès'
      });
      
      // Effacer le message après 3 secondes
      setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la configuration:", error);
      setStatusMessage({
        type: 'error',
        message: 'Erreur lors de la sauvegarde de la configuration'
      });
    }
  };

  const startModelTraining = async () => {
    setIsTraining(true);
    setStatusMessage({
      type: 'info',
      message: 'Entraînement du modèle en cours...'
    });
    
    try {
      await trainAIModel();
      setStatusMessage({
        type: 'success',
        message: 'Modèle entraîné avec succès'
      });
    } catch (error) {
      console.error("Erreur lors de l'entraînement du modèle:", error);
      setStatusMessage({
        type: 'error',
        message: 'Erreur lors de l\'entraînement du modèle'
      });
    } finally {
      setIsTraining(false);
      // Effacer le message après 3 secondes
      setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
    }
  };

  const clearCache = () => {
    try {
      // Récupérer toutes les clés du stockage
      const allKeys = Object.keys(localStorage);
      
      // Filtrer les clés de cache OpenAI
      const cacheKeys = allKeys.filter(key => key.startsWith('openai_cache_'));
      
      // Supprimer les entrées du cache
      cacheKeys.forEach(key => {
        localStorage.removeItem(key);
      });
      
      setStatusMessage({
        type: 'success',
        message: `${cacheKeys.length} entrées du cache supprimées avec succès`
      });
      
      // Effacer le message après 3 secondes
      setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la suppression du cache:", error);
      setStatusMessage({
        type: 'error',
        message: 'Erreur lors de la suppression du cache'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Configuration de l'IA</h1>
        <Button 
          onClick={saveOpenAIConfig}
          disabled={isConfigSaved}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Sauvegarder les modifications
        </Button>
      </div>

      {statusMessage && (
        <Alert 
          className={`mb-6 ${
            statusMessage.type === 'success' ? 'bg-green-50 border-green-200' :
            statusMessage.type === 'error' ? 'bg-red-50 border-red-200' :
            'bg-blue-50 border-blue-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : statusMessage.type === 'error' ? (
            <AlertCircle className="h-4 w-4 text-red-600" />
          ) : (
            <BrainCircuit className="h-4 w-4 text-blue-600" />
          )}
          <AlertTitle>
            {statusMessage.type === 'success' ? 'Succès' : 
             statusMessage.type === 'error' ? 'Erreur' : 'Information'}
          </AlertTitle>
          <AlertDescription>
            {statusMessage.message}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="openai">
            <Key className="h-4 w-4 mr-2" />
            Configuration OpenAI
          </TabsTrigger>
          <TabsTrigger value="model">
            <BrainCircuit className="h-4 w-4 mr-2" />
            Modèle d'apprentissage
          </TabsTrigger>
          <TabsTrigger value="system">
            <Settings className="h-4 w-4 mr-2" />
            Paramètres système
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="openai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration de l'API OpenAI</CardTitle>
              <CardDescription>
                Configurez les paramètres d'intégration avec l'API OpenAI pour l'enrichissement des recommandations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-api-key">Clé API OpenAI</Label>
                <Input
                  id="openai-api-key"
                  type="password"
                  value={openAIKey}
                  onChange={(e) => setOpenAIKey(e.target.value)}
                  placeholder="sk-..."
                />
                <p className="text-sm text-gray-500">
                  Obtenez votre clé API sur <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-indigo-600">platform.openai.com</a>
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="openai-enabled"
                  checked={openAIConfig.enabled}
                  onCheckedChange={(checked) => handleOpenAIConfigChange('enabled', checked)}
                />
                <Label htmlFor="openai-enabled">Activer l'intégration OpenAI</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="openai-model">Modèle</Label>
                <select
                  id="openai-model"
                  value={openAIConfig.model}
                  onChange={(e) => handleOpenAIConfigChange('model', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="gpt-4">GPT-4 (Haute qualité, plus lent)</option>
                  <option value="gpt-4-turbo">GPT-4 Turbo (Équilibré)</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Rapide, moins précis)</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="temperature">Température: {openAIConfig.temperature.toFixed(1)}</Label>
                </div>
                <Slider
                  id="temperature"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[openAIConfig.temperature]}
                  onValueChange={(value) => handleOpenAIConfigChange('temperature', value[0])}
                />
                <p className="text-sm text-gray-500">
                  Valeurs basses = réponses plus cohérentes, valeurs hautes = plus de créativité
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="max-tokens">Tokens maximum: {openAIConfig.maxTokens}</Label>
                </div>
                <Slider
                  id="max-tokens"
                  min={100}
                  max={1500}
                  step={100}
                  value={[openAIConfig.maxTokens]}
                  onValueChange={(value) => handleOpenAIConfigChange('maxTokens', value[0])}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="cache-enabled"
                  checked={openAIConfig.cacheResponses}
                  onCheckedChange={(checked) => handleOpenAIConfigChange('cacheResponses', checked)}
                />
                <Label htmlFor="cache-enabled">Activer le cache des réponses</Label>
              </div>
              
              {openAIConfig.cacheResponses && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="cache-expiry">Expiration du cache: {openAIConfig.cacheExpiry}h</Label>
                  </div>
                  <Slider
                    id="cache-expiry"
                    min={1}
                    max={72}
                    step={1}
                    value={[openAIConfig.cacheExpiry]}
                    onValueChange={(value) => handleOpenAIConfigChange('cacheExpiry', value[0])}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={clearCache}
              >
                Vider le cache
              </Button>
              <Button 
                onClick={saveOpenAIConfig}
                disabled={isConfigSaved}
              >
                Sauvegarder
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="model" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Modèle d'apprentissage</CardTitle>
              <CardDescription>
                Visualisez et gérez le modèle d'apprentissage automatique
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Button 
                  onClick={startModelTraining}
                  disabled={isTraining}
                  className="mb-4"
                >
                  {isTraining ? 'Entraînement en cours...' : 'Lancer un entraînement manuel'}
                </Button>
                <p className="text-sm text-gray-500">
                  L'entraînement manuel permet de reconstruire le modèle avec toutes les données disponibles.
                  Le système effectue également des entraînements automatiques périodiques.
                </p>
              </div>
              
              <AILearningInsights />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres système</CardTitle>
              <CardDescription>
                Configurez les paramètres généraux du système d'IA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="maintenance-mode"
                    checked={maintenanceMode.enabled}
                    onCheckedChange={(checked) => handleMaintenanceModeChange('enabled', checked)}
                  />
                  <Label htmlFor="maintenance-mode">Mode maintenance</Label>
                </div>
                <p className="text-sm text-gray-500">
                  Le mode maintenance désactive temporairement les fonctionnalités avancées d'IA
                </p>
              </div>
              
              {maintenanceMode.enabled && (
                <div className="space-y-2">
                  <Label htmlFor="maintenance-message">Message de maintenance</Label>
                  <Textarea
                    id="maintenance-message"
                    value={maintenanceMode.message}
                    onChange={(e) => handleMaintenanceModeChange('message', e.target.value)}
                    rows={3}
                  />
                </div>
              )}
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-2">Statistiques du système</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Nombre total d'utilisateurs</p>
                    <p className="text-2xl font-bold">--</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Recommandations générées</p>
                    <p className="text-2xl font-bold">--</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-2">Actions de maintenance</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={clearCache}>
                    <Database className="h-4 w-4 mr-2" />
                    Vider le cache OpenAI
                  </Button>
                  
                  <Button variant="outline" onClick={() => {
                    // Implémenter plus tard: purger les anciennes données
                  }}>
                    <Database className="h-4 w-4 mr-2" />
                    Archiver les anciennes données
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={saveOpenAIConfig}
                disabled={isConfigSaved}
                className="w-full"
              >
                Sauvegarder les paramètres système
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AIConfigurationDashboard;
