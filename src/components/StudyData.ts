// Scientific study data for use across the application
export interface Study {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  abstract: string;
  keywords: string[];
  findings: string[];
  methodology: string;
  limitations?: string;
  citations: number;
}

export const labStudies: Study[] = [
  {
    id: 'study1',
    title: 'Effects of Micronutrient Supplementation on Cognitive Function in Adults',
    authors: ['Johnson, M.', 'Smith, A.', 'Williams, R.'],
    journal: 'Journal of Nutritional Science',
    year: 2022,
    doi: '10.1000/xyz123',
    abstract: 'This randomized controlled trial examined the effects of a comprehensive micronutrient supplement on cognitive function in healthy adults aged 25-65.',
    keywords: ['micronutrients', 'cognitive function', 'supplementation', 'memory', 'mental processing'],
    findings: [
      'Significant improvement in working memory after 12 weeks of supplementation',
      'Enhanced processing speed in adults over 40 years old',
      'Improved attention metrics across all age groups'
    ],
    methodology: 'Double-blind placebo-controlled study with 248 participants over 16 weeks with comprehensive cognitive testing.',
    limitations: 'Limited to healthy adults without pre-existing cognitive impairments.',
    citations: 76
  },
  {
    id: 'study2',
    title: 'Vitamin D Status and Immune Response: A Systematic Review',
    authors: ['Thompson, K.', 'Garcia, J.', 'Chen, L.'],
    journal: 'Nutrition Reviews',
    year: 2023,
    doi: '10.1000/abc789',
    abstract: 'This systematic review examined the relationship between vitamin D status and various markers of immune function across 42 clinical studies.',
    keywords: ['vitamin D', 'immune function', 'inflammation', 'immune response', 'supplementation'],
    findings: [
      'Strong correlation between vitamin D status and T-cell function',
      'Significant reduction in inflammatory markers with vitamin D optimization',
      'Enhanced response to respiratory infections in subjects with adequate vitamin D levels'
    ],
    methodology: 'Systematic review of 42 clinical studies including randomized controlled trials and observational studies.',
    citations: 53
  },
  {
    id: 'study3',
    title: 'Magnesium Intake and Sleep Quality: Analysis from the National Health Survey',
    authors: ['Parker, S.', 'Patel, R.', 'Anderson, T.'],
    journal: 'Sleep Medicine',
    year: 2021,
    doi: '10.1000/def456',
    abstract: 'This analysis of national health data examined the relationship between dietary and supplemental magnesium intake and self-reported sleep quality measures.',
    keywords: ['magnesium', 'sleep quality', 'nutrition', 'insomnia', 'dietary intake'],
    findings: [
      'Higher magnesium intake associated with improved sleep onset latency',
      'Reduced nighttime awakenings reported in subjects with adequate magnesium intake',
      'Stronger effects observed in older adults and those with previous sleep complaints'
    ],
    methodology: 'Analysis of dietary intake and sleep quality data from 8,673 participants in a national health survey over 3 years.',
    limitations: 'Relies on self-reported sleep metrics rather than polysomnography.',
    citations: 92
  }
];

export const researchPublications: Study[] = [
  {
    id: 'pub1',
    title: 'Nutritional Approaches to Cognitive Health: Current Evidence and Future Directions',
    authors: ['Roberts, M.', 'Chen, H.', 'Wilson, B.'],
    journal: 'Frontiers in Nutrition',
    year: 2021,
    doi: '10.1000/nutr123',
    abstract: 'This review examines current evidence on nutritional interventions for cognitive health maintenance and enhancement across the lifespan.',
    keywords: ['cognitive health', 'nutrition', 'brain function', 'neuroprotection', 'dietary patterns'],
    findings: [
      'Mediterranean and MIND diets show strongest evidence for neuroprotective effects',
      'Omega-3 fatty acids demonstrate consistent benefits for cognitive maintenance',
      'Emerging evidence supports specific micronutrient combinations for cognitive performance'
    ],
    methodology: 'Comprehensive review of randomized controlled trials, prospective cohort studies, and meta-analyses from 2000-2021.',
    citations: 128
  },
  {
    id: 'pub2',
    title: 'Microbiome Modulation Through Dietary Intervention: Impact on Inflammatory Biomarkers',
    authors: ['Martinez, L.', 'Kumar, P.', 'Wong, S.'],
    journal: 'Journal of Inflammation Research',
    year: 2022,
    doi: '10.1000/infl456',
    abstract: 'This intervention study investigated the effects of prebiotic fiber supplementation on gut microbiome composition and inflammatory biomarkers in adults with elevated inflammation.',
    keywords: ['microbiome', 'inflammation', 'prebiotics', 'dietary fiber', 'immune function'],
    findings: [
      'Significant shifts in microbiome diversity after 8 weeks of intervention',
      'Reduction in CRP and IL-6 levels correlating with microbiome changes',
      'Strongest effects observed in subjects with baseline dysbiosis'
    ],
    methodology: 'Randomized intervention with 186 participants receiving either prebiotic supplement or placebo for 12 weeks with comprehensive microbiome sequencing and biomarker analysis.',
    limitations: 'Limited to adults with elevated inflammatory markers at baseline.',
    citations: 64
  }
];