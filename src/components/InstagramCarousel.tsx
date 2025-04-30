
import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  link: string;
}

const mockPosts: InstagramPost[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1542822738-3b2886b4c444?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    caption: "🌱 Les bienfaits du magnésium pour réduire le stress et améliorer votre sommeil",
    likes: 342,
    link: "/articles"
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    caption: "🧪 Comment les antioxydants protègent vos cellules du vieillissement prématuré",
    likes: 286,
    link: "/articles"
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    caption: "🥗 5 aliments riches en oméga-3 à intégrer dans votre alimentation quotidienne",
    likes: 412,
    link: "/nutrition"
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    caption: "🧠 Découvrez les nutriments essentiels pour optimiser vos fonctions cognitives",
    likes: 268,
    link: "/articles"
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    caption: "⚡ Les superaliments à ajouter à votre smoothie pour une énergie durable",
    likes: 329,
    link: "/nutrition"
  }
];

const InstagramCarousel = () => {
  return (
    <div className="py-10 bg-gradient-to-r from-[#EAEEFF] to-[#F3FDFF] rounded-2xl">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="flex items-center mb-3">
            <Instagram className="h-5 w-5 mr-2 text-[#0A66C2]" />
            <span className="text-sm font-medium text-[#0A66C2]">@NaturalAndPure</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-medium mb-3">
            Découvrez notre contenu Instagram
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Suivez-nous pour accéder à des conseils exclusifs, des infographies pédagogiques et notre communauté de passionnés de santé naturelle.
          </p>
        </div>

        <Carousel 
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full mb-8"
        >
          <CarouselContent>
            {mockPosts.map((post) => (
              <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Card className="border-none shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative group">
                      <img 
                        src={post.imageUrl} 
                        alt={post.caption} 
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <p className="text-white text-sm line-clamp-3">{post.caption}</p>
                        <div className="flex items-center mt-2 text-white/80 text-xs">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                          {post.likes} likes
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4">
            <CarouselPrevious className="relative static xl:absolute left-0 right-auto" />
            <CarouselNext className="relative static xl:absolute left-auto right-0" />
          </div>
        </Carousel>

        <div className="text-center">
          <div className="max-w-md mx-auto mb-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
            <p className="text-sm font-medium text-primary">
              Suivez-nous pour avoir accès à du contenu exclusif et des conseils personnalisés
            </p>
          </div>
          <Button asChild className="bg-gradient-to-r from-[#0A66C2] to-[#4CAF50] hover:from-[#095fb3] hover:to-[#429a47] text-white font-medium px-8 py-6 h-auto">
            <a href="https://instagram.com/naturalandpure" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Instagram className="mr-2 h-5 w-5" />
              Suivre sur Instagram
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstagramCarousel;
