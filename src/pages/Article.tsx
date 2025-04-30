import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleView from '@/components/ArticleView';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, ArrowRight, Calendar, User, Tag, Instagram, 
  Beaker, Clock, Users, Award, Microscope, PieChart, BookOpen, X, ChevronRight,
  Sparkles, Brain, Heart, MessageCircle, Share2, Bookmark, ThumbsUp, Download,
  ScrollText, ExternalLink, Leaf, FileCheck, BadgeCheck, LightbulbIcon,
  Zap, LucideArrowDownToLine, BookMarked, Star, Coffee
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import InstagramCarousel from "@/components/InstagramCarousel";
import InstagramCTA from "@/components/InstagramCTA";
import { toast } from "sonner";
import FeaturedArticle from "@/components/FeaturedArticle";
import { cn } from "@/lib/utils";

const fetchArticle = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));  
  return {
    id,
    title: "Les compléments alimentaires essentiels pour supporter votre système immunitaire",
    author: {
      name: "Dr. Marie Dupont",
      title: "Docteur en Nutrition",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      institution: "Institut de Recherche Nutritionnelle",
      credentials: ["PhD", "Nutrition Certifiée"],
      profileUrl: "/profile/dr-dupont"
    },
    date: "15 juin 2023",
    category: "Nutrition",
    tags: ["Immunité", "Compléments", "Vitamines"],
    readTime: "8 min",
    peerReviewed: true,
    studyDuration: "16 semaines",
    participants: 243,
    year: 2023,
    keyInsight: "72% de réduction des symptômes inflammatoires",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=2574&auto=format&fit=crop",
    references: [
      {
        id: 1,
        title: "Effets de la vitamine D sur l'immunité",
        authors: "Martin et al.",
        journal: "Journal of Nutrition",
        year: "2022",
        url: "https://example.com/study1"
      },
      {
        id: 2,
        title: "Le zinc comme modulateur immunitaire",
        authors: "Chen et al.",
        journal: "Immunology Research",
        year: "2021",
        url: "https://example.com/study2"
      }
    ],
    tableOfContents: [
      {
        id: "section-1",
        title: "La vitamine D : le nutriment du soleil",
        level: 1
      },
      {
        id: "section-2",
        title: "La vitamine C : plus qu'un remède contre le rhume",
        level: 1
      },
      {
        id: "section-3",
        title: "Le zinc : minéral essentiel pour l'immunité",
        level: 1
      }
    ],
    scientificTerms: {
      "immunomodulateur": "Substance qui modifie la réponse du système immunitaire",
      "antioxydant": "Molécule qui combat les radicaux libres dans l'organisme"
    },
    excerpt: "Avec la pandémie mondiale et les saisons qui changent, maintenir un système immunitaire fort n'a jamais été aussi important. Découvrez quels compléments peuvent vraiment faire la différence.",
    content: `
      <p class="lead">Avec la pandémie mondiale et les saisons qui changent, maintenir un système immunitaire fort n'a jamais été aussi important. Bien que rien ne remplace une alimentation équilibrée, certains compléments peuvent offrir un soutien supplémentaire à votre système immunitaire.</p>

      <h2>1. La vitamine D : le nutriment du soleil</h2>
      <p>La vitamine D joue un rôle crucial dans la régulation de la réponse immunitaire. Une carence en vitamine D a été associée à un risque accru d'infections respiratoires. Pendant les mois d'hiver où l'exposition au soleil est limitée, une supplémentation peut être particulièrement bénéfique.</p>
      <p>Des études montrent qu'une supplémentation quotidienne en vitamine D peut réduire le risque d'infections respiratoires, en particulier chez les personnes présentant une carence.</p>

      <h2>2. La vitamine C : plus qu'un remède contre le rhume</h2>
      <p>La vitamine C est un puissant antioxydant qui peut renforcer les défenses naturelles de votre corps. Elle soutient diverses fonctions cellulaires du système immunitaire inné et adaptatif. Contrairement aux idées reçues, la vitamine C ne prévient pas le rhume mais peut réduire sa durée et sa gravité.</p>
      <p>Pour une efficacité optimale, une dose quotidienne de 200 mg est généralement recommandée. Les agrumes, les poivrons et les baies sont d'excellentes sources naturelles.</p>

      <h2>3. Le zinc : minéral essentiel pour l'immunité</h2>
      <p>Le zinc est impliqué dans de nombreuses réactions enzymatiques liées à la fonction immunitaire. Une supplémentation en zinc peut réduire la durée des rhumes et diminuer la gravité des symptômes lorsqu'elle est prise dans les 24 heures suivant l'apparition des symptômes.</p>
      <p>Les huîtres, la viande rouge et les légumineuses sont riches en zinc, mais une supplémentation de 15-30 mg par jour peut être bénéfique pendant les périodes à risque.</p>

      <h2>4. Les probiotiques : pour un microbiome équilibré</h2>
      <p>Un système digestif sain est étroitement lié à une immunité forte. Les probiotiques aident à maintenir l'équilibre des bactéries intestinales bénéfiques qui soutiennent votre système immunitaire.</p>
      <p>Des souches comme Lactobacillus et Bifidobacterium ont démontré des effets positifs sur la réduction des infections respiratoires et gastro-intestinales. Les yaourts fermentés, le kéfir et la choucroute sont d'excellentes sources naturelles.</p>

      <h2>5. Les adapotogènes : modulateurs du stress</h2>
      <p>Le stress chronique affaiblit votre système immunitaire. Les adaptogènes comme l'ashwagandha, le ginseng et le rhodiola aident l'organisme à mieux gérer le stress, contribuant indirectement à une meilleure réponse immunitaire.</p>
      <p>Des études suggèrent que certains adaptogènes peuvent également avoir des effets immunomodulateurs directs, soutenant la production et l'activité des cellules immunitaires.</p>

      <h2>Ce que les autres vous cachent</h2>
      <p>La plupart des consommateurs ignorent que la qualité des compléments alimentaires varie énormément. Nos études montrent que <strong>85% des produits sur le marché</strong> contiennent des doses sous-optimales ou des formes peu biodisponibles.</p>
      <p>Nos recherches ont démontré qu'une combinaison spécifique de nutriments peut amplifier leur efficacité individuelle par un facteur de 2,4 - une synergie rarement exploitée dans les formulations commerciales standard.</p>

      <h2>Précautions et considérations</h2>
      <p>Avant de commencer toute supplémentation, il est recommandé de consulter un professionnel de santé, en particulier si vous prenez des médicaments ou souffrez de conditions médicales préexistantes. Rappelez-vous que les suppléments sont destinés à compléter et non à remplacer une alimentation équilibrée et un mode de vie sain.</p>

      <p>La qualité et la biodisponibilité des suppléments varient considérablement. Optez pour des marques réputées qui suivent les bonnes pratiques de fabrication et proposent des formulations testées par des tiers.</p>

      <h2>Conclusion</h2>
      <p>Si les compléments alimentaires peuvent offrir un soutien précieux à votre système immunitaire, ils fonctionnent mieux dans le cadre d'une approche holistique de la santé. Combinez-les avec une alimentation riche en fruits et légumes, une activité physique régulière, un sommeil de qualité et une bonne gestion du stress pour des résultats optimaux.</p>

      <p>N'oubliez pas que le système immunitaire est complexe et que ses besoins peuvent varier d'une personne à l'autre. Personnalisez votre approche en fonction de vos besoins spécifiques et consultez un professionnel si nécessaire.</p>
    `
  };
};

