
import { useState, useEffect } from "react";
import { ArrowUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileOptimizerProps {
  children: React.ReactNode;
  showCta?: boolean;
  ctaText?: string;
  ctaHref?: string;
  ctaAction?: () => void;
  lazyLoadImages?: boolean;
}

const MobileOptimizer = ({
  children,
  showCta = true,
  ctaText = "Voir mon Profil",
  ctaHref = "/quiz",
  ctaAction,
  lazyLoadImages = true
}: MobileOptimizerProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showCookie, setShowCookie] = useState(true);
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useIsMobile();
  
  // Gérer le défilement et l'affichage des éléments flottants
  useEffect(() => {
    const handleScroll = () => {
      // Calculer la progression du défilement
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(currentProgress);
      
      // Afficher le bouton de retour en haut après 300px de défilement
      setShowScrollTop(window.scrollY > 300);
      
      // Afficher le CTA flottant après 600px de défilement
      if (showCta) {
        setShowFloatingCta(window.scrollY > 600);
      }
    };
    
    // Optimisation des performances: utiliser requestAnimationFrame
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showCta]);
  
  // Lazy loading des images
  useEffect(() => {
    if (!lazyLoadImages) return;
    
    const loadImages = () => {
      const lazyImages = document.querySelectorAll('img[data-src]');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              imageObserver.unobserve(img);
            }
          });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
      } else {
        // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
        lazyImages.forEach(img => {
          const imgElement = img as HTMLImageElement;
          if (imgElement.dataset.src) {
            imgElement.src = imgElement.dataset.src;
            imgElement.removeAttribute('data-src');
          }
        });
      }
    };
    
    // Exécuter le lazy loading après le chargement
    if (document.readyState === 'complete') {
      loadImages();
    } else {
      window.addEventListener('load', loadImages);
      return () => window.removeEventListener('load', loadImages);
    }
  }, [lazyLoadImages]);
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  const handleCtaClick = () => {
    if (ctaAction) {
      ctaAction();
    } else if (ctaHref) {
      window.location.href = ctaHref;
    }
  };
  
  const dismissCookie = () => {
    setShowCookie(false);
    // N'utilise pas localStorage pour la conformité
    sessionStorage.setItem("cookie_notice_seen", "true");
  };
  
  // Vérifier si la bannière de cookie a déjà été affichée
  useEffect(() => {
    if (sessionStorage.getItem("cookie_notice_seen") === "true") {
      setShowCookie(false);
    }
  }, []);
  
  return (
    <div className="relative">
      {/* Contenu principal */}
      <div className="mobile-optimized-content">
        {children}
      </div>
      
      {/* Indicateur de progression optimisé */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 z-50 transition-transform duration-200 origin-left" 
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
      
      {/* Bannière cookie en bas */}
      {showCookie && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-white p-4 z-50 animate-fade-in">
          <div className="container mx-auto flex items-center justify-between">
            <p className="text-sm mr-4">
              Ce site n'utilise que des cookies strictement nécessaires pour votre expérience.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 text-white border-white hover:bg-slate-700"
              onClick={dismissCookie}
            >
              J'ai compris
            </Button>
          </div>
        </div>
      )}
      
      {/* Bouton retour en haut optimisé avec transition */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-20 right-4 p-3 rounded-full bg-slate-800/70 text-white shadow-md z-40 hover:bg-slate-700 transition-all duration-300 transform hover:scale-105"
          aria-label="Retour en haut"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      
      {/* CTA flottant avec animation pulse optimisée */}
      {showFloatingCta && showCta && (
        <div className="fixed bottom-20 left-4 z-40 animate-fade-in">
          <Button
            onClick={handleCtaClick}
            className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg pulse-animation px-5 py-6"
          >
            {ctaText}
          </Button>
        </div>
      )}
      
      {/* Styles pour les optimisations mobile */}
      <style>
      {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .mobile-optimized-content {
          scroll-padding-top: 80px;
        }
        
        /* Animation pulse optimisée pour les performances */
        @keyframes pulse-animation {
          0% {
            box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4);
            transform: scale(1);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(79, 70, 229, 0);
            transform: scale(1.05);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(79, 70, 229, 0);
            transform: scale(1);
          }
        }
        
        .pulse-animation {
          animation: pulse-animation 2s infinite;
          will-change: transform, box-shadow;
        }
        
        /* Optimisations spécifiques pour mobile */
        @media (max-width: 768px) {
          .mobile-optimized-content h1 {
            font-size: 1.75rem;
            line-height: 2.1rem;
          }
          
          .mobile-optimized-content h2 {
            font-size: 1.4rem;
            line-height: 1.9rem;
          }
          
          .mobile-optimized-content p {
            font-size: 1rem;
            line-height: 1.5rem;
          }
          
          .mobile-optimized-content img {
            max-width: 100%;
            height: auto;
          }
        }
      `}
      </style>
    </div>
  );
};

export default MobileOptimizer;
import React, { ReactNode } from 'react';
import { useMediaQuery } from '@/hooks/use-mobile';

interface MobileOptimizerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Composant qui optimise l'affichage sur mobile en ajustant automatiquement
 * certains éléments comme la taille des textes, marges et padding
 */
const MobileOptimizer: React.FC<MobileOptimizerProps> = ({ children, className }) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  return (
    <div className={`${isMobile ? 'px-4 text-sm' : 'px-6'} ${className || ''}`}>
      {children}
    </div>
  );
};

export default MobileOptimizer;
