/**
 * Algorithme de recommandation nutritionnelle en TypeScript
 * Ce système analyse les réponses au quiz et recommande les compléments alimentaires
 * les plus adaptés aux besoins spécifiques de l'utilisateur
 */

// Importer la base de données des compléments
import complementsDatabase from './database_complements';

// Interfaces pour le typage
interface QuizResponses {
  symptomes: string[];
  objectifs: string[];
  alimentation: string;
  activitePhysique: string;
  qualiteSommeil: string;
  niveauStress: string;
  consommationViande: string;
  consommationPoisson: string;
  fruitsLegumes: string;
}

interface Recommendation {
  rank: number;
  name: string;
  category: string;
  efficacyPercentage: number;
  dosage: string;
  benefits: string[];
  naturalSources: string;
  timeToEffect: string;
  cautions?: string;
  isPrimary: boolean;
}

interface ScoredComplement {
  name: string;
  score: number;
  data: any;
}

/**
 * Système de scoring et de recommandation
 */
class RecommendationSystem {
  private sectionWeights: Record<string, number>;
  private symptomWeights: Record<string, number>;
  private objectiveWeights: Record<string, number>;
  private dietAdjustments: Record<string, Record<string, number>>;
  private activityAdjustments: Record<string, Record<string, number>>;
  private sleepAdjustments: Record<string, Record<string, number>>;
  private stressAdjustments: Record<string, Record<string, number>>;
  private fruitVegAdjustments: Record<string, Record<string, number>>;

