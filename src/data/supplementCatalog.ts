
/**
 * Comprehensive catalog of supplements with detailed scientific information
 * This data is used to enrich recommendations with evidence-based details
 */

export interface SupplementInfo {
  name: string;
  scientificName?: string;
  description: string;
  category: string;
  standardDose: string;
  minDose?: number;
  maxDose?: number;
  dosePerWeight?: number;
  timeToEffect: string;
  efficacyPhases?: any[];
  benefits: string[];
  mechanismOfAction?: string;
  scientificBasis: string;
  scientificStudies?: {
    authors: string;
    year: number;
    title: string;
    journal: string;
    findings: string;
    doi?: string;
  }[];
  contraindications?: string[];
  drugInteractions?: string[];
  naturalSources: string[];
  dietaryRecommendations?: string;
  minimumActiveIngredient?: string;
  efficacyScore?: number;
  compatibleDiets?: string[];
  targetSymptoms?: string[];
  targetGoals?: string[];
  categories?: string[];
  relatedTerms?: string[];
  absorptionFactors?: string;
  efficacyTimeline?: string;
  recommendedDosage?: string;
  cautions?: string;
  femaleSpecificCautions?: string;
  interactions?: string;
  biochemicalMechanism?: string;
  modeOfAction?: string;
  id?: string;
}

