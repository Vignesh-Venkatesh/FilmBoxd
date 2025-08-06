export type User = {
  id: number;
  username: string;
  avatar_url?: string;
  bio?: string;
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
