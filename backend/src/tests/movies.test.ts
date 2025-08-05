import { Hono } from "hono";
import { moviesRoutes } from "../routes/movies";
import { expect, test } from "bun:test";

// using to test the router in isolation
const app = new Hono().route("/movies", moviesRoutes);

// popular
test("GET /movies/popular returns 200", async () => {
  const res = await app.request("/movies/popular");
  const json = await res.json();

  expect(res.status).toBe(200);
  expect(json).toHaveProperty("msg");
});

// now playing
test("GET /movies/now-playing returns 200", async () => {
  const res = await app.request("/movies/now-playing");
  const json = await res.json();

  expect(res.status).toBe(200);
  expect(json).toHaveProperty("msg");
});

// similar/recommendation
test("GET /movies/similar/:id returns 200", async () => {
  const testId = "550"; // TMDB ID for "Fight Club"
  const res = await app.request(`/movies/similar/${testId}`);
  const json = await res.json();

  expect(res.status).toBe(200);
  expect(json).toHaveProperty("msg");
});

test("GET /movies/similar/:id returns 400", async () => {
  const testId = "123738927340"; // invalid TMDB ID
  const res = await app.request(`/movies/similar/${testId}`);
  const json = await res.json();

  expect(res.status).toBe(400);
  expect(json).toHaveProperty("error");
});

// cast
test("GET /movies/cast/:id returns 200", async () => {
  const testId = "550"; // TMDB ID for "Fight Club"
  const res = await app.request(`/movies/cast/${testId}`);
  const json = await res.json();

  expect(res.status).toBe(200);
  expect(json).toHaveProperty("msg");
});

test("GET /movies/cast/:id returns 400", async () => {
  const testId = "123738927340"; // invalid TMDB ID
  const res = await app.request(`/movies/cast/${testId}`);
  const json = await res.json();

  expect(res.status).toBe(400);
  expect(json).toHaveProperty("error");
});

// based on movie id
test("GET /movies/:id returns 200", async () => {
  const testId = "550"; // TMDB ID for "Fight Club"
  const res = await app.request(`/movies/${testId}`);
  const json = await res.json();

  expect(res.status).toBe(200);
  expect(json).toHaveProperty("msg");
});

test("GET /movies/:id returns 400", async () => {
  const testId = "123738927340"; // invalid TMDB ID
  const res = await app.request(`/movies/${testId}`);
  const json = await res.json();

  expect(res.status).toBe(400);
  expect(json).toHaveProperty("error");
});
