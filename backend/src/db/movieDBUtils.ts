import { query } from "./db";
import type { Movie } from "../types";

// getting a movie by its TMDB id
export async function getMovieById(id: number): Promise<Movie | null> {
  const res = await query("SELECT * FROM movies WHERE id = $1", [id]);
  return res.rows[0] || null;
}

// inserting movie into DB
export async function insertMovie(movie: Movie): Promise<void> {
  await query(
    `
    INSERT INTO movies (
      id,
      title,
      overview,
      poster_path,
      backdrop_path,
      release_date,
      runtime
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (id) DO NOTHING
    `,
    [
      movie.id,
      movie.title,
      movie.overview,
      movie.poster_path,
      movie.backdrop_path,
      movie.release_date,
      movie.runtime?.toString() ?? null,
    ]
  );
}
