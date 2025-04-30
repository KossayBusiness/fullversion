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
    term: "Vitamin D",
    title: "Vitamin D",
    definition: "Essential steroid hormone for calcium absorption, immune function, and bone health.",
    category: "micronutrient",
    relatedTerms: ["calcium", "sunshine-vitamin"]
  },
  {
    id: "microbiome",
    term: "Gut Microbiome",
    title: "Gut Microbiome",
    definition: "Complex ecosystem of bacteria, viruses, and other microorganisms present in the human digestive tract.",
    category: "digestive-system",
    relatedTerms: ["probiotics", "prebiotics"]
  },
  {
    id: "probiotics",
    term: "Probiotics",
    title: "Probiotics",
    definition: "Live microorganisms that, when administered in adequate amounts, confer a health benefit.",
    category: "supplement",
    relatedTerms: ["gut-health", "microbiome"]
  },
  {
    id: "inflammation",
    term: "Chronic Inflammation",
    title: "Chronic Inflammation",
    definition: "Persistent inflammatory response of the body that can contribute to various chronic diseases.",
    category: "physiological-process",
    relatedTerms: ["cytokines", "immune-system"]
  },
  {
    id: "antioxidant",
    term: "Antioxidants",
    title: "Antioxidants",
    definition: "Substances that can neutralize free radicals and reduce oxidative damage in cells.",
    category: "biochemistry",
    relatedTerms: ["free-radicals", "oxidative-stress"]
  },
  {
    id: "circadian-rhythm",
    term: "Circadian Rhythm",
    title: "Circadian Rhythm",
    definition: "Internal biological clock that regulates sleep-wake cycles and many physiological processes over a 24-hour period.",
    category: "chronobiology",
    relatedTerms: ["melatonin", "sleep-wake-cycle"]
  },
  {
    id: "cortisol",
    term: "Cortisol",
    title: "Cortisol",
    definition: "Steroid hormone produced by the adrenal glands, involved in stress response and metabolism regulation.",
    category: "hormone",
    relatedTerms: ["stress-hormone", "hpa-axis"]
  },
  {
    id: "adaptogens",
    term: "Adaptogens",
    title: "Adaptogens",
    definition: "Natural substances that help the body adapt to stress and restore balance.",
    category: "phytotherapy",
    relatedTerms: ["stress-response", "homeostasis"]
  },
  {
    id: "bioavailability",
    term: "Bioavailability",
    title: "Bioavailability",
    definition: "Proportion of a nutrient or substance that is absorbed and used by the body.",
    category: "pharmacology",
    relatedTerms: ["absorption", "metabolism"]
  },
  {
    id: "rda",
    term: "Recommended Daily Allowance",
    title: "Recommended Daily Allowance",
    definition: "Average daily amount of a nutrient needed to meet the requirements of most healthy individuals.",
    category: "nutrition",
    relatedTerms: ["dietary-reference-intakes", "nutritional-requirements"]
  },
  {
    term: "adaptogen",
    definition: "Natural substance that helps the body adapt to stress and normalize physiological functions.",
    category: "phytotherapy",
  },
  {
    term: "antioxidant",
    definition: "Molecule that neutralizes free radicals, thus protecting cells against oxidative damage.",
    category: "biochemistry",
  },
  {
    term: "bioavailability",
    definition: "Fraction of an administered substance that reaches the bloodstream and can exert its biological effect.",
    category: "pharmacology",
  },
  {
    term: "double blind",
    definition: "Study method where neither participants nor researchers know who is receiving the active treatment or placebo.",
    category: "methodology",
  },
  {
    term: "immunomodulator",
    definition: "Substance that modifies (stimulates or suppresses) the activity of the immune system.",
    category: "immunology",
  },
  {
    term: "microbiome",
    definition: "Collection of microorganisms (bacteria, viruses, fungi) and their genes that live in a specific environment like the intestine.",
    category: "microbiology",
  },
  {
    term: "randomized controlled trial",
    definition: "Type of scientific study where participants are randomly assigned to different treatment groups to minimize bias.",
    category: "methodology",
    source: "PubMed",
  },
  {
    term: "placebo",
    definition: "Substance with no therapeutic effect but presented as an active medication to evaluate the psychological effects of treatment.",
    category: "methodology",
  },
  {
    term: "synergy",
    definition: "Interaction of multiple elements that, together, produce a total effect greater than the sum of individual effects.",
    category: "pharmacology",
  },
  {
    term: "phytonutrient",
    definition: "Bioactive compound present in plants that has beneficial health effects without being essential to life.",
    category: "nutrition",
  },
  {
    term: "biomarker",
    definition: "Measurable biological characteristic linked to a normal or pathological process, used to assess health status.",
    category: "diagnostics",
  },
  {
    term: "meta-analysis",
    definition: "Statistical method combining results from multiple independent studies to obtain a more precise estimate of an effect.",
    category: "methodology",
    source: "Cochrane Library",
  },
];

export default scientificTerms;