const relatedArticles = [
  {
    id: "2",
    title: "Le magnésium et son impact sur la récupération musculaire",
    excerpt: "Découvrez comment le magnésium peut améliorer votre récupération après l'exercice physique.",
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    date: "2 Mai 2023",
    readTime: "6 min"
  },
  {
    id: "3",
    title: "Les antioxydants naturels à intégrer dans votre alimentation",
    excerpt: "Les meilleurs aliments riches en antioxydants pour lutter contre le stress oxydatif.",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    date: "10 Juin 2023",
    readTime: "5 min"
  },
  {
    id: "4",
    title: "Comment optimiser l'absorption des nutriments",
    excerpt: "Les combinaisons alimentaires qui maximisent l'assimilation des vitamines et minéraux.",
    category: "Santé",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    date: "25 Mai 2023",
    readTime: "7 min"
  }
];

const studyHighlights = [
  {
    icon: <BadgeCheck className="h-5 w-5 text-natural-600" />,
    title: "Étude randomisée",
    description: "Contrôlée en double aveugle"
  },
  {
    icon: <Users className="h-5 w-5 text-natural-600" />,
    title: "243 participants",
    description: "Âgés de 25 à 64 ans"
  },
  {
    icon: <Clock className="h-5 w-5 text-natural-600" />,
    title: "16 semaines",
    description: "Suivi rigoureux"
  },
  {
    icon: <FileCheck className="h-5 w-5 text-natural-600" />,
    title: "72% d'efficacité",
    description: "Réduction des symptômes"
  }
];

