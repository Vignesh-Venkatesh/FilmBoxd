import axios from "axios";
import {
  getMovieById as dbGetMovieById,
  insertMovie,
} from "../db/movieDBUtils";
import type { Movie } from "../types";

const TMDB_API_KEY = Bun.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// function to get searched movie
export async function getSearchedMovie(movie: string, page: number = 1) {
  const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(
    movie
  )}&page=${page}`;

  try {
    // if fetch is successful
    const { data } = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });

    return { msg: data, status: 200 };
  } catch (error) {
    // if fetch failed
    return { error: `Failed to fetch searched movie: ${movie}.`, status: 400 };
  }
}

// function to get popular movies this week
export async function getPopularMovies(page: number = 1) {
  const url = `${BASE_URL}/movie/popular?page=${page}`;

  try {
    // if fetch is successful
    const { data } = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });
    return { msg: data, status: 200 };
  } catch (error) {
    //   if fetch failed
    return { error: "Failed to fetch popular movies.", status: 400 };
  }
}

// function to get now playing movies this week
export async function getNowPlayingMovies(page: number = 1) {
  const url = `${BASE_URL}/movie/now_playing?page=${page}`;

  try {
    // if fetch is successful
    const { data } = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });
    return { msg: data, status: 200 };
  } catch (error) {
    //   if fetch failed
    return { error: "Failed to fetch now playing movies.", status: 400 };
  }
}

// function to get movie by id
export async function getMovieById(movie_id: string) {
  try {
    // checking if movie exists in local DB
    const movieIdNum = parseInt(movie_id, 10);
    const movieFromDb: Movie | null = await dbGetMovieById(movieIdNum);

    if (movieFromDb) {
      return { msg: movieFromDb, status: 200 };
    }

    // if movie is not in DB, we fetch from TMDB
    const url = `${BASE_URL}/movie/${movie_id}`;
    const { data } = await axios.get<Movie>(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });

    // inserting into DB for caching
    await insertMovie(data);

    return { msg: data, status: 200 };
  } catch (error) {
    return {
      error: `Failed to fetch movie_id: ${movie_id} details.`,
      status: 400,
    };
  }
}

// function to get reccomendation based on a film
export async function getRecommendation(movie_id: string) {
  const url = `${BASE_URL}/movie/${movie_id}/recommendations`;

  try {
    // if fetch is successful
    const { data } = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });
    return { msg: data, status: 200 };
  } catch (error) {
    //   if fetch failed
    return {
      error: `Failed to fetch recommendation for ${movie_id}.`,
      status: 400,
    };
  }
}

// function to get cast of the film
export async function getCast(movie_id: string) {
  const url = `${BASE_URL}/movie/${movie_id}/credits`;

  try {
    // if fetch is successful
    const { data } = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });
    return { msg: data.cast, status: 200 };
  } catch (error) {
    //   if fetch failed
    return {
      error: `Failed to fetch cast for ${movie_id}.`,
      status: 400,
    };
  }
}
