import express from "express";

// managing sessions
import session from "express-session";

// for environment variables
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

const PORT = process.env.PORT || 3000;

app.get("/api/", (req, res) => {
  res.status(200).json({ msg: "Welcome to the FilmBoxd API!" });
});

app.listen(PORT, () => {
  console.log(`FilmBoxd server running on port: ${PORT}`);
});
