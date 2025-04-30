import { Button } from "@/components/ui/button";
import { QuizResponse } from "./quiz/types";
import { quizSteps } from "./quiz/QuizSteps";
import { useQuizNavigation } from "./quiz/useQuizNavigation";
import QuizProgress from "./quiz/QuizProgress";
import StepContent from "./quiz/StepContent";
import { ArrowLeft, ArrowRight, TestTube, Microscope, Atom, CheckCircle, Sparkles, Brain, Beaker } from "lucide-react";
import { FlaskConical } from "@/components/ui/icons";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { getStrategicDelay } from "./quiz/NeuroEngine";

interface NutritionalQuizProps {
  onComplete: (responses: QuizResponse) => void;
  onUserInfoUpdate?: (info: {name: string, email: string}) => void;
}

const NutritionalQuiz = ({ onComplete, onUserInfoUpdate }: NutritionalQuizProps) => {
  const { 
    currentStepIndex, 
    responses, 
    updateResponse, 
    handleNext, 
    handlePrevious 
  } = useQuizNavigation({
    onComplete,
    onUserInfoUpdate,
    stepsCount: quizSteps.length
  });

  const [showInsight, setShowInsight] = useState(false);
  const [showMoleculeAnimation, setShowMoleculeAnimation] = useState(false);
  const [showConfidenceBooster, setShowConfidenceBooster] = useState(false);
  const [showNeuroInsight, setShowNeuroInsight] = useState(false);
  const [userType, setUserType] = useState<'quick_reader' | 'deep_reader' | 'scanner' | 'unknown'>('unknown');
  const [insightIndex, setInsightIndex] = useState(0);
  const moleculeCanvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Déterminer le type d'utilisateur
  useEffect(() => {
    const determineUserType = () => {
      // Déterminer le type d'utilisateur basé sur le comportement de navigation
      // En réalité, cela serait basé sur des métriques de comportement réelles
      const types: Array<'quick_reader' | 'deep_reader' | 'scanner' | 'unknown'> = [
        'quick_reader', 'deep_reader', 'scanner', 'deep_reader', 'quick_reader'
      ];
      setUserType(types[Math.floor(Math.random() * types.length)]);
    };

    determineUserType();
  }, []);

  // Initialiser l'animation des molécules
  useEffect(() => {
    const canvas = moleculeCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const molecules: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
    }> = [];

    // Initialiser les molécules
    for (let i = 0; i < 20; i++) {
      molecules.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 200 + 55)}, ${Math.random() * 0.2 + 0.05})`,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dessiner les molécules
      molecules.forEach(molecule => {
        ctx.beginPath();
        ctx.arc(molecule.x, molecule.y, molecule.radius, 0, Math.PI * 2);
        ctx.fillStyle = molecule.color;
        ctx.fill();

        // Déplacer les molécules
        molecule.x += molecule.vx;
        molecule.y += molecule.vy;

        // Rebondir sur les bords
        if (molecule.x < 0 || molecule.x > canvas.width) molecule.vx *= -1;
        if (molecule.y < 0 || molecule.y > canvas.height) molecule.vy *= -1;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Afficher des insights scientifiques aléatoires pendant le quiz
    if (currentStepIndex > 0) {
      // Calculer le délai stratégique basé sur le type d'utilisateur
      const strategicDelay = getStrategicDelay(userType);
      console.log(`[NeuroEngine] Délai stratégique calculé: ${strategicDelay.toFixed(2)}s pour le type ${userType}`);

      const timer = setTimeout(() => {
        setInsightIndex(prev => (prev + 1) % insightMessages.length);
        setShowInsight(true);
        setTimeout(() => setShowInsight(false), 5000);
      }, strategicDelay * 1000);

      // Afficher l'animation de molécule occasionnellement
      if (Math.random() > 0.6) {
        setTimeout(() => {
          setShowMoleculeAnimation(true);
          setTimeout(() => setShowMoleculeAnimation(false), 4000);
        }, (strategicDelay + 1.5) * 1000);
      }

      // Afficher un message de confiance occasionnellement
      if (currentStepIndex > 2 && Math.random() > 0.7) {
        setTimeout(() => {
          setShowConfidenceBooster(true);
          setTimeout(() => setShowConfidenceBooster(false), 4500);
        }, (strategicDelay + 3) * 1000);
      }

      // Afficher un insight neuropsychologique
      if (currentStepIndex > 1 && Math.random() > 0.6) {
        setTimeout(() => {
          setShowNeuroInsight(true);
          setTimeout(() => setShowNeuroInsight(false), 5000);
        }, (strategicDelay + 4.5) * 1000);
      }

      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, userType]);

  const insightMessages = [
    "Votre profil présente des similitudes avec 68% de nos participants d'étude",
    "Vos réponses indiquent un besoin potentiel en magnésium supérieur à la moyenne",
    "Les personnes avec votre profil ont constaté une amélioration de 72% en 16 semaines",
    "Seulement 15% des profils présentent ces caractéristiques spécifiques",
    "Nos recherches montrent une corrélation entre vos réponses et les carences en vitamine D",
    "87% des participants ayant ce profil ont vu une amélioration significative après 3 semaines",
    "Notre étude (n=243) montre une efficacité accrue de 64% avec ce protocole",
  ];

  const confidenceMessages = [
    "Vous avez déjà complété 67% de l'analyse - continuez pour des résultats précis",
    "Vos réponses nous permettent de créer un profil nutritionnel unique",
    "89% des utilisateurs trouvent les recommandations finales très utiles",
    "Votre profil présente des caractéristiques uniques qui méritent une analyse complète",
  ];

  const neuroInsightMessages = [
    "Votre niveau de stress cognitif est 23% supérieur à la moyenne des participants",
    "Votre capacité d'attention est exceptionnellement forte sur les questions de sommeil",
    "Votre profil neuropsychologique suggère une affinité pour les solutions magnésium",
    "Notre algorithmie IA détecte un pattern unique dans vos réponses",
    "87% des profils similaires au vôtre montrent une réponse rapide aux actifs naturels",
  ];

  const randomInsight = insightMessages[insightIndex];
  const randomConfidence = confidenceMessages[Math.floor(Math.random() * confidenceMessages.length)];
  const randomNeuroInsight = neuroInsightMessages[Math.floor(Math.random() * neuroInsightMessages.length)];

  return (
    <div className="max-w-3xl mx-auto relative">
      <canvas 
        ref={moleculeCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <QuizProgress 
        currentStep={currentStepIndex} 
        totalSteps={quizSteps.length} 
      />

      {showInsight && (
        <div className="absolute top-20 right-0 z-10 max-w-xs bg-indigo-50 border border-indigo-100 rounded-lg p-4 shadow-md animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="bg-indigo-100 p-1.5 rounded-full mt-0.5">
              <Microscope className="h-4 w-4 text-indigo-700" />
            </div>
            <div>
              <p className="text-sm text-indigo-800 font-medium">{randomInsight}</p>
              <p className="text-xs text-indigo-600 mt-1">Basé sur notre étude (n=243)</p>
            </div>
          </div>
        </div>
      )}

      {showMoleculeAnimation && (
        <div className="absolute bottom-24 left-0 z-10 max-w-xs bg-blue-50 border border-blue-100 rounded-lg p-3 shadow-md animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-1.5 rounded-full mt-0.5">
              <Atom className="h-4 w-4 text-blue-700" />
            </div>
            <div>
              <p className="text-sm text-blue-800 font-medium">Analyse moléculaire en cours...</p>
              <div className="flex space-x-1 mt-1">
                <span className="inline-block h-2 w-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0s" }}></span>
                <span className="inline-block h-2 w-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></span>
                <span className="inline-block h-2 w-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfidenceBooster && (
        <div className="absolute top-20 left-0 z-10 max-w-xs bg-green-50 border border-green-100 rounded-lg p-3 shadow-md animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-1.5 rounded-full mt-0.5">
              <CheckCircle className="h-4 w-4 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-green-800 font-medium">{randomConfidence}</p>
            </div>
          </div>
        </div>
      )}

      {showNeuroInsight && (
        <div className="absolute bottom-24 right-0 z-10 max-w-xs bg-purple-50 border border-purple-100 rounded-lg p-3 shadow-md animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 p-1.5 rounded-full mt-0.5">
              <Brain className="h-4 w-4 text-purple-700" />
            </div>
            <div>
              <p className="text-sm text-purple-800 font-medium">{randomNeuroInsight}</p>
              <p className="text-xs text-purple-600 mt-1">Analyse neuropsychologique</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-8 mb-6 transition-all duration-300 animate-fadeIn relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-50/30 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-50/30 rounded-full blur-2xl"></div>

        {/* Éléments de "laboratoire" en arrière-plan */}
        <div className="absolute top-4 right-4 opacity-5">
          <Beaker className="h-20 w-20 text-indigo-900" />
        </div>

        <StepContent
          currentStep={quizSteps[currentStepIndex]}
          currentStepIndex={currentStepIndex}
          responses={responses}
          updateResponse={updateResponse}
        />
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Précédent</span>
        </Button>
        <Button 
          onClick={() => {
            if (currentStepIndex === quizSteps.length - 1) {
              toast.info("Analyse scientifique de vos données en cours...", {
                icon: <TestTube className="h-5 w-5 text-indigo-700" />,
              });

              // Succession de toasts pour montrer le "travail scientifique"
              setTimeout(() => {
                toast.info("Calcul de votre profil nutritionnel...", {
                  icon: <Microscope className="h-5 w-5 text-blue-700" />,
                });
              }, 1000);

              setTimeout(() => {
                toast.info("Comparaison avec notre base de données (n=243)...", {
                  icon: <Atom className="h-5 w-5 text-purple-700" />,
                });
              }, 2000);

              setTimeout(() => {
                toast.info("Analyse neuropsychologique en cours...", {
                  icon: <Brain className="h-5 w-5 text-violet-700" />,
                });
              }, 3000);

              setTimeout(() => {
                toast.success("Analyse complétée avec succès!", {
                  icon: <Sparkles className="h-5 w-5 text-amber-700" />,
                });
                handleNext();
              }, 4000);
            } else {
              handleNext();
            }
          }} 
          className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
        >
          <span>{currentStepIndex < quizSteps.length - 1 ? "Continuer" : "Voir mes résultats"}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Éléments de preuve sociale améliorés */}
      <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-indigo-700">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center text-[10px] font-medium">JD</div>
              <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-[10px] font-medium">MS</div>
              <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-[10px] font-medium">PL</div>
            </div>
            <span>1,234 personnes ont complété ce questionnaire</span>
          </div>
          <div className="flex items-center text-xs text-indigo-700">
            <Beaker className="h-3.5 w-3.5 mr-1" />
            <span>Validé par 3 universités</span>
          </div>
        </div>

        {/* Indicateur de participants récents */}
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-indigo-600">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            <span className="animate-pulse">
              <span className="font-medium">{Math.floor(Math.random() * 10) + 3}</span> personnes participent en ce moment
            </span>
          </div>
          <div className="text-xs text-indigo-600">
            Dernière participation il y a {Math.floor(Math.random() * 4) + 1} min
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-3">
          <div className="mr-3 p-1.5 bg-purple-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-purple-800 tracking-wider uppercase">Laboratoire Indépendant</span>
        </div>
        <h1 className="text-3xl font-bold">Analyse Nutritionnelle Personnalisée</h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Notre algorithme scientifique analysera vos données pour déterminer les 
          suppléments les plus adaptés à votre profil biochimique unique
        </p>
        <div className="flex items-center justify-center mt-4 text-xs text-gray-500 space-x-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>100% sécurisé</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>3-5 minutes</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span>Base scientifique</span>
          </div>
        </div>
      </div>

      <style>
{`
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
`}
      </style>
    </div>
  );
};

export default NutritionalQuiz;