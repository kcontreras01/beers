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
  image VARCHAR,
  user_id INT REFERENCES users (id)
);

INSERT INTO beers (name, description, image) VALUES ('kiara', 'hot chili', 'https://www.mrbeer.com/media/catalog/product/Beer-Pale-MugLOW.jpg');
INSERT INTO beers (name, description, image) VALUES ('leo', 'smol boi', 'https://www.mrbeer.com/media/catalog/product/Beer-Pale-MugLOW.jpg');
INSERT INTO beers (name, description, image) VALUES ('becca', 'gin', 'https://www.mrbeer.com/media/catalog/product/Beer-Pale-MugLOW.jpg');
INSERT INTO beers (name, description, image) VALUES ('jon', 'pork', 'https://www.mrbeer.com/media/catalog/product/Beer-Pale-MugLOW.jpg');
