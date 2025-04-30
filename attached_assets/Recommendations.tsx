import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Recommendation } from "./types";
import { Sparkles, ArrowRight, Heart, Brain, Beaker, Leaf, Pill } from "lucide-react";

interface RecommendationsProps {
  recommendations: Recommendation[];
}

// Function to get an icon based on the category
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "supplements":
      return <Pill className="h-4 w-4 text-purple-500" />;
    case "wellness":
      return <Heart className="h-4 w-4 text-rose-500" />;
    case "nutrition":
      return <Leaf className="h-4 w-4 text-emerald-500" />;
    default:
      return <Beaker className="h-4 w-4 text-blue-500" />;
  }
};

// Function to get a badge color based on the category
const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "supplements":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "wellness":
      return "bg-rose-100 text-rose-700 border-rose-200";
    case "nutrition":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    default:
      return "bg-blue-100 text-blue-700 border-blue-200";
  }
};

const Recommendations = ({ recommendations }: RecommendationsProps) => {
  // Current month in English
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
  const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  return (
    <Card className="border shadow-lg overflow-hidden bg-gradient-to-b from-white to-natural-50/30">
      <CardHeader className="bg-gradient-to-r from-natural-100 to-natural-50 border-b border-natural-200">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-natural-500/10">
            <Sparkles className="h-5 w-5 text-natural-600" />
          </div>
          <CardTitle className="text-natural-800 font-display">Personalized Recommendations</CardTitle>
        </div>
        <CardDescription className="text-natural-600">
          Special suggestions for you in {capitalizedMonth}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec) => (
            <div 
              key={rec.id} 
              className="bg-white border border-natural-100 rounded-xl p-5 hover:shadow-lg transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 hover:border-natural-300"
            >
              <Badge className={`mb-3 self-start flex items-center gap-1.5 font-medium ${getCategoryColor(rec.category)}`}>
                {getCategoryIcon(rec.category)}
                <span>{rec.category}</span>
              </Badge>
              <h3 className="font-medium text-lg mb-2 text-natural-800">{rec.title}</h3>
              <p className="text-sm text-natural-600 mb-4 line-clamp-2">
                Based on your profile and current goals.
              </p>
              <Button variant="outline" size="sm" asChild className="w-full group mt-auto border-natural-200 hover:bg-natural-50 hover:border-natural-300">
                <Link to={`/article/${rec.id}`} className="flex items-center justify-center gap-2">
                  <span>Discover</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          ))}
          
          {/* Custom card of the month */}
          <div className="bg-gradient-to-br from-natural-100 to-natural-50 border border-natural-200 rounded-xl p-5 flex flex-col h-full shadow-sm">
            <Badge className="mb-3 self-start bg-white text-natural-700 border-natural-300 font-medium">
              Special {capitalizedMonth}
            </Badge>
            <h3 className="font-display text-lg mb-2 text-natural-800">
              Your Nutritional Assessment
            </h3>
            <ul className="text-sm text-natural-700 space-y-1 mb-4 flex-grow list-disc list-inside">
              <li>Deficiency status</li>
              <li>Dietary balance</li>
              <li>Customized recommendations</li>
            </ul>
            <Button size="sm" className="bg-natural-600 hover:bg-natural-700 text-white w-full">
              View my assessment
            </Button>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button className="gap-2 bg-natural-600 hover:bg-natural-700 text-white px-6">
            <span>View all recommendations</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Recommendations;
