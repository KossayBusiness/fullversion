# Documentation Technique du Système de Recommandation Nutritionnelle

## Vue d'ensemble

Ce système de recommandation nutritionnelle analyse les réponses d'un utilisateur à un quiz et génère des recommandations personnalisées de compléments alimentaires naturels. Le système prend en compte les symptômes, les objectifs de santé, le régime alimentaire, le mode de vie et la consommation de protéines pour fournir des recommandations adaptées aux besoins spécifiques de chaque utilisateur.

## Architecture du système

Le système se compose de trois modules principaux :

1. **Base de données des compléments** (`database_complements.js`)
   - Stocke les informations sur tous les compléments alimentaires naturels
   - Contient les propriétés, bénéfices, symptômes ciblés, et compatibilité avec différents régimes

2. **Algorithme de recommandation** (`recommendation_algorithm.js`)
   - Analyse les réponses au quiz
   - Calcule des scores de pertinence pour chaque complément
   - Génère un top 5 de recommandations personnalisées

3. **Intégration au quiz** (`quiz_integration.js`)
   - Collecte les réponses de l'utilisateur
   - Connecte l'interface utilisateur à l'algorithme
   - Génère l'affichage des résultats

## Fonctionnement détaillé

### 1. Collecte des données

Le système collecte les données utilisateur à travers cinq sections du quiz :

- **Symptômes** : Problèmes de santé actuels (fatigue, stress, problèmes digestifs, etc.)
- **Alimentation** : Régime alimentaire (omnivore, flexitarien, végétarien, etc.)
- **Mode de vie** : Activité physique, qualité du sommeil, niveau de stress
- **Objectifs** : Buts de santé (énergie, sommeil, concentration, etc.)
- **Protéines** : Consommation de viande, poisson, fruits et légumes

### 2. Calcul des scores

L'algorithme attribue des scores à chaque complément en fonction des réponses, selon plusieurs facteurs :

