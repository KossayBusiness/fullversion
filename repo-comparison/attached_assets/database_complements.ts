/**
 * Base de données des compléments alimentaires naturels en TypeScript
 * Contient les informations sur tous les compléments, leurs propriétés et bénéfices
 */

// Interface pour définir la structure d'un complément alimentaire
interface ComplementAlimentaire {
  categorie: string;
  benefices: string[];
  symptomes: string[];
  objectifs: string[];
  dosage: string;
  sources_naturelles: string;
  delai_efficacite: string;
  efficacite: number;
  contre_indications?: string;
  regime_alimentaire: string[];
}

// Base de données des compléments alimentaires
const complementsDatabase: Record<string, ComplementAlimentaire> = {
  "Magnésium marin": {
    categorie: "Minéraux",
    benefices: [
      "Contribue à réduire la fatigue",
      "Soutient le fonctionnement normal du système nerveux",
      "Aide à maintenir des fonctions musculaires normales",
      "Contribue à l'équilibre électrolytique"
    ],
    symptomes: [
      "Fatigue",
      "Stress/Anxiété",
      "Troubles du sommeil",
      "Douleurs articulaires"
    ],
    objectifs: [
      "Plus d'énergie",
      "Réduire mon stress",
      "Meilleur sommeil"
    ],
    dosage: "300-400 mg par jour",
    sources_naturelles: "Fruits à coque, légumes verts, céréales complètes, chocolat noir",
    delai_efficacite: "2-3 semaines",
    efficacite: 90,
    contre_indications: "Peut avoir un effet laxatif à forte dose",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Complexe Vitamine B": {
    categorie: "Vitamines",
    benefices: [
      "Contribue au métabolisme énergétique normal",
      "Aide à réduire la fatigue",
      "Soutient le fonctionnement normal du système nerveux",
      "Contribue à des fonctions psychologiques normales"
    ],
    symptomes: [
      "Fatigue",
      "Manque de concentration",
      "Stress/Anxiété"
    ],
    objectifs: [
      "Plus d'énergie",
      "Améliorer ma concentration",
      "Réduire mon stress"
    ],
    dosage: "Selon les besoins individuels, généralement 1 comprimé par jour",
    sources_naturelles: "Céréales complètes, légumineuses, levure nutritionnelle, viandes, œufs",
    delai_efficacite: "2-4 semaines",
    efficacite: 85,
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien"]
  },
  
  "Vitamine B12 naturelle": {
    categorie: "Vitamines",
    benefices: [
      "Contribue à un métabolisme énergétique normal",
      "Aide à réduire la fatigue",
      "Soutient le fonctionnement normal du système nerveux",
      "Contribue à la formation normale de globules rouges"
    ],
    symptomes: [
      "Fatigue",
      "Manque de concentration",
      "Sensibilité au froid"
    ],
    objectifs: [
      "Plus d'énergie",
      "Améliorer ma concentration"
    ],
    dosage: "1000-2000 μg par semaine ou 250 μg par jour",
    sources_naturelles: "Viandes, poissons, fruits de mer, œufs, produits laitiers, levure nutritionnelle enrichie",
    delai_efficacite: "4-12 semaines",
    efficacite: 95,
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
    symptomes: [
      "Fatigue",
      "Sensibilité au froid",
      "Douleurs articulaires"
    ],
    objectifs: [
      "Plus d'énergie",
      "Renforcer mon immunité"
    ],
    dosage: "1000-2000 UI par jour",
    sources_naturelles: "Exposition au soleil, poissons gras, jaune d'œuf",
    delai_efficacite: "4-6 semaines",
    efficacite: 85,
    contre_indications: "Consulter un professionnel pour les dosages élevés",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien"]
  },
  
  "Vitamine D3 d'origine végétale": {
    categorie: "Vitamines",
    benefices: [
      "Contribue au maintien d'une ossature normale",
      "Soutient le système immunitaire",
      "Aide à l'absorption du calcium",
      "Contribue au maintien d'une fonction musculaire normale"
    ],
    symptomes: [
      "Fatigue",
      "Sensibilité au froid",
      "Douleurs articulaires"
    ],
    objectifs: [
      "Plus d'énergie",
      "Renforcer mon immunité"
    ],
    dosage: "1000-2000 UI par jour",
    sources_naturelles: "Exposition au soleil, lichen",
    delai_efficacite: "4-6 semaines",
    efficacite: 80,
    contre_indications: "Consulter un professionnel pour les dosages élevés",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Vitamine C naturelle": {
    categorie: "Vitamines",
    benefices: [
      "Contribue à réduire la fatigue",
      "Soutient le système immunitaire",
      "Aide à la protection des cellules contre le stress oxydatif",
      "Améliore l'absorption du fer"
    ],
    symptomes: [
      "Fatigue",
      "Problèmes de peau"
    ],
    objectifs: [
      "Plus d'énergie",
      "Renforcer mon immunité",
      "Améliorer ma peau"
    ],
    dosage: "500-1000 mg par jour",
    sources_naturelles: "Agrumes, kiwi, baies, poivrons, brocoli",
    delai_efficacite: "2-4 semaines",
    efficacite: 80,
    contre_indications: "Peut causer des troubles digestifs à forte dose",
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
    symptomes: [
      "Problèmes de peau",
      "Cheveux/Ongles fragiles"
    ],
    objectifs: [
      "Renforcer mon immunité",
      "Améliorer ma peau"
    ],
    dosage: "15-30 mg par jour",
    sources_naturelles: "Huîtres, viande rouge, graines de citrouille, légumineuses",
    delai_efficacite: "4-6 semaines",
    efficacite: 75,
    contre_indications: "Doses élevées peuvent interférer avec l'absorption du cuivre",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Fer naturel": {
    categorie: "Minéraux",
    benefices: [
      "Contribue à réduire la fatigue",
      "Aide à la formation normale de globules rouges",
      "Soutient le transport normal d'oxygène dans le corps",
      "Contribue à une fonction cognitive normale"
    ],
    symptomes: [
      "Fatigue",
      "Sensibilité au froid"
    ],
    objectifs: [
      "Plus d'énergie"
    ],
    dosage: "14-18 mg par jour (femmes), 8-10 mg par jour (hommes)",
    sources_naturelles: "Viande rouge, légumineuses, épinards, graines de citrouille",
    delai_efficacite: "4-12 semaines",
    efficacite: 85,
    contre_indications: "Peut causer des troubles digestifs, ne pas prendre sans carence avérée",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Oméga-3 (EPA/DHA)": {
    categorie: "Acides gras essentiels",
    benefices: [
      "Soutient la santé cardiovasculaire",
      "Contribue au fonctionnement normal du cerveau",
      "Aide à maintenir une vision normale",
      "Propriétés anti-inflammatoires naturelles"
    ],
    symptomes: [
      "Douleurs articulaires",
      "Manque de concentration",
      "Sautes d'humeur"
    ],
    objectifs: [
      "Améliorer ma concentration",
      "Réduire mon stress"
    ],
    dosage: "1000-2000 mg par jour (dont 500 mg d'EPA/DHA)",
    sources_naturelles: "Poissons gras (saumon, maquereau, sardines), algues marines",
    delai_efficacite: "4-8 semaines",
    efficacite: 80,
    contre_indications: "Consulter un médecin si sous anticoagulants",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien"]
  },
  
  "Oméga-3 d'origine végétale (ALA)": {
    categorie: "Acides gras essentiels",
    benefices: [
      "Soutient la santé cardiovasculaire",
      "Contribue au maintien d'un taux normal de cholestérol",
      "Propriétés anti-inflammatoires naturelles"
    ],
    symptomes: [
      "Douleurs articulaires",
      "Sautes d'humeur"
    ],
    objectifs: [
      "Réduire mon stress"
    ],
    dosage: "2000-4000 mg par jour",
    sources_naturelles: "Graines de lin, graines de chia, noix, huile de colza",
    delai_efficacite: "8-12 semaines",
    efficacite: 65,
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Probiotiques multi-souches": {
    categorie: "Probiotiques",
    benefices: [
      "Soutient l'équilibre de la flore intestinale",
      "Aide à maintenir une digestion saine",
      "Contribue au renforcement du système immunitaire",
      "Peut améliorer l'apparence de la peau"
    ],
    symptomes: [
      "Problèmes digestifs",
      "Problèmes de peau",
      "Fringales"
    ],
    objectifs: [
      "Soutenir ma digestion",
      "Renforcer mon immunité",
      "Améliorer ma peau"
    ],
    dosage: "5-10 milliards UFC par jour",
    sources_naturelles: "Yaourt, kéfir, choucroute, kimchi, kombucha",
    delai_efficacite: "2-4 semaines",
    efficacite: 85,
    contre_indications: "Consulter un médecin en cas de système immunitaire affaibli",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Fibres prébiotiques": {
    categorie: "Prébiotiques",
    benefices: [
      "Nourrit les bonnes bactéries intestinales",
      "Favorise une digestion saine",
      "Aide à réguler l'appétit",
      "Contribue à l'équilibre glycémique"
    ],
    symptomes: [
      "Problèmes digestifs",
      "Fringales"
    ],
    objectifs: [
      "Soutenir ma digestion",
      "Équilibrer mon poids"
    ],
    dosage: "5-10 g par jour",
    sources_naturelles: "Chicorée, topinambour, oignon, ail, banane verte, avoine",
    delai_efficacite: "2-4 semaines",
    efficacite: 80,
    contre_indications: "Introduire progressivement pour éviter les ballonnements",
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
    symptomes: [
      "Stress/Anxiété",
      "Troubles du sommeil",
      "Fatigue"
    ],
    objectifs: [
      "Réduire mon stress",
      "Meilleur sommeil",
      "Plus d'énergie"
    ],
    dosage: "300-500 mg par jour (extrait standardisé)",
    sources_naturelles: "Racine d'ashwagandha",
    delai_efficacite: "2-4 semaines",
    efficacite: 85,
    contre_indications: "Déconseillé en cas de maladie auto-immune ou de grossesse",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Rhodiola Rosea": {
    categorie: "Plantes adaptogènes",
    benefices: [
      "Aide à combattre la fatigue",
      "Soutient les performances cognitives",
      "Contribue à réduire le stress",
      "Aide à maintenir l'énergie physique et mentale"
    ],
    symptomes: [
      "Fatigue",
      "Stress/Anxiété",
      "Manque de concentration"
    ],
    objectifs: [
      "Plus d'énergie",
      "Réduire mon stress",
      "Améliorer ma concentration"
    ],
    dosage: "200-400 mg par jour (extrait standardisé)",
    sources_naturelles: "Racine de rhodiola",
    delai_efficacite: "1-3 semaines",
    efficacite: 80,
    contre_indications: "Peut interagir avec certains médicaments, déconseillé en cas de trouble bipolaire",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Mélatonine naturelle": {
    categorie: "Sommeil",
    benefices: [
      "Aide à réduire le temps d'endormissement",
      "Contribue à atténuer les effets du décalage horaire",
      "Aide à réguler le cycle veille-sommeil",
      "Peut améliorer la qualité du sommeil"
    ],
    symptomes: [
      "Troubles du sommeil"
    ],
    objectifs: [
      "Meilleur sommeil"
    ],
    dosage: "1-3 mg avant le coucher",
    sources_naturelles: "Cerise de Montmorency, riz, maïs, avoine",
    delai_efficacite: "Dès la première prise",
    efficacite: 75,
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
    symptomes: [
      "Troubles du sommeil",
      "Stress/Anxiété"
    ],
    objectifs: [
      "Meilleur sommeil",
      "Réduire mon stress"
    ],
    dosage: "300-600 mg d'extrait avant le coucher",
    sources_naturelles: "Racine de valériane",
    delai_efficacite: "2-4 semaines",
    efficacite: 70,
    contre_indications: "Peut interagir avec certains médicaments, éviter l'alcool",
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
    symptomes: [
      "Douleurs articulaires",
      "Problèmes digestifs"
    ],
    objectifs: [
      "Soutenir ma digestion"
    ],
    dosage: "500-1000 mg de curcuma avec 5-10 mg de pipérine",
    sources_naturelles: "Racine de curcuma, poivre noir",
    delai_efficacite: "4-8 semaines",
    efficacite: 75,
    contre_indications: "Consulter un médecin si sous anticoagulants",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Coenzyme Q10": {
    categorie: "Antioxydants",
    benefices: [
      "Soutient la production d'énergie cellulaire",
      "Propriétés antioxydantes",
      "Contribue à la santé cardiovasculaire",
      "Aide à maintenir les niveaux d'énergie"
    ],
    symptomes: [
      "Fatigue",
      "Douleurs articulaires"
    ],
    objectifs: [
      "Plus d'énergie"
    ],
    dosage: "100-200 mg par jour",
    sources_naturelles: "Viandes, poissons gras, légumineuses, noix",
    delai_efficacite: "4-12 semaines",
    efficacite: 70,
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  },
  
  "Ginseng": {
    categorie: "Plantes adaptogènes",
    benefices: [
      "Aide à maintenir l'énergie physique et mentale",
      "Soutient les performances cognitives",
      "Contribue au fonctionnement normal du système immunitaire",
      "Aide à maintenir la vitalité"
    ],
    symptomes: [
      "Fatigue",
      "Manque de concentration"
    ],
    objectifs: [
      "Plus d'énergie",
      "Améliorer ma concentration",
      "Renforcer mon immunité"
    ],
    dosage: "200-400 mg par jour (extrait standardisé)",
    sources_naturelles: "Racine de ginseng",
    delai_efficacite: "4-8 semaines",
    efficacite: 75,
    contre_indications: "Déconseillé en cas d'hypertension, peut interagir avec certains médicaments",
    regime_alimentaire: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"]
  }
};

// Exporter la base de données pour utilisation externe
export default complementsDatabase;
