import { Hono } from "hono";

import { getRecentUsers } from "../db/userDBUtils";

export const usersRoutes = new Hono();

// GET /users/recent
usersRoutes.get("/recent", async (c) => {
  try {
    const recentUsers = await getRecentUsers(); // default limit is 5
    return c.json({ msg: { data: recentUsers }, status: 200 });
  } catch (error) {
    console.error("Error fetching recent users:", error);
    return c.json({ msg: "Internal server error", status: 500 }, 500);
  }
});
