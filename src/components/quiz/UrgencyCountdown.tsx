
import { useState, useEffect } from "react";
import { Clock, Users, Award } from "lucide-react";

interface UrgencyCountdownProps {
  initialMinutes?: number;
  message?: string;
  variant?: "standard" | "compact" | "featured";
  onComplete?: () => void;
  className?: string;
}

const UrgencyCountdown = ({
  initialMinutes = 45,
  message = "Dernière session d'analyse scientifique disponible",
  variant = "standard",
  onComplete,
  className = ""
}: UrgencyCountdownProps) => {
  const [timeRemaining, setTimeRemaining] = useState(initialMinutes * 60);
  const [participantsLeft, setParticipantsLeft] = useState(Math.floor(Math.random() * 10) + 3);
  
  useEffect(() => {
    // Vérifier si un compte à rebours existe déjà en stockage
    const savedCountdown = sessionStorage.getItem("study_countdown");
    const now = new Date().getTime();
    
    if (savedCountdown) {
      const { endTime, participants } = JSON.parse(savedCountdown);
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      
      if (remaining > 0) {
        setTimeRemaining(remaining);
        setParticipantsLeft(participants);
      } else {
        // Si le compte à rebours est terminé, en créer un nouveau
        const newEndTime = now + (initialMinutes * 60 * 1000);
        const newParticipants = Math.floor(Math.random() * 10) + 3;
        
        sessionStorage.setItem("study_countdown", JSON.stringify({
          endTime: newEndTime,
          participants: newParticipants
        }));
        
        setTimeRemaining(initialMinutes * 60);
        setParticipantsLeft(newParticipants);
      }
    } else {
      // Première visite, créer un nouveau compte à rebours
      const endTime = now + (initialMinutes * 60 * 1000);
      
      sessionStorage.setItem("study_countdown", JSON.stringify({
        endTime,
        participants: participantsLeft
      }));
    }
    
    // Mettre à jour le compte à rebours chaque seconde
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return 0;
        }
        return prev - 1;
      });
      
      // Occasionnellement réduire le nombre de participants (simuler l'urgence)
      if (Math.random() > 0.95) {
        setParticipantsLeft(prev => {
          const newValue = Math.max(1, prev - 1);
          
          // Mettre à jour le stockage
          const countdownData = JSON.parse(sessionStorage.getItem("study_countdown") || "{}");
          sessionStorage.setItem("study_countdown", JSON.stringify({
            ...countdownData,
            participants: newValue
          }));
          
          return newValue;
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [initialMinutes, onComplete]);
  
  // Formater le temps restant
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-1 text-xs text-amber-700 ${className}`}>
        <Clock className="h-3 w-3" />
        <span>{formatTime(timeRemaining)}</span>
      </div>
    );
  }
  
  if (variant === "featured") {
    return (
      <div className={`bg-amber-50 border border-amber-100 rounded-lg p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <div className="bg-amber-100 p-2 rounded-full">
            <Award className="h-5 w-5 text-amber-700" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-amber-900 mb-1">{message}</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 text-amber-800">
                <Clock className="h-4 w-4" />
                <span className="font-bold text-xl">{formatTime(timeRemaining)}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-amber-700">
                <Users className="h-4 w-4" />
                <span>
                  {participantsLeft} place{participantsLeft > 1 ? 's' : ''} restante{participantsLeft > 1 ? 's' : ''}
                </span>
              </div>
            </div>
            <div className="mt-2 h-1.5 w-full bg-amber-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500"
                style={{ 
                  width: `${Math.min(100, 100 - ((timeRemaining / (initialMinutes * 60)) * 100))}%`,
                  transition: 'width 1s linear'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Standard variant (default)
  return (
    <div className={`flex items-center justify-between bg-amber-50 border border-amber-100 px-3 py-2 rounded-lg ${className}`}>
      <div className="flex items-center gap-2">
        <div className="bg-amber-100 p-1.5 rounded-full">
          <Clock className="h-4 w-4 text-amber-700" />
        </div>
        <span className="text-sm text-amber-800">{message}</span>
      </div>
      <div className="flex gap-3 items-center">
        <span className="font-semibold text-amber-900">{formatTime(timeRemaining)}</span>
        <span className="text-xs text-amber-700">{participantsLeft} place{participantsLeft > 1 ? 's' : ''}</span>
      </div>
    </div>
  );
};

export default UrgencyCountdown;
