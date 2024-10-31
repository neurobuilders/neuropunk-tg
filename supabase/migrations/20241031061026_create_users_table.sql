CREATE TABLE users (
    id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    first_name text,
    last_name text,
    email text UNIQUE,
    telegram_id text UNIQUE,
    created_at timestamptz DEFAULT now(),
    PRIMARY KEY (id)
);
ALTER TABLE users ENABLE ROW LEVEL SECURITY;