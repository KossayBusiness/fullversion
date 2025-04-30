import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

export const GDPRCompliance: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [personalizationConsent, setPersonalizationConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem('gdpr_consent');
    if (!consentGiven) {
      setShowDialog(true);
    }
  }, []);

  const handleSaveConsent = () => {
    const consentData = {
      analytics: analyticsConsent,
      personalization: personalizationConsent,
      marketing: marketingConsent,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('gdpr_consent', JSON.stringify(consentData));
    setShowDialog(false);

    // Track consent for Google Ad Grant compliance
    console.log("[GoogleAdGrantsSafety] GDPR consent recorded:", consentData);
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Consentement aux cookies et à la protection des données</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Natural Pure Academy, en tant qu'organisation à but non lucratif, collecte certaines données pour améliorer 
            votre expérience sur notre site. Veuillez sélectionner les options pour lesquelles vous donnez votre consentement:
          </p>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="analytics" 
              checked={analyticsConsent} 
              onCheckedChange={(checked) => setAnalyticsConsent(checked === true)}
            />
            <label htmlFor="analytics" className="text-sm font-medium">
              Analytiques: Pour comprendre comment notre site est utilisé et améliorer notre contenu éducatif
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="personalization" 
              checked={personalizationConsent} 
              onCheckedChange={(checked) => setPersonalizationConsent(checked === true)}
            />
            <label htmlFor="personalization" className="text-sm font-medium">
              Personnalisation: Pour adapter notre contenu éducatif à vos besoins
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="marketing" 
              checked={marketingConsent} 
              onCheckedChange={(checked) => setMarketingConsent(checked === true)}
            />
            <label htmlFor="marketing" className="text-sm font-medium">
              Communication: Pour recevoir des mises à jour sur nos recherches et activités éducatives
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleSaveConsent()}>
            Enregistrer les préférences
          </Button>
          <Button onClick={() => {
            setAnalyticsConsent(true);
            setPersonalizationConsent(true);
            setMarketingConsent(true);
            handleSaveConsent();
          }}>
            Accepter tout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GDPRCompliance;