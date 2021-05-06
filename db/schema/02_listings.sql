-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS listings CASCADE;
CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  price INTEGER NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date_posted DATE NOT NULL,
  is_sold BOOLEAN NOT NULL DEFAULT FALSE
);
