
import { Button } from "@/components/ui/button";

interface LoginPromptProps {
  onLogin: () => void;
}

const LoginPrompt = ({ onLogin }: LoginPromptProps) => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Votre Profil Santé Personnalisé</h1>
        <p className="text-lg mb-8">
          Accédez à votre tableau de bord personnel pour suivre vos progrès, consulter l'historique de vos lectures,
          et recevoir des recommandations adaptées à vos besoins spécifiques.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="bg-primary/5 p-4 rounded-lg flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-3"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <h3 className="text-lg font-semibold mb-2">Suivi Personnalisé</h3>
            <p className="text-center">Suivez vos défis et votre progression vers une meilleure santé</p>
          </div>
          
          <div className="bg-primary/5 p-4 rounded-lg flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-3"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1"/><path d="M15 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1"/><path d="M2 12h20"/><path d="M20 16v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1"/><path d="M12 3v9"/><path d="M12 19v2"/></svg>
            <h3 className="text-lg font-semibold mb-2">Recommandations sur mesure</h3>
            <p className="text-center">Obtenez des conseils adaptés à vos besoins et intérêts spécifiques</p>
          </div>
        </div>
        
        <Button size="lg" onClick={onLogin}>
          Connectez-vous pour accéder à votre profil
        </Button>
        
        <p className="mt-4 text-sm text-muted-foreground">
          Note: Pour les besoins de démonstration, cliquez simplement sur le bouton pour simuler une connexion.
          Dans une version finale, un système d'authentification complet serait implémenté.
        </p>
      </div>
    </div>
  );
};

export default LoginPrompt;
