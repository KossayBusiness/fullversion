
export interface StudyData {
  id: number;
  title: string;
  authors: string;
  year: number;
  tags: string[];
  description: string;
  methodology: string;
  participants: number;
  duration: string;
  studyType: string;
  keyFindings: string[];
  charts?: boolean;
  doi?: string;
}

export const studyData: StudyData[] = [
  {
    id: 1,
    title: "Effets du magnésium sur le stress et l'anxiété",
    authors: "Dubois, M., Martin, J., et al.",
    year: 2023,
    tags: ["Stress", "Magnésium", "Anxiété"],
    description: "Cette étude a évalué l'impact d'une supplémentation en magnésium sur les niveaux de stress et d'anxiété chez des adultes soumis à un stress chronique.",
    methodology: "Étude randomisée en double aveugle contre placebo sur 12 semaines avec mesure des niveaux de cortisol salivaire et questionnaires d'anxiété validés (STAI).",
    participants: 124,
    duration: "12 semaines",
    studyType: "Randomisée double aveugle",
    keyFindings: [
      "Réduction significative des marqueurs de stress (-28% de cortisol salivaire)",
      "Amélioration de la qualité du sommeil (+45% sur l'index de qualité de sommeil de Pittsburgh)",
      "Résultats visibles dès 2 semaines de supplémentation",
      "Effets plus prononcés chez les sujets présentant une carence initiale en magnésium"
    ],
    charts: true,
    doi: "10.1016/j.jad.2023.05.012"
  },
  {
    id: 2,
    title: "Impact des oméga-3 sur l'inflammation et les marqueurs cardiovasculaires",
    authors: "Leroy, S., Petit, A., et al.",
    year: 2022,
    tags: ["Oméga-3", "Inflammation", "Cardiovasculaire"],
    description: "Cette recherche a étudié les effets d'une supplémentation en acides gras oméga-3 (EPA et DHA) sur les marqueurs inflammatoires et le profil lipidique.",
    methodology: "Essai clinique contrôlé avec trois groupes (placebo, dose standard, dose élevée) sur 24 semaines avec analyses sanguines régulières.",
    participants: 186,
    duration: "24 semaines",
    studyType: "Essai contrôlé multicentrique",
    keyFindings: [
      "Réduction de la CRP (protéine C-réactive) de 35% dans le groupe à dose élevée",
      "Amélioration du ratio LDL/HDL cholestérol (-18%)",
      "Diminution des triglycérides plasmatiques de 25%",
      "Effet dose-dépendant observé sur tous les marqueurs"
    ],
    charts: true,
    doi: "10.1093/ajcn/nqy132"
  },
  {
    id: 3,
    title: "Efficacité de la vitamine D sur la fonction immunitaire chez les seniors",
    authors: "Bernard, C., Nguyen, T., et al.",
    year: 2022,
    tags: ["Vitamine D", "Immunité", "Seniors"],
    description: "Cette étude a évalué l'impact d'une supplémentation en vitamine D3 sur la fonction immunitaire et la résistance aux infections respiratoires chez les personnes âgées.",
    methodology: "Étude longitudinale sur 12 mois avec supplémentation quotidienne et suivi des infections respiratoires et des paramètres immunitaires.",
    participants: 312,
    duration: "12 mois",
    studyType: "Étude longitudinale",
    keyFindings: [
      "Réduction de 42% de l'incidence des infections respiratoires",
      "Augmentation de 30% de l'activité des cellules natural killer",
      "Normalisation des marqueurs d'inflammation chez 68% des participants",
      "Corrélation positive entre niveau sérique de vitamine D et fonction immunitaire"
    ],
    doi: "10.1016/j.clnu.2022.01.005"
  },
  {
    id: 4,
    title: "Curcuma et récupération musculaire post-exercice",
    authors: "Moreau, P., Lefevre, N., et al.",
    year: 2021,
    tags: ["Curcuma", "Récupération", "Sport"],
    description: "Cette recherche a exploré les effets anti-inflammatoires du curcuma sur la récupération musculaire et les douleurs post-exercice chez des athlètes.",
    methodology: "Protocole croisé avec période de wash-out comparant curcuma vs placebo après exercice excentrique intense.",
    participants: 48,
    duration: "8 semaines",
    studyType: "Étude croisée",
    keyFindings: [
      "Réduction de 29% des marqueurs de dommages musculaires (CK)",
      "Diminution de la perception de douleur musculaire (-35%)",
      "Récupération de la force 24h plus rapide vs placebo",
      "Réduction des cytokines pro-inflammatoires IL-6 et TNF-α"
    ],
    charts: true
  },
  {
    id: 5,
    title: "Probiotiques et santé intestinale chez les patients atteints du syndrome de l'intestin irritable",
    authors: "Lambert, A., Schmitt, P., et al.",
    year: 2023,
    tags: ["Probiotiques", "Microbiote", "Intestin"],
    description: "Évaluation de l'efficacité d'une formulation multi-souches de probiotiques sur les symptômes du syndrome de l'intestin irritable et la perméabilité intestinale.",
    methodology: "Essai randomisé contrôlé comparant une formulation probiotique spécifique vs placebo pendant 16 semaines avec suivi des symptômes et marqueurs biologiques.",
    participants: 96,
    duration: "16 semaines",
    studyType: "Essai randomisé contrôlé",
    keyFindings: [
      "Réduction de 51% des douleurs abdominales",
      "Amélioration de la régularité intestinale chez 78% des participants",
      "Diminution de 40% des marqueurs de perméabilité intestinale",
      "Changement significatif dans la composition du microbiome",
      "Amélioration des scores de qualité de vie de 62%"
    ],
    doi: "10.1053/j.gastro.2023.02.018"
  },
  
  {
    id: 6,
    title: "Impact du magnésium sur la qualité du sommeil et l'anxiété",
    authors: "Dubois, F., Martin, L., et al.",
    year: 2022,
    tags: ["Magnésium", "Sommeil", "Anxiété"],
    description: "Cette étude examine l'effet d'une supplémentation quotidienne en magnésium sur la qualité du sommeil et les symptômes d'anxiété.",
    methodology: "Essai clinique en double aveugle comparant la supplémentation en magnésium à un placebo sur 8 semaines.",
    participants: 124,
    duration: "8 semaines",
    studyType: "Essai clinique randomisé",
    keyFindings: [
      "Amélioration de 23% du temps d'endormissement",
      "Augmentation de 16% du temps de sommeil profond",
      "Réduction de 31% des scores d'anxiété",
      "Diminution de 18% des réveils nocturnes"
    ],
    charts: true,
    doi: "10.1111/jsr.2022.31.e13572"
  }hangements favorables dans la composition du microbiote"
    ],
    doi: "10.1053/j.gastro.2023.02.014"
  }
];
import { ArrowRight } from "lucide-react";

