import { Hono } from "hono";

import {
  getUserInfo,
  getUserWatched,
  getUserWatchlisted,
  getUserFavorites,
  getUserReviews,
  getUserAverageRating,
  addWatched,
  removeWatched,
  addWatchlisted,
  removeWatchlisted,
  addFavorite,
  removeFavorite,
} from "../db/userDBUtils";

import { authMiddleware } from "../middleware/auth.middleware";

const req_limit = 50;

export const userRoutes = new Hono();

// ==================== WATCHED ====================

// GET /user/:username/watched
userRoutes.get("/:username/watched", async (c) => {
  try {
    // getting username form the URL param
    const username = c.req.param("username");

    // returning error if username is not passed
    if (!username) {
      return c.json({ msg: "Username is required", status: 400 }, 400);
    }

    // fetching user info from the database using the username
    const user = await getUserInfo(username);
    if (!user) {
      return c.json({ msg: "User not found", status: 404 }, 404);
    }

    // pagination query params with default values
    const page = parseInt(c.req.query("page") || "1");
    const limit = req_limit;
    const offset = (page - 1) * limit; // setting page offser

    // getting user's watched films
    const { watched, total } = await getUserWatched(user.id, limit, offset);

    // returning the data
    return c.json({
      data: watched,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      status: 200,
    });
  } catch (error) {
    // return error, if there was any with regards to db fetching
    console.error("Error fetching watched movies:", error);
    return c.json({ msg: "Internal server error", status: 500 }, 500);
  }
});

// POST /user/:username/watched
userRoutes.post("/:username/watched", authMiddleware, async (c) => {
  // getting user info from session and URL param
  const user = c.get("user");
  const username = c.req.param("username");

  // checking if session and URL param info match
  if (username !== user?.name) {
    return c.json(
      { msg: "Forbidden: cannot modify another user's data", status: 403 },
      403
    );
  }

  let tmdbId: string; // for adding movie to watched

  // fetching TMDB id from the body of the POST request
  try {
    const body = await c.req.json();
    tmdbId = body.tmdbId;
  } catch {
    return c.json({ msg: "Invalid JSON body", status: 400 }, 400);
  }

  // if no TMDB id is sent in the body of the request
  if (!tmdbId) {
    return c.json({ msg: "TMDB ID is required", status: 400 }, 400);
  }

  // adding watched movie into the database
  try {
    const added = await addWatched(user.id, tmdbId);

    // send error if movie is already added to watched
    if (!added) {
      return c.json({ msg: "Already marked as watched", status: 409 }, 409);
    }
    // success
    return c.json({ msg: "Marked as watched", data: added, status: 201 }, 201);
  } catch (error) {
    // any db error
    console.error("Error adding to watched:", error);
    return c.json({ msg: "Internal server error", status: 500 }, 500);
  }
});

// DELETE /user/:username/watched
userRoutes.delete("/:username/watched", authMiddleware, async (c) => {
  // gettin user info from sessions and URL param
  const user = c.get("user");
  const username = c.req.param("username");

  // checking if session and URL param info match
  if (username !== user?.name) {
    return c.json(
      { msg: "Forbidden: cannot modify another user's data", status: 403 },
      403
    );
  }

  let tmdbId: string; // for deleting watched movie

  // fetching TMDB id from the body of the DELETE request
  try {
    const body = await c.req.json();
    tmdbId = body.tmdbId;
  } catch {
    return c.json({ msg: "Invalid JSON body", status: 400 });
  }

  // if no TMDB id is sent in the body of the request
  if (!tmdbId) {
    return c.json({ msg: "TMDB ID is required", status: 400 }, 400);
  }

  // removing watched movie from the database
  try {
    const removed = await removeWatched(user.id, tmdbId);

    // send error if movie is already removed
    if (!removed) {
      return c.json({ msg: "Movie not watched already", status: 409 }, 409);
    }

    // success
    return c.json({ msg: "Removed from watched", status: 200 }, 200);
  } catch (error) {
    // any db error
    console.error("Error removing from watched", error);
    return c.json({ msg: "Internal server error", status: 500 }, 500);
  }
});

// ============== WATCHLIST ================

