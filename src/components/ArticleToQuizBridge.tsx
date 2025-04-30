import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Target, MessageCircle, Users, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import ScientificHighlightedText from './ui/ScientificHighlightedText';
import { useArticleEngagement } from '@/hooks/useArticleEngagement';
import { Badge } from './ui/badge';

interface ArticleToQuizBridgeProps {
  articleId: string;
  subject: string;
  className?: string;
}

const ArticleToQuizBridge: React.FC<ArticleToQuizBridgeProps> = ({
  articleId,
  subject,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { trackBridgeImpression, trackBridgeClick } = useArticleEngagement();

  // Points de conversion basés sur le sujet de l'article
  const conversionPoints = [
    {
      title: "Découvrez votre profil nutritionnel personnel",
      description: `Nos recherches montrent que 72% des personnes intéressées par ${subject} ont des besoins nutritionnels spécifiques.`,
      icon: <Target className="h-5 w-5 text-indigo-600" />,
    },
    {
      title: "Recevez des recommandations scientifiques sur mesure",
      description: "Analyse basée sur les dernières études cliniques en biologie cellulaire et nutrition.",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
    },
    {
      title: "Rejoignez notre communauté de chercheurs et participants",
      description: "Plus de 1200 personnes ont déjà bénéficié de nos analyses nutritionnelles personnalisées.",
      icon: <Users className="h-5 w-5 text-blue-600" />,
    },
  ];

  useEffect(() => {
    // Afficher le pont après un délai de lecture (simulé)
    const timer = setTimeout(() => {
      setIsVisible(true);
      trackBridgeImpression(articleId);
    }, 10000);

    // Rotation des points de conversion
    const rotationTimer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % conversionPoints.length);
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearInterval(rotationTimer);
    };
  }, [articleId, trackBridgeImpression]);

  const handleQuizClick = () => {
    trackBridgeClick(articleId);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`article-to-quiz-bridge ${className}`}
        >
          <Card className="overflow-hidden border-indigo-100 shadow-md">
            <div className="p-5 bg-gradient-to-r from-indigo-50 to-blue-50">
              <div className="mb-6">
                <Badge 
                  variant="outline"
                  className="mb-3 bg-indigo-100 text-indigo-700 border-indigo-200"
                >
                  <Clock className="mr-1 h-3 w-3" />
                  <span>5 minutes • 100% confidentiel</span>
                </Badge>

                <h3 className="text-xl font-medium mb-2 text-gray-900">
                  Analysez votre profil nutritionnel en lien avec cet article
                </h3>

                <p className="text-gray-600 text-sm">
                  <ScientificHighlightedText text="Notre laboratoire a développé un outil d'analyse basé sur les dernières recherches en [[nutrigenomics:nutrigénomique]] et biologie cellulaire." />
                </p>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex -space-x-2 overflow-hidden">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i} 
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-200"
                      style={{ backgroundImage: `url(/avatars/avatar-${i}.jpg)`, backgroundSize: 'cover' }}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>843 personnes</strong> ont déjà complété cette analyse
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {conversionPoints[activeIndex].icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        {conversionPoints[activeIndex].title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {conversionPoints[activeIndex].description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-indigo-600 font-medium flex items-center">
                  <Badge variant="outline" className="bg-white">
                    Seulement 6 places disponibles
                  </Badge>
                </div>
                <Button 
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white" 
                  onClick={handleQuizClick}
                  asChild
                >
                  <Link to="/quiz" className="flex items-center gap-1">
                    <span>Commencer mon analyse</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleToQuizBridge;