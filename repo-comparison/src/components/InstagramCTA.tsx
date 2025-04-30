
import React, { useState } from 'react';
import { Instagram, ExternalLink, ArrowRight, CheckCircle, Shield, FileText, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

// Rotation sémantique des CTA
const ctaVariants = {
  buttons: [
    "Accéder à nos ressources",
    "Voir nos études scientifiques",
    "Consulter nos données",
    "Explorer nos recherches"
  ],
  dialogTitles: [
    "Accédez à nos ressources scientifiques",
    "Consultez nos études exclusives",
    "Découvrez notre base de connaissances",
    "Explorez nos données de recherche"
  ],
  descriptions: [
    "Nos recherches et données scientifiques sont publiées régulièrement sur notre espace dédié.",
    "Nos études exclusives sur les compléments alimentaires sont disponibles dans notre espace documentaire.",
    "Notre base de données scientifiques est régulièrement mise à jour avec les dernières découvertes.",
    "Accédez à nos graphiques et analyses détaillées basés sur nos études cliniques."
  ]
};

// Fonction pour obtenir un index basé sur le jour pour la rotation
const getRotationIndex = () => {
  return Math.floor(Date.now() / 86400000) % ctaVariants.buttons.length;
};

const InstagramCTA = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(2);
  
  // Index basé sur le jour pour la rotation sémantique
  const rotationIndex = getRotationIndex();

  const handleRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Log this redirection attempt (could be sent to your analytics system)
    const redirectionLog = {
      timestamp: new Date().toISOString(),
      source: window.location.href,
      destination: "instagram.com/naturalandpure", 
      interaction: "CTA click",
      semanticVariant: rotationIndex
    };
    
    console.log("Redirection log:", redirectionLog);
    
    // Show redirecting state
    setRedirecting(true);
    
    // Start countdown
    let seconds = 2;
    setCountdown(seconds);
    
    const timer = setInterval(() => {
      seconds -= 1;
      setCountdown(seconds);
      
      if (seconds <= 0) {
        clearInterval(timer);
        // Show success message before actual redirect
        setShowSuccessMessage(true);
        setRedirecting(false);
        
        // Add a delay before redirect to show success message
        setTimeout(() => {
          // Redirection via notre page proxy avec délai aléatoire
          window.location.href = `/redirect/social?network=ig&source=article&variant=${rotationIndex}`;
        }, 1500);
      }
    }, 1000);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-natural-100 via-natural-50 to-white rounded-xl">
      <div className="absolute inset-0 pattern-dots pattern-natural-600/10 pattern-bg-transparent pattern-size-4 opacity-40"></div>
      <div className="relative container mx-auto px-4 py-8 md:py-10">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          {/* Avis légal subtil en haut */}
          <p className="text-xs text-natural-500 mb-4">
            Contenu éducatif et scientifique uniquement - Aucune vente de produit
          </p>
          
          <div className="inline-flex items-center justify-center p-3 bg-natural-500/20 rounded-full mb-2">
            <Instagram className="h-6 w-6 text-natural-700" />
          </div>
          <h2 className="font-display text-xl md:text-2xl font-medium tracking-tight text-natural-800">
            Rejoignez notre communauté scientifique
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 my-3">
            <Badge className="px-3 py-1 text-sm bg-natural-100 text-natural-700 rounded-full flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-natural-500 mr-1.5"></span>
              Données scientifiques
            </Badge>
            <Badge className="px-3 py-1 text-sm bg-natural-100 text-natural-700 rounded-full flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-natural-500 mr-1.5"></span>
              Études exclusives
            </Badge>
            <Badge className="px-3 py-1 text-sm bg-natural-100 text-natural-700 rounded-full flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-natural-500 mr-1.5"></span>
              Recherches avancées
            </Badge>
          </div>
          
          <div className="pt-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="px-6 py-5 text-base bg-natural-600 hover:bg-natural-700 text-white shadow-lg hover:shadow-xl transition-all">
                  <Instagram className="h-5 w-5 mr-2" />
                  {ctaVariants.buttons[rotationIndex]}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <div className="text-center py-4">
                  {showSuccessMessage ? (
                    <div className="space-y-4 py-6 animate-fade-in">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold">Redirection en cours</h3>
                      <p className="text-sm text-muted-foreground">
                        Vous allez être redirigé vers notre espace de ressources scientifiques.
                      </p>
                      <div className="text-xs text-natural-500 mt-6">
                        <p>Ces ressources sont fournies à titre informatif uniquement.</p>
                        <p>Aucun produit n'est vendu ou promu sur ce site.</p>
                      </div>
                    </div>
                  ) : redirecting ? (
                    <div className="space-y-4 py-6">
                      <div className="w-16 h-16 border-4 border-natural-200 border-t-natural-600 rounded-full animate-spin mx-auto"></div>
                      <h3 className="text-xl font-semibold">Préparation des ressources</h3>
                      <p className="text-sm text-muted-foreground">
                        Redirection dans {countdown} secondes...
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="inline-flex items-center justify-center p-2 bg-natural-100 rounded-full mb-3">
                        <Instagram className="h-5 w-5 text-natural-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{ctaVariants.dialogTitles[rotationIndex]}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {ctaVariants.descriptions[rotationIndex]}
                      </p>
                      
                      {/* Badges de crédibilité scientifique */}
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Award className="h-3.5 w-3.5" />
                          <span>Étude validée</span>
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Shield className="h-3.5 w-3.5" />
                          <span>Non commercial</span>
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5" />
                          <span>Usage éducatif</span>
                        </Badge>
                      </div>
                      
                      <div className="mx-auto w-48 h-48 bg-white p-2 border rounded-md mb-3">
                        <div className="w-full h-full bg-grid-natural-100 rounded relative flex items-center justify-center">
                          <div className="absolute inset-4 bg-white rounded"></div>
                          <div className="relative text-xs text-center">Code d'accès</div>
                        </div>
                      </div>
                      <Button 
                        onClick={handleRedirect}
                        className="mt-2 w-full bg-natural-600 hover:bg-natural-700 gap-2"
                      >
                        {ctaVariants.buttons[rotationIndex]}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <div className="mt-4 text-xs text-natural-500 space-y-1">
                        <p>Contenu éducatif uniquement - Aucune vente de produit</p>
                        <p>Pour un avis médical, consultez toujours un professionnel de santé</p>
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <p className="text-sm font-medium text-natural-700 pt-2">
            Plus de 10,000 personnes consultent déjà nos ressources scientifiques
          </p>
          
          {/* Mentions légales en bas */}
          <div className="mt-4 pt-4 border-t border-natural-200">
            <p className="text-xs text-natural-500">
              Les informations fournies sont à titre éducatif et ne remplacent pas un avis médical professionnel.
              Ce site ne commercialise aucun produit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramCTA;
