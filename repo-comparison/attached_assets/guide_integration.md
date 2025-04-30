# Guide d'intégration du système de recommandation nutritionnelle

Ce document explique comment intégrer le système de recommandation nutritionnelle à votre site web existant.

## Fichiers du système

Le système de recommandation se compose de trois fichiers principaux :

1. `database_complements.js` - Base de données des compléments alimentaires naturels
2. `recommendation_algorithm.js` - Algorithme de recommandation qui analyse les réponses et génère les recommandations
3. `quiz_integration.js` - Script qui connecte l'algorithme au quiz et génère l'interface utilisateur

## Instructions d'intégration

### Étape 1 : Ajouter les fichiers au projet

Placez les trois fichiers JavaScript dans le répertoire de votre projet web. Par exemple :

```
/votre-projet/
  ├── js/
  │   ├── database_complements.js
  │   ├── recommendation_algorithm.js
  │   └── quiz_integration.js
  ├── css/
  ├── index.html
  └── quiz.html
```

### Étape 2 : Inclure les scripts dans votre page HTML

Ajoutez les références aux scripts dans votre page HTML de quiz, juste avant la fermeture de la balise `</body>` :

```html
<!-- Inclure les scripts du système de recommandation -->
<script src="js/database_complements.js"></script>
<script src="js/recommendation_algorithm.js"></script>
<script src="js/quiz_integration.js"></script>
```

### Étape 3 : Adapter les sélecteurs CSS

Le script `quiz_integration.js` utilise des sélecteurs CSS pour identifier les éléments du quiz. Vous devrez peut-être les adapter pour correspondre à la structure exacte de votre HTML.

Voici les principales classes CSS utilisées dans le script :

- `.symptomes-section` - Section des symptômes
- `.objectifs-section` - Section des objectifs
- `.alimentation-section` - Section du régime alimentaire
- `.activite-physique-section` - Section de l'activité physique
- `.sommeil-section` - Section de la qualité du sommeil
- `.stress-section` - Section du niveau de stress
- `.viande-section` - Section de la consommation de viande
- `.poisson-section` - Section de la consommation de poisson
- `.fruits-legumes-section` - Section de la consommation de fruits et légumes

Modifiez ces classes dans le fichier `quiz_integration.js` pour qu'elles correspondent à votre structure HTML.

### Étape 4 : Adapter les noms des régimes alimentaires

Assurez-vous que les noms des régimes alimentaires dans votre quiz correspondent à ceux utilisés dans l'algorithme :

- "Omnivore"
- "Flexitarien"
- "Pescetarien"
- "Végétarien"
- "Végan"

Si vos libellés sont différents (par exemple "Omnivore (je mange de tout)"), modifiez soit les libellés dans votre quiz, soit adaptez le code dans `recommendation_algorithm.js` pour qu'il reconnaisse vos libellés.

### Étape 5 : Tester l'intégration

Après avoir effectué ces modifications, testez le quiz en répondant à toutes les questions et en cliquant sur le bouton "Voir mes résultats". Vous devriez voir s'afficher les recommandations personnalisées basées sur vos réponses.

## Personnalisation avancée

### Modifier les styles CSS

Vous pouvez personnaliser l'apparence des résultats en modifiant la fonction `addResultsStyles()` dans le fichier `quiz_integration.js`. Cette fonction contient tous les styles CSS appliqués à la page de résultats.

### Ajouter de nouveaux compléments alimentaires

Pour ajouter de nouveaux compléments à la base de données, modifiez le fichier `database_complements.js` en suivant le même format que les compléments existants.

### Ajuster les poids de l'algorithme

Si vous souhaitez modifier la façon dont l'algorithme priorise certains symptômes ou objectifs, vous pouvez ajuster les poids dans le constructeur de la classe `RecommendationSystem` dans le fichier `recommendation_algorithm.js`.

## Dépannage

Si vous rencontrez des problèmes lors de l'intégration, vérifiez les points suivants :

1. Assurez-vous que tous les fichiers JavaScript sont correctement inclus dans votre page HTML
2. Vérifiez que les sélecteurs CSS correspondent à votre structure HTML
3. Ouvrez la console JavaScript de votre navigateur pour voir s'il y a des erreurs
4. Vérifiez que les noms des régimes alimentaires et autres options correspondent exactement à ceux attendus par l'algorithme

Pour toute assistance supplémentaire, n'hésitez pas à me contacter.
