
import { useState, useEffect } from "react";
import { Users, Clock, MapPin, Sparkles, Award, CheckCircle, ArrowRight } from "lucide-react";

interface DynamicSocialProofProps {
  baseText?: string;
  dynamicData?: number;
  location?: string;
  variant?: "standard" | "minimal" | "detailed" | "hero" | "floating";
  className?: string;
  onCtaClick?: () => void;
}

const DynamicSocialProof = ({
  baseText = "de participants ont constaté une amélioration",
  dynamicData,
  location,
  variant = "standard",
  className = "",
  onCtaClick
}: DynamicSocialProofProps) => {
  const [participantCount, setParticipantCount] = useState(dynamicData || 0);
  const [localPercentage, setLocalPercentage] = useState(0);
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    // Animation d'entrée
    setAnimateIn(true);
    
    // Calcul dynamique du nombre de participants (simulé)
    if (!dynamicData) {
      const baseCount = Math.floor(Math.random() * 20) + 100;
      setParticipantCount(baseCount);
      
      // Mise à jour périodique pour simuler les nouveaux participants
      const interval = setInterval(() => {
        setParticipantCount(prev => {
          const increment = Math.random() > 0.7 ? 1 : 0;
          return prev + increment;
        });
      }, 30000); // Toutes les 30 secondes
      
      return () => clearInterval(interval);
    }
    
    // Calcul du pourcentage local
    const percentage = Math.floor(Math.random() * 15) + 70; // 70-85%
    setLocalPercentage(percentage);
  }, [dynamicData]);
  
  // Obtenir la ville actuelle (simulé)
  const userCity = location || "votre région";
  
  // Obtenir le temps depuis la dernière participation (simulé)
  const getTimeAgo = () => {
    const minutes = Math.floor(Math.random() * 5) + 1;
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  };
  
  if (variant === "floating") {
    return (
      <div 
        className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs transition-all duration-500 transform ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${className}`}
        aria-label="Notification de participation récente"
      >
        <div className="flex items-start gap-3">
          <div className="bg-indigo-100 p-2 rounded-full mt-0.5" aria-hidden="true">
            <Users className="h-4 w-4 text-indigo-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              <span className="font-bold">{Math.floor(Math.random() * 3) + 1}</span> personne{Math.random() > 0.5 ? 's' : ''} vien{Math.random() > 0.5 ? 'nent' : 't'} de terminer le test
            </p>
            <p className="text-xs text-gray-500 mt-1">
              il y a {getTimeAgo()}
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === "minimal") {
    return (
      <div 
        className={`inline-flex items-center gap-1 text-xs text-indigo-600 ${className}`}
        aria-label={`Statistique de participation: ${participantCount} participants`}
      >
        <Users className="h-3 w-3" aria-hidden="true" />
        <span>{participantCount} participants</span>
      </div>
    );
  }
  
  if (variant === "detailed") {
    return (
      <div 
        className={`bg-indigo-50 border border-indigo-100 rounded-lg p-3 transition-all duration-300 transform ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${className}`}
        aria-label="Informations détaillées sur les participants à l'étude"
      >
        <div className="flex items-start gap-3">
          <div className="bg-indigo-100 p-1.5 rounded-full mt-0.5" aria-hidden="true">
            <Users className="h-4 w-4 text-indigo-700" />
          </div>
          <div>
            <p className="text-sm text-indigo-800 font-medium">
              {participantCount} personnes ont participé à notre étude
            </p>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
              <div className="flex items-center text-xs text-indigo-600">
                <MapPin className="h-3 w-3 mr-1" aria-hidden="true" />
                <span>{localPercentage}% dans {userCity}</span>
              </div>
              <div className="flex items-center text-xs text-indigo-600">
                <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
                <span>Dernière: il y a {getTimeAgo()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === "hero") {
    return (
      <div 
        className={`bg-white/90 backdrop-blur-sm border border-indigo-100 rounded-xl p-4 shadow-lg transition-all duration-500 transform ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}
        aria-label="Statistiques des participants et résultats d'études"
      >
        <div className="flex items-center justify-between mb-3 border-b border-indigo-50 pb-2">
          <div className="flex items-center">
            <Sparkles className="h-5 w-5 text-amber-500 mr-2" aria-hidden="true" />
            <h3 className="font-medium text-indigo-900">Prouvé scientifiquement</h3>
          </div>
          <div className="bg-indigo-100 px-2 py-0.5 rounded text-xs font-medium text-indigo-800">
            Étude clinique
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-full" aria-hidden="true">
              <Users className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <div className="text-sm text-gray-700">Participants à l'étude</div>
              <div className="text-xl font-bold text-indigo-900">{participantCount}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full" aria-hidden="true">
              <Award className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-700">Taux d'efficacité</div>
              <div className="text-xl font-bold text-indigo-900">{localPercentage}%</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full" aria-hidden="true">
              <CheckCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-700">Participants satisfaits</div>
              <div className="text-xl font-bold text-indigo-900">{Math.floor(Math.random() * 5) + 85}%</div>
            </div>
          </div>
          {onCtaClick && (
            <button 
              onClick={onCtaClick}
              className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center transition-all group"
            >
              Découvrir mon profil
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>
    );
  }
  
  // Standard variant (default)
  return (
    <div 
      className={`flex items-center gap-2 text-sm ${className}`}
      aria-label={`Statistique: ${Math.floor(Math.random() * 15) + 70}% ${baseText}`}
    >
      <Users className="h-4 w-4 text-indigo-600" aria-hidden="true" />
      <span>
        <span className="font-medium">{Math.floor(Math.random() * 15) + 70}%</span> {baseText}
      </span>
    </div>
  );
};

export default DynamicSocialProof;