  constructor() {
    // Poids des différentes sections du quiz
    this.sectionWeights = {
      symptomes: 0.35,      // 35% - Les symptômes sont prioritaires
      objectifs: 0.30,      // 30% - Les objectifs sont presque aussi importants
      alimentation: 0.15,   // 15% - Le régime alimentaire influence les recommandations
      modeDeVie: 0.12,      // 12% - Le mode de vie est important mais moins prioritaire
      proteines: 0.08       // 8% - La consommation de protéines est complémentaire
    };
    
    // Poids des symptômes (certains symptômes sont plus graves/prioritaires que d'autres)
    this.symptomWeights = {
      "Fatigue": 0.9,
      "Troubles du sommeil": 0.85,
      "Stress/Anxiété": 0.8,
      "Problèmes digestifs": 0.75,
      "Douleurs articulaires": 0.7,
      "Problèmes de peau": 0.65,
      "Maux de tête": 0.8,
      "Sautes d'humeur": 0.6,
      "Fringales": 0.5,
      "Manque de concentration": 0.75,
      "Sensibilité au froid": 0.6,
      "Cheveux/Ongles fragiles": 0.55
    };
    
    // Poids des objectifs
    this.objectiveWeights = {
      "Plus d'énergie": 0.9,
      "Meilleur sommeil": 0.85,
      "Améliorer ma concentration": 0.8,
      "Renforcer mon immunité": 0.85,
      "Réduire mon stress": 0.8,
      "Soutenir ma digestion": 0.75,
      "Améliorer ma peau": 0.7,
      "Équilibrer mon poids": 0.75
    };
    
    // Facteurs d'ajustement selon le régime alimentaire
    this.dietAdjustments = {
      "Omnivore": {
        "Vitamine B12": 0,
        "Fer": 0,
        "Oméga-3 (EPA/DHA)": 0
      },
      "Flexitarien": {
        "Vitamine B12": 0.1,
        "Fer": 0.1,
        "Oméga-3 (EPA/DHA)": 0.1
      },
      "Pescetarien": {
        "Vitamine B12": 0.2,
        "Fer": 0.3,
        "Oméga-3 (EPA/DHA)": 0
      },
      "Végétarien": {
        "Vitamine B12": 0.6,
        "Fer": 0.5,
        "Oméga-3 (EPA/DHA)": 0.6
      },
      "Végan": {
        "Vitamine B12": 1.0,
        "Fer": 0.7,
        "Oméga-3 d'origine végétale (ALA)": 0.8,
        "Vitamine D3 naturelle": 0.5
      }
    };
    
    // Facteurs d'ajustement selon l'activité physique
    this.activityAdjustments = {
      "Quotidiennement": {
        "Magnésium marin": 0.3,
        "Complexe Vitamine B": 0.2,
        "Coenzyme Q10": 0.3
      },
      "2-3 fois par semaine": {
        "Magnésium marin": 0.2,
        "Complexe Vitamine B": 0.1,
        "Coenzyme Q10": 0.2
      },
      "Quelques fois par mois": {
        "Magnésium marin": 0.1,
        "Complexe Vitamine B": 0.05,
        "Coenzyme Q10": 0.1
      },
      "Rarement ou jamais": {
        "Magnésium marin": 0,
        "Complexe Vitamine B": 0,
        "Coenzyme Q10": 0
      }
    };
    
    // Facteurs d'ajustement selon la qualité du sommeil
    this.sleepAdjustments = {
      "Excellent - Je me réveille frais et dispos": {
        "Mélatonine naturelle": -0.5,
        "Valériane": -0.5,
        "Magnésium marin": -0.2
      },
      "Bon - Quelques difficultés occasionnelles": {
        "Mélatonine naturelle": 0,
        "Valériane": 0,
        "Magnésium marin": 0
      },
      "Moyen - Difficultés fréquentes (endormissement, réveils)": {
        "Mélatonine naturelle": 0.3,
        "Valériane": 0.3,
        "Magnésium marin": 0.2
      },
      "Mauvais - Problèmes chroniques de sommeil": {
        "Mélatonine naturelle": 0.6,
        "Valériane": 0.6,
        "Magnésium marin": 0.4
      }
    };
    
    // Facteurs d'ajustement selon le niveau de stress
    this.stressAdjustments = {
      "Faible - Je me sens généralement détendu": {
        "Ashwagandha": -0.3,
        "Rhodiola Rosea": -0.3,
        "Magnésium marin": -0.2
      },
      "Modéré - Stress occasionnel": {
        "Ashwagandha": 0.1,
        "Rhodiola Rosea": 0.1,
        "Magnésium marin": 0.1
      },
      "Élevé - Stress fréquent": {
        "Ashwagandha": 0.4,
        "Rhodiola Rosea": 0.4,
        "Magnésium marin": 0.3
      },
      "Sévère - Stress chronique": {
        "Ashwagandha": 0.7,
        "Rhodiola Rosea": 0.7,
        "Magnésium marin": 0.5
      }
    };
    
    // Facteurs d'ajustement selon la consommation de fruits et légumes
    this.fruitVegAdjustments = {
      "0 à 1 portion": {
        "Vitamine C naturelle": 0.5,
        "Fibres prébiotiques": 0.5,
        "Complexe Vitamine B": 0.3
      },
      "2 à 3 portions": {
        "Vitamine C naturelle": 0.3,
        "Fibres prébiotiques": 0.3,
        "Complexe Vitamine B": 0.2
      },
      "4 à 5 portions": {
        "Vitamine C naturelle": 0.1,
        "Fibres prébiotiques": 0.1,
        "Complexe Vitamine B": 0.1
      },
      "6 portions ou plus": {
        "Vitamine C naturelle": 0,
        "Fibres prébiotiques": 0,
        "Complexe Vitamine B": 0
      }
    };
  }

