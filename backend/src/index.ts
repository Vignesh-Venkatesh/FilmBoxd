import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { moviesRoutes } from "./routes/movies";

const app = new Hono();

// Global middleware (optional)
app.use("*", logger());

app.use("*", cors());

app.get("/api/", (c) => {
  return c.json({ msg: "Welcome to FilmBoxd API!" });
});

// Mounting routes
app.route("/api/movies", moviesRoutes);

export default {
  port: 5000,
  fetch: app.fetch,
};
