/**
 * Script de test pour le système de recommandation nutritionnelle
 * Ce fichier permet de tester l'algorithme avec différents profils d'utilisateurs
 */

// Importer le système de recommandation
const RecommendationSystem = require('./recommendation_algorithm.js');

// Initialiser le système de recommandation
const recommender = new RecommendationSystem();

// Profils de test pour simuler différents utilisateurs
const testProfiles = [
  {
    name: "Profil 1: Fatigue et stress",
    quizResponses: {
      symptomes: ["Fatigue", "Stress/Anxiété", "Troubles du sommeil"],
      objectifs: ["Plus d'énergie", "Réduire mon stress", "Meilleur sommeil"],
      alimentation: "Omnivore (je mange de tout)",
      activitePhysique: "Quelques fois par mois",
      qualiteSommeil: "Moyen - Difficultés fréquentes (endormissement, réveils)",
      niveauStress: "Élevé - Stress fréquent",
      consommationViande: "Plusieurs fois par semaine",
      consommationPoisson: "Quelques fois par mois",
      fruitsLegumes: "2 à 3 portions"
    }
  },
  {
    name: "Profil 2: Problèmes digestifs et peau",
    quizResponses: {
      symptomes: ["Problèmes digestifs", "Problèmes de peau", "Fringales"],
      objectifs: ["Soutenir ma digestion", "Améliorer ma peau", "Équilibrer mon poids"],
      alimentation: "Flexitarien (je limite ma consommation de viande)",
      activitePhysique: "2-3 fois par semaine",
      qualiteSommeil: "Bon - Quelques difficultés occasionnelles",
      niveauStress: "Modéré - Stress occasionnel",
      consommationViande: "Quelques fois par mois",
      consommationPoisson: "Plusieurs fois par semaine",
      fruitsLegumes: "4 à 5 portions"
    }
  },
  {
    name: "Profil 3: Végétarien avec problèmes de concentration",
    quizResponses: {
      symptomes: ["Manque de concentration", "Fatigue", "Sensibilité au froid"],
      objectifs: ["Améliorer ma concentration", "Plus d'énergie", "Renforcer mon immunité"],
      alimentation: "Végétarien (pas de viande ni poisson)",
      activitePhysique: "Quotidiennement",
      qualiteSommeil: "Excellent - Je me réveille frais et dispos",
      niveauStress: "Faible - Je me sens généralement détendu",