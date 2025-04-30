
// Profile component types
export interface Article {
  id: number;
  title: string;
  date: string;
  category: string;
}

export interface Challenge {
  id: number;
  name: string;
  progress: number;
  days: string;
}

export interface Recommendation {
  id: number;
  title: string;
  category: string;
}

export interface ProfileData {
  articles: Article[];
  defis: Challenge[];
  recommendations: Recommendation[];
}
