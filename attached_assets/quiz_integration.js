/**
 * Intégration du système de recommandation au quiz nutritionnel
 * Ce fichier connecte l'algorithme de recommandation aux réponses du quiz
 * et génère l'interface utilisateur pour afficher les résultats
 */

// Importer le système de recommandation
const RecommendationSystem = require('./recommendation_algorithm.js');

// Initialiser le système de recommandation
const recommender = new RecommendationSystem();

/**
 * Classe principale pour l'intégration du système de recommandation
 */
class NutritionRecommender {
  constructor() {
    this.quizResponses = {
      symptomes: [],
      objectifs: [],
      alimentation: "",
      activitePhysique: "",
      qualiteSommeil: "",
      niveauStress: "",
      consommationViande: "",
      consommationPoisson: "",
      fruitsLegumes: ""
    };
    
    // Initialiser les écouteurs d'événements une fois le DOM chargé
    document.addEventListener('DOMContentLoaded', () => this.initEventListeners());
  }
  
  /**
   * Initialise les écouteurs d'événements pour le quiz
   */
  initEventListeners() {
    // Écouteur pour le bouton "Voir mes résultats"
    const resultsButton = document.querySelector('button:contains("Voir mes résultats")');
    if (resultsButton) {
      resultsButton.addEventListener('click', () => this.processQuizResponses());
    }
    
    // Écouteurs pour les cases à cocher des symptômes
    this.initSymptomListeners();
    
    // Écouteurs pour les cases à cocher des objectifs
    this.initObjectiveListeners();
    
    // Écouteurs pour les options de régime alimentaire
    this.initDietListeners();
    
    // Écouteurs pour les options d'activité physique
    this.initActivityListeners();
    
    // Écouteurs pour les options de qualité du sommeil
    this.initSleepListeners();
    
    // Écouteurs pour les options de niveau de stress
    this.initStressListeners();
    
    // Écouteurs pour les options de consommation de viande
    this.initMeatConsumptionListeners();
    
    // Écouteurs pour les options de consommation de poisson
    this.initFishConsumptionListeners();
    
    // Écouteurs pour les options de consommation de fruits et légumes
    this.initFruitVegListeners();
  }
  
