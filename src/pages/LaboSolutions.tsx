
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Beaker, Search, Dna, Microscope, 
  ChevronRight, ArrowUpRight, GraduationCap, BookOpen 
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import HeroSection from '@/components/labo/HeroSection';
import HealthConditions from '@/components/labo/HealthConditions';
import NaturalSolutionsCards from '@/components/labo/NaturalSolutionsCards';
import ScientificInsights from '@/components/labo/ScientificInsights';

const LaboSolutions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    // To simulate initial data loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Additional search logic if needed
  };

  // Handle newsletter subscription
  const handleSubscribe = async () => {
    if (!emailInput || !emailInput.includes('@')) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate a registration request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Registration successful!",
        description: "You will soon receive our latest discoveries and solutions.",
      });
      setEmailInput('');
    } catch (error) {
      toast({
        title: "Registration error",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle health condition selection
  const handleSelectCondition = (condition: string) => {
    console.log(`Selected condition: ${condition}`);
    // Additional logic if needed
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection onSearch={handleSearch} />

        {/* Introduction and Explore by condition */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-16">
              <div className="text-center mb-10">
                <Badge variant="purple" className="mb-3">Our approach</Badge>
                <h2 className="text-3xl font-medium text-slate-800 mb-4">
                  Scientific solutions for your well-being
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Our laboratory develops science-based natural formulas, rigorously tested 
                  and optimized to effectively address your health concerns.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
                  <div className="w-14 h-14 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <Microscope className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-medium text-slate-800 mb-2">Clinically tested</h3>
                  <p className="text-sm text-slate-600">All our formulas are validated by independent clinical studies to ensure their effectiveness</p>
                </div>
                
                <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
                  <div className="w-14 h-14 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <Dna className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-medium text-slate-800 mb-2">Optimal bioavailability</h3>
                  <p className="text-sm text-slate-600">We use the most absorbable and effective forms of each nutrient</p>
                </div>
                
                <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
                  <div className="w-14 h-14 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <Beaker className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-medium text-slate-800 mb-2">Active synergy</h3>
                  <p className="text-sm text-slate-600">Our formulas combine active ingredients that work synergistically for optimal results</p>
                </div>
              </div>
            </div>
            
            {/* Exploration by condition */}
            <div className="max-w-6xl mx-auto">
              <HealthConditions onSelectCondition={handleSelectCondition} />
            </div>
          </div>
        </section>

        {/* Our natural solutions */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <NaturalSolutionsCards />
            </div>
          </div>
        </section>
        
        {/* Scientific studies section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <ScientificInsights />
            </div>
          </div>
        </section>
        
        {/* Newsletter and FAQ */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Newsletter */}
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl p-8 text-white shadow-lg mb-16">
                <div className="text-center mb-6">
                  <Beaker className="h-10 w-10 mx-auto mb-4 text-indigo-200" />
                  <h3 className="text-2xl font-medium mb-2">Receive our latest discoveries</h3>
                  <p className="text-indigo-100 max-w-lg mx-auto">
                    Sign up to receive advance access to our scientific publications and nutrition discoveries.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="bg-white/20 text-white placeholder:text-indigo-200 border-indigo-300"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                  <Button 
                    className="bg-white text-indigo-700 hover:bg-indigo-50"
                    onClick={handleSubscribe}
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Subscribe"}
                  </Button>
                </div>
              </div>
              
              {/* FAQ Section */}
              <div className="text-center mb-10">
                <Badge variant="purple" className="mb-3">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  FAQ
                </Badge>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">Frequently Asked Questions</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    q: "How are your formulas tested?", 
                    a: "Our formulas undergo independent laboratory testing and clinical studies to ensure their effectiveness and safety. Each formulation goes through in vitro tests followed by clinical trials on volunteers."
                  },
                  { 
                    q: "What are your ingredient selection criteria?", 
                    a: "We select only natural ingredients with optimal active concentration, sourced from sustainable and ethical sources. We prioritize organic ingredients whenever possible."
                  },
                  { 
                    q: "How do you guarantee the quality of your products?", 
                    a: "Each production batch is tested for purity, active ingredient concentration, and absence of contaminants. We use advanced analytical methods to control quality."
                  }
                ].map((faq, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg p-6 border border-slate-200 hover:border-indigo-200 hover:shadow-sm transition-all"
                    onClick={() => {
                      toast({
                        title: "Answer expanded",
                        description: "View the answer to your question."
                      });
                    }}
                  >
                    <h3 className="font-medium text-slate-800 mb-3 flex items-center">
                      <BookOpen className="h-5 w-5 text-indigo-500 mr-3" />
                      {faq.q}
                    </h3>
                    <p className="text-slate-600 pl-8">{faq.a}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button variant="purple">
                  View all questions
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTIuNWEuNS41IDAgMDAtLjUtLjVoLTd2LTJoLTV2Mmgtd2EuNS41IDAgMDAtLjUuNVYyOGgydi02aDE0djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
          
          {/* Decorative circles */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20">
                Proven solutions
              </Badge>
              <h2 className="text-3xl md:text-4xl font-medium mb-4">
                Supplements that truly make a difference
              </h2>
              <p className="text-indigo-100 mb-8">
                Discover our scientifically validated formulas to address your specific health and wellness needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50">
                  Discover our solutions
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/40 hover:bg-white/10">
                  View our studies
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LaboSolutions;
