
import React from 'react';
import { Container } from '@/components/ui/container';
import { Filter, SlidersHorizontal, BookOpen } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import ResearchPublications from '@/components/ResearchPublications';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEOHead from '@/components/SEOHead';
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArticleCard } from "@/components/ArticleCard";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

// Mock data for the articles
const articles = [
  {
    id: "1",
    title: "The Impact of Vitamin D on Immune Function",
    excerpt: "Recent research reveals how adequate vitamin D levels can modulate immune response and improve resistance to infections.",
    image: "/placeholder.svg",
    category: "Nutrition",
    date: "April 15, 2023",
    readTime: "8 min read",
    author: "Dr. Sarah Johnson"
  },
  {
    id: "2",
    title: "Understanding Gut Microbiome's Role in Mental Health",
    excerpt: "The gut-brain axis and how the balance of intestinal bacteria affects mood, anxiety and cognitive function.",
    image: "/placeholder.svg",
    category: "Research",
    date: "March 22, 2023",
    readTime: "12 min read",
    author: "Dr. Michael Chen"
  },
  {
    id: "3",
    title: "Circadian Rhythm Optimization for Better Sleep",
    excerpt: "Scientific strategies to align your daily habits with your body's natural clock for improved sleep quality.",
    image: "/placeholder.svg",
    category: "Wellness",
    date: "February 10, 2023",
    readTime: "10 min read",
    author: "Prof. Elena Rodriguez"
  },
  {
    id: "4",
    title: "Anti-inflammatory Properties of Turmeric",
    excerpt: "Clinical evidence supporting curcumin's effectiveness in reducing inflammation and oxidative stress.",
    image: "/placeholder.svg",
    category: "Supplements",
    date: "January 28, 2023",
    readTime: "7 min read",
    author: "Dr. James Wilson"
  },
  {
    id: "5",
    title: "Dietary Approaches to Managing Stress",
    excerpt: "How specific nutrients and eating patterns can help regulate cortisol levels and improve stress resilience.",
    image: "/placeholder.svg",
    category: "Nutrition",
    date: "January 5, 2023",
    readTime: "9 min read",
    author: "Dr. Emily Brooks"
  },
  {
    id: "6",
    title: "The Science of Intermittent Fasting",
    excerpt: "Metabolic benefits and potential health outcomes of various intermittent fasting protocols.",
    image: "/placeholder.svg",
    category: "Research",
    date: "December 12, 2022",
    readTime: "11 min read",
    author: "Prof. David Keller"
  }
];

// Categories for filtering
const categories = ["All", "Nutrition", "Research", "Wellness", "Supplements"];

const ScientificLibrary = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter articles based on search term and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHead
        title={t('Scientific Library - Natural Pure Academy')}
        description={t('Explore peer-reviewed scientific publications and research by Natural Pure Academy on nutrition, health, and micronutrients.')}
        keywords={t('scientific research, nutrition studies, health publications, micronutrients research')}
      />

      <section className="py-12 bg-white">
        <Container>
          <Breadcrumbs 
            items={[
              { label: t('Home'), path: '/' },
              { label: t('Scientific Library'), path: '/scientific-library' }
            ]} 
          />

          <div className="max-w-4xl mx-auto mb-12 text-center">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-indigo-100 text-indigo-800 hover:bg-indigo-200/80 mb-2">
              <BookOpen className="h-3 w-3 mr-1" />
              {t('Non-Profit Research')}
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              {t('Scientific Library')}
            </h1>
            <p className="text-slate-600">
              {t('Explore our scientific publications and research findings. All content is provided for educational purposes only.')}
            </p>
            <div className="mt-4 inline-flex items-center justify-center bg-natural-50 text-natural-800 px-4 py-2 rounded-full text-sm font-medium">
              <Filter className="h-4 w-4 mr-2" />
              {t('Scientific content only - No product sales')}
            </div>
          </div>
        </Container>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold mb-2 text-primary">Scientific Library</h1>
          <p className="text-xl text-muted-foreground">
            Evidence-based articles and research insights for your health journey
          </p>
        </motion.div>

        <div className="mb-8">
          <FeaturedArticle 
            title="Latest Research: Micronutrient Synergies for Optimal Immune Function"
            excerpt="Our new study reveals how specific combinations of vitamins and minerals can enhance immune cell activity more effectively than individual supplements."
            image="/placeholder.svg"
            link="/article/featured"
            category="Research"
            date="April 18, 2023"
            author="Research Team"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative w-full md:w-2/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <Badge 
                key={category} 
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <Tabs defaultValue="latest" className="mb-8">
          <TabsList>
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="popular">Most Read</TabsTrigger>
            <TabsTrigger value="featured">Editor's Picks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="latest" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <ArticleCard 
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  image={article.image}
                  category={article.category}
                  date={article.date}
                  readTime={article.readTime}
                  author={article.author}
                  link={`/article/${article.id}`}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="popular" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Reordered articles to simulate "most popular" */}
              {[...filteredArticles]
                .sort((a, b) => parseInt(a.id) < parseInt(b.id) ? 1 : -1)
                .map(article => (
                  <ArticleCard 
                    key={article.id}
                    title={article.title}
                    excerpt={article.excerpt}
                    image={article.image}
                    category={article.category}
                    date={article.date}
                    readTime={article.readTime}
                    author={article.author}
                    link={`/article/${article.id}`}
                  />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Filter to show only first 3 articles as "featured" */}
              {filteredArticles.slice(0, 3).map(article => (
                <ArticleCard 
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  image={article.image}
                  category={article.category}
                  date={article.date}
                  readTime={article.readTime}
                  author={article.author}
                  link={`/article/${article.id}`}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-10">
          <Button variant="outline">Load More Articles</Button>
        </div>
      </div>

      <ResearchPublications />
    </>
  );
};

export default ScientificLibrary;
