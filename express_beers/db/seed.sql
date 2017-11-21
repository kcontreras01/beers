DROP TABLE IF EXISTS beers;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  token VARCHAR NOT NULL
);

CREATE TABLE beers (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  description VARCHAR, user_id INT REFERENCES users (id)
);

INSERT INTO beers (name, description) VALUES ('kiara', 'hot chili');
INSERT INTO beers (name, description) VALUES ('leo', 'smol boi');
INSERT INTO beers (name, description) VALUES ('becca', 'gin');
INSERT INTO beers (name, description) VALUES ('jon', 'pork');
