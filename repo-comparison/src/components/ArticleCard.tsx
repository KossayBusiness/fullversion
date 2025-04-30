
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  className?: string;
}

const ArticleCard = ({
  id,
  title,
  excerpt,
  category,
  image,
  date,
  readTime,
  className
}: ArticleCardProps) => {
  return (
    <Link to={`/article/${id}`} className={cn(
      "group block overflow-hidden rounded-lg glass transition-all duration-300 hover:shadow-lg",
      className
    )}>
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <Badge className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-natural-700 hover:bg-white/90">
          {category}
        </Badge>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-center text-xs text-muted-foreground space-x-4">
          <span className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            {date}
          </span>
          <span className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {readTime}
          </span>
        </div>
        <h3 className="font-display text-lg font-medium leading-tight group-hover:text-natural-700 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {excerpt}
        </p>
        <div className="pt-2 flex items-center text-sm font-medium text-natural-600 group-hover:text-natural-700 transition-colors">
          Lire l'article
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
