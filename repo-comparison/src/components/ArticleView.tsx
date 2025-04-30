import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Calendar, Clock, Tag, Share2, Bookmark, 
  BookOpen, User, Users, Award, BadgeCheck, FileCheck, Calculator,
  Info, PencilRuler, BrainCircuit, AlertCircle, CheckCircle,
  ChevronDown, ChevronUp, Link as LinkIcon
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import ScientificHighlightedText from './ui/ScientificHighlightedText';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Author {
  name: string;
  title: string;
  avatar: string;
  institution: string;
  credentials: string[];
  profileUrl: string;
}

interface Reference {
  id: number;
  title: string;
  authors: string;
  journal: string;
  year: string;
  url: string;
}

interface ArticleData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  date: string;
  updatedDate?: string;
  readTime: string;
  author: Author;
  peerReviewed: boolean;
  studyDuration: string;
  participants: number;
  keyInsight: string;
  references: Reference[];
  relatedArticles?: {
    id: string;
    title: string;
    image: string;
    excerpt: string;
  }[];
  tableOfContents: {
    id: string;
    title: string;
    level: number;
  }[];
  scientificTerms?: {
    [key: string]: string;
  };
}

interface ArticleViewProps {
  article: ArticleData;
  onNavigateToQuiz: () => void;
  relatedArticles?: Array<{
    id: string;
    title: string;
    excerpt: string;
    category: string;
    image: string;
    date: string;
    readTime: string;
  }>;
  studyHighlights?: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
  renderEnhancedContent?: (content: string) => string;
}

