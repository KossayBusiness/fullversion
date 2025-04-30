
import { ProfileData } from "./types";

// Données fictives qui seraient normalement récupérées depuis une API/BDD
export const mockProfileData: ProfileData = {
  articles: [
    { id: 1, title: "Les bienfaits des oméga-3", date: "10 juin 2023", category: "Nutrition" },
    { id: 2, title: "Comment améliorer votre sommeil naturellement", date: "15 mai 2023", category: "Bien-être" },
    { id: 3, title: "Vitamine D: êtes-vous carencé?", date: "23 avril 2023", category: "Compléments" },
  ],
  defis: [
    { id: 1, name: "Hydratation optimale", progress: 75, days: "21/30" },
    { id: 2, name: "Alimentation anti-inflammatoire", progress: 40, days: "12/30" },
  ],
  recommendations: [
    { id: 1, title: "Les probiotiques pour la santé intestinale", category: "Compléments" },
    { id: 2, title: "5 exercices pour réduire le stress", category: "Bien-être" },
    { id: 3, title: "Magnésium: le minéral anti-stress", category: "Nutrition" },
  ]
};
