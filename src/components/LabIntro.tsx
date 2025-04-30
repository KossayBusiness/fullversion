
import React from 'react';
import { Link } from 'react-router-dom';
import { MoveRight, Sparkles, Microscope, Leaf, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";

const LabIntro = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 fade-in">
            <div className="inline-block px-3 py-1 bg-natural-100 text-natural-700 rounded-full text-sm font-medium mb-2">
              Laboratoire de Recherche
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
              La science au service de votre bien-être naturel
            </h2>
            <p className="text-lg text-muted-foreground">
              Natural&Pure est un laboratoire de recherche dédié à l'exploration scientifique des approches naturelles pour la santé et le bien-être. 
              Notre mission est de démystifier la science derrière les compléments alimentaires, les soins de la peau, et plus encore.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Button className="group bg-gradient-to-r from-natural-500 to-natural-600 hover:from-natural-600 hover:to-natural-700" asChild>
                <Link to="/articles">
                  Découvrir nos articles
                  <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" className="border-natural-200 hover:bg-natural-50" asChild>
                <Link to="/about">
                  À propos du laboratoire
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-4">
              <div className="glass rounded-lg p-6 slide-up delay-100">
                <Sparkles className="h-10 w-10 text-natural-500 mb-4" />
                <h3 className="font-display text-lg font-medium mb-2">Recherche Innovante</h3>
                <p className="text-sm text-muted-foreground">
                  Des analyses scientifiques rigoureuses pour des solutions naturelles efficaces.
                </p>
              </div>
              <div className="glass rounded-lg p-6 slide-up delay-300">
                <BookOpen className="h-10 w-10 text-natural-500 mb-4" />
                <h3 className="font-display text-lg font-medium mb-2">Vulgarisation Scientifique</h3>
                <p className="text-sm text-muted-foreground">
                  Des informations complexes rendues accessibles à tous.
                </p>
              </div>
            </div>
            <div className="grid gap-4 mt-8">
              <div className="glass rounded-lg p-6 slide-up delay-200">
                <Microscope className="h-10 w-10 text-natural-500 mb-4" />
                <h3 className="font-display text-lg font-medium mb-2">Analyse Critique</h3>
                <p className="text-sm text-muted-foreground">
                  Évaluation objective des tendances et produits actuels.
                </p>
              </div>
              <div className="glass rounded-lg p-6 slide-up delay-400">
                <Leaf className="h-10 w-10 text-natural-500 mb-4" />
                <h3 className="font-display text-lg font-medium mb-2">Approche Holistique</h3>
                <p className="text-sm text-muted-foreground">
                  Une vision globale de la santé intégrant corps et esprit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabIntro;
