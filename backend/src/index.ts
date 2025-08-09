import { Hono } from "hono";

import { auth } from "./lib/auth"; // path to your auth file
import { cors } from "hono/cors";

import { logger } from "hono/logger";

import { moviesRoutes } from "./routes/movies";
import { usersRoutes } from "./routes/users";

const app = new Hono();

// Global middleware (optional)
app.use("*", logger());

app.use("*", cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/api/", (c) => {
  return c.json({ msg: "Welcome to FilmBoxd API!" });
});

// Auth routes
// app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));
app.on(["POST", "GET"], "/api/auth/*", (c) => {
  console.log("Auth route hit:", c.req.url);
  return auth.handler(c.req.raw);
});

// Mounting routes
app.route("/api/movies", moviesRoutes);
app.route("/api/user", usersRoutes);

export default {
  port: Bun.env.PORT,
  fetch: app.fetch,
};
