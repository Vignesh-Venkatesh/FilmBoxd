import { Hono } from "hono";

import { getRecentUsers } from "../db/userDBUtils";
import {
  getRecentFavorited,
  getRecentWatched,
  getRecentWatchlisted,
} from "../db/recentDBUtils";

export const recentRoutes = new Hono();

// GET /recent/users
recentRoutes.get("/users", async (c) => {
  try {
    const recentUsers = await getRecentUsers(); // default limit is 5
    return c.json({ msg: { data: recentUsers }, status: 200 });
  } catch (error) {
    console.error("Error fetching recent users:", error);
    return c.json({ msg: "Internal server error", status: 500 }, 500);
  }
});

// GET /recent/watched
recentRoutes.get("/watched", async (c) => {
  try {
    const recentWatched = await getRecentWatched(10);
    return c.json({ data: recentWatched, status: 200 });
  } catch (error) {
    console.error("Error fetching recently watched films", error);
    return c.json({ msg: "Internal server error", status: 500 }, 500);
  }
});

// GET /recent/favorites
recentRoutes.get("/favorites", async (c) => {
  try {
    const recentFavorited = await getRecentFavorited(10);
    return c.json({ data: recentFavorited, status: 200 });
  } catch (error) {
    console.error("Error fetching recently favorited films", error);
    return c.json({ msg: "Internal server error", status: 500 }, 500);
  }
});

// GET /recent/watchlisted
recentRoutes.get("/watchlisted", async (c) => {
  try {
    const recentWatchlisted = await getRecentWatchlisted(10);
    return c.json({ data: recentWatchlisted, status: 200 });
  } catch (error) {
    console.error("Error fetching recently watchlisted films", error);
    return c.json({ msg: "Internal server error", status: 500 }, 500);
  }
});
