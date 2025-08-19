import { query } from "./db";
import type {
  User,
  WatchedMovie,
  WatchlistedMovie,
  FavoriteMovie,
  Review,
} from "../types";

// getting recently watched
export async function getRecentWatched(
  limit: number
): Promise<WatchedMovie[] | null> {
  const res = await query(
    `
    SELECT DISTINCT id, tmdb_id, watched_at
    FROM watched
    ORDER BY watched_at DESC
    LIMIT $1
    `,
    [limit]
  );
  return res.rows || null;
}

// getting recently favorited
export async function getRecentFavorited(
  limit: number
): Promise<FavoriteMovie[] | null> {
  const res = await query(
    `
    SELECT DISTINCT id, tmdb_id, favorited_at
    FROM favorites
    ORDER BY favorited_at DESC
    LIMIT $1
    `,
    [limit]
  );
  return res.rows || null;
}

// getting recently watchlisted
export async function getRecentWatchlisted(
  limit: number
): Promise<WatchlistedMovie[] | null> {
  const res = await query(
    `
    SELECT DISTINCT id, tmdb_id, added_at
    FROM watchlisted
    ORDER BY added_at DESC
    LIMIT $1
    `,
    [limit]
  );
  return res.rows || null;
}
