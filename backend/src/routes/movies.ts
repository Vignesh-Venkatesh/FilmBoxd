import { Hono } from "hono";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getMovieById,
  getRecommendation,
  getCast,
} from "../lib/tmdb";

export const moviesRoutes = new Hono();

// GET /movies/popular
moviesRoutes.get("/popular", async (c) => {
  const { msg, error, status } = await getPopularMovies();
  return c.json(error ? { error, status } : { msg, status }, status);
});

// GET /movies/now-playing
moviesRoutes.get("/now-playing", async (c) => {
  const { msg, error, status } = await getNowPlayingMovies();
  return c.json(error ? { error, status } : { msg, status }, status);
});

// GET /movies/similar/:id
moviesRoutes.get("/similar/:id", async (c) => {
  const id = c.req.param("id");
  const { msg, error, status } = await getRecommendation(id);
  return c.json(error ? { error, status } : { msg, status }, status);
});

// GET /movies/cast/:id
moviesRoutes.get("/cast/:id", async (c) => {
  const id = c.req.param("id");
  const { msg, error, status } = await getCast(id);
  return c.json(error ? { error, status } : { msg, status }, status);
});

// GET /movies/:id
moviesRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const { msg, error, status } = await getMovieById(id);
  return c.json(error ? { error, status } : { msg, status }, status);
});
