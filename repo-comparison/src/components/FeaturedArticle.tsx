
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Award, Bookmark, Share2, BookOpen, Users, BrainCircuit, PencilRuler, LineChart, FileCheck, Zap, Calculator, BarChart4, AlertCircle, CheckCircle, ThumbsUp } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FeaturedArticleProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  className?: string;
  studyParticipants?: number;
  keyInsight?: string;
}

const FeaturedArticle = ({
  id,
  title,
  excerpt,
  category,
  image,
  date,
  readTime,
  className,
  studyParticipants = 243,
  keyInsight = "72% d'efficacité prouvée"
}: FeaturedArticleProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readersCount, setReadersCount] = useState(184);
  const [showUrgencyPopup, setShowUrgencyPopup] = useState(false);

  useEffect(() => {
    // Simuler des lecteurs en temps réel
    const interval = setInterval(() => {
      setReadersCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 30000);
    
    // Afficher la popup après un certain temps
    const popupTimer = setTimeout(() => {
      setShowUrgencyPopup(true);
    }, 15000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(popupTimer);
    };
  }, []);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "Article retiré de vos favoris" : "Article ajouté à vos favoris");
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: window.location.origin + `/article/${id}`,
      }).catch(console.error);
    } else {
      toast.success("Lien copié dans le presse-papier");
      navigator.clipboard.writeText(window.location.origin + `/article/${id}`);
    }
  };

  const handleCalculator = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Calculateur en cours de chargement...", {
      icon: <Calculator className="h-5 w-5 text-blue-500" />,
    });
    
    setTimeout(() => {
      toast.success("Calculateur prêt ! Analysez votre risque personnel", {
        duration: 5000,
        action: {
          label: "Ouvrir",
          onClick: () => {
            window.location.href = "/quiz";
          }
        }
      });
    }, 1500);
  };

  // Déterminez le problème ou symptôme principal mentionné dans le titre ou l'extrait
  const getProblemBadge = () => {
    const keywords = ["stress", "fatigue", "sommeil", "douleur", "inflammation", "anxiété", "digestion"];
    const foundKeyword = keywords.find(keyword => 
      title.toLowerCase().includes(keyword) || excerpt.toLowerCase().includes(keyword)
    );
    
    return foundKeyword || "santé";
  };

  const problem = getProblemBadge();
  
  // Calculer si cet article est "populaire" ou "tendance"
  const popularityStatus = readersCount > 200 ? "Tendance 🔥" : "Populaire";

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl glass shadow-md hover:shadow-lg transition-all duration-300 group",
      className
    )}>
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 md:hidden">
            <div className="text-white text-sm font-medium">En savoir plus</div>
          </div>
          
          {/* Badges améliorés */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Badge className="bg-white/90 backdrop-blur-sm text-natural-700 hover:bg-white/90 z-10">
              {category}
            </Badge>
            <Badge 
              className="bg-amber-500/90 text-white backdrop-blur-sm z-10 flex items-center gap-1"
            >
              <Zap className="h-3 w-3" />
              {popularityStatus}
            </Badge>
          </div>
          
          <Badge 
            className="absolute top-4 right-4 bg-natural-500/90 text-white backdrop-blur-sm z-10 flex items-center gap-1"
            variant="natural"
          >
            <Award className="h-3 w-3" />
            Étude scientifique
          </Badge>
          
          {/* Study details overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-white flex items-center">
                <Users className="h-3 w-3 mr-1" />
                <span>{studyParticipants} participants</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-white flex items-center">
                <LineChart className="h-3 w-3 mr-1" />
                <span>{keyInsight}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-white flex items-center">
                <ThumbsUp className="h-3 w-3 mr-1" />
                <span>+{readersCount} lecteurs</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center relative">
          <div className="absolute top-4 right-4 hidden md:flex space-x-2">
            <button 
              onClick={handleBookmark}
              className={`p-2 rounded-full ${isBookmarked ? 'bg-natural-100 text-natural-700' : 'bg-natural-50 hover:bg-natural-100 text-natural-600'} transition-colors`}
              aria-label="Sauvegarder l'article"
            >
              <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={handleShare}
              className="p-2 rounded-full bg-natural-50 hover:bg-natural-100 text-natural-600 transition-colors"
              aria-label="Partager l'article"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button 
              onClick={handleCalculator}
              className="p-2 rounded-full bg-natural-50 hover:bg-natural-100 text-natural-600 transition-colors"
              aria-label="Ouvrir le calculateur"
            >
              <Calculator className="h-4 w-4" />
            </button>
          </div>
          
          {/* Problem badge */}
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Problème : {problem.charAt(0).toUpperCase() + problem.slice(1)}
            </Badge>
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Solution validée
            </Badge>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground space-x-4 mb-4">
            <span className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {date}
            </span>
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {readTime}
            </span>
            <span className="flex items-center text-amber-600">
              <BarChart4 className="mr-1 h-4 w-4" />
              {popularityStatus}
            </span>
          </div>
          
          <h2 className="font-display text-2xl md:text-3xl font-medium leading-tight mb-4 group-hover:text-natural-700 transition-colors">
            {title}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            {excerpt}
          </p>
          
          {/* Key insight callout */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6 flex items-start">
            <BrainCircuit className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-800">Découverte clé</p>
              <p className="text-xs text-blue-700">L'étude montre que {keyInsight.toLowerCase()} chez les participants testés.</p>
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                asChild
                variant="natural"
                className="bg-gradient-to-r from-natural-500 to-natural-600 hover:from-natural-600 hover:to-natural-700 group"
              >
                <Link to={`/article/${id}`}>
                  <BookOpen className="mr-1 h-4 w-4" />
                  Lire l'article
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="quiz"
                className="group animate-pulse-slow relative"
              >
                <Link to="/quiz">
                  <PencilRuler className="mr-1 h-4 w-4" />
                  Faire le test personnalisé
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </span>
                </Link>
              </Button>
              
              <div className="md:hidden flex space-x-2">
                <button 
                  onClick={handleBookmark}
                  className={`p-2 rounded-full ${isBookmarked ? 'bg-natural-100 text-natural-700' : 'bg-natural-50 hover:bg-natural-100 text-natural-600'} transition-colors border border-natural-100`}
                  aria-label="Sauvegarder l'article"
                >
                  <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-2 rounded-full bg-natural-50 hover:bg-natural-100 text-natural-600 transition-colors border border-natural-100"
                  aria-label="Partager l'article"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={handleCalculator}
                  className="p-2 rounded-full bg-natural-50 hover:bg-natural-100 text-natural-600 transition-colors border border-natural-100"
                  aria-label="Ouvrir le calculateur"
                >
                  <Calculator className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom verification banner */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-2 sm:px-4 sm:py-3 border-t border-green-200 flex items-center justify-between">
        <div className="flex items-center">
          <FileCheck className="h-4 w-4 text-green-600 mr-2" />
          <span className="text-xs sm:text-sm text-green-800 font-medium">Contenu vérifié par notre comité scientifique</span>
        </div>
        <Badge variant="outline" className="bg-white text-xs">
          <Calendar className="h-3 w-3 mr-1" />
          Mis à jour le 20/06/2023
        </Badge>
      </div>
      
      {/* Embellissement visuel */}
      <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-natural-100 rounded-full opacity-30 hidden md:block"></div>
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-natural-200 rounded-full opacity-20 hidden md:block"></div>
      
      {/* Popup d'urgence */}
      {showUrgencyPopup && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-24 bg-white rounded-lg shadow-xl border border-amber-200 p-4 z-20 max-w-sm animate-fade-in">
          <button 
            onClick={() => setShowUrgencyPopup(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Fermer</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">Saviez-vous que 78% des personnes ayant ce problème ne font rien ?</h3>
              <div className="mt-2">
                <p className="text-xs text-amber-700">
                  Notre quiz a révélé que les personnes agissant dans les 48h constatent 3x plus de résultats.
                </p>
              </div>
              <div className="mt-3">
                <Button 
                  size="sm" 
                  variant="cta"
                  className="w-full"
                  asChild
                >
                  <Link to="/quiz">
                    Faire le test de dépistage
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedArticle;