  /**
   * Calcule les scores pour tous les compléments en fonction des réponses au quiz
   * @param {QuizResponses} quizResponses - Les réponses de l'utilisateur au quiz
   * @return {ScoredComplement[]} - Liste des compléments recommandés avec leurs scores
   */
  private calculateScores(quizResponses: QuizResponses): ScoredComplement[] {
    const scores: Record<string, number> = {};
    
    // Initialiser les scores pour tous les compléments
    for (const complement in complementsDatabase) {
      scores[complement] = 0;
    }
    
    // 1. Analyser les symptômes sélectionnés
    if (quizResponses.symptomes && quizResponses.symptomes.length > 0) {
      this._processSymptoms(quizResponses.symptomes, scores);
    }
    
    // 2. Analyser les objectifs sélectionnés
    if (quizResponses.objectifs && quizResponses.objectifs.length > 0) {
      this._processObjectives(quizResponses.objectifs, scores);
    }
    
    // 3. Ajuster selon le régime alimentaire
    if (quizResponses.alimentation) {
      this._adjustForDiet(quizResponses.alimentation, scores);
    }
    
    // 4. Ajuster selon l'activité physique
    if (quizResponses.activitePhysique) {
      this._adjustForActivity(quizResponses.activitePhysique, scores);
    }
    
    // 5. Ajuster selon la qualité du sommeil
    if (quizResponses.qualiteSommeil) {
      this._adjustForSleep(quizResponses.qualiteSommeil, scores);
    }
    
    // 6. Ajuster selon le niveau de stress
    if (quizResponses.niveauStress) {
      this._adjustForStress(quizResponses.niveauStress, scores);
    }
    
    // 7. Ajuster selon la consommation de fruits et légumes
    if (quizResponses.fruitsLegumes) {
      this._adjustForFruitVeg(quizResponses.fruitsLegumes, scores);
    }
    
    // 8. Vérifier la compatibilité avec le régime alimentaire
    this._checkDietCompatibility(quizResponses.alimentation, scores);
    
    // Convertir les scores en tableau et trier
    const sortedRecommendations = Object.entries(scores)
      .map(([name, score]) => ({
        name,
        score,
        data: complementsDatabase[name]
      }))
      .filter(item => item.score > 0) // Éliminer les scores négatifs ou nuls
      .sort((a, b) => b.score - a.score); // Trier par score décroissant
    
    return sortedRecommendations;
  }
  
  /**
   * Traite les symptômes sélectionnés et met à jour les scores
   * @private
   */
  private _processSymptoms(selectedSymptoms: string[], scores: Record<string, number>): void {
    for (const symptom of selectedSymptoms) {
      const symptomWeight = this.symptomWeights[symptom] || 0.5; // Poids par défaut si non défini
      
      // Parcourir tous les compléments
      for (const complement in complementsDatabase) {
        const complementData = complementsDatabase[complement];
        
        // Si le complément cible ce symptôme
        if (complementData.symptomes && complementData.symptomes.includes(symptom)) {
          // Calculer le score basé sur le poids du symptôme, l'efficacité du complément et le poids de la section
          const scoreIncrement = symptomWeight * (complementData.efficacite / 100) * this.sectionWeights.symptomes;
          scores[complement] += scoreIncrement;
        }
      }
    }
  }
  
  /**
   * Traite les objectifs sélectionnés et met à jour les scores
   * @private
   */
  private _processObjectives(selectedObjectives: string[], scores: Record<string, number>): void {
    for (const objective of selectedObjectives) {
      const objectiveWeight = this.objectiveWeights[objective] || 0.5; // Poids par défaut si non défini
      
      // Parcourir tous les compléments
      for (const complement in complementsDatabase) {
        const complementData = complementsDatabase[complement];
        
        // Si le complément correspond à cet objectif
        if (complementData.objectifs && complementData.objectifs.includes(objective)) {
          // Calculer le score basé sur le poids de l'objectif, l'efficacité du complément et le poids de la section
          const scoreIncrement = objectiveWeight * (complementData.efficacite / 100) * this.sectionWeights.objectifs;
          scores[complement] += scoreIncrement;
        }
      }
    }
  }
  
  /**
   * Ajuste les scores en fonction du régime alimentaire
   * @private
   */
  private _adjustForDiet(diet: string, scores: Record<string, number>): void {
    if (this.dietAdjustments[diet]) {
      const adjustments = this.dietAdjustments[diet];
      
      for (const complement in adjustments) {
        if (scores[complement] !== undefined) {
          scores[complement] += adjustments[complement] * this.sectionWeights.alimentation;
        }
      }
    }
  }
  
