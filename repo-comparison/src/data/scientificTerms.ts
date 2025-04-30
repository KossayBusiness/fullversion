
export interface ScientificTerm {
  id?: string;
  term: string;
  title?: string;
  definition: string;
  description?: string;
  category?: string;
  source?: string;
  relatedTerms?: string[];
}

export const scientificTerms: ScientificTerm[] = [
  {
    id: "vitamin-d",
    term: "Vitamine D",
    title: "Vitamine D",
    definition: "Hormone stéroïde essentielle pour l'absorption du calcium, la fonction immunitaire et la santé osseuse.",
    category: "micronutriment",
    relatedTerms: ["calcium", "sunshine-vitamin"]
  },
  {
    id: "microbiome",
    term: "Microbiome intestinal",
    title: "Microbiome intestinal",
    definition: "Écosystème complexe de bactéries, virus et autres micro-organismes présents dans le tractus digestif humain.",
    category: "système-digestif",
    relatedTerms: ["probiotics", "prebiotics"]
  },
  {
    id: "probiotics",
    term: "Probiotiques",
    title: "Probiotiques",
    definition: "Micro-organismes vivants qui, lorsqu'ils sont administrés en quantités adéquates, confèrent un bénéfice pour la santé.",
    category: "supplément",
    relatedTerms: ["gut-health", "microbiome"]
  },
  {
    id: "inflammation",
    term: "Inflammation chronique",
    title: "Inflammation chronique",
    definition: "Réponse inflammatoire persistante de l'organisme qui peut contribuer à diverses maladies chroniques.",
    category: "processus-physiologique",
    relatedTerms: ["cytokines", "immune-system"]
  },
  {
    id: "antioxidant",
    term: "Antioxydants",
    title: "Antioxydants",
    definition: "Substances qui peuvent neutraliser les radicaux libres et réduire les dommages oxydatifs dans les cellules.",
    category: "biochimie",
    relatedTerms: ["free-radicals", "oxidative-stress"]
  },
  {
    id: "circadian-rhythm",
    term: "Rythme circadien",
    title: "Rythme circadien",
    definition: "Horloge biologique interne qui régule les cycles de sommeil-éveil et de nombreux processus physiologiques sur une période de 24 heures.",
    category: "chronobiologie",
    relatedTerms: ["melatonin", "sleep-wake-cycle"]
  },
  {
    id: "cortisol",
    term: "Cortisol",
    title: "Cortisol",
    definition: "Hormone stéroïde produite par les glandes surrénales, impliquée dans la réponse au stress et la régulation du métabolisme.",
    category: "hormone",
    relatedTerms: ["stress-hormone", "hpa-axis"]
  },
  {
    id: "adaptogens",
    term: "Adaptogènes",
    title: "Adaptogènes",
    definition: "Substances naturelles qui aident l'organisme à s'adapter au stress et à retrouver l'équilibre.",
    category: "phytothérapie",
    relatedTerms: ["stress-response", "homeostasis"]
  },
  {
    id: "bioavailability",
    term: "Biodisponibilité",
    title: "Biodisponibilité",
    definition: "Proportion d'un nutriment ou d'une substance qui est absorbée et utilisée par l'organisme.",
    category: "pharmacologie",
    relatedTerms: ["absorption", "metabolism"]
  },
  {
    id: "rda",
    term: "Apports journaliers recommandés",
    title: "Apports journaliers recommandés",
    definition: "Quantité moyenne quotidienne d'un nutriment nécessaire pour répondre aux besoins de la plupart des individus en bonne santé.",
    category: "nutrition",
    relatedTerms: ["dietary-reference-intakes", "nutritional-requirements"]
  },
  {
    term: "adaptogène",
    definition: "Substance naturelle qui aide l'organisme à s'adapter au stress et à normaliser les fonctions physiologiques.",
    category: "phytothérapie",
  },
  {
    term: "antioxydant",
    definition: "Molécule qui neutralise les radicaux libres, protégeant ainsi les cellules contre les dommages oxydatifs.",
    category: "biochimie",
  },
  {
    term: "biodisponibilité",
    definition: "Fraction d'une substance administrée qui atteint la circulation sanguine et peut exercer son effet biologique.",
    category: "pharmacologie",
  },
  {
    term: "double aveugle",
    definition: "Méthode d'étude où ni les participants ni les chercheurs ne savent qui reçoit le traitement actif ou le placebo.",
    category: "méthodologie",
  },
  {
    term: "immunomodulateur",
    definition: "Substance qui modifie (stimule ou supprime) l'activité du système immunitaire.",
    category: "immunologie",
  },
  {
    term: "microbiome",
    definition: "Ensemble des micro-organismes (bactéries, virus, champignons) et de leurs gènes qui vivent dans un environnement spécifique comme l'intestin.",
    category: "microbiologie",
  },
  {
    term: "étude randomisée contrôlée",
    definition: "Type d'étude scientifique où les participants sont répartis au hasard entre différents groupes de traitement pour minimiser les biais.",
    category: "méthodologie",
    source: "PubMed",
  },
  {
    term: "placebo",
    definition: "Substance sans effet thérapeutique mais présentée comme un médicament actif pour évaluer les effets psychologiques du traitement.",
    category: "méthodologie",
  },
  {
    term: "synergie",
    definition: "Interaction de plusieurs éléments qui, ensemble, produisent un effet total supérieur à la somme des effets individuels.",
    category: "pharmacologie",
  },
  {
    term: "phytonutriment",
    definition: "Composé bioactif présent dans les plantes qui a des effets bénéfiques sur la santé sans être essentiel à la vie.",
    category: "nutrition",
  },
  {
    term: "biomarqueur",
    definition: "Caractéristique biologique mesurable liée à un processus normal ou pathologique, utilisée pour évaluer l'état de santé.",
    category: "diagnostic",
  },
  {
    term: "méta-analyse",
    definition: "Méthode statistique combinant les résultats de plusieurs études indépendantes pour obtenir une estimation plus précise d'un effet.",
    category: "méthodologie",
    source: "Cochrane Library",
  },
];

export default scientificTerms;