// GET /user/:username/watchlist
userRoutes.get("/:username/watchlist", async (c) => {
  try {
    // getting username from the URL param
    const username = c.req.param("username");

    // returning error if username is not passed
    if (!username) {
      return c.json({ msg: "Username is required", status: 400 }, 400);
    }

    // fetching user info from the database using the username
    const user = await getUserInfo(username);
    if (!user) {
      return c.json({ msg: "User not found", status: 404 }, 404);
    }

    // pagination query params with default values
    const page = parseInt(c.req.query("page") || "1");
    const limit = req_limit;
    const offset = (page - 1) * limit; // setting page offset

    // getting user's watchlist films
    const { watchlisted, total } = await getUserWatchlisted(
      user.id,
      limit,
      offset
    );

    // returning the data
    return c.json({
      data: watchlisted,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      status: 200,
    });
  } catch (error) {
    // return error, if there was any with regards to db fetching
    console.error("Error fetching watchlist movies:", error);
    return c.json({ msg: "Internal server error", status: 500 }, 500);
  }
});

// POST /user/:username/watchlist
userRoutes.post("/:username/watchlist", authMiddleware, async (c) => {
  // getting user info from session and URL param
  const user = c.get("user");
  const username = c.req.param("username");

  // checking if session and URL param info match
  if (username !== user?.name) {
    return c.json(
      { msg: "Forbidden: cannot modify another user's data", status: 403 },
      403
    );
  }

  let tmdbId: string; // for adding movie to watchlist

  // fetching TMDB id from the body of the POST request
  try {
    const body = await c.req.json();
    tmdbId = body.tmdbId;
  } catch {
    return c.json({ msg: "Invalid JSON body", status: 400 }, 400);
  }

  // if no TMDB id is sent in the body of the request
  if (!tmdbId) {
    return c.json({ msg: "TMDB ID is required", status: 400 }, 400);
  }

  // adding movie to watchlist in the database
  try {
    const added = await addWatchlisted(user.id, tmdbId);

    // send error if movie is already added to watchlist
    if (!added) {
      return c.json({ msg: "Already in watchlist", status: 409 }, 409);
    }
    // success
    return c.json({ msg: "Added to watchlist", data: added, status: 201 }, 201);
  } catch (error) {
    // any db error
    console.error("Error adding to watchlist:", error);
    return c.json({ msg: "Internal server error", status: 500 }, 500);
  }
});

// DELETE /user/:username/watchlist
userRoutes.delete("/:username/watchlist", authMiddleware, async (c) => {
  // getting user info from session and URL param
  const user = c.get("user");
  const username = c.req.param("username");

  // checking if session and URL param info match
  if (username !== user?.name) {
    return c.json(
      { msg: "Forbidden: cannot modify another user's data", status: 403 },
      403
    );
  }

  let tmdbId: string; // for deleting movie from watchlist

  // fetching TMDB id from the body of the DELETE request
  try {
    const body = await c.req.json();
    tmdbId = body.tmdbId;
  } catch {
    return c.json({ msg: "Invalid JSON body", status: 400 }, 400);
  }

  // if no TMDB id is sent in the body of the request
  if (!tmdbId) {
    return c.json({ msg: "TMDB ID is required", status: 400 }, 400);
  }

  // removing movie from watchlist in the database
  try {
    const removed = await removeWatchlisted(user.id, tmdbId);

    // send error if movie is not in watchlist
    if (!removed) {
      return c.json({ msg: "Movie not in watchlist", status: 409 }, 409);
    }

    // success
    return c.json({ msg: "Removed from watchlist", status: 200 }, 200);
  } catch (error) {
    // any db error
    console.error("Error removing from watchlist", error);
    return c.json({ msg: "Internal server error", status: 500 }, 500);
  }
});

// =================== FAVORITES ====================

// GET /user/:username/favorites
userRoutes.get("/:username/favorites", async (c) => {
  try {
    // getting username from the URL param
    const username = c.req.param("username");

    // returning error if username is not passed
    if (!username) {
      return c.json({ msg: "Username is required", status: 400 }, 400);
    }

    // fetching user info from the database using the username
    const user = await getUserInfo(username);
    if (!user) {
      return c.json({ msg: "User not found", status: 404 }, 404);
    }

    // pagination query params with default values
    const page = parseInt(c.req.query("page") || "1");
    const limit = req_limit;
    const offset = (page - 1) * limit; // setting page offset

    // getting user's favorite films
    const { favorites, total } = await getUserFavorites(user.id, limit, offset);

    // returning the data
    return c.json({
      data: favorites,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      status: 200,
    });
  } catch (error) {
    // return error, if there was any with regards to db fetching
    console.error("Error fetching favorite movies:", error);
    return c.json({ msg: "Internal server error", status: 500 }, 500);
  }
});

