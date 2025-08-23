import { query } from "./db";
import type {
  User,
  WatchedMovie,
  WatchlistedMovie,
  FavoriteMovie,
  Review,
} from "../types";

// getting user info
export async function getUserInfo(name: string): Promise<User | null> {
  const res = await query(
    'SELECT "id", "name", "email", "image", "createdAt" FROM "user" WHERE name = $1',
    [name]
  );
  return res.rows[0] || null;
}

// ================== REVIEW ====================

// getting user reviews
export async function getUserReviews(
  userId: string,
  limit: number,
  offset: number
): Promise<{ reviews: Review[]; total: number }> {
  const reviewsRes = await query(
    `
    SELECT id, tmdb_id, rating, review_text, created_at, updated_at
    FROM reviews
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `,
    [userId, limit, offset]
  );

  const countRes = await query(
    `
    SELECT COUNT(*) AS total
    FROM reviews
    WHERE user_id = $1
  `,
    [userId]
  );

  return {
    reviews: reviewsRes.rows,
    total: parseInt(countRes.rows[0].total),
  };
}

// getting average rating and total reviews for this user
export async function getUserAverageRating(
  userId: string
): Promise<{ avgRating: number | null; reviewCount: number }> {
  const res = await query(
    `
    SELECT AVG(rating) AS avg_rating, COUNT(*) AS review_count
    FROM reviews
    WHERE user_id = $1
  `,
    [userId]
  );

  return {
    avgRating: res.rows[0].avg_rating
      ? parseFloat(res.rows[0].avg_rating)
      : null,
    reviewCount: parseInt(res.rows[0].review_count),
  };
}

export async function checkIfReviewed(
  user_id: string,
  tmdb_id: string
): Promise<{ review: Review[] | null; reviewed: boolean }> {
  const res = await query(
    `
    SELECT *
    FROM reviews
    WHERE user_id = $1 AND tmdb_id = $2
    LIMIT 1
  `,
    [user_id, tmdb_id]
  );

  const reviewed = res.rows.length > 0;

  return {
    review: reviewed ? res.rows : null,
    reviewed,
  };
}

// adding reviewed movie of user
export async function addReview(
  userId: string,
  tmdbId: string,
  rating: number,
  reviewText?: string
) {
  console.log(userId, tmdbId, rating, reviewText);
  const res = await query(
    `
      INSERT INTO reviews (user_id, tmdb_id, rating, review_text)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id, tmdb_id)
      DO UPDATE SET rating = EXCLUDED.rating, review_text = EXCLUDED.review_text, updated_at = NOW()
      RETURNING *;
      `,
    [userId, tmdbId, rating ?? null, reviewText ?? null]
  );
  return res.rows || null;
}

// remove reviewed movie of user
export async function removeReview(userId: string, tmdbId: string) {
  const res = await query(
    `DELETE FROM reviews WHERE user_id = $1 AND tmdb_id = $2 RETURNING *`,
    [userId, tmdbId]
  );
  return res.rows[0] || null;
}

// ================== WATCHED ====================

// checking if movie is watched by user
export async function checkIfWatched(
  user_id: string,
  tmdb_id: string
): Promise<boolean> {
  const res = await query(
    `
    SELECT 1
    FROM watched
    WHERE user_id = $1 AND tmdb_id = $2
    LIMIT 1
  `,
    [user_id, tmdb_id]
  );

  return res.rows.length > 0;
}

// getting watched movies of user
export async function getUserWatched(
  userId: string,
  limit: number,
  offset: number
): Promise<{ watched: WatchedMovie[]; total: number }> {
  // paginated watched movies
  const watchedRes = await query(
    `
    SELECT id, tmdb_id, watched_at
    FROM watched
    WHERE user_id = $1
    ORDER BY watched_at DESC
    LIMIT $2 OFFSET $3
  `,
    [userId, limit, offset]
  );

  // total count for pagination
  const countRes = await query(
    `
    SELECT COUNT(*) AS total
    FROM watched
    WHERE user_id = $1
  `,
    [userId]
  );

  return {
    watched: watchedRes.rows,
    total: parseInt(countRes.rows[0].total),
  };
}

