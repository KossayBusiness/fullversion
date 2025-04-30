
/**
 * Catalogue des compléments alimentaires naturels
 * Ce fichier contient les données sur les compléments, leurs propriétés et bénéfices
 */

// Interface pour définir la structure d'un complément alimentaire
export interface SupplementInfo {
  name: string;
  description: string;
  category: string;
  benefits: string[];
  scientificBasis: string;
  recommendedDosage: string;
  timeToEffect: string;
  naturalSources: string[];
  efficacyScore: number;
  cautions?: string;
  compatibleDiets: string[];
  targetSymptoms: string[];
  targetGoals: string[];
  categories: string[];
  relatedTerms: string[];
}

// Catalogue des compléments alimentaires
const SUPPLEMENT_CATALOG: Record<string, SupplementInfo> = {
  "magnesium_glycinate": {
    name: "Magnésium marin",
    description: "Contribue à réduire la fatigue et soutenir le système nerveux et musculaire",
    category: "Minéraux",
    benefits: [
      "Contribue à réduire la fatigue",
      "Soutient le fonctionnement normal du système nerveux",
      "Aide à maintenir des fonctions musculaires normales",
      "Contribue à l'équilibre électrolytique"
    ],
    scientificBasis: "Des études cliniques montrent que le magnésium joue un rôle crucial dans plus de 300 réactions enzymatiques dans le corps",
    recommendedDosage: "300-400 mg par jour",
    timeToEffect: "2-3 semaines",
    naturalSources: ["Fruits à coque", "Légumes verts", "Céréales complètes", "Chocolat noir"],
    efficacyScore: 90,
    cautions: "Peut avoir un effet laxatif à forte dose",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Fatigue", "Stress", "Anxiété", "Troubles du sommeil", "Douleurs articulaires"],
    targetGoals: ["Plus d'énergie", "Réduire mon stress", "Meilleur sommeil"],
    categories: ["minerals", "sleep", "stress", "energy"],
    relatedTerms: ["magnesium", "electrolytes", "muscle function"]
  },
  
  "vitamin_b_complex": {
    name: "Complexe Vitamine B",
    description: "Soutient le métabolisme énergétique et contribue à réduire la fatigue",
    category: "Vitamines",
    benefits: [
      "Contribue au métabolisme énergétique normal",
      "Aide à réduire la fatigue",
      "Soutient le fonctionnement normal du système nerveux",
      "Contribue à des fonctions psychologiques normales"
    ],
    scientificBasis: "Les vitamines B sont essentielles pour la conversion des nutriments en énergie au niveau cellulaire",
    recommendedDosage: "Selon les besoins individuels, généralement 1 comprimé par jour",
    timeToEffect: "2-4 semaines",
    naturalSources: ["Céréales complètes", "Légumineuses", "Levure nutritionnelle", "Viandes", "Œufs"],
    efficacyScore: 85,
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien"],
    targetSymptoms: ["Fatigue", "Manque de concentration", "Stress", "Anxiété"],
    targetGoals: ["Plus d'énergie", "Améliorer ma concentration", "Réduire mon stress"],
    categories: ["vitamins", "energy", "cognitive"],
    relatedTerms: ["metabolism", "b vitamins", "energy"]
  },
  
  "vitamin_b12": {
    name: "Vitamine B12 naturelle",
    description: "Essentielle pour l'énergie, le système nerveux et la formation des globules rouges",
    category: "Vitamines",
    benefits: [
      "Contribue à un métabolisme énergétique normal",
      "Aide à réduire la fatigue",
      "Soutient le fonctionnement normal du système nerveux",
      "Contribue à la formation normale de globules rouges"
    ],
    scientificBasis: "La vitamine B12 est nécessaire à la synthèse de l'ADN, à la formation des globules rouges et au maintien de la gaine de myéline",
    recommendedDosage: "1000-2000 μg par semaine ou 250 μg par jour",
    timeToEffect: "4-12 semaines",
    naturalSources: ["Viandes", "Poissons", "Fruits de mer", "Œufs", "Produits laitiers", "Levure nutritionnelle enrichie"],
    efficacyScore: 95,
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Fatigue", "Manque de concentration", "Sensibilité au froid"],
    targetGoals: ["Plus d'énergie", "Améliorer ma concentration"],
    categories: ["vitamins", "energy", "vegan-essential"],
    relatedTerms: ["cobalamin", "methylcobalamin", "red blood cells"]
  },
  
  "vitamin_d3": {
    name: "Vitamine D3 naturelle",
    description: "Soutient le système immunitaire et contribue à la santé osseuse",
    category: "Vitamines",
    benefits: [
      "Contribue au maintien d'une ossature normale",
      "Soutient le système immunitaire",
      "Aide à l'absorption du calcium",
      "Contribue au maintien d'une fonction musculaire normale"
    ],
    scientificBasis: "Des études montrent qu'une supplémentation en vitamine D peut réduire le risque d'infections respiratoires de 30% chez les personnes carencées",
    recommendedDosage: "1000-2000 UI par jour",
    timeToEffect: "4-6 semaines",
    naturalSources: ["Exposition au soleil", "Poissons gras", "Jaune d'œuf"],
    efficacyScore: 85,
    cautions: "Consulter un professionnel pour les dosages élevés",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien"],
    targetSymptoms: ["Fatigue", "Sensibilité au froid", "Douleurs articulaires"],
    targetGoals: ["Plus d'énergie", "Renforcer mon immunité"],
    categories: ["vitamins", "immune", "bone-health"],
    relatedTerms: ["sunshine vitamin", "calcium absorption", "cholecalciferol"]
  },
  
  "vitamin_d_vegan": {
    name: "Vitamine D3 d'origine végétale",
    description: "Version végane de la vitamine D, extraite de lichen, soutient l'immunité et la santé osseuse",
    category: "Vitamines",
    benefits: [
      "Contribue au maintien d'une ossature normale",
      "Soutient le système immunitaire",
      "Aide à l'absorption du calcium",
      "Contribue au maintien d'une fonction musculaire normale"
    ],
    scientificBasis: "La vitamine D3 d'origine végétale (lichen) a montré une biodisponibilité comparable à celle d'origine animale",
    recommendedDosage: "1000-2000 UI par jour",
    timeToEffect: "4-6 semaines",
    naturalSources: ["Exposition au soleil", "Lichen"],
    efficacyScore: 80,
    cautions: "Consulter un professionnel pour les dosages élevés",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Fatigue", "Sensibilité au froid", "Douleurs articulaires"],
    targetGoals: ["Plus d'énergie", "Renforcer mon immunité"],
    categories: ["vitamins", "immune", "bone-health", "vegan-friendly"],
    relatedTerms: ["lichen-derived", "plant-based", "cholecalciferol"]
  },
  
  "vitamin_c": {
    name: "Vitamine C naturelle",
    description: "Puissant antioxydant qui soutient le système immunitaire et la production de collagène",
    category: "Vitamines",
    benefits: [
      "Contribue à réduire la fatigue",
      "Soutient le système immunitaire",
      "Aide à la protection des cellules contre le stress oxydatif",
      "Améliore l'absorption du fer"
    ],
    scientificBasis: "La vitamine C est essentielle à la synthèse du collagène et agit comme un puissant antioxydant dans l'organisme",
    recommendedDosage: "500-1000 mg par jour",
    timeToEffect: "2-4 semaines",
    naturalSources: ["Agrumes", "Kiwi", "Baies", "Poivrons", "Brocoli"],
    efficacyScore: 80,
    cautions: "Peut causer des troubles digestifs à forte dose",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Fatigue", "Problèmes de peau"],
    targetGoals: ["Plus d'énergie", "Renforcer mon immunité", "Améliorer ma peau"],
    categories: ["vitamins", "immune", "skin-health", "antioxidant"],
    relatedTerms: ["ascorbic acid", "collagen", "antioxidant"]
  },
  
  "zinc": {
    name: "Zinc naturel",
    description: "Minéral essentiel pour l'immunité, la santé de la peau et la fonction cognitive",
    category: "Minéraux",
    benefits: [
      "Soutient le système immunitaire",
      "Contribue au maintien d'une peau normale",
      "Aide à la protection des cellules contre le stress oxydatif",
      "Contribue au maintien d'une fonction cognitive normale"
    ],
    scientificBasis: "Le zinc est impliqué dans plus de 300 réactions enzymatiques et joue un rôle crucial dans la division cellulaire et la réparation des tissus",
    recommendedDosage: "15-30 mg par jour",
    timeToEffect: "4-6 semaines",
    naturalSources: ["Huîtres", "Viande rouge", "Graines de citrouille", "Légumineuses"],
    efficacyScore: 75,
    cautions: "Doses élevées peuvent interférer avec l'absorption du cuivre",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Problèmes de peau", "Cheveux/Ongles fragiles"],
    targetGoals: ["Renforcer mon immunité", "Améliorer ma peau"],
    categories: ["minerals", "immune", "skin-health"],
    relatedTerms: ["trace mineral", "immunity", "enzyme cofactor"]
  },
  
  "iron": {
    name: "Fer naturel",
    description: "Minéral essentiel pour le transport de l'oxygène et la production d'énergie",
    category: "Minéraux",
    benefits: [
      "Contribue à réduire la fatigue",
      "Aide à la formation normale de globules rouges",
      "Soutient le transport normal d'oxygène dans le corps",
      "Contribue à une fonction cognitive normale"
    ],
    scientificBasis: "Le fer est un composant essentiel de l'hémoglobine, responsable du transport de l'oxygène des poumons vers les tissus",
    recommendedDosage: "14-18 mg par jour (femmes), 8-10 mg par jour (hommes)",
    timeToEffect: "4-12 semaines",
    naturalSources: ["Viande rouge", "Légumineuses", "Épinards", "Graines de citrouille"],
    efficacyScore: 85,
    cautions: "Peut causer des troubles digestifs, ne pas prendre sans carence avérée",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Fatigue", "Sensibilité au froid"],
    targetGoals: ["Plus d'énergie"],
    categories: ["minerals", "energy", "blood-health"],
    relatedTerms: ["hemoglobin", "ferritin", "anemia"]
  },
  
  "omega3": {
    name: "Oméga-3 (EPA/DHA)",
    description: "Acides gras essentiels pour la santé cardiovasculaire et cérébrale",
    category: "Acides gras essentiels",
    benefits: [
      "Soutient la santé cardiovasculaire",
      "Contribue au fonctionnement normal du cerveau",
      "Aide à maintenir une vision normale",
      "Propriétés anti-inflammatoires naturelles"
    ],
    scientificBasis: "Les oméga-3 sont des acides gras polyinsaturés qui modulent l'inflammation et sont des composants structurels des membranes cellulaires",
    recommendedDosage: "1000-2000 mg par jour (dont 500 mg d'EPA/DHA)",
    timeToEffect: "4-8 semaines",
    naturalSources: ["Poissons gras (saumon, maquereau, sardines)", "Algues marines"],
    efficacyScore: 80,
    cautions: "Consulter un médecin si sous anticoagulants",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien"],
    targetSymptoms: ["Douleurs articulaires", "Manque de concentration", "Sautes d'humeur"],
    targetGoals: ["Améliorer ma concentration", "Réduire mon stress"],
    categories: ["essential-fatty-acids", "brain-health", "heart-health", "anti-inflammatory"],
    relatedTerms: ["EPA", "DHA", "fish oil"]
  },
  
  "omega3_vegan": {
    name: "Oméga-3 d'origine végétale (ALA)",
    description: "Version végétale des acides gras essentiels, principalement sous forme d'ALA",
    category: "Acides gras essentiels",
    benefits: [
      "Soutient la santé cardiovasculaire",
      "Contribue au maintien d'un taux normal de cholestérol",
      "Propriétés anti-inflammatoires naturelles"
    ],
    scientificBasis: "L'ALA (acide alpha-linolénique) peut être partiellement converti en EPA et DHA dans l'organisme, mais avec un taux de conversion limité",
    recommendedDosage: "2000-4000 mg par jour",
    timeToEffect: "8-12 semaines",
    naturalSources: ["Graines de lin", "Graines de chia", "Noix", "Huile de colza"],
    efficacyScore: 65,
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Douleurs articulaires", "Sautes d'humeur"],
    targetGoals: ["Réduire mon stress"],
    categories: ["essential-fatty-acids", "heart-health", "vegan-friendly"],
    relatedTerms: ["ALA", "flaxseed", "plant-based omega"]
  },
  
  "probiotics": {
    name: "Probiotiques multi-souches",
    description: "Bactéries bénéfiques qui soutiennent l'équilibre de la flore intestinale",
    category: "Probiotiques",
    benefits: [
      "Soutient l'équilibre de la flore intestinale",
      "Aide à maintenir une digestion saine",
      "Contribue au renforcement du système immunitaire",
      "Peut améliorer l'apparence de la peau"
    ],
    scientificBasis: "Les probiotiques modulent le microbiome intestinal et influencent positivement l'immunité et la digestion",
    recommendedDosage: "5-10 milliards UFC par jour",
    timeToEffect: "2-4 semaines",
    naturalSources: ["Yaourt", "Kéfir", "Choucroute", "Kimchi", "Kombucha"],
    efficacyScore: 85,
    cautions: "Consulter un médecin en cas de système immunitaire affaibli",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Problèmes digestifs", "Problèmes de peau", "Fringales"],
    targetGoals: ["Soutenir ma digestion", "Renforcer mon immunité", "Améliorer ma peau"],
    categories: ["gut-health", "immune", "digestive"],
    relatedTerms: ["microbiome", "gut bacteria", "lactobacillus"]
  },
  
  "prebiotics": {
    name: "Fibres prébiotiques",
    description: "Nourrissent les bactéries bénéfiques de l'intestin pour une meilleure santé digestive",
    category: "Prébiotiques",
    benefits: [
      "Nourrit les bonnes bactéries intestinales",
      "Favorise une digestion saine",
      "Aide à réguler l'appétit",
      "Contribue à l'équilibre glycémique"
    ],
    scientificBasis: "Les prébiotiques sont des fibres non digestibles qui servent de substrat pour les bactéries bénéfiques de l'intestin",
    recommendedDosage: "5-10 g par jour",
    timeToEffect: "2-4 semaines",
    naturalSources: ["Chicorée", "Topinambour", "Oignon", "Ail", "Banane verte", "Avoine"],
    efficacyScore: 80,
    cautions: "Introduire progressivement pour éviter les ballonnements",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Problèmes digestifs", "Fringales"],
    targetGoals: ["Soutenir ma digestion", "Équilibrer mon poids"],
    categories: ["gut-health", "digestive", "fiber"],
    relatedTerms: ["inulin", "FOS", "GOS"]
  },
  
  "ashwagandha": {
    name: "Ashwagandha",
    description: "Plante adaptogène qui aide à réduire le stress et soutient l'équilibre hormonal",
    category: "Plantes adaptogènes",
    benefits: [
      "Aide à réduire le stress et l'anxiété",
      "Soutient l'équilibre hormonal",
      "Contribue à améliorer la qualité du sommeil",
      "Aide à maintenir l'énergie et la vitalité"
    ],
    scientificBasis: "L'ashwagandha a démontré des effets modulateurs sur les niveaux de cortisol et l'activité des neurotransmetteurs",
    recommendedDosage: "300-500 mg par jour (extrait standardisé)",
    timeToEffect: "2-4 semaines",
    naturalSources: ["Racine d'ashwagandha"],
    efficacyScore: 85,
    cautions: "Déconseillé en cas de maladie auto-immune ou de grossesse",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Stress", "Anxiété", "Troubles du sommeil", "Fatigue"],
    targetGoals: ["Réduire mon stress", "Meilleur sommeil", "Plus d'énergie"],
    categories: ["adaptogen", "stress", "sleep", "hormonal-balance"],
    relatedTerms: ["withania somnifera", "adaptogen", "stress relief"]
  },
  
  "rhodiola": {
    name: "Rhodiola Rosea",
    description: "Plante adaptogène qui combat la fatigue et améliore les performances cognitives",
    category: "Plantes adaptogènes",
    benefits: [
      "Aide à combattre la fatigue",
      "Soutient les performances cognitives",
      "Contribue à réduire le stress",
      "Aide à maintenir l'énergie physique et mentale"
    ],
    scientificBasis: "La Rhodiola a montré des effets positifs sur la réduction de la fatigue mentale et l'amélioration des performances cognitives",
    recommendedDosage: "200-400 mg par jour (extrait standardisé)",
    timeToEffect: "1-3 semaines",
    naturalSources: ["Racine de rhodiola"],
    efficacyScore: 80,
    cautions: "Peut interagir avec certains médicaments, déconseillé en cas de trouble bipolaire",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Fatigue", "Stress", "Anxiété", "Manque de concentration"],
    targetGoals: ["Plus d'énergie", "Réduire mon stress", "Améliorer ma concentration"],
    categories: ["adaptogen", "energy", "cognitive", "stress"],
    relatedTerms: ["golden root", "mental fatigue", "cognitive performance"]
  },
  
  "melatonin": {
    name: "Mélatonine naturelle",
    description: "Hormone qui régule le cycle veille-sommeil, aide à l'endormissement",
    category: "Sommeil",
    benefits: [
      "Aide à réduire le temps d'endormissement",
      "Contribue à atténuer les effets du décalage horaire",
      "Aide à réguler le cycle veille-sommeil",
      "Peut améliorer la qualité du sommeil"
    ],
    scientificBasis: "La mélatonine est une hormone naturellement produite par la glande pinéale qui régule le rythme circadien",
    recommendedDosage: "1-3 mg avant le coucher",
    timeToEffect: "Dès la première prise",
    naturalSources: ["Cerise de Montmorency", "Riz", "Maïs", "Avoine"],
    efficacyScore: 75,
    cautions: "Peut causer de la somnolence, ne pas conduire après la prise",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Troubles du sommeil"],
    targetGoals: ["Meilleur sommeil"],
    categories: ["sleep", "hormonal-balance", "circadian-rhythm"],
    relatedTerms: ["sleep hormone", "circadian rhythm", "jet lag"]
  },
  
  "valerian": {
    name: "Valériane",
    description: "Plante qui favorise l'endormissement et améliore la qualité du sommeil",
    category: "Plantes pour le sommeil",
    benefits: [
      "Aide à l'endormissement",
      "Contribue à améliorer la qualité du sommeil",
      "Aide à réduire l'anxiété légère",
      "Favorise la relaxation"
    ],
    scientificBasis: "La valériane influencerait les niveaux de GABA, un neurotransmetteur calmant dans le cerveau",
    recommendedDosage: "300-600 mg d'extrait avant le coucher",
    timeToEffect: "2-4 semaines",
    naturalSources: ["Racine de valériane"],
    efficacyScore: 70,
    cautions: "Peut interagir avec certains médicaments, éviter l'alcool",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Troubles du sommeil", "Stress", "Anxiété"],
    targetGoals: ["Meilleur sommeil", "Réduire mon stress"],
    categories: ["sleep", "relaxation", "herbal"],
    relatedTerms: ["valeriana officinalis", "sleep aid", "GABA"]
  },
  
  "curcumin": {
    name: "Curcuma et poivre noir",
    description: "Puissant anti-inflammatoire naturel qui soutient la santé digestive et articulaire",
    category: "Anti-inflammatoires naturels",
    benefits: [
      "Propriétés anti-inflammatoires naturelles",
      "Soutient la santé digestive",
      "Aide à maintenir la santé des articulations",
      "Contribue à la protection cellulaire"
    ],
    scientificBasis: "La curcumine, principe actif du curcuma, a démontré des effets anti-inflammatoires comparables à certains médicaments",
    recommendedDosage: "500-1000 mg de curcuma avec 5-10 mg de pipérine",
    timeToEffect: "4-8 semaines",
    naturalSources: ["Racine de curcuma", "Poivre noir"],
    efficacyScore: 75,
    cautions: "Consulter un médecin si sous anticoagulants",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Douleurs articulaires", "Problèmes digestifs"],
    targetGoals: ["Soutenir ma digestion"],
    categories: ["anti-inflammatory", "digestive", "joint-health"],
    relatedTerms: ["turmeric", "curcuminoids", "piperine"]
  },
  
  "coq10": {
    name: "Coenzyme Q10",
    description: "Soutient la production d'énergie cellulaire et possède des propriétés antioxydantes",
    category: "Antioxydants",
    benefits: [
      "Soutient la production d'énergie cellulaire",
      "Propriétés antioxydantes",
      "Contribue à la santé cardiovasculaire",
      "Aide à maintenir les niveaux d'énergie"
    ],
    scientificBasis: "Le CoQ10 est un cofacteur essentiel dans la chaîne de transport d'électrons mitochondriale, impliqué dans la production d'ATP",
    recommendedDosage: "100-200 mg par jour",
    timeToEffect: "4-12 semaines",
    naturalSources: ["Viandes", "Poissons gras", "Légumineuses", "Noix"],
    efficacyScore: 70,
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Fatigue", "Douleurs articulaires"],
    targetGoals: ["Plus d'énergie"],
    categories: ["antioxidant", "energy", "heart-health"],
    relatedTerms: ["ubiquinone", "cellular energy", "mitochondria"]
  },
  
  "ginseng": {
    name: "Ginseng",
    description: "Plante adaptogène qui maintient l'énergie et améliore les performances cognitives",
    category: "Plantes adaptogènes",
    benefits: [
      "Aide à maintenir l'énergie physique et mentale",
      "Soutient les performances cognitives",
      "Contribue au fonctionnement normal du système immunitaire",
      "Aide à maintenir la vitalité"
    ],
    scientificBasis: "Le ginseng contient des ginsénosides qui moduleraient les voies énergétiques et l'adaptation au stress",
    recommendedDosage: "200-400 mg par jour (extrait standardisé)",
    timeToEffect: "4-8 semaines",
    naturalSources: ["Racine de ginseng"],
    efficacyScore: 75,
    cautions: "Déconseillé en cas d'hypertension, peut interagir avec certains médicaments",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Fatigue", "Manque de concentration"],
    targetGoals: ["Plus d'énergie", "Améliorer ma concentration", "Renforcer mon immunité"],
    categories: ["adaptogen", "energy", "cognitive", "immune"],
    relatedTerms: ["panax ginseng", "ginsenosides", "vitality"]
  },
  
  "l_theanine": {
    name: "L-Théanine",
    description: "Acide aminé favorisant la relaxation sans somnolence, améliore la concentration",
    category: "Acides aminés",
    benefits: [
      "Favorise la relaxation sans somnolence",
      "Améliore la concentration et l'attention",
      "Réduit les effets négatifs du stress",
      "Peut améliorer la qualité du sommeil"
    ],
    scientificBasis: "La L-théanine augmente les ondes alpha dans le cerveau, associées à un état de relaxation alerte",
    recommendedDosage: "100-200 mg, 1-2 fois par jour",
    timeToEffect: "30 minutes à 1 heure",
    naturalSources: ["Thé vert", "Thé noir"],
    efficacyScore: 85,
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Stress", "Anxiété", "Troubles du sommeil", "Manque de concentration"],
    targetGoals: ["Réduire mon stress", "Améliorer ma concentration", "Meilleur sommeil"],
    categories: ["relaxation", "cognitive", "stress", "sleep"],
    relatedTerms: ["alpha waves", "focus", "calm alertness"]
  },
  
  "lions_mane": {
    name: "Champignon Crinière de Lion",
    description: "Champignon médicinal qui soutient les fonctions cognitives et la santé neurologique",
    category: "Champignons médicinaux",
    benefits: [
      "Soutient les fonctions cognitives et la mémoire",
      "Favorise la santé du système nerveux",
      "Propriétés neuroprotectrices",
      "Soutient le système immunitaire"
    ],
    scientificBasis: "La crinière de lion contient des composés qui stimulent la production du facteur de croissance nerveux (NGF)",
    recommendedDosage: "500-1000 mg d'extrait par jour",
    timeToEffect: "4-8 semaines",
    naturalSources: ["Champignon crinière de lion"],
    efficacyScore: 75,
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Manque de concentration", "Troubles de la mémoire"],
    targetGoals: ["Améliorer ma concentration"],
    categories: ["cognitive", "brain-health", "mushroom"],
    relatedTerms: ["hericium erinaceus", "NGF", "brain function"]
  },
  
  "alpha_gpc": {
    name: "Alpha-GPC",
    description: "Composé choline qui améliore les fonctions cognitives et la performance mentale",
    category: "Cholinergiques",
    benefits: [
      "Améliore les fonctions cognitives",
      "Soutient la mémoire et l'apprentissage",
      "Favorise la concentration et la clarté mentale",
      "Précurseur de l'acétylcholine, neurotransmetteur important"
    ],
    scientificBasis: "L'alpha-GPC augmente les niveaux d'acétylcholine, un neurotransmetteur crucial pour la mémoire et les fonctions cognitives",
    recommendedDosage: "300-600 mg par jour",
    timeToEffect: "2-4 semaines",
    naturalSources: ["Produits laitiers", "Organes (foie)"],
    efficacyScore: 80,
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien"],
    targetSymptoms: ["Manque de concentration", "Troubles de la mémoire"],
    targetGoals: ["Améliorer ma concentration"],
    categories: ["cognitive", "brain-health", "focus"],
    relatedTerms: ["choline", "acetylcholine", "cognitive enhancer"]
  },
  
  "anti-inflammatory-diet": {
    name: "Alimentation anti-inflammatoire",
    description: "Approche alimentaire qui réduit l'inflammation systémique et améliore la santé globale",
    category: "Approches alimentaires",
    benefits: [
      "Réduit l'inflammation systémique",
      "Soutient la santé digestive",
      "Améliore la santé cardiovasculaire",
      "Favorise l'équilibre énergétique"
    ],
    scientificBasis: "Des études observationnelles montrent une corrélation entre la consommation d'aliments anti-inflammatoires et la réduction des marqueurs inflammatoires sanguins",
    recommendedDosage: "Application quotidienne des principes alimentaires",
    timeToEffect: "2-4 semaines",
    naturalSources: ["Fruits et légumes colorés", "Poissons gras", "Noix et graines", "Huile d'olive", "Épices (curcuma, gingembre)"],
    efficacyScore: 85,
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Douleurs articulaires", "Problèmes digestifs", "Fatigue", "Problèmes de peau"],
    targetGoals: ["Soutenir ma digestion", "Plus d'énergie", "Améliorer ma peau"],
    categories: ["anti-inflammatory", "digestive", "lifestyle", "nutritional-approach"],
    relatedTerms: ["mediterranean diet", "polyphenols", "omega-3:omega-6 ratio"]
  },
  
  "vitamin-d-supplement": {
    name: "Supplément de Vitamine D",
    description: "Un apport quotidien en vitamine D, essentielle pour l'immunité et la santé osseuse",
    category: "Vitamines",
    benefits: [
      "Renforce le système immunitaire",
      "Contribue à la santé osseuse",
      "Améliore l'absorption du calcium",
      "Influence positivement l'humeur"
    ],
    scientificBasis: "Des études cliniques montrent qu'une supplémentation en vitamine D peut réduire le risque d'infections respiratoires de 30% chez les personnes carencées",
    recommendedDosage: "1000-2000 UI par jour",
    timeToEffect: "4-8 semaines",
    naturalSources: ["Exposition au soleil", "Poissons gras", "Jaunes d'œufs"],
    efficacyScore: 90,
    cautions: "La surdose est possible avec des suppléments à forte dose sur le long terme",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Fatigue", "Faiblesse musculaire", "Humeur basse en hiver"],
    targetGoals: ["Renforcer mon immunité", "Optimiser ma santé"],
    categories: ["immunité", "os", "nutrition"],
    relatedTerms: ["vitamin-d"]
  },
  
  "circadian-rhythm-optimization": {
    name: "Optimisation du rythme circadien",
    description: "Stratégies pour synchroniser votre horloge biologique et améliorer la qualité du sommeil",
    category: "Approches de mode de vie",
    benefits: [
      "Améliore la qualité du sommeil",
      "Optimise les niveaux d'énergie",
      "Régule les hormones du stress",
      "Soutient la fonction cognitive"
    ],
    scientificBasis: "La chronobiologie démontre l'importance de l'alignement des rythmes biologiques avec les cycles naturels lumière-obscurité",
    recommendedDosage: "Pratiques quotidiennes spécifiques",
    timeToEffect: "1-3 semaines",
    naturalSources: ["Exposition à la lumière naturelle", "Alimentation chronométrée", "Routines régulières"],
    efficacyScore: 85,
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Troubles du sommeil", "Fatigue", "Irritabilité"],
    targetGoals: ["Meilleur sommeil", "Plus d'énergie", "Réduire mon stress"],
    categories: ["sommeil", "mode de vie", "énergie"],
    relatedTerms: ["horloge biologique", "mélatonine", "photothérapie"]
  },
  
  "mindfulness-meditation": {
    name: "Méditation de pleine conscience",
    description: "Pratique qui réduit le stress et améliore la santé mentale",
    category: "Pratiques mentales",
    benefits: [
      "Réduit les niveaux de stress et d'anxiété",
      "Améliore la concentration et la clarté mentale",
      "Favorise un meilleur sommeil",
      "Renforce la régulation émotionnelle"
    ],
    scientificBasis: "Des études en neurosciences démontrent que la méditation régulière modifie la structure et l'activité cérébrales",
    recommendedDosage: "10-20 minutes quotidiennes",
    timeToEffect: "2-8 semaines de pratique régulière",
    naturalSources: ["Pratique guidée", "Applications", "Cours en ligne ou en personne"],
    efficacyScore: 80,
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Stress", "Anxiété", "Troubles du sommeil", "Ruminations mentales"],
    targetGoals: ["Réduire mon stress", "Meilleur sommeil", "Améliorer ma concentration"],
    categories: ["mental", "stress", "bien-être"],
    relatedTerms: ["méditation", "pleine conscience", "réduction du stress"]
  },
  
  "intermittent-fasting": {
    name: "Jeûne intermittent",
    description: "Approche alimentaire qui alterne périodes de jeûne et d'alimentation pour optimiser le métabolisme",
    category: "Approches de nutrition",
    benefits: [
      "Favorise l'équilibre métabolique",
      "Soutient la gestion du poids",
      "Améliore la sensibilité à l'insuline",
      "Stimule l'autophagie cellulaire"
    ],
    scientificBasis: "Des recherches indiquent que le jeûne intermittent peut déclencher des processus de réparation cellulaire et améliorer les marqueurs métaboliques",
    recommendedDosage: "Fenêtre de jeûne de 14-18h par 24h",
    timeToEffect: "2-4 semaines",
    naturalSources: ["Protocoles 16/8, 5:2, ou autres approches personnalisées"],
    efficacyScore: 85,
    cautions: "Non recommandé pour les personnes souffrant de certains troubles alimentaires ou conditions médicales",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Problèmes de poids", "Fatigue après les repas", "Fringales"],
    targetGoals: ["Équilibrer mon poids", "Plus d'énergie", "Optimiser ma santé"],
    categories: ["métabolisme", "poids", "longévité"],
    relatedTerms: ["autophagie", "cétose", "fenêtre alimentaire"]
  },
  
  "berberine": {
    name: "Berbérine",
    description: "Composé végétal qui améliore le métabolisme du glucose et la santé cardiovasculaire",
    category: "Composés végétaux",
    benefits: [
      "Soutient le métabolisme du glucose",
      "Contribue à l'équilibre lipidique",
      "Favorise la santé intestinale",
      "Propriétés anti-inflammatoires"
    ],
    scientificBasis: "Des études cliniques montrent que la berbérine peut améliorer la sensibilité à l'insuline et les marqueurs lipidiques",
    recommendedDosage: "500-1500 mg par jour, répartis en plusieurs prises",
    timeToEffect: "4-8 semaines",
    naturalSources: ["Épine-vinette", "Hydraste du Canada", "Coptis chinois"],
    efficacyScore: 80,
    cautions: "Peut interagir avec certains médicaments, consulter un professionnel de santé",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Déséquilibres métaboliques", "Problèmes digestifs"],
    targetGoals: ["Équilibrer mon poids", "Optimiser ma santé"],
    categories: ["métabolisme", "digestion", "cardiovasculaire"],
    relatedTerms: ["AMPK", "métabolisme du glucose", "insuline"]
  },
  
  "nutrient-timing": {
    name: "Chrononutrition",
    description: "Optimisation des moments de prise alimentaire pour maximiser les bénéfices métaboliques",
    category: "Approches de nutrition",
    benefits: [
      "Optimise l'utilisation des nutriments",
      "Améliore les performances physiques",
      "Soutient la récupération musculaire",
      "Favorise un meilleur sommeil"
    ],
    scientificBasis: "La chronobiologie nutritionnelle démontre que le timing des repas affecte le métabolisme, l'insuline et l'expression génique",
    recommendedDosage: "Adaptation personnalisée des horaires alimentaires",
    timeToEffect: "2-3 semaines",
    naturalSources: ["Ajustement des repas selon le rythme circadien et l'activité"],
    efficacyScore: 75,
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Fatigue", "Récupération lente", "Troubles du sommeil"],
    targetGoals: ["Plus d'énergie", "Équilibrer mon poids", "Optimiser ma santé"],
    categories: ["nutrition", "métabolisme", "performance"],
    relatedTerms: ["chrononutrition", "fenêtre anabolique", "métabolisme"]
  },
  
  "micronutrient-assessment": {
    name: "Évaluation des micronutriments",
    description: "Analyse personnalisée des besoins en vitamines et minéraux pour une nutrition optimale",
    category: "Approches diagnostiques",
    benefits: [
      "Identifie les carences spécifiques",
      "Permet une supplémentation ciblée",
      "Optimise le fonctionnement cellulaire",
      "Soutient l'énergie et la vitalité"
    ],
    scientificBasis: "Des études montrent que les carences subcliniques en micronutriments sont courantes et affectent de nombreuses fonctions physiologiques",
    recommendedDosage: "Évaluation initiale suivie de supplémentation personnalisée",
    timeToEffect: "Varie selon les carences identifiées",
    naturalSources: ["Analyses sanguines avancées", "Analyses capillaires", "Questionnaires spécialisés"],
    efficacyScore: 90,
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Fatigue chronique", "Problèmes de peau/cheveux", "Système immunitaire affaibli"],
    targetGoals: ["Optimiser ma santé", "Plus d'énergie", "Renforcer mon immunité"],
    categories: ["nutrition", "prévention", "personnalisation"],
    relatedTerms: ["oligoscan", "spectrométrie", "médecine fonctionnelle"]
  },
  
  "omega3-supplementation": {
    name: "Supplémentation en Oméga-3",
    description: "Apport équilibré en acides gras essentiels pour la santé cardiovasculaire et cérébrale",
    category: "Acides gras essentiels",
    benefits: [
      "Soutient la santé cardiovasculaire",
      "Favorise les fonctions cognitives optimales",
      "Possède des propriétés anti-inflammatoires",
      "Contribue à la santé cellulaire"
    ],
    scientificBasis: "De nombreuses études démontrent les bénéfices des EPA et DHA sur l'inflammation et la fonction cérébrale",
    recommendedDosage: "1000-2000 mg combinés d'EPA et DHA par jour",
    timeToEffect: "3-6 mois pour les effets complets",
    naturalSources: ["Poissons gras", "Algues marines", "Huiles dérivées d'algues (pour végans)"],
    efficacyScore: 85,
    cautions: "Consultez un médecin si vous prenez des anticoagulants",
    compatibleDiets: ["Omnivore", "Flexitarien", "Pescetarien", "Végétarien", "Végan"],
    targetSymptoms: ["Inflammation chronique", "Clarté mentale réduite", "Sécheresse cutanée"],
    targetGoals: ["Améliorer ma concentration", "Réduire mon stress", "Optimiser ma santé"],
    categories: ["cerveau", "cœur", "anti-inflammatoire"],
    relatedTerms: ["EPA", "DHA", "acides gras essentiels"]
  }
};

export { SUPPLEMENT_CATALOG };
export default SUPPLEMENT_CATALOG;
