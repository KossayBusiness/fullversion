/**
 * Script de test modifié pour le système de recommandation nutritionnelle
 * Correction des incompatibilités entre les noms des régimes alimentaires
 */

// Importer le système de recommandation
const RecommendationSystem = require('./recommendation_algorithm.js');

// Initialiser le système de recommandation
const recommender = new RecommendationSystem();

// Profils de test pour simuler différents utilisateurs (avec régimes alimentaires corrigés)
const testProfiles = [
  {
    name: "Profil 1: Fatigue et stress",
    quizResponses: {
      symptomes: ["Fatigue", "Stress/Anxiété", "Troubles du sommeil"],
      objectifs: ["Plus d'énergie", "Réduire mon stress", "Meilleur sommeil"],
      alimentation: "Omnivore", // Simplifié
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
      alimentation: "Flexitarien", // Simplifié
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
      alimentation: "Végétarien", // Simplifié
      activitePhysique: "Quotidiennement",
      qualiteSommeil: "Excellent - Je me réveille frais et dispos",
      niveauStress: "Faible - Je me sens généralement détendu",
      consommationViande: "Rarement ou jamais",
      consommationPoisson: "Rarement ou jamais",
      fruitsLegumes: "6 portions ou plus"
    }
  },
  {
    name: "Profil 4: Végan avec problèmes articulaires",
    quizResponses: {
      symptomes: ["Douleurs articulaires", "Cheveux/Ongles fragiles", "Sautes d'humeur"],
      objectifs: ["Renforcer mon immunité", "Améliorer ma peau", "Réduire mon stress"],
      alimentation: "Végan", // Simplifié
      activitePhysique: "2-3 fois par semaine",
      qualiteSommeil: "Bon - Quelques difficultés occasionnelles",
      niveauStress: "Modéré - Stress occasionnel",
      consommationViande: "Rarement ou jamais",
      consommationPoisson: "Rarement ou jamais",
      fruitsLegumes: "4 à 5 portions"
    }
  },
  {
    name: "Profil 5: Sportif avec troubles du sommeil",
    quizResponses: {
      symptomes: ["Troubles du sommeil", "Douleurs articulaires", "Maux de tête"],
      objectifs: ["Meilleur sommeil", "Plus d'énergie", "Soutenir ma digestion"],
      alimentation: "Omnivore", // Simplifié
      activitePhysique: "Quotidiennement",
      qualiteSommeil: "Mauvais - Problèmes chroniques de sommeil",
      niveauStress: "Élevé - Stress fréquent",
      consommationViande: "Quotidiennement",
      consommationPoisson: "Plusieurs fois par semaine",
      fruitsLegumes: "2 à 3 portions"
    }
  }
];

// Fonction pour exécuter les tests
function runTests() {
  console.log("=== TESTS DU SYSTÈME DE RECOMMANDATION NUTRITIONNELLE ===\n");
  
  testProfiles.forEach((profile, index) => {
    console.log(`\n--- TEST ${index + 1}: ${profile.name} ---\n`);
    
    // Afficher les données du profil
    console.log("Symptômes:", profile.quizResponses.symptomes.join(", "));
    console.log("Objectifs:", profile.quizResponses.objectifs.join(", "));
    console.log("Régime alimentaire:", profile.quizResponses.alimentation);
    console.log("Activité physique:", profile.quizResponses.activitePhysique);
    console.log("Qualité du sommeil:", profile.quizResponses.qualiteSommeil);
    console.log("Niveau de stress:", profile.quizResponses.niveauStress);
    console.log("Consommation de fruits et légumes:", profile.quizResponses.fruitsLegumes);
    console.log("\n");
    
    // Générer les recommandations
    const recommendations = recommender.getRecommendations(profile.quizResponses);
    
    // Afficher les recommandations
    console.log("RECOMMANDATIONS:");
    if (recommendations.length === 0) {
      console.log("Aucune recommandation trouvée. Vérifiez les données du profil et l'algorithme.");
    } else {
      recommendations.forEach((rec, i) => {
        console.log(`\n${i + 1}. ${rec.name} (${rec.category}) - Efficacité: ${rec.efficacyPercentage}%`);
        console.log(`   Dosage: ${rec.dosage}`);
        console.log(`   Bénéfices: ${rec.benefits.join(", ")}`);
        console.log(`   Sources naturelles: ${rec.naturalSources}`);
        console.log(`   Délai d'efficacité: ${rec.timeToEffect}`);
        if (rec.cautions) {
          console.log(`   Précautions: ${rec.cautions}`);
        }
      });
    }
    
    console.log("\n--- FIN DU TEST ---\n");
    console.log("=".repeat(60));
  });
}

// Exécuter les tests
runTests();
