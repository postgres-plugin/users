-- Create table
CREATE TABLE IF NOT EXISTS organisations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  mission_statement TEXT,
  active BOOLEAN NOT NULL
);

-- Create table
CREATE TABLE IF NOT EXISTS people (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(200) NOT NULL,
  last_name VARCHAR(200) NOT NULL,
  user_type VARCHAR(100) NOT NULL CHECK (user_type IN ('admin', 'content-owner', 'primary', 'secondary', 'view-only')),
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(100),
  password VARCHAR(100),
  org_id INTEGER REFERENCES organisations (id),
  job_title VARCHAR(80),
  last_login BIGINT,
  active BOOLEAN NOT NULL,
  logo_url TEXT,
  account_activated BOOLEAN NOT NULL,
  notification_email BOOLEAN NOT NULL DEFAULT true,
  consent BOOLEAN NOT NULL DEFAULT false,
  marketing BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS tags_organisations (
 tags_id INTEGER,
 organisations_id INTEGER REFERENCES organisations (id)
);

CREATE TABLE IF NOT EXISTS locations_organisations (
 locations_id INTEGER,
 organisations_id INTEGER REFERENCES organisations (id)
);

CREATE TABLE IF NOT EXISTS tags_people (
 tags_id INTEGER,
 person_id INTEGER REFERENCES people (id)
);
