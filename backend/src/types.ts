import { auth } from "./lib/auth";

export type User = {
  id: string;
  username: string;
  email: string;
  image?: string;
  created_at: string;
};

export type Movie = {
  id: string;
  title: string;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
  runtime?: string;
};

export type WatchedMovie = {
  id: number;
  tmdb_id: number;
  watched_at: string;
};

export type WatchlistedMovie = {
  id: number;
  tmdb_id: number;
  added_at: string;
};

export type FavoriteMovie = {
  id: number;
  tmdb_id: number;
  favorited_at: string;
};

export type Review = {
  id: number;
  tmdb_id: number;
  rating: number;
  review_text: string | null;
  created_at: string;
  updated_at: string;
};

export type HonoEnv = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};