const renderEnhancedContent = (content: string) => {
  content = content.replace(/<h2>(.*?)<\/h2>/g, (match, title) => {
    return `<h2 class="flex items-center font-display text-2xl md:text-3xl font-bold mt-10 mb-4 text-natural-800 group relative">
      <span class="absolute -left-4 h-full w-1 bg-gradient-to-b from-indigo-500 to-indigo-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
      <span class="mr-2 text-indigo-500">✦</span>${title}
    </h2>`;
  });

  content = content.replace(/<p class="lead">(.*?)<\/p>/g, (match, text) => {
    return `<p class="lead text-xl md:text-2xl text-natural-700 font-medium mb-6 border-l-4 border-indigo-400 pl-4 italic">${text}</p>`;
  });

  content = content.replace(/<p>([^<]*?)<\/p>/g, (match, text) => {
    if (text.includes("Nos recherches ont démontré") || text.includes("85% des produits")) {
      return `<p class="text-lg leading-relaxed mb-5 py-3 px-4 bg-indigo-50/50 border-l-4 border-indigo-400 rounded-r-md">${text}</p>`;
    }
    return `<p class="text-lg leading-relaxed mb-5">${text}</p>`;
  });

  return content;
};

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { data: articleData, isLoading, error } = useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchArticle(id || '1')
  });

  useEffect(() => {
    if (articleData) {
      setArticle(articleData);
      setLoading(false);
    }
  }, [articleData]);

  // Ensure relatedArticles is properly initialized
  const safeRelatedArticles = relatedArticles || [];

  const handleNavigateToQuiz = () => {
    navigate('/quiz');
  };


  if (isLoading) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
        <div className="animate-pulse space-y-8 w-full max-w-3xl">
          <div className="h-10 bg-muted rounded w-3/4"></div>
          <div className="h-6 bg-muted rounded w-1/2"></div>
          <div className="h-96 bg-muted rounded"></div>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Erreur lors du chargement de l'article</h1>
          <p className="mt-4">Impossible de charger l'article demandé. Veuillez réessayer ultérieurement.</p>
          <Button asChild className="mt-6">
            <Link to="/articles">Retour aux articles</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );

  if (!article) return null; // Handle case where article is not yet fetched

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Breadcrumbs /> {/* Added Breadcrumbs component */}
        <ArticleView 
          article={article} 
          onNavigateToQuiz={handleNavigateToQuiz} 
          relatedArticles={safeRelatedArticles}
          studyHighlights={studyHighlights}
          renderEnhancedContent={renderEnhancedContent}
        />
      </div>
      <Footer />
    </div>
  );
};

const CheckIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const Breadcrumbs = () => {
  return (
    <nav className="mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="h-5 w-5 text-gray-400" />
            <Link to="/articles" className="ml-1 inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Articles
            </Link>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <ChevronRight className="h-5 w-5 text-gray-400" />
            <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">Article Title</span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Article;