  /**
   * Initialise les écouteurs pour les symptômes
   */
  initSymptomListeners() {
    const symptomCheckboxes = document.querySelectorAll('.symptomes-section input[type="checkbox"]');
    symptomCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const symptom = e.target.nextElementSibling.textContent;
        if (e.target.checked) {
          this.quizResponses.symptomes.push(symptom);
        } else {
          const index = this.quizResponses.symptomes.indexOf(symptom);
          if (index !== -1) {
            this.quizResponses.symptomes.splice(index, 1);
          }
        }
      });
    });
  }
  
  /**
   * Initialise les écouteurs pour les objectifs
   */
  initObjectiveListeners() {
    const objectiveCheckboxes = document.querySelectorAll('.objectifs-section input[type="checkbox"]');
    objectiveCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const objective = e.target.nextElementSibling.textContent;
        if (e.target.checked) {
          this.quizResponses.objectifs.push(objective);
        } else {
          const index = this.quizResponses.objectifs.indexOf(objective);
          if (index !== -1) {
            this.quizResponses.objectifs.splice(index, 1);
          }
        }
      });
    });
  }
  
  /**
   * Initialise les écouteurs pour le régime alimentaire
   */
  initDietListeners() {
    const dietRadios = document.querySelectorAll('.alimentation-section input[type="radio"]');
    dietRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.quizResponses.alimentation = e.target.nextElementSibling.textContent;
        }
      });
    });
  }
  
  /**
   * Initialise les écouteurs pour l'activité physique
   */
  initActivityListeners() {
    const activityRadios = document.querySelectorAll('.activite-physique-section input[type="radio"]');
    activityRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.quizResponses.activitePhysique = e.target.nextElementSibling.textContent;
        }
      });
    });
  }
  
  /**
   * Initialise les écouteurs pour la qualité du sommeil
   */
  initSleepListeners() {
    const sleepRadios = document.querySelectorAll('.sommeil-section input[type="radio"]');
    sleepRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.quizResponses.qualiteSommeil = e.target.nextElementSibling.textContent;
        }
      });
    });
  }
  
  /**
   * Initialise les écouteurs pour le niveau de stress
   */
  initStressListeners() {
    const stressRadios = document.querySelectorAll('.stress-section input[type="radio"]');
    stressRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.quizResponses.niveauStress = e.target.nextElementSibling.textContent;
        }
      });
    });
  }
  
  /**
   * Initialise les écouteurs pour la consommation de viande
   */
  initMeatConsumptionListeners() {
    const meatRadios = document.querySelectorAll('.viande-section input[type="radio"]');
    meatRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.quizResponses.consommationViande = e.target.nextElementSibling.textContent;
        }
      });
    });
  }
  
  /**
   * Initialise les écouteurs pour la consommation de poisson
   */
  initFishConsumptionListeners() {
    const fishRadios = document.querySelectorAll('.poisson-section input[type="radio"]');
    fishRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.quizResponses.consommationPoisson = e.target.nextElementSibling.textContent;
        }
      });
    });
  }
  
  /**
   * Initialise les écouteurs pour la consommation de fruits et légumes
   */
  initFruitVegListeners() {
    const fruitVegRadios = document.querySelectorAll('.fruits-legumes-section input[type="radio"]');
    fruitVegRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.quizResponses.fruitsLegumes = e.target.nextElementSibling.textContent;
        }
      });
    });
  }
  
  /**
   * Traite les réponses du quiz et génère les recommandations
   */
  processQuizResponses() {
    // Récupérer toutes les réponses du quiz
    this.collectAllResponses();
    
    // Générer les recommandations
    const recommendations = recommender.getRecommendations(this.quizResponses);
    
    // Afficher les résultats
    this.displayResults(recommendations);
  }
  
  /**
   * Collecte toutes les réponses du quiz à partir du DOM
   */
  collectAllResponses() {
    // Symptômes
    this.quizResponses.symptomes = [];
    document.querySelectorAll('.symptomes-section input[type="checkbox"]:checked').forEach(checkbox => {
      this.quizResponses.symptomes.push(checkbox.nextElementSibling.textContent);
    });
    
    // Objectifs
    this.quizResponses.objectifs = [];
    document.querySelectorAll('.objectifs-section input[type="checkbox"]:checked').forEach(checkbox => {
      this.quizResponses.objectifs.push(checkbox.nextElementSibling.textContent);
    });
    
    // Alimentation
    const dietRadio = document.querySelector('.alimentation-section input[type="radio"]:checked');
    if (dietRadio) {
      this.quizResponses.alimentation = dietRadio.nextElementSibling.textContent;
    }
    
    // Activité physique
    const activityRadio = document.querySelector('.activite-physique-section input[type="radio"]:checked');
    if (activityRadio) {
      this.quizResponses.activitePhysique = activityRadio.nextElementSibling.textContent;
    }
    
    // Qualité du sommeil
    const sleepRadio = document.querySelector('.sommeil-section input[type="radio"]:checked');
    if (sleepRadio) {
      this.quizResponses.qualiteSommeil = sleepRadio.nextElementSibling.textContent;
    }
    
    // Niveau de stress
    const stressRadio = document.querySelector('.stress-section input[type="radio"]:checked');
    if (stressRadio) {
      this.quizResponses.niveauStress = stressRadio.nextElementSibling.textContent;
    }
    
    // Consommation de viande
    const meatRadio = document.querySelector('.viande-section input[type="radio"]:checked');
    if (meatRadio) {
      this.quizResponses.consommationViande = meatRadio.nextElementSibling.textContent;
    }
    
    // Consommation de poisson
    const fishRadio = document.querySelector('.poisson-section input[type="radio"]:checked');
    if (fishRadio) {
      this.quizResponses.consommationPoisson = fishRadio.nextElementSibling.textContent;
    }
    
    // Consommation de fruits et légumes
    const fruitVegRadio = document.querySelector('.fruits-legumes-section input[type="radio"]:checked');
    if (fruitVegRadio) {
      this.quizResponses.fruitsLegumes = fruitVegRadio.nextElementSibling.textContent;
    }
  }
  
  /**
   * Affiche les résultats des recommandations
   * @param {Array} recommendations - Liste des recommandations générées
   */
  displayResults(recommendations) {
    // Créer le conteneur principal des résultats
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'results-container';
    
    // Ajouter le titre
    const title = document.createElement('h2');
    title.textContent = 'Vos Recommandations Personnalisées';
    resultsContainer.appendChild(title);
    
    // Ajouter la description
    const description = document.createElement('p');
    description.textContent = 'Basé sur vos réponses, voici les compléments alimentaires naturels qui pourraient vous aider :';
    resultsContainer.appendChild(description);
    
    // Ajouter les symptômes identifiés
    const symptomsSection = document.createElement('div');
    symptomsSection.className = 'symptoms-section';
    
    const symptomsTitle = document.createElement('h3');
    symptomsTitle.textContent = 'Symptômes identifiés :';
    symptomsSection.appendChild(symptomsTitle);
    
    const symptomsList = document.createElement('ul');
    this.quizResponses.symptomes.forEach(symptom => {
      const item = document.createElement('li');
      item.textContent = symptom;
      symptomsList.appendChild(item);
    });
    symptomsSection.appendChild(symptomsList);
    resultsContainer.appendChild(symptomsSection);
    
    // Ajouter les objectifs identifiés
    const objectivesSection = document.createElement('div');
    objectivesSection.className = 'objectives-section';
    
    const objectivesTitle = document.createElement('h3');
    objectivesTitle.textContent = 'Objectifs identifiés :';
    objectivesSection.appendChild(objectivesTitle);
    
    const objectivesList = document.createElement('ul');
    this.quizResponses.objectifs.forEach(objective => {
      const item = document.createElement('li');
      item.textContent = objective;
      objectivesList.appendChild(item);
    });
    objectivesSection.appendChild(objectivesList);
    resultsContainer.appendChild(objectivesSection);
    
    // Ajouter les recommandations principales
    const mainRecommendationsSection = document.createElement('div');
    mainRecommendationsSection.className = 'main-recommendations-section';
    
    const mainRecommendationsTitle = document.createElement('h3');
    mainRecommendationsTitle.textContent = 'Recommandations principales :';
    mainRecommendationsSection.appendChild(mainRecommendationsTitle);
    
    // Filtrer les recommandations principales
    const mainRecommendations = recommendations.filter(rec => rec.isPrimary);
    
    mainRecommendations.forEach(rec => {
      const recCard = this.createRecommendationCard(rec);
      mainRecommendationsSection.appendChild(recCard);
    });
    
    resultsContainer.appendChild(mainRecommendationsSection);
    
    // Ajouter les recommandations secondaires
    const secondaryRecommendationsSection = document.createElement('div');
    secondaryRecommendationsSection.className = 'secondary-recommendations-section';
    
    const secondaryRecommendationsTitle = document.createElement('h3');
    secondaryRecommendationsTitle.textContent = 'Recommandations complémentaires :';
    secondaryRecommendationsSection.appendChild(secondaryRecommendationsTitle);
    
    // Filtrer les recommandations secondaires
    const secondaryRecommendations = recommendations.filter(rec => !rec.isPrimary);
    
    secondaryRecommendations.forEach(rec => {
      const recCard = this.createRecommendationCard(rec);
      secondaryRecommendationsSection.appendChild(recCard);
    });
    
    resultsContainer.appendChild(secondaryRecommendationsSection);
    
    // Ajouter une note importante
    const disclaimer = document.createElement('div');
    disclaimer.className = 'disclaimer';
    disclaimer.innerHTML = '<p><strong>Note importante :</strong> Ces recommandations sont fournies à titre informatif uniquement et ne remplacent pas l\'avis d\'un professionnel de santé. Consultez votre médecin avant de commencer tout complément alimentaire, surtout si vous avez des conditions médicales préexistantes ou prenez des médicaments.</p>';
    resultsContainer.appendChild(disclaimer);
    
    // Remplacer le contenu actuel par les résultats
    document.body.innerHTML = '';
    document.body.appendChild(resultsContainer);
    
    // Ajouter les styles CSS pour les résultats
    this.addResultsStyles();
  }
  
  /**
   * Crée une carte de recommandation
   * @param {Object} recommendation - Données de la recommandation
   * @return {HTMLElement} - Élément de carte de recommandation
   */
  createRecommendationCard(recommendation) {
    const card = document.createElement('div');
    card.className = 'recommendation-card';
    
    // En-tête de la carte
    const header = document.createElement('div');
    header.className = 'card-header';
    
    const name = document.createElement('h4');
    name.textContent = recommendation.name;
    header.appendChild(name);
    
    const category = document.createElement('span');
    category.className = 'category';
    category.textContent = recommendation.category;
    header.appendChild(category);
    
    card.appendChild(header);
    
    // Corps de la carte
    const body = document.createElement('div');
    body.className = 'card-body';
    
    // Efficacité
    const efficacy = document.createElement('div');
    efficacy.className = 'efficacy';
    
    const efficacyLabel = document.createElement('span');
    efficacyLabel.textContent = 'Efficacité : ';
    efficacy.appendChild(efficacyLabel);
    
    const efficacyValue = document.createElement('span');
    efficacyValue.className = 'efficacy-value';
    efficacyValue.textContent = `${recommendation.efficacyPercentage}%`;
    efficacy.appendChild(efficacyValue);
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    
    const progress = document.createElement('div');
    progress.className = 'progress';
    progress.style.width = `${recommendation.efficacyPercentage}%`;
    progressBar.appendChild(progress);
    
    efficacy.appendChild(progressBar);
    body.appendChild(efficacy);
    
    // Bénéfices
    const benefits = document.createElement('div');
    benefits.className = 'benefits';
    
    const benefitsTitle = document.createElement('h5');
    benefitsTitle.textContent = 'Bénéfices :';
    benefits.appendChild(benefitsTitle);
    
    const benefitsList = document.createElement('ul');
    recommendation.benefits.forEach(benefit => {
      const item = document.createElement('li');
      item.textContent = benefit;
      benefitsList.appendChild(item);
    });
    benefits.appendChild(benefitsList);
    body.appendChild(benefits);
    
    // Dosage
    const dosage = document.createElement('div');
    dosage.className = 'dosage';
    
    const dosageTitle = document.createElement('h5');
    dosageTitle.textContent = 'Dosage recommandé :';
    dosage.appendChild(dosageTitle);
    
    const dosageValue = document.createElement('p');
    dosageValue.textContent = recommendation.dosage;
    dosage.appendChild(dosageValue);
    body.appendChild(dosage);
    
    // Sources naturelles
    const sources = document.createElement('div');
    sources.className = 'sources';
    
    const sourcesTitle = document.createElement('h5');
    sourcesTitle.textContent = 'Sources naturelles :';
    sources.appendChild(sourcesTitle);
    
    const sourcesValue = document.createElement('p');
    sourcesValue.textContent = recommendation.naturalSources;
    sources.appendChild(sourcesValue);
    body.appendChild(sources);
    
    // Délai d'efficacité
    const timeToEffect = document.createElement('div');
    timeToEffect.className = 'time-to-effect';
    
    const timeToEffectTitle = document.createElement('h5');
    timeToEffectTitle.textContent = 'Délai d\'efficacité :';
    timeToEffect.appendChild(timeToEffectTitle);
    
    const timeToEffectValue = document.createElement('p');
    timeToEffectValue.textContent = recommendation.timeToEffect;
    timeToEffect.appendChild(timeToEffectValue);
    body.appendChild(timeToEffect);
    
    // Précautions
    if (recommendation.cautions) {
      const cautions = document.createElement('div');
      cautions.className = 'cautions';
      
      const cautionsTitle = document.createElement('h5');
      cautionsTitle.textContent = 'Précautions :';
      cautions.appendChild(cautionsTitle);
      
      const cautionsValue = document.createElement('p');
      cautionsValue.textContent = recommendation.cautions;
      cautions.appendChild(cautionsValue);
      body.appendChild(cautions);
    }
    
    card.appendChild(body);
    
    return card;
  }
  
  /**
   * Ajoute les styles CSS pour la page de résultats
   */
  addResultsStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .results-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        font-family: 'Arial', sans-serif;
      }
      
      h2 {
        color: #2c3e50;
        text-align: center;
        margin-bottom: 1.5rem;
        font-size: 2.2rem;
      }
      
      h3 {
        color: #3498db;
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-size: 1.8rem;
        border-bottom: 2px solid #ecf0f1;
        padding-bottom: 0.5rem;
      }
      
      p {
        color: #7f8c8d;
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }
      
      .symptoms-section, .objectives-section {
        background-color: #f9f9f9;
        padding: 1.5rem;
        border-radius: 8px;
        margin-bottom: 2rem;
      }
      
      ul {
        list-style-type: none;
        padding-left: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
      }
      
      .symptoms-section li, .objectives-section li {
        background-color: #3498db;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
      }
      
      .main-recommendations-section, .secondary-recommendations-section {
        margin-bottom: 3rem;
      }
      
      .recommendation-card {
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;
        overflow: hidden;
      }
      
      .card-header {
        background-color: #2c3e50;
        color: white;
        padding: 1.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .card-header h4 {
        margin: 0;
        font-size: 1.4rem;
      }
      
      .category {
        background-color: #3498db;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
      }
      
      .card-body {
        padding: 1.5rem;
      }
      
      .efficacy {
        margin-bottom: 1.5rem;
      }
      
      .efficacy-value {
        font-weight: bold;
        color: #2c3e50;
      }
      
      .progress-bar {
        height: 10px;
        background-color: #ecf0f1;
        border-radius: 5px;
        margin-top: 0.5rem;
        overflow: hidden;
      }
      
      .progress {
        height: 100%;
        background-color: #2ecc71;
        border-radius: 5px;
      }
      
      .benefits, .dosage, .sources, .time-to-effect, .cautions {
        margin-bottom: 1.2rem;
      }
      
      .benefits h5, .dosage h5, .sources h5, .time-to-effect h5, .cautions h5 {
        color: #2c3e50;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
      }
      
      .benefits ul {
        display: block;
      }
      
      .benefits li {
        margin-bottom: 0.5rem;
        position: relative;
        padding-left: 1.5rem;
      }
      
      .benefits li:before {
        content: "✓";
        color: #2ecc71;
        position: absolute;
        left: 0;
        font-weight: bold;
      }
      
      .disclaimer {
        background-color: #fef9e7;
        padding: 1.5rem;
        border-radius: 8px;
        border-left: 4px solid #f39c12;
      }
      
      .disclaimer p {
        margin: 0;
        color: #7f8c8d;
      }
      
      @media (max-width: 768px) {
        .results-container {
          padding: 1rem;
        }
        
        h2 {
          font-size: 1.8rem;
        }
        
        h3 {
          font-size: 1.5rem;
        }
        
        .card-header {
          flex-direction: column;
          align-items: flex-start;
        }
        
        .category {
          margin-top: 0.5rem;
        }
      }
    `;
    
    document.head.appendChild(styleElement);
  }
}

// Initialiser le système de recommandation
const nutritionRecommender = new NutritionRecommender();

// Exporter pour utilisation externe
window.nutritionRecommender = nutritionRecommender;
