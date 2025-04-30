
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
      "Changements favorables dans la composition du microbiote"
    ],
    doi: "10.1053/j.gastro.2023.02.014"
  }
];