  /**
   * Ajuste les scores en fonction de l'activité physique
   * @private
   */
  private _adjustForActivity(activity: string, scores: Record<string, number>): void {
    if (this.activityAdjustments[activity]) {
      const adjustments = this.activityAdjustments[activity];
      
      for (const complement in adjustments) {
        if (scores[complement] !== undefined) {
          scores[complement] += adjustments[complement] * this.sectionWeights.modeDeVie;
        }
      }
    }
  }
  
  /**
   * Ajuste les scores en fonction de la qualité du sommeil
   * @private
   */
  private _adjustForSleep(sleepQuality: string, scores: Record<string, number>): void {
    if (this.sleepAdjustments[sleepQuality]) {
      const adjustments = this.sleepAdjustments[sleepQuality];
      
      for (const complement in adjustments) {
        if (scores[complement] !== undefined) {
          scores[complement] += adjustments[complement] * this.sectionWeights.modeDeVie;
        }
      }
    }
  }
  
  /**
   * Ajuste les scores en fonction du niveau de stress
   * @private
   */
  private _adjustForStress(stressLevel: string, scores: Record<string, number>): void {
    if (this.stressAdjustments[stressLevel]) {
      const adjustments = this.stressAdjustments[stressLevel];
      
      for (const complement in adjustments) {
        if (scores[complement] !== undefined) {
          scores[complement] += adjustments[complement] * this.sectionWeights.modeDeVie;
        }
      }
    }
  }
  
  /**
   * Ajuste les scores en fonction de la consommation de fruits et légumes
   * @private
   */
  private _adjustForFruitVeg(fruitVegConsumption: string, scores: Record<string, number>): void {
    if (this.fruitVegAdjustments[fruitVegConsumption]) {
      const adjustments = this.fruitVegAdjustments[fruitVegConsumption];
      
      for (const complement in adjustments) {
        if (scores[complement] !== undefined) {
          scores[complement] += adjustments[complement] * this.sectionWeights.proteines;
        }
      }
    }
  }
  
  /**
   * Vérifie la compatibilité des compléments avec le régime alimentaire
   * @private
   */
  private _checkDietCompatibility(diet: string, scores: Record<string, number>): void {
    for (const complement in complementsDatabase) {
      const complementData = complementsDatabase[complement];
      
      // Si le complément n'est pas compatible avec le régime alimentaire, réduire fortement son score
      if (complementData.regime_alimentaire && !complementData.regime_alimentaire.includes(diet)) {
        scores[complement] = 0; // Éliminer ce complément des recommandations
      }
    }
  }
  
  /**
   * Génère les recommandations finales basées sur les scores calculés
   * @param {ScoredComplement[]} sortedScores - Scores triés des compléments
   * @param {number} limit - Nombre de recommandations à retourner
   * @return {Recommendation[]} - Recommandations finales avec détails
   */
  private generateRecommendations(sortedScores: ScoredComplement[], limit: number = 5): Recommendation[] {
    // Prendre les 'limit' premiers compléments
    const topRecommendations = sortedScores.slice(0, limit);
    
    // Normaliser les scores pour obtenir des pourcentages d'efficacité
    const maxScore = topRecommendations[0]?.score || 1;
    
    return topRecommendations.map((item, index) => {
      const normalizedScore = Math.round((item.score / maxScore) * 100);
      
      return {
        rank: index + 1,
        name: item.name,
        category: item.data.categorie,
        efficacyPercentage: normalizedScore,
        dosage: item.data.dosage,
        benefits: item.data.benefices,
        naturalSources: item.data.sources_naturelles,
        timeToEffect: item.data.delai_efficacite,
        cautions: item.data.contre_indications,
        isPrimary: index < 3 // Les 3 premiers sont considérés comme principaux
      };
    });
  }
  
  /**
   * Fonction principale pour obtenir les recommandations
   * @param {QuizResponses} quizResponses - Les réponses de l'utilisateur au quiz
   * @return {Recommendation[]} - Recommandations finales
   */
  public getRecommendations(quizResponses: QuizResponses): Recommendation[] {
    const scores = this.calculateScores(quizResponses);
    return this.generateRecommendations(scores, 5); // Top 5 recommandations
  }
}

// Exporter le système de recommandation
export default RecommendationSystem;
