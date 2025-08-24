export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  adult?: boolean;
}

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
}

export interface UserDB {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: string;
  updatedAt: string;
  image?: string | null;
}

export type Review = {
  id: number;
  name: string;
  image?: string | null;
  tmdb_id: number;
  rating: number;
  review_text: string | null;
  created_at: string;
  updated_at: string;
  like_count: number;
  title: string;
  poster_path: string;
};
