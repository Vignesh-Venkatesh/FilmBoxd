import { Hono } from "hono";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getMovieById,
  getRecommendation,
  getCast,
  getSearchedMovie,
} from "../lib/tmdb";
import {
  getRandomMovie,
  getMovieReviewsByTmdbId,
  getLatestReviews,
} from "../db/movieDBUtils";

export const moviesRoutes = new Hono();

// GET /movies/reviews
moviesRoutes.get("/reviews", async (c) => {
  try {
    // fetch query params
    const tmdbId = c.req.query("tmdbId");
    const page = parseInt(c.req.query("page") || "1");
    const limit = 5; // latest 10 reviews per page
    const offset = (page - 1) * limit;

    let reviews, total;

    if (tmdbId) {
      // fetch latest reviews for a specific film
      ({ reviews, total } = await getMovieReviewsByTmdbId(
        tmdbId,
        limit,
        offset
      ));
    } else {
      // fetch latest reviews across all films
      ({ reviews, total } = await getLatestReviews(limit, offset));
    }

    return c.json({
      data: reviews,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    return c.json({ msg: "Internal server error", status: 500 }, 500);
  }
});

// GET /movies/random
moviesRoutes.get("/random", async (c) => {
  const movie = await getRandomMovie();
  return c.json({ msg: movie, status: 200 });
});

// GET /movies/search?movie=x&page=x
moviesRoutes.get("/search", async (c) => {
  const movie = c.req.query("movie");
  const page = parseInt(c.req.query("page") || "1");

  const { msg, error, status } = await getSearchedMovie(movie, page);

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