// Enhanced database of nutritional supplements
// Each entry contains detailed information and scientific references
export const SUPPLEMENT_CATALOG: Record<string, SupplementInfo> = {
  "vitamin-d-supplement": {
    name: "Vitamin D3",
    scientificName: "Cholecalciferol",
    description: "Essential fat-soluble vitamin for bone health, immune function, and neurological health",
    category: "Vitamins",
    standardDose: "1000-2000 IU daily",
    minDose: 600,
    maxDose: 4000,
    dosePerWeight: 25, // IU per kg of body weight
    timeToEffect: "4-8 weeks to reach optimal blood levels",
    efficacyPhases: [
      {
        stage: 1,
        timing: "2-4 weeks",
        effects: "Beginning of blood level improvement"
      },
      {
        stage: 2,
        timing: "1-3 months",
        effects: "Improvement in immune function"
      },
      {
        stage: 3,
        timing: "3-6 months",
        effects: "Optimal benefits for bone health and mood"
      }
    ],
    benefits: [
      "Strengthens the immune system",
      "Improves bone and dental health",
      "Supports neurological function",
      "Regulates mood and reduces depression risk",
      "Improves muscle strength"
    ],
    mechanismOfAction: "Vitamin D3 is converted to its active form, calcitriol, which acts as a hormone and regulates over 200 genes in the body. It promotes intestinal absorption of calcium and phosphorus, essential for bone health.",
    scientificBasis: "Multiple clinical trials show that vitamin D supplementation enhances immune function and bone health, particularly in deficient individuals.",
    scientificStudies: [
      {
        authors: "Martineau AR, et al.",
        year: 2017,
        title: "Vitamin D supplementation to prevent acute respiratory tract infections: systematic review and meta-analysis of individual participant data",
        journal: "BMJ",
        findings: "Vitamin D supplementation reduced risk of acute respiratory infections by 12% overall and by 70% in those with severe deficiency",
        doi: "10.1136/bmj.i6583"
      },
      {
        authors: "Bouillon R, et al.",
        year: 2019,
        title: "Skeletal and extraskeletal actions of vitamin D: Current evidence and outstanding questions",
        journal: "Endocrine Reviews",
        findings: "Strong evidence supports vitamin D's role in calcium metabolism and bone health, with emerging evidence for extra-skeletal effects",
        doi: "10.1210/er.2018-00126"
      }
    ],
    contraindications: [
      "Hypercalcemia",
      "Hyperparathyroidism",
      "Sarcoidosis",
      "Certain lymphomas"
    ],
    drugInteractions: [
      "Corticosteroids (reduce absorption)",
      "Cholestyramine (reduces absorption)",
      "Anticonvulsants (increase metabolism)",
      "Statins (may affect vitamin D metabolism)"
    ],
    naturalSources: ["Sunlight exposure", "Fatty fish", "Egg yolks", "Fortified dairy products", "Mushrooms"],
    dietaryRecommendations: "Include vitamin D-rich foods or consider supplementation, especially in winter months or if sun exposure is limited",
    minimumActiveIngredient: "400 IU (10 mcg) daily",
    efficacyScore: 92,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan (D2 form)"],
    targetSymptoms: ["Fatigue", "Weak immune system", "Bone pain", "Mood fluctuations", "Muscle weakness"],
    targetGoals: ["Immune support", "Bone health", "Energy improvement", "Mood regulation"],
    categories: ["essential_vitamins", "immunity", "bone_health", "mood_support"],
    relatedTerms: ["sunshine vitamin", "calciferol", "calcidiol", "calcitriol", "rickets", "osteomalacia"],
    absorptionFactors: "Fat-soluble - absorption is enhanced when taken with fatty meals. Individuals with fat malabsorption conditions may need higher doses."
  },
  
  "magnesium-glycinate": {
    name: "Magnesium Glycinate",
    scientificName: "Magnesium bisglycinate",
    description: "Highly bioavailable form of magnesium bound to glycine for enhanced absorption and reduced digestive effects",
    category: "Minerals",
    standardDose: "300-400 mg elemental magnesium daily",
    minDose: 200,
    maxDose: 600,
    timeToEffect: "2-4 weeks for full benefits",
    efficacyPhases: [
      {
        stage: 1,
        timing: "3-7 days",
        effects: "Initial improvement in sleep quality"
      },
      {
        stage: 2,
        timing: "1-2 weeks",
        effects: "Reduction in muscle tension and cramps"
      },
      {
        stage: 3,
        timing: "2-4 weeks",
        effects: "Optimal benefits for stress reduction and mood"
      }
    ],
    benefits: [
      "Supports over 300 enzymatic reactions in the body",
      "Improves sleep quality and duration",
      "Reduces muscle tension and cramps",
      "Supports stress reduction and mood regulation",
      "Helps maintain normal heart rhythm",
      "Supports cognitive function"
    ],
    mechanismOfAction: "Magnesium acts as a cofactor in over 300 enzymatic reactions and is crucial for energy production, muscle function, nerve signaling, and DNA synthesis. Glycine binding enhances absorption and blood-brain barrier penetration.",
    scientificBasis: "Clinical studies demonstrate magnesium's effectiveness for sleep improvement, stress reduction, and muscle relaxation. The glycinate form shows superior absorption with reduced gastrointestinal side effects.",
    scientificStudies: [
      {
        authors: "Abbasi B, et al.",
        year: 2012,
        title: "The effect of magnesium supplementation on primary insomnia in elderly: A double-blind placebo-controlled clinical trial",
        journal: "Journal of Research in Medical Sciences",
        findings: "Significant improvement in sleep efficiency, sleep time, and sleep onset latency, along with increased serum melatonin and reduced cortisol levels",
        doi: "10.1016/j.jpsychires.2018.04.002"
      },
      {
        authors: "Tarleton EK, et al.",
        year: 2017,
        title: "Role of magnesium supplementation in the treatment of depression: A randomized clinical trial",
        journal: "PLoS One",
        findings: "Significant improvement in depression symptoms with 248 mg of elemental magnesium daily",
        doi: "10.1371/journal.pone.0180067"
      }
    ],
    contraindications: [
      "Kidney failure (severe)",
      "Myasthenia gravis (high doses)",
      "Heart block",
      "Extremely slow heart rate"
    ],
    drugInteractions: [
      "Antibiotics (tetracyclines, fluoroquinolones)",
      "Bisphosphonates",
      "Diuretics (some increase, others decrease magnesium)",
      "Proton pump inhibitors"
    ],
    naturalSources: ["Dark leafy greens", "Nuts and seeds", "Whole grains", "Legumes", "Dark chocolate"],
    dietaryRecommendations: "Consume magnesium-rich foods daily. Consider supplements if diet is insufficient or during periods of high stress",
    minimumActiveIngredient: "200 mg elemental magnesium",
    efficacyScore: 90,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan"],
    targetSymptoms: ["Sleep issues", "Stress", "Anxiety", "Muscle cramps", "Fatigue", "Constipation"],
    targetGoals: ["Stress management", "Better sleep", "Muscle recovery", "Energy improvement"],
    categories: ["essential_minerals", "sleep_support", "stress_management", "muscle_health"],
    relatedTerms: ["mineral cofactor", "NMDA antagonist", "muscle relaxant", "electrolyte balance"],
    absorptionFactors: "Glycinate form has superior absorption compared to oxide or citrate forms. Best taken in divided doses throughout the day for optimal absorption."
  },
  
  "omega3-supplementation": {
    name: "Omega-3 Fatty Acids",
    scientificName: "Eicosapentaenoic acid (EPA) and Docosahexaenoic acid (DHA)",
    description: "Essential polyunsaturated fatty acids with powerful anti-inflammatory properties and critical roles in brain and cardiovascular health",
    category: "Essential Fatty Acids",
    standardDose: "1000-2000 mg combined EPA and DHA daily",
    minDose: 500,
    maxDose: 4000, 
    timeToEffect: "4-12 weeks for full benefits",
    efficacyPhases: [
      {
        stage: 1,
        timing: "1-4 weeks",
        effects: "Initial reduction in inflammatory markers"
      },
      {
        stage: 2,
        timing: "4-8 weeks",
        effects: "Improvements in lipid profiles and mood"
      },
      {
        stage: 3,
        timing: "8-12 weeks+",
        effects: "Optimal cognitive and cardiovascular benefits"
      }
    ],
    benefits: [
      "Reduces inflammation throughout the body",
      "Supports brain health and cognitive function",
      "Promotes cardiovascular health and healthy cholesterol levels",
      "Improves mood stability and mental health",
      "Supports eye health and retinal function",
      "Contributes to healthy skin"
    ],
    mechanismOfAction: "EPA and DHA are incorporated into cell membranes, influencing membrane fluidity and cell signaling. They compete with arachidonic acid, reducing pro-inflammatory eicosanoid production. They also activate anti-inflammatory resolvin and protectin pathways.",
    scientificBasis: "Extensive research demonstrates omega-3's effectiveness for reducing inflammation, improving cardiovascular outcomes, and supporting brain health across the lifespan.",
    scientificStudies: [
      {
        authors: "Mozaffarian D, et al.",
        year: 2013,
        title: "Plasma phospholipid long-chain ω-3 fatty acids and total and cause-specific mortality in older adults",
        journal: "Annals of Internal Medicine",
        findings: "Higher circulating levels of omega-3 PUFA were associated with lower total mortality, especially coronary heart disease death",
        doi: "10.7326/0003-4819-158-7-201304020-00003"
      },
      {
        authors: "Liao Y, et al.",
        year: 2019,
        title: "Efficacy of omega-3 PUFAs in depression: A meta-analysis",
        journal: "Translational Psychiatry",
        findings: "Omega-3 supplements with EPA ≥ 60% demonstrated clinical benefits in treating depression",
        doi: "10.1038/s41398-019-0515-5"
      }
    ],
    contraindications: [
      "Bleeding disorders",
      "Planned surgery (within 2 weeks)",
      "Fish or shellfish allergies (for marine-sourced products)"
    ],
    drugInteractions: [
      "Anticoagulants and antiplatelets",
      "Blood pressure medications",
      "Some chemotherapy drugs",
      "Vitamin E supplements (additive blood-thinning effect)"
    ],
    naturalSources: ["Fatty fish (salmon, mackerel, sardines)", "Flaxseeds", "Chia seeds", "Walnuts", "Algae (DHA)"],
    dietaryRecommendations: "Consume fatty fish 2-3 times weekly, or supplement if dietary intake is insufficient. Vegetarians and vegans should consider algae-derived DHA/EPA",
    minimumActiveIngredient: "500 mg combined EPA + DHA daily",
    efficacyScore: 88,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian (algae source)", "Vegan (algae source)"],
    targetSymptoms: ["Inflammation", "Mood fluctuations", "Joint pain", "Dry skin", "Cognitive fog", "Cardiovascular concerns"],
    targetGoals: ["Inflammation reduction", "Brain health", "Heart health", "Mood stability", "Skin health"],
    categories: ["anti_inflammatory", "brain_health", "heart_health", "joint_support"],
    relatedTerms: ["fish oil", "EPA", "DHA", "PUFA", "essential fatty acids", "brain food"],
    absorptionFactors: "Fat-soluble - absorption enhanced when taken with meals containing fat. Emulsified or triglyceride forms have superior bioavailability compared to ethyl ester forms."
  },
  
  "vitamin_b_complex": {
    name: "Vitamin B Complex",
    scientificName: "B vitamins (B1, B2, B3, B5, B6, B7, B9, B12)",
    description: "Essential water-soluble vitamins critical for energy metabolism, nervous system function, and cellular health",
    category: "Vitamins",
    standardDose: "Varies by specific B vitamin (typically 100% DV of each)",
    timeToEffect: "2-4 weeks for full benefits",
    efficacyPhases: [
      {
        stage: 1,
        timing: "3-7 days",
        effects: "Initial improvement in energy levels"
      },
      {
        stage: 2,
        timing: "1-2 weeks",
        effects: "Enhanced mental clarity and stress response"
      },
      {
        stage: 3,
        timing: "2-4 weeks",
        effects: "Optimal benefits for nervous system and cellular health"
      }
    ],
    benefits: [
      "Supports energy production and metabolism",
      "Promotes healthy nervous system function",
      "Supports cognitive function and mental clarity",
      "Aids in stress management and mood regulation",
      "Supports healthy skin, hair, and nails",
      "Essential for red blood cell formation and oxygen transport"
    ],
    mechanismOfAction: "B vitamins function as coenzymes in numerous metabolic processes including energy production, neurotransmitter synthesis, DNA repair, methylation processes, and homocysteine metabolism.",
    scientificBasis: "Research demonstrates B vitamins' crucial roles in cellular metabolism, neurological function, and energy production. Deficiencies are linked to various health issues including fatigue, cognitive impairment, and mood disorders.",
    scientificStudies: [
      {
        authors: "Kennedy DO, et al.",
        year: 2016,
        title: "Effects of high-dose B vitamin complex with vitamin C and minerals on subjective mood and performance in healthy males",
        journal: "Psychopharmacology",
        findings: "B vitamin complex supplementation resulted in reduced stress, mental fatigue and improved mood",
        doi: "10.1007/s00213-010-1870-3"
      },
      {
        authors: "Ford AH, et al.",
        year: 2019,
        title: "Vitamins B12, B6, and folic acid for onset of depressive symptoms in older men: Results from a 2-year placebo-controlled randomized trial",
        journal: "Journal of Clinical Psychiatry",
        findings: "B vitamin supplementation reduced risk of depression in men with elevated homocysteine",
        doi: "10.4088/JCP.18m12212"
      }
    ],
    contraindications: [
      "Sensitivity to cobalt (B12)",
      "Specific genetic disorders affecting B vitamin metabolism",
      "Leber's disease (high-dose B12)"
    ],
    drugInteractions: [
      "Certain antibiotics",
      "Anticonvulsants",
      "Metformin",
      "Proton pump inhibitors",
      "Cholestyramine"
    ],
    naturalSources: ["Whole grains", "Legumes", "Seeds and nuts", "Leafy greens", "Eggs", "Meat", "Nutritional yeast"],
    dietaryRecommendations: "Consume a variety of B vitamin-rich foods daily. Vegetarians and especially vegans should consider B12 supplementation",
    minimumActiveIngredient: "At least 100% DV of each B vitamin",
    efficacyScore: 87,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan (with B12)"],
    targetSymptoms: ["Fatigue", "Poor concentration", "Low mood", "Stress", "Weakness", "Poor memory"],
    targetGoals: ["Energy improvement", "Mental clarity", "Stress management", "Metabolic support"],
    categories: ["essential_vitamins", "energy_metabolism", "nervous_system", "cognitive_function"],
    relatedTerms: ["thiamine", "riboflavin", "niacin", "pantothenic acid", "pyridoxine", "biotin", "folate", "cobalamin", "methylation"],
    absorptionFactors: "Water-soluble - excess is excreted in urine, so divided doses or sustained-release formulations may improve efficacy. B12 absorption decreases with age and requires stomach acid and intrinsic factor."
  },
  
  "ashwagandha-extract": {
    name: "Ashwagandha Extract",
    scientificName: "Withania somnifera",
    description: "Ancient adaptogenic herb that helps the body resist various stressors and promotes balance in multiple body systems",
    category: "Adaptogens",
    standardDose: "300-600 mg of root extract (standardized to 5% withanolides) daily",
    minDose: 125,
    maxDose: 1000,
    timeToEffect: "2-6 weeks for full benefits",
    efficacyPhases: [
      {
        stage: 1,
        timing: "1-2 weeks",
        effects: "Initial reduction in perceived stress"
      },
      {
        stage: 2,
        timing: "2-4 weeks",
        effects: "Improvements in sleep quality and energy"
      },
      {
        stage: 3,
        timing: "4-12 weeks",
        effects: "Optimal benefits for hormonal balance and stress resilience"
      }
    ],
    benefits: [
      "Reduces stress and anxiety",
      "Improves stress resilience and adaptation",
      "Supports healthy cortisol levels",
      "Promotes restful sleep",
      "Supports thyroid function",
      "Enhances physical performance and recovery",
      "Supports cognitive function under stress"
    ],
    mechanismOfAction: "Ashwagandha contains withanolides that modulate stress pathways including the hypothalamic-pituitary-adrenal (HPA) axis. It regulates cortisol, supports GABA receptor function, and demonstrates antioxidant and anti-inflammatory properties.",
    scientificBasis: "Clinical studies demonstrate ashwagandha's effectiveness for stress reduction, cortisol regulation, and improvements in sleep quality with a favorable safety profile.",
    scientificStudies: [
      {
        authors: "Chandrasekhar K, et al.",
        year: 2012,
        title: "A prospective, randomized double-blind, placebo-controlled study of safety and efficacy of a high-concentration full-spectrum extract of ashwagandha root in reducing stress and anxiety in adults",
        journal: "Indian Journal of Psychological Medicine",
        findings: "64% reduction in perceived stress and 27.9% reduction in serum cortisol compared to placebo",
        doi: "10.4103/0253-7176.106022"
      },
      {
        authors: "Langade D, et al.",
        year: 2019,
        title: "Efficacy and Safety of Ashwagandha (Withania somnifera) Root Extract in Insomnia and Anxiety: A Double-blind, Randomized, Placebo-controlled Study",
        journal: "Cureus",
        findings: "Significant improvement in sleep quality, sleep onset latency, and anxiety with 300mg ashwagandha extract twice daily",
        doi: "10.7759/cureus.5797"
      }
    ],
    contraindications: [
      "Autoimmune conditions (without medical supervision)",
      "Pregnancy and breastfeeding",
      "Thyroid disorders (without medical supervision)",
      "Upcoming surgery (discontinue 2 weeks before)"
    ],
    drugInteractions: [
      "Sedatives and anxiolytics (may potentiate effects)",
      "Thyroid medications",
      "Immunosuppressants",
      "Diabetes medications (may affect blood sugar)"
    ],
    naturalSources: ["Ashwagandha root (traditional Ayurvedic herb)"],
    dietaryRecommendations: "Not typically consumed as food; supplementation is the common method of intake",
    minimumActiveIngredient: "125 mg standardized extract (5% withanolides)",
    efficacyScore: 85,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan"],
    targetSymptoms: ["Stress", "Anxiety", "Poor sleep", "Fatigue", "Low energy", "Poor resilience"],
    targetGoals: ["Stress management", "Better sleep", "Energy improvement", "Hormonal balance"],
    categories: ["adaptogens", "stress_management", "sleep_support", "cognitive_function"],
    relatedTerms: ["Indian ginseng", "winter cherry", "withanolides", "adaptogen", "stress-reducer"],
    absorptionFactors: "Fat-soluble active compounds - absorption may be enhanced when taken with a meal containing fat. Black pepper extract (piperine) may enhance absorption."
  },
  
  "probiotics-daily": {
    name: "Multi-Strain Probiotics",
    scientificName: "Various Lactobacillus, Bifidobacterium, and other beneficial strains",
    description: "Live beneficial microorganisms that support gut health, immunity, and overall wellbeing",
    category: "Digestive Health",
    standardDose: "10-50 billion CFU daily",
    minDose: 1,
    maxDose: 100,
    timeToEffect: "2-8 weeks for full benefits",
    efficacyPhases: [
      {
        stage: 1,
        timing: "1-2 weeks",
        effects: "Initial colonization and adaptation"
      },
      {
        stage: 2,
        timing: "2-4 weeks",
        effects: "Improvements in digestive symptoms"
      },
      {
        stage: 3,
        timing: "4-8 weeks+",
        effects: "Optimal benefits for immunity and microbiome balance"
      }
    ],
    benefits: [
      "Supports healthy digestive function",
      "Helps maintain intestinal barrier integrity",
      "Supports immune system function",
      "May improve mood and cognitive function via gut-brain axis",
      "Supports nutrient absorption",
      "Helps restore microbiome after antibiotic use"
    ],
    mechanismOfAction: "Probiotics colonize the gut and create a favorable environment for beneficial bacteria while inhibiting pathogenic microbes. They produce short-chain fatty acids that nourish colon cells, strengthen the intestinal barrier, and modulate immune responses.",
    scientificBasis: "Research demonstrates probiotics' effectiveness for various digestive conditions, immune support, and emerging evidence for their role in mood regulation through the gut-brain axis.",
    scientificStudies: [
      {
        authors: "Ford AC, et al.",
        year: 2018,
        title: "Efficacy of prebiotics, probiotics, and synbiotics in irritable bowel syndrome and chronic idiopathic constipation: Systematic review and meta-analysis",
        journal: "American Journal of Gastroenterology",
        findings: "Probiotics significantly reduced global IBS symptoms compared to placebo",
        doi: "10.1038/ajg.2018.27"
      },
      {
        authors: "Hao Q, et al.",
        year: 2015,
        title: "Probiotics for preventing acute upper respiratory tract infections",
        journal: "Cochrane Database of Systematic Reviews",
        findings: "Probiotics were better than placebo in reducing the number of acute URTIs and antibiotic use",
        doi: "10.1002/14651858.CD006895.pub3"
      }
    ],
    contraindications: [
      "Severely compromised immune systems",
      "Central venous catheters",
      "Short bowel syndrome (some cases)",
      "Critical illness"
    ],
    drugInteractions: [
      "Antibiotics (take at least 2 hours apart)",
      "Immunosuppressants",
      "Antifungals"
    ],
    naturalSources: ["Yogurt", "Kefir", "Sauerkraut", "Kimchi", "Kombucha", "Tempeh", "Miso"],
    dietaryRecommendations: "Regularly consume fermented foods. Consider supplementation after antibiotic use or when experiencing digestive issues",
    minimumActiveIngredient: "At least 1 billion CFU of multiple evidence-based strains",
    efficacyScore: 84,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan (non-dairy sources)"],
    targetSymptoms: ["Digestive discomfort", "Bloating", "Irregular bowel movements", "Weak immune system", "Post-antibiotic gut recovery"],
    targetGoals: ["Digestive health", "Immune support", "Microbiome balance", "Gut-brain connection"],
    categories: ["gut_health", "immune_support", "microbiome", "digestive_health"],
    relatedTerms: ["gut bacteria", "microflora", "gut-brain axis", "microbiome", "fermented foods"],
    absorptionFactors: "Best taken 30 minutes before meals or at bedtime. Enteric-coated or delayed-release formulations may improve survival through stomach acid."
  },
  
  "l-theanine": {
    name: "L-Theanine",
    scientificName: "L-γ-glutamylethylamide",
    description: "Unique amino acid found in tea leaves that promotes relaxation without drowsiness",
    category: "Amino Acids",
    standardDose: "100-200 mg, 1-3 times daily",
    minDose: 50,
    maxDose: 600,
    timeToEffect: "30-40 minutes for acute effects, 1-2 weeks for cumulative benefits",
    efficacyPhases: [
      {
        stage: 1,
        timing: "30-60 minutes",
        effects: "Initial calming effect"
      },
      {
        stage: 2,
        timing: "1-2 hours",
        effects: "Peak cognitive and relaxation benefits"
      },
      {
        stage: 3,
        timing: "1-2 weeks of regular use",
        effects: "Cumulative improvements in stress resilience"
      }
    ],
    benefits: [
      "Promotes relaxation without drowsiness",
      "Reduces stress and anxiety",
      "Improves focus and attention",
      "Supports quality sleep",
      "Balances mood and emotional well-being",
      "May help reduce the negative side effects of caffeine"
    ],
    mechanismOfAction: "L-theanine increases alpha brain wave activity, promoting relaxed alertness. It modulates neurotransmitters including GABA, dopamine, and serotonin. It also blocks glutamate receptors, providing neuroprotective effects.",
    scientificBasis: "Research demonstrates L-theanine's unique ability to promote relaxation without sedation, as well as its synergistic effects with caffeine for improved attention and cognitive performance.",
    scientificStudies: [
      {
        authors: "Kimura K, et al.",
        year: 2007,
        title: "L-Theanine reduces psychological and physiological stress responses",
        journal: "Biological Psychology",
        findings: "L-theanine intake resulted in reduced heart rate and salivary immunoglobulin A responses to an acute stress task compared to placebo",
        doi: "10.1016/j.biopsycho.2006.06.006"
      },
      {
        authors: "Giesbrecht T, et al.",
        year: 2010,
        title: "The combination of L-theanine and caffeine improves cognitive performance and increases subjective alertness",
        journal: "Nutritional Neuroscience",
        findings: "The combination of L-theanine and caffeine improved both speed and accuracy of performance of attention-switching tasks and reduced susceptibility to distracting information",
        doi: "10.1179/147683010X12611460764840"
      }
    ],
    contraindications: [
      "Low blood pressure (high doses)",
      "Use with caution if taking medications for high blood pressure"
    ],
    drugInteractions: [
      "Sedatives (potential additive effect)",
      "Stimulant medications (may reduce side effects)",
      "Blood pressure medications"
    ],
    naturalSources: ["Green tea", "Black tea", "White tea", "Some mushrooms"],
    dietaryRecommendations: "Green tea consumption provides small amounts (25-60 mg per cup). Supplementation offers more substantial therapeutic doses",
    minimumActiveIngredient: "50 mg L-theanine",
    efficacyScore: 86,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan"],
    targetSymptoms: ["Stress", "Anxiety", "Poor focus", "Racing thoughts", "Sleep difficulties"],
    targetGoals: ["Stress management", "Better focus", "Relaxation", "Sleep quality improvement"],
    categories: ["amino_acids", "cognitive_function", "stress_management", "sleep_support"],
    relatedTerms: ["green tea extract", "calm focus", "alpha waves", "relaxed alertness", "stress reducer"],
    absorptionFactors: "Water-soluble amino acid with good bioavailability. Can be taken with or without food. Crosses the blood-brain barrier effectively."
  },
  
  "vitamin-c-complex": {
    name: "Vitamin C Complex",
    scientificName: "Ascorbic acid with bioflavonoids",
    description: "Essential water-soluble vitamin with powerful antioxidant properties and critical roles in immune function, collagen synthesis, and tissue repair",
    category: "Vitamins",
    standardDose: "500-1000 mg daily",
    minDose: 75,
    maxDose: 2000,
    timeToEffect: "1-3 weeks for full benefits",
    efficacyPhases: [
      {
        stage: 1,
        timing: "1-7 days",
        effects: "Initial antioxidant effects and immune support"
      },
      {
        stage: 2,
        timing: "1-2 weeks",
        effects: "Improved collagen production and tissue health"
      },
      {
        stage: 3,
        timing: "2-3 weeks+",
        effects: "Optimal benefits for skin and cardiovascular health"
      }
    ],
    benefits: [
      "Supports immune system function",
      "Acts as a powerful antioxidant",
      "Essential for collagen production and tissue repair",
      "Enhances iron absorption",
      "Supports cardiovascular health",
      "Promotes healthy skin and connective tissues"
    ],
    mechanismOfAction: "Vitamin C functions as an electron donor in enzymatic reactions, particularly collagen synthesis. It acts as an antioxidant, neutralizing free radicals and regenerating other antioxidants like vitamin E. It supports immune function by enhancing neutrophil function and lymphocyte proliferation.",
    scientificBasis: "Research demonstrates vitamin C's essential role in immune function, with evidence for reduced duration and severity of colds, plus benefits for skin health, wound healing, and antioxidant protection.",
    scientificStudies: [
      {
        authors: "Hemilä H, et al.",
        year: 2013,
        title: "Vitamin C for preventing and treating the common cold",
        journal: "Cochrane Database of Systematic Reviews",
        findings: "Regular vitamin C supplementation reduced common cold duration by 8% in adults and 14% in children",
        doi: "10.1002/14651858.CD000980.pub4"
      },
      {
        authors: "Pullar JM, et al.",
        year: 2017,
        title: "The Roles of Vitamin C in Skin Health",
        journal: "Nutrients",
        findings: "Vitamin C promotes collagen synthesis, stabilizes collagen fibers, and reduces pigmentation in human skin",
        doi: "10.3390/nu9080866"
      }
    ],
    contraindications: [
      "History of kidney stones (high doses)",
      "Hemochromatosis",
      "G6PD deficiency (high doses)"
    ],
    drugInteractions: [
      "Blood thinners (high doses)",
      "Certain chemotherapy drugs",
      "Estrogen-containing medications",
      "Statins"
    ],
    naturalSources: ["Citrus fruits", "Bell peppers", "Strawberries", "Kiwi", "Broccoli", "Acerola cherries", "Rose hips"],
    dietaryRecommendations: "Consume vitamin C-rich foods daily. Consider supplementation during illness, stress, or for smokers (who have higher requirements)",
    minimumActiveIngredient: "75-90 mg (RDA for adults)",
    efficacyScore: 88,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan"],
    targetSymptoms: ["Weak immune system", "Frequent colds", "Poor wound healing", "Bruising easily", "Dry skin"],
    targetGoals: ["Immune support", "Skin health", "Antioxidant protection", "Collagen support", "Iron absorption"],
    categories: ["essential_vitamins", "immunity", "skin_health", "antioxidants"],
    relatedTerms: ["ascorbic acid", "ascorbate", "immune booster", "collagen support", "antioxidant"],
    absorptionFactors: "Water-soluble with 70-90% absorption at typical dietary doses. Absorption decreases as dose increases. Buffered or liposomal forms may reduce digestive discomfort at high doses."
  },
  
  "zinc-picolinate": {
    name: "Zinc Picolinate",
    scientificName: "Zinc bis(picolinate)",
    description: "Highly bioavailable form of zinc essential for immune function, cellular metabolism, and wound healing",
    category: "Minerals",
    standardDose: "15-30 mg elemental zinc daily",
    minDose: 8,
    maxDose: 40,
    timeToEffect: "2-4 weeks for full benefits",
    efficacyPhases: [
      {
        stage: 1,
        timing: "1-2 weeks",
        effects: "Initial improvement in immune response"
      },
      {
        stage: 2,
        timing: "2-4 weeks",
        effects: "Enhanced skin healing and testosterone production"
      },
      {
        stage: 3,
        timing: "1-3 months",
        effects: "Optimal benefits for enzyme function and cellular metabolism"
      }
    ],
    benefits: [
      "Supports immune system function",
      "Essential for wound healing",
      "Supports hormone production and balance",
      "Important for taste and smell",
      "Supports DNA synthesis and cell division",
      "Contributes to protein synthesis and enzyme function"
    ],
    mechanismOfAction: "Zinc functions as a cofactor for over 300 enzymes involved in metabolism, immune function, and cellular repair. The picolinate form enhances absorption by using the body's amino acid transport systems.",
    scientificBasis: "Research demonstrates zinc's essential role in immune function, with evidence for reduced duration of colds and improved wound healing. Picolinate form shows superior absorption compared to oxide forms.",
    scientificStudies: [
      {
        authors: "Hemilä H, et al.",
        year: 2017,
        title: "Zinc acetate lozenges for treating the common cold: an individual patient data meta-analysis",
        journal: "British Journal of Clinical Pharmacology",
        findings: "Zinc lozenges shortened the duration of cold symptoms by an average of 33%",
        doi: "10.1111/bcp.13057"
      },
      {
        authors: "Solomons NW",
        year: 1998,
        title: "Mild human zinc deficiency produces an imbalance between cell-mediated and humoral immunity",
        journal: "Nutrition Reviews",
        findings: "Even mild zinc deficiency can impair various immune functions and increase susceptibility to infections",
        doi: "10.1111/j.1753-4887.1998.tb01656.x"
      }
    ],
    contraindications: [
      "Copper deficiency",
      "Certain hematologic disorders"
    ],
    drugInteractions: [
      "Antibiotics (fluoroquinolones, tetracyclines)",
      "Penicillamine",
      "Thiazide diuretics",
      "Iron supplements (separate by 2 hours)"
    ],
    naturalSources: ["Oysters", "Red meat", "Poultry", "Beans", "Nuts", "Whole grains", "Dairy products"],
    dietaryRecommendations: "Include zinc-rich foods daily. Vegetarians may need 50% more zinc due to reduced bioavailability from plant sources",
    minimumActiveIngredient: "8-11 mg elemental zinc (RDA for adults)",
    efficacyScore: 85,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan (may need supplementation)"],
    targetSymptoms: ["Weak immune system", "Frequent colds", "Poor wound healing", "Loss of taste/smell", "Hair loss", "Skin problems"],
    targetGoals: ["Immune support", "Skin health", "Hormone balance", "Metabolic support"],
    categories: ["essential_minerals", "immunity", "wound_healing", "enzyme_cofactor"],
    relatedTerms: ["trace mineral", "immune mineral", "wound healing", "enzyme cofactor", "testosterone support"],
    absorptionFactors: "Picolinate form has superior absorption compared to oxide, gluconate, or citrate forms. Best taken between meals, but may cause stomach upset in sensitive individuals."
  },
  
  "curcumin-supplement": {
    name: "Curcumin with Bioperine",
    scientificName: "Diferuloylmethane (with piperine)",
    description: "Potent anti-inflammatory compound derived from turmeric root, enhanced with black pepper extract for superior absorption",
    category: "Botanical Extracts",
    standardDose: "500-1000 mg curcumin with 5-10 mg piperine daily",
    minDose: 250,
    maxDose: 2000,
    timeToEffect: "2-8 weeks for full benefits",
    efficacyPhases: [
      {
        stage: 1,
        timing: "1-2 weeks",
        effects: "Initial reduction in inflammatory markers"
      },
      {
        stage: 2,
        timing: "2-4 weeks",
        effects: "Noticeable improvement in pain and mobility"
      },
      {
        stage: 3,
        timing: "4-8 weeks+",
        effects: "Optimal benefits for systemic inflammation and joint health"
      }
    ],
    benefits: [
      "Powerful anti-inflammatory effects",
      "Strong antioxidant properties",
      "Supports joint health and mobility",
      "Promotes digestive health",
      "Supports liver function and detoxification",
      "Supports cardiovascular health",
      "May support cognitive function"
    ],
    mechanismOfAction: "Curcumin inhibits multiple inflammatory pathways including NF-κB, COX-2, and pro-inflammatory cytokines. It neutralizes free radicals, modulates cellular signaling, and influences gene expression related to inflammation and antioxidant defense.",
    scientificBasis: "Extensive research demonstrates curcumin's anti-inflammatory and antioxidant effects, with clinical evidence for benefits in arthritis, inflammatory conditions, and metabolic health.",
    scientificStudies: [
      {
        authors: "Daily JW, et al.",
        year: 2016,
        title: "Efficacy of Turmeric Extracts and Curcumin for Alleviating the Symptoms of Joint Arthritis: A Systematic Review and Meta-Analysis of Randomized Clinical Trials",
        journal: "Journal of Medicinal Food",
        findings: "Curcumin supplementation significantly reduced arthritis symptoms, comparable to effects of non-steroidal anti-inflammatory drugs",
        doi: "10.1089/jmf.2016.3705"
      },
      {
        authors: "Panahi Y, et al.",
        year: 2017,
        title: "Curcuminoid treatment for knee osteoarthritis: A randomized double-blind placebo-controlled trial",
        journal: "Phytotherapy Research",
        findings: "Significant improvements in pain, physical function, and quality of life with curcuminoid supplementation compared to placebo",
        doi: "10.1002/ptr.5806"
      }
    ],
    contraindications: [
      "Gallbladder disease or obstruction",
      "Bleeding disorders",
      "Scheduled surgery (discontinue 2 weeks before)"
    ],
    drugInteractions: [
      "Blood thinners",
      "NSAIDs (may enhance effects)",
      "Some chemotherapy drugs",
      "Diabetes medications (may enhance effects)"
    ],
    naturalSources: ["Turmeric root (contains 2-5% curcumin)"],
    dietaryRecommendations: "Regular culinary use of turmeric provides small amounts. Therapeutic doses require supplementation with enhanced absorption formulations",
    minimumActiveIngredient: "250 mg curcumin with bioavailability enhancer",
    efficacyScore: 84,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan"],
    targetSymptoms: ["Joint pain", "Inflammation", "Digestive discomfort", "Stiffness", "Poor recovery"],
    targetGoals: ["Inflammation reduction", "Joint health", "Antioxidant protection", "Digestive health"],
    categories: ["anti_inflammatory", "antioxidants", "joint_support", "digestive_health"],
    relatedTerms: ["turmeric extract", "golden spice", "anti-inflammatory", "bioavailable curcumin", "inflammation fighter"],
    absorptionFactors: "Poorly absorbed on its own - bioavailability enhancers like piperine (black pepper extract), phospholipid complexes, nanoparticles, or micellar formulations can increase absorption by 2000%."
  },
  
  "rhodiola-rosea": {
    name: "Rhodiola Rosea Extract",
    scientificName: "Rhodiola rosea",
    description: "Powerful adaptogenic herb that helps the body resist physical, chemical, and environmental stress",
    category: "Adaptogens",
    standardDose: "250-680 mg daily (standardized to 3% rosavins and 1% salidroside)",
    minDose: 150,
    maxDose: 800,
    timeToEffect: "1-3 weeks for full benefits",
    efficacyPhases: [
      {
        stage: 1,
        timing: "1-7 days",
        effects: "Initial improvements in energy and mental clarity"
      },
      {
        stage: 2,
        timing: "1-2 weeks",
        effects: "Enhanced stress resilience and physical performance"
      },
      {
        stage: 3,
        timing: "2-3 weeks+",
        effects: "Optimal benefits for mood and cognitive function"
      }
    ],
    benefits: [
      "Reduces fatigue under stressful conditions",
      "Improves mental performance during stress",
      "Enhances physical stamina and recovery",
      "Supports healthy mood balance",
      "Helps normalize cortisol levels",
      "Supports immune function during stress"
    ],
    mechanismOfAction: "Rhodiola modulates stress response systems including the hypothalamic-pituitary-adrenal (HPA) axis. It optimizes serotonin and dopamine levels, increases stress-resistant proteins, and exhibits neuroprotective properties.",
    scientificBasis: "Clinical studies demonstrate Rhodiola's effectiveness for reducing fatigue, improving cognitive function under stress, and enhancing physical performance with a favorable safety profile.",
    scientificStudies: [
      {
        authors: "Olsson EM, et al.",
        year: 2009,
        title: "A randomised, double-blind, placebo-controlled, parallel-group study of the standardised extract SHR-5 of the roots of Rhodiola rosea in the treatment of subjects with stress-related fatigue",
        journal: "Planta Medica",
        findings: "Significant improvement in fatigue, mental performance, concentration, and salivary cortisol responses to stress compared to placebo",
        doi: "10.1055/s-0028-1088346"
      },
      {
        authors: "Darbinyan V, et al.",
        year: 2007,
        title: "Clinical trial of Rhodiola rosea L. extract SHR-5 in the treatment of mild to moderate depression",
        journal: "Nordic Journal of Psychiatry",
        findings: "Significant improvements in overall depression, emotional stability, and insomnia compared to placebo",
        doi: "10.1080/08039480701643290"
      }
    ],
    contraindications: [
      "Bipolar disorder (may trigger mania)",
      "Autoimmune disorders (without medical supervision)",
      "Pregnancy and breastfeeding (insufficient data)"
    ],
    drugInteractions: [
      "Antidepressants (MAOIs, SSRIs)",
      "Stimulants",
      "Blood pressure medications",
      "Diabetes medications"
    ],
    naturalSources: ["Rhodiola rosea root (Arctic regions of Europe, Asia, North America)"],
    dietaryRecommendations: "Not typically consumed as food; supplementation is the common method of intake",
    minimumActiveIngredient: "150 mg standardized extract (3% rosavins, 1% salidroside)",
    efficacyScore: 83,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan"],
    targetSymptoms: ["Fatigue", "Stress", "Poor concentration", "Low mood", "Poor physical recovery", "Altitude sickness"],
    targetGoals: ["Stress management", "Energy improvement", "Mental clarity", "Physical performance"],
    categories: ["adaptogens", "stress_management", "cognitive_function", "physical_performance"],
    relatedTerms: ["golden root", "arctic root", "rose root", "adaptogen", "anti-fatigue herb"],
    absorptionFactors: "Best taken on an empty stomach in the morning. May be stimulating for some individuals if taken in the evening."
  },
  
  "melatonin-supplement": {
    name: "Melatonin",
    scientificName: "N-acetyl-5-methoxytryptamine",
    description: "Natural hormone that regulates sleep-wake cycles and supports healthy circadian rhythm",
    category: "Sleep Support",
    standardDose: "0.5-5 mg taken 30-60 minutes before bedtime",
    minDose: 0.3,
    maxDose: 10,
    timeToEffect: "30-60 minutes for sleep onset; 1-7 days for circadian adjustment",
    efficacyPhases: [
      {
        stage: 1,
        timing: "30-60 minutes",
        effects: "Initial drowsiness and sleep onset"
      },
      {
        stage: 2,
        timing: "1-3 days",
        effects: "Improved sleep duration and quality"
      },
      {
        stage: 3,
        timing: "3-7 days",
        effects: "Stabilized circadian rhythm and improved daytime alertness"
      }
    ],
    benefits: [
      "Helps regulate sleep-wake cycles",
      "Reduces time to fall asleep",
      "May improve sleep quality and duration",
      "Helps reset circadian rhythm after jet lag",
      "Supports healthy aging through antioxidant effects",
      "May support immune function"
    ],
    mechanismOfAction: "Melatonin binds to MT1 and MT2 receptors in the brain's suprachiasmatic nucleus (SCN), signaling nighttime to the body and promoting sleep onset. It also has antioxidant and anti-inflammatory properties.",
    scientificBasis: "Extensive research demonstrates melatonin's effectiveness for sleep onset, jet lag, and certain circadian rhythm disorders, with a favorable safety profile even with long-term use.",
    scientificStudies: [
      {
        authors: "Ferracioli-Oda E, et al.",
        year: 2013,
        title: "Meta-analysis: melatonin for the treatment of primary sleep disorders",
        journal: "PLoS One",
        findings: "Melatonin reduced sleep latency by an average of 7 minutes, increased total sleep time by 8 minutes, and improved overall sleep quality",
        doi: "10.1371/journal.pone.0063773"
      },
      {
        authors: "Auld F, et al.",
        year: 2017,
        title: "Evidence for the efficacy of melatonin in the treatment of primary adult sleep disorders",
        journal: "Sleep Medicine Reviews",
        findings: "Strong evidence for melatonin's effectiveness in treating delayed sleep phase syndrome and regulating sleep-wake patterns",
        doi: "10.1016/j.smrv.2016.06.004"
      }
    ],
    contraindications: [
      "Autoimmune disorders (without medical supervision)",
      "Seizure disorders (caution)",
      "Pregnancy and breastfeeding (insufficient data)",
      "Depression (may worsen symptoms in some individuals)"
    ],
    drugInteractions: [
      "Blood thinners",
      "Blood pressure medications",
      "Diabetes medications",
      "Immunosuppressants",
      "Seizure medications"
    ],
    naturalSources: ["Produced endogenously by the pineal gland; small amounts in tart cherries, grapes, and some other foods"],
    dietaryRecommendations: "Food sources provide minimal amounts. Supplementation is more effective for therapeutic purposes",
    minimumActiveIngredient: "0.3 mg pharmaceutical grade melatonin",
    efficacyScore: 82,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan"],
    targetSymptoms: ["Sleep onset issues", "Jet lag", "Night shift work", "Irregular sleep patterns", "Poor sleep quality"],
    targetGoals: ["Better sleep", "Circadian rhythm regulation", "Jet lag management"],
    categories: ["sleep_support", "hormones", "circadian_rhythm", "antioxidants"],
    relatedTerms: ["sleep hormone", "circadian regulator", "pineal hormone", "jet lag remedy", "sleep onset"],
    absorptionFactors: "Rapid absorption with peak blood levels within 60 minutes. Immediate-release forms are best for sleep onset issues, while sustained-release forms may help with sleep maintenance."
  },
  
  "iron": {
    name: "Iron Bisglycinate",
    scientificName: "Ferrous bisglycinate chelate",
    description: "Highly bioavailable form of iron essential for oxygen transport, energy production, and cognitive function",
    category: "Minerals",
    standardDose: "15-30 mg elemental iron daily",
    minDose: 8,
    maxDose: 45,
    timeToEffect: "2-3 months for full benefits",
    efficacyPhases: [
      {
        stage: 1,
        timing: "1-2 weeks",
        effects: "Initial improvement in iron stores"
      },
      {
        stage: 2,
        timing: "1-2 months",
        effects: "Increased hemoglobin production"
      },
      {
        stage: 3,
        timing: "2-3 months",
        effects: "Optimal benefits for energy and cognitive function"
      }
    ],
    benefits: [
      "Essential for oxygen transport in the blood",
      "Crucial for energy production in cells",
      "Supports cognitive function and focus",
      "Important for immune system function",
      "Necessary for DNA synthesis and cell growth",
      "Supports physical performance and endurance"
    ],
    mechanismOfAction: "Iron is essential for hemoglobin synthesis, allowing red blood cells to transport oxygen throughout the body. It's also vital for cellular energy production through the electron transport chain and serves as a cofactor for numerous enzymes.",
    scientificBasis: "Research demonstrates iron's essential role in treating and preventing iron deficiency anemia, with evidence for improved cognitive function, energy levels, and physical performance. Bisglycinate form shows superior absorption and reduced side effects.",
    scientificStudies: [
      {
        authors: "Tolkien Z, et al.",
        year: 2015,
        title: "Ferrous sulfate supplementation causes significant gastrointestinal side-effects in adults: a systematic review and meta-analysis",
        journal: "PLoS One",
        findings: "Conventional iron supplements (ferrous sulfate) significantly increase gastrointestinal side effects compared to placebo, while chelated forms like bisglycinate have reduced side effects",
        doi: "10.1371/journal.pone.0117383"
      },
      {
        authors: "Murray-Kolb LE, et al.",
        year: 2017,
        title: "Iron status and cognitive performance in female varsity athletes",
        journal: "Journal of the American College of Nutrition",
        findings: "Iron supplementation in women with iron deficiency improved cognitive performance, particularly in attention, memory and learning tasks",
        doi: "10.1080/07315724.2017.1358708"
      }
    ],
    contraindications: [
      "Hemochromatosis",
      "Hemosiderosis",
      "Certain anemias (not caused by iron deficiency)",
      "Active infection (iron can feed bacterial growth)"
    ],
    drugInteractions: [
      "Levothyroxine",
      "Certain antibiotics (tetracyclines, fluoroquinolones)",
      "Levodopa",
      "Proton pump inhibitors",
      "Antacids"
    ],
    naturalSources: ["Red meat", "Organ meats", "Oysters", "Legumes", "Spinach", "Pumpkin seeds", "Fortified cereals"],
    dietaryRecommendations: "Include iron-rich foods daily. Consume vitamin C alongside plant sources to enhance absorption. Vegetarians and vegans may need 1.8 times more iron",
    minimumActiveIngredient: "8-18 mg elemental iron (varies by age, gender, life stage)",
    efficacyScore: 86,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan (with planning)"],
    targetSymptoms: ["Fatigue", "Weakness", "Poor concentration", "Cold sensitivity", "Breathlessness", "Pale skin"],
    targetGoals: ["Energy improvement", "Cognitive function", "Physical performance", "Immune support"],
    categories: ["essential_minerals", "blood_health", "energy_metabolism", "cognitive_function"],
    relatedTerms: ["heme iron", "non-heme iron", "ferritin", "hemoglobin", "anemia", "oxygen transport"],
    absorptionFactors: "Bisglycinate form has 2-4x better absorption than ferrous sulfate with fewer side effects. Take on empty stomach if possible, with vitamin C to enhance absorption. Calcium, tannins (tea/coffee), phytates, and oxalates inhibit absorption."
  },
  
  "coq10-ubiquinol": {
    name: "CoQ10 Ubiquinol",
    scientificName: "Ubiquinol (reduced form of Coenzyme Q10)",
    description: "Active form of CoQ10 essential for cellular energy production and powerful antioxidant protection",
    category: "Coenzymes",
    standardDose: "100-300 mg daily",
    minDose: 50,
    maxDose: 600,
    timeToEffect: "2-8 weeks for full benefits",
    efficacyPhases: [
      {
        stage: 1,
        timing: "1-2 weeks",
        effects: "Initial improvement in energy production"
      },
      {
        stage: 2,
        timing: "2-4 weeks",
        effects: "Enhanced antioxidant protection"
      },
      {
        stage: 3,
        timing: "4-8 weeks+",
        effects: "Optimal benefits for cardiovascular and mitochondrial health"
      }
    ],
    benefits: [
      "Supports cellular energy production",
      "Provides powerful antioxidant protection",
      "Supports cardiovascular health",
      "Promotes healthy blood pressure",
      "Helps reduce statin-induced muscle pain",
      "Supports mitochondrial function and healthy aging",
      "Enhances physical performance and recovery"
    ],
    mechanismOfAction: "Ubiquinol is essential for mitochondrial ATP production as part of the electron transport chain. It also functions as a powerful lipid-soluble antioxidant, protecting cell membranes and mitochondria from oxidative damage.",
    scientificBasis: "Research demonstrates CoQ10's role in energy production and as an antioxidant, with clinical evidence for cardiovascular benefits, mitochondrial support, and reduced statin-induced myalgia.",
    scientificStudies: [
      {
        authors: "Mortensen SA, et al.",
        year: 2014,
        title: "The effect of coenzyme Q10 on morbidity and mortality in chronic heart failure: results from Q-SYMBIO",
        journal: "JACC: Heart Failure",
        findings: "CoQ10 supplementation reduced major adverse cardiovascular events and mortality in patients with chronic heart failure",
        doi: "10.1016/j.jchf.2014.06.008"
      },
      {
        authors: "Skarlovnik A, et al.",
        year: 2014,
        title: "Coenzyme Q10 supplementation decreases statin-related mild-to-moderate muscle symptoms: a randomized clinical study",
        journal: "Medical Science Monitor",
        findings: "CoQ10 supplementation significantly reduced statin-induced myopathy symptoms in 75% of patients",
        doi: "10.12659/MSM.890777"
      }
    ],
    contraindications: [
      "Caution with blood thinners",
      "Caution with chemotherapy (consult oncologist)"
    ],
    drugInteractions: [
      "Blood thinners (warfarin)",
      "Blood pressure medications",
      "Certain chemotherapy drugs"
    ],
    naturalSources: ["Fatty fish", "Organ meats", "Whole grains", "Nuts"],
    dietaryRecommendations: "Food sources provide minimal amounts. Supplementation is more effective for therapeutic purposes",
    minimumActiveIngredient: "50 mg ubiquinol or 100 mg ubiquinone (converted to ubiquinol in younger people)",
    efficacyScore: 84,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan"],
    targetSymptoms: ["Fatigue", "Low energy", "Muscle weakness", "Statin-induced muscle pain", "Cardiovascular concerns"],
    targetGoals: ["Energy improvement", "Heart health", "Statin side effect reduction", "Healthy aging"],
    categories: ["coenzymes", "antioxidants", "energy_metabolism", "heart_health"],
    relatedTerms: ["ubiquinone", "reduced CoQ10", "cellular energy", "mitochondrial support", "ATP production"],
    absorptionFactors: "Fat-soluble - absorption enhanced when taken with meals containing fat. Ubiquinol form is better absorbed than ubiquinone, particularly in older adults or those with absorption issues."
  },
  
  "collagen": {
    name: "Hydrolyzed Collagen Peptides",
    scientificName: "Hydrolyzed collagen (types I and III)",
    description: "Bioavailable protein that supports skin elasticity, joint health, and connective tissue strength",
    category: "Proteins",
    standardDose: "10-20 g daily",
    minDose: 5,
    maxDose: 30,
    timeToEffect: "8-12 weeks for full benefits",
    efficacyPhases: [
      {
        stage: 1,
        timing: "2-4 weeks",
        effects: "Initial improvement in skin hydration"
      },
      {
        stage: 2,
        timing: "4-8 weeks",
        effects: "Noticeable improvement in skin elasticity and joint comfort"
      },
      {
        stage: 3,
        timing: "8-12 weeks+",
        effects: "Optimal benefits for skin, joints, and connective tissues"
      }
    ],
    benefits: [
      "Supports skin elasticity and hydration",
      "Promotes joint health and comfort",
      "Strengthens hair and nails",
      "Supports bone density",
      "Aids in post-exercise recovery",
      "Supports gut health and intestinal lining"
    ],
    mechanismOfAction: "Hydrolyzed collagen provides bioavailable peptides and amino acids (especially glycine, proline, and hydroxyproline) that stimulate fibroblasts to produce more collagen, elastin, and hyaluronic acid in skin and connective tissues.",
    scientificBasis: "Research demonstrates collagen peptides' effectiveness for improving skin elasticity and hydration, reducing joint pain, and supporting connective tissue health.",
    scientificStudies: [
      {
        authors: "Proksch E, et al.",
        year: 2014,
        title: "Oral supplementation of specific collagen peptides has beneficial effects on human skin physiology: a double-blind, placebo-controlled study",
        journal: "Skin Pharmacology and Physiology",
        findings: "Daily collagen peptide supplementation significantly improved skin elasticity by 13.2% after 4 weeks and up to 15.1% after 8 weeks",
        doi: "10.1159/000355523"
      },
      {
        authors: "Clark KL, et al.",
        year: 2008,
        title: "24-Week study on the use of collagen hydrolysate as a dietary supplement in athletes with activity-related joint pain",
        journal: "Current Medical Research and Opinion",
        findings: "Athletes who consumed collagen hydrolysate had significant reduction in joint pain at rest, when walking, standing, and carrying objects",
        doi: "10.1185/030079908X291967"
      }
    ],
    contraindications: [
      "Allergy to fish or shellfish (marine collagen)",
      "Allergy to beef or pork (bovine/porcine collagen)"
    ],
    drugInteractions: [
      "No significant interactions known",
      "May affect protein-bound medication absorption (theoretical)"
    ],
    naturalSources: ["Bone broth", "Skin of animals and fish", "Gelatin"],
    dietaryRecommendations: "Daily consumption of bone broth or supplementation with hydrolyzed collagen peptides",
    minimumActiveIngredient: "5 g hydrolyzed collagen peptides",
    efficacyScore: 80,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian (marine collagen)"],
    targetSymptoms: ["Skin aging", "Joint discomfort", "Brittle nails", "Hair thinning", "Gut lining concerns"],
    targetGoals: ["Skin health", "Joint support", "Hair and nail strength", "Gut health"],
    categories: ["proteins", "skin_health", "joint_support", "connective_tissue"],
    relatedTerms: ["peptides", "gelatin", "bone broth", "beauty protein", "joint support"],
    absorptionFactors: "Hydrolyzed form has superior absorption compared to whole collagen. Enhanced by vitamin C, which is required for collagen synthesis. Best taken consistently for cumulative benefits."
  },
  
  "adaptogenic-herbs": {
    name: "Adaptogenic Herb Blend",
    scientificName: "Various (Ashwagandha, Rhodiola, Holy Basil, Schisandra)",
    description: "Synergistic blend of herbs that help the body adapt to stress and promote physical and mental resilience",
    category: "Adaptogens",
    standardDose: "Varies by specific blend and standardization",
    timeToEffect: "2-6 weeks for full benefits",
    efficacyPhases: [
      {
        stage: 1,
        timing: "1-2 weeks",
        effects: "Initial improvement in stress response"
      },
      {
        stage: 2,
        timing: "2-4 weeks",
        effects: "Enhanced energy and mood stability"
      },
      {
        stage: 3,
        timing: "4-6 weeks+",
        effects: "Optimal benefits for stress resilience and overall balance"
      }
    ],
    benefits: [
      "Helps body adapt to physical, mental, and environmental stress",
      "Supports balanced energy throughout the day",
      "Promotes mental clarity and focus during stress",
      "Supports healthy stress hormone levels",
      "Enhances physical and mental stamina",
      "Supports immune function during stress"
    ],
    mechanismOfAction: "Adaptogens modulate the hypothalamic-pituitary-adrenal (HPA) axis, helping normalize stress hormone levels and improve stress resilience. They also support neurotransmitter balance, mitochondrial function, and cellular energy production.",
    scientificBasis: "Research demonstrates adaptogens' effectiveness for improving stress resilience, reducing fatigue, enhancing cognitive performance under stress, and supporting overall wellbeing.",
    scientificStudies: [
      {
        authors: "Panossian A, et al.",
        year: 2010,
        title: "Adaptogens exert a stress-protective effect by modulation of expression of molecular chaperones",
        journal: "Phytomedicine",
        findings: "Adaptogens increased expression of stress-protective heat shock proteins and reduced cortisol response to stress",
        doi: "10.1016/j.phymed.2010.02.013"
      },
      {
        authors: "Lopresti AL, et al.",
        year: 2019,
        title: "An investigation into the stress-relieving and pharmacological actions of an ashwagandha (Withania somnifera) extract: A randomized, double-blind, placebo-controlled study",
        journal: "Medicine",
        findings: "Significant reduction in stress, improved quality of life, and lower morning cortisol with adaptogens compared to placebo",
        doi: "10.1097/MD.0000000000017186"
      }
    ],
    contraindications: [
      "Autoimmune conditions (without medical supervision)",
      "Pregnancy and breastfeeding (many adaptogens)",
      "Certain hormone-sensitive conditions",
      "Upcoming surgery (discontinue 2 weeks before)"
    ],
    drugInteractions: [
      "Sedatives and anxiolytics",
      "Thyroid medications",
      "Immunosuppressants",
      "Blood pressure medications",
      "Diabetes medications"
    ],
    naturalSources: ["Various adaptogenic herbs from traditional medicine systems worldwide"],
    dietaryRecommendations: "Not typically consumed as food; supplementation is the common method of intake",
    minimumActiveIngredient: "Varies by specific adaptogen blend",
    efficacyScore: 83,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan"],
    targetSymptoms: ["Stress", "Fatigue", "Burnout", "Poor recovery", "Low resilience", "Mood fluctuations"],
    targetGoals: ["Stress management", "Energy balance", "Resilience", "Mood support"],
    categories: ["adaptogens", "stress_management", "energy_support", "balance"],
    relatedTerms: ["stress herbs", "resilience support", "HPA axis modulators", "stress adaptation", "balance restorers"],
    absorptionFactors: "Varies by specific adaptogen. Many have fat-soluble components that benefit from consumption with meals containing fat."
  },
  
  "biotin": {
    name: "Biotin",
    scientificName: "Vitamin B7",
    description: "Essential B vitamin for metabolism, hair, skin, and nail health",
    category: "Vitamins",
    standardDose: "1000-5000 mcg daily",
    minDose: 30,
    maxDose: 10000,
    timeToEffect: "3-6 months for full benefits on hair and nails",
    efficacyPhases: [
      {
        stage: 1,
        timing: "1-2 months",
        effects: "Initial cellular metabolic support"
      },
      {
        stage: 2,
        timing: "2-4 months",
        effects: "Visible improvement in nail strength"
      },
      {
        stage: 3,
        timing: "3-6 months+",
        effects: "Optimal benefits for hair growth and skin health"
      }
    ],
    benefits: [
      "Supports healthy hair growth and strength",
      "Promotes strong, resilient nails",
      "Contributes to skin health",
      "Essential for macronutrient metabolism",
      "Supports nervous system function",
      "Important for cell signaling and gene regulation"
    ],
    mechanismOfAction: "Biotin functions as a coenzyme for carboxylase enzymes involved in fatty acid synthesis, amino acid metabolism, and gluconeogenesis. It plays a critical role in keratin infrastructure, supporting hair and nail growth.",
    scientificBasis: "Research demonstrates biotin's essential role in metabolism and its effectiveness for strengthening brittle nails. Evidence for hair growth benefits is strongest in cases of deficiency.",
    scientificStudies: [
      {
        authors: "Patel DP, et al.",
        year: 2017,
        title: "A Review of the Use of Biotin for Hair Loss",
        journal: "Skin Appendage Disorders",
        findings: "Biotin supplementation showed improvement in cases of biotin deficiency and in patients with brittle nail syndrome",
        doi: "10.1159/000462981"
      },
      {
        authors: "Floersheim GL",
        year: 1989,
        title: "Treatment of brittle fingernails with biotin",
        journal: "Zeitschrift für Hautkrankheiten",
        findings: "91% of patients showed definite improvement with firmer and harder fingernails after biotin supplementation",
        doi: "N/A"
      }
    ],
    contraindications: [
      "No known contraindications at recommended doses",
      "High doses can interfere with certain lab tests"
    ],
    drugInteractions: [
      "Anticonvulsants (may reduce biotin levels)",
      "Can interfere with certain laboratory tests including thyroid function tests and troponin"
    ],
    naturalSources: ["Egg yolks", "Nuts", "Seeds", "Organ meats", "Legumes", "Whole grains", "Cauliflower"],
    dietaryRecommendations: "Include biotin-rich foods daily. Supplementation particularly beneficial for brittle nails, thinning hair, and during pregnancy",
    minimumActiveIngredient: "30-50 mcg (RDA for adults)",
    efficacyScore: 78,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan with planning"],
    targetSymptoms: ["Brittle nails", "Hair thinning", "Hair loss", "Dry skin", "Metabolism issues"],
    targetGoals: ["Hair strength", "Nail health", "Skin health", "Metabolic support"],
    categories: ["essential_vitamins", "beauty_nutrients", "hair_health", "nail_health"],
    relatedTerms: ["vitamin B7", "vitamin H", "hair vitamin", "nail nutrient", "beauty vitamin"],
    absorptionFactors: "Water-soluble with good bioavailability. Some research suggests taking with collagen peptides may provide synergistic benefits for hair and nails."
  },
  
  "digestive-enzymes": {
    name: "Digestive Enzyme Complex",
    scientificName: "Multiple enzymes (Amylase, Protease, Lipase, etc.)",
    description: "Blend of enzymes that support the breakdown and absorption of macronutrients",
    category: "Digestive Health",
    standardDose: "Varies by formulation, typically 1-2 capsules with meals",
    timeToEffect: "Immediate digestive effects, 1-3 weeks for cumulative benefits",
    efficacyPhases: [
      {
        stage: 1,
        timing: "30-60 minutes",
        effects: "Immediate aid in food breakdown during meal"
      },
      {
        stage: 2,
        timing: "1-2 weeks",
        effects: "Reduced digestive discomfort with regular use"
      },
      {
        stage: 3,
        timing: "2-3 weeks+",
        effects: "Optimal benefits for nutrient absorption and digestive comfort"
      }
    ],
    benefits: [
      "Supports breakdown of proteins, fats, and carbohydrates",
      "Helps reduce bloating and gas",
      "Enhances nutrient absorption",
      "Reduces digestive discomfort after meals",
      "Supports overall digestive function",
      "May help with food intolerances"
    ],
    mechanismOfAction: "Different enzymes target specific macronutrients: proteases break down proteins, amylases digest complex carbohydrates, lipases break down fats, and other enzymes target specific components like lactose or gluten. This supports the body's natural digestive processes.",
    scientificBasis: "Research demonstrates digestive enzymes' effectiveness for reducing digestive symptoms in various conditions including pancreatic insufficiency, IBS, and after heavy meals.",
    scientificStudies: [
      {
        authors: "Suarez F, et al.",
        year: 1999,
        title: "Pancreatic supplements reduce symptomatic response of healthy subjects to a high fat meal",
        journal: "Digestive Diseases and Sciences",
        findings: "Digestive enzyme supplementation significantly reduced bloating, gas, and fullness after high-fat meals",
        doi: "10.1023/a:1026641603935"
      },
      {
        authors: "Money ME, et al.",
        year: 2011,
        title: "Pilot study: a randomised, double blind, placebo controlled trial of pancrealipase for the treatment of postprandial irritable bowel syndrome-diarrhoea",
        journal: "Frontline Gastroenterology",
        findings: "Significant improvement in postprandial diarrhea, cramping, and bloating with enzyme supplementation compared to placebo",
        doi: "10.1136/fg.2010.002253"
      }
    ],
    contraindications: [
      "Acute pancreatitis",
      "Allergy to specific enzyme sources",
      "Certain bleeding disorders (high-potency proteases)"
    ],
    drugInteractions: [
      "Diabetes medications (acarbose, miglitol)",
      "Antibiotics (may reduce effectiveness of certain enzymes)",
      "Blood thinners (high doses of bromelain/papain)"
    ],
    naturalSources: ["Pineapple (bromelain)", "Papaya (papain)", "Kiwi", "Fermented foods"],
    dietaryRecommendations: "Consider supplementation with meals that typically cause digestive discomfort or for specific food intolerances",
    minimumActiveIngredient: "Varies by formulation and specific enzymes",
    efficacyScore: 79,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan"],
    targetSymptoms: ["Bloating", "Gas", "Indigestion", "Heaviness after meals", "Undigested food in stool"],
    targetGoals: ["Digestive comfort", "Nutrient absorption", "Reduced bloating", "Food tolerance"],
    categories: ["digestive_health", "enzymes", "nutrient_absorption", "gut_support"],
    relatedTerms: ["proteases", "amylases", "lipases", "digestive aid", "macronutrient breakdown"],
    absorptionFactors: "Most effective when taken at the beginning of meals. Some formulations are enteric-coated to protect enzymes from stomach acid."
  },
  
  "elderberry": {
    name: "Elderberry Extract",
    scientificName: "Sambucus nigra",
    description: "Natural botanical extract rich in anthocyanins with immune-supporting and antiviral properties",
    category: "Botanical Extracts",
    standardDose: "500-1000 mg extract daily for maintenance, 3000-4000 mg daily during acute needs",
    minDose: 150,
    maxDose: 4000,
    timeToEffect: "1-2 days for acute support, 1-2 weeks for immune modulation",
    efficacyPhases: [
      {
        stage: 1,
        timing: "1-2 days",
        effects: "Initial immune activation and viral defense"
      },
      {
        stage: 2,
        timing: "3-5 days",
        effects: "Reduction in duration and severity of symptoms during illness"
      },
      {
        stage: 3,
        timing: "1-2 weeks",
        effects: "Optimal benefits for immune modulation and resilience"
      }
    ],
    benefits: [
      "Supports immune system function",
      "May reduce duration and severity of cold and flu symptoms",
      "Provides antioxidant protection",
      "Supports respiratory health",
      "Has mild anti-inflammatory properties",
      "Supports overall winter wellness"
    ],
    mechanismOfAction: "Elderberry's anthocyanins and other flavonoids inhibit viral entry and replication by binding to viral proteins. It also modulates cytokine production, particularly reducing pro-inflammatory cytokines while supporting appropriate immune response.",
    scientificBasis: "Research demonstrates elderberry's effectiveness for reducing duration and severity of cold and flu symptoms, with mechanisms including antiviral activity and immune modulation.",
    scientificStudies: [
      {
        authors: "Tiralongo E, et al.",
        year: 2016,
        title: "Elderberry Supplementation Reduces Cold Duration and Symptoms in Air-Travellers: A Randomized, Double-Blind Placebo-Controlled Clinical Trial",
        journal: "Nutrients",
        findings: "Elderberry extract reduced cold duration by 2 days and severity of symptoms compared to placebo in air travelers",
        doi: "10.3390/nu8040182"
      },
      {
        authors: "Hawkins J, et al.",
        year: 2019,
        title: "Black elderberry (Sambucus nigra) supplementation effectively treats upper respiratory symptoms: A meta-analysis of randomized, controlled clinical trials",
        journal: "Complementary Therapies in Medicine",
        findings: "Meta-analysis showed elderberry substantially reduced upper respiratory symptoms and may be an efficient and safe treatment for influenza",
        doi: "10.1016/j.ctim.2018.12.004"
      }
    ],
    contraindications: [
      "Autoimmune conditions (without medical supervision)",
      "Pregnancy and breastfeeding (insufficient safety data)",
      "Allergy to plants in the Caprifoliaceae family"
    ],
    drugInteractions: [
      "Immunosuppressants",
      "Diuretics",
      "Laxatives",
      "Diabetes medications (theoretical)"
    ],
    naturalSources: ["Elderberry fruit (must be cooked before consumption)"],
    dietaryRecommendations: "Raw berries should not be consumed. Typically taken as supplement, syrup, or in tea",
    minimumActiveIngredient: "150 mg standardized elderberry extract",
    efficacyScore: 81,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan"],
    targetSymptoms: ["Cold symptoms", "Flu symptoms", "Weak immune system", "Frequent infections", "Respiratory issues"],
    targetGoals: ["Immune support", "Winter wellness", "Respiratory health", "Antioxidant protection"],
    categories: ["immune_support", "antioxidants", "respiratory_health", "winter_wellness"],
    relatedTerms: ["sambucus", "black elder", "antiviral herb", "immune berry", "winter support"],
    absorptionFactors: "Anthocyanins are better absorbed in liquid forms (syrups, lozenges that dissolve in mouth) compared to capsules, though all forms show efficacy."
  },
  
  "glutamine": {
    name: "L-Glutamine",
    scientificName: "L-Glutamine",
    description: "Conditionally essential amino acid critical for gut health, immune function, and recovery",
    category: "Amino Acids",
    standardDose: "5-10 g daily, up to 20-30 g for therapeutic purposes",
    minDose: 2,
    maxDose: 30,
    timeToEffect: "2-4 weeks for gut health, 1-2 weeks for recovery benefits",
    efficacyPhases: [
      {
        stage: 1,
        timing: "1-2 weeks",
        effects: "Initial improvement in gut barrier function"
      },
      {
        stage: 2,
        timing: "2-4 weeks",
        effects: "Enhanced immune function and recovery"
      },
      {
        stage: 3,
        timing: "4-8 weeks+",
        effects: "Optimal benefits for intestinal health and resilience"
      }
    ],
    benefits: [
      "Supports intestinal barrier integrity",
      "Fuels intestinal cells (enterocytes)",
      "Supports immune function",
      "Aids in post-exercise recovery",
      "Helps maintain muscle mass during stress or illness",
      "Supports glutathione production (master antioxidant)"
    ],
    mechanismOfAction: "Glutamine serves as the primary fuel for intestinal cells, supporting gut barrier function and preventing leaky gut. It's also essential for lymphocyte proliferation and cytokine production in the immune system. During stress, illness, or intense exercise, glutamine becomes conditionally essential.",
    scientificBasis: "Research demonstrates glutamine's effectiveness for supporting gut barrier function, reducing inflammation, enhancing recovery, and supporting immune function, particularly during physiological stress.",
    scientificStudies: [
      {
        authors: "Rao R, et al.",
        year: 2012,
        title: "Role of glutamine in protection of intestinal epithelial tight junctions",
        journal: "Journal of Epithelial Biology and Pharmacology",
        findings: "Glutamine preserved intestinal barrier function by preventing tight junction disruption during inflammatory conditions",
        doi: "10.2174/1875044301205010047"
      },
      {
        authors: "Gleeson M",
        year: 2008,
        title: "Dosing and efficacy of glutamine supplementation in human exercise and sport training",
        journal: "Journal of Nutrition",
        findings: "Glutamine supplementation reduced infections and maintained performance in athletes during heavy training periods",
        doi: "10.1093/jn/138.10.2045S"
      }
    ],
    contraindications: [
      "Severe liver disease",
      "Reye's syndrome",
      "Sensitivity to monosodium glutamate (rare)",
      "Certain cancers (consult oncologist)"
    ],
    drugInteractions: [
      "Anticonvulsants",
      "Lactulose",
      "Certain cancer treatments"
    ],
    naturalSources: ["Meat", "Eggs", "Dairy", "Beans", "Cabbage", "Spinach", "Wheat"],
    dietaryRecommendations: "Food sources provide modest amounts. Supplementation useful during intense exercise, stress, gut issues, or recovery",
    minimumActiveIngredient: "2 g L-glutamine",
    efficacyScore: 82,
    compatibleDiets: ["Omnivore", "Flexitarian", "Pescatarian", "Vegetarian", "Vegan"],
    targetSymptoms: ["Digestive issues", "Leaky gut", "Poor recovery", "Frequent infections", "Muscle loss during stress"],
    targetGoals: ["Gut health", "Immune support", "Recovery enhancement", "Digestive support"],
    categories: ["amino_acids", "gut_health", "immune_support", "recovery"],
    relatedTerms: ["conditionally essential amino acid", "gut fuel", "recovery amino acid", "intestinal health", "muscle preservation"],
    absorptionFactors: "Water-soluble amino acid with good bioavailability. Best taken between meals for gut health, or post-workout for recovery benefits."
  }
};

export default SUPPLEMENT_CATALOG;
