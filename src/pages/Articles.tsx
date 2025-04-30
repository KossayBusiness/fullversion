
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

  // Categories
  const categories = [
    { id: 'supplements', name: 'Dietary Supplements' },
    { id: 'skincare', name: 'Skin Care' },
    { id: 'haircare', name: 'Hair Health' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'sleep', name: 'Sleep' },
    { id: 'immunity', name: 'Immunity' },
    { id: 'energy', name: 'Energy' },
  ];

  // Mock articles for demo
  const allArticles = [
    {
      id: "1",
      title: "Antioxidants: How They Protect Your Cells and Slow Aging",
      excerpt: "An in-depth analysis of different antioxidants, their mechanism of action at the cellular level, and scientific evidence of their effectiveness against oxidative stress.",
      category: "Nutrition",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800&h=600",
      date: "June 15, 2023",
      readTime: "8 min read",
      categoryId: "nutrition"
    },
    {
      id: "2",
      title: "Vitamin D and Immunity: Why It's Essential in Winter",
      excerpt: "Discover how vitamin D plays a crucial role in strengthening the immune system and how to optimize your levels during winter.",
      category: "Supplements",
      image: "https://images.unsplash.com/photo-1616671276441-2f2d2c7a667b?auto=format&fit=crop&q=80&w=800&h=600",
      date: "June 2, 2023",
      readTime: "6 min read",
      categoryId: "supplements"
    },
    {
      id: "3",
      title: "Omega-3 Fatty Acids: Complete Guide to Choosing the Right Supplement",
      excerpt: "A scientific comparison of different omega-3 sources, their bioavailability, and quality criteria to check before buying.",
      category: "Supplements",
      image: "https://images.unsplash.com/photo-1535185384036-28bbc8035f28?auto=format&fit=crop&q=80&w=800&h=600",
      date: "May 28, 2023",
      readTime: "7 min read",
      categoryId: "supplements"
    },
    {
      id: "4",
      title: "Natural Anti-Aging Routine: Scientifically Proven Ingredients",
      excerpt: "Which natural ingredients have demonstrated their effectiveness in clinical studies for combating signs of skin aging?",
      category: "Skin Care",
      image: "https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?auto=format&fit=crop&q=80&w=800&h=600",
      date: "May 20, 2023",
      readTime: "5 min read",
      categoryId: "skincare"
    },
    {
      id: "5",
      title: "Whey Protein: Myths and Facts for Muscle Recovery",
      excerpt: "An analysis of recent scientific studies on whey protein effectiveness and its comparison with other protein sources.",
      category: "Supplements",
      image: "https://images.unsplash.com/photo-1579722818383-7f95de578c48?auto=format&fit=crop&q=80&w=800&h=600",
      date: "May 15, 2023",
      readTime: "6 min read",
      categoryId: "supplements"
    },
    {
      id: "6",
      title: "Hyaluronic Acid: How to Choose the Right Product for Your Skin",
      excerpt: "Complete guide on different molecular weights of hyaluronic acid, their effects on different skin layers, and how to integrate them into your routine.",
      category: "Skin Care",
      image: "https://images.unsplash.com/photo-1556228841-a3c527ebefe5?auto=format&fit=crop&q=80&w=800&h=600",
      date: "May 10, 2023",
      readTime: "7 min read",
      categoryId: "skincare"
    },
    {
      id: "7",
      title: "Keratin and Biotin: Comparative Analysis for Stronger Hair",
      excerpt: "Discover which is the better option between keratin and biotin according to current science to strengthen your hair and stimulate its growth.",
      category: "Hair Health",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800&h=600",
      date: "May 5, 2023",
      readTime: "8 min read",
      categoryId: "haircare"
    },
    {
      id: "8",
      title: "Mindfulness Meditation: Measurable Effects on Chronic Stress",
      excerpt: "Review of scientific studies measuring the impact of regular meditation on biological markers of stress and quality of life.",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800&h=600",
      date: "May 1, 2023",
      readTime: "5 min read",
      categoryId: "wellness"
    },
    {
      id: "9",
      title: "Melatonin: Actual Effectiveness for Improving Sleep by Age",
      excerpt: "Analysis of optimal melatonin dosages according to age and type of sleep disorders, based on the latest clinical studies.",
      category: "Sleep",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800&h=600",
      date: "April 28, 2023",
      readTime: "6 min read",
      categoryId: "sleep"
    },
    {
      id: "10",
      title: "Adaptogens: Which Plants for Which Type of Stress?",
      excerpt: "Comparative guide of different adaptogenic plants (ashwagandha, rhodiola, ginseng) and their specific effectiveness according to stress types.",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=80&w=800&h=600",
      date: "April 25, 2023",
      readTime: "7 min read",
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
              Our Articles
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Explore our collection of science-based articles to understand 
              the facts behind natural health trends.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-natural-200 hover:bg-natural-50"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
              >
                <Search className="h-4 w-4" />
                Search
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-natural-200 hover:bg-natural-50"
                onClick={clearFilters}
                disabled={!selectedCategory && !searchTerm}
              >
                <X className="h-4 w-4" />
                Clear filters
              </Button>
            </div>
            
            {/* Search Form */}
            {isSearchVisible && (
              <div className="mt-6 max-w-md mx-auto slide-up">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    type="search"
                    placeholder="Search for an article..."
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
                  <h2 className="font-display text-xl font-medium">Categories</h2>
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
                  <span className="text-sm text-muted-foreground">Active filters:</span>
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
                      Search: {searchTerm} <X className="ml-1 h-3 w-3" />
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
                  <p className="text-muted-foreground">No articles found with the selected filters.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={clearFilters}
                  >
                    Reset filters
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
