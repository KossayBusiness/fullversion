/**
 * Styles CSS adaptés au design de NaturalPure Academy
 * pour la page de recommandations nutritionnelles
 */

const naturalPureStyles = `
  /* Styles généraux */
  body {
    font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #5e3bee 0%, #3b5fe2 100%);
    color: #333;
    line-height: 1.6;
  }

  .results-container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  /* En-tête */
  .header {
    text-align: center;
    margin-bottom: 40px;
  }

  .header h2 {
    color: #5e3bee;
    font-size: 2.5rem;
    margin-bottom: 15px;
    font-weight: 700;
  }

  .header p {
    color: #666;
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .lab-badge {
    display: inline-block;
    background-color: #f0f0ff;
    color: #5e3bee;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    margin-bottom: 20px;
    border: 1px solid #d8d8ff;
  }

  .lab-badge i {
    margin-right: 5px;
  }

  /* Sections de résumé */
  .summary-section {
    background-color: #f9f7ff;
    padding: 25px;
    border-radius: 12px;
    margin-bottom: 30px;
    border-left: 4px solid #5e3bee;
  }

  .summary-section h3 {
    color: #5e3bee;
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 15px;
  }

  .tag {
    background-color: #5e3bee;
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    display: inline-block;
  }

  /* Statistiques */
  .stats-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 30px 0;
    gap: 20px;
  }

  .stat-item {
    background-color: #f0f0ff;
    padding: 15px 25px;
    border-radius: 10px;
    text-align: center;
    flex: 1;
    min-width: 200px;
  }

  .stat-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: #5e3bee;
    margin-bottom: 5px;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #666;
  }

  /* Recommandations */
  .recommendations-section {
    margin-bottom: 40px;
  }

  .recommendations-section h3 {
    color: #5e3bee;
    font-size: 1.8rem;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #f0f0ff;
  }

  .recommendation-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 25px;
  }

  .recommendation-card {
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .recommendation-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    padding: 20px;
    position: relative;
  }

  .primary-recommendation .card-header {
    background: linear-gradient(135deg, #5e3bee 0%, #3b5fe2 100%);
    color: white;
  }

  .secondary-recommendation .card-header {
    background: linear-gradient(135deg, #f9a826 0%, #ff7854 100%);
    color: white;
  }

  .card-header h4 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 600;
  }

  .category {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 0.8rem;
  }

  .card-body {
    padding: 25px;
  }

  .efficacy {
    margin-bottom: 25px;
  }

  .efficacy-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .efficacy-label {
    font-weight: 500;
    color: #666;
  }

  .efficacy-value {
    font-weight: 700;
    color: #5e3bee;
    font-size: 1.2rem;
  }

  .progress-bar {
    height: 10px;
    background-color: #f0f0ff;
    border-radius: 5px;
    overflow: hidden;
  }

  .primary-recommendation .progress {
    background: linear-gradient(90deg, #5e3bee 0%, #3b5fe2 100%);
  }

  .secondary-recommendation .progress {
    background: linear-gradient(90deg, #f9a826 0%, #ff7854 100%);
  }

  .progress {
    height: 100%;
    border-radius: 5px;
  }

  .section-title {
    font-size: 1.1rem;
    color: #5e3bee;
    margin: 20px 0 10px 0;
    font-weight: 600;
  }

  .benefits-list {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }

  .benefits-list li {
    padding: 8px 0 8px 25px;
    position: relative;
    border-bottom: 1px solid #f0f0ff;
  }

  .benefits-list li:last-child {
    border-bottom: none;
  }

  .benefits-list li:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #5e3bee;
    font-weight: bold;
  }

  .info-row {
    display: flex;
    margin-bottom: 15px;
  }

  .info-label {
    flex: 1;
    font-weight: 500;
    color: #666;
  }

  .info-value {
    flex: 2;
    color: #333;
  }

  .cautions {
    background-color: #fff8e6;
    padding: 15px;
    border-radius: 8px;
    border-left: 3px solid #f9a826;
    margin-top: 20px;
    font-size: 0.9rem;
  }

  .cautions-title {
    color: #f9a826;
    font-weight: 600;
    margin-bottom: 5px;
  }

  /* Disclaimer */
  .disclaimer {
    background-color: #f0f0ff;
    padding: 20px;
    border-radius: 10px;
    margin-top: 40px;
    font-size: 0.9rem;
    color: #666;
    border-left: 4px solid #5e3bee;
  }

  .disclaimer strong {
    color: #5e3bee;
  }

  /* Bouton de retour au quiz */
  .back-button {
    display: inline-block;
    background: linear-gradient(135deg, #5e3bee 0%, #3b5fe2 100%);
    color: white;
    padding: 12px 25px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    margin-top: 30px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 5px 15px rgba(94, 59, 238, 0.3);
    text-align: center;
  }

  .back-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(94, 59, 238, 0.4);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .results-container {
      padding: 20px;
      margin: 20px;
    }

    .header h2 {
      font-size: 2rem;
    }

    .recommendation-cards {
      grid-template-columns: 1fr;
    }

    .stat-item {
      min-width: 140px;
    }
  }
`;