// Types
export interface ResearchStudy {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  abstract: string;
  doi: string;
  imageUrl: string;
  category: string;
  tags: string[];
  highlights: string[];
  citation: string;
  downloadUrl?: string;
}

// Mock data for research studies
export const researchStudies: ResearchStudy[] = [
  {
    id: "study1",
    title: "Effects of Omega-3 Fatty Acid Supplementation on Cognitive Function and Neuroinflammation",
    authors: "Johnson AR, Chen WL, Peterson S, et al.",
    journal: "Journal of Nutrition & Cognitive Sciences",
    year: 2023,
    abstract: "This randomized controlled trial investigated the effects of high-dose omega-3 fatty acid supplementation on cognitive function and neuroinflammatory markers in adults aged 55-75. After 24 weeks of supplementation, the treatment group showed significant improvements in working memory and executive function compared to placebo. Serum markers of neuroinflammation were also reduced, suggesting a potential mechanism for cognitive benefits.",
    doi: "10.1234/jncs.2023.05.1234",
    imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1470&auto=format&fit=crop",
    category: "Cognitive Health",
    tags: ["Omega-3", "EPA", "DHA", "Cognitive Function", "Neuroinflammation", "Memory"],
    highlights: [
      "24-week randomized controlled trial with 180 participants",
      "Significant improvement in working memory and executive function",
      "Reduction in serum neuroinflammatory markers",
      "Dose-dependent effect observed with higher EPA:DHA ratio"
    ],
    citation: "Johnson AR, Chen WL, Peterson S, et al. Effects of Omega-3 Fatty Acid Supplementation on Cognitive Function and Neuroinflammation. J Nutr Cogn Sci. 2023;15(3):124-138."
  },
  {
    id: "study2",
    title: "Efficacy of Magnesium Bisglycinate on Sleep Quality and Anxiety: A Double-Blind Placebo-Controlled Study",
    authors: "Santos M, Kim J, Patel R, et al.",
    journal: "International Journal of Sleep Medicine",
    year: 2022,
    abstract: "This study examined the effects of magnesium bisglycinate supplementation on sleep quality and anxiety levels in individuals with mild to moderate insomnia. After 8 weeks, participants receiving magnesium bisglycinate showed significant improvements in sleep onset latency, sleep efficiency, and self-reported sleep quality compared to placebo. Anxiety scores decreased by 23% in the treatment group versus 3% in the placebo group.",
    doi: "10.5678/ijsm.2022.07.3456",
    imageUrl: "https://images.unsplash.com/photo-1541199249251-f713e6145474?q=80&w=1447&auto=format&fit=crop",
    category: "Sleep Health",
    tags: ["Magnesium", "Insomnia", "Anxiety", "Sleep Quality", "Stress"],
    highlights: [
      "8-week intervention with 120 adults with mild-moderate insomnia",
      "Significant improvement in sleep onset latency (42% reduction)",
      "Improvement in sleep efficiency and self-reported sleep quality",
      "23% reduction in anxiety scores in treatment group"
    ],
    citation: "Santos M, Kim J, Patel R, et al. Efficacy of Magnesium Bisglycinate on Sleep Quality and Anxiety: A Double-Blind Placebo-Controlled Study. Int J Sleep Med. 2022;10(2):87-99."
  },
  {
    id: "study3",
    title: "Synergistic Effects of Curcumin and Boswellia Extract on Inflammatory Markers and Joint Function in Osteoarthritis",
    authors: "Lee CW, Wang S, Malhotra A, et al.",
    journal: "Journal of Rheumatology and Natural Medicine",
    year: 2023,
    abstract: "This study investigated the combined effects of curcumin and Boswellia serrata extract on inflammatory markers and joint function in patients with knee osteoarthritis. The 12-week intervention demonstrated that the combination therapy significantly reduced IL-6, TNF-α, and CRP levels compared to either treatment alone or placebo. Joint function and pain scores showed greater improvement in the combination group, suggesting synergistic anti-inflammatory effects.",
    doi: "10.9012/jrnm.2023.02.5678",
    imageUrl: "https://images.unsplash.com/photo-1618939304347-e91b1f33d2ab?q=80&w=1528&auto=format&fit=crop",
    category: "Joint Health",
    tags: ["Curcumin", "Boswellia", "Inflammation", "Osteoarthritis", "Joint Function"],
    highlights: [
      "12-week randomized trial with 160 patients with knee osteoarthritis",
      "Significant reduction in inflammatory markers (IL-6, TNF-α, CRP)",
      "Greater improvement in joint function and pain with combination therapy",
      "Synergistic effects observed compared to single-ingredient interventions"
    ],
    citation: "Lee CW, Wang S, Malhotra A, et al. Synergistic Effects of Curcumin and Boswellia Extract on Inflammatory Markers and Joint Function in Osteoarthritis. J Rheumatol Nat Med. 2023;8(4):209-224."
  },
  {
    id: "study4",
    title: "Impact of Vitamin D3 and K2 Co-Supplementation on Arterial Stiffness and Vascular Calcification Markers",
    authors: "Garcia F, Thompson R, Nakamura T, et al.",
    journal: "Vascular Health and Therapeutics",
    year: 2022,
    abstract: "This clinical trial examined the effects of combined vitamin D3 and K2 supplementation on arterial stiffness and markers of vascular calcification in adults with vitamin D insufficiency. After 6 months, the combination therapy group showed significant improvements in pulse wave velocity and reductions in calcification markers compared to vitamin D3 alone or placebo. These findings suggest that K2 enhances the vascular benefits of vitamin D3 supplementation.",
    doi: "10.3456/vht.2022.09.7890",
    imageUrl: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=1528&auto=format&fit=crop",
    category: "Cardiovascular Health",
    tags: ["Vitamin D3", "Vitamin K2", "Arterial Stiffness", "Vascular Calcification", "Cardiovascular"],
    highlights: [
      "6-month intervention with 200 adults with vitamin D insufficiency",
      "Significant reduction in pulse wave velocity (marker of arterial stiffness)",
      "Reduction in markers of vascular calcification",
      "K2 prevented vitamin D-induced increase in calcium bioavailability"
    ],
    citation: "Garcia F, Thompson R, Nakamura T, et al. Impact of Vitamin D3 and K2 Co-Supplementation on Arterial Stiffness and Vascular Calcification Markers. Vasc Health Ther. 2022;25(3):145-159."
  },
  {
    id: "study5",
    title: "Prebiotic Fiber Blend Effects on Gut Microbiome Composition and Inflammatory Markers in Irritable Bowel Syndrome",
    authors: "Wilson E, Gupta S, Martinez K, et al.",
    journal: "Microbiome Research",
    year: 2023,
    abstract: "This study investigated the effects of a specialized prebiotic fiber blend on gut microbiome composition and inflammatory markers in patients with Irritable Bowel Syndrome (IBS). Following a 10-week intervention, participants showed significant increases in beneficial bacteria including Bifidobacterium and Akkermansia species, along with decreased intestinal permeability markers and pro-inflammatory cytokines. Symptom severity scores improved by 47% compared to 11% in the placebo group.",
    doi: "10.7891/mr.2023.04.2345",
    imageUrl: "https://images.unsplash.com/photo-1635014002851-f5e2c3a23812?q=80&w=1470&auto=format&fit=crop",
    category: "Digestive Health",
    tags: ["Prebiotics", "Microbiome", "IBS", "Inflammation", "Gut Health", "Intestinal Permeability"],
    highlights: [
      "10-week trial with 150 IBS patients",
      "Significant increase in beneficial bacteria (Bifidobacterium, Akkermansia)",
      "Decrease in intestinal permeability markers and inflammatory cytokines",
      "47% improvement in symptom severity scores vs. 11% in placebo"
    ],
    citation: "Wilson E, Gupta S, Martinez K, et al. Prebiotic Fiber Blend Effects on Gut Microbiome Composition and Inflammatory Markers in Irritable Bowel Syndrome. Microbiome Res. 2023;12(1):67-83."
  },
  {
    id: "study6",
    title: "Berberine and Alpha-Lipoic Acid Combination Improves Glycemic Control and Insulin Sensitivity: A Randomized Trial",
    authors: "Zhang L, Cooper J, Patel A, et al.",
    journal: "Journal of Metabolic Research",
    year: 2023,
    abstract: "This randomized trial evaluated the efficacy of berberine and alpha-lipoic acid (ALA) combination therapy on glycemic control and insulin sensitivity in individuals with impaired glucose tolerance. After 16 weeks, participants receiving the combination therapy showed significant reductions in fasting blood glucose, HbA1c, and HOMA-IR compared to individual compounds or placebo. The combination also improved mitochondrial function and reduced oxidative stress markers.",
    doi: "10.2345/jmr.2023.06.5432",
    imageUrl: "https://images.unsplash.com/photo-1559757175-7cb316bf927e?q=80&w=1631&auto=format&fit=crop",
    category: "Metabolic Health",
    tags: ["Berberine", "Alpha-Lipoic Acid", "Glucose Control", "Insulin Sensitivity", "Metabolic Health"],
    highlights: [
      "16-week randomized controlled trial with 140 participants with impaired glucose tolerance",
      "Significant reductions in fasting blood glucose and HbA1c",
      "Improvement in insulin sensitivity (HOMA-IR)",
      "Enhanced mitochondrial function and reduced oxidative stress"
    ],
    citation: "Zhang L, Cooper J, Patel A, et al. Berberine and Alpha-Lipoic Acid Combination Improves Glycemic Control and Insulin Sensitivity: A Randomized Trial. J Metabol Res. 2023;18(2):112-127."
  }
];
