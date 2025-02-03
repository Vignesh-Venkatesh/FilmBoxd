// Importing necessary packages
const express = require("express");
const cors = require("cors"); // Import cors
require("dotenv").config();

// Importing Routes
const tmdbRoute = require("./tmdb");

// Initializing an instance of express
const app = express();

// port value
const port = process.env.PORT;

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type"], // Allow specific headers
  })
);

// Movies Route
// Has the following:
// - Now Showing
// - Upcoming
app.use("/api/v1/movies", tmdbRoute);

app.get("/api/v1", (req, res) => {
  res.send({ msg: "Welcome to the FilmBoxd API", status: 200 });
});

app.listen(port, () => {
  console.log(`FilmBoxd app listening on port ${port}`);
});
