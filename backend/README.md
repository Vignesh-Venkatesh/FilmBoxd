## Database Schema

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
