
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const HealthSync = () => {
  const { toast } = useToast();

  const handleConnect = (service: string) => {
    toast({
      title: `Connexion à ${service}`,
      description: "Fonctionnalité en cours de développement"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connectez vos données de santé</CardTitle>
        <CardDescription>Synchronisez vos applications de santé pour des recommandations encore plus pertinentes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border rounded-lg p-6 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mb-4"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            <h3 className="text-lg font-semibold mb-2">Apple Health</h3>
            <p className="text-center mb-4 text-muted-foreground">
              Connectez vos données Apple Health pour un suivi intégré de vos activités quotidiennes
            </p>
            <Button variant="outline" onClick={() => handleConnect('Apple Health')}>Connecter</Button>
          </div>
          
          <div className="border rounded-lg p-6 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mb-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <h3 className="text-lg font-semibold mb-2">Google Fit</h3>
            <p className="text-center mb-4 text-muted-foreground">
              Synchronisez vos données d'activité et de forme physique avec Google Fit
            </p>
            <Button variant="outline" onClick={() => handleConnect('Google Fit')}>Connecter</Button>
          </div>
          
          <div className="border rounded-lg p-6 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mb-4"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <h3 className="text-lg font-semibold mb-2">Fitbit</h3>
            <p className="text-center mb-4 text-muted-foreground">
              Accédez à vos données Fitbit pour un suivi complet de votre santé et votre activité
            </p>
            <Button variant="outline" onClick={() => handleConnect('Fitbit')}>Connecter</Button>
          </div>
          
          <div className="border rounded-lg p-6 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 mb-4"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>
            <h3 className="text-lg font-semibold mb-2">Autres appareils</h3>
            <p className="text-center mb-4 text-muted-foreground">
              Ajoutez d'autres appareils connectés et applications de santé compatibles
            </p>
            <Button variant="outline" onClick={() => handleConnect('autre appareil')}>Ajouter</Button>
          </div>
        </div>
        
        <div className="mt-8 p-4 border rounded-lg bg-sky-50">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-sky-600 mr-2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
            Confidentialité des données
          </h3>
          <p className="text-sm text-muted-foreground">
            Vos données de santé sont sécurisées et ne sont jamais partagées sans votre consentement. 
            Nous utilisons un cryptage de bout en bout pour protéger vos informations personnelles.
          </p>
          <Button variant="link" size="sm" className="mt-1 p-0" onClick={() => toast({
            title: "Politique de confidentialité",
            description: "Notre politique détaillée concernant vos données de santé"
          })}>
            En savoir plus
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthSync;
