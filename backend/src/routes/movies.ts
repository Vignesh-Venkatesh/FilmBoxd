import { Hono } from "hono";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getMovieById,
  getRecommendation,
  getCast,
  getSearchedMovie,
} from "../lib/tmdb";
import { getRandomMovie } from "../db/movieDBUtils";

export const moviesRoutes = new Hono();

// GET /movies/random
moviesRoutes.get("/random", async (c) => {
  const movie = await getRandomMovie();
  return c.json({ msg: movie, status: 200 });
});

// GET /movies/search
moviesRoutes.get("/search", async (c) => {
  const movie = c.req.query("movie");
  const { msg, error, status } = await getSearchedMovie(movie);
  return c.json(error ? { error, status } : { msg, status }, status);
});

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
