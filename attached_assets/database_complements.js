/**
 * Base de données des compléments alimentaires naturels
 * Cette base contient uniquement des types de produits génériques (sans marques)
 * avec leurs propriétés, bénéfices, dosages recommandés et efficacité
 */

const complementsDatabase = {
  // Vitamines
  "Vitamine C naturelle": {
    categorie: "Vitamines",
    benefices: [
      "Renforce le système immunitaire",
      "Aide à lutter contre la fatigue",
      "Favorise l'absorption du fer",
      "Contribue à la formation du collagène pour la peau"
    ],
    symptomes: ["Fatigue", "Sensibilité au froid", "Problèmes de peau"],
    objectifs: ["Plus d'énergie", "Renforcer mon immunité"],
    dosage: "500-1000 mg par jour",
    sources_naturelles: "Agrumes, kiwi, acérola, cassis, persil",
    delai_efficacite: "2-3 semaines",
    efficacite: 85,
    contre_indications: "Doses élevées peuvent causer des troubles digestifs",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Complexe Vitamine B": {
    categorie: "Vitamines",
    benefices: [
      "Soutient le métabolisme énergétique",
      "Contribue au fonctionnement normal du système nerveux",
      "Aide à réduire la fatigue",
      "Soutient les fonctions psychologiques"
    ],
    symptomes: ["Fatigue", "Stress/Anxiété", "Manque de concentration"],
    objectifs: ["Plus d'énergie", "Améliorer ma concentration", "Réduire mon stress"],
    dosage: "Complexe B complet selon AJR",
    sources_naturelles: "Levure de bière, céréales complètes, légumineuses, noix",
    delai_efficacite: "3-4 semaines",
    efficacite: 80,
    contre_indications: "Peut colorer l'urine en jaune vif (normal)",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Vitamine D3 naturelle": {
    categorie: "Vitamines",
    benefices: [
      "Contribue au maintien d'une ossature normale",
      "Soutient le système immunitaire",
      "Aide à l'absorption du calcium",
      "Contribue au maintien d'une fonction musculaire normale"
    ],
    symptomes: ["Fatigue", "Douleurs articulaires", "Sensibilité au froid"],
    objectifs: ["Plus d'énergie", "Renforcer mon immunité"],
    dosage: "1000-2000 UI par jour",
    sources_naturelles: "Exposition au soleil, poissons gras, jaune d'œuf",
    delai_efficacite: "4-6 semaines",
    efficacite: 90,
    contre_indications: "Consulter un professionnel pour les dosages élevés",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien"]
  },
  
  // Minéraux
  "Magnésium marin": {
    categorie: "Minéraux",
    benefices: [
      "Contribue à réduire la fatigue",
      "Soutient le fonctionnement normal du système nerveux",
      "Aide à maintenir des fonctions musculaires normales",
      "Contribue à l'équilibre électrolytique"
    ],
    symptomes: ["Fatigue", "Stress/Anxiété", "Troubles du sommeil", "Douleurs articulaires"],
    objectifs: ["Plus d'énergie", "Meilleur sommeil", "Réduire mon stress"],
    dosage: "300-400 mg par jour",
    sources_naturelles: "Fruits à coque, légumes verts, céréales complètes, chocolat noir",
    delai_efficacite: "2-3 semaines",
    efficacite: 85,
    contre_indications: "Peut avoir un effet laxatif à forte dose",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Zinc naturel": {
    categorie: "Minéraux",
    benefices: [
      "Soutient le système immunitaire",
      "Contribue au maintien d'une peau normale",
      "Aide à la protection des cellules contre le stress oxydatif",
      "Contribue au maintien d'une fonction cognitive normale"
    ],
    symptomes: ["Problèmes de peau", "Cheveux/Ongles fragiles", "Sensibilité au froid"],
    objectifs: ["Renforcer mon immunité", "Améliorer ma peau"],
    dosage: "15-30 mg par jour",
    sources_naturelles: "Huîtres, viande rouge, graines de citrouille, légumineuses",
    delai_efficacite: "4-6 semaines",
    efficacite: 80,
    contre_indications: "Doses élevées peuvent interférer avec l'absorption du cuivre",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Fer naturel": {
    categorie: "Minéraux",
    benefices: [
      "Contribue à réduire la fatigue",
      "Aide à la formation normale des globules rouges",
      "Soutient le transport normal de l'oxygène dans le corps",
      "Contribue au fonctionnement normal du système immunitaire"
    ],
    symptomes: ["Fatigue", "Sensibilité au froid", "Manque de concentration"],
    objectifs: ["Plus d'énergie", "Améliorer ma concentration"],
    dosage: "14-18 mg par jour",
    sources_naturelles: "Viande rouge, légumineuses, épinards, fruits secs",
    delai_efficacite: "6-8 semaines",
    efficacite: 85,
    contre_indications: "Peut causer des troubles digestifs, prendre avec de la vitamine C",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  // Plantes adaptogènes
  "Rhodiola Rosea": {
    categorie: "Plantes adaptogènes",
    benefices: [
      "Aide à réduire la fatigue",
      "Soutient les fonctions cognitives",
      "Contribue à une humeur positive",
      "Aide à s'adapter au stress"
    ],
    symptomes: ["Fatigue", "Stress/Anxiété", "Manque de concentration", "Sautes d'humeur"],
    objectifs: ["Plus d'énergie", "Réduire mon stress", "Améliorer ma concentration"],
    dosage: "200-600 mg par jour (extrait standardisé)",
    sources_naturelles: "Racine de rhodiola",
    delai_efficacite: "1-2 semaines",
    efficacite: 75,
    contre_indications: "Déconseillé en cas de trouble bipolaire",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Ashwagandha": {
    categorie: "Plantes adaptogènes",
    benefices: [
      "Aide à réduire le stress et l'anxiété",
      "Soutient l'équilibre hormonal",
      "Contribue à améliorer la qualité du sommeil",
      "Aide à maintenir l'énergie et la vitalité"
    ],
    symptomes: ["Stress/Anxiété", "Troubles du sommeil", "Fatigue", "Sautes d'humeur"],
    objectifs: ["Réduire mon stress", "Meilleur sommeil", "Plus d'énergie"],
    dosage: "300-500 mg par jour (extrait standardisé)",
    sources_naturelles: "Racine d'ashwagandha",
    delai_efficacite: "2-4 semaines",
    efficacite: 80,
    contre_indications: "Déconseillé en cas de maladie auto-immune ou de grossesse",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  // Acides gras essentiels
  "Oméga-3 (EPA/DHA)": {
    categorie: "Acides gras essentiels",
    benefices: [
      "Soutient la santé cardiovasculaire",
      "Contribue au fonctionnement normal du cerveau",
      "Aide à maintenir une vision normale",
      "Soutient la santé de la peau"
    ],
    symptomes: ["Problèmes de peau", "Manque de concentration", "Sautes d'humeur"],
    objectifs: ["Améliorer ma concentration", "Améliorer ma peau", "Réduire mon stress"],
    dosage: "1000-2000 mg par jour (dont 250-500 mg d'EPA/DHA)",
    sources_naturelles: "Poissons gras, graines de lin, graines de chia, noix",
    delai_efficacite: "4-8 semaines",
    efficacite: 85,
    contre_indications: "Consulter un médecin si sous anticoagulants",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien"]
  },
  
  "Oméga-3 d'origine végétale (ALA)": {
    categorie: "Acides gras essentiels",
    benefices: [
      "Contribue au maintien d'un taux normal de cholestérol",
      "Soutient la santé cardiovasculaire",
      "Aide à maintenir une peau saine",
      "Soutient le système nerveux"
    ],
    symptomes: ["Problèmes de peau", "Manque de concentration"],
    objectifs: ["Améliorer ma peau", "Améliorer ma concentration"],
    dosage: "1-2 g par jour",
    sources_naturelles: "Huile de lin, graines de chia, noix, huile de colza",
    delai_efficacite: "6-12 semaines",
    efficacite: 70,
    contre_indications: "Conversion en EPA/DHA moins efficace que les sources marines",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  // Probiotiques et prébiotiques
  "Probiotiques multi-souches": {
    categorie: "Probiotiques",
    benefices: [
      "Soutient l'équilibre de la flore intestinale",
      "Aide à maintenir une digestion saine",
      "Contribue au renforcement du système immunitaire",
      "Peut améliorer l'apparence de la peau"
    ],
    symptomes: ["Problèmes digestifs", "Problèmes de peau", "Stress/Anxiété"],
    objectifs: ["Soutenir ma digestion", "Renforcer mon immunité", "Améliorer ma peau"],
    dosage: "5-10 milliards UFC par jour",
    sources_naturelles: "Yaourt, kéfir, choucroute, kimchi, kombucha",
    delai_efficacite: "2-4 semaines",
    efficacite: 80,
    contre_indications: "Consulter un médecin en cas de système immunitaire affaibli",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Fibres prébiotiques": {
    categorie: "Prébiotiques",
    benefices: [
      "Nourrit les bonnes bactéries intestinales",
      "Aide à maintenir un transit intestinal régulier",
      "Contribue à la satiété",
      "Soutient la santé digestive globale"
    ],
    symptomes: ["Problèmes digestifs", "Fringales"],
    objectifs: ["Soutenir ma digestion", "Équilibrer mon poids"],
    dosage: "5-10 g par jour",
    sources_naturelles: "Bananes, oignons, ail, poireaux, asperges, artichauts",
    delai_efficacite: "1-2 semaines",
    efficacite: 75,
    contre_indications: "Introduire progressivement pour éviter les ballonnements",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  // Plantes pour le sommeil
  "Mélatonine naturelle": {
    categorie: "Sommeil",
    benefices: [
      "Aide à réduire le temps d'endormissement",
      "Contribue à atténuer les effets du décalage horaire",
      "Aide à réguler le cycle veille-sommeil",
      "Peut améliorer la qualité du sommeil"
    ],
    symptomes: ["Troubles du sommeil"],
    objectifs: ["Meilleur sommeil"],
    dosage: "1-3 mg avant le coucher",
    sources_naturelles: "Cerise de Montmorency, riz, maïs, avoine",
    delai_efficacite: "Dès la première prise",
    efficacite: 85,
    contre_indications: "Peut causer de la somnolence, ne pas conduire après la prise",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Valériane": {
    categorie: "Plantes pour le sommeil",
    benefices: [
      "Aide à l'endormissement",
      "Contribue à améliorer la qualité du sommeil",
      "Aide à réduire l'anxiété légère",
      "Favorise la relaxation"
    ],
    symptomes: ["Troubles du sommeil", "Stress/Anxiété"],
    objectifs: ["Meilleur sommeil", "Réduire mon stress"],
    dosage: "300-600 mg d'extrait avant le coucher",
    sources_naturelles: "Racine de valériane",
    delai_efficacite: "2-4 semaines",
    efficacite: 75,
    contre_indications: "Peut interagir avec certains médicaments, éviter l'alcool",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  // Plantes pour la digestion
  "Charbon végétal activé": {
    categorie: "Digestion",
    benefices: [
      "Aide à réduire les ballonnements",
      "Contribue à diminuer les flatulences",
      "Peut soulager les inconforts digestifs",
      "Aide à l'élimination des toxines"
    ],
    symptomes: ["Problèmes digestifs"],
    objectifs: ["Soutenir ma digestion"],
    dosage: "1-2 g par jour, loin des repas et médicaments",
    sources_naturelles: "Charbon activé de noix de coco ou de bois",
    delai_efficacite: "Quelques heures à quelques jours",
    efficacite: 80,
    contre_indications: "Peut réduire l'absorption des médicaments et nutriments",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Curcuma et poivre noir": {
    categorie: "Anti-inflammatoires naturels",
    benefices: [
      "Propriétés anti-inflammatoires naturelles",
      "Soutient la santé digestive",
      "Aide à maintenir la santé des articulations",
      "Contribue à la protection cellulaire"
    ],
    symptomes: ["Problèmes digestifs", "Douleurs articulaires", "Problèmes de peau"],
    objectifs: ["Soutenir ma digestion", "Renforcer mon immunité"],
    dosage: "500-1000 mg de curcuma avec 5-10 mg de pipérine",
    sources_naturelles: "Racine de curcuma, poivre noir",
    delai_efficacite: "4-8 semaines",
    efficacite: 75,
    contre_indications: "Consulter un médecin si sous anticoagulants",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  // Antioxydants
  "Resvératrol": {
    categorie: "Antioxydants",
    benefices: [
      "Puissant antioxydant",
      "Soutient la santé cardiovasculaire",
      "Contribue à la protection cellulaire",
      "Propriétés anti-âge"
    ],
    symptomes: ["Problèmes de peau", "Fatigue"],
    objectifs: ["Renforcer mon immunité", "Améliorer ma peau"],
    dosage: "100-500 mg par jour",
    sources_naturelles: "Peau de raisin rouge, vin rouge, myrtilles, mûres",
    delai_efficacite: "4-8 semaines",
    efficacite: 70,
    contre_indications: "Peut interagir avec certains médicaments anticoagulants",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Coenzyme Q10": {
    categorie: "Antioxydants",
    benefices: [
      "Soutient la production d'énergie cellulaire",
      "Propriétés antioxydantes",
      "Contribue à la santé cardiovasculaire",
      "Aide à réduire la fatigue"
    ],
    symptomes: ["Fatigue", "Manque de concentration"],
    objectifs: ["Plus d'énergie", "Renforcer mon immunité"],
    dosage: "100-200 mg par jour",
    sources_naturelles: "Viande, poisson, noix, huiles végétales",
    delai_efficacite: "4-12 semaines",
    efficacite: 75,
    contre_indications: "Consulter un médecin si sous anticoagulants ou statines",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien"]
  }
};

// Exporter la base de données pour utilisation dans d'autres fichiers
module.exports = complementsDatabase;