// adding watched movie of user
export async function addWatched(userId: string, tmdbId: string) {
  const res = await query(
    `INSERT INTO watched (user_id, tmdb_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *`,
    [userId, tmdbId]
  );
  return res.rows[0] || null;
}

// removing watched movie of user
export async function removeWatched(userId: string, tmdbId: string) {
  const res = await query(
    `DELETE FROM watched WHERE user_id = $1 AND tmdb_id = $2 RETURNING *`,
    [userId, tmdbId]
  );
  return res.rows[0] || null;
}

// ================== WATCHLISTED ====================
// checking if movie is watchlisted by user
export async function checkIfWatchlisted(
  user_id: string,
  tmdb_id: string
): Promise<boolean> {
  const res = await query(
    `
    SELECT 1
    FROM watchlisted
    WHERE user_id = $1 AND tmdb_id = $2
    LIMIT 1
  `,
    [user_id, tmdb_id]
  );

  return res.rows.length > 0;
}

// getting watchlisted movies of user
export async function getUserWatchlisted(
  userId: string,
  limit: number,
  offset: number
): Promise<{ watchlisted: WatchlistedMovie[]; total: number }> {
  const watchlistedRes = await query(
    `
    SELECT id, tmdb_id, added_at
    FROM watchlisted
    WHERE user_id = $1
    ORDER BY added_at DESC
    LIMIT $2 OFFSET $3
  `,
    [userId, limit, offset]
  );

  const countRes = await query(
    `
    SELECT COUNT(*) AS total
    FROM watchlisted
    WHERE user_id = $1
  `,
    [userId]
  );

  return {
    watchlisted: watchlistedRes.rows,
    total: parseInt(countRes.rows[0].total),
  };
}

// adding watchlisted movie of user
export async function addWatchlisted(userId: string, tmdbId: string) {
  const res = await query(
    `INSERT INTO watchlisted (user_id, tmdb_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *`,
    [userId, tmdbId]
  );
  return res.rows[0] || null;
}

// removing watchlisted movie of user
export async function removeWatchlisted(userId: string, tmdbId: string) {
  const res = await query(
    `DELETE FROM watchlisted WHERE user_id = $1 AND tmdb_id = $2 RETURNING *`,
    [userId, tmdbId]
  );
  return res.rows[0] || null;
}

// ================== FAVORITES ======================

// checking if movie is favorited by user
export async function checkIfFavorited(
  user_id: string,
  tmdb_id: string
): Promise<boolean> {
  const res = await query(
    `
    SELECT 1
    FROM favorites
    WHERE user_id = $1 AND tmdb_id = $2
    LIMIT 1
  `,
    [user_id, tmdb_id]
  );

  return res.rows.length > 0;
}

// get favorite movies of user
export async function getUserFavorites(
  userId: string,
  limit: number,
  offset: number
): Promise<{ favorites: FavoriteMovie[]; total: number }> {
  const favoritesRes = await query(
    `
    SELECT id, tmdb_id, favorited_at
    FROM favorites
    WHERE user_id = $1
    ORDER BY favorited_at DESC
    LIMIT $2 OFFSET $3
  `,
    [userId, limit, offset]
  );

  const countRes = await query(
    `
    SELECT COUNT(*) AS total
    FROM favorites
    WHERE user_id = $1
  `,
    [userId]
  );

  return {
    favorites: favoritesRes.rows,
    total: parseInt(countRes.rows[0].total),
  };
}

// adding favorite movie of user
export async function addFavorite(userId: string, tmdbId: string) {
  const res = await query(
    `INSERT INTO favorites (user_id, tmdb_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *`,
    [userId, tmdbId]
  );
  return res.rows[0] || null;
}

// removing favorite movie of user
export async function removeFavorite(userId: string, tmdbId: string) {
  const res = await query(
    `DELETE FROM favorites WHERE user_id = $1 AND tmdb_id = $2 RETURNING *`,
    [userId, tmdbId]
  );
  return res.rows[0] || null;
}

// ================= MISC =================

// get recent users
export async function getRecentUsers() {
  const res = await query(
    `
    SELECT name, image, "createdAt"
    FROM "user"
    ORDER BY "createdAt" DESC
    LIMIT 5
  `
  );

  return res.rows || null;
}
