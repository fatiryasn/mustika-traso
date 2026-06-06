export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  author: string | null;
  thumbnail: string | null;
  created_at: string;
}

export interface GetArticlesParams {
  search?: string;
  sort?: { column: string; ascending: boolean };
  page?: number;
  limit?: number;
}