const ArticleView = ({ 
  article, 
  onNavigateToQuiz,
  relatedArticles = [],
  studyHighlights = [],
  renderEnhancedContent = (content) => content
}: ArticleViewProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isTOCExpanded, setIsTOCExpanded] = useState(true);
  const [visibleSection, setVisibleSection] = useState("");

  // Safe handling of references
  const safeReferences = article?.references || [];
  const [referencesOpen, setReferencesOpen] = useState(
    Array(safeReferences.length).fill(false)
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Suivre la progression de lecture
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const element = contentRef.current;
        const totalHeight = element.scrollHeight - element.clientHeight;
        const scrollPosition = element.scrollTop;
        const progress = (scrollPosition / totalHeight) * 100;
        setReadingProgress(Math.min(progress, 100));

        // Déterminer la section visible
        if (article.tableOfContents && article.tableOfContents.length > 0) {
          const sections = article.tableOfContents.map(item => item.id);
          for (const sectionId of sections) {
            const sectionElement = sectionRefs.current[sectionId];
            if (sectionElement) {
              const rect = sectionElement.getBoundingClientRect();
              if (rect.top <= 150 && rect.bottom >= 150) {
                setVisibleSection(sectionId);
                break;
              }
            }
          }
        }
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      return () => contentElement.removeEventListener('scroll', handleScroll);
    }
  }, [article.tableOfContents]);

  // Initialiser les références aux sections
  useEffect(() => {
    if (article.tableOfContents && article.tableOfContents.length > 0) {
      article.tableOfContents.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
          sectionRefs.current[item.id] = element;
        }
      });
    }
  }, [article.tableOfContents]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "Article retiré de vos favoris" : "Article ajouté à vos favoris");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(console.error);
    } else {
      toast.success("Lien copié dans le presse-papier");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleToggleReference = (index: number) => {
    const newOpen = [...referencesOpen];
    newOpen[index] = !newOpen[index];
    setReferencesOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && contentRef.current) {
      contentRef.current.scrollTo({
        top: element.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  };

  // Fonction pour remplacer les termes scientifiques par des tooltips
  const renderContentWithTooltips = (content: string) => {
    if (!article.scientificTerms) return content;

    let processedContent = content;
    Object.entries(article.scientificTerms).forEach(([term, definition]) => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      processedContent = processedContent.replace(regex, `<span class="scientific-term" data-term="${term}" data-definition="${definition}">${term}</span>`);
    });

    return <div dangerouslySetInnerHTML={{ __html: processedContent }} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-natural-50/30">
      {/* Barre de progression de lecture */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-gray-100">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-natural-600 transition-all duration-300 ease-out rounded-r-full"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Indicateur flottant de progression de lecture */}
      <div className="fixed bottom-6 right-6 z-40 bg-white shadow-lg rounded-full p-1.5 flex items-center gap-2 border border-gray-100">
        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
          <span className="text-xs font-medium text-indigo-700">{Math.round(readingProgress)}%</span>
        </div>
        <span className="text-xs font-medium text-gray-600 pr-2">Lu</span>
      </div>

      {/* En-tête de l'article */}
      <div className="w-full h-[55vh] md:h-[75vh] relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 z-10"></div>
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="container mx-auto px-4 absolute inset-0 z-20 flex flex-col justify-end pb-10">
          {/* Lecteurs actuels - Social proof */}
          <div className="mb-4 bg-black/40 backdrop-blur-md w-fit px-3 py-1.5 rounded-full text-white text-sm flex items-center animate-pulse">
            <div className="flex -space-x-2 mr-2">
              <div className="w-6 h-6 rounded-full bg-indigo-400 border border-white"></div>
              <div className="w-6 h-6 rounded-full bg-natural-400 border border-white"></div>
              <div className="w-6 h-6 rounded-full bg-blue-400 border border-white"></div>
            </div>
            <span>42 personnes lisent cet article</span>
          </div>

          <div className="flex flex-wrap gap-3 mb-5 animate-fadeIn">
            <Badge variant="indigo" className="flex items-center gap-1 text-sm font-medium py-1.5">
              <BadgeCheck className="h-3.5 w-3.5" />
              <span>Laboratoire Indépendant</span>
            </Badge>
            <Badge variant="pill" className="flex items-center gap-1 text-sm py-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>Étude {article.studyDuration}</span>
            </Badge>
            <Badge variant="pill" className="flex items-center gap-1 text-sm py-1.5">
              <Users className="h-3.5 w-3.5" />
              <span>{article.participants} participants</span>
            </Badge>
            <Badge variant="active" className="flex items-center gap-1 text-sm py-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600">
              <Award className="h-3.5 w-3.5" />
              <span>{article.keyInsight}</span>
            </Badge>
          </div>

          <Button variant="outline" size="sm" className="bg-white/90 w-fit mb-5 hover:bg-white shadow-sm" asChild>
            <Link to="/articles">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux articles
            </Link>
          </Button>

          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white max-w-4xl drop-shadow-md animate-slideUp leading-tight font-display tracking-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap mt-5 gap-5 text-white/90">
            <div className="flex items-center bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <User className="h-4 w-4 mr-2 text-indigo-300" />
              <span className="text-sm">{article.author.name}</span>
            </div>
            <div className="flex items-center bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Calendar className="h-4 w-4 mr-2 text-indigo-300" />
              <span className="text-sm">{article.date}</span>
            </div>
            <div className="flex items-center bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Tag className="h-4 w-4 mr-2 text-indigo-300" />
              <span className="text-sm">{article.category}</span>
            </div>
            <div className="flex items-center bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Clock className="h-4 w-4 mr-2 text-indigo-300" />
              <span className="text-sm">{article.readTime}</span>
            </div>
            {article.peerReviewed && (
              <div className="flex items-center bg-green-500/40 text-white px-3 py-1.5 rounded-full backdrop-blur-sm">
                <BadgeCheck className="h-4 w-4 mr-2" />
                <span className="text-sm">Révisé par des pairs</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Corps de l'article avec table des matières */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Barre latérale avec table des matières et profil de l'auteur */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Profil de l'auteur */}
              <Card className="p-5 shadow-md bg-white">
                <div className="text-lg font-bold mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2 text-indigo-500" />
                  L'auteur
                </div>
                <div className="flex items-start gap-3">
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name} 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <Link to={article.author.profileUrl} className="font-bold text-indigo-700 hover:text-indigo-800">
                      {article.author.name}
                    </Link>
                    <p className="text-sm text-gray-600 mb-1">{article.author.title}</p>
                    <p className="text-xs text-gray-500">{article.author.institution}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {article.author.credentials.map((credential, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {credential}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Table des matières */}
              <Card className="p-0 shadow-md bg-white overflow-hidden">
                <div 
                  className="flex justify-between items-center cursor-pointer p-5 border-b border-gray-100 hover:bg-indigo-50 transition-colors"
                  onClick={() => setIsTOCExpanded(!isTOCExpanded)}
                >
                  <div className="text-lg font-bold flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-indigo-500" />
                    Table des matières
                  </div>
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-600 font-medium">
                    {isTOCExpanded ? 
                      <ChevronUp className="h-4 w-4 mr-1" /> : 
                      <ChevronDown className="h-4 w-4 mr-1" />
                    }
                    {isTOCExpanded ? "Réduire" : "Afficher"}
                  </Badge>
                </div>

                {isTOCExpanded && article.tableOfContents && article.tableOfContents.length > 0 && (
                  <div className="max-h-[400px] overflow-y-auto p-2">
                    {article.tableOfContents.map((item, index) => (
                      <div 
                        key={item.id}
                        className={`flex items-center py-2 px-3 my-1 rounded-md cursor-pointer transition-all
                          ${visibleSection === item.id ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'hover:bg-gray-50'}
                          ${item.level === 1 ? 'font-medium' : 'pl-6 text-sm'}`}
                        onClick={() => scrollToSection(item.id)}
                      >
                        <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mr-2 flex-shrink-0 text-xs font-medium">
                          {index + 1}
                        </div>
                        <span className="line-clamp-1">{item.title}</span>
                      </div>
                    ))}
                  </div>
                )}
                {isTOCExpanded && (!article.tableOfContents || article.tableOfContents.length === 0) && (
                  <div className="p-5 text-sm text-gray-500 bg-gray-50">
                    <div className="flex items-center">
                      <Info className="h-4 w-4 mr-2 text-indigo-500" />
                      Pas de sections disponibles pour cet article
                    </div>
                  </div>
                )}
              </Card>

              {/* Actions */}
              <Card className="p-5 shadow-md bg-white">
                <div className="text-lg font-bold mb-3">Actions</div>
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={handleBookmark}
                  >
                    <Bookmark className="h-4 w-4 mr-2" fill={isBookmarked ? "currentColor" : "none"} />
                    {isBookmarked ? "Enregistré" : "Enregistrer"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <a href="#references">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Références
                    </a>
                  </Button>
                  <Button 
                    variant="natural" 
                    className="mt-2 bg-gradient-to-r from-indigo-500 to-indigo-600"
                    onClick={onNavigateToQuiz}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Faire le test personnalisé
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Contenu de l'article */}
          <div className="lg:col-span-3" ref={contentRef} style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            {/* Badge de mise à jour */}
            {article.updatedDate && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-6 flex items-center">
                <Info className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-amber-700 text-sm">
                  Dernière mise à jour le {article.updatedDate}
                </span>
              </div>
            )}

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-10">
              <ScientificHighlightedText className="lead">
                {article?.excerpt || ''}
              </ScientificHighlightedText>
            </div>

            {/* Contenu principal avec tooltips pour les termes scientifiques */}
            <TooltipProvider>
              <div className="prose prose-lg max-w-none mb-12">
                <div className="article-content prose">
                  <p className="lead">Avec la pandémie mondiale et les saisons qui changent, maintenir un système immunitaire fort n'a jamais été aussi important. Bien que rien ne remplace une alimentation équilibrée, certains compléments peuvent offrir un soutien supplémentaire à votre système immunitaire.</p>

                  <h2>1. La vitamine D : le nutriment du soleil</h2> 
                  <p>La vitamine D joue un rôle crucial dans la régulation de la réponse immunitaire. Une carence en vitamine D a été associée à un risque accru d'infections respiratoires. Pendant les mois d'hiver où l'exposition au soleil est limitée, une supplémentation peut être particulièrement bénéfique.</p> 
                  <p>Des études montrent qu'une supplémentation quotidienne en vitamine D peut réduire le risque d'infections respiratoires, en particulier chez les personnes présentant une carence.</p>

                  <h2>2. La vitamine C : plus qu'un remède contre le rhume</h2> 
                  <p>La vitamine C est un puissant <a href="/bibliotheque-scientifique?term=antioxydant">antioxydant</a> qui peut renforcer les défenses naturelles de votre corps. Elle soutient diverses fonctions cellulaires du système immunitaire inné et adaptatif. Contrairement aux idées reçues, la vitamine C ne prévient pas le rhume mais peut réduire sa durée et sa gravité.</p> 
                  <p>Pour une efficacité optimale, une dose quotidienne de 200 mg est généralement recommandée. Les agrumes, les poivrons et les baies sont d'excellentes sources naturelles.</p>

                  <h2>3. Le zinc : minéral essentiel pour l'immunité</h2> 
                  <p>Le zinc est impliqué dans de nombreuses réactions enzymatiques liées à la fonction immunitaire. Une supplémentation en zinc peut réduire la durée des rhumes et diminuer la gravité des symptômes lorsqu'elle est prise dans les 24 heures suivant l'apparition des symptômes.</p> 
                  <p>Les huîtres, la viande rouge et les légumineuses sont riches en zinc, mais une supplémentation de 15-30 mg par jour peut être bénéfique pendant les périodes à risque.</p>

                  <h2>4. Les probiotiques : pour un microbiome équilibré</h2> 
                  <p>Un système digestif sain est étroitement lié à une immunité forte. Les probiotiques aident à maintenir l'équilibre des bactéries intestinales bénéfiques qui soutiennent votre système immunitaire.</p> 
                  <p>Des souches comme Lactobacillus et Bifidobacterium ont démontré des effets positifs sur la réduction des infections respiratoires et gastro-intestinales. Les yaourts fermentés, le kéfir et la choucroute sont d'excellentes sources naturelles.</p>

                  <h2>5. Les adaptogènes : modulateurs du stress</h2> 
                  <p>Le stress chronique affaiblit votre système immunitaire. Les adaptogènes comme l'ashwagandha, le ginseng et le rhodiola aident l'organisme à mieux gérer le stress, contribuant indirectement à une meilleure réponse immunitaire.</p> 
                  <p>Des études suggèrent que certains adaptogènes peuvent également avoir des effets immunostimulants directs.</p>
                </div>
              </div>
            </TooltipProvider>

            {/* Section des références */}
            {article.references && article.references.length > 0 && (
              <div id="references" className="mt-12 pt-6 border-t border-gray-200">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <FileCheck className="h-6 w-6 mr-2 text-indigo-600" />
                  Références scientifiques ({article.references.length})
                </h2>

                <div className="space-y-3">
                  {article.references.map((reference, index) => (
                    <div 
                      key={index}
                      className="border border-gray-200 rounded-md overflow-hidden"
                    >
                      <div 
                        className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                        onClick={() => handleToggleReference(index)}
                      >
                        <div className="flex items-center">
                          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold mr-3">
                            {reference.id}
                          </span>
                          <span className="font-medium">{reference.title}</span>
                        </div>
                        {referencesOpen[index] ? 
                          <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        }
                      </div>

                      {referencesOpen[index] && (
                        <div className="p-4 bg-white border-t border-gray-200">
                          <p className="text-sm text-gray-600 mb-2">{reference.authors}</p>
                          <p className="text-sm"><strong>Journal:</strong> {reference.journal}, {reference.year}</p>
                          <div className="mt-3">
                            <Button variant="link" className="p-0 h-auto" asChild>
                              <a 
                                href={reference.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:text-indigo-800 flex items-center"
                              >
                                <LinkIcon className="h-4 w-4 mr-1" />
                                Consulter l'étude originale
                              </a>
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section de validation scientifique */}
            <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-full p-3">
                  <BadgeCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-1">
                    Contenu vérifié par notre comité scientifique
                  </h3>
                  <p className="text-sm text-green-700 mb-3">
                    Cet article a été révisé par notre équipe de chercheurs pour assurer 
                    l'exactitude des informations présentées et la conformité avec les 
                    dernières avancées scientifiques.
                  </p>
                  {article.updatedDate && (
                    <p className="text-xs text-green-600 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Dernière validation: {article.updatedDate}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Transition vers le quiz personnalisé */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-gradient-to-r from-indigo-50 to-natural-50 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-indigo-100 rounded-full opacity-50"></div>
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-natural-100 rounded-full opacity-30"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-indigo-800">
                    Découvrez vos besoins personnels
                  </h3>

                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-white rounded-full p-2 shadow-md flex-shrink-0">
                      <BrainCircuit className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-indigo-700 font-medium mb-1">Chaque individu est unique</p>
                      <p className="text-sm text-gray-600">
                        Cette étude démontre que les besoins nutritionnels varient considérablement 
                        d'une personne à l'autre. Vos besoins spécifiques dépendent de votre âge, 
                        votre mode de vie, vos antécédents et vos objectifs personnels.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 mb-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                        <span className="font-medium text-amber-700">78% des personnes</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        ne prennent pas les compléments adaptés à leurs besoins réels, 
                        limitant significativement leur efficacité.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-medium text-green-700">3 fois plus efficace</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Un régime adapté à vos besoins spécifiques est jusqu'à 3 fois 
                        plus efficace qu'une approche générique.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={onNavigateToQuiz}
                      className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white flex-grow"
                      size="lg"
                    >
                      <PencilRuler className="h-5 w-5 mr-2" />
                      Faire mon test personnalisé gratuit
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>

                    <div className="flex items-center justify-center text-sm text-indigo-600 font-medium">
                      <Users className="h-4 w-4 mr-1" />
                      <span>10,742 personnes ont déjà fait le test</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles connexes */}
            {relatedArticles && relatedArticles.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Articles connexes</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.id}
                      to={`/article/${relatedArticle.id}`}
                      className="group"
                    >
                      <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-natural-200 h-full flex flex-col">
                        <div className="h-48 overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                          <img 
                            src={relatedArticle.image} 
                            alt={relatedArticle.title} 
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          <Badge className="absolute top-3 left-3 z-20 bg-white/90">{article.category}</Badge>
                        </div>
                        <div className="p-5 flex-grow flex flex-col">
                          <h4 className="font-bold text-natural-800 mb-2 group-hover:text-indigo-600 transition-colors">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-sm text-natural-600 mb-4 flex-grow">
                            {relatedArticle.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-natural-500">
                            <span>{article.date}</span>
                            <span className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              {relatedArticle.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;