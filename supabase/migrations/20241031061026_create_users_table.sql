CREATE TABLE users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    first_name text,
    last_name text,
    email text DEFAULT NULL,
    tg_id text UNIQUE,
    tg_avatar_url text,
    tg_language_code text,
    is_tg_premium boolean,
    created_at timestamptz DEFAULT now(),
    PRIMARY KEY (id)
);

CREATE UNIQUE INDEX users_unique_email ON users (email) WHERE email IS NOT NULL;