/**
 * Fonction pour générer l'interface utilisateur des recommandations
 * adaptée au design de NaturalPure Academy
 */
function generateNaturalPureRecommendationsUI(recommendations, quizResponses) {
  // Créer le conteneur principal
  const container = document.createElement('div');
  container.className = 'results-container';

  // Ajouter l'en-tête
  const header = document.createElement('div');
  header.className = 'header';

  const labBadge = document.createElement('div');
  labBadge.className = 'lab-badge';
  labBadge.innerHTML = '<i class="fas fa-flask"></i> Laboratoire Indépendant';
  header.appendChild(labBadge);

  const title = document.createElement('h2');
  title.textContent = 'Vos Recommandations Personnalisées';
  header.appendChild(title);

  const description = document.createElement('p');
  description.textContent = 'Basé sur l\'analyse scientifique de vos réponses, voici les compléments alimentaires naturels qui correspondent le mieux à vos besoins spécifiques.';
  header.appendChild(description);

  container.appendChild(header);

  // Ajouter les statistiques
  const statsContainer = document.createElement('div');
  statsContainer.className = 'stats-container';

  // Stat 1: Nombre de symptômes analysés
  const symptomsStat = document.createElement('div');
  symptomsStat.className = 'stat-item';
  const symptomsValue = document.createElement('div');
  symptomsValue.className = 'stat-value';
  symptomsValue.textContent = quizResponses.symptomes.length;
  const symptomsLabel = document.createElement('div');
  symptomsLabel.className = 'stat-label';
  symptomsLabel.textContent = 'Symptômes analysés';
  symptomsStat.appendChild(symptomsValue);
  symptomsStat.appendChild(symptomsLabel);
  statsContainer.appendChild(symptomsStat);

  // Stat 2: Efficacité moyenne
  const efficacyStat = document.createElement('div');
  efficacyStat.className = 'stat-item';
  const efficacyValue = document.createElement('div');
  efficacyValue.className = 'stat-value';
  const avgEfficacy = recommendations.reduce((sum, rec) => sum + rec.efficacyPercentage, 0) / recommendations.length;
  efficacyValue.textContent = Math.round(avgEfficacy) + '%';
  const efficacyLabel = document.createElement('div');
  efficacyLabel.className = 'stat-label';
  efficacyLabel.textContent = 'Efficacité moyenne';
  efficacyStat.appendChild(efficacyValue);
  efficacyStat.appendChild(efficacyLabel);
  statsContainer.appendChild(efficacyStat);

  // Stat 3: Compléments recommandés
  const complementsStat = document.createElement('div');
  complementsStat.className = 'stat-item';
  const complementsValue = document.createElement('div');
  complementsValue.className = 'stat-value';
  complementsValue.textContent = recommendations.length;
  const complementsLabel = document.createElement('div');
  complementsLabel.className = 'stat-label';
  complementsLabel.textContent = 'Compléments recommandés';
  complementsStat.appendChild(complementsValue);
  complementsStat.appendChild(complementsLabel);
  statsContainer.appendChild(complementsStat);

  container.appendChild(statsContainer);

  // Ajouter la section de résumé des symptômes
  if (quizResponses.symptomes && quizResponses.symptomes.length > 0) {
    const symptomsSection = document.createElement('div');
    symptomsSection.className = 'summary-section';
    
    const symptomsTitle = document.createElement('h3');
    symptomsTitle.textContent = 'Symptômes identifiés';
    symptomsSection.appendChild(symptomsTitle);
    
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tags-container';
    
    quizResponses.symptomes.forEach(symptom => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = symptom;
      tagsContainer.appendChild(tag);
    });
    
    symptomsSection.appendChild(tagsContainer);
    container.appendChild(symptomsSection);
  }

  // Ajouter la section de résumé des objectifs
  if (quizResponses.objectifs && quizResponses.objectifs.length > 0) {
    const objectivesSection = document.createElement('div');
    objectivesSection.className = 'summary-section';
    
    const objectivesTitle = document.createElement('h3');
    objectivesTitle.textContent = 'Objectifs de santé';
    objectivesSection.appendChild(objectivesTitle);
    
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tags-container';
    
    quizResponses.objectifs.forEach(objective => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = objective;
      tagsContainer.appendChild(tag);
    });
    
    objectivesSection.appendChild(tagsContainer);
    container.appendChild(objectivesSection);
  }

  // Ajouter les recommandations principales
  const mainRecommendationsSection = document.createElement('div');
  mainRecommendationsSection.className = 'recommendations-section';
  
  const mainRecommendationsTitle = document.createElement('h3');
  mainRecommendationsTitle.textContent = 'Recommandations principales';
  mainRecommendationsSection.appendChild(mainRecommendationsTitle);
  
  const mainRecommendationsCards = document.createElement('div');
  mainRecommendationsCards.className = 'recommendation-cards';
  
  // Filtrer les recommandations principales
  const mainRecommendations = recommendations.filter(rec => rec.isPrimary);
  
  mainRecommendations.forEach(rec => {
    const card = createRecommendationCard(rec, true);
    mainRecommendationsCards.appendChild(card);
  });
  
  mainRecommendationsSection.appendChild(mainRecommendationsCards);
  container.appendChild(mainRecommendationsSection);

  // Ajouter les recommandations secondaires
  const secondaryRecommendationsSection = document.createElement('div');
  secondaryRecommendationsSection.className = 'recommendations-section';
  
  const secondaryRecommendationsTitle = document.createElement('h3');
  secondaryRecommendationsTitle.textContent = 'Recommandations complémentaires';
  secondaryRecommendationsSection.appendChild(secondaryRecommendationsTitle);
  
  const secondaryRecommendationsCards = document.createElement('div');
  secondaryRecommendationsCards.className = 'recommendation-cards';
  
  // Filtrer les recommandations secondaires
  const secondaryRecommendations = recommendations.filter(rec => !rec.isPrimary);
  
  secondaryRecommendations.forEach(rec => {
    const card = createRecommendationCard(rec, false);
    secondaryRecommendationsCards.appendChild(card);
  });
  
  secondaryRecommendationsSection.appendChild(secondaryRecommendationsCards);
  container.appendChild(secondaryRecommendationsSection);

  // Ajouter le disclaimer
  const disclaimer = document.createElement('div');
  disclaimer.className = 'disclaimer';
  disclaimer.innerHTML = '<strong>Note importante :</strong> Ces recommandations sont fournies à titre informatif uniquement et ne remplacent pas l\'avis d\'un professionnel de santé. Consultez votre médecin avant de commencer tout complément alimentaire, surtout si vous avez des conditions médicales préexistantes ou prenez des médicaments.';
  container.appendChild(disclaimer);

  // Ajouter le bouton de retour au quiz
  const backButton = document.createElement('a');
  backButton.href = '/quiz';
  backButton.className = 'back-button';
  backButton.textContent = 'Retour au Quiz';
  container.appendChild(backButton);

  // Ajouter les styles CSS
  const styleElement = document.createElement('style');
  styleElement.textContent = naturalPureStyles;
  document.head.appendChild(styleElement);

  return container;
}

