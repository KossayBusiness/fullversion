
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { validateRedirectUrl } from "@/utils/complianceFilter";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShieldCheck, AlertTriangle, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const SocialRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [url, setUrl] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [hash, setHash] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const target = searchParams.get("target");
    const refHash = searchParams.get("ref");
    
    if (refHash) {
      setHash(refHash);
    }
    
    if (target) {
      try {
        // Décoder l'URL cible
        const decodedUrl = atob(target);
        setUrl(decodedUrl);
        
        // Valider l'URL
        const valid = validateRedirectUrl(decodedUrl);
        setIsValid(valid);
        
        // Si URL valide, démarrer le compte à rebours
        if (valid) {
          const interval = setInterval(() => {
            setCountdown(prev => {
              if (prev <= 1) {
                clearInterval(interval);
                // Rediriger lorsque le compte à rebours atteint zéro
                window.location.href = decodedUrl;
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          
          return () => clearInterval(interval);
        }
      } catch (e) {
        console.error("Erreur lors du décodage de l'URL", e);
        setIsValid(false);
      }
    } else {
      // Pas de paramètre target, rediriger vers la page d'accueil
      navigate("/");
    }
  }, [searchParams, navigate]);
  
  const handleReturn = () => {
    navigate(-1);
  };
  
  const handleContinue = () => {
    if (url && isValid) {
      window.location.href = url;
    }
  };
  
  // Extraire le domaine pour l'affichage
  const extractDomain = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return url;
    }
  };
  
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4"
      role="main"
      aria-labelledby="redirect-title"
    >
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          {isValid ? (
            <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4" aria-hidden="true">
              <ShieldCheck className="h-8 w-8 text-green-600" />
            </div>
          ) : (
            <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-full mb-4" aria-hidden="true">
              <AlertTriangle className="h-8 w-8 text-amber-600" />
            </div>
          )}
          
          <h1 id="redirect-title" className="text-2xl font-bold mb-2">
            {isValid ? "Redirection scientifique" : "Redirection non autorisée"}
          </h1>
          <p className="text-slate-600 mb-4">
            {isValid 
              ? "Vous quittez notre portail scientifique vers une source externe." 
              : "Cette redirection n'est pas autorisée pour des raisons de sécurité."}
          </p>
        </div>
        
        {isValid && url && (
          <>
            <div className="border border-slate-200 rounded-lg p-4 mb-6 break-all">
              <p className="text-sm text-slate-500 mb-1">Destination scientifique:</p>
              <div className="flex items-center gap-2 text-slate-700">
                <ExternalLink className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>{isMobile ? extractDomain(url) : url}</span>
              </div>
              {hash && (
                <div className="mt-2 text-xs text-slate-400">
                  <span>ID de référence: {hash}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-6" aria-live="polite">
              <Clock className="h-5 w-5 text-indigo-600" aria-hidden="true" />
              <p className="text-center">
                Redirection dans <span className="font-semibold text-indigo-600">{countdown}</span> secondes...
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={handleReturn}
                aria-label="Retourner à la page précédente"
              >
                Retour
              </Button>
              <Button 
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                onClick={handleContinue}
                aria-label="Continuer vers la destination externe"
              >
                Continuer
              </Button>
            </div>
            
            <p className="text-xs text-slate-500 mt-6 text-center">
              Ce contenu externe est fourni à titre informatif dans le cadre de notre engagement pour l'éducation scientifique.
            </p>
          </>
        )}
        
        {!isValid && (
          <div className="text-center">
            <Button 
              onClick={handleReturn} 
              className="bg-indigo-600 hover:bg-indigo-700"
              aria-label="Retourner au site principal"
            >
              Retour au site
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialRedirect;