// POST /user/:username/favorites
userRoutes.post("/:username/favorites", authMiddleware, async (c) => {
  // getting user info from session and URL param
  const user = c.get("user");
  const username = c.req.param("username");

  // checking if session and URL param info match
  if (username !== user?.name) {
    return c.json(
      { msg: "Forbidden: cannot modify another user's data", status: 403 },
      403
    );
  }

  let tmdbId: string; // for adding movie to favorites

  // fetching TMDB id from the body of the POST request
  try {
    const body = await c.req.json();
    tmdbId = body.tmdbId;
  } catch {
    return c.json({ msg: "Invalid JSON body", status: 400 }, 400);
  }

  // if no TMDB id is sent in the body of the request
  if (!tmdbId) {
    return c.json({ msg: "TMDB ID is required", status: 400 }, 400);
  }

  // adding movie to favorites in the database
  try {
    const added = await addFavorite(user.id, tmdbId);

    // send error if movie is already in favorites
    if (!added) {
      return c.json({ msg: "Already in favorites", status: 409 }, 409);
    }
    // success
    return c.json({ msg: "Added to favorites", data: added, status: 201 }, 201);
  } catch (error) {
    // any db error
    console.error("Error adding to favorites:", error);
    return c.json({ msg: "Internal server error", status: 500 }, 500);
  }
});

// DELETE /user/:username/favorites
userRoutes.delete("/:username/favorites", authMiddleware, async (c) => {
  // getting user info from session and URL param
  const user = c.get("user");
  const username = c.req.param("username");

  // checking if session and URL param info match
  if (username !== user?.name) {
    return c.json(
      { msg: "Forbidden: cannot modify another user's data", status: 403 },
      403
    );
  }

  let tmdbId: string; // for deleting movie from favorites

  // fetching TMDB id from the body of the DELETE request
  try {
    const body = await c.req.json();
    tmdbId = body.tmdbId;
  } catch {
    return c.json({ msg: "Invalid JSON body", status: 400 }, 400);
  }

  // if no TMDB id is sent in the body of the request
  if (!tmdbId) {
    return c.json({ msg: "TMDB ID is required", status: 400 }, 400);
  }

  // removing movie from favorites in the database
  try {
    const removed = await removeFavorite(user.id, tmdbId);

    // send error if movie is not in favorites
    if (!removed) {
      return c.json({ msg: "Movie not in favorites", status: 409 }, 409);
    }

    // success
    return c.json({ msg: "Removed from favorites", status: 200 }, 200);
  } catch (error) {
    // any db error
    console.error("Error removing from favorites", error);
    return c.json({ msg: "Internal server error", status: 500 }, 500);
  }
});

// =================== REVIEWS ====================

// GET /user/:username/reviews
userRoutes.get("/:username/reviews", async (c) => {
  try {
    const username = c.req.param("username");
    if (!username) {
      return c.json({ msg: "Username is required", status: 400 }, 400);
    }

    const user = await getUserInfo(username);
    if (!user) {
      return c.json({ msg: "User not found", status: 404 }, 404);
    }

    const page = parseInt(c.req.query("page") || "1");
    const limit = req_limit;
    const offset = (page - 1) * limit;

    const { reviews, total } = await getUserReviews(user.id, limit, offset);
    const { avgRating, reviewCount } = await getUserAverageRating(user.id);

    return c.json({
      data: {
        reviews,
        stats: {
          avgRating,
          reviewCount,
        },
      },
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    return c.json({ msg: "Internal server error", status: 500 }, 500);
  }
});

// =================== USER INFO ===================

// GET /user/:username
userRoutes.get("/:username", async (c) => {
  try {
    const username = c.req.param("username");
    if (!username) {
      return c.json({ msg: "Username is required" }, 400);
    }

    const user = await getUserInfo(username);
    if (!user) {
      return c.json({ msg: "User not found" }, 404);
    }

    return c.json({ msg: user }, 200);
  } catch (error) {
    console.error("Error fetching user info:", error);
    return c.json({ msg: "Internal server error" }, 500);
  }
});
