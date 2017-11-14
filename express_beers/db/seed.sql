DROP TABLE IF EXISTS beers;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  thread_id VARCHAR NOT NULL
);

CREATE TABLE beers (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  images VARCHAR,
  website VARCHAR,
  user_id INT REFERENCES users (id)
);

INSERT INTO beers (name, description, website, images) VALUES ('kiara', 'hot chili',  'website','https://www.mrbeer.com/media/catalog/product/Beer-Pale-MugLOW.jpg');
INSERT INTO beers (name, description, website, images) VALUES ('leo', 'smol boi', 'website', 'https://www.mrbeer.com/media/catalog/product/Beer-Pale-MugLOW.jpg');
INSERT INTO beers (name, description, website, images) VALUES ('becca', 'gin', 'website', 'https://www.mrbeer.com/media/catalog/product/Beer-Pale-MugLOW.jpg');
INSERT INTO beers (name, description, website, images) VALUES ('jon', 'pork', 'website', 'https://www.mrbeer.com/media/catalog/product/Beer-Pale-MugLOW.jpg');
