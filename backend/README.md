## Database Schema

Have to alter `user` table to make name `UNIQUE`

### Movies

```sql
CREATE TABLE movies (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  overview TEXT,
  poster_path TEXT,
  backdrop_path TEXT,
  release_date DATE,
  runtime TEXT
);
```

### Watched

```sql
CREATE TABLE watched (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    tmdb_id INT NOT NULL,
    watched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT watched_unique UNIQUE (user_id, tmdb_id)
);
```

### Watchlisted

```sql
CREATE TABLE watchlisted (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    tmdb_id INT NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT watchlisted_unique UNIQUE (user_id, tmdb_id)
);
```

### Favorites

```sql
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    tmdb_id INT NOT NULL,
    favorited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT favorites_unique UNIQUE (user_id, tmdb_id)
);
```

### Reviews

```sql
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    tmdb_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT reviews_unique UNIQUE (user_id, tmdb_id)
);
```

### Review Likes

```sql
CREATE TABLE review_likes (
    id SERIAL PRIMARY KEY,
    review_id INT NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    liked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT review_likes_unique UNIQUE (review_id, user_id)
);
```
