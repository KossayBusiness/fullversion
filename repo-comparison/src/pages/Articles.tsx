
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import InstagramCTA from '@/components/InstagramCTA';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';

const Articles = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || '';
  const initialSearch = queryParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Mock categories
  const categories = [
    { id: 'supplements', name: 'Compléments Alimentaires' },
    { id: 'skincare', name: 'Soins de la Peau' },
    { id: 'haircare', name: 'Santé des Cheveux' },
    { id: 'wellness', name: 'Bien-être' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'sleep', name: 'Sommeil' },
    { id: 'immunity', name: 'Immunité' },
    { id: 'energy', name: 'Énergie' },
  ];

  // Mock articles for demo
  const allArticles = [
    {
      id: "1",
      title: "Les antioxydants : comment ils protègent vos cellules et ralentissent le vieillissement",
      excerpt: "Une analyse approfondie des différents antioxydants, leur mécanisme d'action au niveau cellulaire et les preuves scientifiques de leur efficacité contre le stress oxydatif.",
      category: "Nutrition",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800&h=600",
      date: "15 Juin 2023",
      readTime: "8 min de lecture",
      categoryId: "nutrition"
    },
    {
      id: "2",
      title: "Vitamine D et immunité : pourquoi elle est essentielle en hiver",
      excerpt: "Découvrez comment la vitamine D joue un rôle crucial dans le renforcement du système immunitaire et comment optimiser vos niveaux en période hivernale.",
      category: "Compléments",
      image: "https://images.unsplash.com/photo-1616671276441-2f2d2c7a667b?auto=format&fit=crop&q=80&w=800&h=600",
      date: "2 Juin 2023",
      readTime: "6 min de lecture",
      categoryId: "supplements"
    },
    {
      id: "3",
      title: "Acides gras oméga-3 : guide complet pour choisir le bon supplément",
      excerpt: "Une comparaison scientifique des différentes sources d'oméga-3, leur biodisponibilité et les critères de qualité à vérifier avant d'acheter.",
      category: "Compléments",
      image: "https://images.unsplash.com/photo-1535185384036-28bbc8035f28?auto=format&fit=crop&q=80&w=800&h=600",
      date: "28 Mai 2023",
      readTime: "7 min de lecture",
      categoryId: "supplements"
    },
    {
      id: "4",
      title: "Routine anti-âge naturelle : les actifs prouvés scientifiquement",
      excerpt: "Quels ingrédients naturels ont démontré leur efficacité dans des études cliniques pour lutter contre les signes du vieillissement cutané?",
      category: "Soins de la Peau",
      image: "https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?auto=format&fit=crop&q=80&w=800&h=600",
      date: "20 Mai 2023",
      readTime: "5 min de lecture",
      categoryId: "skincare"
    },
    {
      id: "5",
      title: "Les protéines de lactosérum : mythes et réalités pour la récupération musculaire",
      excerpt: "Une analyse des études scientifiques récentes sur l'efficacité des protéines de whey et leur comparaison avec d'autres sources protéiques.",
      category: "Compléments",
      image: "https://images.unsplash.com/photo-1579722818383-7f95de578c48?auto=format&fit=crop&q=80&w=800&h=600",
      date: "15 Mai 2023",
      readTime: "6 min de lecture",
      categoryId: "supplements"
    },
    {
      id: "6",
      title: "Acide hyaluronique : comment choisir le bon produit selon votre peau",
      excerpt: "Guide complet sur les différents poids moléculaires d'acide hyaluronique, leurs effets sur différentes couches de la peau et comment les intégrer dans votre routine.",
      category: "Soins de la Peau",
      image: "https://images.unsplash.com/photo-1556228841-a3c527ebefe5?auto=format&fit=crop&q=80&w=800&h=600",
      date: "10 Mai 2023",
      readTime: "7 min de lecture",
      categoryId: "skincare"
    },
    {
      id: "7",
      title: "Kératine et biotine : analyse comparative pour des cheveux plus forts",
      excerpt: "Découvrez quelle est la meilleure option entre kératine et biotine selon la science actuelle pour renforcer vos cheveux et stimuler leur croissance.",
      category: "Santé des Cheveux",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800&h=600",
      date: "5 Mai 2023",
      readTime: "8 min de lecture",
      categoryId: "haircare"
    },
    {
      id: "8",
      title: "Méditation de pleine conscience : effets mesurables sur le stress chronique",
      excerpt: "Revue des études scientifiques mesurant l'impact de la méditation régulière sur les marqueurs biologiques du stress et la qualité de vie.",
      category: "Bien-être",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800&h=600",
      date: "1 Mai 2023",
      readTime: "5 min de lecture",
      categoryId: "wellness"
    },
    {
      id: "9",
      title: "Mélatonine : efficacité réelle pour améliorer le sommeil selon l'âge",
      excerpt: "Analyse des dosages optimaux de mélatonine selon l'âge et le type de troubles du sommeil, basée sur les dernières études cliniques.",
      category: "Sommeil",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800&h=600",
      date: "28 Avril 2023",
      readTime: "6 min de lecture",
      categoryId: "sleep"
    },
    {
      id: "10",
      title: "Les adaptogènes : quelles plantes pour quel type de stress?",
      excerpt: "Guide comparatif des différentes plantes adaptogènes (ashwagandha, rhodiola, ginseng) et leur efficacité spécifique selon les types de stress.",
      category: "Bien-être",
      image: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=80&w=800&h=600",
      date: "25 Avril 2023",
      readTime: "7 min de lecture",
      categoryId: "wellness"
    }
  ];

  // Filter articles based on category and search
  const filteredArticles = allArticles.filter(article => {
    const matchesCategory = selectedCategory ? article.categoryId === selectedCategory : true;
    const matchesSearch = searchTerm.trim() === '' ? true : 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (searchTerm) params.set('search', searchTerm);
    
    const newSearch = params.toString();
    if (newSearch) {
      navigate(`/articles?${newSearch}`, { replace: true });
    } else {
      navigate('/articles', { replace: true });
    }
  }, [selectedCategory, searchTerm, navigate]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already updated via the input onChange
    setIsSearchVisible(false);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchTerm('');
    setIsSearchVisible(false);
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-natural-50 to-white -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-6">
              Nos Articles
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Explorez notre collection d'articles fondés sur la science pour comprendre 
              les faits derrière les tendances en santé naturelle.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-natural-200 hover:bg-natural-50"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
              >
                <Search className="h-4 w-4" />
                Rechercher
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-natural-200 hover:bg-natural-50"
                onClick={clearFilters}
                disabled={!selectedCategory && !searchTerm}
              >
                <X className="h-4 w-4" />
                Effacer les filtres
              </Button>
            </div>
            
            {/* Search Form */}
            {isSearchVisible && (
              <div className="mt-6 max-w-md mx-auto slide-up">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    type="search"
                    placeholder="Rechercher un article..."
                    className="flex-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit" className="bg-natural-600 hover:bg-natural-700">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filters & Articles */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 glass rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-medium">Catégories</h2>
                  <Filter className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant="ghost"
                      className={`justify-start w-full ${
                        selectedCategory === category.id
                          ? "bg-natural-100 text-natural-700 hover:bg-natural-200"
                          : "hover:bg-natural-50"
                      }`}
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              {/* Active filters */}
              {(selectedCategory || searchTerm) && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">Filtres actifs:</span>
                  {selectedCategory && (
                    <Badge 
                      className="bg-natural-100 text-natural-700 hover:bg-natural-200"
                      onClick={() => setSelectedCategory('')}
                    >
                      {getCategoryName(selectedCategory)} <X className="ml-1 h-3 w-3" />
                    </Badge>
                  )}
                  {searchTerm && (
                    <Badge 
                      className="bg-natural-100 text-natural-700 hover:bg-natural-200"
                      onClick={() => setSearchTerm('')}
                    >
                      Recherche: {searchTerm} <X className="ml-1 h-3 w-3" />
                    </Badge>
                  )}
                </div>
              )}

              {filteredArticles.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredArticles.map((article, index) => (
                      <ArticleCard 
                        key={article.id} 
                        {...article} 
                        className={`slide-up delay-${Math.min((index % 4) * 100, 300)}`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Aucun article trouvé avec les filtres sélectionnés.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={clearFilters}
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <InstagramCTA />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Articles;
