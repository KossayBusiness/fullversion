
/**
 * Mappages entre symptômes, objectifs et suppléments recommandés
 * Ce fichier définit les relations entre les problèmes de santé et les solutions nutritionnelles
 */

// Mappages des symptômes vers les catégories
export const SYMPTOM_CATEGORIES = {
  "Fatigue": ["energy", "nutrition"],
  "Troubles du sommeil": ["sleep", "relaxation"],
  "Stress": ["stress", "relaxation", "mood"],
  "Anxiété": ["mood", "relaxation"],
  "Problèmes digestifs": ["digestion", "gut-health"],
  "Douleurs articulaires": ["joints", "anti-inflammatory"],
  "Problèmes de peau": ["skin", "antioxidant"],
  "Cheveux cassants": ["hair", "nutrition"],
  "Système immunitaire faible": ["immune", "antioxidant"],
  "Troubles de la concentration": ["brain", "cognitive"],
  "Problèmes hormonaux": ["hormonal", "balance"]
};

// Mappages des symptômes vers les suppléments recommandés
export const SYMPTOM_RECOMMENDATIONS = {
  "Fatigue": ["vitamin_b_complex", "iron", "coq10", "vitamin_c", "vitamin_d3"],
  "Troubles du sommeil": ["magnesium_glycinate", "melatonin", "l_theanine", "ashwagandha"],
  "Stress": ["ashwagandha", "l_theanine", "magnesium_glycinate", "rhodiola"],
  "Anxiété": ["ashwagandha", "l_theanine", "magnesium_glycinate", "rhodiola"],
  "Problèmes digestifs": ["probiotics", "magnesium_glycinate", "anti-inflammatory-diet"],
  "Douleurs articulaires": ["curcumin", "omega3", "vitamin_d3"],
  "Problèmes de peau": ["vitamin_c", "omega3", "zinc", "probiotics"],
  "Cheveux cassants": ["vitamin_b_complex", "zinc", "iron"],
  "Système immunitaire faible": ["vitamin_c", "vitamin_d3", "zinc", "probiotics"],
  "Troubles de la concentration": ["omega3", "vitamin_b_complex", "l_theanine", "lions_mane", "alpha_gpc"],
  "Problèmes hormonaux": ["vitamin_d3", "magnesium_glycinate", "omega3", "ashwagandha"]
};

// Mappages des objectifs vers les suppléments recommandés
export const GOAL_RECOMMENDATIONS = {
  "Meilleur sommeil": ["magnesium_glycinate", "melatonin", "l_theanine", "circadian-rhythm-optimization"],
  "Réduire mon stress": ["ashwagandha", "rhodiola", "l_theanine", "mindfulness-meditation"],
  "Plus d'énergie": ["vitamin_b_complex", "iron", "coq10", "vitamin_c"],
  "Renforcer mon immunité": ["vitamin_c", "vitamin_d3", "zinc", "probiotics"],
  "Soutenir ma digestion": ["probiotics", "anti-inflammatory-diet", "magnesium_glycinate"],
  "Améliorer ma concentration": ["omega3", "vitamin_b_complex", "l_theanine", "lions_mane", "alpha_gpc"],
  "Équilibrer mes hormones": ["vitamin_d3", "magnesium_glycinate", "omega3", "ashwagandha"],
  "Améliorer ma peau": ["vitamin_c", "omega3", "zinc", "anti-inflammatory-diet"],
  "Équilibrer mon poids": ["intermittent-fasting", "berberine", "magnesium_glycinate", "nutrient-timing"],
  "Optimiser ma santé globale": ["micronutrient-assessment", "vitamin_d3", "magnesium_glycinate", "omega3-supplementation", "probiotics"]
};

// Mappages des habitudes de vie vers les suppléments recommandés
export const LIFESTYLE_RECOMMENDATIONS = {
  "Sédentaire": ["vitamin_d3", "magnesium_glycinate", "vitamin_b_complex"],
  "Actif": ["magnesium_glycinate", "vitamin_c", "coq10"],
  "Très actif": ["magnesium_glycinate", "vitamin_b_complex", "vitamin_c", "zinc", "coq10"],
  "Alimentation végétarienne": ["vitamin_b12", "iron", "vitamin_d3", "omega3"],
  "Alimentation végane": ["vitamin_b12", "vitamin_d3", "iron", "omega3_vegan", "zinc"],
  "Stress chronique": ["ashwagandha", "rhodiola", "magnesium_glycinate", "vitamin_b_complex"],
  "Troubles du sommeil": ["magnesium_glycinate", "melatonin", "l_theanine"]
};

// Facteurs d'âge pour l'ajustement des recommandations
export const AGE_FACTORS = {
  "18-30": {
    "vitamin_d3": 0.8,
    "vitamin_b_complex": 0.9,
    "magnesium_glycinate": 0.9,
    "probiotics": 1.0,
    "ashwagandha": 1.1
  },
  "31-45": {
    "vitamin_d3": 1.0,
    "vitamin_b_complex": 1.0,
    "magnesium_glycinate": 1.0,
    "coq10": 1.1,
    "probiotics": 1.0
  },
  "46-60": {
    "vitamin_d3": 1.2,
    "vitamin_b_complex": 1.1,
    "magnesium_glycinate": 1.1,
    "coq10": 1.2,
    "omega3": 1.2
  },
  "60+": {
    "vitamin_d3": 1.3,
    "vitamin_b_complex": 1.2,
    "magnesium_glycinate": 1.2,
    "coq10": 1.3,
    "omega3": 1.3
  }
};

// Facteurs de genre pour l'ajustement des recommandations
export const GENDER_FACTORS = {
  "Homme": {
    "zinc": 1.1,
    "vitamin_b_complex": 1.0,
    "magnesium_glycinate": 1.1
  },
  "Femme": {
    "iron": 1.2,
    "vitamin_d3": 1.1,
    "calcium": 1.1
  }
};

// Facteurs de priorité des symptômes
export const SYMPTOM_PRIORITY_FACTORS = {
  "Fatigue": 1.2,
  "Troubles du sommeil": 1.2,
  "Stress": 1.1,
  "Anxiété": 1.1,
  "Problèmes digestifs": 1.0,
  "Douleurs articulaires": 1.0,
  "Problèmes de peau": 0.9,
  "Cheveux cassants": 0.9,
  "Système immunitaire faible": 1.1
};
