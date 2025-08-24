import { query } from "./db";
import type { Movie } from "../types";

// getting latest reviews for all movies
export async function getLatestReviews(limit: number, offset: number) {
  const res = await query(
    `
    SELECT r.id,
           r.user_id,
           u.id,
           u.name,
           u.image,
           r.tmdb_id,
           m.title,
           m.poster_path,
           r.rating,
           r.review_text,
           r.created_at,
           r.updated_at,
           COUNT(rl.id) AS like_count
    FROM reviews r
    JOIN "user" u ON r.user_id = u.id
    LEFT JOIN movies m ON r.tmdb_id = m.id
    LEFT JOIN review_likes rl ON r.id = rl.review_id
    GROUP BY r.id, u.id, u.name, m.title, m.poster_path
    ORDER BY r.created_at DESC
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );

  const totalRes = await query(`SELECT COUNT(*) FROM reviews`);
  return {
    reviews: res.rows,
    total: parseInt(totalRes.rows[0].count, 10),
  };
}

// getting latest reviews for a particular movie
export async function getMovieReviewsByTmdbId(
  tmdbId: string,
  limit: number,
  offset: number
) {
  const res = await query(
    `
    SELECT r.id,
           r.user_id,
           u.id,
           u.name,
           u.image,
           r.tmdb_id,
           m.title,
           m.poster_path,
           r.rating,
           r.review_text,
           r.created_at,
           r.updated_at,
           COUNT(rl.id) AS like_count
    FROM reviews r
    JOIN "user" u ON r.user_id = u.id
    LEFT JOIN movies m ON r.tmdb_id = m.id
    LEFT JOIN review_likes rl ON r.id = rl.review_id
    WHERE r.tmdb_id = $1
    GROUP BY r.id, u.id, u.name, m.title, m.poster_path
    ORDER BY r.created_at DESC
    LIMIT $2 OFFSET $3
    `,
    [tmdbId, limit, offset]
  );

  const totalRes = await query(
    `SELECT COUNT(*) FROM reviews WHERE tmdb_id = $1`,
    [tmdbId]
  );

  return {
    reviews: res.rows,
    total: parseInt(totalRes.rows[0].count, 10),
  };
}

// getting a random movie from the database
export async function getRandomMovie(): Promise<Movie | null> {
  const res = await query("SELECT * FROM movies ORDER BY RANDOM() LIMIT 1");
  return res.rows[0] || null;
}

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