- **Poids des sections** : Les symptômes (35%) et objectifs (30%) ont plus d'importance que l'alimentation (15%), le mode de vie (12%) et les protéines (8%)
- **Poids des symptômes** : Certains symptômes sont considérés plus prioritaires (ex: fatigue à 90%, stress à 80%)
- **Poids des objectifs** : Certains objectifs sont plus valorisés (ex: plus d'énergie à 90%, meilleur sommeil à 85%)
- **Ajustements selon le régime** : Les besoins nutritionnels varient selon le régime (ex: B12 plus importante pour les végans)
- **Ajustements selon le mode de vie** : L'activité physique, la qualité du sommeil et le niveau de stress influencent les besoins
- **Compatibilité avec le régime** : Les compléments incompatibles avec le régime de l'utilisateur sont exclus

### 3. Génération des recommandations

Après le calcul des scores, le système :

1. Trie les compléments par score décroissant
2. Sélectionne les 5 premiers (top 5)
3. Normalise les scores pour obtenir des pourcentages d'efficacité
4. Identifie les 3 recommandations principales et 2 secondaires
5. Génère une page de résultats détaillée

## Algorithme de scoring

L'algorithme utilise une approche pondérée multi-facteurs :

```
Score final = Σ (Score symptômes + Score objectifs + Ajustements régime + 
               Ajustements mode de vie + Ajustements protéines)
```

Où :
- **Score symptômes** = Σ (Poids symptôme × Efficacité complément × Poids section symptômes)
- **Score objectifs** = Σ (Poids objectif × Efficacité complément × Poids section objectifs)
- **Ajustements régime** = Facteurs spécifiques au régime alimentaire
- **Ajustements mode de vie** = Facteurs liés à l'activité, sommeil et stress
- **Ajustements protéines** = Facteurs liés à la consommation de protéines

## Structure de la base de données

Chaque complément dans la base de données contient les propriétés suivantes :

- `categorie` : Type de complément (Vitamines, Minéraux, Plantes adaptogènes, etc.)
- `benefices` : Liste des bénéfices pour la santé
- `symptomes` : Liste des symptômes ciblés
- `objectifs` : Liste des objectifs de santé associés
- `dosage` : Dosage recommandé
- `sources_naturelles` : Sources alimentaires naturelles
- `delai_efficacite` : Temps estimé avant de ressentir les effets
- `efficacite` : Score d'efficacité (0-100)
- `contre_indications` : Précautions d'emploi
- `regime_alimentaire` : Compatibilité avec différents régimes

## Interface utilisateur des résultats

L'interface de présentation des résultats comprend :

1. **Récapitulatif du profil** : Symptômes et objectifs identifiés
2. **Recommandations principales** (Top 3) : Compléments les plus pertinents
3. **Recommandations secondaires** (2 compléments) : Compléments complémentaires
4. **Détails pour chaque complément** :
   - Nom et catégorie
   - Pourcentage d'efficacité
   - Dosage recommandé
   - Bénéfices détaillés
   - Sources naturelles
   - Délai d'efficacité
   - Précautions d'emploi

## Maintenance et évolution

### Ajouter de nouveaux compléments

Pour ajouter un nouveau complément à la base de données, ajoutez un nouvel objet au format suivant dans `database_complements.js` :

```javascript
"Nom du complément": {
  categorie: "Catégorie",
  benefices: ["Bénéfice 1", "Bénéfice 2", ...],
  symptomes: ["Symptôme 1", "Symptôme 2", ...],
  objectifs: ["Objectif 1", "Objectif 2", ...],
  dosage: "Dosage recommandé",
  sources_naturelles: "Sources naturelles",
  delai_efficacite: "Délai d'efficacité",
  efficacite: 85, // Score de 0 à 100
  contre_indications: "Précautions",
  regime_alimentaire: ["Régime 1", "Régime 2", ...]
}
```

### Modifier les poids de l'algorithme

Pour ajuster la façon dont l'algorithme priorise certains facteurs, modifiez les objets de poids dans le constructeur de la classe `RecommendationSystem` dans `recommendation_algorithm.js` :

- `this.sectionWeights` : Poids des différentes sections du quiz
- `this.symptomWeights` : Poids des différents symptômes
- `this.objectiveWeights` : Poids des différents objectifs
- `this.dietAdjustments` : Ajustements selon le régime alimentaire
- `this.activityAdjustments` : Ajustements selon l'activité physique
- `this.sleepAdjustments` : Ajustements selon la qualité du sommeil
- `this.stressAdjustments` : Ajustements selon le niveau de stress
- `this.fruitVegAdjustments` : Ajustements selon la consommation de fruits et légumes

### Personnaliser l'interface des résultats

Pour modifier l'apparence de la page de résultats, modifiez la fonction `addResultsStyles()` dans `quiz_integration.js`. Cette fonction contient tous les styles CSS appliqués à la page de résultats.

## Dépannage

### Problèmes courants et solutions

1. **Aucune recommandation n'apparaît** :
   - Vérifiez que les noms des régimes alimentaires correspondent exactement à ceux attendus par l'algorithme
   - Assurez-vous que les symptômes et objectifs sélectionnés correspondent à ceux définis dans la base de données

2. **Recommandations non pertinentes** :
   - Vérifiez les poids attribués aux symptômes et objectifs
   - Assurez-vous que les compléments dans la base de données ont les bons symptômes et objectifs associés

3. **Erreurs JavaScript** :
   - Vérifiez la console du navigateur pour identifier les erreurs spécifiques
   - Assurez-vous que tous les fichiers sont correctement inclus dans l'ordre approprié

## Conclusion

Ce système de recommandation nutritionnelle offre une approche personnalisée pour recommander des compléments alimentaires naturels en fonction des besoins spécifiques de chaque utilisateur. Sa conception modulaire permet une maintenance facile et des évolutions futures, comme l'ajout de nouveaux compléments ou l'ajustement des poids de l'algorithme.
