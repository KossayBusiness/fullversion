
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Article } from "./types";
import { BookOpen, ArrowRight, Filter, BookOpenCheck, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ReadingHistoryProps {
  articles: Article[];
}

const ReadingHistory = ({ articles }: ReadingHistoryProps) => {
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();
  
  const filteredArticles = filter === "all" 
    ? articles 
    : articles.filter(article => article.category === filter);
  
  const categories = ["Nutrition", "Bien-être", "Digestion", "Sommeil"];
  
  const handleFilterChange = (category: string) => {
    setFilter(category === filter ? "all" : category);
    toast({
      title: `Filtrage par ${category === filter ? "toutes catégories" : category}`,
      description: "Votre historique a été filtré"
    });
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-white/80 shadow-sm">
              <BookOpenCheck className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <CardTitle>Historique de lectures</CardTitle>
              <CardDescription>Retrouvez tous les articles que vous avez consultés</CardDescription>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="soft" size="sm" className="gap-1">
              <Filter className="h-3 w-3" />
              <span>Filtres</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <div className="px-4 py-2 bg-slate-50 flex items-center gap-2 overflow-x-auto">
        <Badge 
          variant={filter === "all" ? "natural" : "outline"} 
          className="cursor-pointer"
          onClick={() => handleFilterChange("all")}
        >
          Tous
        </Badge>
        {categories.map(category => (
          <Badge
            key={category}
            variant={filter === category ? "natural" : "outline"}
            className="cursor-pointer"
            onClick={() => handleFilterChange(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      
      <CardContent className="pt-4">
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Article</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead className="hidden md:table-cell">Date de lecture</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map((article) => (
                <TableRow key={article.id} className="hover:bg-muted/5 group">
                  <TableCell className="font-medium group-hover:text-teal-700 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="hidden md:flex p-1 rounded-full bg-teal-50">
                        <BookOpen className="h-3 w-3 text-teal-600" />
                      </div>
                      {article.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="teal" className="text-xs">{article.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {article.date}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      asChild 
                      className="gap-1 group-hover:bg-teal-50 group-hover:text-teal-700"
                    >
                      <Link to={`/article/${article.id}`}>
                        <span>Relire</span>
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            variant="gradient" 
            className="gap-2 shadow-md"
            onClick={() => toast({
              title: "Historique complet",
              description: "Tous vos articles lus sont en cours de chargement"
            })}
          >
            <span>Voir mon historique complet</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingHistory;