/**
 * Fonction pour créer une carte de recommandation
 */
function createRecommendationCard(recommendation, isPrimary) {
  const card = document.createElement('div');
  card.className = isPrimary ? 'recommendation-card primary-recommendation' : 'recommendation-card secondary-recommendation';
  
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
  
  const efficacyHeader = document.createElement('div');
  efficacyHeader.className = 'efficacy-header';
  
  const efficacyLabel = document.createElement('span');
  efficacyLabel.className = 'efficacy-label';
  efficacyLabel.textContent = 'Efficacité';
  efficacyHeader.appendChild(efficacyLabel);
  
  const efficacyValue = document.createElement('span');
  efficacyValue.className = 'efficacy-value';
  efficacyValue.textContent = `${recommendation.efficacyPercentage}%`;
  efficacyHeader.appendChild(efficacyValue);
  
  efficacy.appendChild(efficacyHeader);
  
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  
  const progress = document.createElement('div');
  progress.className = 'progress';
  progress.style.width = `${recommendation.efficacyPercentage}%`;
  progressBar.appendChild(progress);
  
  efficacy.appendChild(progressBar);
  body.appendChild(efficacy);
  
  // Bénéfices
  const benefitsTitle = document.createElement('div');
  benefitsTitle.className = 'section-title';
  benefitsTitle.textContent = 'Bénéfices';
  body.appendChild(benefitsTitle);
  
  const benefitsList = document.createElement('ul');
  benefitsList.className = 'benefits-list';
  recommendation.benefits.forEach(benefit => {
    const item = document.createElement('li');
    item.textContent = benefit;
    benefitsList.appendChild(item);
  });
  body.appendChild(benefitsList);
  
  // Dosage
  const dosageTitle = document.createElement('div');
  dosageTitle.className = 'section-title';
  dosageTitle.textContent = 'Dosage recommandé';
  body.appendChild(dosageTitle);
  
  const dosageRow = document.createElement('div');
  dosageRow.className = 'info-row';
  const dosageValue = document.createElement('div');
  dosageValue.className = 'info-value';
  dosageValue.textContent = recommendation.dosage;
  dosageRow.appendChild(dosageValue);
  body.appendChild(dosageRow);
  
  // Sources naturelles
  const sourcesTitle = document.createElement('div');
  sourcesTitle.className = 'section-title';
  sourcesTitle.textContent = 'Sources naturelles';
  body.appendChild(sourcesTitle);
  
  const sourcesRow = document.createElement('div');
  sourcesRow.className = 'info-row';
  const sourcesValue = document.createElement('div');
  sourcesValue.className = 'info-value';
  sourcesValue.textContent = recommendation.naturalSources;
  sourcesRow.appendChild(sourcesValue);
  body.appendChild(sourcesRow);
  
  // Délai d'efficacité
  const timeTitle = document.createElement('div');
  timeTitle.className = 'section-title';
  timeTitle.textContent = 'Délai d\'efficacité';
  body.appendChild(timeTitle);
  
  const timeRow = document.createElement('div');
  timeRow.className = 'info-row';
  const timeValue = document.createElement('div');
  timeValue.className = 'info-value';
  timeValue.textContent = recommendation.timeToEffect;
  timeRow.appendChild(timeValue);
  body.appendChild(timeRow);
  
  // Précautions
  if (recommendation.cautions) {
    const cautions = document.createElement('div');
    cautions.className = 'cautions';
    
    const cautionsTitle = document.createElement('div');
    cautionsTitle.className = 'cautions-title';
    cautionsTitle.textContent = 'Précautions';
    cautions.appendChild(cautionsTitle);
    
    const cautionsText = document.createElement('p');
    cautionsText.textContent = recommendation.cautions;
    cautions.appendChild(cautionsText);
    
    body.appendChild(cautions);
  }
  
  card.appendChild(body);
  
  return card;
}

// Remplacer la fonction d'affichage des résultats dans quiz_integration.js
function displayResults(recommendations, quizResponses) {
  // Utiliser la nouvelle fonction d'interface utilisateur adaptée au design NaturalPure
  const resultsContainer = generateNaturalPureRecommendationsUI(recommendations, quizResponses);
  
  // Remplacer le contenu actuel par les résultats
  document.body.innerHTML = '';
  document.body.appendChild(resultsContainer);
}
